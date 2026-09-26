```javascript
/* =========================================================
   MEMORY GROUP — MAIN SCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            menuToggle.classList.toggle("active");
        });

        navLinks.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                menuToggle.classList.remove("active");
            });

        });
    }


    /* =====================================================
       MOBILE MENU — ALTERNATE CLASS SUPPORT
       ===================================================== */

    const mobileMenu = document.getElementById("mobileMenu");
    const mobileClose = document.getElementById("mobileClose");

    if (menuToggle && mobileMenu) {

        menuToggle.addEventListener("click", () => {
            mobileMenu.classList.add("open");
            document.body.classList.add("menu-open");
        });
    }

    if (mobileClose && mobileMenu) {

        mobileClose.addEventListener("click", () => {
            mobileMenu.classList.remove("open");
            document.body.classList.remove("menu-open");
        });
    }

    if (mobileMenu) {

        mobileMenu.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {
                mobileMenu.classList.remove("open");
                document.body.classList.remove("menu-open");
            });

        });
    }


    /* =====================================================
       HEADER SCROLL EFFECT
    ===================================================== */

    const header = document.querySelector(".navbar") ||
                   document.querySelector(".site-header");

    if (header) {

        const updateHeader = () => {

            if (window.scrollY > 30) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }

        };

        window.addEventListener("scroll", updateHeader, {
            passive: true
        });

        updateHeader();
    }


    /* =====================================================
       SMOOTH ANCHOR SCROLL
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const headerHeight =
                header ? header.offsetHeight : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       MOMENTS THAT STAY
       HORIZONTAL AUTO SCROLL
    ===================================================== */

    const memoryTrack =
        document.querySelector(".memory-track");

    if (memoryTrack) {

        /*
         * Prevent the same gallery from being
         * duplicated multiple times.
         */
        if (!memoryTrack.dataset.ready) {

            memoryTrack.dataset.ready = "true";

            /*
             * Duplicate original images so the
             * animation can loop continuously.
             */
            const originalItems =
                Array.from(memoryTrack.children);

            originalItems.forEach(item => {

                const clone = item.cloneNode(true);

                clone.setAttribute(
                    "aria-hidden",
                    "true"
                );

                memoryTrack.appendChild(clone);

            });

        }
    }


    /* =====================================================
       MEMORY PHOTO FALLBACK
       ===================================================== */

    /*
     * If the gallery is dynamically generated and
     * the GitHub/API source fails, use direct
     * memory-photos paths.
     *
     * This does NOT replace existing gallery images.
     */

    const gallery =
        document.querySelector(".memory-gallery");

    const galleryContainer =
        document.querySelector(".memory-track");

    if (
        gallery &&
        galleryContainer &&
        galleryContainer.children.length === 0
    ) {

        const memoryPhotos = [

            "memory-photos/IMG_20250820_174444.jpg",
            "memory-photos/IMG_20250820_174451.jpg",
            "memory-photos/IMG_20250820_174458.jpg",
            "memory-photos/IMG_20250820_174505.jpg",
            "memory-photos/IMG_20250820_174512.jpg",
            "memory-photos/IMG_20250820_174520.jpg"

        ];

        memoryPhotos.forEach((src, index) => {

            const img = document.createElement("img");

            img.src = src;

            img.alt =
                `Life at Memory ${index + 1}`;

            img.loading = "lazy";

            galleryContainer.appendChild(img);

        });

        /*
         * Duplicate for infinite scrolling.
         */

        memoryPhotos.forEach((src, index) => {

            const img = document.createElement("img");

            img.src = src;

            img.alt = "";

            img.loading = "lazy";

            img.setAttribute(
                "aria-hidden",
                "true"
            );

            galleryContainer.appendChild(img);

        });

    }


    /* =====================================================
       AUTO HORIZONTAL SCROLL FALLBACK
    ===================================================== */

    const autoGallery =
        document.querySelector(".memory-gallery");

    if (autoGallery) {

        let animationFrame = null;
        let isPaused = false;

        const track =
            autoGallery.querySelector(".memory-track");

        if (track) {

            const isMobile =
                window.matchMedia(
                    "(max-width: 768px)"
                ).matches;

            /*
             * CSS normally handles animation.
             * JS fallback only applies if animation
             * is unavailable.
             */

            if (!CSS.supports(
                "animation-timeline",
                "scroll()"
            )) {

                const moveGallery = () => {

                    if (!isPaused) {

                        autoGallery.scrollLeft +=
                            isMobile ? 0.35 : 0.55;

                        /*
                         * Reset after reaching
                         * approximately half.
                         */

                        if (
                            autoGallery.scrollLeft >=
                            autoGallery.scrollWidth / 2
                        ) {

                            autoGallery.scrollLeft = 0;

                        }

                    }

                    animationFrame =
                        requestAnimationFrame(
                            moveGallery
                        );
                };

                /*
                 * Only use JS scrolling if the gallery
                 * itself is horizontally scrollable.
                 */

                if (
                    autoGallery.scrollWidth >
                    autoGallery.clientWidth
                ) {

                    animationFrame =
                        requestAnimationFrame(
                            moveGallery
                        );
                }

            }


            /* Desktop hover */

            autoGallery.addEventListener(
                "mouseenter",
                () => {
                    isPaused = true;
                }
            );

            autoGallery.addEventListener(
                "mouseleave",
                () => {
                    isPaused = false;
                }
            );


            /* Mobile touch */

            autoGallery.addEventListener(
                "touchstart",
                () => {
                    isPaused = true;
                },
                { passive: true }
            );

            autoGallery.addEventListener(
                "touchend",
                () => {

                    setTimeout(() => {
                        isPaused = false;
                    }, 1200);

                },
                { passive: true }
            );

        }
    }


    /* =====================================================
       IMAGE ERROR HANDLING
    ===================================================== */

    document.querySelectorAll("img").forEach(img => {

        img.addEventListener("error", () => {

            console.warn(
                "Memory Group image could not be loaded:",
                img.src
            );

            /*
             * Prevent broken-image icon
             * from destroying layout.
             */

            img.classList.add("image-error");

        });

    });


    /* =====================================================
       ROOM CARD TOUCH SUPPORT
    ===================================================== */

    const roomSlider =
        document.querySelector(".room-slider");

    if (roomSlider) {

        let startX = 0;
        let startScroll = 0;

        roomSlider.addEventListener(
            "touchstart",
            event => {

                startX =
                    event.touches[0].clientX;

                startScroll =
                    roomSlider.scrollLeft;

            },
            { passive: true }
        );

        roomSlider.addEventListener(
            "touchmove",
            event => {

                const currentX =
                    event.touches[0].clientX;

                const distance =
                    startX - currentX;

                roomSlider.scrollLeft =
                    startScroll + distance;

            },
            { passive: true }
        );

    }


    /* =====================================================
       HOSTEL CARD TOUCH SUPPORT
    ===================================================== */

    const hostelSlider =
        document.querySelector(".hostel-slider");

    if (hostelSlider) {

        let startX = 0;
        let startScroll = 0;

        hostelSlider.addEventListener(
            "touchstart",
            event => {

                startX =
                    event.touches[0].clientX;

                startScroll =
                    hostelSlider.scrollLeft;

            },
            { passive: true }
        );

        hostelSlider.addEventListener(
            "touchmove",
            event => {

                const currentX =
                    event.touches[0].clientX;

                const distance =
                    startX - currentX;

                hostelSlider.scrollLeft =
                    startScroll + distance;

            },
            { passive: true }
        );

    }


    /* =====================================================
       ESC KEY
    ===================================================== */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            if (mobileMenu) {
                mobileMenu.classList.remove("open");
            }

            if (navLinks) {
                navLinks.classList.remove("active");
            }

            if (menuToggle) {
                menuToggle.classList.remove("active");
            }

            document.body.classList.remove(
                "menu-open"
            );

        }

    });


    /* =====================================================
       RESIZE CLEANUP
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (window.innerWidth > 768) {

                if (navLinks) {
                    navLinks.classList.remove("active");
                }

                if (mobileMenu) {
                    mobileMenu.classList.remove("open");
                }

                if (menuToggle) {
                    menuToggle.classList.remove("active");
                }

                document.body.classList.remove(
                    "menu-open"
                );

            }

        },
        { passive: true }
    );


    /* =====================================================
       PAGE READY
    ===================================================== */

    document.body.classList.add("page-loaded");

});
```
