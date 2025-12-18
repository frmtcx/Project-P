window.App.NewMessage = () => {
    const { useNavigate } = ReactRouterDOM;

    const contacts = [
        { name: 'Ali Zainal Abidin', id: 'AZA1752', lastSeen: '29/11/25', section: 'A' },
        { name: 'Andika Firnanda', id: 'KF8024', lastSeen: '17/08/25', section: 'A' },
        { name: 'BUDIYANTO HALIM', id: 'BY6136', lastSeen: '25/02/25', section: 'B' },
        { name: 'CALVIN ISKANDAR', id: 'LV6986', lastSeen: '15/12/25', section: 'C' },
        { name: 'CALVIN YOUNG', id: 'CYI0999', lastSeen: '13/12/25', section: 'C' },
        { name: 'Defan Diotama', id: 'NQ2300', lastSeen: '03/12/25', section: 'D' },
        { name: 'DIENABILLAH GITA FITRI, S.Kom', id: 'HJ1552', lastSeen: '24/06/25', section: 'D' },
        { name: 'Dina Dellyana', id: 'LL9683', lastSeen: '05/12/25', section: 'D' },
    ];

    const sections = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    return (
        <div className="pb-24 bg-white min-h-screen font-sans">
            {/* Header */}
            <header className="bg-white px-5 py-4 flex items-center gap-3 sticky top-0 z-10">
                <button onClick={() => navigate(-1)} className="text-gray-600">
                    <span className="material-icons-round">arrow_back_ios</span>
                </button>
                <h1 className="text-lg font-bold text-gray-900 flex-1 text-center pr-8">New message</h1>
            </header>

            {/* Search */}
            <div className="px-5 mb-4">
                <div className="relative">
                    <span className="material-icons-round absolute left-3 top-2.5 text-gray-400 text-xl">search</span>
                    <input type="text" placeholder="Search" className="w-full bg-gray-100 border-none rounded-lg py-2.5 pl-10 pr-4 text-sm focus:ring-1 focus:ring-red-500" />
                </div>
            </div>

            <main className="relative">
                {/* Contact List */}
                <div className="pb-4">
                    {['A', 'B', 'C', 'D'].map(section => (
                        <div key={section} id={`section-${section}`}>
                            <div className="bg-gray-50 px-5 py-1 text-xs font-bold text-gray-500">{section}</div>
                            <div className="divide-y divide-gray-100">
                                {contacts.filter(c => c.section === section).map((contact, idx) => (
                                    <div key={idx} className="px-5 py-3 flex gap-3 hover:bg-gray-50 cursor-pointer">
                                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                                            <span className="material-icons-round text-2xl">person</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-1">
                                                <h3 className="font-bold text-gray-900 text-sm truncate">{contact.name}</h3>
                                                <span className="material-icons-round text-green-500 text-xs">verified</span>
                                            </div>
                                            <p className="text-xs text-gray-400">{contact.id}</p>
                                            <p className="text-xs text-gray-400">last seen {contact.lastSeen}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Index Sidebar */}
                <div className="fixed right-1 top-32 bottom-10 flex flex-col justify-center gap-0.5 z-20">
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
