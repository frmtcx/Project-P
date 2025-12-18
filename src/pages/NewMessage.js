window.App.NewMessage = () => {
    const { useNavigate } = ReactRouterDOM;
    const navigate = useNavigate(); // Fix: Define navigate
    const { useState } = React;

    const [selectedUsers, setSelectedUsers] = useState([]); // Array of user IDs or objects

    // Mock mapping from contact.id (e.g. AZA1752) to our global user IDs (e.g. 'alice')
    // In a real app, contacts would already have the correct user IDs.
    const contactToUserId = (contactId) => {
        // Simple mock mapping based on index or name
        return 'alice'; // Defaulting to 'alice' for demo if mapping fails. 
        // Better: Map Names to global keys
    };

    const contacts = [
        { name: 'Alice Richardson', id: 'alice', lastSeen: '29/11/25', section: 'A' }, // Changed to match global
        { name: 'Bob Smith', id: 'bob', lastSeen: '17/08/25', section: 'B' },
        { name: 'Charlie Workman', id: 'charlie', lastSeen: '25/02/25', section: 'C' },
        { name: 'Dave Miller', id: 'dave', lastSeen: '15/12/25', section: 'D' },
        { name: 'Eve Adams', id: 'eve', lastSeen: '13/12/25', section: 'E' },
        { name: 'Mom', id: 'mom', lastSeen: '03/12/25', section: 'M' },
    ];

    const sections = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    const toggleSelection = (id) => {
        if (selectedUsers.includes(id)) {
            setSelectedUsers(prev => prev.filter(u => u !== id));
        } else {
            setSelectedUsers(prev => [...prev, id]);
        }
    };

    const handleCreateChat = () => {
        if (selectedUsers.length === 0) return;

        // Create discussion via global method
        const threadId = window.App.state.createDiscussion(selectedUsers);
        navigate('/document-thread', { state: { threadId } });
    };

    return (
        <div className="pb-24 bg-white min-h-screen font-sans flex flex-col">
            {/* Header */}
            <header className="bg-white px-5 pt-14 pb-4 flex items-center gap-3 sticky top-0 z-30 border-b border-gray-100">
                <button onClick={() => navigate(-1)} className="text-gray-600">
                    <span className="material-icons-round">arrow_back_ios</span>
                </button>
                <div className="flex-1 text-center pr-2">
                    <h1 className="text-lg font-bold text-gray-900">New message</h1>
                    {selectedUsers.length > 0 && <p className="text-xs text-primary font-medium">{selectedUsers.length} selected</p>}
                </div>
                {selectedUsers.length > 0 && (
                    <button onClick={handleCreateChat} className="bg-primary text-white text-sm font-bold px-3 py-1.5 rounded-lg">
                        Chat
                    </button>
                )}
            </header>

            {/* Selected Users Horizontal Scroll */}
            {selectedUsers.length > 0 && (
                <div className="px-5 py-3 flex gap-3 overflow-x-auto border-b border-gray-100">
                    {selectedUsers.map(uid => {
                        const user = contacts.find(c => c.id === uid) || { name: uid };
                        return (
                            <div key={uid} className="flex flex-col items-center gap-1 shrink-0 w-16">
                                <div className="relative">
                                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500">
                                        {user.name.charAt(0)}
                                    </div>
                                    <button onClick={() => toggleSelection(uid)} className="absolute -top-1 -right-1 bg-gray-500 text-white rounded-full p-0.5">
                                        <span className="material-icons text-[10px]">close</span>
                                    </button>
                                </div>
                                <span className="text-[10px] text-gray-600 truncate w-full text-center">{user.name.split(' ')[0]}</span>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Search */}
            <div className="px-5 my-4">
                <div className="relative">
                    <span className="material-icons-round absolute left-3 top-2.5 text-gray-400 text-xl">search</span>
                    <input type="text" placeholder="Search" className="w-full bg-gray-100 border-none rounded-lg py-2.5 pl-10 pr-4 text-sm focus:ring-1 focus:ring-red-500" />
                </div>
            </div>

            <main className="relative flex-1 overflow-y-auto">
                {/* Contact List */}
                <div className="pb-4">
                    {sections.filter(s => contacts.some(c => c.section === s)).map(section => (
                        <div key={section} id={`section-${section}`}>
                            <div className="bg-gray-50 px-5 py-1 text-xs font-bold text-gray-500 sticky top-0">{section}</div>
                            <div className="divide-y divide-gray-100">
                                {contacts.filter(c => c.section === section).map((contact, idx) => {
                                    const isSelected = selectedUsers.includes(contact.id);
                                    return (
                                        <div key={idx} onClick={() => toggleSelection(contact.id)} className={`px-5 py-3 flex gap-3 cursor-pointer ${isSelected ? 'bg-red-50' : 'hover:bg-gray-50'}`}>
                                            <div className="relative">
                                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                                                    <span className="material-icons-round text-2xl">person</span>
                                                </div>
                                                {isSelected && (
                                                    <div className="absolute -bottom-1 -right-1 bg-primary text-white rounded-full p-0.5 border-2 border-white">
                                                        <span className="material-icons text-[10px]">check</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-1">
                                                    <h3 className={`font-bold text-sm truncate ${isSelected ? 'text-primary' : 'text-gray-900'}`}>{contact.name}</h3>
                                                    <span className="material-icons-round text-green-500 text-xs">verified</span>
                                                </div>
                                                <p className="text-xs text-gray-400">{contact.id}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Index Sidebar */}
                <div className="absolute right-1 top-10 bottom-10 flex flex-col justify-center gap-0.5 z-20">
                    {sections.map(letter => (
                        <a key={letter} href={`#section-${letter}`} className="text-[10px] font-bold text-blue-500 text-center w-6 py-0.5 hover:bg-gray-100 rounded">
                            {letter}
                        </a>
                    ))}
                </div>
            </main>
        </div>
    );
};
