const { useNavigate } = ReactRouterDOM;
const { useState, useEffect } = React;

window.App.ChatsList = () => {
    const { StatusBar, BottomNav } = window.App;
    const navigate = useNavigate();
    const [workspace, setWorkspace] = useState(window.App.state.currentWorkspace);

    useEffect(() => {
        return window.App.state.subscribe(() => {
            setWorkspace(window.App.state.currentWorkspace);
        });
    }, []);

    const isCompany = workspace === 'company_a';

    return (
        <div className="w-full min-h-screen bg-background-light dark:bg-background-dark font-body antialiased flex flex-col relative overflow-hidden">
            <StatusBar />
            <div className="bg-surface-light dark:bg-surface-dark px-4 pb-4 sticky top-[3rem] z-20 shadow-sm border-b border-border-light dark:border-border-dark">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">Chats</h1>
                        <div className="flex items-center gap-1 text-xs text-text-secondary-light dark:text-text-secondary-dark mt-0.5">
                            <span className={`material-icons-round text-sm ${isCompany ? 'text-primary' : 'text-blue-500'}`}>{isCompany ? 'business_center' : 'person'}</span>
                            <span>{isCompany ? 'Company A Workspace' : 'Personal Workspace'}</span>
                        </div>
                    </div>
                    <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        <span className="material-icons-outlined text-text-primary-light dark:text-text-primary-dark">more_vert</span>
                    </button>
                </div>
                <div className="relative mb-4">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="material-icons-outlined text-gray-400 dark:text-gray-500">search</span>
                    </div>
                    <input className="block w-full pl-10 pr-3 py-2.5 border-none rounded-lg leading-5 bg-gray-100 dark:bg-gray-800 text-text-primary-light dark:text-text-primary-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm transition-shadow" placeholder="Search messages or documents..." type="text" />
                </div>
            </div>
            <div className="flex-1 overflow-y-auto pb-24 px-4">
                {isCompany ? (
                    <div onClick={() => navigate('/document-thread')} className="group flex items-start gap-4 p-4 bg-white dark:bg-surface-dark border-b border-border-light dark:border-border-dark hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                        <div className="relative flex-shrink-0">
                            <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300">
                                <span className="material-icons-round">description</span>
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-0.5">
                                <h3 className="text-base font-semibold text-text-primary-light dark:text-text-primary-dark truncate pr-2">Employment Contract v3</h3>
                                <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark whitespace-nowrap">16:47</span>
                            </div>
                            <div className="text-sm text-text-secondary-light dark:text-text-secondary-dark line-clamp-2">System: FRANS requested a revision.</div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-64 text-center opacity-60">
                        <span className="material-icons-round text-4xl mb-2 text-gray-400">chat_bubble_outline</span>
                        <p className="text-sm">No personal chats yet.</p>
                    </div>
                )}
            </div>
            <BottomNav />
        </div>
    );
};
