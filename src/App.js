const { createRoot } = ReactDOM;
const { MemoryRouter, Routes, Route } = ReactRouterDOM;

// Safe component retrieval
const getComponent = (name) => {
    const component = window.App[name];
    if (!component) {
        console.error(`Component ${name} is missing from window.App`);
        return () => <div className="p-4 text-red-500">Error: Component {name} not found. Check console.</div>;
    }
    return component;
};

const App = () => {
    const WorkspaceHome = getComponent('WorkspaceHome');
    const WorkspaceSwitcher = getComponent('WorkspaceSwitcher');
    const ChatsList = getComponent('ChatsList');
    const CreateMenu = getComponent('CreateMenu');
    const RequestSigStep1 = getComponent('RequestSigStep1');
    const RequestSigStep2 = getComponent('RequestSigStep2');
    const RequestSigStep3 = getComponent('RequestSigStep3');
    const PeoplePicker = getComponent('PeoplePicker');
    const SendSuccess = getComponent('SendSuccess');
    const DocumentThread = getComponent('DocumentThread');
    const DocumentThreadReviewer = getComponent('DocumentThreadReviewer');
    const ActionInbox = getComponent('ActionInbox');
    const SignerView = getComponent('SignerView');
    const SignDocument = getComponent('SignDocument');
    const SigningSuccess = getComponent('SigningSuccess');
    const DocumentThreadCompleted = getComponent('DocumentThreadCompleted');
    const AdminOverview = getComponent('AdminOverview');
    const AdminMembers = getComponent('AdminMembers');
    const OffboardUser = getComponent('OffboardUser');
    const ReassignPicker = getComponent('ReassignPicker');
    const OffboardingSuccess = getComponent('OffboardingSuccess');
    const AccessReview = getComponent('AccessReview');
    const DocumentsList = getComponent('DocumentsList');
    const ProfilePreview = getComponent('ProfilePreview');
    const ShareGuardrail = getComponent('ShareGuardrail');

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
root.render(<App />);
