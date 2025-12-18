const { useState } = React;
const { useNavigate } = ReactRouterDOM;

window.App.RequestSigStep1 = () => {
    const { useNavigate, useLocation } = ReactRouterDOM;
    const { Header } = window.App;
    const navigate = useNavigate();
    const location = useLocation();

    // Default to first doc if none selected (for direct access)
    const docId = location.state?.docId || 'doc_1';
    const doc = window.App.state.documents.find(d => d.id === docId);

    if (!doc) return <div>Document not found</div>;

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col">
            <Header title="Request Signature" showBack onBack={() => navigate(-1)} />

            <div className="flex-1 p-5">
                <div className="mb-2">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">Step 1 of 3</span>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-1">Confirm Document</h2>
                </div>

                <div className="bg-white dark:bg-surface-dark rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 mt-6">
                    <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${doc.type === 'pdf' ? 'bg-red-50 text-primary' : 'bg-blue-50 text-blue-600'}`}>
                            <span className="material-icons-round text-2xl">{doc.type === 'pdf' ? 'picture_as_pdf' : 'description'}</span>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-white">{doc.name}</h3>
                            <p className="text-xs text-gray-500">2.4 MB • Updated {doc.updated}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message to recipients (optional)</label>
                    <textarea
                        className="w-full rounded-xl border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark p-3 text-sm focus:ring-primary focus:border-primary"
                        rows="4"
                        placeholder="Please sign this document..."
                    ></textarea>
                </div>
            </div>

            <div className="p-5 bg-white dark:bg-surface-dark border-t border-gray-100 dark:border-gray-800">
                <button
                    onClick={() => navigate('/request-signature-2', { state: { docId } })}
                    className="w-full bg-primary text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary/30 active:scale-[0.98] transition-transform"
                >
                    Next: Add Recipients
                </button>
            </div>
        </div>
    );
};
