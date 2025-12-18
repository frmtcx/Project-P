window.App.Notifications = () => {
    const { useNavigate } = ReactRouterDOM;

    return (
        <div className="pb-24 bg-white min-h-screen font-sans">
            {/* Header */}
            <header className="bg-white px-5 pt-14 pb-2 sticky top-0 z-10">
                <div className="flex justify-between items-center mb-4">
                    <div className="w-10"></div> {/* Spacer */}
                    <h1 className="text-lg font-bold text-gray-900">Notifications</h1>
                    <button className="text-red-500 text-sm font-medium">Read all</button>
                </div>
                <p className="text-center text-xs text-gray-400 -mt-3 mb-4">Updated today • 18:21</p>

                {/* Tabs */}
                <div className="flex gap-2 mb-2">
                    <button className="flex-1 py-1.5 rounded-full border border-blue-500 text-blue-500 text-sm font-medium bg-blue-50">Document</button>
                    <button className="flex-1 py-1.5 rounded-full border border-gray-200 text-gray-500 text-sm font-medium">Account</button>
                    <button className="flex-1 py-1.5 rounded-full border border-gray-200 text-gray-500 text-sm font-medium">Promotion</button>
                </div>
            </header>

            <main>
                {/* Document Access Request */}
                <div className="px-5 mb-4">
                    <div className="border border-gray-100 rounded-xl p-4 flex items-center gap-3 shadow-sm">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-400">
                            <span className="material-icons-round">description</span>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-sm font-bold text-gray-900">Document Access Request</h3>
                            <p className="text-xs text-gray-500">Everything's clear, no one has requested access yet</p>
                        </div>
                        <span className="material-icons-round text-gray-300">chevron_right</span>
                    </div>
                </div>

                {/* Notification List */}
                <div className="bg-gray-50 py-2 px-5 text-xs font-bold text-gray-500">15 December 2025</div>
                <div className="px-5 py-4 bg-white border-b border-gray-100">
                    <div className="flex gap-3">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Frans" className="w-8 h-8 rounded-full bg-gray-100" />
                        <div className="flex-1">
                            <p className="text-sm text-gray-900"><span className="font-bold">FRANS (FR6654)</span> has signed document <span className="font-bold">Frans_CV_December_2025</span></p>
                            <p className="text-xs text-gray-400 mt-1 text-right">14:42</p>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 py-2 px-5 text-xs font-bold text-gray-500">27 July 2025</div>
                <div className="px-5 py-4 bg-blue-50 border-b border-blue-100">
                    <div className="flex gap-3">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Yusak" className="w-8 h-8 rounded-full bg-gray-100" />
                        <div className="flex-1">
                            <p className="text-sm text-gray-900"><span className="font-bold">YUSAK YOSEFIANUS (LOYYUSO221)</span> asks you to sign <span className="font-bold">Gym</span></p>
                            <p className="text-xs text-gray-400 mt-1 text-right">21:46</p>
                        </div>
                    </div>
                </div>
                <div className="px-5 py-4 bg-blue-50 border-b border-blue-100">
                    <div className="flex gap-3">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Yusak" className="w-8 h-8 rounded-full bg-gray-100" />
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <p className="text-sm text-gray-900"><span className="font-bold">YUSAK YOSEFIANUS (LOYYUSO221)</span> asks you to sign <span className="font-bold">Please_DocuSign_NDA_PT_HKI_dan_Yusak...</span></p>
                                <span className="material-icons-round text-gray-400 text-sm">expand_more</span>
                            </div>
                            <p className="text-xs text-gray-400 mt-1 text-right">21:27</p>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 py-2 px-5 text-xs font-bold text-gray-500">23 July 2025</div>
                <div className="px-5 py-4 bg-blue-50 border-b border-blue-100">
                    <div className="flex gap-3">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Yusak" className="w-8 h-8 rounded-full bg-gray-100" />
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <p className="text-sm text-gray-900"><span className="font-bold">YUSAK YOSEFIANUS (LOYYUSO221)</span> asks you to sign <span className="font-bold">Please_DocuSign_NDA_PT_HKI_dan_Yusak...</span></p>
                                <span className="material-icons-round text-gray-400 text-sm">expand_more</span>
                            </div>
                            <p className="text-xs text-gray-400 mt-1 text-right">23:00</p>
                        </div>
                    </div>
                </div>
            </main>

            <window.App.BottomNav />
        </div>
    );
};
