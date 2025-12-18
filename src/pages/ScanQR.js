window.App.ScanQR = () => {
    const { useNavigate } = ReactRouterDOM;

    return (
        <div className="absolute inset-0 bg-black text-white z-50 flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center px-4 pt-12 pb-4 bg-black/50 backdrop-blur-sm absolute top-0 left-0 right-0 z-10">
                <button onClick={() => window.history.back()} className="p-2">
                    <span className="material-icons-round text-2xl">close</span>
                </button>
                <h1 className="text-lg font-medium">Scan QR</h1>
                <div className="w-10"></div> {/* Spacer for centering */}
            </div>

            {/* Camera View (Mock) */}
            <div className="flex-1 relative bg-gray-900 overflow-hidden">
                {/* Mock Camera Feed Background */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 opacity-50"></div>

                {/* Flashlight Toggle */}
                <button className="absolute top-20 left-6 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center z-20">
                    <span className="material-icons-round text-xl">flash_off</span>
                </button>

                {/* Grid Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-64 bg-gradient-to-b from-red-500/20 to-transparent relative">
                        {/* Grid Pattern */}
                        <div className="absolute inset-0" style={{
                            backgroundImage: 'linear-gradient(to right, rgba(255, 0, 0, 0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 0, 0, 0.3) 1px, transparent 1px)',
                            backgroundSize: '20px 20px'
                        }}></div>
                        {/* Scanning Line Animation */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.8)] animate-scan"></div>
                    </div>
                </div>
            </div>

            {/* Footer Info */}
            <div className="bg-white text-gray-900 p-6 rounded-t-3xl absolute bottom-0 left-0 right-0">
                <div className="flex gap-3 items-start">
                    <span className="material-icons-round text-blue-500 mt-0.5">info</span>
                    <p className="text-sm text-gray-700 leading-relaxed">
                        Use this QR code scanner to scan any QR codes in the Privy web apps.
                    </p>
                </div>
            </div>

            <style>{`
                @keyframes scan {
                    0% { top: 0; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { top: 100%; opacity: 0; }
                }
                .animate-scan {
                    animation: scan 2s linear infinite;
                }
            `}</style>
        </div>
    );
};
