const { createRoot } = ReactDOM;
const { MemoryRouter, Routes, Route } = ReactRouterDOM;
const { useState, useEffect } = React;

const MainApp = () => {
    const [isReady, setIsReady] = useState(false);
    const [retryCount, setRetryCount] = useState(0);

    useEffect(() => {
        const checkComponents = () => {
            if (!window.App) {
                console.warn("window.App is not defined yet");
                if (retryCount < 50) setTimeout(() => setRetryCount(c => c + 1), 100);
                return;
            }
            // Check for a few key components to ensure loading is complete
            const required = ['WorkspaceHome', 'DocumentThread', 'ActionInbox'];
            const missing = required.filter(name => !window.App[name]);

            if (missing.length === 0) {
                setIsReady(true);
            } else {
                if (retryCount < 150) { // 15 seconds timeout
                    setTimeout(() => setRetryCount(c => c + 1), 100);
                } else {
                    console.error("Timeout waiting for components:", missing);
                    // Force render to show error via getComponent
                    setIsReady(true);
                }
            }
        };
        checkComponents();
    }, [retryCount]);

    if (!isReady) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-500 font-sans">Loading PrivyChat...</p>
                </div>
            </div>
        );
    }

    // Safe component retrieval
    const get = (name) => {
        const Comp = window.App[name];
        if (!Comp) return () => <div className="p-4 text-red-500 font-mono text-sm">Error: {name} failed to load.</div>;
        return Comp;
    };

    const WorkspaceHome = get('WorkspaceHome');
    const WorkspaceSwitcher = get('WorkspaceSwitcher');
    const ChatsList = get('ChatsList');
    const CreateMenu = get('CreateMenu');
    const RequestSigStep1 = get('RequestSigStep1');
    const RequestSigStep2 = get('RequestSigStep2');
    const RequestSigStep3 = get('RequestSigStep3');
    const PeoplePicker = get('PeoplePicker');
    const SendSuccess = get('SendSuccess');
    const DocumentThread = get('DocumentThread');
    const DocumentThreadReviewer = get('DocumentThreadReviewer');
    const ActionInbox = get('ActionInbox');
    const SignerView = get('SignerView');
    const SignDocument = get('SignDocument');
    const SigningSuccess = get('SigningSuccess');
    const DocumentThreadCompleted = get('DocumentThreadCompleted');
    const AdminOverview = get('AdminOverview');
    const AdminMembers = get('AdminMembers');
    const OffboardUser = get('OffboardUser');
    const ReassignPicker = get('ReassignPicker');
    const OffboardingSuccess = get('OffboardingSuccess');
    const AccessReview = get('AccessReview');
    const DocumentsList = get('DocumentsList');
    const ProfilePreview = get('ProfilePreview');
    const ShareGuardrail = get('ShareGuardrail');
    const ScanQR = get('ScanQR');
    const NewMessage = get('NewMessage');
    const Notifications = get('Notifications');

    return (
        <MemoryRouter>
            <Routes>
                <Route path="/" element={<WorkspaceHome />} />
                <Route path="/workspace-switcher" element={<WorkspaceSwitcher />} />
                <Route path="/chats" element={<ChatsList />} />
                <Route path="/create-menu" element={<CreateMenu />} />
                <Route path="/documents-list" element={<DocumentsList />} />
                <Route path="/profile-preview" element={<ProfilePreview />} />
                <Route path="/share-guardrail" element={<ShareGuardrail />} />
                <Route path="/scan-qr" element={<ScanQR />} />
                <Route path="/new-message" element={<NewMessage />} />
                <Route path="/notifications" element={<Notifications />} />

                {/* Request Flow */}
                <Route path="/request-signature-1" element={<RequestSigStep1 />} />
                <Route path="/request-signature-2" element={<RequestSigStep2 />} />
                <Route path="/request-signature-3" element={<RequestSigStep3 />} />
                <Route path="/people-picker" element={<PeoplePicker />} />
                <Route path="/send-success" element={<SendSuccess />} />

                {/* Thread & Actions */}
                <Route path="/document-thread" element={<DocumentThread />} />
                <Route path="/document-thread-reviewer" element={<DocumentThreadReviewer />} />
                <Route path="/action-inbox" element={<ActionInbox />} />
                <Route path="/signer-view" element={<SignerView />} />
                <Route path="/sign-document" element={<SignDocument />} />
                <Route path="/signing-success" element={<SigningSuccess />} />
                <Route path="/document-thread-completed" element={<DocumentThreadCompleted />} />

                {/* Admin */}
                <Route path="/admin-overview" element={<AdminOverview />} />
                <Route path="/admin-members" element={<AdminMembers />} />
                <Route path="/offboard-user" element={<OffboardUser />} />
                <Route path="/reassign-picker" element={<ReassignPicker />} />
                <Route path="/offboarding-success" element={<OffboardingSuccess />} />
                <Route path="/access-review" element={<AccessReview />} />

                {/* Fallbacks */}
                <Route path="/docs" element={<DocumentsList />} />
            </Routes>
        </MemoryRouter>
    );
};

const root = createRoot(document.getElementById('root'));
root.render(<MainApp />);
