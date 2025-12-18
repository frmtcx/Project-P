window.App.StatusBar = ({ time = "16:48" }) => (
    <div className="flex justify-between items-center px-6 pt-2 pb-2 text-sm font-medium bg-surface-light dark:bg-surface-dark sticky top-0 z-50 shrink-0">
        <div className="flex items-center gap-1">
            <span>{time}</span>
        </div>
        <div className="flex items-center gap-1.5">
            <span className="material-icons-round text-base">signal_cellular_alt</span>
            <span className="material-icons-round text-base">wifi</span>
            <span className="material-icons-round text-base rotate-90">battery_full</span>
        </div>
    </div>
);
