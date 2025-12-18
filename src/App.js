const { createRoot } = ReactDOM;
const { MemoryRouter, Routes, Route } = ReactRouterDOM;

const {
    WorkspaceHome,
    WorkspaceSwitcher,
    ChatsList,
    CreateMenu,
    RequestSigStep1,
    RequestSigStep2,
    PeoplePicker,
    RequestSigStep3,
    SendSuccess,
    DocumentThread,
    DocumentThreadReviewer,
    ActionInbox,
    SignerView,
    SignDocument,
    SigningSuccess,
    DocumentThreadCompleted,
    AdminOverview,
    AdminMembers,
    OffboardUser,
    ReassignPicker,
    OffboardingSuccess,
    AccessReview
} = window.App;

const App = () => {
    return (
        <MemoryRouter>
            <Routes>
                <Route path="/" element={<WorkspaceHome />} />
                <Route path="/workspace-switcher" element={<WorkspaceSwitcher />} />
                <Route path="/chats" element={<ChatsList />} />
                <Route path="/create-menu" element={<CreateMenu />} />
                <Route path="/request-signature-1" element={<RequestSigStep1 />} />
                <Route path="/request-signature-2" element={<RequestSigStep2 />} />
                <Route path="/people-picker" element={<PeoplePicker />} />
                <Route path="/request-signature-3" element={<RequestSigStep3 />} />
                <Route path="/send-success" element={<SendSuccess />} />
                <Route path="/document-thread" element={<DocumentThread />} />
                <Route path="/document-thread-reviewer" element={<DocumentThreadReviewer />} />
                <Route path="/action-inbox" element={<ActionInbox />} />
                <Route path="/signer-view" element={<SignerView />} />
                <Route path="/sign-document" element={<SignDocument />} />
                <Route path="/signing-success" element={<SigningSuccess />} />
                <Route path="/document-thread-completed" element={<DocumentThreadCompleted />} />
                <Route path="/admin-overview" element={<AdminOverview />} />
                <Route path="/admin-members" element={<AdminMembers />} />
                <Route path="/offboard-user" element={<OffboardUser />} />
                <Route path="/reassign-picker" element={<ReassignPicker />} />
                <Route path="/offboarding-success" element={<OffboardingSuccess />} />
                <Route path="/access-review" element={<AccessReview />} />
                {/* Fallbacks or empty routes for document viewing placeholders */}
                <Route path="/docs" element={<WorkspaceHome />} />
            </Routes>
        </MemoryRouter>
    );
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);
