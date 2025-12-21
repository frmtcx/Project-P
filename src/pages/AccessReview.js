const { useNavigate } = ReactRouterDOM;
const { StatusBar, Header, BottomNav } = window.App;

window.App.AccessReview = () => {
    const { useNavigate } = ReactRouterDOM;
    const { StatusBar, Header } = window.App;

    const navigate = useNavigate();
    const currentWorkspace = window.App.state.currentWorkspace;
    const workspace = window.App.state.workspaces[currentWorkspace];
    const members = workspace.members.map(id => window.App.state.users[id]);

    const { useState } = React;
    const [selectedUsers, setSelectedUsers] = useState(['alice', 'bob']); // Default for prototype

    // Filter members with risk
    const atRiskMembers = members.map(m => {
        const workspaceKey = currentWorkspace;
        const context = m[workspaceKey] || {};
        return {
            ...m,
            accessRisk: context.accessRisk // 'inactive' | 'identity_changed' | undefined
        };
    }).filter(m => m.accessRisk);

    const toggleUser = (id) => {
        if (selectedUsers.includes(id)) {
            setSelectedUsers(selectedUsers.filter(uid => uid !== id));
        } else {
            setSelectedUsers([...selectedUsers, id]);
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-[100dvh] text-text-primary-light dark:text-text-primary-dark pb-32">
            <Header title="Access Review" showBack onBack={() => navigate('/')} />

            <main className="px-4 py-6 space-y-6">
                <div className="flex justify-between items-end">
                    <div><h1 className="text-xl font-bold">Access Review</h1><p className="text-sm text-text-secondary-light mt-0.5">Stale access prevention</p></div>
                </div>

                {atRiskMembers.length === 0 ? (
                    <div className="text-center py-10 text-gray-500 text-sm">
                        <span className="material-icons-round text-4xl text-gray-300 mb-2">verified_user</span>
                        <p>No members with access risks found.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {atRiskMembers.map(member => {
                            const isSelected = selectedUsers.includes(member.id);
                            const display = window.App.utils.getUserDisplay(member.id);

                            return (
                                <div key={member.id} className={`bg-surface-light dark:bg-surface-dark rounded-2xl shadow-card p-4 border-2 relative overflow-hidden transition-all ${isSelected ? 'border-primary' : 'border-transparent'}`} onClick={() => toggleUser(member.id)}>
                                    <div className="flex items-start gap-4">
                                        <div className="pt-1">
                                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isSelected ? 'bg-primary border-primary' : 'border-gray-300'}`}>
                                                {isSelected && <span className="material-icons text-white text-xs">check</span>}
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3 mb-2">
                                                <img className="w-10 h-10 rounded-full object-cover" src={display.avatar} />
                                                <div>
                                                    <h3 className="font-semibold text-sm">{display.name}</h3>
                                                    {member.accessRisk === 'inactive' && (
                                                        <div className="flex items-center gap-1 text-xs text-text-secondary-light"><span className="material-icons-round text-[14px]">schedule</span> Last active: 62 days ago</div>
                                                    )}
                                                </div>
                                            </div>

                                            {member.accessRisk === 'inactive' && (
                                                <div className="flex flex-wrap gap-2 mb-3"><span className="inline-flex items-center px-2 py-1 rounded-md text-[11px] font-semibold bg-red-100 text-red-700">Inactive &gt; 60 days</span></div>
                                            )}

                                            {member.accessRisk === 'identity_changed' && (
                                                <>
                                                    <div className="flex flex-wrap gap-2 mb-3"><span className="inline-flex items-center px-2 py-1 rounded-md text-[11px] font-semibold bg-orange-100 text-orange-800">Identity changed</span></div>
                                                    <div className="bg-gray-50 rounded-lg p-2.5 border border-border-light">
                                                        <div className="flex justify-between items-center mb-1"><span className="text-xs font-medium">1 pending responsibility</span><span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span></div>
                                                        <div className="flex items-center gap-1.5 text-xs text-primary font-semibold"><span className="material-icons-round text-sm">assignment_late</span> Reassignment required</div>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>

            {selectedUsers.length > 0 && (
                <div className="fixed bottom-36 left-0 right-0 z-30 flex justify-center pointer-events-none">
                    <div className="w-full max-w-md px-4 pointer-events-auto animate-bounce-in">
                        <button onClick={() => navigate('/offboard-user', { state: { userId: selectedUsers[0] } })} className="w-full bg-primary text-white rounded-xl shadow-floating py-4 flex items-center justify-center gap-2 hover:bg-red-700 transition active:scale-95 group">
                            <span className="font-semibold">Review and remove ({selectedUsers.length})</span>
                            <span className="material-icons-round group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </button>
                    </div>
                </div>
            )}
            <BottomNav />
        </div >
    );
};
