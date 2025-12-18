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
                {/* Logo Icon - Use uploaded asset for correct shape */}
                <img src="/assets/privy_logo_icon.png" alt="Privy" className="w-[60px] h-[60px] drop-shadow-md pb-2" />

                {/* Text Logo */}
                <h1 className="text-5xl font-bold text-white tracking-tight drop-shadow-md pb-2" style={{ fontFamily: 'Inter, sans-serif' }}>privy</h1>
            </div>
        </div>
    );
};
