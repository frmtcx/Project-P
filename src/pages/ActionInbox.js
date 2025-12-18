window.App.ActionInbox = () => {
    const { useState, useEffect } = React;
    const { useNavigate } = ReactRouterDOM;
    const { StatusBar, BottomNav } = window.App;

    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('to_sign'); // 'to_sign' | 'to_review' | 'fyi'
    const [inbox, setInbox] = useState(window.App.state.inbox);
    const [currentUser, setCurrentUser] = useState(window.App.state.currentUser);

    useEffect(() => {
        return window.App.state.subscribe(() => {
            setInbox([...window.App.state.inbox]);
            setCurrentUser(window.App.state.currentUser);
        });
    }, []);

    // Filter items for current user and active tab
    const filteredItems = inbox.filter(item =>
        item.userId === currentUser &&
        item.type === activeTab &&
        item.status === 'pending'
    );

    const getTabLabel = (type) => {
        const count = inbox.filter(i => i.userId === currentUser && i.type === type && i.status === 'pending').length;
        const label = type === 'to_sign' ? 'To Sign' : type === 'to_review' ? 'To Review' : 'FYI';
        return { label, count };
    };

    return (
        <div className="pb-24 bg-gray-50 min-h-screen font-sans pt-12">

            {/* Header */}
            <header className="bg-white px-5 pt-4 pb-2 sticky top-0 z-10">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-lg font-bold text-gray-900">Action Inbox</h1>
                    <span className="material-icons-round text-gray-600">filter_list</span>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                    {['to_sign', 'to_review', 'fyi'].map(type => {
                        const { label, count } = getTabLabel(type);
                        const isActive = activeTab === type;
                        return (
                            <button
                                key={type}
                                onClick={() => setActiveTab(type)}
                                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-colors ${isActive
                                    ? 'bg-gray-900 text-white'
                                    : 'bg-white border border-gray-200 text-gray-600'
                                    }`}
                            >
                                {label}
                                {count > 0 && (
                                    <span className={`px-1.5 py-0.5 rounded text-[10px] ${isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
                                        }`}>
                                        {count}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>
            </header>

            <main className="px-5 pt-4">
                {filteredItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                        <span className="material-icons-round text-4xl mb-2">inbox</span>
                        <p className="text-sm">No pending actions</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {filteredItems.map(item => {
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
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>
            <BottomNav />
        </div>
    );
};
