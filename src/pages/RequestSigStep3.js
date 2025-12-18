const { useNavigate } = ReactRouterDOM;
const { StatusBar, Header } = window.App;

window.App.RequestSigStep3 = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen text-text-primary-light dark:text-text-primary-dark pb-36">
            <StatusBar />
            <Header title="Request Signature" showBack />
            <div className="px-6 py-5">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider">Step 3 of 3</span>
                    <span className="text-xs font-semibold text-primary">Review & send</span>
                </div>
                <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"><div className="h-full bg-primary w-full rounded-full"></div></div>
                <h2 className="text-2xl font-bold mt-5 mb-1">Review & send</h2>
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Finalize details before sending the request.</p>
            </div>
            <main className="px-4 space-y-6">
                <section className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-card p-4 flex items-center gap-4 border border-border-light dark:border-border-dark">
                    <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-primary shrink-0 border border-red-100 dark:border-red-900/30">
                        <span className="material-icons-round text-2xl">picture_as_pdf</span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm truncate">Employment Contract v3.pdf</h3>
                        <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-0.5">1.2 MB • Uploaded just now</p>
                    </div>
                </section>
                <section className="space-y-3">
                    <div className="flex justify-between items-center px-1"><h3 className="text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider">Participants</h3><button className="text-xs text-primary font-bold hover:underline">Edit</button></div>
                    <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-card divide-y divide-border-light dark:divide-border-dark overflow-hidden border border-border-light dark:border-border-dark">
                        <div className="flex items-center gap-3 p-3.5">
                            <img className="w-10 h-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMdePd5DX-qMRDtoSEk0ZyMn61vtWyg7QkKAxOCUkzwSTEKJtODOq_92-k8i7_xhxL9prFNNz7a2GpMLU7C9PfO51kK4_REPs-oY6D22t44q0_mJwTk_ryXSVrYI93c29aZZA2Bc8oLu5JE_R6QDY0bAuwuitz9lVciwk0bN4K47GZp4KHufh3Q0n9BJ7dFCGb-bGnR8aMLHYpBO-HbMfDEYEHHHp0VX3c1yXdtioA59AZ6x_2e6fUl0STElWLZOiR7xv7Q7DZpIM" />
                            <div className="flex-1 min-w-0"><div className="flex items-center gap-2 mb-0.5"><span className="font-semibold text-sm truncate">Sarah</span><span className="bg-red-100 text-red-700 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">Signer</span></div><p className="text-xs text-text-secondary-light truncate">sarah@companya.com</p></div>
                        </div>
                    </div>
                </section>
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/50 rounded-xl p-4 flex gap-3 items-start">
                    <span className="material-icons-round text-blue-600 dark:text-blue-400 text-xl shrink-0 mt-0.5">info</span>
                    <p className="text-xs leading-5 text-blue-800 dark:text-blue-200">A <strong className="font-semibold">Document Thread</strong> and <strong className="font-semibold">Action Inbox</strong> tasks will be created automatically.</p>
                </div>
            </main>
            <div className="fixed bottom-0 left-0 right-0 bg-surface-light dark:bg-surface-dark border-t border-border-light dark:border-border-dark p-5 pb-8 z-50 shadow-up">
                <button onClick={() => navigate('/send-success')} className="w-full bg-primary text-white font-semibold text-base py-3.5 rounded-xl shadow-lg shadow-red-200 dark:shadow-red-900/30 hover:bg-red-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                    <span>Send request</span><span className="material-icons-round text-lg">send</span>
                </button>
            </div>
        </div>
    );
};
