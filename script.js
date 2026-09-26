/* =========================================================
   MEMORY GROUP — MAIN WEBSITE SCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. CURRENT YEAR
    ===================================================== */

    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    /* =====================================================
       2. NAVBAR
    ===================================================== */

    const header = document.querySelector(".site-header");
    const navToggle = document.querySelector(".nav-toggle");
    const navLinks = document.querySelector(".nav-links");


    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }


    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
    );


    /* =====================================================
       3. MOBILE MENU
    ===================================================== */

    function closeMobileMenu() {

        if (navToggle) {
            navToggle.classList.remove("active");

            navToggle.setAttribute(
                "aria-expanded",
                "false"
            );
        }

        if (navLinks) {
            navLinks.classList.remove("open");
        }

        document.body.classList.remove(
            "menu-open"
        );
    }


    if (navToggle && navLinks) {

        navToggle.addEventListener(
            "click",
            () => {

                const isOpen =
                    navLinks.classList.toggle(
                        "open"
                    );

                navToggle.classList.toggle(
                    "active",
                    isOpen
                );

                navToggle.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );

                document.body.classList.toggle(
                    "menu-open",
                    isOpen
                );
            }
        );


        /* Close menu after clicking a link */

        navLinks
            .querySelectorAll("a")
            .forEach((link) => {

                link.addEventListener(
                    "click",
                    () => {

                        closeMobileMenu();

                    }
                );

            });
    }


    /* Close menu when returning to desktop */

    window.addEventListener(
        "resize",
        () => {

            if (window.innerWidth > 800) {
                closeMobileMenu();
            }

        }
    );


    /* =====================================================
       4. SMOOTH SCROLL
    ===================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach((link) => {

            link.addEventListener(
                "click",
                (event) => {

                    const targetId =
                        link.getAttribute(
                            "href"
                        );

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    const headerHeight =
                        header
                            ? header.offsetHeight
                            : 0;


                    const targetPosition =
                        target.getBoundingClientRect()
                            .top
                        +
                        window.scrollY
                        -
                        headerHeight;


                    window.scrollTo({
                        top:
                            targetPosition,
                        behavior:
                            "smooth"
                    });

                }
            );

        });


    /* =====================================================
       5. KRISHNA HERO PARALLAX
    ===================================================== */

    const hero =
        document.querySelector(
            ".hero"
        );

    const heroBackground =
        document.querySelector(
            ".hero-bg"
        );


    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (
        hero &&
        heroBackground &&
        !reducedMotion
    ) {

        hero.addEventListener(
            "pointermove",
            (event) => {

                if (window.innerWidth < 900) {
                    return;
                }


                const rect =
                    hero.getBoundingClientRect();


                const mouseX =
                    (
                        event.clientX -
                        rect.left
                    ) /
                    rect.width -
                    0.5;


                const mouseY =
                    (
                        event.clientY -
                        rect.top
                    ) /
                    rect.height -
                    0.5;


                const moveX =
                    mouseX * 8;


                const moveY =
                    mouseY * 5;


                heroBackground.style.transform =
                    `scale(1.04) translate3d(${moveX}px, ${moveY}px, 0)`;
            }
        );


        hero.addEventListener(
            "pointerleave",
            () => {

                heroBackground.style.transform =
                    "scale(1.025) translate3d(0, 0, 0)";

            }
        );
    }


    /* =====================================================
       6. SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            `
            .room-card,
            .hostel-card,
            .event-card,
            .owner-content,
            .memory-copy,
            .philosophy-grid > div,
            .section-heading
            `
        );


    if (
        revealElements.length &&
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }


                            entry.target.classList.add(
                                "is-visible"
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(
            (element) => {

                revealObserver.observe(
                    element
                );

            }
        );

    } else {

        revealElements.forEach(
            (element) => {

                element.classList.add(
                    "is-visible"
                );

            }
        );

    }


    /* =====================================================
       7. LIFE AT MEMORY GALLERY
       
       Folder:
       /memory-photos/

       These are the exact images currently
       present in your GitHub repository.
    ===================================================== */

    const galleryTrack =
        document.getElementById(
            "memoryGallery"
        );


    if (galleryTrack) {


        /* -----------------------------------------------
           EXACT MEMORY PHOTO FILENAMES
        ------------------------------------------------ */

        const memoryPhotos = [

            "WhatsApp Image 2026-09-26 at 4.36.49 PM.jpeg",

            "WhatsApp Image 2026-09-26 at 4.36.50 PM.jpeg",
            "WhatsApp Image 2026-09-26 at 4.36.50 PM (1).jpeg",
            "WhatsApp Image 2026-09-26 at 4.36.50 PM (2).jpeg",

            "WhatsApp Image 2026-09-26 at 4.36.51 PM.jpeg",
            "WhatsApp Image 2026-09-26 at 4.36.51 PM (1).jpeg",
            "WhatsApp Image 2026-09-26 at 4.36.51 PM (2).jpeg",

            "WhatsApp Image 2026-09-26 at 4.36.52 PM.jpeg",
            "WhatsApp Image 2026-09-26 at 4.36.52 PM (1).jpeg",
            "WhatsApp Image 2026-09-26 at 4.36.52 PM (2).jpeg",

            "WhatsApp Image 2026-09-26 at 4.36.56 PM.jpeg",
            "WhatsApp Image 2026-09-26 at 4.36.56 PM (1).jpeg",
            "WhatsApp Image 2026-09-26 at 4.36.56 PM (2).jpeg",

            "WhatsApp Image 2026-09-26 at 4.36.57 PM.jpeg",

            "WhatsApp Image 2026-09-26 at 4.36.58 PM.jpeg",

            "b51d30b1-b2b0-4170-9810-ba2b747b9e54.jpg"

        ];


        /* -----------------------------------------------
           CREATE IMAGE ELEMENT
        ------------------------------------------------ */

        function createGalleryItem(
            fileName
        ) {

            const figure =
                document.createElement(
                    "figure"
                );


            figure.className =
                "gallery-item";


            const image =
                document.createElement(
                    "img"
                );


            /*
             * encodeURIComponent handles:
             * spaces
             * brackets
             * special characters
             */

            image.src =
                "./memory-photos/" +
                encodeURIComponent(
                    fileName
                );


            image.alt =
                "Life at Memory";


            image.loading =
                "lazy";


            image.decoding =
                "async";


            /*
             * If one image is missing,
             * hide only that image.
             */

            image.addEventListener(
                "error",
                () => {

                    figure.remove();

                }
            );


            figure.appendChild(
                image
            );


            return figure;
        }


        /* -----------------------------------------------
           CLEAR OLD CONTENT
        ------------------------------------------------ */

        galleryTrack.innerHTML = "";


        /* -----------------------------------------------
           ADD FIRST SET
        ------------------------------------------------ */

        memoryPhotos.forEach(
            (fileName) => {

                galleryTrack.appendChild(
                    createGalleryItem(
                        fileName
                    )
                );

            }
        );


        /* -----------------------------------------------
           ADD SECOND SET

           The second copy allows the gallery
           to loop infinitely.
        ------------------------------------------------ */

        memoryPhotos.forEach(
            (fileName) => {

                galleryTrack.appendChild(
                    createGalleryItem(
                        fileName
                    )
                );

            }
        );


        /* -----------------------------------------------
           GALLERY STATE
        ------------------------------------------------ */

        let galleryPosition = 0;

        let galleryPaused = false;

        let previousTime =
            performance.now();


        /* -----------------------------------------------
           GET ONE FULL SET WIDTH
        ------------------------------------------------ */

        function getGalleryLoopWidth() {

            const items =
                galleryTrack.querySelectorAll(
                    ".gallery-item"
                );


            if (!items.length) {
                return 0;
            }


            /*
             * We have two identical sets.
             * Half of all items = first set.
             */

            const half =
                Math.floor(
                    items.length / 2
                );


            let totalWidth = 0;


            for (
                let i = 0;
                i < half;
                i++
            ) {

                totalWidth +=
                    items[i]
                        .getBoundingClientRect()
                        .width;

            }


            const computedStyle =
                window.getComputedStyle(
                    galleryTrack
                );


            const gap =
                parseFloat(
                    computedStyle.gap ||
                    computedStyle.columnGap ||
                    "0"
                ) || 0;


            totalWidth +=
                gap *
                Math.max(
                    0,
                    half - 1
                );


            return totalWidth;
        }


        /* -----------------------------------------------
           AUTO SCROLL ANIMATION
        ------------------------------------------------ */

        function animateGallery(
            currentTime
        ) {

            const delta =
                Math.min(
                    currentTime -
                    previousTime,
                    40
                );


            previousTime =
                currentTime;


            if (!galleryPaused) {

                /*
                 * Gallery speed.
                 *
                 * Lower = slower
                 * Higher = faster
                 */

                galleryPosition +=
                    delta * 0.035;


                const loopWidth =
                    getGalleryLoopWidth();


                /*
                 * When first set finishes,
                 * jump back exactly one set.
                 *
                 * Because both sets are identical,
                 * the user sees a seamless loop.
                 */

                if (
                    loopWidth > 0 &&
                    galleryPosition >=
                        loopWidth
                ) {

                    galleryPosition -=
                        loopWidth;
                }


                galleryTrack.style.transform =
                    `translate3d(${-galleryPosition}px, 0, 0)`;

            }


            requestAnimationFrame(
                animateGallery
            );
        }


        /*
         * Start animation only when
         * reduced motion is not requested.
         */

        if (!reducedMotion) {

            requestAnimationFrame(
                animateGallery
            );

        }


        /* -----------------------------------------------
           PAUSE ON DESKTOP HOVER
        ------------------------------------------------ */

        galleryTrack.addEventListener(
            "mouseenter",
            () => {

                galleryPaused = true;

            }
        );


        galleryTrack.addEventListener(
            "mouseleave",
            () => {

                galleryPaused = false;

                previousTime =
                    performance.now();

            }
        );


        /* -----------------------------------------------
           PAUSE ON MOBILE TOUCH
        ------------------------------------------------ */

        galleryTrack.addEventListener(
            "touchstart",
            () => {

                galleryPaused = true;

            },
            {
                passive: true
            }
        );


        galleryTrack.addEventListener(
            "touchend",
            () => {

                galleryPaused = false;

                previousTime =
                    performance.now();

            },
            {
                passive: true
            }
        );


        /* -----------------------------------------------
           RESIZE FIX
        ------------------------------------------------ */

        let resizeTimer;


        window.addEventListener(
            "resize",
            () => {

                clearTimeout(
                    resizeTimer
                );


                resizeTimer =
                    setTimeout(
                        () => {

                            /*
                             * Keep position inside
                             * the current loop.
                             */

                            const loopWidth =
                                getGalleryLoopWidth();


                            if (
                                loopWidth > 0 &&
                                galleryPosition >=
                                    loopWidth
                            ) {

                                galleryPosition =
                                    galleryPosition %
                                    loopWidth;

                            }

                        },
                        150
                    );

            }
        );

    }


    /* =====================================================
       8. IMAGE LOAD ERROR HANDLING
    ===================================================== */

    document
        .querySelectorAll("img")
        .forEach((image) => {

            image.addEventListener(
                "error",
                () => {

                    console.warn(
                        "Image could not be loaded:",
                        image.src
                    );

                }
            );

        });


    /* =====================================================
       9. ESC KEY
       
       Close mobile menu with Escape.
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape"
            ) {

                closeMobileMenu();

            }

        }
    );


    /* =====================================================
       10. INITIALIZATION COMPLETE
    ===================================================== */

    console.log(
        "Memory Group website initialized."
    );

});
