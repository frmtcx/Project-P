const { useLocation, useNavigate } = ReactRouterDOM;

window.App.BottomNav = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Hide on specific pages if needed
    if (['/sign-document', '/create-menu'].includes(location.pathname)) return null;

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 pb-6 pt-3 z-50 flex justify-between items-end">
            <button onClick={() => navigate('/')} className={`flex flex-col items-center gap-1 ${isActive('/') ? 'text-red-600' : 'text-gray-400'}`}>
                <span className="material-icons-round text-2xl">home</span>
            </button>

            <button onClick={() => navigate('/documents-list')} className={`flex flex-col items-center gap-1 ${isActive('/documents-list') ? 'text-red-600' : 'text-gray-400'}`}>
                <span className="material-icons-round text-2xl">description</span>
            </button>

            {/* Central Scan Button */}
            <div className="relative -top-3">
                <button className="w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg shadow-red-200 active:scale-95 transition-transform">
                    <span className="material-icons-round text-2xl">center_focus_strong</span>
                </button>
            </div>

            <button onClick={() => navigate('/action-inbox')} className={`flex flex-col items-center gap-1 ${isActive('/action-inbox') ? 'text-red-600' : 'text-gray-400'}`}>
                <span className="material-icons-round text-2xl">receipt_long</span>
            </button>

            <button onClick={() => navigate('/profile-preview')} className={`flex flex-col items-center gap-1 ${isActive('/profile-preview') ? 'text-red-600' : 'text-gray-400'}`}>
                <span className="material-icons-round text-2xl">notifications</span>
            </button>
        </nav>
    );
};
