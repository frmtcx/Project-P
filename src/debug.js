// Debug script to catch errors and display them on screen
window.onerror = function (msg, url, lineNo, columnNo, error) {
    const errorContainer = document.getElementById('root') || document.body;
    errorContainer.innerHTML = `
        <div style="padding: 20px; color: red; font-family: monospace; background: #fff;">
            <h3>Application Error</h3>
            <p><strong>Message:</strong> ${msg}</p>
            <p><strong>File:</strong> ${url}:${lineNo}:${columnNo}</p>
            <pre>${error ? error.stack : ''}</pre>
        </div>
    ` + errorContainer.innerHTML;
    return false;
};

window.addEventListener('unhandledrejection', function (event) {
    const errorContainer = document.getElementById('root') || document.body;
    errorContainer.innerHTML = `
        <div style="padding: 20px; color: red; font-family: monospace; background: #fff;">
            <h3>Unhandled Promise Rejection</h3>
            <p><strong>Reason:</strong> ${event.reason}</p>
        </div>
    ` + errorContainer.innerHTML;
});
