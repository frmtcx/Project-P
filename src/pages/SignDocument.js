const { useNavigate } = ReactRouterDOM;
const { StatusBar } = window.App;

window.App.SignDocument = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark flex flex-col h-screen">
            <StatusBar time="16:52" />
            <header className="bg-surface-light dark:bg-surface-dark px-4 py-3 sticky top-8 z-40 border-b border-border-light flex items-center justify-between">
                <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-gray-100"><span className="material-icons-round">arrow_back</span></button>
                <h1 className="text-lg font-bold">Sign document</h1>
                <div className="w-10"></div>
            </header>
            <main className="flex-1 overflow-y-auto p-4 pb-32">
                <section className="mb-6">
                    <div className="flex justify-between items-end mb-2 px-1"><h2 className="text-xs font-bold text-text-secondary-light uppercase tracking-wider">Preview</h2><span className="text-xs text-primary font-medium">Page 1 of 3</span></div>
                    <div className="relative bg-gray-200 dark:bg-gray-800 rounded-xl p-3 h-80 overflow-hidden border border-border-light shadow-inner">
                        <div className="bg-white h-full w-full rounded shadow-sm p-6 overflow-hidden relative">
                            <div className="space-y-4 opacity-40 select-none pointer-events-none">
                                <div className="h-4 bg-gray-800 w-1/3 rounded mb-6"></div>
                                <div className="space-y-2"><div className="h-2 bg-gray-400 w-full rounded"></div><div className="h-2 bg-gray-400 w-full rounded"></div></div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-card p-4 mb-6 border border-border-light">
                    <h3 className="text-sm font-semibold mb-4">Document Summary</h3>
                    <div className="space-y-4">
                        <div className="flex items-start justify-between"><div className="flex items-center gap-2 text-text-secondary-light"><span className="material-icons-round text-lg">description</span><span className="text-sm">Document</span></div><span className="text-sm font-medium text-right max-w-[60%] truncate">NDA - Project Alpha.pdf</span></div>
                        <div className="w-full h-px bg-border-light"></div>
                        <div className="flex items-start justify-between"><div className="flex items-center gap-2 text-text-secondary-light"><span className="material-icons-round text-lg">event</span><span className="text-sm">Deadline</span></div><span className="text-sm font-medium text-right text-red-600">25 Oct 2025</span></div>
                    </div>
                </section>
            </main>
            <div className="bg-surface-light dark:bg-surface-dark border-t border-border-light p-4 shadow-up sticky bottom-0 z-50">
                <div className="flex flex-col gap-3">
                    <button onClick={() => navigate('/signing-success')} className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3.5 px-4 rounded-xl shadow-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                        <span className="material-icons-round">edit</span> Sign now
                    </button>
                    <button onClick={() => navigate(-1)} className="w-full bg-transparent hover:bg-gray-100 text-text-secondary-light font-medium py-3.5 px-4 rounded-xl transition-colors">Cancel</button>
                </div>
            </div>
        </div>
    );
};
