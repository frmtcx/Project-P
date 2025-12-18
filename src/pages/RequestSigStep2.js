const { useNavigate } = ReactRouterDOM;
window.App.RequestSigStep2 = () => {
    const { useNavigate, useLocation } = ReactRouterDOM;
    const { Header } = window.App;
    const { useState } = React;

    const navigate = useNavigate();
    const location = useLocation();
    const docId = location.state?.docId || 'doc_1';

    // Get all users including current (for self-signing)
    const currentUser = window.App.state.users[window.App.state.currentUser];
    const otherUsers = Object.values(window.App.state.users).filter(u => u.id !== window.App.state.currentUser);

    const [selected, setSelected] = useState([]); // [{ userId, role }]

    const toggleUser = (userId) => {
        if (selected.find(s => s.userId === userId)) {
            setSelected(selected.filter(s => s.userId !== userId));
        } else {
            setSelected([...selected, { userId, role: 'signer', status: 'pending' }]);
        }
    };

    const updateRole = (userId, role) => {
        setSelected(selected.map(s => s.userId === userId ? { ...s, role } : s));
    };

    // Helper to check if myself is selected
    const isSelfSelected = selected.find(s => s.userId === currentUser.id);

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col">
            <Header title="Add Recipients" showBack onBack={() => navigate(-1)} />

            <div className="flex-1 p-5 overflow-y-auto">
                <div className="mb-4">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">Step 2 of 3</span>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-1">Who needs to sign?</h2>
                </div>

                <div className="space-y-3">
                    {/* Add Myself Option */}
                    <div className={`bg-white dark:bg-surface-dark rounded-xl p-3 border transition-all ${isSelfSelected ? 'border-primary ring-1 ring-primary' : 'border-gray-100 dark:border-gray-800'}`}>
                        <div className="flex items-center gap-3" onClick={() => toggleUser(currentUser.id)}>
                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isSelfSelected ? 'bg-primary border-primary' : 'border-gray-300'}`}>
                                {isSelfSelected && <span className="material-icons text-white text-xs">check</span>}
                            </div>
                            <img src={currentUser.avatar} className="w-10 h-10 rounded-full bg-gray-100" />
                            <div className="flex-1">
                                <h3 className="font-bold text-sm text-gray-900 dark:text-white">Me (Frans)</h3>
                                <p className="text-xs text-gray-500">Sign this document myself</p>
                            </div>
                        </div>
                    </div>

                    <div className="h-px bg-gray-100 dark:bg-gray-800 my-2"></div>

                    {otherUsers.map(user => {
                        const isSelected = selected.find(s => s.userId === user.id);
                        const display = window.App.utils.getUserDisplay(user.id);

                        return (
                            <div key={user.id} className={`bg-white dark:bg-surface-dark rounded-xl p-3 border transition-all ${isSelected ? 'border-primary ring-1 ring-primary' : 'border-gray-100 dark:border-gray-800'}`}>
                                <div className="flex items-center gap-3" onClick={() => toggleUser(user.id)}>
                                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isSelected ? 'bg-primary border-primary' : 'border-gray-300'}`}>
                                        {isSelected && <span className="material-icons text-white text-xs">check</span>}
                                    </div>
                                    <img src={display.avatar} className="w-10 h-10 rounded-full bg-gray-100" />
                                    <div className="flex-1">
                                        <h3 className="font-bold text-sm text-gray-900 dark:text-white">{display.name}</h3>
                                        <p className="text-xs text-gray-500">{display.subtitle}</p>
                                    </div>
                                </div>

                                {isSelected && (
                                    <div className="mt-3 pl-8 flex gap-2">
                                        {['signer', 'reviewer', 'viewer'].map(role => (
                                            <button
                                                key={role}
                                                onClick={() => updateRole(user.id, role)}
                                                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${isSelected.role === role ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                            >
                                                {role}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="p-5 bg-white dark:bg-surface-dark border-t border-gray-100 dark:border-gray-800">
                <button
                    onClick={() => navigate('/request-signature-3', { state: { docId, participants: selected } })}
                    disabled={selected.length === 0}
                    className="w-full bg-primary text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary/30 active:scale-[0.98] transition-transform disabled:opacity-50 disabled:shadow-none"
                >
                    Next: Review
                </button>
            </div>
        </div>
    );
};
