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
const navigate = useNavigate();
const [selected, setSelected] = useState(true);

return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen text-text-primary-light dark:text-text-primary-dark antialiased pb-24">
        <Header title="Request signature" subtitle="Company A Workspace" showBack onBack={() => navigate('/')} />
        <div className="bg-surface-light dark:bg-surface-dark pt-4 pb-4 px-6 border-b border-border-light dark:border-border-dark mb-4">
            <div className="flex justify-between items-center relative">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-700 -z-10 transform -translate-y-1/2"></div>
                <div className="flex flex-col items-center bg-surface-light dark:bg-surface-dark px-2">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold shadow-md ring-4 ring-white dark:ring-surface-dark">1</div>
                    <span className="text-[10px] font-medium text-primary mt-1">Select doc</span>
                </div>
                <div className="flex flex-col items-center bg-surface-light dark:bg-surface-dark px-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 flex items-center justify-center text-sm font-medium ring-4 ring-white dark:ring-surface-dark">2</div>
                    <span className="text-[10px] text-gray-400 mt-1">Assign roles</span>
                </div>
                <div className="flex flex-col items-center bg-surface-light dark:bg-surface-dark px-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 flex items-center justify-center text-sm font-medium ring-4 ring-white dark:ring-surface-dark">3</div>
                    <span className="text-[10px] text-gray-400 mt-1">Review</span>
                </div>
            </div>
        </div>
        <main className="px-4 space-y-4">
            <div className="grid grid-cols-2 gap-3">
                <button className="bg-surface-light dark:bg-surface-dark p-4 rounded-xl border-2 border-primary shadow-sm flex flex-col items-center justify-center text-center h-32 relative overflow-hidden group">
                    <div className="absolute top-2 right-2 text-primary"><span className="material-icons-round text-lg">check_circle</span></div>
                    <div className="w-10 h-10 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-2"><span className="material-icons-round text-primary text-xl">folder_open</span></div>
                    <p className="text-xs font-semibold text-primary">Choose from Documents</p>
                </button>
                <button className="bg-surface-light dark:bg-surface-dark p-4 rounded-xl border border-border-light dark:border-border-dark shadow-sm flex flex-col items-center justify-center text-center h-32 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-2"><span className="material-icons-round text-text-secondary-light dark:text-text-secondary-dark text-xl">cloud_upload</span></div>
                    <p className="text-xs font-semibold text-text-primary-light dark:text-text-primary-dark">Upload new document</p>
                </button>
            </div>
            <div className="space-y-3">
                <h2 className="text-sm font-semibold text-text-primary-light dark:text-text-primary-dark uppercase tracking-wide">Recent Documents</h2>
                <div onClick={() => setSelected(!selected)} className={`bg-surface-light dark:bg-surface-dark p-3 rounded-xl border ${selected ? 'border-primary' : 'border-border-light dark:border-border-dark'} shadow-sm flex items-start gap-3 relative`}>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg shrink-0"><span className="material-icons-round text-blue-500">picture_as_pdf</span></div>
                    <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark truncate pr-6">NDA_Agreement_CompanyA_2025.pdf</h3>
                        <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-0.5">PDF • 2.4 MB</p>
                    </div>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2"><span className={`material-icons-round ${selected ? 'text-primary' : 'text-gray-300'}`}>{selected ? 'radio_button_checked' : 'radio_button_unchecked'}</span></div>
                </div>
            </div>
        </main>
        <div className="fixed bottom-0 left-0 right-0 bg-surface-light dark:bg-surface-dark border-t border-border-light dark:border-border-dark p-4 shadow-lg z-40 safe-area-bottom">
            <div className="flex justify-between items-center max-w-md mx-auto w-full">
                <div className="flex flex-col">
                    <span className="text-[10px] text-text-secondary-light dark:text-text-secondary-dark font-medium uppercase">Selected</span>
                    <span className="text-sm font-semibold text-text-primary-light dark:text-text-primary-dark truncate max-w-[150px]">NDA_Agreement...</span>
                </div>
                <button onClick={() => navigate('/request-signature-2')} className="bg-primary text-white px-8 py-3 rounded-full font-semibold text-sm shadow-md active:scale-95 transition-transform flex items-center gap-2">
                    Next Step <span className="material-icons-round text-sm">arrow_forward</span>
                </button>
            </div>
        </div>
    </div>
);
};
