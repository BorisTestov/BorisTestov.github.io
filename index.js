async function sw_register() {
	if ("serviceWorker" in navigator) {
	    // Register a service worker hosted at the root of the
	    // site using the default scope.
	    navigator.serviceWorker.register("/service_worker.js").then(
	        (registration) => {
	            console.log("Service worker registration succeeded:", registration);
	        },
	        (error) => {
	            console.error(`Service worker registration failed: ${error}`);
	        }
	    );
	} else {
	    console.error("Service workers are not supported.");
	}
}

async function start() {
	sw_register();
}

start();
