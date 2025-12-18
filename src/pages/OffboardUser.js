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

    useEffect(() => {
        if (userId) {
            const tasks = window.App.state.inbox.filter(t => t.userId === userId && t.status === 'pending');
            setPendingTasks(tasks);
        }
    }, [userId]);

    // Get other members for reassignment
    const currentWorkspaceId = window.App.state.currentWorkspace;
    const workspace = window.App.state.workspaces[currentWorkspaceId];

    // Dynamic User Display
    const userDisplay = window.App.utils.getUserDisplay(userId);

    const handleConfirm = () => {
        if (pendingTasks.length > 0 && !selectedAssignee) return;

        // Reassign tasks
        pendingTasks.forEach(task => {
            window.App.state.reassignTask(task.id, selectedAssignee, window.App.state.currentUser);
        });

        // Remove user
        window.App.state.offboardUser(userId, currentWorkspaceId);

        navigate('/admin-members');
    };

    if (!user) return <div>User not found</div>;

    return (
        <div className="bg-surface-light dark:bg-surface-dark min-h-screen flex flex-col pt-12">
            <header className="bg-surface-light dark:bg-surface-dark px-4 py-3 sticky top-0 z-40 border-b border-border-light dark:border-border-dark flex items-center gap-3">
                <button onClick={() => navigate(-1)} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"><span className="material-icons-round">arrow_back</span></button>
                <h1 className="font-bold text-lg absolute left-1/2 transform -translate-x-1/2">Offboard {userDisplay.name.split(' ')[0]}</h1>
                <div className="w-8"></div>
            </header>
            <main className="flex-1 overflow-y-auto p-5 pb-32">
                <div className="flex flex-col items-center mb-8 mt-2">
                    <div className="relative mb-3"><img className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-card" src={userDisplay.avatar} /></div>
                    <h2 className="text-xl font-bold">{userDisplay.name}</h2>
                    <p className="text-sm text-text-secondary-light">{userDisplay.subtitle}</p>
                </div>
                <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex gap-3 mb-8">
                    <span className="material-icons-round text-primary mt-0.5">warning_amber</span>
                    <div className="flex-1"><h3 className="text-sm font-bold text-gray-900 mb-1">Access Revocation</h3><p className="text-sm text-gray-600 leading-relaxed">This will revoke access to <span className="font-semibold text-gray-900">{workspace.name}</span> workspace immediately.</p></div>
                </div>
                <section>
                    <div className="flex items-center gap-2 mb-4"><h3 className="text-xs font-bold text-text-secondary-light uppercase tracking-wider">Detected Pending Tasks ({pendingTasks.length})</h3></div>

                    {pendingTasks.length === 0 ? (
                        <div className="text-center py-8 text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                            <span className="material-icons-round text-2xl mb-1">check_circle</span>
                            <p className="text-sm">No pending tasks found.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {pendingTasks.map(task => (
                                <div key={task.id} className="bg-surface-light dark:bg-surface-dark rounded-xl p-4 shadow-card border border-border-light">
                                    <div className="flex gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0"><span className="material-icons-round">description</span></div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start"><h4 className="font-semibold text-sm truncate pr-2">{task.title}</h4></div>
                                            <div className="flex items-center gap-1.5 mt-1">
                                                <span className="text-xs text-text-secondary-light">Role:</span>
                                                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-orange-100 text-orange-700">
                                                    {task.type === 'to_sign' ? 'Signer' : 'Reviewer'} (Pending)
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <label className="block text-xs font-medium text-text-secondary-light mb-1.5 uppercase tracking-wide">Action Required</label>
                                        <div className="relative" onClick={() => navigate('/reassign-picker', { state: { offboardUserId: userId, pendingTasks } })}>
                                            <div className="w-full bg-gray-50 border border-border-light rounded-lg py-2.5 pl-3 pr-10 text-sm text-text-primary-light cursor-pointer">
                                                {selectedAssignee ? window.App.state.users[selectedAssignee]?.name || 'Reassign to...' : 'Reassign to...'}
                                            </div>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-text-secondary-light"><span className="material-icons-round text-xl">expand_more</span></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </main>

            <div className="p-5 pb-8 bg-white dark:bg-surface-dark border-t border-gray-100 dark:border-gray-800 absolute bottom-0 left-0 right-0 z-10">
                <button
                    onClick={handleConfirm}
                    disabled={pendingTasks.length > 0 && !selectedAssignee}
                    className="w-full bg-red-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-red-600/30 active:scale-[0.98] transition-transform disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-2"
                >
                    <span className="material-icons-round">person_remove</span>
                    Revoke Access
                </button>
            </div>
        </div >
    );
};
