const { useNavigate } = ReactRouterDOM;
window.App.DocumentThread = () => {
    const { StatusBar } = window.App;
    const navigate = useNavigate();
    return (
        <div className="bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark h-screen flex flex-col">
            <StatusBar />
            <header className="bg-surface-light dark:bg-surface-dark px-4 py-3 sticky top-8 z-40 border-b border-border-light dark:border-border-dark flex items-center gap-3">
                <button onClick={() => navigate(-1)} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"><span className="material-icons-round">arrow_back</span></button>
                <div className="flex-1 min-w-0">
                    <h1 className="font-bold text-base truncate flex items-center gap-2">Employment Contract v3</h1>
                    <div className="flex items-center gap-2">
                        <span className="inline-flex items-center rounded-md bg-orange-50 dark:bg-orange-900/30 px-1.5 py-0.5 text-xs font-bold text-orange-700 dark:text-orange-400 ring-1 ring-inset ring-orange-600/20">Document Thread</span>
                    </div>
                </div>
                <button onClick={() => navigate('/share-guardrail')} className="p-2 rounded-full hover:bg-gray-100 text-primary"><span className="material-icons-round">ios_share</span></button>
            </header>
            <main className="flex-1 overflow-y-auto p-4 space-y-6 bg-background-light dark:bg-background-dark pb-28">
                {/* Pinned Card */}
                <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-card border border-orange-200 dark:border-orange-900 overflow-hidden">
                    <div className="bg-orange-50 dark:bg-orange-900/20 px-4 py-2 border-b border-orange-100 dark:border-orange-900/50 flex justify-between items-center">
                        <div className="flex items-center gap-1.5"><span className="material-icons-round text-orange-500 text-sm">hourglass_empty</span><span className="text-xs font-bold text-orange-700 dark:text-orange-400 uppercase tracking-wide">In Review</span></div>
                        <span className="text-xs font-medium text-orange-600/70 dark:text-orange-400/70">Due Oct 24</span>
                    </div>
                    <div className="p-4">
                        <div className="flex items-start gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-primary shrink-0"><span className="material-icons-round">description</span></div>
                            <div><h3 className="font-semibold text-sm">Employment Contract v3.pdf</h3><p className="text-xs text-text-secondary-light">Awaiting review</p></div>
                        </div>
                        <button onClick={() => navigate('/document-thread-reviewer')} className="w-full py-2.5 rounded-xl border-2 border-primary text-primary hover:bg-red-50 transition text-sm font-bold flex items-center justify-center gap-2">
                            <span className="material-icons-round text-lg">notifications_active</span> Nudge reviewer
                        </button>
                    </div>
                </div>

                {/* System Events & Chat */}
                <div className="space-y-6">
                    {/* System Event 1 */}
                    <div className="flex flex-col items-center gap-1 opacity-70">
                        <div className="h-6 w-px bg-border-light dark:border-border-dark mb-1"></div>
                        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                            <span className="material-icons-round text-sm text-text-secondary-light">history_edu</span>
                            <span className="text-xs font-medium text-text-secondary-light">Signing request created by You</span>
                        </div>
                        <span className="text-[10px] text-text-secondary-light">Mon, 10:00 AM</span>
                    </div>

                    {/* System Event 2 */}
                    <div className="flex flex-col items-center gap-1 opacity-70">
                        <div className="h-6 w-px bg-border-light dark:border-border-dark mb-1"></div>
                        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                            <span className="material-icons-round text-sm text-text-secondary-light">group_add</span>
                            <span className="text-xs font-medium text-text-secondary-light">Participants added: Alice (Signer), Bob (Reviewer)</span>
                        </div>
                    </div>

                    {/* Chat Message */}
                    <div className="flex flex-col items-end gap-1">
                        <div className="flex items-end gap-2 max-w-[85%]">
                            <div className="bg-primary text-white px-4 py-2.5 rounded-2xl rounded-tr-sm shadow-sm"><p className="text-sm">Hi Bob, uploaded v3 with requested changes.</p></div>
                        </div>
                        <span className="text-xs text-text-secondary-light mr-1">10:05 AM</span>
                    </div>
                </div>
            </main>
            <footer className="fixed bottom-0 left-0 right-0 bg-surface-light dark:bg-surface-dark border-t border-border-light dark:border-border-dark p-3 z-50">
                <div className="flex items-end gap-2">
                    <button className="p-2 text-text-secondary-light hover:bg-gray-100 rounded-full"><span className="material-icons-round">add_circle_outline</span></button>
                    <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center px-4 py-2 min-h-[44px]"><input className="bg-transparent border-none focus:ring-0 w-full text-sm p-0" placeholder="Message..." type="text" /></div>
                    <button className="p-2 text-primary hover:bg-red-50 rounded-full"><span className="material-icons-round">send</span></button>
                </div>
            </footer>
        </div>
    );
};
