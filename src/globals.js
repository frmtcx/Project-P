// Initialize global namespace
window.App = {};

// Simple state management
window.App.state = {
    currentWorkspace: 'company_a', // 'company_a' | 'personal' | 'company_b'
    listeners: [],
    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    },
    setWorkspace(workspace) {
        this.currentWorkspace = workspace;
        this.listeners.forEach(l => l());
    },
    // Mock data for users to demonstrate identity masking
    users: {
        alice: {
            name: "Alice Richardson",
            company_a: { title: "Engineering Manager", label: "Company A" },
            personal: { title: null, label: "Privy User" }
        },
        bob: {
            name: "Bob Smith",
            company_a: { title: "Legal Counsel", label: "Company A" },
            personal: { title: null, label: "Privy User" }
        },
        sarah: {
            name: "Sarah Jenkins",
            company_a: { title: "Product Manager", label: "Company A" },
            personal: { title: null, label: "Privy User" }
        }
    }
};

window.App.utils = {
    classNames: (...classes) => classes.filter(Boolean).join(' '),
    // Helper to get display info based on current workspace
    getUserDisplay: (userId) => {
        const state = window.App.state;
        const user = state.users[userId];
        if (!user) return { name: 'Unknown', subtitle: '' };

        const context = state.currentWorkspace === 'company_a' ? user.company_a : user.personal;
        return {
            name: user.name,
            subtitle: context.title || context.label,
            isCompany: state.currentWorkspace === 'company_a'
        };
    }
};
