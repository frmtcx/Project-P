const { useNavigate } = ReactRouterDOM;
const { StatusBar, Header } = window.App;

window.App.RequestSigStep2 = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen pb-24 flex flex-col">
            <StatusBar />
            <Header title="Request signature" subtitle="Step 2 of 3: Assign roles" showBack />
            <main className="flex-1 p-4 space-y-5">
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-3 flex items-start gap-3">
                    <span className="material-icons-round text-blue-500 text-sm mt-0.5">info</span>
                    <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">Participants must be members of <span className="font-semibold">Company A</span>.</p>
                </div>
                <section className="bg-surface-light dark:bg-surface-dark rounded-xl p-4 shadow-card border border-border-light dark:border-border-dark">
                    <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-2">
                            <div className="bg-red-100 dark:bg-red-900/30 p-1.5 rounded-lg text-primary"><span className="material-icons-round text-lg">edit</span></div>
                            <h2 className="font-semibold text-text-primary-light dark:text-text-primary-dark">Signers</h2>
                        </div>
                        <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">Required</span>
                    </div>
                    <button onClick={() => navigate('/people-picker')} className="w-full py-2.5 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center gap-2 text-sm font-medium text-primary hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
                        <span className="material-icons-round text-base">add_circle_outline</span> Add Signer
                    </button>
                </section>
            </main>
            <div className="fixed bottom-0 w-full bg-surface-light dark:bg-surface-dark border-t border-border-light dark:border-border-dark px-6 py-4 z-30 pb-8">
                <button onClick={() => navigate('/request-signature-3')} className="w-full bg-primary hover:bg-red-600 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-[0.98]">
                    Next <span className="material-icons-round text-lg">arrow_forward</span>
                </button>
            </div>
        </div>
    );
};
