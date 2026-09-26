document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       YEAR
    ===================================================== */

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* =====================================================
       HEADER
    ===================================================== */

    const header = document.querySelector(".site-header");

    function updateHeader() {
        if (!header) return;

        if (window.scrollY > 24) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    updateHeader();

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });


    /* =====================================================
       MOBILE NAVBAR
    ===================================================== */

    const navToggle =
        document.querySelector(".nav-toggle");

    const navLinks =
        document.querySelector(".nav-links");


    function closeMenu() {

        if (!navToggle || !navLinks) return;

        navToggle.classList.remove("active");

        navLinks.classList.remove("open");

        navToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        navToggle.setAttribute(
            "aria-label",
            "Open menu"
        );

        document.body.classList.remove(
            "menu-open"
        );
    }


    function openMenu() {

        if (!navToggle || !navLinks) return;

        navToggle.classList.add("active");

        navLinks.classList.add("open");

        navToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        navToggle.setAttribute(
            "aria-label",
            "Close menu"
        );

        document.body.classList.add(
            "menu-open"
        );
    }


    if (navToggle && navLinks) {

        navToggle.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                if (
                    navLinks.classList.contains("open")
                ) {
                    closeMenu();
                } else {
                    openMenu();
                }

            }
        );


        navLinks
            .querySelectorAll("a")
            .forEach(function (link) {

                link.addEventListener(
                    "click",
                    function () {
                        closeMenu();
                    }
                );

            });


        document.addEventListener(
            "click",
            function (event) {

                if (
                    navLinks.classList.contains("open") &&
                    !navLinks.contains(event.target) &&
                    !navToggle.contains(event.target)
                ) {
                    closeMenu();
                }

            }
        );


        document.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Escape") {
                    closeMenu();
                }

            }
        );

    }


    /* =====================================================
       RESIZE
    ===================================================== */

    window.addEventListener(
        "resize",
        function () {

            if (window.innerWidth > 800) {
                closeMenu();
            }

        },
        {
            passive: true
        }
    );


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    const targetId =
                        link.getAttribute("href");

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }

                    const target =
                        document.querySelector(targetId);

                    if (!target) return;

                    event.preventDefault();

                    const headerHeight =
                        header
                            ? header.offsetHeight
                            : 0;

                    const position =
                        target.getBoundingClientRect().top +
                        window.scrollY -
                        headerHeight;

                    window.scrollTo({
                        top: position,
                        behavior: "smooth"
                    });

                }
            );

        });


    /* =====================================================
       HERO PARALLAX
    ===================================================== */

    const hero =
        document.querySelector(".hero");

    const heroBg =
        document.querySelector(".hero-bg");


    if (
        hero &&
        heroBg &&
        !window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        hero.addEventListener(
            "pointermove",
            function (event) {

                if (window.innerWidth < 900) {
                    return;
                }

                const rect =
                    hero.getBoundingClientRect();

                const x =
                    (
                        (event.clientX - rect.left) /
                        rect.width -
                        0.5
                    ) * 8;

                const y =
                    (
                        (event.clientY - rect.top) /
                        rect.height -
                        0.5
                    ) * 5;

                heroBg.style.transform =
                    "scale(1.055) translate3d(" +
                    x +
                    "px, " +
                    y +
                    "px, 0)";

            }
        );


        hero.addEventListener(
            "pointerleave",
            function () {

                heroBg.style.transform =
                    "scale(1.035)";

            }
        );

    }


    /* =====================================================
       REVEAL ANIMATION
    ===================================================== */

    const revealItems =
        document.querySelectorAll(
            ".room-card, " +
            ".hostel-card, " +
            ".event-card, " +
            ".owner-content, " +
            ".memory-copy, " +
            ".philosophy-grid > div"
        );


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                function (entries, obs) {

                    entries.forEach(
                        function (entry) {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }

                            entry.target.classList.add(
                                "is-visible"
                            );

                            obs.unobserve(
                                entry.target
                            );

                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );


        revealItems.forEach(
            function (item) {
                observer.observe(item);
            }
        );

    }


    /* =====================================================
       MOMENTS GALLERY
    ===================================================== */

    const galleryTrack =
        document.getElementById(
            "memoryGallery"
        );

    const galleryWindow =
        document.querySelector(
            ".gallery-window"
        );


    if (!galleryTrack) {
        return;
    }


    /* =====================================================
       GALLERY IMAGE FILES
    ===================================================== */

    const galleryImages = [

        "WhatsApp Image 2026-09-26 at 4.36.49 PM.jpeg",

        "WhatsApp Image 2026-09-26 at 4.36.50 PM (1).jpeg",

        "WhatsApp Image 2026-09-26 at 4.36.50 PM (2).jpeg",

        "WhatsApp Image 2026-09-26 at 4.36.50 PM.jpeg",

        "WhatsApp Image 2026-09-26 at 4.36.51 PM (1).jpeg",

        "WhatsApp Image 2026-09-26 at 4.36.51 PM (2).jpeg",

        "WhatsApp Image 2026-09-26 at 4.36.51 PM.jpeg",

        "WhatsApp Image 2026-09-26 at 4.36.52 PM (1).jpeg",

        "WhatsApp Image 2026-09-26 at 4.36.52 PM (2).jpeg",

        "WhatsApp Image 2026-09-26 at 4.36.52 PM.jpeg",

        "WhatsApp Image 2026-09-26 at 4.36.56 PM (1).jpeg",

        "WhatsApp Image 2026-09-26 at 4.36.56 PM (2).jpeg",

        "WhatsApp Image 2026-09-26 at 4.36.56 PM.jpeg",

        "WhatsApp Image 2026-09-26 at 4.36.57 PM.jpeg",

        "WhatsApp Image 2026-09-26 at 4.36.58 PM.jpeg",

        "b51d30b1-b2b0-4170-9810-ba2b747b9e54.jpg"

    ];


    /* =====================================================
       CREATE IMAGE
    ===================================================== */

    function createGalleryItem(filename) {

        const figure =
            document.createElement("figure");

        figure.className =
            "gallery-item";


        const image =
            document.createElement("img");

        image.src =
            "memory-photos/" +
            encodeURIComponent(filename);

        image.alt =
            "Life at Memory";

        image.loading =
            "lazy";

        image.decoding =
            "async";


        figure.appendChild(image);

        return figure;
    }


    /* =====================================================
       BUILD GALLERY
    ===================================================== */

    galleryTrack.innerHTML = "";


    galleryImages.forEach(
        function (filename) {

            galleryTrack.appendChild(
                createGalleryItem(filename)
            );

        }
    );


    /* =====================================================
       DUPLICATE GALLERY
    ===================================================== */

    const originalItems =
        Array.from(
            galleryTrack.children
        );


    originalItems.forEach(
        function (item) {

            const clone =
                item.cloneNode(true);

            galleryTrack.appendChild(
                clone
            );

        }
    );


    /* =====================================================
       AUTO SCROLL
    ===================================================== */

    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {
        return;
    }


    let position = 0;

    let lastTime =
        performance.now();

    let paused = false;


    if (galleryWindow) {

        galleryWindow.addEventListener(
            "mouseenter",
            function () {
                paused = true;
            }
        );


        galleryWindow.addEventListener(
            "mouseleave",
            function () {
                paused = false;
                lastTime = performance.now();
            }
        );


        galleryWindow.addEventListener(
            "touchstart",
            function () {
                paused = true;
            },
            {
                passive: true
            }
        );


        galleryWindow.addEventListener(
            "touchend",
            function () {

                setTimeout(
                    function () {

                        paused = false;

                        lastTime =
                            performance.now();

                    },
                    900
                );

            },
            {
                passive: true
            }
        );

    }


    function getLoopWidth() {

        const items =
            Array.from(
                galleryTrack.children
            );

        const half =
            Math.floor(
                items.length / 2
            );

        const gap =
            parseFloat(
                getComputedStyle(
                    galleryTrack
                ).gap
            ) || 0;


        let width = 0;


        for (
            let i = 0;
            i < half;
            i++
        ) {

            width +=
                items[i].getBoundingClientRect().width;

        }


        width +=
            Math.max(
                0,
                half - 1
            ) * gap;


        return width;
    }


    function animate(currentTime) {

        const delta =
            Math.min(
                currentTime - lastTime,
                40
            );

        lastTime =
            currentTime;


        if (!paused) {

            const speed =
                window.innerWidth <= 800
                    ? 0.025
                    : 0.035;


            position +=
                delta * speed;


            const loopWidth =
                getLoopWidth();


            if (
                loopWidth > 0 &&
                position >= loopWidth
            ) {

                position -=
                    loopWidth;

            }


            galleryTrack.style.transform =
                "translate3d(" +
                (-position) +
                "px, 0, 0)";

        }


        requestAnimationFrame(
            animate
        );

    }


    requestAnimationFrame(
        animate
    );


    /* =====================================================
       IMAGE ERROR DEBUGGING
    ===================================================== */

    galleryTrack
        .querySelectorAll("img")
        .forEach(
            function (image) {

                image.addEventListener(
                    "error",
                    function () {

                        console.warn(
                            "Memory gallery image not found:",
                            image.src
                        );

                    }
                );

            }
        );

});
