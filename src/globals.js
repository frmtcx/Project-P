// Initialize global namespace
window.App = {};

// Expose React and Router primitives for easier access if needed, 
// though files can also destructure them from window.React etc.
window.App.utils = {
    classNames: (...classes) => classes.filter(Boolean).join(' ')
};
