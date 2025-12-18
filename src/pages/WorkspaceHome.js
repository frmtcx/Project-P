console.log("Loading WorkspaceHome.js");

try {
    console.log("Loading WorkspaceHome.js. App ID:", window.App?._id);
    window.App.WorkspaceHome = () => {
        const { useState, useEffect } = React;
        const { useNavigate } = ReactRouterDOM;

        // Safely get BottomNav
        const BottomNav = window.App.BottomNav || (() => <div className="p-4 text-red-500">BottomNav missing</div>);

        const navigate = useNavigate();
        const [workspace, setWorkspace] = useState(window.App.state.currentWorkspace);

        useEffect(() => {
            return window.App.state.subscribe(() => {
                setWorkspace(window.App.state.currentWorkspace);
            });
        }, []);

        return (
            <div className="pb-24 bg-gray-50 min-h-screen font-sans">
                {/* Header Section */}
                <header className="px-5 pt-6 pb-4 bg-gray-50 sticky top-0 z-10">
                    <div className="flex justify-between items-start">
                        <div className="flex gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border border-gray-300">
                                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Frans" alt="Profile" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold text-gray-900">Hello, Frans</h1>
                                <p className="text-xs text-gray-500">How's today? Be careful on your way home.</p>
                            </div>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                            <span className="material-icons-round text-2xl">help_outline</span>
                        </button>
                    </div>
                </header>

                <main className="px-5 space-y-5">
                    {/* Maintenance Notice */}
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-3 items-start">
                        <div className="text-blue-500 mt-0.5"><span className="material-icons-round">handyman</span></div>
                        <div>
                            <h3 className="text-sm font-bold text-gray-900">Maintenance notice!</h3>
                            <p className="text-xs text-gray-500 mt-1 leading-relaxed">Maintenance will occur on Dec 20, 2025, 02:00 - 03:00 (UTC+7).</p>
                        </div>
                    </div>

                    {/* Personal Plan Card */}
                    <div className="bg-gradient-to-r from-[#8B1D3B] to-[#A92448] rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
                        {/* Background Pattern Decoration */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-10 -mt-10"></div>

                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-2">
                                <span className="material-icons-round text-red-300">verified_user</span>
                                <span className="font-bold text-lg tracking-wide">FR6654</span>
                                <span className="material-icons-round text-sm opacity-70">chevron_right</span>
                            </div>
                            <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1.5">
                                <span className="material-icons-round text-xs">card_membership</span>
                                <span className="text-xs font-semibold">Personal Plan</span>
                            </div>
                        </div>

                        <div className="flex divide-x divide-white/20">
                            <div className="flex-1 pr-4">
                                <p className="text-xs text-red-100 mb-1">Signing quota</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-xl font-bold text-blue-200">Unlimited</span>
                                    <span className="material-icons-round text-sm opacity-70">chevron_right</span>
                                </div>
                            </div>
                            <div className="flex-1 pl-4">
                                <p className="text-xs text-red-100 mb-1">e-Meterai</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-xl font-bold text-blue-200">1</span>
                                    <span className="material-icons-round text-sm opacity-70">add_circle_outline</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2 text-xs text-red-100">
                            <span className="material-icons-round text-sm">info</span>
                            <span>Expired: January 15, 2026</span>
                        </div>
                    </div>

                    {/* Feature Grid */}
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 grid grid-cols-4 gap-2">
                        <div className="flex flex-col items-center gap-2 cursor-pointer" onClick={() => navigate('/documents-list')}>
                            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                                <span className="material-icons-round text-2xl">description</span>
                            </div>
                            <span className="text-[10px] font-medium text-gray-600">Document</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 cursor-pointer">
                            <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
                                <span className="material-icons-round text-2xl">cloud_upload</span>
                            </div>
                            <span className="text-[10px] font-medium text-gray-600">Upload</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 cursor-pointer">
                            <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                                <span className="material-icons-round text-2xl">receipt_long</span>
                            </div>
                            <span className="text-[10px] font-medium text-gray-600">Transactions</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 cursor-pointer">
                            <div className="w-12 h-12 rounded-xl bg-yellow-50 flex items-center justify-center text-yellow-600">
                                <span className="material-icons-round text-2xl">emoji_events</span>
                            </div>
                            <span className="text-[10px] font-medium text-gray-600">Privylege</span>
                        </div>
                    </div>

                    {/* Banner */}
                    <div className="rounded-2xl overflow-hidden shadow-sm relative h-32 bg-gradient-to-r from-blue-600 to-blue-400 flex items-center px-6">
                        <div className="w-2/3 z-10">
                            <h3 className="text-white font-bold text-lg leading-tight mb-1">Tax Matters More Efficient</h3>
                            <p className="text-blue-100 text-xs mb-3">Ayopajak, one platform for digital tax reporting</p>
                            <button className="bg-blue-500 text-white text-[10px] font-bold px-3 py-1.5 rounded shadow-sm">LEARN MORE</button>
                        </div>
                        <div className="absolute right-0 bottom-0 h-full w-1/2 bg-white/10 transform skew-x-12"></div>
                    </div>

                    {/* Action Required Preview */}
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100" onClick={() => navigate('/action-inbox')}>
                        <div className="flex justify-between items-center mb-1">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl font-bold text-blue-600">4</span>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-sm">Action Required</h3>
                                    <p className="text-xs text-gray-400">Updated today • 18:20</p>
                                </div>
                            </div>
                            <span className="material-icons-round text-blue-600">arrow_forward</span>
                        </div>
                    </div>
                </main>
                <BottomNav />
            </div>
        );
    };
    console.log("WorkspaceHome.js loaded successfully. App Keys:", Object.keys(window.App));
} catch (error) {
    console.error("Error loading WorkspaceHome.js:", error);
    window.App.WorkspaceHome = () => (
        <div className="p-4 text-red-500">
            <h2 className="font-bold">Error loading WorkspaceHome</h2>
            <pre className="text-xs mt-2 overflow-auto">{error.toString()}</pre>
        </div>
    );
}
