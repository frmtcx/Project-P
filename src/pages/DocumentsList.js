window.App.DocumentsList = () => {
    const { useNavigate } = ReactRouterDOM;
    const { StatusBar, BottomNav } = window.App;
    const navigate = useNavigate();

    const [documents, setDocuments] = React.useState(
        window.App.state.documents.filter(d => d.workspaceId === window.App.state.currentWorkspace)
    );

    React.useEffect(() => {
        return window.App.state.subscribe(() => {
            setDocuments(
                window.App.state.documents.filter(d => d.workspaceId === window.App.state.currentWorkspace)
            );
        });
    }, []);

    return (
        <div className="bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark min-h-screen pb-24">

            <header className="bg-surface-light dark:bg-surface-dark px-4 pt-14 pb-3 sticky top-0 z-40 border-b border-border-light dark:border-border-dark flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div>
                        <h1 className="font-bold text-lg leading-tight">Documents</h1>
                        <p className="text-[10px] text-primary font-bold uppercase tracking-wider">
                            {window.App.state.workspaces[window.App.state.currentWorkspace]?.name}
                        </p>
                    </div>
                    <button onClick={() => window.App.toggleWorkspaceSwitcher(true)} className="p-1.5 rounded-lg bg-gray-50 text-text-secondary-light hover:bg-gray-100">
                        <span className="material-icons-round text-lg">swap_horiz</span>
                    </button>
                </div>
                <button className="text-primary font-medium text-sm">Upload</button>
            </header>
            <main className="px-4 py-4 space-y-4">
                <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-card divide-y divide-border-light overflow-hidden">
                    {documents.map(doc => (
                        <div key={doc.id} className="p-4 flex items-center gap-4 group cursor-pointer hover:bg-gray-50 transition" onClick={() => navigate('/request-signature-1', { state: { docId: doc.id } })}>
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${doc.type === 'pdf' ? 'bg-red-50 text-primary' : 'bg-blue-50 text-blue-600'}`}>
                                <span className="material-icons-round">{doc.type === 'pdf' ? 'picture_as_pdf' : 'description'}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-sm truncate">{doc.name}</h3>
                                <p className="text-xs text-text-secondary-light">Updated {doc.updated}</p>
                            </div>
                            <button className="text-primary text-xs font-bold border border-primary px-3 py-1.5 rounded-lg hover:bg-red-50">Request Sig</button>
                        </div>
                    ))}
                </div>
            </main>
            <BottomNav />
        </div>
    );
};
