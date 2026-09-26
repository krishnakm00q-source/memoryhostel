/* =========================================================
   MEMORY GROUP
   MAIN JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       NAVBAR
       ===================================================== */

    const navbar = document.getElementById("navbar");

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (window.scrollY > 30) {
        navbar.classList.add("scrolled");
    }

    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 30) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }

        },
        { passive: true }
    );


    /* =====================================================
       MOBILE MENU
       ===================================================== */

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            navLinks.classList.toggle("active");

        });


        navLinks.querySelectorAll("a").forEach((link) => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("active");

            });

        });

    }


    /* =====================================================
       MEMORY EVENTS PHOTOS
       ===================================================== */

    const eventsTrack = document.getElementById("eventsTrack");

    /*
       IMPORTANT:

       These are the files actually inside:

       /memory-photos/

       Do NOT move them into assets.
    */

    const eventPhotos = [

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


    if (eventsTrack) {

        /*
           Build the first set.
        */

        eventPhotos.forEach((photo, index) => {

            const card = document.createElement("div");

            card.className = "event-card";

            const image = document.createElement("img");

            image.src =
                "memory-photos/" +
                encodeURIComponent(photo);

            image.alt =
                "Memory Group event moment " +
                (index + 1);

            image.loading = index < 4
                ? "eager"
                : "lazy";

            image.addEventListener("error", () => {

                card.style.display = "none";

            });

            card.appendChild(image);

            eventsTrack.appendChild(card);

        });


        /*
           Duplicate the cards.

           This creates a seamless continuous
           auto-scroll instead of jumping back.
        */

        const originalCards =
            Array.from(eventsTrack.children);

        originalCards.forEach((card) => {

            const clone = card.cloneNode(true);

            clone.setAttribute(
                "aria-hidden",
                "true"
            );

            eventsTrack.appendChild(clone);

        });


        /* =================================================
           AUTO SCROLL
           ================================================= */

        let position = 0;

        let speed = 0.45;

        let paused = false;

        let animationFrame;


        function animateEvents() {

            if (!paused) {

                position -= speed;

                const halfWidth =
                    eventsTrack.scrollWidth / 2;

                if (Math.abs(position) >= halfWidth) {

                    position = 0;

                }

                eventsTrack.style.transform =
                    `translate3d(${position}px, 0, 0)`;

            }

            animationFrame =
                requestAnimationFrame(
                    animateEvents
                );
        }


        const eventsSlider =
            document.getElementById("eventsSlider");


        if (eventsSlider) {

            eventsSlider.addEventListener(
                "mouseenter",
                () => {
                    paused = true;
                }
            );

            eventsSlider.addEventListener(
                "mouseleave",
                () => {
                    paused = false;
                }
            );

            eventsSlider.addEventListener(
                "touchstart",
                () => {
                    paused = true;
                },
                { passive: true }
            );

            eventsSlider.addEventListener(
                "touchend",
                () => {
                    setTimeout(() => {
                        paused = false;
                    }, 1200);
                },
                { passive: true }
            );

        }


        /*
           Start after browser has painted the page.
        */

        requestAnimationFrame(() => {
            animateEvents();
        });


        /*
           Stop animation if tab becomes hidden.
        */

        document.addEventListener(
            "visibilitychange",
            () => {

                paused =
                    document.hidden;

            }
        );

    }


    /* =====================================================
       5500 ROOM PHOTO FALLBACK
       ===================================================== */

    /*
       5500.jpeg does NOT exist yet.

       Therefore it must NOT show a broken-image icon.

       When you upload:

       room-photos/5500.jpeg

       the same code will automatically
       start showing the image.
    */

    const roomImages =
        document.querySelectorAll(
            ".room-photo"
        );


    roomImages.forEach((image) => {

        image.addEventListener(
            "error",
            () => {

                const wrapper =
                    image.closest(".room-image");

                if (!wrapper) return;

                wrapper.classList.add(
                    "missing"
                );

            }
        );


        /*
           In case browser already knows
           the image failed before listener.
        */

        if (image.complete && image.naturalWidth === 0) {

            const wrapper =
                image.closest(".room-image");

            if (wrapper) {

                wrapper.classList.add(
                    "missing"
                );

            }

        }

    });


    /* =====================================================
       CURRENT YEAR
       ===================================================== */

    const year =
        document.getElementById("year");

    if (year) {

        year.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       CLOSE MOBILE MENU ON RESIZE
       ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 850 &&
                navLinks
            ) {

                navLinks.classList.remove(
                    "active"
                );

            }

        }
    );

});
