window.App.ActionInbox = () => {
    const { useState } = React;
    const { useNavigate } = ReactRouterDOM;
    const { StatusBar, Header, BottomNav } = window.App;

    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('to-sign'); // 'to-sign' | 'to-review' | 'fyi'

    return (
        <div className="bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark min-h-screen pb-24">
            <StatusBar />
            <Header title="Company A" subtitle="Workspace" />
            <nav className="flex gap-6 overflow-x-auto no-scrollbar pb-1 px-4 border-b border-border-light dark:border-border-dark">
                <button onClick={() => navigate('/')} className="whitespace-nowrap pb-2 border-b-2 border-transparent text-text-secondary-light font-medium text-sm">Chat</button>
                <button className="whitespace-nowrap pb-2 border-b-2 border-primary text-primary font-semibold text-sm">Action Inbox</button>
                <button onClick={() => navigate('/documents-list')} className="whitespace-nowrap pb-2 border-b-2 border-transparent text-text-secondary-light font-medium text-sm">Documents</button>
                <button onClick={() => navigate('/admin-overview')} className="whitespace-nowrap pb-2 border-b-2 border-transparent text-text-secondary-light font-medium text-sm">Admin</button>
            </nav>
            <main className="space-y-4">
                <div className="px-4 pt-4 sticky top-[8.5rem] z-30 bg-background-light dark:bg-background-dark pb-2">
                    <div className="flex gap-2 overflow-x-auto no-scrollbar">
                        <button onClick={() => setActiveTab('to-sign')} className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap shadow-sm transition-colors ${activeTab === 'to-sign' ? 'bg-primary text-white' : 'bg-white dark:bg-surface-dark border border-border-light text-text-secondary-light'}`}>
                            To Sign <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] ${activeTab === 'to-sign' ? 'bg-white/20' : 'bg-gray-100 dark:bg-gray-700'}`}>1</span>
                        </button>
                        <button onClick={() => setActiveTab('to-review')} className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap shadow-sm transition-colors ${activeTab === 'to-review' ? 'bg-primary text-white' : 'bg-white dark:bg-surface-dark border border-border-light text-text-secondary-light'}`}>
                            To Review <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] ${activeTab === 'to-review' ? 'bg-white/20' : 'bg-gray-100 dark:bg-gray-700'}`}>1</span>
                        </button>
                        <button onClick={() => setActiveTab('fyi')} className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap shadow-sm transition-colors ${activeTab === 'fyi' ? 'bg-primary text-white' : 'bg-white dark:bg-surface-dark border border-border-light text-text-secondary-light'}`}>
                            FYI / Sent
                        </button>
                        <button onClick={() => setActiveTab('completed')} className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap shadow-sm transition-colors ${activeTab === 'completed' ? 'bg-primary text-white' : 'bg-white dark:bg-surface-dark border border-border-light text-text-secondary-light'}`}>
                            Completed
                        </button>
                    </div>
                </div>

                <section className="px-4 pb-4">
                    <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-card divide-y divide-border-light overflow-hidden">
                        {activeTab === 'to-sign' && (
                            <div onClick={() => navigate('/signer-view')} className="flex items-center gap-3 p-4 active:bg-gray-50 dark:active:bg-gray-800 transition cursor-pointer group">
                                <div className="flex-shrink-0"><div className="w-10 h-10 rounded-lg bg-red-50 dark:bg-red-900/30 flex items-center justify-center text-primary"><span className="material-icons-round text-xl">description</span></div></div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-0.5"><h3 className="font-semibold text-sm truncate">NDA - Project Alpha</h3></div>
                                    <div className="flex items-center gap-2 text-xs text-text-secondary-light mb-1.5"><span>Signer</span><span className="w-1 h-1 rounded-full bg-gray-300"></span><span className="text-primary font-medium">Due Today</span></div>
                                    <div className="flex items-center gap-2"><span className="bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-400 text-[10px] px-2 py-0.5 rounded-full font-medium">Awaiting Signature</span></div>
                                </div>
                                <div className="flex items-center text-gray-400 group-hover:text-primary transition-colors"><span className="material-icons-round">chevron_right</span></div>
                            </div>
                        )}

                        {activeTab === 'to-review' && (
                            <div onClick={() => navigate('/document-thread-reviewer')} className="flex items-center gap-3 p-4 active:bg-gray-50 dark:active:bg-gray-800 transition cursor-pointer group">
                                <div className="flex-shrink-0"><div className="w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-purple-600"><span className="material-icons-round text-xl">rate_review</span></div></div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-0.5"><h3 className="font-semibold text-sm truncate">Q4 Financial Report</h3></div>
                                    <div className="flex items-center gap-2 text-xs text-text-secondary-light mb-1.5"><span>Reviewer</span><span className="w-1 h-1 rounded-full bg-gray-300"></span><span className="text-orange-600 font-medium">Due Tomorrow</span></div>
                                    <div className="flex items-center gap-2"><span className="bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-400 text-[10px] px-2 py-0.5 rounded-full font-medium">In Review</span></div>
                                </div>
                                <div className="flex items-center text-gray-400 group-hover:text-primary transition-colors"><span className="material-icons-round">chevron_right</span></div>
                            </div>
                        )}

                        {activeTab === 'fyi' && (
                            <div className="flex items-center gap-3 p-4 active:bg-gray-50 dark:active:bg-gray-800 transition cursor-pointer group">
                                <div className="flex-shrink-0"><div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600"><span className="material-icons-round text-xl">send</span></div></div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-0.5"><h3 className="font-semibold text-sm truncate">Employment Contract v3</h3></div>
                                    <div className="flex items-center gap-2 text-xs text-text-secondary-light mb-1.5"><span>Sent by You</span><span className="w-1 h-1 rounded-full bg-gray-300"></span><span>Yesterday</span></div>
                                    <div className="flex items-center gap-2"><span className="bg-gray-100 dark:bg-gray-800 text-gray-600 text-[10px] px-2 py-0.5 rounded-full font-medium">Sent</span></div>
                                </div>
                                <div className="flex items-center text-gray-400 group-hover:text-primary transition-colors"><span className="material-icons-round">chevron_right</span></div>
                            </div>
                        )}

                        {activeTab === 'completed' && (
                            <div onClick={() => navigate('/document-thread-completed')} className="flex items-center gap-3 p-4 active:bg-gray-50 dark:active:bg-gray-800 transition cursor-pointer group">
                                <div className="flex-shrink-0"><div className="w-10 h-10 rounded-lg bg-green-50 dark:bg-green-900/30 flex items-center justify-center text-green-600"><span className="material-icons-round text-xl">check_circle</span></div></div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-0.5"><h3 className="font-semibold text-sm truncate">Partnership Agreement</h3></div>
                                    <div className="flex items-center gap-2 text-xs text-text-secondary-light mb-1.5"><span>Signed</span><span className="w-1 h-1 rounded-full bg-gray-300"></span><span>Oct 15</span></div>
                                    <div className="flex items-center gap-2"><span className="bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 text-[10px] px-2 py-0.5 rounded-full font-medium">Completed</span></div>
                                </div>
                                <div className="flex items-center text-gray-400 group-hover:text-primary transition-colors"><span className="material-icons-round">chevron_right</span></div>
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <BottomNav />
        </div>
    );
};
