const { useNavigate } = ReactRouterDOM;

window.App.Header = ({ title, subtitle, showBack, onBack, rightIcon = "more_vert" }) => {
    const navigate = useNavigate();
    return (
        <header className="bg-surface-light dark:bg-surface-dark px-4 py-3 sticky top-8 z-40 border-b border-border-light dark:border-border-dark flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
                {showBack && (
                    <button onClick={onBack || (() => navigate(-1))} className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition p-1 -ml-1">
                        <span className="material-icons-round text-2xl">arrow_back</span>
                    </button>
                )}
                <div className="flex flex-col">
                    <h1 className="font-bold text-base truncate">{title}</h1>
                    {subtitle && <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark">{subtitle}</span>}
                </div>
            </div>
            <button className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition p-1">
                <span className="material-icons-round text-2xl">{rightIcon}</span>
            </button>
        </header>
    );
};
