// Initialize global namespace
window.App = window.App || {};

// Robust State Management for PrivyChat Prototype
window.App.state = {
    // 1. Session State
    currentWorkspace: 'company_a', // 'company_a' | 'personal' | 'company_b'
    currentUser: 'frans', // The logged-in user

    // 2. Data Models
    ui: {
        activeChatTab: 'all' // 'all' | 'actions' | 'mentions'
    },
    users: {
        frans: {
            id: 'frans',
            name: "Frans",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Frans",
            company_a: { title: "Product Manager", label: "Company A", role: "admin" },
            company_b: { title: "Consultant", label: "Company B", role: "member" },
            personal: { title: null, label: "Privy User", role: "owner" }
        },
        // Company A Users
        alice: {
            id: 'alice',
            name: "Alice Richardson",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
            company_a: { title: "Engineering Manager", label: "Company A", role: "member", accessRisk: 'inactive' },
            company_b: { title: null, label: "Company B", role: "none" },
            personal: { title: null, label: "Privy User", role: "owner" }
        },
        bob: {
            id: 'bob',
            name: "Bob Smith",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
            company_a: { title: "Legal Counsel", label: "Company A", role: "member", accessRisk: 'identity_changed' },
            personal: { title: null, label: "Privy User", role: "none" }
        },
        charlie: {
            id: 'charlie',
            name: "Charlie Workman",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie",
            company_a: { title: "Senior Engineer", label: "Company A", role: "member" },
            personal: { title: null, label: "Privy User", role: "none" }
        },
        sarah: {
            id: 'sarah',
            name: "Sarah Jenkins",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
            company_a: { title: "Former Member", label: "Deactivated Account", role: "none", status: 'deactivated' }, // Deactivated
            personal: { title: null, label: "Privy User", role: "none" }
        },
        // Company B Users
        dave: {
            id: 'dave',
            name: "Dave Miller",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dave",
            company_b: { title: "Project Lead", label: "Company B", role: "admin" },
            personal: { title: null, label: "Privy User", role: "none" }
        },
        eve: {
            id: 'eve',
            name: "Eve Adams",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Eve",
            company_b: { title: "Designer", label: "Company B", role: "member" },
            personal: { title: null, label: "Privy User", role: "none" }
        },
        // Personal Users users
        mom: {
            id: 'mom',
            name: "Mom",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mom",
            personal: { title: "Family", label: "Personal", role: "member" }
        }
    },

    workspaces: {
        company_a: { id: 'company_a', name: "Company A", type: "business", members: ['frans', 'alice', 'bob', 'charlie'] },
        company_b: { id: 'company_b', name: "Company B", type: "business", members: ['frans', 'dave', 'eve'] },
        personal: { id: 'personal', name: "Personal", type: "personal", members: ['frans', 'mom'] }
    },

    documents: [
        { id: 'doc_1', name: "Employment Contract v3.pdf", updated: "2h ago", type: "pdf", workspaceId: 'company_a' },
        { id: 'doc_2', name: "Q4 Financial Report.docx", updated: "Yesterday", type: "docx", workspaceId: 'company_a' },
        { id: 'doc_3', name: "NDA_External_Vendor.pdf", updated: "3 days ago", type: "pdf", workspaceId: 'company_a' },
        { id: 'doc_4', name: "Personal_Tax_2024.pdf", updated: "1 week ago", type: "pdf", workspaceId: 'personal' },
        { id: 'doc_5', name: "House_Rental_Agreement.pdf", updated: "2 weeks ago", type: "pdf", workspaceId: 'personal' },
        { id: 'doc_6', name: "Consulting_Invoice_Dec.pdf", updated: "5 days ago", type: "pdf", workspaceId: 'company_b' },
        { id: 'doc_7', name: "Project_Proposal_Draft.docx", updated: "1 day ago", type: "docx", workspaceId: 'company_b' }
    ],

    // Threads: The core of the chat + workflow
    threads: {
        // --- COMPANY A THREADS ---

        // 1. [Doc Chat] Active Signing Flow
        'thread_1': {
            id: 'thread_1',
            docId: 'doc_1',
            type: 'document',
            title: "Employment Contract v3",
            workspaceId: 'company_a',
            status: 'in_review',
            participants: [
                { userId: 'frans', role: 'viewer' },
                { userId: 'bob', role: 'reviewer', status: 'pending' },
                { userId: 'alice', role: 'signer', status: 'pending' }
            ],
            events: [
                { type: 'system', text: "Signing request created by Frans", time: "10:00 AM" },
                { type: 'message', userId: 'frans', text: "Hi Bob, can you please review the indemnity clause?", time: "10:05 AM", reactions: { '👍': 1 } },
                { type: 'message', userId: 'bob', text: "Sure Frans, taking a look now.", time: "10:15 AM", replyTo: "Hi Bob, can you please review the indemnity clause?" },
                // Dummy Signing Request for Prototype Demo (Nudgeable)
                {
                    type: 'signing_request',
                    docId: 'doc_1',
                    docName: "Employment Contract v3.pdf",
                    signers: ['alice', 'bob'],
                    status: 'pending',
                    time: "10:20 AM",
                    userId: 'frans' // Me (Creator) -> Can Nudge
                }
            ],
            messages: [],
            lastActivity: "10:15 AM"
        },

        // 2. [Normal Chat] "Lunch" Mention Context
        'thread_lunch': {
            id: 'thread_lunch',
            workspaceId: 'company_a',
            type: 'discussion',
            title: 'Team Lunch Planning',
            participants: [
                { userId: 'frans', role: 'member' },
                { userId: 'bob', role: 'member' },
                { userId: 'charlie', role: 'member' }
            ],
            status: 'active',
            events: [
                { userId: 'bob', text: 'Pizza again?', time: '15 mins ago' },
                { userId: 'charlie', text: 'I am down for whatever.', time: '12 mins ago' },
                { userId: 'bob', text: '@Frans are you driving or should we order an Uber?', time: '10 mins ago' }
            ],
            messages: [],
            lastActivity: '10 mins ago'
        },

        // 3. [Normal Chat] "Design" Mention Context
        'thread_design': {
            id: 'thread_design',
            workspaceId: 'company_a',
            type: 'discussion',
            title: 'Design Handoff',
            participants: [
                { userId: 'frans', role: 'member' },
                { userId: 'dave', role: 'member' } // Dave is external/multi-workspace
            ],
            status: 'active',
            events: [
                { userId: 'dave', text: 'Just pushed the latest figma links.', time: '2 hours ago' },
                { userId: 'dave', text: '@Frans I\'ve uploaded the new assets. Please check specifically the \'Mobile_Home_v2\' artboards.', time: '2 hours ago' }
            ],
            messages: [],
            lastActivity: '2 hours ago'
        },

        // 4. [Doc Chat] Completed with Deactivated User
        'thread_3': {
            id: 'thread_3',
            docId: 'doc_3',
            type: 'document',
            title: "NDA External Vendor",
            workspaceId: 'company_a',
            status: 'completed',
            participants: [
                { userId: 'frans', role: 'viewer' },
                { userId: 'sarah', role: 'signer', status: 'completed' }
            ],
            events: [
                { type: 'message', userId: 'sarah', text: "I've reviewed the terms, they look standard.", time: "3 days ago" },
                { type: 'system', text: "Sarah Jenkins offboarded from workspace", time: "Yesterday" }
            ],
            messages: [],
            lastActivity: "Yesterday"
        },

        // 5. [Reassigned Task] Legacy Audit
        'thread_reassigned': {
            id: 'thread_reassigned',
            docId: 'doc_2',
            type: 'document',
            title: "Q4 Financial Report",
            workspaceId: 'company_a',
            status: 'in_review',
            participants: [
                { userId: 'frans', role: 'reviewer', status: 'pending' },
                { userId: 'alice', role: 'viewer' }
            ],
            events: [
                { type: 'system', text: "Signing request created by Alice", time: "2 weeks ago" },
                { type: 'system', text: "Sarah Jenkins added as reviewer", time: "2 weeks ago" },
                { type: 'system', text: "Sarah Jenkins offboarded from workspace", time: "Yesterday" },
                { type: 'system', text: "Task reassigned to Frans", time: "Yesterday" }
            ],
            messages: [],
            lastActivity: "Yesterday"
        },

        // --- COMPANY B THREADS ---

        // 6. [Doc Chat] Project Proposal
        'thread_4': {
            id: 'thread_4',
            docId: 'doc_7',
            type: 'document',
            title: "Project Proposal Draft",
            workspaceId: 'company_b',
            status: 'draft',
            participants: [
                { userId: 'frans', role: 'viewer' },
                { userId: 'dave', role: 'signer', status: 'pending' }
            ],
            events: [
                { type: 'system', text: "Draft created", time: "1 day ago" }
            ],
            messages: [],
            lastActivity: "1 day ago"
        },

        // 7. [Doc Chat] Invoice Review (Action Item)
        'thread_b_review': {
            id: 'thread_b_review',
            docId: 'doc_6',
            type: 'document',
            title: "Consulting Invoice Dec",
            workspaceId: 'company_b',
            status: 'in_review',
            participants: [
                { userId: 'frans', role: 'reviewer', status: 'pending' },
                { userId: 'eve', role: 'viewer' } // Changed from Dave to Eve for variety
            ],
            events: [
                { type: 'message', userId: 'eve', text: "Please review the hours for December.", time: "5 hours ago" },
                { type: 'system', text: "Review requested", time: "5 hours ago" }
            ],
            messages: [],
            lastActivity: "5 hours ago"
        },

        // --- PERSONAL THREADS ---

        // 8. [Doc Chat] Lease (Action Item)
        'thread_personal_sign': {
            id: 'thread_personal_sign',
            docId: 'doc_5',
            type: 'document',
            title: "Lease Renewal 2025",
            workspaceId: 'personal',
            status: 'in_signing',
            participants: [
                { userId: 'frans', role: 'signer', status: 'pending' },
                { userId: 'mom', role: 'viewer' }
            ],
            events: [
                { type: 'message', userId: 'mom', text: "Landlord sent this over.", time: "1 hour ago" }
            ],
            messages: [],
            lastActivity: "1 hour ago"
        }
    },

    // Inbox: Derived from threads, but stored for easy access in prototype
    inbox: [
        // Tasks linked to specific threads above
        { id: 'task_1', threadId: 'thread_1', userId: 'bob', type: 'to_review', status: 'pending', title: "Review: Employment Contract v3", time: "10:00 AM" },
        { id: 'task_reassigned', threadId: 'thread_reassigned', userId: 'frans', type: 'to_review', status: 'pending', title: "Review: Q4 Financial Report", time: "Yesterday" },
        { id: 'task_b_review', threadId: 'thread_b_review', userId: 'frans', type: 'to_review', status: 'pending', title: "Review: Consulting Invoice Dec", time: "5 hours ago" },
        { id: 'task_personal_sign', threadId: 'thread_personal_sign', userId: 'frans', type: 'to_sign', status: 'pending', title: "Sign: Lease Renewal 2025", time: "1 hour ago" },

        // MENTIONS linked to specific threads above
        {
            id: 'mention_1',
            threadId: 'thread_design',
            userId: 'frans',
            type: 'mention',
            status: 'pending',
            title: "Design Handoff",
            text: "@Frans I've uploaded the new assets. Please check specifically the 'Mobile_Home_v2' artboards.",
            time: "2 hours ago"
        },
        {
            id: 'mention_2',
            threadId: 'thread_lunch',
            userId: 'frans',
            type: 'mention',
            status: 'pending',
            title: "Team Lunch Planning",
            text: "@Frans are you driving or should we order an Uber?",
            time: "10 mins ago"
        }
    ],

    // System Notifications
    notifications: [
        // Company A
        { id: 'notif_1', workspaceId: 'company_a', type: 'document', title: "Document Signed", text: "Alice has signed Employment Contract v3", time: "10 min ago", read: false },
        { id: 'notif_2', workspaceId: 'company_a', type: 'security', title: "New Login", text: "New login detected from Mac OS X", time: "1 hour ago", read: true },

        // Company B
        { id: 'notif_3', workspaceId: 'company_b', type: 'mention', title: "New Mention", text: "Eve mentioned you in Design Handoff", time: "2 hours ago", read: false },

        // Personal
        { id: 'notif_4', workspaceId: 'personal', type: 'promo', title: "Storage Full", text: "You are running low on storage space.", time: "Yesterday", read: true }
    ],

    // 3. Methods
    listeners: [],
    subscribe(listener) {
        this.listeners.push(listener);
        return () => { this.listeners = this.listeners.filter(l => l !== listener); };
    },
    notify() {
        this.listeners.forEach(l => l());
    },

    updateUI(key, value) {
        if (this.ui[key] !== undefined) {
            this.ui[key] = value;
            this.notify();
        }
    },

    setWorkspace(ws) {
        this.currentWorkspace = ws;
        this.notify();
    },

    // Flow 1: Create Request
    createSigningRequest(docId, participants, enableChat = true) {
        const threadId = 'thread_' + Date.now();
        const doc = this.documents.find(d => d.id === docId);

        const newThread = {
            id: threadId,
            docId: docId,
            title: doc.name.replace('.pdf', '').replace('.docx', ''),
            workspaceId: this.currentWorkspace,
            type: 'document', // Explicitly set type to ensure card renders
            status: 'in_review',
            enableChat: enableChat,
            participants: [
                { userId: this.currentUser, role: 'viewer' },
                ...participants
            ],
            events: [
                { type: 'system', text: `Signing request created by ${this.users[this.currentUser].name}`, time: "Just now" },
                { type: 'system', text: `Participants added: ${participants.map(p => `${this.users[p.userId].name} (${p.role})`).join(', ')}`, time: "Just now" }
            ],
            messages: []
        };

        this.threads[threadId] = newThread;

        // Create Inbox Items
        participants.forEach(p => {
            if (p.status === 'pending') {
                this.inbox.push({
                    id: 'task_' + Date.now() + '_' + p.userId,
                    threadId: threadId,
                    userId: p.userId,
                    type: p.role === 'signer' ? 'to_sign' : 'to_review',
                    status: 'pending',
                    title: `${p.role === 'signer' ? 'Sign' : 'Review'}: ${newThread.title}`,
                    time: "Just now"
                });
            }
        });

        this.notify();
        return threadId;
    },

    // Flow 1b: Create Discussion (Group Chat)
    createDiscussion(participantIds, title = null) {
        const threadId = 'thread_' + Date.now();

        // Add current user if not in list
        const allUserIds = [...new Set([this.currentUser, ...participantIds])];

        // Default title if none provided: Comma separated names
        if (!title) {
            title = allUserIds
                .filter(id => id !== this.currentUser)
                .map(id => this.users[id]?.name || id)
                .join(', ');
            if (title.length > 30) title = title.substring(0, 30) + '...';
        }

        const newThread = {
            id: threadId,
            type: 'discussion',
            title: title || 'New Chat',
            workspaceId: this.currentWorkspace,
            status: 'active',
            enableChat: true, // Default to true for new discussion threads
            participants: allUserIds.map(id => ({ userId: id, role: 'member' })),
            events: [
                { type: 'system', text: 'Group chat created', time: "Just now" }
            ],
            messages: [],
            lastActivity: "Just now"
        };

        this.threads[threadId] = newThread;
        this.notify();
        return threadId;
    },

    // Flow 1c: Add generic event (message, system, nudge)
    addEvent(threadId, event) {
        const thread = this.threads[threadId];
        if (!thread) return;

        // Ensure time is set if missing
        if (!event.time) event.time = "Just now";

        thread.events.push(event);
        thread.lastActivity = "Just now";
        this.notify();
    },

    // Flow 1c: Embedded Signing Request (In-Thread)
    createEmbeddedSigningRequest(threadId, docId, signerIds) {
        const thread = this.threads[threadId];
        const doc = this.documents.find(d => d.id === docId);
        if (!thread || !doc) return;

        // Add 'signing_request' event to the chat stream (Immutable update)
        const newEvent = {
            type: 'signing_request',
            docId: docId,
            docName: doc.name,
            signers: signerIds,
            status: 'pending',
            time: "Just now",
            userId: this.currentUser // FIX: Track who created the request
        };

        thread.events = [...thread.events, newEvent];
        thread.lastActivity = "Just now";

        // Create Inbox Items for Signers
        signerIds.forEach(userId => {
            this.inbox.push({
                id: 'task_' + Date.now() + '_' + userId,
                threadId: threadId,
                userId: userId,
                type: 'to_sign',
                status: 'pending',
                title: `Sign: ${doc.name} (in ${thread.title})`,
                time: "Just now",
                context: 'embedded' // marker for different UI handling if needed
            });
        });

        this.notify();
    },

    // Flow 2 & 3: Workflow Actions
    updateThreadStatus(threadId, action, userId, payload) {
        const thread = this.threads[threadId];
        if (!thread) return;

        const user = this.users[userId];

        if (action === 'review_approve') {
            thread.status = 'in_signing';
            thread.events.push({ type: 'system', text: `Reviewed by ${user.name}`, time: "Just now" });

            // Update participant status
            const reviewer = thread.participants.find(p => p.role === 'reviewer');
            if (reviewer) reviewer.status = 'completed';

            const signer = thread.participants.find(p => p.role === 'signer');
            if (signer) signer.status = 'pending';

            // Update Inbox: Remove reviewer task, add signer task
            this.inbox = this.inbox.filter(i => i.threadId !== threadId || i.type !== 'to_review');
            if (signer) {
                this.inbox.push({
                    id: 'task_' + Date.now(),
                    threadId: threadId,
                    userId: signer.userId,
                    type: 'to_sign',
                    status: 'pending',
                    title: `Sign: ${thread.title}`,
                    time: "Just now"
                });
            }
        } else if (action === 'sign') {
            thread.status = 'completed';
            thread.events.push({ type: 'system', text: `Signed by ${user.name}`, time: "Just now" });
            thread.events.push({ type: 'system', text: `Signing completed`, time: "Just now" });

            const signer = thread.participants.find(p => p.role === 'signer');
            if (signer) signer.status = 'completed';

            // Update Inbox
            this.inbox = this.inbox.filter(i => i.threadId !== threadId || i.type !== 'to_sign');
            // Add to completed for everyone? (Simplified for prototype)
        } else if (action === 'request_changes') {
            thread.status = 'draft'; // or needs_changes
            thread.events.push({ type: 'system', text: `Changes requested by ${user.name}: "${payload.comment}"`, time: "Just now" });

            // Reset statuses?
        }

        this.notify();
    },

    // Flow 6: Offboarding
    offboardUser(userId, workspaceId) {
        // 1. Remove from workspace
        const ws = this.workspaces[workspaceId];
        ws.members = ws.members.filter(id => id !== userId);

        // 2. Update User Identity in that context
        if (this.users[userId][workspaceId]) {
            this.users[userId][workspaceId].label = `Former Member (${this.users[userId].name})`;
            this.users[userId][workspaceId].title = "Former Member";
            this.users[userId][workspaceId].role = "none";
        }

        // 3. Find pending tasks
        const pendingTasks = this.inbox.filter(t => t.userId === userId && t.status === 'pending');

        // Return tasks for reassignment UI
        return pendingTasks;
    },

    // Flow 6: Reassign
    reassignTask(taskId, newUserId, adminId) {
        const task = this.inbox.find(t => t.id === taskId);
        if (!task) return;

        const oldUserId = task.userId;
        const thread = this.threads[task.threadId];

        // Update Inbox Item
        task.userId = newUserId;

        // Update Thread Participants
        const participant = thread.participants.find(p => p.userId === oldUserId);
        if (participant) {
            participant.userId = newUserId;
        }

        // Add System Event
        // Check if user still exists in our mock data map to avoid crash if totally removed (unlikely in this flow)
        const oldName = this.users[oldUserId] ? this.users[oldUserId].name : 'Former User';
        const newName = this.users[newUserId].name;
        thread.events.push({ type: 'system', text: `${oldName} offboarded by Admin`, time: "Just now" });
        thread.events.push({ type: 'system', text: `Task reassigned to ${newName}`, time: "Just now" });

        this.notify();
    },

    nudge(threadId, targetUserId) {
        const thread = this.threads[threadId];
        const target = this.users[targetUserId];
        const sender = this.users[this.currentUser];
        if (!thread || !target) return;

        thread.events.push({
            type: 'system',
            text: `${target.name} was nudged by ${sender.name}`,
            time: "Just now"
        });

        this.notify();
    },

    leaveThread(threadId, userId) {
        const thread = this.threads[threadId];
        if (!thread) return;

        // Remove from participants
        thread.participants = thread.participants.filter(p => p.userId !== userId);

        // Add System Event
        const user = this.users[userId];
        thread.events.push({
            type: 'system',
            text: `${user?.name || userId} left the thread`,
            time: "Just now"
        });

        // Loop through inbox tasks for this thread and user and remove them?
        // For prototype simplicity, maybe just leave them or mark as cancelled? 
        // Let's filter them out to be clean.
        this.inbox = this.inbox.filter(item => !(item.threadId === threadId && item.userId === userId));

        this.notify();
    },

    toggleChat(threadId, enabled) {
        const thread = this.threads[threadId];
        if (!thread) return;

        thread.enableChat = enabled;
        thread.events.push({
            type: 'system',
            text: `Comments turned ${enabled ? 'on' : 'off'}`,
            time: "Just now"
        });

        this.notify();
    }
};

window.App.utils = {
    classNames: (...classes) => classes.filter(Boolean).join(' '),
    getUserDisplay: (userId) => {
        const state = window.App.state;
        const user = state.users[userId];
        if (!user) return { name: 'Unknown', subtitle: '' };

        const context = state.currentWorkspace === 'company_a' ? user.company_a :
            state.currentWorkspace === 'company_b' ? user.company_b :
                user.personal;

        // Fallback if user doesn't have data for this workspace context
        if (!context) {
            return {
                name: user.name,
                subtitle: 'External User',
                avatar: user.avatar,
                isCompany: state.currentWorkspace !== 'personal'
            };
        }

        return {
            name: user.name,
            subtitle: context.title || context.label,
            avatar: user.avatar,
            isCompany: state.currentWorkspace !== 'personal'
        };
    }
};
