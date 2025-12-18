const { useNavigate } = ReactRouterDOM;
const { StatusBar } = window.App;

window.App.CreateMenu = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-background-light dark:bg-background-dark font-sans text-gray-900 dark:text-gray-100 antialiased overflow-hidden select-none h-screen flex flex-col">
            <StatusBar />
            <div className="flex-1 overflow-y-auto blur-[2px] opacity-60 pointer-events-none">
                {/* Background Content Simulation */}
                <div className="p-4"><div className="h-20 bg-gray-200 dark:bg-gray-800 rounded"></div></div>
            </div>
            <div className="fixed inset-0 bg-black/50 z-40 transition-opacity" onClick={() => navigate(-1)}></div>
            <div className="fixed bottom-0 left-0 right-0 z-50 flex flex-col items-center justify-end">
                <div className="w-full max-w-md bg-surface-light dark:bg-surface-dark rounded-t-3xl shadow-up transform transition-transform duration-300 ease-out pb-8">
                    <div className="w-full flex justify-center pt-3 pb-2"><div className="w-10 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></div></div>
                    <div className="px-6 py-2 mb-2"><h2 className="text-lg font-bold text-gray-800 dark:text-white">Create new</h2></div>
                    <div className="flex flex-col space-y-2 px-4">
                        <button className="flex items-center w-full p-3 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group text-left">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0 text-blue-600 dark:text-blue-400"><span className="material-icons-round">chat_bubble_outline</span></div>
                            <div className="ml-4 flex-1"><p className="font-semibold text-gray-900 dark:text-white">New chat</p></div>
                        </button>
                        <button onClick={() => navigate('/request-signature-1')} className="flex items-start w-full p-3 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group text-left">
                            <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center shrink-0 text-primary mt-1"><span className="material-icons-round">draw</span></div>
                            <div className="ml-4 flex-1">
                                <p className="font-semibold text-gray-900 dark:text-white">Request signature</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">Creates a document thread and tasks.</p>
                            </div>
                            <span className="material-icons-round text-gray-400 mt-3">chevron_right</span>
                        </button>
                    </div>
                    <div className="px-4 mt-6">
                        <button onClick={() => navigate(-1)} className="w-full py-3.5 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white font-semibold text-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
