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
                'WorkspaceSwitcher', 'ReassignPicker', 'OffboardingSuccess'
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

    // Splash Screen State
    const [showSplash, setShowSplash] = useState(true);

    return (
        <HashRouter>
            {showSplash && <window.App.SplashScreen onFinish={() => setShowSplash(false)} />}
            <div className={showSplash ? 'hidden' : ''}>
                <AppContent />
            </div>
        </HashRouter>
    );
};

const root = createRoot(document.getElementById('root'));
root.render(<MainApp />);
