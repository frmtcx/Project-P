const { useNavigate } = ReactRouterDOM;
const { StatusBar, Header, BottomNav } = window.App;

window.App.AdminMembers = () => {
    const { StatusBar, Header } = window.App;
    const { useState } = React;

    const navigate = useNavigate();
    const currentWorkspace = window.App.state.currentWorkspace;
    const workspace = window.App.state.workspaces[currentWorkspace];

    // Get members of this workspace
    const members = workspace.members.map(id => window.App.state.users[id]);

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen pt-14 pb-24 text-text-primary-light dark:text-text-primary-dark">
            <Header title="Team Members" showBack onBack={() => navigate('/')} />

            <main className="px-4 py-4 space-y-5">
                <div className="relative"><span className="material-icons-round absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary-light">search</span><input className="w-full bg-gray-100 border-none rounded-xl py-3 pl-10 pr-4 text-sm" placeholder="Search members" type="text" /></div>
                <section>
                    <div className="flex justify-between items-center mb-3"><h2 className="text-xs font-bold text-text-secondary-light uppercase tracking-wider">Members List (124)</h2></div>
                    <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-card divide-y divide-border-light overflow-hidden">
                        <div className="p-4 flex items-center justify-between group cursor-pointer hover:bg-gray-50 transition" onClick={() => navigate('/offboard-user')}>
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMdePd5DX-qMRDtoSEk0ZyMn61vtWyg7QkKAxOCUkzwSTEKJtODOq_92-k8i7_xhxL9prFNNz7a2GpMLU7C9PfO51kK4_REPs-oY6D22t44q0_mJwTk_ryXSVrYI93c29aZZA2Bc8oLu5JE_R6QDY0bAuwuitz9lVciwk0bN4K47GZp4KHufh3Q0n9BJ7dFCGb-bGnR8aMLHYpBO-HbMfDEYEHHHp0VX3c1yXdtioA59AZ6x_2e6fUl0STElWLZOiR7xv7Q7DZpIM" className="w-10 h-10 rounded-full object-cover" />
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sm">Alice Smith</h3>
                                    <p className="text-xs text-text-secondary-light">Product Designer • <span className="text-green-600">Active 2m ago</span></p>
                                </div>
                            </div>
                            <span className="material-icons-round text-gray-400">chevron_right</span>
                        </div>
                        <div className="p-4 flex items-center justify-between group cursor-pointer hover:bg-gray-50 transition">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold">CW</div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sm">Charlie Workman</h3>
                                    <p className="text-xs text-text-secondary-light">Engineering Lead • <span className="text-gray-500">Active 1d ago</span></p>
                                </div>
                            </div>
                            <span className="material-icons-round text-gray-400">chevron_right</span>
                        </div>
                    </div>
                </section>
            </main>
            <BottomNav />
        </div >
    );
};
