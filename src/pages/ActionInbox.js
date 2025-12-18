const { useNavigate } = ReactRouterDOM;
const { StatusBar, Header, BottomNav } = window.App;

window.App.ActionInbox = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark min-h-screen pb-24">
            <StatusBar />
            <Header title="Company A" subtitle="Workspace" />
            <nav className="flex gap-6 overflow-x-auto no-scrollbar pb-1 px-4 border-b border-border-light dark:border-border-dark">
                <button onClick={() => navigate('/')} className="whitespace-nowrap pb-2 border-b-2 border-transparent text-text-secondary-light font-medium text-sm">Chat</button>
                <button className="whitespace-nowrap pb-2 border-b-2 border-primary text-primary font-semibold text-sm">Action Inbox</button>
                <button className="whitespace-nowrap pb-2 border-b-2 border-transparent text-text-secondary-light font-medium text-sm">Documents</button>
                <button onClick={() => navigate('/admin-overview')} className="whitespace-nowrap pb-2 border-b-2 border-transparent text-text-secondary-light font-medium text-sm">Admin</button>
            </nav>
            <main className="space-y-4">
                <div className="px-4 pt-4 sticky top-[8.5rem] z-30 bg-background-light dark:bg-background-dark pb-2">
                    <div className="flex gap-2 overflow-x-auto no-scrollbar">
                        <button className="px-4 py-1.5 rounded-full bg-primary text-white text-sm font-medium whitespace-nowrap shadow-sm">To Sign <span className="ml-1 bg-white/20 px-1.5 py-0.5 rounded-full text-[10px]">3</span></button>
                        <button className="px-4 py-1.5 rounded-full bg-white dark:bg-surface-dark border border-border-light text-text-secondary-light text-sm font-medium whitespace-nowrap">To Review</button>
                    </div>
                </div>
                <section className="px-4 pb-4">
                    <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-card divide-y divide-border-light overflow-hidden">
                        <div onClick={() => navigate('/signer-view')} className="flex items-center gap-3 p-4 active:bg-gray-50 dark:active:bg-gray-800 transition cursor-pointer group">
                            <div className="flex-shrink-0"><div className="w-10 h-10 rounded-lg bg-red-50 dark:bg-red-900/30 flex items-center justify-center text-primary"><span className="material-icons-round text-xl">description</span></div></div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-0.5"><h3 className="font-semibold text-sm truncate">NDA - Project Alpha</h3></div>
                                <div className="flex items-center gap-2 text-xs text-text-secondary-light mb-1.5"><span>Signer</span><span className="w-1 h-1 rounded-full bg-gray-300"></span><span className="text-primary font-medium">Due Today</span></div>
                                <div className="flex items-center gap-2"><span className="bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-400 text-[10px] px-2 py-0.5 rounded-full font-medium">Awaiting Signature</span></div>
                            </div>
                            <div className="flex items-center text-gray-400 group-hover:text-primary transition-colors"><span className="material-icons-round">chevron_right</span></div>
                        </div>
                    </div>
                </section>
            </main>
            <BottomNav />
        </div>
    );
};
