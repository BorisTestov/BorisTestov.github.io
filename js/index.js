if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
    navigator.serviceWorker.register('/js/service_worker.js', {scope: '/'});
    });
}