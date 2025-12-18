const { useState } = React;
const { useNavigate } = ReactRouterDOM;

window.App.RequestSigStep1 = () => {
    const { useNavigate, useLocation } = ReactRouterDOM;
    const { Header } = window.App;
    const navigate = useNavigate();
    const location = useLocation();

    // Default to first doc if none selected (for direct access)
    // Robustness: redirect if no docId found even after fallback check
    const docId = location.state?.docId;

    React.useEffect(() => {
        if (!docId && !window.App.state.documents.find(d => d.id === 'doc_1')) {
            navigate('/documents-list');
        }
    }, [docId, navigate]);

    // Fallback for prototype testing if accessed directly
    const effectiveDocId = docId || 'doc_1';
    const doc = window.App.state.documents.find(d => d.id === effectiveDocId);

    if (!doc) return <div>Document not found. Redirecting...</div>;

    return (
        <div className="flex flex-col h-[100dvh] bg-white relative">
            <header className="flex items-center gap-3 p-4 border-b border-gray-100 dark:border-gray-800">
                <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400">
                    <span className="material-icons-round">arrow_back</span>
                </button>
                <h1 className="font-bold text-lg text-gray-900 dark:text-white">Request Signature</h1>
            </header>

            <div className="flex-1 overflow-y-auto p-5 pb-32">
                <div className="mb-6">
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                        Document Name
                    </label>
                    <input
                        type="text"
                        value={docName}
                        onChange={(e) => setDocName(e.target.value)}
                        className="w-full rounded-xl border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark p-3 text-sm focus:ring-primary focus:border-primary font-medium"
                        placeholder="e.g. NDA for Project X"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                        Message (Optional)
                    </label>
                    <textarea
                        className="w-full rounded-xl border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark p-3 text-sm focus:ring-primary focus:border-primary"
                        rows="4"
                        placeholder="Please sign this document..."
                    ></textarea>
                </div>
            </div>

            <div className="p-5 pb-8 bg-white dark:bg-surface-dark border-t border-gray-100 dark:border-gray-800 absolute bottom-0 left-0 right-0 z-10">
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
