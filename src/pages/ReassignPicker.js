const { useNavigate } = ReactRouterDOM;
const { StatusBar } = window.App;

window.App.ReassignPicker = () => {
    const { useNavigate, useLocation } = ReactRouterDOM;
    const { StatusBar } = window.App;
    const navigate = useNavigate();
    const location = useLocation();
    const { offboardUserId, pendingTasks } = location.state || {}; // Get passed data

    const [selectedId, setSelectedId] = React.useState(null);
    const [searchTerm, setSearchTerm] = React.useState('');

    // Fetch Candidates (Workspace members excluding offboardUser and currentUser if needed? No, currentUser is admin)
    const currentWorkspaceId = window.App.state.currentWorkspace;
    const workspace = window.App.state.workspaces[currentWorkspaceId];

    // Safety check
    if (!offboardUserId || !workspace) {
        // Redirect back if accessed directly without state
        React.useEffect(() => navigate('/admin-members'), []);
        return null;
    }

    const candidates = workspace.members
        .filter(id => id !== offboardUserId)
        .map(id => window.App.state.users[id])
        .filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleConfirm = () => {
        if (!selectedId || !pendingTasks) return;

        // Perform Reassignment
        pendingTasks.forEach(task => {
            window.App.state.reassignTask(task.id, selectedId, window.App.state.currentUser);
        });

        // Perform Offboarding
        window.App.state.offboardUser(offboardUserId, currentWorkspaceId);

        // Navigate to success
        navigate('/offboarding-success', { state: { offboardedUserId: offboardUserId, assigneeId: selectedId } });
    };

    const selectedUser = selectedId ? window.App.state.users[selectedId] : null;

    return (
        <div className="bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark min-h-screen flex flex-col pt-12">

            <header className="bg-surface-light dark:bg-surface-dark px-4 py-3 border-b border-border-light flex items-center gap-3">
                <button onClick={() => navigate(-1)} className="text-text-primary-light hover:bg-gray-100 rounded-full p-1 transition"><span className="material-icons-round text-2xl">arrow_back</span></button>
                <h1 className="text-lg font-bold flex-1 text-center pr-8">Reassign signer</h1>
            </header>
            <main className="px-4 py-4 space-y-4 flex-1 overflow-y-auto pb-40">
                <div className="relative">
                    <span className="material-icons-round absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary-light">search</span>
                    <input
                        className="w-full bg-surface-light border-none shadow-sm rounded-xl py-3 pl-10 pr-4 text-sm focus:ring-primary"
                        placeholder="Search members"
                        type="text"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
                <section>
                    <h2 className="text-xs font-bold text-text-secondary-light uppercase tracking-wider mb-3 px-1">Suggested Members</h2>
                    <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-card divide-y divide-border-light overflow-hidden">
                        {candidates.map(user => {
                            const isSelected = selectedId === user.id;
                            const display = window.App.utils.getUserDisplay(user.id);
                            return (
                                <div
                                    key={user.id}
                                    onClick={() => setSelectedId(user.id)}
                                    className={`flex items-center gap-3 p-4 transition cursor-pointer ${isSelected ? 'bg-red-50 border-l-4 border-primary pl-3' : 'hover:bg-gray-50 border-l-4 border-transparent pl-3'}`}
                                >
                                    <img className="w-10 h-10 rounded-full object-cover" src={display.avatar} />
                                    <div className="flex-1 min-w-0">
                                        <h3 className={`font-semibold text-sm truncate ${isSelected ? 'text-primary' : 'text-gray-900'}`}>{display.name}</h3>
                                        <p className="text-xs text-text-secondary-light truncate">{display.subtitle}</p>
                                    </div>
                                    <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${isSelected ? 'border-primary bg-primary text-white' : 'border-gray-300'}`}>
                                        {isSelected && <span className="material-icons-round text-sm">check</span>}
                                    </div>
                                </div>
                            );
                        })}
                        {candidates.length === 0 && (
                            <div className="p-4 text-center text-gray-500 text-sm">No members found</div>
                        )}
                    </div>
                </section>
            </main>

            {/* Fixed Bottom Sheet */}
            {selectedUser && (
                <div className="fixed bottom-0 left-0 right-0 bg-surface-light dark:bg-surface-dark border-t border-border-light shadow-bottom-sheet p-6 z-50 pb-8 animate-slide-up">
                    <div className="flex flex-col gap-4 max-w-md mx-auto">
                        <div className="flex items-center justify-between text-sm bg-gray-50 p-3 rounded-lg border border-border-light">
                            <span className="text-text-secondary-light">Reassign to</span>
                            <span className="font-bold text-text-primary-light flex items-center gap-1.5">
                                {selectedUser.name}
                                <span className="material-icons-round text-green-500 text-lg">check_circle</span>
                            </span>
                        </div>
                        <button
                            onClick={handleConfirm}
                            className="w-full bg-primary text-white font-semibold rounded-xl py-3.5 shadow-lg shadow-primary/30 active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
                        >
                            <span>Confirm reassignment</span>
                            <span className="material-icons-round text-xl">arrow_forward</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
