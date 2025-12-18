window.App.Notifications = () => {
    const { useNavigate } = ReactRouterDOM;

    return (
        <div className="pb-24 bg-white min-h-screen font-sans">
            {/* Header */}
            <header className="bg-white px-5 pt-14 pb-2 sticky top-0 z-10">
                <div className="flex justify-between items-center mb-4">
                    <div className="w-10"></div> {/* Spacer */}
                    <h1 className="text-lg font-bold text-gray-900">Notifications</h1>
                    <button className="text-red-500 text-sm font-medium">Read all</button>
                </div>
                <p className="text-center text-xs text-gray-400 -mt-3 mb-4">Updated today • 18:21</p>

                {/* Tabs */}
                <div className="flex gap-2 mb-2">
                    <button className="flex-1 py-1.5 rounded-full border border-blue-500 text-blue-500 text-sm font-medium bg-blue-50">Document</button>
                    <button className="flex-1 py-1.5 rounded-full border border-gray-200 text-gray-500 text-sm font-medium">Account</button>
                    <button className="flex-1 py-1.5 rounded-full border border-gray-200 text-gray-500 text-sm font-medium">Promotion</button>
                </div>
            </header>

            <main>
                <div className="px-5 mb-4">
                    {/* Empty State / All Clear */}
                    <div className="border border-gray-100 rounded-xl p-4 flex items-center gap-3 shadow-sm bg-white">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-400">
                            <span className="material-icons-round">done_all</span>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-sm font-bold text-gray-900">You're all caught up!</h3>
                            <p className="text-xs text-gray-500">No new urgent notifications.</p>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 py-2 px-5 text-xs font-bold text-gray-500">Recent</div>

                {window.App.state.notifications
                    .filter(n => n.workspaceId === window.App.state.currentWorkspace)
                    .map(notif => (
                        <div key={notif.id} className={`px-5 py-4 border-b border-gray-100 ${notif.read ? 'bg-white' : 'bg-blue-50/50'}`}>
                            <div className="flex gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${notif.type === 'security' ? 'bg-red-100 text-red-600' :
                                        notif.type === 'promo' ? 'bg-yellow-100 text-yellow-600' :
                                            'bg-blue-100 text-blue-600'
                                    }`}>
                                    <span className="material-icons-round text-lg">
                                        {notif.type === 'security' ? 'security' :
                                            notif.type === 'promo' ? 'campaign' :
                                                notif.type === 'mention' ? 'alternate_email' : 'description'}
                                    </span>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-900 font-bold">{notif.title}</p>
                                    <p className="text-xs text-gray-600 mt-0.5">{notif.text}</p>
                                    <p className="text-[10px] text-gray-400 mt-1 text-right">{notif.time}</p>
                                </div>
                            </div>
                        </div>
                    ))}
            </main>

            <window.App.BottomNav />
        </div>
    );
};
