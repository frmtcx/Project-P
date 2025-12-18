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
            type: 'document', // 'document' | 'discussion'
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
                { type: 'message', userId: 'bob', text: "Sure Frans, taking a look now.", time: "10:15 AM", replyTo: "Hi Bob, can you please review the indemnity clause?" }
            ],
            messages: [],
            lastActivity: "10:15 AM"
        },

        // 2. [Normal Chat] General Discussion
        'thread_2': {
            id: 'thread_2',
            type: 'discussion',
            title: "Team Lunch Planning",
            workspaceId: 'company_a',
            status: 'active',
            participants: [
                { userId: 'frans', role: 'member' },
                { userId: 'bob', role: 'member' },
                { userId: 'charlie', role: 'member' }
            ],
            events: [
                { type: 'message', userId: 'charlie', text: "Are we going to that taco place?", time: "11:30 AM" },
                { type: 'message', userId: 'frans', text: "Yes, leaving in 5!", time: "11:32 AM" }
            ],
            messages: [],
            lastActivity: "11:32 AM"
        },

        // 3. [Doc Chat] Completed with Deactivated User
        'thread_3': {
            id: 'thread_3',
            docId: 'doc_3',
            type: 'document',
            title: "NDA External Vendor",
            workspaceId: 'company_a',
            status: 'completed',
            participants: [
                { userId: 'frans', role: 'viewer' },
                { userId: 'sarah', role: 'signer', status: 'completed' } // Sarah is deactivated
            ],
            events: [
                { type: 'message', userId: 'sarah', text: "I've reviewed the terms, they look standard.", time: "3 days ago" },
                { type: 'system', text: "Sarah Jenkins offboarded from workspace", time: "Yesterday" }
            ],
            messages: [],
            lastActivity: "Yesterday"
        },

        // NEW: [Normal Chat] Company A Announcement
        'thread_a_general': {
            id: 'thread_a_general',
            type: 'discussion',
            title: "General Announcements",
            workspaceId: 'company_a',
            status: 'active',
            participants: [
                { userId: 'frans', role: 'member' },
                { userId: 'alice', role: 'member' },
                { userId: 'bob', role: 'member' },
                { userId: 'charlie', role: 'member' }
            ],
            events: [
                { type: 'message', userId: 'alice', text: "Welcome to the team everyone!", time: "Last Week" }
            ],
            messages: [],
            lastActivity: "Last Week"
        },

        // NEW: [Reassigned Task] Legacy Audit
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

        // 4. [Doc Chat] Active
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

        // 5. [Normal Chat] Design Sync
        'thread_5': {
            id: 'thread_5',
            type: 'discussion',
            title: "Design Handoff",
            workspaceId: 'company_b',
            status: 'active',
            participants: [
                { userId: 'frans', role: 'member' },
                { userId: 'eve', role: 'member' }
            ],
            events: [
                { type: 'message', userId: 'eve', text: "I've uploaded the new assets.", time: "2 hours ago" }
            ],
            messages: [],
            lastActivity: "2 hours ago"
        },

        // NEW: [Normal Chat] Company B Coffee
        'thread_b_coffee': {
            id: 'thread_b_coffee',
            type: 'discussion',
            title: "Coffee Break ☕️",
            workspaceId: 'company_b',
            status: 'active',
            participants: [
                { userId: 'frans', role: 'member' },
                { userId: 'dave', role: 'member' },
                { userId: 'eve', role: 'member' }
            ],
            events: [
                { type: 'message', userId: 'dave', text: "Anyone up for a latte?", time: "10:00 AM" }
            ],
            messages: [],
            lastActivity: "10:00 AM"
        },

        // NEW: [Doc Chat] Company B Review
        'thread_b_review': {
            id: 'thread_b_review',
            docId: 'doc_6',
            type: 'document',
            title: "Consulting Invoice Dec",
            workspaceId: 'company_b',
            status: 'in_review',
            participants: [
                { userId: 'frans', role: 'reviewer', status: 'pending' },
                { userId: 'dave', role: 'viewer' }
            ],
            events: [
                { type: 'message', userId: 'dave', text: "Please review the hours for December.", time: "5 hours ago" }
            ],
            messages: [],
            lastActivity: "5 hours ago"
        },

        // --- PERSONAL THREADS ---

        // 6. [Normal Chat] Family Group
        'thread_6': {
            id: 'thread_6',
            type: 'discussion',
            title: "Family Group",
            workspaceId: 'personal',
            status: 'active',
            participants: [
                { userId: 'frans', role: 'member' },
                { userId: 'mom', role: 'member' }
            ],
            events: [
                { type: 'message', userId: 'mom', text: "Don't forget dinner tonight!", time: "9:00 AM" }
            ],
            messages: [],
            lastActivity: "9:00 AM"
        },

        // 7. [Doc Chat] Old Rental
        'thread_7': {
            id: 'thread_7',
            docId: 'doc_5',
            type: 'document',
            title: "House Rental Agreement",
            workspaceId: 'personal',
            status: 'completed',
            participants: [
                { userId: 'frans', role: 'signer', status: 'completed' },
                { userId: 'mom', role: 'viewer', status: 'completed' }
            ],
            events: [
                { type: 'system', text: "Document signed successfully", time: "2 weeks ago" }
            ],
            messages: [],
            lastActivity: "2 weeks ago"
        },

        // NEW: [Doc Chat] Personal Lease Renewal
        'thread_personal_sign': {
            id: 'thread_personal_sign',
            docId: 'doc_5', // Reusing doc just for demo
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
        { id: 'task_1', threadId: 'thread_1', userId: 'bob', type: 'to_review', status: 'pending', title: "Review: Employment Contract v3", time: "10:00 AM" },
        { id: 'task_2', threadId: 'thread_1', userId: 'alice', type: 'to_sign', status: 'pending', title: "Sign: Employment Contract v3", time: "10:00 AM" },
        { id: 'task_3', threadId: 'thread_4', userId: 'dave', type: 'to_sign', status: 'pending', title: "Sign: Project Proposal", time: "1 day ago" },
        // NEW Inbox Items
        { id: 'task_reassigned', threadId: 'thread_reassigned', userId: 'frans', type: 'to_review', status: 'pending', title: "Review: Q4 Financial Report", time: "Yesterday" },
        { id: 'task_b_review', threadId: 'thread_b_review', userId: 'frans', type: 'to_review', status: 'pending', title: "Review: Consulting Invoice Dec", time: "5 hours ago" },
        { id: 'task_personal_sign', threadId: 'thread_personal_sign', userId: 'frans', type: 'to_sign', status: 'pending', title: "Sign: Lease Renewal 2025", time: "1 hour ago" },
        { id: 'task_b_review', threadId: 'thread_b_review', userId: 'frans', type: 'to_review', status: 'pending', title: "Review: Consulting Invoice Dec", time: "5 hours ago" },
        { id: 'task_personal_sign', threadId: 'thread_personal_sign', userId: 'frans', type: 'to_sign', status: 'pending', title: "Sign: Lease Renewal 2025", time: "1 hour ago" },

        // MENTIONS
        {
            id: 'mention_1',
            threadId: 'thread_5',
            userId: 'frans',
            type: 'mention',
            status: 'pending',
            title: "Design Handoff",
            text: "@Frans I've uploaded the new assets. Please check specifically the 'Mobile_Home_v2' artboards.",
            time: "2 hours ago"
        },
        {
            id: 'mention_2',
            threadId: 'thread_2',
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
