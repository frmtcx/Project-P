window.App.ChatsList = () => {
    const { useNavigate } = ReactRouterDOM;
    const { useState, useEffect } = React;

    const navigate = useNavigate();
    const [currentFilter, setCurrentFilter] = useState('all'); // 'all', 'document', 'discussion'
    const [threads, setThreads] = useState([]);
    const [workspace, setWorkspace] = useState(window.App.state.currentWorkspace);

    // Load and filter threads
    useEffect(() => {
        const loadThreads = () => {
            const allThreads = Object.values(window.App.state.threads);
            const currentWs = window.App.state.currentWorkspace;
            setWorkspace(currentWs);

            // 1. Filter by Workspace
            let filtered = allThreads.filter(t => t.workspaceId === currentWs);

            // 2. Filter by Type
            if (currentFilter !== 'all') {
                filtered = filtered.filter(t => t.type === currentFilter);
            }

            // 3. Sort by Recency (mock logic using array order or simulated date)
            // For prototype, we'll just reverse to show newest added first usually
            setThreads(filtered.reverse());
        };

        loadThreads();
        return window.App.state.subscribe(loadThreads);
    }, [currentFilter]);

    const getIconForThread = (thread) => {
        if (thread.type === 'document') {
            // Document Icon
            return (
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-primary ${thread.docId?.includes('.pdf') ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                    <span className="material-icons-round">{thread.docId?.includes('.pdf') ? 'picture_as_pdf' : 'description'}</span>
                </div>
            );
        } else {
            // Group/Discussion Icon or Avatar of last speaker
            return (
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                    <span className="material-icons-round">forum</span>
                </div>
            );
        }
    };

    return (
        <div className="pb-24 bg-white min-h-screen font-sans">
            {/* Header */}
            <header className="bg-white px-5 pt-14 pb-2 sticky top-0 z-10 border-b border-gray-100">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                        <div onClick={() => window.App.toggleWorkspaceSwitcher(true)} className="cursor-pointer">
                            <h1 className="text-2xl font-bold text-gray-900">Chats</h1>
                            <p className="text-xs text-primary font-bold uppercase tracking-wider flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-primary"></span>
                                {window.App.state.workspaces[workspace]?.name || 'Workspace'}
                            </p>
                        </div>
                        <button onClick={() => window.App.toggleWorkspaceSwitcher(true)} className="p-1.5 rounded-lg bg-gray-50 text-gray-500 hover:bg-gray-100">
                            <span className="material-icons-round text-lg">swap_horiz</span>
                        </button>
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
                    {['all', 'document', 'discussion'].map(filter => (
                        <button
                            key={filter}
                            onClick={() => setCurrentFilter(filter)}
                            className={`px-4 py-1.5 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${currentFilter === filter
                                ? 'bg-gray-900 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            {filter.charAt(0).toUpperCase() + filter.slice(1)}s
                        </button>
                    ))}
                </div>
            </header>

            <main>
                <div className="divide-y divide-gray-100">
                    {threads.length === 0 ? (
                        <div className="p-10 text-center text-gray-400">
                            <span className="material-icons-round text-4xl mb-2 text-gray-300">chat_bubble_outline</span>
                            <p>No chats found in {workspace.replace('_', ' ').toUpperCase()}</p>
                        </div>
                    ) : (
                        threads.map(thread => {
                            const lastEvent = thread.events[thread.events.length - 1];
                            const lastText = lastEvent ? (lastEvent.text || "New chat") : "No messages";

                            return (
                                <div
                                    key={thread.id}
                                    className="px-5 py-4 flex gap-3 hover:bg-gray-50 cursor-pointer active:bg-gray-100"
                                    onClick={() => navigate('/document-thread', { state: { threadId: thread.id } })}
                                >
                                    <div className="relative shrink-0">
                                        {getIconForThread(thread)}
                                        {thread.status === 'in_signing' && (
                                            <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                                                <span className="material-icons text-[10px] text-white">edit</span>
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-bold text-gray-900 text-sm truncate">{thread.title}</h3>
                                            <span className="text-xs text-gray-400">{thread.lastActivity}</span>
                                        </div>
                                        <p className="text-sm text-gray-500 truncate flex items-center gap-1">
                                            {lastEvent?.userId === window.App.state.currentUser && <span className="text-xs font-bold">You: </span>}
                                            {lastText}
                                        </p>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </main>

            {/* FAB */}
            <div className="fixed bottom-0 left-0 right-0 z-20 flex justify-center pointer-events-none">
                <div className="w-full max-w-md relative h-0">
                    <div className="absolute bottom-24 right-5 pointer-events-auto">
                        <button onClick={() => navigate('/new-message')} className="w-14 h-14 bg-primary text-white rounded-full shadow-lg shadow-primary/40 flex items-center justify-center hover:bg-red-700 transition active:scale-95">
                            <span className="material-icons-round text-2xl">add</span>
                        </button>
                    </div>
                </div>
            </div>

            <window.App.BottomNav />
        </div>
    );
};
