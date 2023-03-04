if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
    navigator.serviceWorker.register('/boristestov.github.io/service_worker.js', {scope: '/boristestov.github.io/'});
    });
}