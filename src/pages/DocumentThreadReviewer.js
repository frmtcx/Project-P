window.App.DocumentThreadReviewer = () => {
    const { useState } = React;
    const { useNavigate } = ReactRouterDOM;
    const { StatusBar } = window.App;

    const navigate = useNavigate();
    const [showApproveModal, setShowApproveModal] = useState(false);
    const [showChangesModal, setShowChangesModal] = useState(false);

    return (
        <div className="bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark h-screen flex flex-col relative pt-12">

            <header className="bg-surface-light dark:bg-surface-dark px-4 py-3 border-b border-border-light dark:border-border-dark shrink-0 z-40 flex items-center justify-between shadow-sm">
                <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 -ml-2"><span className="material-icons-round">arrow_back</span></button>
                <div className="flex flex-col items-center"><h1 className="font-bold text-sm">Q4 Financial Report</h1><div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span><span className="text-[10px] text-text-secondary-light font-medium">Online</span></div></div>
                <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 -mr-2"><span className="material-icons-round">more_vert</span></button>
            </header>
            <main className="flex-1 overflow-y-auto p-4 space-y-6 bg-background-light dark:bg-background-dark pb-6">
                <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-card p-4 border border-border-light dark:border-border-dark relative overflow-hidden">
                    <div className="flex justify-between items-start mb-4 relative z-10">
                        <div className="flex gap-3">
                            <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-primary shrink-0"><span className="material-icons-round text-2xl">picture_as_pdf</span></div>
                            <div><h2 className="font-semibold text-sm leading-tight mb-1">Q4_Financial_Final_v2.pdf</h2><p className="text-xs text-text-secondary-light mb-1">2.4 MB • Updated 2h ago</p></div>
                        </div>
                        <div className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wide border border-orange-200 dark:border-orange-800 shadow-sm">You are pending</div>
                    </div>
                    <div className="flex gap-3 mt-4">
                        <button onClick={() => setShowApproveModal(true)} className="flex-1 bg-primary text-white py-3 rounded-xl font-semibold text-sm shadow-sm hover:bg-red-700 transition flex items-center justify-center gap-2 group"><span className="material-icons-round text-lg">check_circle</span>Approve</button>
                        <button onClick={() => setShowChangesModal(true)} className="flex-1 bg-transparent border border-border-light dark:border-border-dark text-text-primary-light py-3 rounded-xl font-medium text-sm hover:bg-gray-50 transition">Request changes</button>
                    </div>
                </div>
            </main>

            {/* Approve Modal */}
            {showApproveModal && (
                <div className="absolute inset-0 z-50 flex items-end sm:items-center justify-center">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowApproveModal(false)}></div>
                    <div className="bg-surface-light dark:bg-surface-dark w-full max-w-sm mx-4 mb-4 sm:mb-0 rounded-2xl p-6 relative z-10 animate-slide-up">
                        <h3 className="text-lg font-bold mb-2">Mark as Reviewed?</h3>
                        <p className="text-sm text-text-secondary-light mb-6">This will move the document to the <strong>Signing</strong> stage. Alice will be notified.</p>
                        <div className="flex gap-3">
                            <button onClick={() => setShowApproveModal(false)} className="flex-1 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl font-medium">Cancel</button>
                            <button onClick={() => navigate('/document-thread')} className="flex-1 py-3 bg-primary text-white rounded-xl font-bold shadow-lg">Confirm</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Request Changes Modal */}
            {showChangesModal && (
                <div className="absolute inset-0 z-50 flex items-end sm:items-center justify-center">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowChangesModal(false)}></div>
                    <div className="bg-surface-light dark:bg-surface-dark w-full max-w-sm mx-4 mb-4 sm:mb-0 rounded-2xl p-6 relative z-10 animate-slide-up">
                        <h3 className="text-lg font-bold mb-4">Request Changes</h3>
                        <textarea className="w-full bg-gray-50 dark:bg-gray-800 border-border-light rounded-xl p-3 text-sm mb-4 focus:ring-primary" rows="4" placeholder="Describe the changes needed..."></textarea>
                        <div className="flex gap-3">
                            <button onClick={() => setShowChangesModal(false)} className="flex-1 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl font-medium">Cancel</button>
                            <button onClick={() => navigate('/document-thread')} className="flex-1 py-3 bg-red-600 text-white rounded-xl font-bold shadow-lg">Send Request</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
