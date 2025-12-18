const { useNavigate, useLocation } = ReactRouterDOM;

window.App.BottomNav = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Helper to check active state roughly
    const isActive = (path) => location.pathname.startsWith(path);

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-surface-light dark:bg-surface-dark border-t border-border-light dark:border-border-dark py-2 px-6 flex justify-between items-center z-40 pb-6">
            <button onClick={() => navigate('/')} className={`flex flex-col items-center gap-1 ${isActive('/') && location.pathname === '/' ? 'text-primary' : 'text-text-secondary-light dark:text-text-secondary-dark'}`}>
                <span className="material-icons-round text-2xl">home</span>
            </button>
            <button onClick={() => navigate('/docs')} className={`flex flex-col items-center gap-1 ${isActive('/docs') ? 'text-primary' : 'text-text-secondary-light dark:text-text-secondary-dark'}`}>
                <span className="material-icons-round text-2xl">description</span>
            </button>
            <div className="relative -top-5">
                <button onClick={() => navigate('/create-menu')} className="w-14 h-14 bg-primary rounded-full flex items-center justify-center text-white shadow-lg shadow-red-200 dark:shadow-red-900 active:scale-95 transition">
                    <span className="material-icons-round text-2xl">qr_code_scanner</span>
                </button>
            </div>
            <button onClick={() => navigate('/chats')} className={`flex flex-col items-center gap-1 ${isActive('/chats') ? 'text-primary' : 'text-text-secondary-light dark:text-text-secondary-dark'}`}>
                <span className="material-icons-round text-2xl">chat_bubble_outline</span>
            </button>
            <button onClick={() => navigate('/admin-overview')} className={`flex flex-col items-center gap-1 ${isActive('/admin') ? 'text-primary' : 'text-text-secondary-light dark:text-text-secondary-dark'}`}>
                <span className="material-icons-round text-2xl">notifications_none</span>
            </button>
        </nav>
    );
};
