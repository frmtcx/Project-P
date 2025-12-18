const { useNavigate } = ReactRouterDOM;
const { StatusBar } = window.App;

window.App.OffboardingSuccess = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark min-h-screen flex flex-col">

            <main className="flex-1 flex flex-col px-6 w-full max-w-md mx-auto pt-10 pb-8">
                <div className="flex flex-col items-center mb-8">
                    <div className="relative mb-6">
                        <div className="w-24 h-24 rounded-full p-1 bg-surface-light shadow-soft"><img className="w-full h-full rounded-full object-cover grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDs7ssWBwQRDGyXjeaRa99oLg5pZBQUVaUqra1h9ushPyeuasKyzbSJXDyK3cYic97VjCYMZPAN0-DWQ3QA_O1y1si3xuAaOLCOW9Ks-X3S4TR6irPGNMSEe3SmU91cABUh_6VxhM1Ab3BfdXnqD4T8Ye1OZV-vWV3T4cpax51BSkYZy0EBpPDJ68FZ6r6YVAYWMQrU54bPoW5rVTab0lZ93pO-TPNVVQwcq8RQjzXzcWHFbEHW6-Ga1VbQaGr_vpJkp-HEI4i1Y84" /></div>
                        <div className="absolute -bottom-1 -right-1 w-9 h-9 bg-green-500 rounded-full border-4 border-background-light flex items-center justify-center"><span className="material-icons-round text-white text-lg">check</span></div>
                    </div>
                    <h1 className="text-2xl font-bold mb-2 text-center">Alice offboarded</h1>
                    <p className="text-text-secondary-light text-center text-sm px-4">Offboarding complete. Access terminated.</p>
                </div>
                <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-card overflow-hidden mb-auto">
                    <div className="px-5 py-4 border-b border-border-light flex justify-between items-center"><h2 className="text-xs font-bold text-text-secondary-light uppercase tracking-wider">Audit Confirmation</h2><span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Verified</span></div>
                    <div className="divide-y divide-border-light">
                        <div className="p-4 flex items-start gap-3"><div className="mt-0.5"><span className="material-icons-round text-green-500 text-xl">check_circle</span></div><div><p className="text-sm font-semibold">Access revoked</p><p className="text-xs text-text-secondary-light mt-0.5">Credentials disabled.</p></div></div>
                        <div className="p-4 flex items-start gap-3"><div className="mt-0.5"><span className="material-icons-round text-green-500 text-xl">check_circle</span></div><div><p className="text-sm font-semibold">Tasks reassigned</p><p className="text-xs text-text-secondary-light mt-0.5">Transferred to <span className="text-primary font-medium">Charlie</span>.</p></div></div>
                    </div>
                </div>
                <div className="mt-8 space-y-3">
                    <button onClick={() => navigate('/admin-members')} className="w-full bg-primary text-white font-semibold text-sm py-3.5 rounded-xl shadow-lg hover:bg-red-700 transition flex items-center justify-center">Back to members</button>
                </div>
            </main>
        </div>
    );
};
