// Initialize global namespace
window.App = window.App || {};

// Robust State Management for PrivyChat Prototype
window.App.state = {
    // 1. Session State
    currentWorkspace: 'company_a', // 'company_a' | 'personal' | 'company_b'
    currentUser: 'frans', // The logged-in user

    // 2. Data Models
    users: {
        frans: {
            id: 'frans',
            name: "Frans",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Frans",
            company_a: { title: "Product Manager", label: "Company A", role: "admin" },
            company_b: { title: "Consultant", label: "Company B", role: "member" },
            personal: { title: null, label: "Privy User", role: "owner" }
        },
        alice: {
            id: 'alice',
            name: "Alice Richardson",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
            company_a: { title: "Engineering Manager", label: "Company A", role: "member" },
            company_b: { title: null, label: "Company B", role: "none" },
            personal: { title: null, label: "Privy User", role: "owner" }
        },
        bob: {
            id: 'bob',
            name: "Bob Smith",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
            company_a: { title: "Legal Counsel", label: "Company A", role: "member" },
            personal: { title: null, label: "Privy User", role: "owner" }
        },
        charlie: {
            id: 'charlie',
            name: "Charlie Workman",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie",
            company_a: { title: "Senior Engineer", label: "Company A", role: "member" },
            personal: { title: null, label: "Privy User", role: "owner" }
        },
        sarah: {
            id: 'sarah',
            name: "Sarah Jenkins",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
            company_a: { title: "Former Member", label: "Deactivated Account", role: "none", status: 'deactivated' }, // Deactivated
            personal: { title: null, label: "Privy User", role: "owner" }
        }
    },

    workspaces: {
        company_a: { id: 'company_a', name: "Company A", type: "business", members: ['frans', 'alice', 'bob', 'charlie'] }, // Sarah removed
        company_b: { id: 'company_b', name: "Company B", type: "business", members: ['frans'] },
        personal: { id: 'personal', name: "Personal", type: "personal", members: ['frans'] }
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
        // Company A: Active Thread
        'thread_1': {
            id: 'thread_1',
            docId: 'doc_1',
            title: "Employment Contract v3",
            workspaceId: 'company_a',
            status: 'in_review',
            participants: [
                { userId: 'frans', role: 'viewer' },
                { userId: 'bob', role: 'reviewer', status: 'pending' },
                { userId: 'alice', role: 'signer', status: 'waiting' }
            ],
            events: [
                { type: 'system', text: "Signing request created by Frans", time: "10:00 AM" },
                { type: 'system', text: "Participants added: Alice (Signer), Bob (Reviewer)", time: "10:00 AM" },
                { type: 'message', userId: 'frans', text: "Hi Bob, can you please review the indemnity clause?", time: "10:05 AM", reactions: { '👍': 1 } },
                { type: 'message', userId: 'bob', text: "Sure Frans, taking a look now.", time: "10:15 AM", replyTo: "Hi Bob, can you please review the indemnity clause?" }
            ],
            messages: []
        },
        // Personal: Old Thread
        'thread_3': {
            id: 'thread_3',
            docId: 'doc_5',
            title: "House Rental Agreement",
            workspaceId: 'personal',
            status: 'completed',
            participants: [
                { userId: 'frans', role: 'signer', status: 'completed' }
            ],
            events: [
                { type: 'system', text: "Document signed successfully", time: "2 weeks ago" }
            ],
            messages: []
        },
        // Company A: Deactivated User History
        'thread_2': {
            id: 'thread_2',
            docId: 'doc_3',
            title: "NDA External Vendor",
            workspaceId: 'company_a',
            status: 'completed',
            participants: [
                { userId: 'frans', role: 'viewer' },
                { userId: 'sarah', role: 'signer', status: 'completed' }
            ],
            events: [
                { type: 'message', userId: 'sarah', text: "I've reviewed the terms, they look standard.", time: "3 days ago" },
                { type: 'message', userId: 'frans', text: "Thanks Sarah!", time: "3 days ago" },
                { type: 'system', text: "Sarah Jenkins offboarded from workspace", time: "Yesterday" },
                { type: 'system', text: "Access revoked for Sarah Jenkins", time: "Yesterday" }
            ],
            messages: []
        }
    },

    // Inbox: Derived from threads, but stored for easy access in prototype
    inbox: [
        { id: 'task_1', threadId: 'thread_1', userId: 'bob', type: 'to_review', status: 'pending', title: "Review: Employment Contract v3", time: "10:00 AM" }
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
        const oldName = this.users[oldUserId].name;
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

        // If viewing in a workspace where the user is NOT a member (and it's not personal), show neutral
        // But for this prototype, we assume if you can see them, you see their context-appropriate label
        return {
            name: user.name,
            subtitle: context.title || context.label,
            avatar: user.avatar,
            isCompany: state.currentWorkspace !== 'personal'
        };
    }
};
