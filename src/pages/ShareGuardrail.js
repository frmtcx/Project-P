window.App.ShareGuardrail = () => {
    const { useNavigate } = ReactRouterDOM;
    const { StatusBar } = window.App;
    const navigate = useNavigate();
    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col">

            <div className="absolute inset-0 bg-black/50 z-40 backdrop-blur-sm" onClick={() => navigate(-1)}></div>
            <div className="absolute bottom-0 left-0 right-0 z-50 bg-surface-light dark:bg-surface-dark rounded-t-3xl shadow-up p-6 animate-slide-up">
                <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6"></div>
                <div className="flex flex-col items-center text-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
                        <span className="material-icons-round text-3xl text-primary">gpp_bad</span>
                    </div>
                    <h2 className="text-xl font-bold mb-2">Cannot share outside workspace</h2>
                    <p className="text-sm text-text-secondary-light leading-relaxed">
                        This document belongs to <strong className="text-gray-900 dark:text-white">Company A</strong>.
                        To prevent data leakage, you cannot share it to Personal or other workspaces.
                    </p>
                </div>
                <div className="space-y-3">
                    <button className="w-full py-3.5 bg-gray-100 dark:bg-gray-800 text-text-primary-light dark:text-text-primary-dark font-semibold rounded-xl flex items-center justify-center gap-2">
                        <span className="material-icons-round text-lg">person_add</span> Invite to Company A
                    </button>
                    <button onClick={() => navigate(-1)} className="w-full py-3.5 bg-transparent text-text-secondary-light font-medium">Cancel</button>
                </div>
            </div>
        </div>
    );
};
