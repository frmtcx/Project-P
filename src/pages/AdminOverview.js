const { useNavigate } = ReactRouterDOM;
const { StatusBar, Header, BottomNav } = window.App;

window.App.AdminOverview = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark min-h-screen pb-24 pt-12">

            <Header title="Company A" subtitle="Workspace" />
            <nav className="flex gap-6 overflow-x-auto no-scrollbar pb-1 px-4 border-b border-border-light dark:border-border-dark">
                <button onClick={() => navigate('/')} className="whitespace-nowrap pb-2 border-b-2 border-transparent text-text-secondary-light font-medium text-sm">Chat</button>
                <button onClick={() => navigate('/action-inbox')} className="whitespace-nowrap pb-2 border-b-2 border-transparent text-text-secondary-light font-medium text-sm">Action Inbox</button>
                <button className="whitespace-nowrap pb-2 border-b-2 border-transparent text-text-secondary-light font-medium text-sm">Documents</button>
                <button className="whitespace-nowrap pb-2 border-b-2 border-primary text-primary font-semibold text-sm">Admin</button>
            </nav>
            <main className="px-4 py-6 space-y-6">
                <section>
                    <div className="flex justify-between items-end mb-4"><h2 className="text-xs font-bold text-text-secondary-light uppercase tracking-wider">Overview</h2><span className="text-xs text-primary font-medium">Last 24h</span></div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-2xl shadow-card flex flex-col justify-between h-28">
                            <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600"><span className="material-icons-round text-lg">groups</span></div>
                            <div><span className="text-3xl font-bold text-text-primary-light block">142</span><span className="text-xs text-text-secondary-light font-medium">Total Members</span></div>
                        </div>
                        <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-2xl shadow-card flex flex-col justify-between h-28">
                            <div className="w-8 h-8 rounded-full bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center text-orange-600"><span className="material-icons-round text-lg">person_off</span></div>
                            <div><span className="text-3xl font-bold text-text-primary-light block">12</span><span className="text-xs text-text-secondary-light font-medium">Inactive Members</span></div>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="flex justify-between items-center mb-4"><h2 className="text-xs font-bold text-text-secondary-light uppercase tracking-wider">Management</h2></div>
                    <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-card overflow-hidden divide-y divide-border-light">
                        <div onClick={() => navigate('/admin-members')} className="p-4 active:bg-gray-50 dark:active:bg-gray-800 transition cursor-pointer">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary"><span className="material-icons-round text-2xl">badge</span></div>
                                <div className="flex-1"><h3 className="font-semibold text-base">Members</h3><p className="text-xs text-text-secondary-light mt-0.5">Manage roles & invites</p></div>
                                <span className="material-icons-round text-text-secondary-light">arrow_forward_ios</span>
                            </div>
                        </div>
                        <div onClick={() => navigate('/access-review')} className="p-4 active:bg-gray-50 dark:active:bg-gray-800 transition cursor-pointer">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600"><span className="material-icons-round text-2xl">policy</span></div>
                                <div className="flex-1"><h3 className="font-semibold text-base">Access Review</h3><p className="text-xs text-text-secondary-light mt-0.5">Audit permissions</p></div>
                                <span className="material-icons-round text-text-secondary-light">arrow_forward_ios</span>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <BottomNav />
        </div>
    );
};
