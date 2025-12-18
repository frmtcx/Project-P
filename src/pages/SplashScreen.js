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
        <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center animate-fade-out pointer-events-none">
            <h1 className="text-6xl font-black text-primary tracking-tighter" style={{ fontFamily: 'Inter, sans-serif' }}>Privy</h1>
        </div>
    );
};
