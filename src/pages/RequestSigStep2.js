const { useNavigate } = ReactRouterDOM;
window.App.RequestSigStep2 = () => {
    const { useNavigate, useLocation } = ReactRouterDOM;
    const { Header } = window.App;
    const { useState } = React;

    const navigate = useNavigate();
    const location = useLocation();
    const docId = location.state?.docId || 'doc_1';

    // Get all users except current
    const allUsers = Object.values(window.App.state.users).filter(u => u.id !== window.App.state.currentUser);

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

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col">
            <Header title="Add Recipients" showBack onBack={() => navigate(-1)} />

            <div className="flex-1 p-5 overflow-y-auto">
                <div className="mb-4">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">Step 2 of 3</span>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-1">Who needs to sign?</h2>
                </div>

                <div className="space-y-3">
                    {allUsers.map(user => {
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
const navigate = useNavigate();
return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen pb-24 flex flex-col">
        <StatusBar />
        <Header title="Request signature" subtitle="Step 2 of 3: Assign roles" showBack />
        <main className="flex-1 p-4 space-y-5">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-3 flex items-start gap-3">
                <span className="material-icons-round text-blue-500 text-sm mt-0.5">info</span>
                <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">Participants must be members of <span className="font-semibold">Company A</span>.</p>
            </div>
            <section className="bg-surface-light dark:bg-surface-dark rounded-xl p-4 shadow-card border border-border-light dark:border-border-dark">
                <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                        <div className="bg-red-100 dark:bg-red-900/30 p-1.5 rounded-lg text-primary"><span className="material-icons-round text-lg">edit</span></div>
                        <h2 className="font-semibold text-text-primary-light dark:text-text-primary-dark">Signers</h2>
                    </div>
                    <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">Required</span>
                </div>
                <button onClick={() => navigate('/people-picker')} className="w-full py-2.5 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center gap-2 text-sm font-medium text-primary hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
                    <span className="material-icons-round text-base">add_circle_outline</span> Add Signer
                </button>
            </section>
        </main>
        <div className="fixed bottom-0 w-full bg-surface-light dark:bg-surface-dark border-t border-border-light dark:border-border-dark px-6 py-4 z-30 pb-8">
            <button onClick={() => navigate('/request-signature-3')} className="w-full bg-primary hover:bg-red-600 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-[0.98]">
                Next <span className="material-icons-round text-lg">arrow_forward</span>
            </button>
        </div>
    </div>
);
};
