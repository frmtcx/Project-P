const { useNavigate } = ReactRouterDOM;
const { StatusBar } = window.App;

window.App.OffboardUser = () => {
    const { useNavigate, useLocation } = ReactRouterDOM;
    const { Header } = window.App;
    const { useState, useEffect } = React;

    const navigate = useNavigate();
    const location = useLocation();
    const { userId } = location.state || {};

    useEffect(() => {
        if (!userId) {
            navigate('/admin-members');
        }
    }, [userId, navigate]);

    if (!userId) return null;

    const user = window.App.state.users[userId];
    const [pendingTasks, setPendingTasks] = useState([]);
    const [selectedAssignee, setSelectedAssignée] = useState('');

    // Get other members for reassignment
    const currentWorkspace = window.App.state.currentWorkspace;
    const workspace = window.App.state.workspaces[currentWorkspace];
    const otherMembers = workspace.members
        .filter(id => id !== userId && id !== window.App.state.currentUser)
        .map(id => window.App.state.users[id]);

    useEffect(() => {
        // Check for pending tasks
        const tasks = window.App.state.offboardUser(userId, currentWorkspace); // Just peeking, not committing yet
        // Ideally offboardUser would be split into 'check' and 'commit', but for prototype we'll filter inbox directly
        const actualTasks = window.App.state.inbox.filter(t => t.userId === userId && t.status === 'pending');
        setPendingTasks(actualTasks);
    }, [userId]);

    const handleConfirm = () => {
        if (pendingTasks.length > 0 && !selectedAssignee) return;

        // Reassign tasks
        pendingTasks.forEach(task => {
            window.App.state.reassignTask(task.id, selectedAssignee, window.App.state.currentUser);
        });

        // Remove user (simulated by updating state directly for now as offboardUser helper does both)
        // We'll call the helper to finalize removal
        window.App.state.offboardUser(userId, currentWorkspace);

        navigate('/admin-members');
    };

    if (!user) return <div>User not found</div>;

    return (
        <div className="bg-surface-light dark:bg-surface-dark min-h-screen flex flex-col pt-12">
            <header className="bg-surface-light dark:bg-surface-dark px-4 py-3 sticky top-0 z-40 border-b border-border-light dark:border-border-dark flex items-center gap-3">
                <button onClick={() => navigate(-1)} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"><span className="material-icons-round">arrow_back</span></button>
                <h1 className="font-bold text-lg absolute left-1/2 transform -translate-x-1/2">Offboard Alice</h1>
                <div className="w-8"></div>
            </header>
            <main className="flex-1 overflow-y-auto p-5 pb-32">
                <div className="flex flex-col items-center mb-8 mt-2">
                    <div className="relative mb-3"><img className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-card" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMdePd5DX-qMRDtoSEk0ZyMn61vtWyg7QkKAxOCUkzwSTEKJtODOq_92-k8i7_xhxL9prFNNz7a2GpMLU7C9PfO51kK4_REPs-oY6D22t44q0_mJwTk_ryXSVrYI93c29aZZA2Bc8oLu5JE_R6QDY0bAuwuitz9lVciwk0bN4K47GZp4KHufh3Q0n9BJ7dFCGb-bGnR8aMLHYpBO-HbMfDEYEHHHp0VX3c1yXdtioA59AZ6x_2e6fUl0STElWLZOiR7xv7Q7DZpIM" /></div>
                    <h2 className="text-xl font-bold">Alice Richardson</h2>
                    <p className="text-sm text-text-secondary-light">Engineering Manager</p>
                </div>
                <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex gap-3 mb-8">
                    <span className="material-icons-round text-primary mt-0.5">warning_amber</span>
                    <div className="flex-1"><h3 className="text-sm font-bold text-gray-900 mb-1">Access Revocation</h3><p className="text-sm text-gray-600 leading-relaxed">This will revoke access to <span className="font-semibold text-gray-900">Company A</span> workspace immediately.</p></div>
                </div>
                <section>
                    <div className="flex items-center gap-2 mb-4"><h3 className="text-xs font-bold text-text-secondary-light uppercase tracking-wider">Detected Pending Tasks (2)</h3></div>
                    <div className="space-y-4">
                        <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-4 shadow-card border border-border-light">
                            <div className="flex gap-3 mb-4">
                                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0"><span className="material-icons-round">description</span></div>
                                <div className="flex-1 min-w-0"><div className="flex justify-between items-start"><h4 className="font-semibold text-sm truncate pr-2">Employment Contract v3</h4></div><div className="flex items-center gap-1.5 mt-1"><span className="text-xs text-text-secondary-light">Role:</span><span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-orange-100 text-orange-700">Signer (Pending)</span></div></div>
                            </div>
                            <div className="relative">
                                <label className="block text-xs font-medium text-text-secondary-light mb-1.5 uppercase tracking-wide">Action Required</label>
                                <div className="relative" onClick={() => navigate('/reassign-picker')}>
                                    <div className="w-full bg-gray-50 border border-border-light rounded-lg py-2.5 pl-3 pr-10 text-sm text-text-primary-light cursor-pointer">Reassign to...</div>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-text-secondary-light"><span className="material-icons-round text-xl">expand_more</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div >
    );
};
