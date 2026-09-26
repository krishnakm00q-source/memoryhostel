```javascript
/* =========================================================
   MEMORY GROUP
   MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =======================================================
       NAVBAR
    ======================================================== */

    const navbar = document.getElementById("navbar");

    function updateNavbar() {
        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }

    updateNavbar();

    window.addEventListener(
        "scroll",
        updateNavbar,
        { passive: true }
    );


    /* =======================================================
       MOBILE MENU
    ======================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

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


    /* =======================================================
       SMOOTH INTERNAL LINKS
    ======================================================== */

    document.querySelectorAll('a[href^="#"]').forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const navbarHeight =
                navbar ? navbar.offsetHeight : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =======================================================
       REVEAL ANIMATIONS
    ======================================================== */

    const revealElements = document.querySelectorAll(
        ".section-heading, .pricing-grid, .hostel-grid, " +
        ".philosophy-content, .owner-layout, " +
        ".moments-heading, .events-slider, .final-contact-inner"
    );

    revealElements.forEach((element) => {
        element.classList.add("reveal");
    });

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                });

            },
            {
                threshold: 0.12
            }
        );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });


    /* =======================================================
       MEMORY EVENTS / MOMENTS
       
       These are the files currently inside:
       memory-photos/
    ======================================================== */

    const eventImages = [

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

        "WhatsApp Image 2026-09-26 at 4.36.57 PM.jpeg",

        "WhatsApp Image 2026-09-26 at 4.36.58 PM.jpeg",

        "b51d30b1-b2b0-4170-9810-ba2b747b9e54.jpg"

    ];


    const eventsSlider =
        document.getElementById("eventsSlider");

    const eventsProgress =
        document.getElementById("eventsProgress");

    const eventsPrev =
        document.getElementById("eventsPrev");

    const eventsNext =
        document.getElementById("eventsNext");


    if (eventsSlider) {

        eventImages.forEach((fileName, index) => {

            const card =
                document.createElement("article");

            card.className = "event-card";


            const image =
                document.createElement("img");

            image.src =
                "memory-photos/" +
                encodeURIComponent(fileName);

            image.alt =
                `Memory Group moment ${index + 1}`;

            image.loading =
                index < 3 ? "eager" : "lazy";


            const label =
                document.createElement("div");

            label.className =
                "event-label";

            label.textContent =
                `MEMORY MOMENT · ${String(index + 1).padStart(2, "0")}`;


            card.appendChild(image);
            card.appendChild(label);

            eventsSlider.appendChild(card);

        });

    }


    /* =======================================================
       EVENTS SLIDER
    ======================================================== */

    let currentEventIndex = 0;
    let autoScrollTimer = null;
    let isUserInteracting = false;


    function getEventCards() {

        if (!eventsSlider) {
            return [];
        }

        return Array.from(
            eventsSlider.querySelectorAll(".event-card")
        );

    }


    function getScrollAmount() {

        const cards =
            getEventCards();

        if (!cards.length) {
            return 0;
        }

        const cardWidth =
            cards[0].getBoundingClientRect().width;

        const gap = 18;

        return cardWidth + gap;

    }


    function updateProgress() {

        if (!eventsProgress || !eventsSlider) {
            return;
        }

        const maxScroll =
            eventsSlider.scrollWidth -
            eventsSlider.clientWidth;

        if (maxScroll <= 0) {
            eventsProgress.style.width = "100%";
            return;
        }

        const percentage =
            (eventsSlider.scrollLeft / maxScroll) * 100;

        eventsProgress.style.width =
            `${Math.min(100, Math.max(0, percentage))}%`;

    }


    function goToEvent(index) {

        const cards =
            getEventCards();

        if (!cards.length) {
            return;
        }

        if (index >= cards.length) {
            index = 0;
        }

        if (index < 0) {
            index = cards.length - 1;
        }

        currentEventIndex = index;

        eventsSlider.scrollTo({
            left: getScrollAmount() * index,
            behavior: "smooth"
        });

    }


    function nextEvent() {
        goToEvent(currentEventIndex + 1);
    }


    function previousEvent() {
        goToEvent(currentEventIndex - 1);
    }


    if (eventsNext) {
        eventsNext.addEventListener(
            "click",
            () => {
                nextEvent();
                restartAutoScroll();
            }
        );
    }


    if (eventsPrev) {
        eventsPrev.addEventListener(
            "click",
            () => {
                previousEvent();
                restartAutoScroll();
            }
        );
    }


    if (eventsSlider) {

        eventsSlider.addEventListener(
            "scroll",
            updateProgress,
            { passive: true }
        );


        /* Mouse drag */

        let isDragging = false;
        let startX = 0;
        let startScrollLeft = 0;


        eventsSlider.addEventListener(
            "pointerdown",
            (event) => {

                isDragging = true;
                isUserInteracting = true;

                startX = event.clientX;
                startScrollLeft =
                    eventsSlider.scrollLeft;

                eventsSlider.setPointerCapture(
                    event.pointerId
                );

                stopAutoScroll();

            }
        );


        eventsSlider.addEventListener(
            "pointermove",
            (event) => {

                if (!isDragging) {
                    return;
                }

                const distance =
                    event.clientX - startX;

                eventsSlider.scrollLeft =
                    startScrollLeft - distance;

            }
        );


        eventsSlider.addEventListener(
            "pointerup",
            (event) => {

                isDragging = false;
                isUserInteracting = false;

                try {
                    eventsSlider.releasePointerCapture(
                        event.pointerId
                    );
                } catch (_) {}

                restartAutoScroll();

            }
        );


        eventsSlider.addEventListener(
            "pointercancel",
            () => {

                isDragging = false;
                isUserInteracting = false;

                restartAutoScroll();

            }
        );


        /* Touch / mouse hover pause */

        eventsSlider.addEventListener(
            "mouseenter",
            () => {
                isUserInteracting = true;
                stopAutoScroll();
            }
        );


        eventsSlider.addEventListener(
            "mouseleave",
            () => {
                isUserInteracting = false;
                restartAutoScroll();
            }
        );

    }


    /* =======================================================
       AUTO SCROLL
       
       Memory events automatically move.
       User interaction temporarily pauses it.
    ======================================================== */

    function startAutoScroll() {

        stopAutoScroll();

        autoScrollTimer =
            setInterval(() => {

                if (
                    !isUserInteracting &&
                    eventsSlider
                ) {
                    nextEvent();
                }

            }, 4000);

    }


    function stopAutoScroll() {

        if (autoScrollTimer) {

            clearInterval(autoScrollTimer);

            autoScrollTimer = null;

        }

    }


    function restartAutoScroll() {

        stopAutoScroll();

        setTimeout(() => {

            if (!isUserInteracting) {
                startAutoScroll();
            }

        }, 1500);

    }


    if (eventsSlider) {

        updateProgress();

        setTimeout(() => {
            startAutoScroll();
        }, 2000);

    }


    /* =======================================================
       PAUSE EVENTS WHEN TAB IS NOT ACTIVE
    ======================================================== */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (document.hidden) {
                stopAutoScroll();
            } else {
                restartAutoScroll();
            }

        }
    );


    /* =======================================================
       CURRENT YEAR
    ======================================================== */

    const currentYear =
        document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent =
            new Date().getFullYear();
    }


    /* =======================================================
       K R I S H N A   P A R A L L A X
    ======================================================== */

    const background =
        document.querySelector(".background-image");

    const supportsFinePointer =
        window.matchMedia(
            "(pointer: fine)"
        ).matches;


    if (
        background &&
        supportsFinePointer
    ) {

        let mouseX = 0;
        let mouseY = 0;

        let currentX = 0;
        let currentY = 0;


        window.addEventListener(
            "mousemove",
            (event) => {

                mouseX =
                    (event.clientX /
                    window.innerWidth - 0.5) * 14;

                mouseY =
                    (event.clientY /
                    window.innerHeight - 0.5) * 10;

            },
            { passive: true }
        );


        function animateBackground() {

            currentX +=
                (mouseX - currentX) * 0.035;

            currentY +=
                (mouseY - currentY) * 0.035;

            background.style.transform =
                `scale(1.05) translate3d(${currentX}px, ${currentY}px, 0)`;

            requestAnimationFrame(
                animateBackground
            );

        }

        animateBackground();

    }


    /* =======================================================
       IMAGE ERROR HANDLING
    ======================================================== */

    document.addEventListener(
        "error",
        (event) => {

            const element =
                event.target;

            if (
                element &&
                element.tagName === "IMG"
            ) {

                element.classList.add(
                    "image-error"
                );

                console.warn(
                    "Memory Group image could not be loaded:",
                    element.src
                );

            }

        },
        true
    );


    /* =======================================================
       ESCAPE CLOSE MOBILE MENU
    ======================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                navLinks
            ) {
                navLinks.classList.remove(
                    "active"
                );
            }

        }
    );

});
```
