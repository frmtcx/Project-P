const { useNavigate } = ReactRouterDOM;
const { StatusBar } = window.App;
const { useState, useEffect } = React;

window.App.ProfilePreview = () => {
    const navigate = useNavigate();
    const [workspace, setWorkspace] = useState(window.App.state.currentWorkspace);

    // Mock user being viewed
    const user = {
        name: "Sarah Jenkins",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMdePd5DX-qMRDtoSEk0ZyMn61vtWyg7QkKAxOCUkzwSTEKJtODOq_92-k8i7_xhxL9prFNNz7a2GpMLU7C9PfO51kK4_REPs-oY6D22t44q0_mJwTk_ryXSVrYI93c29aZZA2Bc8oLu5JE_R6QDY0bAuwuitz9lVciwk0bN4K47GZp4KHufh3Q0n9BJ7dFCGb-bGnR8aMLHYpBO-HbMfDEYEHHHp0VX3c1yXdtioA59AZ6x_2e6fUl0STElWLZOiR7xv7Q7DZpIM"
    };

    const isCompany = workspace === 'company_a';
    const displayTitle = isCompany ? "Product Manager" : "Privy User";
    const displayLabel = isCompany ? "Company A" : "Neutral Identity";

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col">
            <StatusBar />
            <header className="px-4 py-3 flex items-center justify-between sticky top-0 z-40">
                <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"><span className="material-icons-round">arrow_back</span></button>
                <span className="font-bold">Profile</span>
                <div className="w-8"></div>
            </header>
            <main className="flex-1 px-4 py-6 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full p-1 bg-surface-light shadow-card mb-4">
                    <img src={user.avatar} className="w-full h-full rounded-full object-cover" />
                </div>
                <h1 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mb-1">{user.name}</h1>

                {/* Identity Context Badge */}
                <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-6 ${isCompany ? 'bg-red-100 text-primary' : 'bg-gray-100 text-gray-600'}`}>
                    {displayLabel}
                </div>

                <div className="w-full bg-surface-light dark:bg-surface-dark rounded-2xl shadow-card divide-y divide-border-light dark:divide-border-dark">
                    <div className="p-4 flex items-center justify-between">
                        <span className="text-sm text-text-secondary-light">Role/Title</span>
                        <span className="text-sm font-medium">{displayTitle}</span>
                    </div>
                    {isCompany && (
                        <div className="p-4 flex items-center justify-between">
                            <span className="text-sm text-text-secondary-light">Department</span>
                            <span className="text-sm font-medium">Product</span>
                        </div>
                    )}
                    <div className="p-4 flex items-center justify-between">
                        <span className="text-sm text-text-secondary-light">Status</span>
                        <span className="text-sm font-medium text-green-600">Active</span>
                    </div>
                </div>

                {!isCompany && (
                    <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex gap-3">
                        <span className="material-icons-round text-blue-500">visibility_off</span>
                        <p className="text-xs text-blue-800 dark:text-blue-200">
                            You are viewing this profile from a <strong>Personal Workspace</strong>. Company details are hidden to prevent data leakage.
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
};
