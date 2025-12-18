const { useNavigate } = ReactRouterDOM;
const { StatusBar } = window.App;

window.App.ReassignPicker = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark min-h-screen flex flex-col pt-12">

            <header className="bg-surface-light dark:bg-surface-dark px-4 py-3 border-b border-border-light flex items-center gap-3">
                <button onClick={() => navigate(-1)} className="text-text-primary-light hover:bg-gray-100 rounded-full p-1 transition"><span className="material-icons-round text-2xl">arrow_back</span></button>
                <h1 className="text-lg font-bold flex-1 text-center pr-8">Reassign signer</h1>
            </header>
            <main className="px-4 py-4 space-y-4 flex-1">
                <div className="relative"><span className="material-icons-round absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary-light">search</span><input className="w-full bg-surface-light border-none shadow-sm rounded-xl py-3 pl-10 pr-4 text-sm" placeholder="Search members" type="text" /></div>
                <section>
                    <h2 className="text-xs font-bold text-text-secondary-light uppercase tracking-wider mb-3 px-1">Suggested Members</h2>
                    <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-card divide-y divide-border-light overflow-hidden">
                        <div className="flex items-center gap-3 p-4 bg-red-50 active:bg-red-100 transition cursor-pointer border-l-4 border-primary">
                            <img className="w-10 h-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDs7ssWBwQRDGyXjeaRa99oLg5pZBQUVaUqra1h9ushPyeuasKyzbSJXDyK3cYic97VjCYMZPAN0-DWQ3QA_O1y1si3xuAaOLCOW9Ks-X3S4TR6irPGNMSEe3SmU91cABUh_6VxhM1Ab3BfdXnqD4T8Ye1OZV-vWV3T4cpax51BSkYZy0EBpPDJ68FZ6r6YVAYWMQrU54bPoW5rVTab0lZ93pO-TPNVVQwcq8RQjzXzcWHFbEHW6-Ga1VbQaGr_vpJkp-HEI4i1Y84" />
                            <div className="flex-1 min-w-0"><h3 className="font-semibold text-sm truncate text-primary">Charlie Workman</h3><p className="text-xs text-text-secondary-light truncate">Senior Product Designer</p></div>
                            <span className="material-icons-round text-primary text-2xl">radio_button_checked</span>
                        </div>
                    </div>
                </section>
            </main>
            <div className="bg-surface-light dark:bg-surface-dark border-t border-border-light shadow-bottom-sheet p-6 z-50 pb-8">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between text-sm bg-gray-50 p-3 rounded-lg border border-border-light"><span className="text-text-secondary-light">Reassign to</span><span className="font-bold text-text-primary-light flex items-center gap-1.5">Charlie Workman <span className="material-icons-round text-green-500 text-lg">check_circle</span></span></div>
                    <button onClick={() => navigate('/offboarding-success')} className="w-full bg-primary text-white font-semibold rounded-xl py-3.5 shadow-lg hover:bg-red-700 transition flex items-center justify-center gap-2"><span>Confirm reassignment</span><span className="material-icons-round text-xl">arrow_forward</span></button>
                </div>
            </div>
        </div>
    );
};
