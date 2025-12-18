window.App.ActionInbox = () => {
    const { useState } = React;
    const { useNavigate } = ReactRouterDOM;
    const { StatusBar, Header, BottomNav } = window.App;

    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('to-sign'); // 'to-sign' | 'to-review' | 'fyi'

    return (
        <div className="bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark min-h-screen pb-24">
            <div className="pb-24 bg-gray-50 min-h-screen font-sans">
                {/* Header */}
                <header className="bg-white px-5 pt-6 pb-2 sticky top-0 z-10">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Frans" className="w-6 h-6 rounded-full" />
                            </div>
                            <span className="material-icons-round text-gray-400 text-sm">expand_more</span>
                        </div>
                        <h1 className="text-lg font-bold text-gray-900">Actions required</h1>
                        <span className="material-icons-round text-gray-600">note_add</span>
                    </div>

                    {/* Search */}
                    <div className="relative mb-4">
                        <span className="material-icons-round absolute left-3 top-2.5 text-gray-400 text-xl">search</span>
                        <input type="text" placeholder="Search" className="w-full bg-gray-100 border-none rounded-lg py-2.5 pl-10 pr-4 text-sm focus:ring-1 focus:ring-red-500" />
                    </div>

                    {/* Filters */}
                    <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                        <button className="px-3 py-1.5 rounded-full border border-gray-200 bg-white text-xs font-medium whitespace-nowrap flex items-center gap-1">
                            All actions <span className="bg-gray-100 px-1.5 rounded text-[10px]">4</span> <span className="material-icons-round text-sm">expand_more</span>
                        </button>
                        <button className="px-3 py-1.5 rounded-full border border-gray-200 bg-white text-xs font-medium whitespace-nowrap flex items-center gap-1">
                            Last 6 months <span className="material-icons-round text-sm">expand_more</span>
                        </button>
                        <button className="px-3 py-1.5 rounded-full border border-gray-200 bg-white text-xs font-medium whitespace-nowrap">
                            Sort by
                        </button>
                    </div>
                </header>

                <main className="px-5 pt-2">
                    <div className="mb-6">
                        <h3 className="text-xs text-gray-500 font-medium mb-3">This week</h3>
                        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex gap-3 mb-3" onClick={() => navigate('/signer-view')}>
                            <div className="relative">
                                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Frans" className="w-10 h-10 rounded-full bg-gray-100" />
                                <span className="material-icons-round text-green-500 text-sm absolute -bottom-1 -right-1 bg-white rounded-full">verified</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                    <h4 className="font-bold text-sm text-gray-900">FRANS</h4>
                                    <span className="text-[10px] text-gray-400">Dec 15, 2025</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-0.5 truncate">Frans_CV_December_2025</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xs text-gray-500 font-medium mb-3">This year</h3>
                        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex gap-3 mb-3" onClick={() => navigate('/document-thread-reviewer')}>
                            <div className="relative">
                                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Yusak" className="w-10 h-10 rounded-full bg-gray-100" />
                                <span className="material-icons-round text-green-500 text-sm absolute -bottom-1 -right-1 bg-white rounded-full">verified</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                    <h4 className="font-bold text-sm text-gray-900">YUSAK YOSEFIANUS</h4>
                                    <span className="text-[10px] text-gray-400">Jul 27, 2025</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-0.5 truncate">Gym</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex gap-3 mb-3">
                            <div className="relative">
                                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Yusak" className="w-10 h-10 rounded-full bg-gray-100" />
                                <span className="material-icons-round text-green-500 text-sm absolute -bottom-1 -right-1 bg-white rounded-full">verified</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                    <h4 className="font-bold text-sm text-gray-900">YUSAK YOSEFIANUS</h4>
                                    <span className="text-[10px] text-gray-400">Jul 27, 2025</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-0.5 truncate">Please_DocuSign_NDA_PT_HKI_dan_Yusak_Yosefia</p>
                            </div>
                        </div>
                    </div>
                </main>
                <window.App.BottomNav />
            </div>
            );
};
