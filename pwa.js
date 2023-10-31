if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register("sw.js").then(registration => {
        console.log("Service worker registered");
    }).catch(error => {
        console.log("Service worker registeration failed!");
    })
}