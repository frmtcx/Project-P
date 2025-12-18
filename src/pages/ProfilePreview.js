window.App.ProfilePreview = () => {
    const { useState, useEffect } = React;
    const { useNavigate } = ReactRouterDOM;
    const { StatusBar } = window.App;

    const navigate = useNavigate();
    const [workspace, setWorkspace] = useState(window.App.state.currentWorkspace);


    return (
        <div className="pb-24 bg-background-light min-h-screen font-sans pt-12">
            <StatusBar />
            {/* Header */}
            <header className="bg-transparent px-5 py-4 flex justify-between items-center sticky top-0 z-10">
                <button onClick={() => navigate(-1)} className="text-gray-600">
                    <span className="material-icons-round">arrow_back_ios</span>
                </button>
                <h1 className="text-lg font-bold text-gray-900">My Profile</h1>
                <button className="text-gray-600">
                    <span className="material-icons-round">qr_code_scanner</span>
                </button>
            </header>

            <main className="px-5 pt-2">
                {/* Profile Info */}
                <div className="flex flex-col items-center mb-8">
                    <div className="relative mb-4">
                        <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden border-4 border-white shadow-sm">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Frans" className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-gray-700/80 backdrop-blur-sm rounded-full p-1.5 border-2 border-white text-white flex items-center justify-center">
                            <span className="material-icons-round text-xs">camera_alt</span>
                        </div>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-1">FRANS</h2>
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <span className="material-icons-round text-sm">content_copy</span>
                        <span>FR6654</span>
                        <span className="material-icons-round text-green-500 text-sm">verified</span>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden mb-5">
                    <div className="p-4 flex items-center gap-4 border-b border-gray-50 active:bg-gray-50 transition cursor-pointer">
                        <span className="material-icons-round text-gray-400">call</span>
                        <span className="flex-1 text-sm font-medium text-gray-900">+6281290006654</span>
                        <span className="material-icons-round text-gray-300">chevron_right</span>
                    </div>
                    <div className="p-4 flex items-center gap-4 active:bg-gray-50 transition cursor-pointer">
                        <span className="material-icons-round text-gray-400">email</span>
                        <span className="flex-1 text-sm font-medium text-gray-900">frmtcx@gmail.com</span>
                        <span className="material-icons-round text-gray-300">chevron_right</span>
                    </div>
                </div>

                {/* Certificate & Identity */}
                <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden mb-5">
                    <div className="p-4 flex items-center gap-4 border-b border-gray-50 active:bg-gray-50 transition cursor-pointer">
                        <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500"><span className="material-icons-round">card_membership</span></div>
                        <div className="flex-1">
                            <h3 className="text-sm font-bold text-gray-900">Electronic certificate</h3>
                            <p className="text-xs text-green-600 font-medium mt-0.5">Active <span className="text-gray-400 font-normal">until December 6, 2026</span></p>
                        </div>
                        <span className="material-icons-round text-gray-300">chevron_right</span>
                    </div>
                    <div className="p-4 flex items-center gap-4 border-b border-gray-50 active:bg-gray-50 transition cursor-pointer">
                        <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500"><span className="material-icons-round">badge</span></div>
                        <div className="flex-1">
                            <h3 className="text-sm font-bold text-gray-900">My identity</h3>
                            <p className="text-xs text-text-secondary-light mt-0.5">Your detailed personal information</p>
                        </div>
                        <span className="material-icons-round text-gray-300">chevron_right</span>
                    </div>
                    <div className="p-4 flex items-center gap-4 active:bg-gray-50 transition cursor-pointer">
                        <div className="w-9 h-9 rounded-xl bg-pink-50 flex items-center justify-center text-pink-500"><span className="material-icons-round">share</span></div>
                        <div className="flex-1">
                            <h3 className="text-sm font-bold text-gray-900">Shared data</h3>
                            <p className="text-xs text-text-secondary-light mt-0.5 leading-tight">Privy's counterpart list, and your data has been shared with them</p>
                        </div>
                        <span className="material-icons-round text-gray-300">chevron_right</span>
                    </div>
                </div>

                {/* Settings */}
                <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden mb-5">
                    <div className="p-4 flex items-center gap-4 active:bg-gray-50 transition cursor-pointer">
                        <span className="material-icons-round text-gray-400">settings</span>
                        <div className="flex-1">
                            <h3 className="text-sm font-bold text-gray-900">Settings</h3>
                            <p className="text-xs text-text-secondary-light mt-0.5">Manage your signature, notification, and account security settings</p>
                        </div>
                        <span className="material-icons-round text-gray-300">chevron_right</span>
                    </div>
                </div>

                {/* Support */}
                <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden mb-8">
                    <div className="p-4 flex items-center gap-4 border-b border-gray-50 active:bg-gray-50 transition cursor-pointer">
                        <span className="material-icons-round text-gray-400">star_outline</span>
                        <span className="flex-1 text-sm font-bold text-gray-900">Rate us</span>
                        <span className="material-icons-round text-gray-300">chevron_right</span>
                    </div>
                    <div className="p-4 flex items-center gap-4 active:bg-gray-50 transition cursor-pointer">
                        <span className="material-icons-round text-gray-400">headset_mic</span>
                        <span className="flex-1 text-sm font-bold text-gray-900">Help center</span>
                        <span className="material-icons-round text-gray-300">chevron_right</span>
                    </div>
                </div>

                <p className="text-center text-xs text-gray-400 mb-8">Version 4.13.0</p>
            </main>
        </div>
    );
};
