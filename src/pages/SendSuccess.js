const { useNavigate } = ReactRouterDOM;
const { StatusBar } = window.App;

window.App.SendSuccess = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark font-sans antialiased flex flex-col h-screen overflow-hidden">
            <StatusBar />
            <main className="flex-1 flex flex-col items-center justify-center px-6 w-full max-w-md mx-auto py-8">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-6 shadow-sm"><span className="material-icons-round text-5xl text-green-500">check</span></div>
                    <h1 className="text-2xl font-bold mb-2">Request sent</h1>
                    <p className="text-text-secondary-light text-sm text-center">Successfully sent to all recipients.</p>
                </div>
                <div className="w-full bg-surface-light dark:bg-surface-dark rounded-2xl shadow-card p-5 border border-border-light dark:border-border-dark mb-8">
                    <div className="flex items-start gap-4 mb-5">
                        <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 shrink-0"><span className="material-icons-round">forum</span></div>
                        <div className="flex-1"><h3 className="font-bold text-sm">Document Thread created</h3><p className="text-xs text-text-secondary-light mt-0.5 leading-relaxed">A dedicated secure channel established.</p></div>
                    </div>
                    <button onClick={() => navigate('/document-thread')} className="w-full py-3 bg-primary hover:bg-red-700 active:scale-[0.98] text-white rounded-xl font-semibold text-sm transition shadow-md shadow-red-100 dark:shadow-none flex items-center justify-center gap-2">
                        <span>Open thread</span><span className="material-icons-round text-lg">arrow_forward</span>
                    </button>
                </div>
            </main>
        </div>
    );
};
