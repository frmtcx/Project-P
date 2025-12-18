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
                {/* Logo Icon - Approximation of Privy Heart */}
                <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white drop-shadow-md">
                    {/* Left Teardrop (Darker) */}
                    <path d="M50 85 C20 85 5 55 5 35 C5 15 20 5 35 5 C50 5 50 25 50 35 C50 25 50 5 65 5 C80 5 95 15 95 35 C95 55 80 85 50 85 Z" fill="white" />
                </svg>

                {/* Text Logo */}
                <h1 className="text-5xl font-bold text-white tracking-tight drop-shadow-md pb-2" style={{ fontFamily: 'Inter, sans-serif' }}>privy</h1>
            </div>
        </div>
    );
};
