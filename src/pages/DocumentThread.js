window.App.DocumentThread = () => {
    const { useNavigate, useLocation } = ReactRouterDOM;
    const { StatusBar } = window.App;
    const { useState, useEffect } = React;

    const navigate = useNavigate();
    const location = useLocation();
    const threadId = location.state?.threadId || 'thread_1'; // Default for dev

    const [thread, setThread] = useState(window.App.state.threads[threadId]);
    const [currentUser, setCurrentUser] = useState(window.App.state.currentUser);

    useEffect(() => {
        return window.App.state.subscribe(() => {
            setThread({ ...window.App.state.threads[threadId] });
            setCurrentUser(window.App.state.currentUser);
        });
    }, [threadId]);

    if (!thread) return <div className="p-5">Thread not found</div>;

    // Determine user's role and status in this thread
    const myParticipant = thread.participants.find(p => p.userId === currentUser);
    const myRole = myParticipant?.role;
    const myStatus = myParticipant?.status;

    const handleAction = (action) => {
        window.App.state.updateThreadStatus(threadId, action, currentUser);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'in_review': return 'orange';
            case 'in_signing': return 'blue';
            case 'completed': return 'green';
            default: return 'gray';
        }
    };

    const statusColor = getStatusColor(thread.status);

    return (
        <div className="bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark h-screen flex flex-col">
            <StatusBar />
            <header className="bg-surface-light dark:bg-surface-dark px-4 py-3 sticky top-8 z-40 border-b border-border-light dark:border-border-dark flex items-center gap-3">
                <button onClick={() => navigate(-1)} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"><span className="material-icons-round">arrow_back</span></button>
                <div className="flex-1 min-w-0">
                    <h1 className="font-bold text-base truncate flex items-center gap-2">{thread.title}</h1>
                    <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center rounded-md bg-${statusColor}-50 dark:bg-${statusColor}-900/30 px-1.5 py-0.5 text-xs font-bold text-${statusColor}-700 dark:text-${statusColor}-400 ring-1 ring-inset ring-${statusColor}-600/20 capitalize`}>
                            {thread.status.replace('_', ' ')}
                        </span>
                    </div>
                </div>
                <button className="p-2 rounded-full hover:bg-gray-100 text-primary"><span className="material-icons-round">ios_share</span></button>
            </header>

            <main className="flex-1 overflow-y-auto p-4 space-y-6 bg-background-light dark:bg-background-dark pb-28">
                {/* Pinned Card */}
                <div className={`bg-surface-light dark:bg-surface-dark rounded-2xl shadow-card border border-${statusColor}-200 dark:border-${statusColor}-900 overflow-hidden`}>
                    <div className={`bg-${statusColor}-50 dark:bg-${statusColor}-900/20 px-4 py-2 border-b border-${statusColor}-100 dark:border-${statusColor}-900/50 flex justify-between items-center`}>
                        <div className="flex items-center gap-1.5">
                            <span className={`material-icons-round text-${statusColor}-500 text-sm`}>
                                {thread.status === 'completed' ? 'check_circle' : 'hourglass_empty'}
                            </span>
                            <span className={`text-xs font-bold text-${statusColor}-700 dark:text-${statusColor}-400 uppercase tracking-wide`}>
                                {thread.status.replace('_', ' ')}
                            </span>
                        </div>
                        <span className={`text-xs font-medium text-${statusColor}-600/70 dark:text-${statusColor}-400/70`}>
                            {thread.status === 'completed' ? 'Done' : 'Action Required'}
                        </span>
                    </div>
                    <div className="p-4">
                        <div className="flex items-start gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-primary shrink-0"><span className="material-icons-round">description</span></div>
                            <div>
                                <h3 className="font-semibold text-sm">{thread.title}.pdf</h3>
                                <p className="text-xs text-text-secondary-light">
                                    {thread.participants.length} participants
                                </p>
                            </div>
                        </div>

                        {/* Dynamic Action Buttons based on Role & Status */}
                        {myRole === 'reviewer' && myStatus === 'pending' && thread.status === 'in_review' && (
                            <div className="flex gap-2">
                                <button onClick={() => handleAction('review_approve')} className="flex-1 py-2.5 rounded-xl bg-primary text-white hover:bg-primary-dark transition text-sm font-bold flex items-center justify-center gap-2">
                                    <span className="material-icons-round text-lg">check</span> Mark Reviewed
                                </button>
                                <button onClick={() => handleAction('request_changes')} className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-gray-600 hover:bg-gray-50 transition text-sm font-bold">
                                    Request Changes
                                </button>
                            </div>
                        )}

                        {myRole === 'signer' && myStatus === 'pending' && thread.status === 'in_signing' && (
                            <button onClick={() => handleAction('sign')} className="w-full py-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition text-sm font-bold flex items-center justify-center gap-2">
                                <span className="material-icons-round text-lg">edit</span> Sign Document
                            </button>
                        )}

                        {thread.status === 'completed' && (
                            <div className="w-full py-2.5 rounded-xl bg-green-50 text-green-700 border border-green-200 text-sm font-bold flex items-center justify-center gap-2">
                                <span className="material-icons-round text-lg">verified</span> Document Signed
                            </div>
                        )}

                        {/* Fallback for viewers or waiting state */}
                        {myStatus === 'waiting' && (
                            <div className="text-center text-xs text-gray-500 italic">
                                Waiting for others to complete their actions...
                            </div>
                        )}
                    </div>
                </div>

                {/* System Events & Chat */}
                <div className="space-y-6">
                    {thread.events.map((event, idx) => (
                        <div key={idx} className="flex flex-col items-center gap-1 opacity-70">
                            <div className="h-6 w-px bg-border-light dark:border-border-dark mb-1"></div>
                            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-center">
                                <span className="material-icons-round text-sm text-text-secondary-light">info</span>
                                <span className="text-xs font-medium text-text-secondary-light">{event.text}</span>
                            </div>
                            <span className="text-[10px] text-text-secondary-light">{event.time}</span>
                        </div>
                    ))}
                </div>
            </main>

            <footer className="fixed bottom-0 left-0 right-0 bg-surface-light dark:bg-surface-dark border-t border-border-light dark:border-border-dark p-3 z-50">
                <div className="flex items-end gap-2">
                    <button className="p-2 text-text-secondary-light hover:bg-gray-100 rounded-full"><span className="material-icons-round">add_circle_outline</span></button>
                    <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center px-4 py-2 min-h-[44px]"><input className="bg-transparent border-none focus:ring-0 w-full text-sm p-0" placeholder="Message..." type="text" /></div>
                    <button className="p-2 text-primary hover:bg-red-50 rounded-full"><span className="material-icons-round">send</span></button>
                </div>
            </footer>
        </div>
    );
};
