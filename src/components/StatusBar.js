window.App.StatusBar = ({ time = "21.16", theme = "dark" }) => {
    // theme: 'dark' (default, dark text for light bg) | 'light' (white text for dark bg)
    const textColor = theme === 'light' ? 'text-white' : 'text-gray-900';

    return (
        <div className={`flex justify-between items-center px-6 pt-3 pb-2 text-sm font-semibold tracking-wide bg-transparent absolute top-0 left-0 right-0 z-[100] ${textColor}`}>
            <div className="flex items-center gap-1 pl-2">
                <span>{time}</span>
            </div>
            <div className="flex items-center gap-1.5 pr-2">
                <span className="material-icons-round text-[16px]">signal_cellular_alt</span>
                <span className="material-icons-round text-[16px]">wifi</span>
                <div className="relative">
                    <span className="material-icons-round text-[22px] rotate-90">battery_full</span>
                </div>
            </div>
        </div>
    );
};
