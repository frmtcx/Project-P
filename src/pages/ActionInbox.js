window.App.ActionInbox = () => {
    const { useState, useEffect } = React;
    const { useNavigate } = ReactRouterDOM;
    const { StatusBar, BottomNav } = window.App;

    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('all'); // 'all' (Chats) | 'actions' (Tasks) | 'mentions'
    const [currentUser, setCurrentUser] = useState(window.App.state.currentUser);
    const [threads, setThreads] = useState([]);
    const [inbox, setInbox] = useState([]);
    const [currentWorkspace, setCurrentWorkspace] = useState(window.App.state.currentWorkspace);

    // Sync Data
    useEffect(() => {
        const loadData = () => {
            setCurrentUser(window.App.state.currentUser);
            setCurrentWorkspace(window.App.state.currentWorkspace);

            // Load Inbox
            setInbox([...(window.App.state.inbox || [])]);

            // Load Threads (Filtered by Workspace & Sort)
            const allThreads = Object.values(window.App.state.threads);
            const wsThreads = allThreads.filter(t => t.workspaceId === window.App.state.currentWorkspace);
            // Simple reverse sort for prototype "recency"
            setThreads(wsThreads.reverse());
        };

        loadData();
        return window.App.state.subscribe(loadData);
    }, []);

    // Filter Inbox specifically for "Actions" tab (To Sign / To Review / FYI)
    // We only show pending items here
    // Filter Inbox specifically for "Actions" tab (To Sign / To Review ONLY)
    // We only show pending items here AND belonging to current workspace
    const actionItems = inbox.filter(item => {
        const thread = window.App.state.threads[item.threadId];
        return item.userId === currentUser &&
            ['to_sign', 'to_review'].includes(item.type) &&
            item.status === 'pending' &&
            thread && thread.workspaceId === currentWorkspace;
    });

    // Mentions are now their own distinct category, filtered by workspace
    const mentions = inbox.filter(item => {
        const thread = window.App.state.threads[item.threadId];
        return item.userId === currentUser &&
            item.type === 'mention' &&
            thread && thread.workspaceId === currentWorkspace;
    });

    // Helper: Check if a thread has a pending action for ME
    const getThreadAction = (threadId) => {
        return actionItems.find(i => i.threadId === threadId);
    };

    const getIconForThread = (thread) => {
        if (thread.type === 'document') {
            return (
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-primary ${thread.docId?.includes('.pdf') ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                    <span className="material-icons-round">{thread.docId?.includes('.pdf') ? 'picture_as_pdf' : 'description'}</span>
                </div>
            );
        } else {
            return (
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                    <span className="material-icons-round">forum</span>
                </div>
            );
        }
    };

    // Render Content based on Active Tab
    const renderContent = () => {
        if (activeTab === 'all') {
            // --- ALL CHATS VIEW (From ChatsList.js + Badges) ---
            if (threads.length === 0) {
                return (
                    <div className="p-10 text-center text-gray-400 mt-10">
                        <span className="material-icons-round text-4xl mb-2 text-gray-300">chat_bubble_outline</span>
                        <p>No chats in {currentWorkspace.replace('_', ' ').toUpperCase()}</p>
                    </div>
                );
            }

            return (
                <div className="divide-y divide-gray-100">
                    {threads.map(thread => {
                        const lastEvent = thread.events[thread.events.length - 1];
                        const lastText = lastEvent ? (lastEvent.text || "New chat") : "No messages";
                        const action = getThreadAction(thread.id);

                        return (
                            <div
                                key={thread.id}
                                className="px-5 py-4 flex gap-3 hover:bg-gray-50 cursor-pointer active:bg-gray-100"
                                onClick={() => navigate('/document-thread', { state: { threadId: thread.id } })}
                            >
                                <div className="relative shrink-0">
                                    {getIconForThread(thread)}
                                    {/* Action Badge on Icon? Or maybe just on the right side */}
                                    {thread.status === 'in_signing' && (
                                        <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                                            <span className="material-icons text-[10px] text-white">edit</span>
                                        </span>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-gray-900 text-sm truncate">{thread.title}</h3>
                                        <div className="flex items-center gap-1">
                                            {action && (
                                                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded text-white ${action.type === 'to_sign' ? 'bg-blue-600' : 'bg-primary'}`}>
                                                    {action.type === 'to_sign' ? 'Sign' : 'Review'}
                                                </span>
                                            )}
                                            <span className="text-xs text-gray-400">{thread.lastActivity}</span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-500 truncate">
                                        {lastText}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            );
        }

        if (activeTab === 'actions') {
            // --- ACTIONS VIEW (Cards from ActionInbox.js) ---
            if (actionItems.length === 0) {
                return (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                        <span className="material-icons-round text-4xl mb-2">check_circle_outline</span>
                        <p className="text-sm">You are all caught up!</p>
                    </div>
                );
            }

            return (
                <div className="space-y-3 px-5 pt-2">
                    {actionItems.map(item => {
                        // Find thread info for context
                        const thread = window.App.state.threads[item.threadId];
                        const requester = thread?.participants.find(p => p.role === 'viewer')?.userId;
                        const requesterDisplay = requester ? window.App.utils.getUserDisplay(requester) : { name: 'System' };

                        return (
                            <div
                                key={item.id}
                                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex gap-3 active:scale-[0.99] transition-transform"
                                onClick={() => navigate('/document-thread', { state: { threadId: item.threadId } })}
                            >
                                <div className="relative">
                                    <img src={requesterDisplay.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=System"} className="w-10 h-10 rounded-full bg-gray-100" />
                                    <span className={`material-icons-round text-xs absolute -bottom-1 -right-1 w-5 h-5 flex items-center justify-center rounded-full border-2 border-white ${item.type === 'to_sign' ? 'bg-blue-500 text-white' : 'bg-orange-500 text-white'
                                        }`}>
                                        {item.type === 'to_sign' ? 'edit' : 'visibility'}
                                    </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start">
                                        <h4 className="font-bold text-sm text-gray-900 truncate pr-2">{item.title}</h4>
                                        <span className="text-[10px] text-gray-400 whitespace-nowrap">{item.time}</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-0.5 truncate">
                                        Requested by {requesterDisplay.name}
                                    </p>

                                    {/* Quick Actions */}
                                    <div className="mt-3 flex gap-2">
                                        {item.type === 'to_sign' && (
                                            <button className="flex-1 bg-blue-50 text-blue-700 py-1.5 rounded-lg text-xs font-bold">Review & Sign</button>
                                        )}
                                        {item.type === 'to_review' && (
                                            <button className="flex-1 bg-orange-50 text-orange-700 py-1.5 rounded-lg text-xs font-bold">Review Now</button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            );
        }

        if (activeTab === 'mentions') {
            // --- MENTIONS VIEW (Slack-like) ---
            if (mentions.length === 0) {
                return (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                        <span className="material-icons-round text-4xl mb-2">alternate_email</span>
                        <p className="text-sm">No new mentions</p>
                    </div>
                );
            }

            return (
                <div className="divide-y divide-gray-100">
                    {mentions.map(item => {
                        const thread = window.App.state.threads[item.threadId];
                        // In a real app, we'd fetch the specific message user. For now, simulate 'Generic User' if missing
                        const senderDisplay = window.App.utils.getUserDisplay('dave'); // Default/Placeholder

                        return (
                            <div
                                key={item.id}
                                className="px-5 py-4 hover:bg-gray-50 cursor-pointer transition-colors active:bg-gray-100"
                                onClick={() => navigate('/document-thread', { state: { threadId: item.threadId } })}
                            >
                                <div className="flex justify-between items-baseline mb-1">
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-bold text-sm text-gray-900">{thread?.title || "Unknown Chat"}</h4>
                                        <span className="text-xs text-gray-400">in {thread?.workspaceId?.replace('_', ' ').toUpperCase()}</span>
                                    </div>
                                    <span className="text-[10px] text-gray-400 whitespace-nowrap">{item.time}</span>
                                </div>

                                <div className="flex gap-3 mt-1">
                                    <div className="w-1 bg-gray-200 rounded-full shrink-0"></div> {/* Quote line */}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-1 mb-0.5">
                                            <span className="text-xs font-bold text-gray-700">Dave Miller</span> {/* Hardcoded for demo diversity, or map from item.fromUser */}
                                            <span className="text-[10px] text-gray-400">mentioned you</span>
                                        </div>
                                        <p className="text-sm text-gray-600 line-clamp-2">
                                            {item.text || "Hey @Frans, can you take a look at this when you have a moment?"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            );
        }
    };


    return (
        <div className="pb-24 bg-white min-h-screen font-sans">

            {/* Header */}
            <header className="bg-white px-5 pt-14 pb-0 sticky top-0 z-10 border-b border-gray-100">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold text-gray-900">Chats</h1>
                        <button onClick={() => window.App.toggleWorkspaceSwitcher(true)} className="p-1.5 rounded-lg bg-gray-50 text-gray-500 hover:bg-gray-100">
                            <span className="material-icons-round text-lg">swap_horiz</span>
                        </button>
                    </div>
                    <span className="material-icons-round text-gray-600">search</span>
                </div>

                {/* Main Tabs */}
                <div className="flex gap-6">
                    <button
                        onClick={() => setActiveTab('all')}
                        className={`pb-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'all' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-400'}`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setActiveTab('actions')}
                        className={`pb-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'actions' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-400'}`}
                    >
                        Action Items
                        {actionItems.length > 0 && <span className="bg-red-500 text-white text-[10px] px-1.5 rounded-full">{actionItems.length}</span>}
                    </button>
                    <button
                        onClick={() => setActiveTab('mentions')}
                        className={`pb-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'mentions' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-400'}`}
                    >
                        Mentions
                    </button>
                </div>
            </header>

            <main className="pt-2">
                {renderContent()}
            </main>

            {/* FAB (New Chat) */}
            <div className="fixed bottom-24 right-5 z-20">
                <button onClick={() => navigate('/new-message')} className="w-14 h-14 bg-primary text-white rounded-full shadow-lg shadow-primary/40 flex items-center justify-center hover:bg-red-700 transition active:scale-95">
                    <span className="material-icons-round text-2xl">add</span>
                </button>
            </div>

            <BottomNav />
        </div>
    );
};
