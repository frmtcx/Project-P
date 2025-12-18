const { useNavigate } = ReactRouterDOM;
const { StatusBar } = window.App;

window.App.DocumentThreadCompleted = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark h-screen flex flex-col pt-12">

            <header className="bg-surface-light dark:bg-surface-dark px-4 py-3 border-b border-border-light flex items-center justify-between shrink-0 shadow-top-bar z-40">
                <div className="flex items-center gap-3">
                    <button onClick={() => navigate('/action-inbox')} className="text-text-secondary-light hover:text-primary transition"><span className="material-icons-round">arrow_back</span></button>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2"><span className="font-bold text-base truncate max-w-[200px]">NDA - Project Alpha</span><span className="bg-orange-100 text-orange-700 text-[10px] px-1.5 py-0.5 rounded font-medium">Document</span></div>
                        <span className="text-xs text-text-secondary-light">3 participants</span>
                    </div>
                </div>
            </header>
            <main className="flex-1 overflow-y-auto chat-scroll px-4 py-4 space-y-6 bg-background-light dark:bg-background-dark">
                <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-card p-4 border border-green-200 relative overflow-hidden">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600"><span className="material-icons-round">check_circle</span></div>
                            <div><h3 className="font-semibold text-sm text-green-700">Document Completed</h3><p className="text-xs text-text-secondary-light">Today, 14:30</p></div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <button className="flex items-center justify-center gap-2 py-2.5 px-4 bg-primary text-white text-sm font-medium rounded-xl shadow-sm hover:bg-primary-dark transition active:scale-95"><span className="material-icons-round text-lg">visibility</span> View Signed</button>
                        <button className="flex items-center justify-center gap-2 py-2.5 px-4 bg-white border border-border-light text-text-primary-light text-sm font-medium rounded-xl hover:bg-gray-50 transition active:scale-95"><span className="material-icons-round text-lg">download</span> Download</button>
                    </div>
                </div>
                <div className="flex justify-center my-4">
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 ring-4 ring-background-light"><span className="material-icons-round text-sm">check</span></div>
                        <span className="text-xs font-medium text-text-secondary-light">Signing completed • 14:30 PM</span>
                    </div>
                </div>
            </main>
        </div>
    );
};
