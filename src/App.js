const { createRoot } = ReactDOM;
const { MemoryRouter, Routes, Route } = ReactRouterDOM;
const { useState, useEffect } = React;

const MainApp = () => {
    const { HashRouter, Routes, Route, useNavigate, useLocation } = ReactRouterDOM;
    const {
        WorkspaceHome, DocumentsList, ActionInbox,
        RequestSigStep1, RequestSigStep2, RequestSigStep3, SendSuccess,
        DocumentThread, AdminMembers, OffboardUser, AccessReview,
        WorkspaceSwitcher, ScanQR, NewMessage, Notifications
    } = window.App;
    const { useState, useEffect } = React;

    // Component loading check
    const [isReady, setIsReady] = useState(false);
    const [retryCount, setRetryCount] = useState(0);

    useEffect(() => {
        const checkComponents = () => {
            const required = [
                'WorkspaceHome', 'DocumentsList', 'ActionInbox',
                'RequestSigStep1', 'RequestSigStep2', 'RequestSigStep3', 'SendSuccess',
                'DocumentThread', 'AdminMembers', 'OffboardUser', 'AccessReview',
                'WorkspaceSwitcher'
            ];
            const missing = required.filter(c => !window.App[c]);

            if (missing.length === 0) {
                setIsReady(true);
            } else {
                if (retryCount < 150) { // 15 seconds timeout
                    setTimeout(() => setRetryCount(c => c + 1), 100);
                } else {
                    console.error("Timeout waiting for components:", missing);
                    setIsReady(true); // Try to render anyway
                }
            }
        };
        checkComponents();
    }, [retryCount]);

    if (!isReady) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            </div>
        );
    }

    // Safe component retrieval
    const get = (name) => {
        const Comp = window.App[name];
        if (!Comp) return () => <div className="p-4 text-red-500 font-mono text-sm">Error: {name} failed to load.</div>;
        return Comp;
    };

    // Components are already destructured at the top, so we don't need to redeclare them.
    // However, to maintain the safe retrieval logic if desired, we could wrap them.
    // But for now, let's trust the top-level destructuring and the loading check.

    return (
        <HashRouter>
            <div className="max-w-md mx-auto bg-white min-h-screen shadow-2xl overflow-hidden relative">
                <Routes>
                    <Route path="/" element={<WorkspaceHome />} />
                    <Route path="/documents-list" element={<DocumentsList />} />
                    <Route path="/action-inbox" element={<ActionInbox />} />

                    {/* Signing Request Flow */}
                    <Route path="/request-signature-1" element={<RequestSigStep1 />} />
                    <Route path="/request-signature-2" element={<RequestSigStep2 />} />
                    <Route path="/request-signature-3" element={<RequestSigStep3 />} />
                    <Route path="/send-success" element={<SendSuccess />} />

                    {/* Thread & Workflow */}
                    <Route path="/document-thread" element={<DocumentThread />} />

                    {/* Admin & Offboarding */}
                    <Route path="/admin-members" element={<AdminMembers />} />
                    <Route path="/offboard-user" element={<OffboardUser />} />
                    <Route path="/access-review" element={<AccessReview />} />

                    {/* Utilities */}
                    <Route path="/workspace-switcher" element={<WorkspaceSwitcher />} />
                    <Route path="/scan-qr" element={ScanQR ? <ScanQR /> : <div>Scan QR Placeholder</div>} />
                    <Route path="/new-message" element={NewMessage ? <NewMessage /> : <div>New Message Placeholder</div>} />
                    <Route path="/notifications" element={Notifications ? <Notifications /> : <div>Notifications Placeholder</div>} />
                </Routes>
            </div>
        </HashRouter>
    );
};

const root = createRoot(document.getElementById('root'));
root.render(<MainApp />);
