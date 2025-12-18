const { useNavigate } = ReactRouterDOM;
const { StatusBar } = window.App;

window.App.SigningSuccess = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark h-screen flex flex-col pt-12">

            <main className="flex-1 flex flex-col items-center justify-center px-6 w-full max-w-md mx-auto relative pb-12">
                <div className="mb-8 relative">
                    <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center"><span className="material-icons-round text-6xl text-green-600">check</span></div>
                </div>
                <h1 className="text-2xl font-bold mb-2 text-center">Signed successfully</h1>
                <p className="text-text-secondary-light text-center mb-12 text-base">Request completed</p>
                <div className="w-full space-y-4">
                    <button onClick={() => navigate('/document-thread-completed')} className="w-full bg-primary text-white font-semibold py-4 rounded-xl shadow-lg hover:bg-red-700 transition active:scale-[0.98] flex items-center justify-center gap-2">
                        <span className="material-icons-round">arrow_back</span> Back to thread
                    </button>
                </div>
            </main>
        </div>
    );
};
