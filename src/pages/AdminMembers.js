const { useNavigate } = ReactRouterDOM;
const { StatusBar, Header, BottomNav } = window.App;

window.App.AdminMembers = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark min-h-screen pb-24">
            <StatusBar />
            <Header title="Company A" subtitle="Workspace" />
            <nav className="flex gap-6 overflow-x-auto no-scrollbar pb-1 px-4 border-b border-border-light dark:border-border-dark">
                <button className="whitespace-nowrap pb-2 border-b-2 border-transparent text-text-secondary-light font-medium text-sm">Chat</button>
                <button className="whitespace-nowrap pb-2 border-b-2 border-transparent text-text-secondary-light font-medium text-sm">Action Inbox</button>
                <button className="whitespace-nowrap pb-2 border-b-2 border-transparent text-text-secondary-light font-medium text-sm">Documents</button>
                <button className="whitespace-nowrap pb-2 border-b-2 border-primary text-primary font-semibold text-sm">Admin</button>
            </nav>
            <main className="px-4 py-4 space-y-5">
                <div className="relative"><span className="material-icons-round absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary-light">search</span><input className="w-full bg-gray-100 border-none rounded-xl py-3 pl-10 pr-4 text-sm" placeholder="Search members" type="text" /></div>
                <section>
                    <div className="flex justify-between items-center mb-3"><h2 className="text-xs font-bold text-text-secondary-light uppercase tracking-wider">Members List (124)</h2></div>
                    <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-card divide-y divide-border-light overflow-hidden">
                        <div className="flex items-center gap-3 p-4 active:bg-gray-50 transition cursor-pointer" onClick={() => navigate('/offboard-user')}>
                            <img className="w-12 h-12 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDs7ssWBwQRDGyXjeaRa99oLg5pZBQUVaUqra1h9ushPyeuasKyzbSJXDyK3cYic97VjCYMZPAN0-DWQ3QA_O1y1si3xuAaOLCOW9Ks-X3S4TR6irPGNMSEe3SmU91cABUh_6VxhM1Ab3BfdXnqD4T8Ye1OZV-vWV3T4cpax51BSkYZy0EBpPDJ68FZ6r6YVAYWMQrU54bPoW5rVTab0lZ93pO-TPNVVQwcq8RQjzXzcWHFbEHW6-Ga1VbQaGr_vpJkp-HEI4i1Y84" />
                            <div className="flex-1 min-w-0 flex flex-col justify-center">
                                <div className="flex justify-between items-start mb-0.5"><h3 className="font-semibold text-sm truncate">Alice (To Offboard)</h3><span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">Active</span></div>
                                <p className="text-xs text-text-secondary-light truncate mb-1">Senior Product Designer</p>
                            </div>
                            <div className="flex flex-col items-end pl-2"><button className="bg-white border border-gray-200 text-primary text-xs font-medium px-3 py-1.5 rounded-lg shadow-sm hover:bg-red-50 transition">Manage</button></div>
                        </div>
                    </div>
                </section>
            </main>
            <BottomNav />
        </div>
    );
};
