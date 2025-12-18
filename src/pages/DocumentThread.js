window.App.DocumentThread = () => {
    const { useNavigate, useLocation } = ReactRouterDOM;
    const { StatusBar } = window.App;
    const { useState, useEffect } = React;

    const navigate = useNavigate();
    const location = useLocation();
    const threadId = location.state?.threadId || 'thread_1';

    const [thread, setThread] = useState(window.App.state.threads[threadId]);
    const [currentUser, setCurrentUser] = useState(window.App.state.currentUser);
    const [showInfo, setShowInfo] = useState(false); // Toggle for Info Sidebar

    // Action Menu State
    const [showActions, setShowActions] = useState(false);
    const [actionStep, setActionStep] = useState(null); // 'select_doc' | 'select_signers' 
    const [selectedDoc, setSelectedDoc] = useState(null);
    const [selectedSigners, setSelectedSigners] = useState([]);

    useEffect(() => {
        return window.App.state.subscribe(() => {
            const updated = window.App.state.threads[threadId];
            if (updated) { // Guard against deletion
                setThread({ ...updated });
                setCurrentUser(window.App.state.currentUser);
            }
        });
    }, [threadId]);

    if (!thread) return <div className="p-5">Thread not found</div>;

    // Determine user's role and status in this thread
    // FIX: Prioritize 'signer' or 'reviewer' over 'viewer' if user has multiple roles (e.g. Creator who is also Signer)
    const myParticipants = thread.participants.filter(p => p.userId === currentUser);
    const myParticipant = myParticipants.find(p => p.role === 'signer') ||
        myParticipants.find(p => p.role === 'reviewer') ||
        myParticipants[0];

    const myRole = myParticipant?.role;
    const myStatus = myParticipant?.status;

    const handleAction = (action) => {
        window.App.state.updateThreadStatus(threadId, action, currentUser);
    };

    const getStatusColor = (status) => {
        if (!status) return 'gray'; // Guard
        switch (status) {
            case 'in_review': return 'orange';
            case 'in_signing': return 'blue';
            case 'completed': return 'green';
            case 'active': return 'purple';
            default: return 'gray';
        }
    };

    const statusColor = getStatusColor(thread.status);

    const handleCardClick = () => {
        // Smart Action based on state
        if (myRole === 'signer' && myStatus === 'pending' && thread.status === 'in_signing') {
            handleAction('sign');
        } else if (myRole === 'reviewer' && myStatus === 'pending' && thread.status === 'in_review') {
            handleAction('review_approve');
        }
    };

    const handleBack = () => {
        // If we have history state returnPath, use it, otherwise standard back
        if (location.state?.from === 'success') {
            navigate('/chats-list', { replace: true });
        } else {
            navigate(-1);
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark h-screen flex flex-col relative overflow-hidden">

            {/* Header */}
            <header className="bg-surface-light dark:bg-surface-dark px-4 pt-14 pb-3 sticky top-0 z-40 border-b border-border-light dark:border-border-dark flex items-center gap-3">
                <button onClick={handleBack} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"><span className="material-icons-round">arrow_back</span></button>
                <div className="flex-1 min-w-0" onClick={() => setShowInfo(true)}>
                    <h1 className="font-bold text-base truncate flex items-center gap-2 cursor-pointer hover:opacity-70 transition">
                        {thread.title}
                        <span className="material-icons-round text-sm text-gray-400">chevron_right</span>
                    </h1>
                    <p className="text-xs text-text-secondary-light">
                        {thread.participants.length} members
                    </p>
                </div>
                {/* Info Button */}
                <button onClick={() => setShowInfo(true)} className="p-2 rounded-full hover:bg-gray-100 text-primary">
                    <span className="material-icons-round">info</span>
                </button>
            </header>

            <main className="flex-1 overflow-y-auto p-4 space-y-6 bg-background-light dark:bg-background-dark pb-24">
                {/* Document Status Card (Only if Document Type) */}
                {thread.type === 'document' && (
                    <div
                        className={`bg-surface-light dark:bg-surface-dark rounded-2xl shadow-card border border-${statusColor}-200 dark:border-${statusColor}-900 overflow-hidden cursor-pointer transition active:scale-[0.99]`}
                        onClick={handleCardClick}
                    >
                        <div className={`bg-${statusColor}-50 dark:bg-${statusColor}-900/20 px-4 py-2 border-b border-${statusColor}-100 dark:border-${statusColor}-900/50 flex justify-between items-center`}>
                            <div className="flex items-center gap-1.5">
                                <span className={`material-icons-round text-${statusColor}-500 text-sm`}>
                                    {thread.status === 'completed' ? 'check_circle' : 'hourglass_empty'}
                                </span>
                                <span className={`text-xs font-bold text-${statusColor}-700 dark:text-${statusColor}-400 uppercase tracking-wide`}>
                                    {thread.status?.replace('_', ' ')}
                                </span>
                            </div>
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
                                </div>
                            )}

                            {/* FIX: Relaxed check: Allow signing if thread is in_signing OR in_review, to prevent getting stuck */}
                            {myRole === 'signer' && myStatus === 'pending' && ['in_signing', 'in_review'].includes(thread.status) && (
                                <button onClick={() => handleAction('sign')} className="w-full py-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition text-sm font-bold flex items-center justify-center gap-2">
                                    <span className="material-icons-round text-lg">edit</span> Sign Document
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* Chat Stream */}
                <div className="space-y-4">
                    {thread.events.map((event, idx) => {
                        const isSystem = event.type === 'system';
                        const isMe = event.userId === currentUser;

                        if (isSystem) {
                            const isRevocation = event.text.includes('offboarded') || event.text.includes('revoked');
                            return (
                                <div key={idx} className={`flex flex-col items-center gap-1 my-4 ${isRevocation ? 'opacity-100' : 'opacity-70'}`}>
                                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-center ${isRevocation ? 'bg-red-50 text-red-600' : 'bg-gray-100 dark:bg-gray-800 text-text-secondary-light'}`}>
                                        <span className="material-icons-round text-sm">{isRevocation ? 'block' : 'info'}</span>
                                        <span className="text-xs font-medium">{event.text}</span>
                                    </div>
                                    <span className="text-[10px] text-text-secondary-light">{event.time}</span>
                                </div>
                            );
                        }

                        // EMBEDDED SIGNING CARD (WhatsApp Style)
                        if (event.type === 'signing_request') {
                            return (
                                <div key={idx} className="flex justify-center my-4">
                                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-orange-100 dark:border-gray-700 p-3 max-w-[80%] w-64">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="material-icons-round text-orange-500 bg-orange-50 rounded-full p-1 text-sm">edit_document</span>
                                            <span className="text-xs font-bold text-orange-600 uppercase">Signing Request</span>
                                        </div>
                                        <h4 className="font-bold text-sm mb-1">{event.docName}</h4>
                                        <p className="text-xs text-gray-500 mb-3">Requested for {event.signers.length} people</p>
                                        <button className="w-full bg-orange-50 text-orange-600 font-bold text-xs py-2 rounded-lg hover:bg-orange-100 transition">
                                            View Document
                                        </button>
                                        <div className="text-[10px] text-gray-300 text-right mt-1">{event.time}</div>
                                    </div>
                                </div>
                            );
                        }

                        // Message Bubble
                        const userDisplay = window.App.utils.getUserDisplay(event.userId);
                        return (
                            <div key={idx} className={`flex gap-3 ${isMe ? 'flex-row-reverse' : ''}`}>
                                <img src={userDisplay.avatar} className="w-8 h-8 rounded-full bg-gray-100 self-end" />
                                <div className={`flex flex-col max-w-[75%] ${isMe ? 'items-end' : 'items-start'}`}>
                                    {!isMe && <span className="text-xs text-gray-500 ml-1 mb-1">{userDisplay.name}</span>}
                                    <div className={`px-4 py-2.5 rounded-2xl text-sm ${isMe
                                        ? 'bg-primary text-white rounded-br-none'
                                        : 'bg-gray-100 dark:bg-surface-dark text-gray-900 dark:text-white rounded-bl-none'
                                        }`}>
                                        {event.text}
                                    </div>
                                    <span className="text-[10px] text-gray-400 mt-1 mx-1">{event.time}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>

            {/* Chat Input Area with Action Button */}
            <footer className="absolute bottom-0 left-0 right-0 bg-white dark:bg-surface-dark border-t border-border-light dark:border-border-dark p-3 z-30">
                {/* Action Menu (WhatsApp Style) */}
                {showActions && (
                    <div className="absolute bottom-16 left-4 bg-white dark:bg-surface-dark rounded-xl shadow-2xl border border-gray-100 dark:border-gray-800 p-2 animate-scale-up origin-bottom-left flex flex-col gap-2 w-48 z-40">
                        <button onClick={() => setActionStep('select_doc')} className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg text-left text-gray-700 dark:text-gray-200 transition">
                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center"><span className="material-icons-round">description</span></div>
                            <span className="text-sm font-bold">Request Signature</span>
                        </button>
                        <button className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg text-left text-gray-700 dark:text-gray-200 transition">
                            <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center"><span className="material-icons-round">image</span></div>
                            <span className="text-sm font-bold">Photo & Video</span>
                        </button>
                    </div>
                )}

                {/* Embedded Signing Flow Modals */}
                {actionStep === 'select_doc' && (
                    <div className="absolute inset-0 bg-white dark:bg-surface-dark z-50 flex flex-col animate-slide-up">
                        <header className="px-4 pt-4 pb-2 border-b border-gray-100 flex items-center gap-3">
                            <button onClick={() => setActionStep(null)}><span className="material-icons-round">close</span></button>
                            <h2 className="font-bold">Select Document</h2>
                        </header>
                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
// ... (inside map)
                            })}

                            {/* Empty State for Docs */}
                            {window.App.state.documents.filter(d => d.workspaceId === thread.workspaceId).length === 0 && (
                                <div className="text-center py-8 text-gray-400">
                                    <span className="material-icons-round text-3xl mb-2">folder_off</span>
                                    <p className="text-sm">No documents found in this workspace.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {actionStep === 'select_signers' && (
                    <div className="absolute inset-0 bg-white dark:bg-surface-dark z-50 flex flex-col animate-slide-up">
                        <header className="px-4 pt-4 pb-2 border-b border-gray-100 flex items-center gap-3">
                            <button onClick={() => setActionStep('select_doc')}><span className="material-icons-round">arrow_back</span></button>
                            <h2 className="font-bold">Who needs to sign?</h2>
                        </header>
                        <div className="flex-1 overflow-y-auto p-4 space-y-2">
                            {thread.participants.filter(p => p.userId !== currentUser).map(p => {
                                // ... existing map logic ...
                                const user = window.App.utils.getUserDisplay(p.userId);
                                const isSelected = selectedSigners.includes(p.userId);
                                return (
                                    <div key={p.userId} onClick={() => {
                                        if (isSelected) setSelectedSigners(prev => prev.filter(id => id !== p.userId));
                                        else setSelectedSigners(prev => [...prev, p.userId]);
                                    }} className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer ${isSelected ? 'border-primary bg-red-50' : 'border-gray-100'}`}>
                                        <div className={`w-5 h-5 rounded border flex items-center justify-center ${isSelected ? 'bg-primary border-primary text-white' : 'border-gray-300'}`}>
                                            {isSelected && <span className="material-icons text-xs">check</span>}
                                        </div>
                                        <img src={user.avatar} className="w-8 h-8 rounded-full" />
                                        <span className="text-sm font-bold">{user.name}</span>
                                    </div>
                                )
                            })}

                            {/* Empty State for Signers */}
                            {thread.participants.filter(p => p.userId !== currentUser).length === 0 && (
                                <div className="text-center py-8 text-gray-400">
                                    <span className="material-icons-round text-3xl mb-2">person_off</span>
                                    <p className="text-sm">No other members in this chat.</p>
                                </div>
                            )}
                        </div>
                        <div className="p-4 border-t border-gray-100">
                            <button
                                disabled={selectedSigners.length === 0}
                                onClick={() => {
                                    window.App.state.createEmbeddedSigningRequest(threadId, selectedDoc.id, selectedSigners);
                                    setActionStep(null);
                                    setShowActions(false);
                                    setSelectedSigners([]);
                                    setSelectedDoc(null);
                                }}
                                className="w-full bg-primary text-white py-3 rounded-xl font-bold disabled:opacity-50">
                                Send Request
                            </button>
                        </div>
                    </div>
                )}


                <div className="flex items-end gap-2">
                    <button
                        onClick={() => setShowActions(!showActions)}
                        className={`p-2 rounded-full transition ${showActions ? 'bg-gray-200 text-gray-800' : 'text-text-secondary-light hover:bg-gray-100'}`}
                    >
                        <span className={`material-icons-round transition-transform ${showActions ? 'rotate-45' : ''}`}>add_circle_outline</span>
                    </button>
                    <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center px-4 py-2 min-h-[44px]">
                        <input className="bg-transparent border-none focus:ring-0 w-full text-sm p-0" placeholder="Message..." type="text" />
                    </div>
                    <button className="p-2 text-primary hover:bg-red-50 rounded-full"><span className="material-icons-round">send</span></button>
                </div>
            </footer>

            {/* Member Info Side Panel (Simplified Modal for Prototype) */}
            {showInfo && (
                <div className="absolute inset-0 z-50 flex justify-end">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowInfo(false)}></div>
                    <div className="w-80 bg-white dark:bg-surface-dark h-full shadow-2xl relative flex flex-col animate-slide-in-right">
                        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                            <h2 className="font-bold text-lg">Thread Details</h2>
                            <button onClick={() => setShowInfo(false)} className="p-1 rounded-full hover:bg-gray-100"><span className="material-icons-round">close</span></button>
                        </div>
                        <div className="p-4 overflow-y-auto flex-1">
                            <h3 className="text-xs font-bold text-gray-500 uppercase mb-3">Members ({thread.participants.length})</h3>
                            <div className="space-y-4">
                                {thread.participants.map(p => {
                                    const userDisplay = window.App.utils.getUserDisplay(p.userId);
                                    // Check if actually deactivated based on display title logic from global
                                    const isDeactivated = userDisplay.subtitle?.includes('Former') || p.status === 'deactivated';

                                    return (
                                        <div key={p.userId} className="flex items-center gap-3">
                                            <div className="relative">
                                                <img src={userDisplay.avatar} className={`w-10 h-10 rounded-full bg-gray-100 ${isDeactivated ? 'grayscale opacity-70' : ''}`} />
                                                {isDeactivated && (
                                                    <span className="absolute -bottom-1 -right-1 bg-red-500 text-white rounded-full p-0.5 border-2 border-white">
                                                        <span className="material-icons text-[10px]">block</span>
                                                    </span>
                                                )}
                                            </div>
                                            <div>
                                                <p className={`text-sm font-bold ${isDeactivated ? 'text-gray-400 line-through' : 'text-gray-900'}`}>{userDisplay.name}</p>
                                                <p className={`text-xs ${isDeactivated ? 'text-red-500 font-bold' : 'text-gray-500'}`}>{userDisplay.subtitle}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="mt-8 pt-8 border-t border-gray-100">
                                <h3 className="text-xs font-bold text-gray-500 uppercase mb-3">Actions</h3>
                                <button
                                    onClick={() => {
                                        if (confirm('Are you sure you want to leave this thread?')) {
                                            window.App.state.leaveThread(threadId, currentUser);
                                            navigate('/chats-list');
                                        }
                                    }}
                                    className="w-full text-left py-3 px-4 rounded-xl hover:bg-red-50 text-red-600 font-medium text-sm flex items-center gap-3">
                                    <span className="material-icons-round">exit_to_app</span> Leave Thread
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* FIX: Embedded Signing Flow Modals Moved OUTSIDE Footer for correct stacking context */}
            {actionStep === 'select_doc' && (
                <div className="absolute inset-0 bg-white dark:bg-surface-dark z-50 flex flex-col animate-slide-up">
                    <header className="px-4 pt-14 pb-2 border-b border-gray-100 flex items-center gap-3">
                        <button onClick={() => setActionStep(null)}><span className="material-icons-round">close</span></button>
                        <h2 className="font-bold">Select Document</h2>
                    </header>
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {window.App.state.documents.filter(d => d.workspaceId === thread.workspaceId).map(doc => (
                            <div key={doc.id} onClick={() => { setSelectedDoc(doc); setActionStep('select_signers'); }} className="flex items-center gap-3 p-3 border rounded-xl hover:bg-gray-50 cursor-pointer">
                                <span className="material-icons-round text-red-500">picture_as_pdf</span>
                                <div className="flex-1">
                                    <p className="text-sm font-bold">{doc.name}</p>
                                    <p className="text-xs text-gray-500">{doc.updated}</p>
                                </div>
                            </div>
                        ))}

                        {/* Empty State for Docs */}
                        {window.App.state.documents.filter(d => d.workspaceId === thread.workspaceId).length === 0 && (
                            <div className="text-center py-8 text-gray-400">
                                <span className="material-icons-round text-3xl mb-2">folder_off</span>
                                <p className="text-sm">No documents found in this workspace.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {actionStep === 'select_signers' && (
                <div className="absolute inset-0 bg-white dark:bg-surface-dark z-50 flex flex-col animate-slide-up">
                    <header className="px-4 pt-14 pb-2 border-b border-gray-100 flex items-center gap-3">
                        <button onClick={() => setActionStep('select_doc')}><span className="material-icons-round">arrow_back</span></button>
                        <h2 className="font-bold">Who needs to sign?</h2>
                    </header>
                    <div className="flex-1 overflow-y-auto p-4 space-y-2">
                        {thread.participants.filter(p => p.userId !== currentUser).map(p => {
                            const user = window.App.utils.getUserDisplay(p.userId);
                            const isSelected = selectedSigners.includes(p.userId);
                            return (
                                <div key={p.userId} onClick={() => {
                                    if (isSelected) setSelectedSigners(prev => prev.filter(id => id !== p.userId));
                                    else setSelectedSigners(prev => [...prev, p.userId]);
                                }} className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer ${isSelected ? 'border-primary bg-red-50' : 'border-gray-100'}`}>
                                    <div className={`w-5 h-5 rounded border flex items-center justify-center ${isSelected ? 'bg-primary border-primary text-white' : 'border-gray-300'}`}>
                                        {isSelected && <span className="material-icons text-xs">check</span>}
                                    </div>
                                    <img src={user.avatar} className="w-8 h-8 rounded-full" />
                                    <span className="text-sm font-bold">{user.name}</span>
                                </div>
                            )
                        })}

                        {/* Empty State for Signers */}
                        {thread.participants.filter(p => p.userId !== currentUser).length === 0 && (
                            <div className="text-center py-8 text-gray-400">
                                <span className="material-icons-round text-3xl mb-2">person_off</span>
                                <p className="text-sm">No other members in this chat.</p>
                            </div>
                        )}
                    </div>
                    <div className="p-4 border-t border-gray-100">
                        <button
                            disabled={selectedSigners.length === 0}
                            onClick={() => {
                                window.App.state.createEmbeddedSigningRequest(threadId, selectedDoc.id, selectedSigners);
                                setActionStep(null);
                                setShowActions(false);
                                setSelectedSigners([]);
                                setSelectedDoc(null);
                            }}
                            className="w-full bg-primary text-white py-3 rounded-xl font-bold disabled:opacity-50">
                            Send Request
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
