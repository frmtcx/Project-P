window.App.BottomNav = () => {
    const { useLocation, useNavigate } = ReactRouterDOM;
    const location = useLocation();
    const navigate = useNavigate();

    // Hide on specific pages if needed
    if (['/sign-document', '/create-menu', '/new-message', '/scan-qr'].includes(location.pathname)) return null;

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="fixed bottom-0 w-full max-w-md mx-auto bg-white border-t border-gray-100 px-6 pb-8 pt-3 z-50 flex justify-between items-end shadow-[0_-5px_20px_rgba(0,0,0,0.02)] left-0 right-0 md:left-auto md:right-auto">
            <button onClick={() => navigate('/')} className={`flex flex-col items-center gap-1 p-2 rounded-xl transition ${isActive('/') ? 'text-primary bg-red-50' : 'text-gray-400 hover:text-gray-600'}`}>
                <span className="material-icons-round text-[26px]">home</span>
            </button>

            <button onClick={() => navigate('/documents-list')} className={`flex flex-col items-center gap-1 p-2 rounded-xl transition ${isActive('/documents-list') ? 'text-primary bg-red-50' : 'text-gray-400 hover:text-gray-600'}`}>
                <span className="material-icons-round text-[26px]">folder_open</span>
            </button>

            {/* Central Scan Button */}
            <div className="relative -top-5">
                <button onClick={() => navigate('/scan-qr')} className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-red-200 active:scale-95 transition-transform border-4 border-white">
                    <span className="material-icons-round text-[28px]">qr_code_scanner</span>
                </button>
            </div>

            <button onClick={() => navigate('/chats-list')} className={`flex flex-col items-center gap-1 p-2 rounded-xl transition ${isActive('/chats-list') || isActive('/action-inbox') || isActive('/document-thread') ? 'text-primary bg-red-50' : 'text-gray-400 hover:text-gray-600'}`}>
                <span className="material-icons-round text-[26px]">chat_bubble_outline</span>
            </button>

            <button onClick={() => navigate('/notifications')} className={`flex flex-col items-center gap-1 p-2 rounded-xl transition ${isActive('/notifications') ? 'text-primary bg-red-50' : 'text-gray-400 hover:text-gray-600'}`}>
                <span className="material-icons-round text-[26px]">notifications_none</span>
            </button>
        </nav>
    );
};
