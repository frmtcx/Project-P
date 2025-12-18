window.App.DocumentsList = () => {
    const { useNavigate } = ReactRouterDOM;
    const { StatusBar, BottomNav } = window.App;
    const navigate = useNavigate();
    return (
        <div className="bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark min-h-screen pb-24">
            <StatusBar />
            <header className="bg-surface-light dark:bg-surface-dark px-4 py-3 sticky top-8 z-40 border-b border-border-light dark:border-border-dark flex items-center justify-between">
                <h1 className="font-bold text-lg">Documents</h1>
                <button className="text-primary font-medium text-sm">Upload</button>
            </header>
            <main className="px-4 py-4 space-y-4">
                <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-card divide-y divide-border-light overflow-hidden">
                    <div className="p-4 flex items-center gap-4 group cursor-pointer hover:bg-gray-50 transition" onClick={() => navigate('/request-signature-1')}>
                        <div className="w-10 h-10 rounded-lg bg-red-50 text-primary flex items-center justify-center"><span className="material-icons-round">picture_as_pdf</span></div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-sm truncate">Employment Contract v3.pdf</h3>
                            <p className="text-xs text-text-secondary-light">Updated 2h ago</p>
                        </div>
                        <button className="text-primary text-xs font-bold border border-primary px-3 py-1.5 rounded-lg hover:bg-red-50">Request Sig</button>
                    </div>
                    <div className="p-4 flex items-center gap-4 group cursor-pointer hover:bg-gray-50 transition">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center"><span className="material-icons-round">description</span></div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-sm truncate">Q4 Financial Report.docx</h3>
                            <p className="text-xs text-text-secondary-light">Updated yesterday</p>
                        </div>
                        <button className="text-text-secondary-light"><span className="material-icons-round">more_vert</span></button>
                    </div>
                </div>
            </main>
            <BottomNav />
        </div>
    );
};
