const { useNavigate } = ReactRouterDOM;
const { StatusBar } = window.App;

window.App.SignerView = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark h-screen flex flex-col pt-12">

            <header className="bg-surface-light dark:bg-surface-dark px-4 py-3 border-b border-border-light flex items-center gap-3 shrink-0 sticky top-0 z-40 shadow-sm">
                <button onClick={() => navigate(-1)} className="text-text-secondary-light hover:text-primary transition p-1 -ml-1"><span className="material-icons-round text-2xl">arrow_back</span></button>
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <div className="flex items-center gap-2"><h1 className="font-bold text-base truncate">NDA - Project Alpha</h1><span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-orange-100 text-orange-700 tracking-wide">DOC</span></div>
                </div>
            </header>
            <main className="flex-1 overflow-y-auto p-4 space-y-5 bg-background-light dark:bg-background-dark no-scrollbar">
                <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-card p-0 border border-border-light overflow-hidden relative group">
                    <div className="bg-gradient-to-r from-orange-50 to-orange-100 px-4 py-2 flex justify-between items-center border-b border-orange-100">
                        <div className="flex items-center gap-1.5"><span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span></span><span className="text-xs font-bold text-orange-800 uppercase tracking-wide">In Signing</span></div>
                        <span className="bg-white text-orange-700 text-[10px] font-bold px-2 py-0.5 rounded border border-orange-200 shadow-sm">YOU ARE PENDING</span>
                    </div>
                    <div className="p-5">
                        <div className="flex items-start gap-4 mb-5">
                            <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-primary shrink-0"><span className="material-icons-round text-3xl">description</span></div>
                            <div className="flex-1 min-w-0"><h2 className="font-bold text-sm leading-tight mb-1">Non-Disclosure Agreement.pdf</h2><div className="text-xs text-text-secondary-light flex items-center gap-1"><span className="material-icons-round text-[14px]">history</span><span>Version 2.0 • 245 KB</span></div></div>
                        </div>
                        <button onClick={() => navigate('/sign-document')} className="w-full py-3.5 px-4 bg-primary hover:bg-red-700 text-white font-semibold rounded-xl shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 mb-3">
                            <span className="material-icons-round">edit_document</span> Sign
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};
