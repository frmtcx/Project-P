const { useNavigate } = ReactRouterDOM;
const { StatusBar, BottomNav } = window.App;

window.App.WorkspaceHome = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark min-h-screen pb-24">
            <StatusBar />
            <header className="bg-surface-light dark:bg-surface-dark px-4 py-3 sticky top-8 z-40 border-b border-border-light dark:border-border-dark">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/workspace-switcher')}>
                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300 font-bold">CA</div>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-1">
                                <span className="font-bold text-lg">Company A</span>
                                <span className="material-icons-round text-text-secondary-light dark:text-text-secondary-dark text-xl">expand_more</span>
                            </div>
                            <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark">Workspace</span>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition"><span className="material-icons-round">notifications_none</span></button>
                        <button className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition"><span className="material-icons-round">settings</span></button>
                    </div>
                </div>
                <nav className="flex gap-6 overflow-x-auto no-scrollbar pb-1">
                    <button className="whitespace-nowrap pb-2 border-b-2 border-primary text-primary font-semibold text-sm">Chat</button>
                    <button onClick={() => navigate('/action-inbox')} className="whitespace-nowrap pb-2 border-b-2 border-transparent text-text-secondary-light dark:text-text-secondary-dark font-medium text-sm">Action Inbox</button>
                    <button className="whitespace-nowrap pb-2 border-b-2 border-transparent text-text-secondary-light dark:text-text-secondary-dark font-medium text-sm">Documents</button>
                    <button onClick={() => navigate('/admin-overview')} className="whitespace-nowrap pb-2 border-b-2 border-transparent text-text-secondary-light dark:text-text-secondary-dark font-medium text-sm">Admin</button>
                </nav>
            </header>
            <main className="px-4 py-4 space-y-6">
                <div className="relative">
                    <span className="material-icons-round absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary-light dark:text-text-secondary-dark">search</span>
                    <input className="w-full bg-gray-100 dark:bg-gray-800 border-none rounded-xl py-3 pl-10 pr-4 text-sm text-text-primary-light dark:text-text-primary-dark focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-gray-700 transition-colors" placeholder="Search people, threads, documents" type="text" />
                </div>
                <section>
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider">Pinned</h2>
                    </div>
                    <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-card divide-y divide-border-light dark:divide-border-dark overflow-hidden">
                        <div className="flex items-center gap-3 p-3 active:bg-gray-50 dark:active:bg-gray-800 transition">
                            <div className="relative">
                                <img alt="User Avatar" className="w-12 h-12 rounded-full object-cover border border-border-light dark:border-border-dark" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMdePd5DX-qMRDtoSEk0ZyMn61vtWyg7QkKAxOCUkzwSTEKJtODOq_92-k8i7_xhxL9prFNNz7a2GpMLU7C9PfO51kK4_REPs-oY6D22t44q0_mJwTk_ryXSVrYI93c29aZZA2Bc8oLu5JE_R6QDY0bAuwuitz9lVciwk0bN4K47GZp4KHufh3Q0n9BJ7dFCGb-bGnR8aMLHYpBO-HbMfDEYEHHHp0VX3c1yXdtioA59AZ6x_2e6fUl0STElWLZOiR7xv7Q7DZpIM" />
                                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white dark:border-surface-dark"></div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-baseline mb-0.5"><h3 className="font-semibold text-sm truncate">Engineering Team</h3><span className="text-xs text-text-secondary-light dark:text-text-secondary-dark whitespace-nowrap">10:42 AM</span></div>
                                <div className="flex items-center gap-2 mb-1"><span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-[10px] px-1.5 py-0.5 rounded font-medium">Chat</span></div>
                                <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark truncate"><span className="font-medium text-text-primary-light dark:text-text-primary-dark">Sarah:</span> Can we review the API specs?</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 active:bg-gray-50 dark:active:bg-gray-800 transition" onClick={() => navigate('/document-thread-reviewer')}>
                            <div className="relative">
                                <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-purple-600 dark:text-purple-300"><span className="material-icons-round text-2xl">folder</span></div>
                                <span className="absolute -top-1 -right-1 flex h-4 w-4"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span><span className="relative inline-flex rounded-full h-4 w-4 bg-primary text-white text-[9px] items-center justify-center font-bold">2</span></span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-baseline mb-0.5"><h3 className="font-semibold text-sm truncate">Q4 Financial Report</h3><span className="text-xs text-text-secondary-light dark:text-text-secondary-dark whitespace-nowrap">Yesterday</span></div>
                                <div className="flex items-center gap-2 mb-1"><span className="bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 text-[10px] px-1.5 py-0.5 rounded font-medium">Document Thread</span></div>
                                <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark truncate">Please sign page 4 by EOD.</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider">Recent</h2>
                    </div>
                    <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-card divide-y divide-border-light dark:divide-border-dark overflow-hidden">
                        <div className="flex items-center gap-3 p-3 active:bg-gray-50 dark:active:bg-gray-800 transition">
                            <div className="relative"><img alt="User Avatar" className="w-12 h-12 rounded-full object-cover border border-border-light dark:border-border-dark" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDs7ssWBwQRDGyXjeaRa99oLg5pZBQUVaUqra1h9ushPyeuasKyzbSJXDyK3cYic97VjCYMZPAN0-DWQ3QA_O1y1si3xuAaOLCOW9Ks-X3S4TR6irPGNMSEe3SmU91cABUh_6VxhM1Ab3BfdXnqD4T8Ye1OZV-vWV3T4cpax51BSkYZy0EBpPDJ68FZ6r6YVAYWMQrU54bPoW5rVTab0lZ93pO-TPNVVQwcq8RQjzXzcWHFbEHW6-Ga1VbQaGr_vpJkp-HEI4i1Y84" /></div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-baseline mb-0.5"><h3 className="font-semibold text-sm truncate flex items-center gap-1">Frans <span className="material-icons-round text-green-500 text-sm">verified</span></h3><span className="text-xs text-text-secondary-light dark:text-text-secondary-dark whitespace-nowrap">14:20</span></div>
                                <div className="flex items-center gap-2 mb-1"><span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-[10px] px-1.5 py-0.5 rounded font-medium">Chat</span></div>
                                <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark truncate">Frans_CV_December_2025.pdf</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 active:bg-gray-50 dark:active:bg-gray-800 transition" onClick={() => navigate('/document-thread')}>
                            <div className="relative">
                                <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center text-teal-600 dark:text-teal-300"><span className="material-icons-round text-2xl">description</span></div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-baseline mb-0.5"><h3 className="font-semibold text-sm truncate">NDA - Project Alpha</h3><span className="text-xs text-text-secondary-light dark:text-text-secondary-dark whitespace-nowrap">Mon</span></div>
                                <div className="flex items-center gap-2 mb-1"><span className="bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 text-[10px] px-1.5 py-0.5 rounded font-medium">Document Thread</span></div>
                                <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark truncate"><span className="font-medium text-text-primary-light dark:text-text-primary-dark">System:</span> Document signed by all parties.</p>
                            </div>
                            <div className="flex flex-col items-end gap-1"><div className="w-2 h-2 rounded-full bg-primary"></div></div>
                        </div>
                    </div>
                </section>
            </main>
            <div className="fixed bottom-24 right-4 z-50">
                <button onClick={() => navigate('/create-menu')} className="w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:bg-red-700 transition active:scale-95">
                    <span className="material-icons-round text-3xl">add</span>
                </button>
            </div>
            <BottomNav />
        </div>
    );
};
