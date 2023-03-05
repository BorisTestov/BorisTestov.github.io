async function start() {
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
		// Check if periodicSync is supported
	  	if ('periodicSync' in registration) {
	    	// Request permission
	    	const status = await navigator.permissions.query({
	      		name: 'periodic-background-sync',
	    	});
	    	if (status.state === 'granted') {
	      		try {
	        		// Register new sync every 24 hours
	        		await registration.periodicSync.register('data-sync', {
	          			minInterval: 24 * 60 * 60 * 1000, // 1 day
	        		});
	        		console.log('Periodic background sync registered!');
	      		} catch(e) {
	        		console.error(`Periodic background sync failed:\n${e}`);
	      		}
	    	}
	  	}
	} else {
	    console.error("Service workers are not supported.");
	}
}

start();
