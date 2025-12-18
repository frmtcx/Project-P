const { useNavigate } = ReactRouterDOM;
window.App.RequestSigStep3 = () => {
    const { useNavigate, useLocation } = ReactRouterDOM;
    const { Header } = window.App;

    const navigate = useNavigate();
    const location = useLocation();
    const { docId, participants } = location.state || {};

    const doc = window.App.state.documents.find(d => d.id === docId);

    const handleSubmit = () => {
        // Create the request in global state
        const threadId = window.App.state.createSigningRequest(docId, participants);

        // Navigate to success, passing threadId to link to it
        navigate('/send-success', { state: { threadId } });
    };

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col">
            <Header title="Review Request" showBack onBack={() => navigate(-1)} />

            <div className="flex-1 p-5">
                <div className="mb-6">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">Step 3 of 3</span>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-1">Ready to send?</h2>
                </div>

                <div className="bg-white dark:bg-surface-dark rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 mb-6">
                    <h3 className="text-xs font-bold text-gray-500 uppercase mb-3">Document</h3>
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${doc?.type === 'pdf' ? 'bg-red-50 text-primary' : 'bg-blue-50 text-blue-600'}`}>
                            <span className="material-icons-round">{doc?.type === 'pdf' ? 'picture_as_pdf' : 'description'}</span>
                        </div>
                        <span className="font-bold text-sm">{doc?.name}</span>
                    </div>
                </div>

                <div className="bg-white dark:bg-surface-dark rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
                    <h3 className="text-xs font-bold text-gray-500 uppercase mb-3">Recipients</h3>
                    <div className="space-y-4">
                        {participants?.map(p => {
                            const display = window.App.utils.getUserDisplay(p.userId);
                            return (
                                <div key={p.userId} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <img src={display.avatar} className="w-8 h-8 rounded-full bg-gray-100" />
                                        <div>
                                            <p className="text-sm font-bold text-gray-900 dark:text-white">{display.name}</p>
                                            <p className="text-xs text-gray-500">{display.subtitle}</p>
                                        </div>
                                    </div>
                                    <span className={`text-xs font-bold px-2 py-1 rounded capitalize ${p.role === 'signer' ? 'bg-blue-50 text-blue-600' :
                                        p.role === 'reviewer' ? 'bg-orange-50 text-orange-600' :
                                            'bg-gray-100 text-gray-600'
                                        }`}>
                                        {p.role}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="p-5 bg-white dark:bg-surface-dark border-t border-gray-100 dark:border-gray-800">
                <button
                    onClick={handleSubmit}
                    className="w-full bg-primary text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary/30 active:scale-[0.98] transition-transform"
                >
                    Send Request
                </button>
            </div>
        </div>
    );
};
