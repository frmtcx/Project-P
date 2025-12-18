window.App.SplashScreen = ({ onFinish }) => {
    const { useEffect, useState } = React;

    useEffect(() => {
        // Animation sequence
        const timer = setTimeout(() => {
            onFinish();
        }, 3500); // Show for 3.5s total (including fade out)

        return () => clearTimeout(timer);
    }, [onFinish]);

    return (
        <div className="fixed inset-0 z-[100] bg-primary flex flex-col items-center justify-center animate-fade-out pointer-events-none">
            <window.App.StatusBar theme="light" />

            <div className="flex items-center gap-3 animate-fade-in-up">
                {/* Logo Icon */}
                <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white drop-shadow-md">
                    <path d="M70 20C85 20 95 30 95 45C95 65 70 90 50 90C30 90 5 65 5 45C5 30 15 20 30 20H70Z" fill="white" fillOpacity="0.2" />
                    <path d="M50 90C30 90 5 65 5 45C5 30 15 20 30 20H45L80 55C90 65 85 80 70 85L50 90Z" fill="white" />
                    <path d="M50 90C70 90 95 65 95 45C95 30 85 20 70 20H55L20 55C10 65 15 80 30 85L50 90Z" fill="white" fillOpacity="0.9" />
                </svg>

                {/* Text Logo */}
                <h1 className="text-5xl font-bold text-white tracking-tight drop-shadow-md" style={{ fontFamily: 'Inter, sans-serif' }}>privy</h1>
            </div>
        </div>
    );
};
