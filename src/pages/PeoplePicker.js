const { useNavigate } = ReactRouterDOM;
const { StatusBar } = window.App;

window.App.PeoplePicker = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-surface-light dark:bg-surface-dark min-h-screen pb-24 text-text-primary-light dark:text-text-primary-dark">
            <StatusBar />
            <header className="bg-surface-light dark:bg-surface-dark px-4 py-3 sticky top-8 z-40 border-b border-border-light dark:border-border-dark flex justify-between items-center">
                <button onClick={() => navigate(-1)} className="p-1 -ml-1 rounded-full"><span className="material-icons-round text-2xl">close</span></button>
                <h1 className="text-lg font-bold">Add Members</h1>
                <button onClick={() => navigate(-1)} className="text-primary font-semibold text-base px-2 py-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition">Add (2)</button>
            </header>
            <main className="px-4 py-4">
                <div className="relative mb-3">
                    <span className="material-icons-round absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary-light dark:text-text-secondary-dark">search</span>
                    <input className="w-full bg-background-light dark:bg-background-dark border-none rounded-xl py-3 pl-10 pr-4 text-sm text-text-primary-light dark:text-text-primary-dark focus:ring-2 focus:ring-primary placeholder-text-secondary-light dark:placeholder-text-secondary-dark transition-colors" placeholder="Search members" type="text" />
                </div>
                <div className="space-y-1">
                    <label className="flex items-center gap-3 p-3 rounded-xl hover:bg-background-light dark:hover:bg-gray-800 transition cursor-pointer group">
                        <div className="relative flex-shrink-0"><img alt="User Avatar" className="w-12 h-12 rounded-full object-cover border border-border-light dark:border-border-dark" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMdePd5DX-qMRDtoSEk0ZyMn61vtWyg7QkKAxOCUkzwSTEKJtODOq_92-k8i7_xhxL9prFNNz7a2GpMLU7C9PfO51kK4_REPs-oY6D22t44q0_mJwTk_ryXSVrYI93c29aZZA2Bc8oLu5JE_R6QDY0bAuwuitz9lVciwk0bN4K47GZp4KHufh3Q0n9BJ7dFCGb-bGnR8aMLHYpBO-HbMfDEYEHHHp0VX3c1yXdtioA59AZ6x_2e6fUl0STElWLZOiR7xv7Q7DZpIM" /></div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5"><h3 className="font-semibold text-sm truncate">Sarah Jenkins</h3></div>
                            <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark truncate">Product Manager</p>
                        </div>
                        <div className="flex-shrink-0"><input type="checkbox" className="custom-checkbox w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600 text-primary focus:ring-primary focus:ring-offset-0 cursor-pointer" defaultChecked /></div>
                    </label>
                    <label className="flex items-center gap-3 p-3 rounded-xl hover:bg-background-light dark:hover:bg-gray-800 transition cursor-pointer group">
                        <div className="relative flex-shrink-0"><img alt="User Avatar" className="w-12 h-12 rounded-full object-cover border border-border-light dark:border-border-dark" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDs7ssWBwQRDGyXjeaRa99oLg5pZBQUVaUqra1h9ushPyeuasKyzbSJXDyK3cYic97VjCYMZPAN0-DWQ3QA_O1y1si3xuAaOLCOW9Ks-X3S4TR6irPGNMSEe3SmU91cABUh_6VxhM1Ab3BfdXnqD4T8Ye1OZV-vWV3T4cpax51BSkYZy0EBpPDJ68FZ6r6YVAYWMQrU54bPoW5rVTab0lZ93pO-TPNVVQwcq8RQjzXzcWHFbEHW6-Ga1VbQaGr_vpJkp-HEI4i1Y84" /></div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5"><h3 className="font-semibold text-sm truncate">Frans</h3></div>
                            <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark truncate">Engineering Lead</p>
                        </div>
                        <div className="flex-shrink-0"><input type="checkbox" className="custom-checkbox w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600 text-primary focus:ring-primary focus:ring-offset-0 cursor-pointer" defaultChecked /></div>
                    </label>
                </div>
            </main>
        </div>
    );
};
