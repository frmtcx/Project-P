window.App.ChatsList = () => {
    const { useNavigate } = ReactRouterDOM;

    return (
        <div className="pb-24 bg-white min-h-screen font-sans">
            {/* Header */}
            <header className="bg-white px-5 py-4 flex justify-between items-center sticky top-0 z-10 border-b border-gray-100">
                <div className="w-8"></div> {/* Spacer */}
                <h1 className="text-lg font-bold text-gray-900">Chat</h1>
                <button className="text-gray-600">
                    <span className="material-icons-round">more_vert</span>
                </button>
            </header>

            <main>
                {/* Chat List */}
                <div className="divide-y divide-gray-100">
                    {/* Item 1: Yusak */}
                    <div className="px-5 py-4 flex gap-3 hover:bg-gray-50 cursor-pointer" onClick={() => useNavigate('/document-thread')}>
                        <div className="relative">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Yusak" className="w-12 h-12 rounded-full bg-gray-100" />
                            <span className="material-icons-round text-green-500 text-sm absolute -bottom-1 -right-1 bg-white rounded-full">verified</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-baseline mb-1">
                                <h3 className="font-bold text-gray-900 text-sm truncate">YUSAK YOSEFIANUS</h3>
                                <div className="flex items-center gap-1">
                                    <span className="material-icons-round text-blue-500 text-sm">done_all</span>
                                    <span className="text-xs text-gray-400">Mon</span>
                                </div>
                            </div>
                            <p className="text-sm text-gray-500 truncate">Frans_CV_December_2025.pdf</p>
                        </div>
                    </div>

                    {/* Item 2: Saved Messages */}
                    <div className="px-5 py-4 flex gap-3 hover:bg-gray-50 cursor-pointer">
                        <div className="w-12 h-12 rounded-full bg-blue-400 flex items-center justify-center text-white">
                            <span className="material-icons-round text-2xl">bookmark</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-baseline mb-1">
                                <h3 className="font-bold text-gray-900 text-sm truncate">Saved messages</h3>
                                <span className="text-xs text-gray-400">Mon</span>
                            </div>
                            <div className="flex items-center gap-1 text-gray-500">
                                <span className="material-icons-round text-sm">image</span>
                                <p className="text-sm truncate">Photo</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* FAB */}
            <div className="fixed bottom-24 right-5 z-20">
                <button onClick={() => useNavigate('/new-message')} className="w-14 h-14 bg-red-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-red-700 transition active:scale-95">
                    <span className="material-icons-round text-2xl">chat_bubble_outline</span>
                </button>
            </div>

            <window.App.BottomNav />
        </div>
    );
};
