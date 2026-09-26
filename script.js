/* =========================================================
   MEMORY GROUP
   MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const navbar =
        document.getElementById("navbar");

    const menuButton =
        document.getElementById("menuButton");

    const mobileMenu =
        document.getElementById("mobileMenu");

    const memoryTrack =
        document.getElementById("memoryPhotoTrack");

    const lightbox =
        document.getElementById("photoLightbox");

    const lightboxImage =
        document.getElementById("lightboxImage");

    const lightboxClose =
        document.getElementById("lightboxClose");

    const currentYear =
        document.getElementById("currentYear");


    /* =====================================================
       YEAR
    ===================================================== */

    if (currentYear) {
        currentYear.textContent =
            new Date().getFullYear();
    }


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    if (menuButton && mobileMenu) {

        menuButton.addEventListener(
            "click",
            () => {

                const isOpen =
                    menuButton.classList.toggle("active");

                mobileMenu.classList.toggle(
                    "active",
                    isOpen
                );

                menuButton.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );

                document.body.classList.toggle(
                    "menu-open",
                    isOpen
                );

            }
        );


        mobileMenu
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    () => {

                        menuButton.classList.remove(
                            "active"
                        );

                        mobileMenu.classList.remove(
                            "active"
                        );

                        menuButton.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                        document.body.classList.remove(
                            "menu-open"
                        );

                    }
                );

            });

    }


    /* =====================================================
       NAVBAR SCROLL
    ===================================================== */

    const handleNavbar =
        () => {

            if (!navbar) {
                return;
            }

            if (window.scrollY > 30) {

                navbar.classList.add(
                    "scrolled"
                );

            } else {

                navbar.classList.remove(
                    "scrolled"
                );

            }

        };

    window.addEventListener(
        "scroll",
        handleNavbar,
        { passive: true }
    );

    handleNavbar();


    /* =====================================================
       MEMORY EVENT PHOTOS
       
       IMPORTANT:
       All photos are inside:

       memory-photos/

       We use the exact filenames currently
       stored in your repository.
    ===================================================== */

    const memoryPhotos = [

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
       BUILD MEMORY GALLERY
    ===================================================== */

    function createMemoryPhoto(
        filename,
        number
    ) {

        const card =
            document.createElement("button");

        card.type = "button";

        card.className =
            "memory-photo-card";

        card.setAttribute(
            "aria-label",
            "Open Memory Group photo"
        );


        const image =
            document.createElement("img");

        image.src =
            "memory-photos/" +
            encodeURI(filename);

        image.alt =
            "Memory Group moment " +
            number;

        image.loading =
            number <= 5
                ? "eager"
                : "lazy";


        image.addEventListener(
            "error",
            () => {

                console.warn(
                    "Memory photo could not be loaded:",
                    image.src
                );

                card.style.display =
                    "none";

            }
        );


        const numberLabel =
            document.createElement("span");

        numberLabel.className =
            "memory-photo-card-number";

        numberLabel.textContent =
            String(number)
                .padStart(2, "0");


        card.appendChild(image);

        card.appendChild(numberLabel);

        card.addEventListener(
            "click",
            () => {

                openLightbox(
                    image.src,
                    image.alt
                );

            }
        );


        return card;

    }


    function buildMemoryGallery() {

        if (!memoryTrack) {
            return;
        }


        memoryTrack.innerHTML = "";


        memoryPhotos.forEach(
            (filename, index) => {

                memoryTrack.appendChild(
                    createMemoryPhoto(
                        filename,
                        index + 1
                    )
                );

            }
        );


        /*
         * Duplicate the complete group once.
         *
         * This makes the horizontal movement
         * seamless instead of stopping after
         * the last image.
         */

        memoryPhotos.forEach(
            (filename, index) => {

                const duplicate =
                    createMemoryPhoto(
                        filename,
                        index + 1
                    );

                duplicate.classList.add(
                    "memory-photo-duplicate"
                );

                memoryTrack.appendChild(
                    duplicate
                );

            }
        );

    }


    buildMemoryGallery();


    /* =====================================================
       AUTO SCROLL
    ===================================================== */

    let autoScrollRunning = true;

    let scrollPosition = 0;

    let animationFrame = null;

    const scrollSpeed =
        0.42;


    function autoScroll() {

        if (
            !memoryTrack ||
            !autoScrollRunning
        ) {
            return;
        }


        const firstSetWidth =
            memoryTrack.scrollWidth / 2;


        scrollPosition +=
            scrollSpeed;


        if (
            scrollPosition >=
            firstSetWidth
        ) {

            scrollPosition = 0;

        }


        memoryTrack.style.transform =
            `translate3d(${-scrollPosition}px, 0, 0)`;


        animationFrame =
            requestAnimationFrame(
                autoScroll
            );

    }


    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    if (
        !reducedMotion.matches
    ) {

        animationFrame =
            requestAnimationFrame(
                autoScroll
            );

    }


    /* =====================================================
       PAUSE ON HOVER
    ===================================================== */

    if (memoryTrack) {

        memoryTrack.addEventListener(
            "mouseenter",
            () => {

                autoScrollRunning =
                    false;

            }
        );


        memoryTrack.addEventListener(
            "mouseleave",
            () => {

                autoScrollRunning =
                    true;

            }
        );


        /*
         * On phone there is no hover.
         * Touching the gallery pauses it
         * briefly, then continues.
         */

        memoryTrack.addEventListener(
            "touchstart",
            () => {

                autoScrollRunning =
                    false;

            },
            { passive: true }
        );


        memoryTrack.addEventListener(
            "touchend",
            () => {

                setTimeout(
                    () => {

                        autoScrollRunning =
                            true;

                    },
                    1500
                );

            },
            { passive: true }
        );

    }


    /* =====================================================
       LIGHTBOX
    ===================================================== */

    function openLightbox(
        imageSrc,
        imageAlt
    ) {

        if (
            !lightbox ||
            !lightboxImage
        ) {
            return;
        }


        lightboxImage.src =
            imageSrc;

        lightboxImage.alt =
            imageAlt || "Memory Group moment";


        lightbox.classList.add(
            "active"
        );

        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.classList.add(
            "menu-open"
        );

    }


    function closeLightbox() {

        if (!lightbox) {
            return;
        }


        lightbox.classList.remove(
            "active"
        );

        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.classList.remove(
            "menu-open"
        );


        setTimeout(
            () => {

                if (lightboxImage) {
                    lightboxImage.src = "";
                }

            },
            250
        );

    }


    if (lightboxClose) {

        lightboxClose.addEventListener(
            "click",
            closeLightbox
        );

    }


    if (lightbox) {

        lightbox.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    lightbox
                ) {

                    closeLightbox();

                }

            }
        );

    }


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                closeLightbox();

            }

        }
    );


    /* =====================================================
       CLOSE MENU WHEN RESIZING
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 760
            ) {

                if (menuButton) {

                    menuButton.classList.remove(
                        "active"
                    );

                    menuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }


                if (mobileMenu) {

                    mobileMenu.classList.remove(
                        "active"
                    );

                }


                document.body.classList.remove(
                    "menu-open"
                );

            }

        }
    );


    /* =====================================================
       IMAGE ERROR DEBUGGING
    ===================================================== */

    document
        .querySelectorAll("img")
        .forEach(image => {

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
       SMOOTH ANCHOR SCROLL
    ===================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

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


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        });


    /* =====================================================
       CLEANUP
    ===================================================== */

    window.addEventListener(
        "beforeunload",
        () => {

            if (animationFrame) {

                cancelAnimationFrame(
                    animationFrame
                );

            }

        }
    );

});
