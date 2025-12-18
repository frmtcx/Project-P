const { useNavigate } = ReactRouterDOM;
const { StatusBar } = window.App;

window.App.WorkspaceSwitcher = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen relative flex flex-col">
            <StatusBar />
            <div className="fixed inset-0 z-50 flex flex-col">
                <div aria-hidden="true" className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => navigate(-1)}></div>
                <div className="relative w-full bg-surface-light dark:bg-surface-dark rounded-b-2xl shadow-xl flex flex-col max-h-[85vh] overflow-hidden animate-slide-down">
                    <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
                        <h2 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark">Switch Workspace</h2>
                        <button onClick={() => navigate(-1)} className="p-2 -mr-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                            <span className="material-icons">close</span>
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
                        <button onClick={() => navigate('/')} className="w-full flex items-center p-3 rounded-xl bg-red-50 border border-red-100 dark:bg-red-900/10 dark:border-red-900/30 group transition-all duration-200 relative overflow-hidden">
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-xl"></div>
                            <div className="w-12 h-12 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary flex-shrink-0 mr-4">
                                <span className="material-icons">business</span>
                            </div>
                            <div className="flex-1 text-left">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-bold text-gray-900 dark:text-white text-base">Company A</h3>
                                    <span className="material-icons text-primary text-xl">check_circle</span>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Enterprise workspace</p>
                            </div>
                        </button>
                        <button className="w-full flex items-center p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 border border-transparent hover:border-gray-200 dark:hover:border-gray-700 group transition-all duration-200">
                            <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 group-hover:bg-white dark:group-hover:bg-gray-600 flex-shrink-0 mr-4 border border-gray-200 dark:border-gray-600">
                                <span className="material-icons">person</span>
                            </div>
                            <div className="flex-1 text-left">
                                <h3 className="font-bold text-text-primary-light dark:text-text-primary-dark text-base group-hover:text-primary transition-colors">Personal</h3>
                                <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-0.5">Private chats</p>
                            </div>
                        </button>
                    </div>
                    <div className="px-5 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800">
                        <div className="flex items-start space-x-3">
                            <span className="material-icons text-amber-500 text-lg mt-0.5">info</span>
                            <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                                Your identity and data are scoped per workspace. Messages cannot be moved between workspaces.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
