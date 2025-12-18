const { useNavigate } = ReactRouterDOM;
window.App.SendSuccess = () => {
    const { useNavigate, useLocation } = ReactRouterDOM;
    const { StatusBar } = window.App;
    const navigate = useNavigate();
    const location = useLocation();
    const { threadId } = location.state || {};

    return (
        <div className="bg-white dark:bg-surface-dark min-h-screen flex flex-col items-center justify-center p-8 text-center pt-12">

            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce-small">
                <span className="material-icons-round text-4xl text-green-600">check</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Request Sent!</h1>
            <p className="text-gray-500 mb-8">
                We've created a document thread and notified the recipients.
            </p>

            <div className="w-full space-y-3">
                <button
                    onClick={() => navigate('/document-thread', { state: { threadId, from: 'success' } })}
                    className="w-full bg-primary text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary/30"
                >
                    View Thread
                </button>
                <button
                    onClick={() => navigate('/')}
                    className="w-full bg-gray-100 text-gray-700 font-bold py-3.5 rounded-xl hover:bg-gray-200"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
};
