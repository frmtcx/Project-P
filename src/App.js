const { createRoot } = ReactDOM;
const { MemoryRouter, Routes, Route } = ReactRouterDOM;

const {
    WorkspaceHome,
    WorkspaceSwitcher,
    ChatsList,
    CreateMenu,
    RequestSigStep1,
    RequestSigStep2,
    RequestSigStep3,
    PeoplePicker,
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
    AccessReview,
    DocumentsList,
    ProfilePreview,
    ShareGuardrail
} = window.App;

const App = () => {
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
