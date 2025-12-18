const { useNavigate } = ReactRouterDOM;
const { StatusBar, Header, BottomNav } = window.App;

window.App.AccessReview = () => {
    const { useNavigate } = ReactRouterDOM;
    const { StatusBar, Header } = window.App;

    const navigate = useNavigate();
    const currentWorkspace = window.App.state.currentWorkspace;
    const workspace = window.App.state.workspaces[currentWorkspace];
    const members = workspace.members.map(id => window.App.state.users[id]);

    // Mock activity data
    const getActivityStatus = (userId) => {
        if (userId === 'alice') return { status: 'inactive', label: 'Inactive > 60 days', color: 'red' };
        if (userId === 'bob') return { status: 'changed', label: 'Email changed', color: 'orange' };
        return { status: 'active', label: 'Active today', color: 'green' };
    };

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen text-text-primary-light dark:text-text-primary-dark pb-32">
            <Header title="Access Review" showBack onBack={() => navigate('/')} />

            <main className="px-4 py-6 space-y-6">
                <div className="flex justify-between items-end">
                    <div><h1 className="text-xl font-bold">Access Review</h1><p className="text-sm text-text-secondary-light mt-0.5">Stale access prevention</p></div>
                </div>
                <div className="space-y-4">
                    <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-card p-4 border-2 border-primary relative overflow-hidden transition-all">
                        <div className="flex items-start gap-4">
                            <div className="pt-1"><input checked readOnly className="w-5 h-5 text-primary border-border-light rounded focus:ring-primary focus:ring-offset-0 cursor-pointer" type="checkbox" /></div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3 mb-2">
                                    <img className="w-10 h-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDs7ssWBwQRDGyXjeaRa99oLg5pZBQUVaUqra1h9ushPyeuasKyzbSJXDyK3cYic97VjCYMZPAN0-DWQ3QA_O1y1si3xuAaOLCOW9Ks-X3S4TR6irPGNMSEe3SmU91cABUh_6VxhM1Ab3BfdXnqD4T8Ye1OZV-vWV3T4cpax51BSkYZy0EBpPDJ68FZ6r6YVAYWMQrU54bPoW5rVTab0lZ93pO-TPNVVQwcq8RQjzXzcWHFbEHW6-Ga1VbQaGr_vpJkp-HEI4i1Y84" />
                                    <div><h3 className="font-semibold text-sm">Frans</h3><div className="flex items-center gap-1 text-xs text-text-secondary-light"><span className="material-icons-round text-[14px]">schedule</span> Last active: 62 days ago</div></div>
                                </div>
                                <div className="flex flex-wrap gap-2 mb-3"><span className="inline-flex items-center px-2 py-1 rounded-md text-[11px] font-semibold bg-red-100 text-red-700">Inactive &gt; 60 days</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-card p-4 border-2 border-primary relative overflow-hidden transition-all">
                        <div className="flex items-start gap-4">
                            <div className="pt-1"><input checked readOnly className="w-5 h-5 text-primary border-border-light rounded focus:ring-primary focus:ring-offset-0 cursor-pointer" type="checkbox" /></div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3 mb-2">
                                    <img className="w-10 h-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUOwjdXYxEc2eXdEgKTVWrP2oeevCNpUvjLLsWSNkURZ8-fo1f4p2VFVDN3xzAKEJRvWYqotLwkP2NdAIh5n_L7KxZAyUXGxrhftUZDpG6Ux_bP9PeF_PL_Ww2Zgvn5fyu8R9mhhDP6hv_mE6jUiP1olIm-9jzZ_ufJQBdRm0WS6ViqdOY4I7ly4ePR5aOI0OD8L2N_n5Ui76YDA1MjF0HJ3a_8fxHbXSKEQgI1xKKBALPPxTMHzuo5pbLPmxVyh_2f3w4wvcvZx0" />
                                    <div><h3 className="font-semibold text-sm">Yusak Yosefianus</h3></div>
                                </div>
                                <div className="flex flex-wrap gap-2 mb-3"><span className="inline-flex items-center px-2 py-1 rounded-md text-[11px] font-semibold bg-orange-100 text-orange-800">Identity changed</span></div>
                                <div className="bg-gray-50 rounded-lg p-2.5 border border-border-light">
                                    <div className="flex justify-between items-center mb-1"><span className="text-xs font-medium">5 pending responsibilities</span><span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span></div>
                                    <div className="flex items-center gap-1.5 text-xs text-primary font-semibold"><span className="material-icons-round text-sm">assignment_late</span> Reassignment required</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <div className="fixed bottom-24 left-4 right-4 z-30 animate-bounce-in">
                <button onClick={() => navigate('/offboard-user', { state: { userId: 'alice' } })} className="w-full bg-primary text-white rounded-xl shadow-floating py-4 flex items-center justify-center gap-2 hover:bg-red-700 transition active:scale-95 group">
                    <span className="font-semibold">Review and remove (2)</span>
                    <span className="material-icons-round group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </button>
            </div>
            <BottomNav />
        </div >
    );
};
