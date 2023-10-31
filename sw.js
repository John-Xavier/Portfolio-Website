self.addEventListener("install", e => {
    console.log("Installed!");
    e.waitUntil(
        caches.open("static").then(cache => {
            return cache.addAll([
                "./style.css",
                "./",
                "./Images/logo-white.svg",
                "./Images/logo-white.png",
                "./Images/logo.svg",
                "./Images/academic_history_red_bw.webp",
                "./Images/xcode.png",
                "./Images/studio.png",
                "./Images/vscode.png",
                "./Images/intellij.png",
                "./Images/github.png",
                "./Images/photoshop.png",
                "./Images/xd.png",
                "./Images/Joji.jpg",
                "./Images/Luby.jpg",
                "./Images/Agnel.jpg",
                "./Images/Lallu.jpg",
                "./Images/home_page_red_bw.webp",
                "./Images/about_me_red_bw.webp",
                "./Images/contact_me_red_bw.webp",
                "./main.js",
                "./js/splashAnimation.js",
                "./js/CurrencyConverter.js",
                "./js/forecaster.js",
                "./js/carousel.js",
                "./js/ContactForm.js",
                "./index.html",
                "./ProffessionalHistory.html",
                "./AcademicHistory.html",
                "./skills.html",
                "./CurrencyConverter.html",
                "./PriceForcaster.html",
                "./Testimonials.html",
                "./contact.html",
            ])
        })
    );
})

self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(response => {
            console.log("loading:", e.request);
            return response || fetch(e.request);
        })
    );
})