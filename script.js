/* =========================================================
   MEMORY GROUP — SCRIPT.JS
   FINAL STABLE VERSION

   Existing functionality preserved:
   - Mobile menu
   - Krishna parallax
   - Hostel card tilt
   - Smooth scrolling
   - Responsive behaviour

   Added:
   - Memory events auto-scroll
   - Memory photo fullscreen viewer
========================================================= */


/* =========================================================
   MOBILE MENU
========================================================= */

const menuButton =
    document.getElementById("menuButton");

const mobileMenu =
    document.getElementById("mobileMenu");

const mobileLinks =
    document.querySelectorAll(
        ".mobile-menu-inner > a"
    );


if (menuButton && mobileMenu) {

    menuButton.addEventListener(
        "click",
        () => {

            menuButton.classList.toggle(
                "active"
            );

            mobileMenu.classList.toggle(
                "active"
            );

            document.body.classList.toggle(
                "menu-open"
            );

        }
    );

}


mobileLinks.forEach(link => {

    link.addEventListener(
        "click",
        () => {

            if (menuButton) {

                menuButton.classList.remove(
                    "active"
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
    );

});


/* =========================================================
   KRISHNA BACKGROUND PARALLAX
========================================================= */

const krishnaBackground =
    document.querySelector(
        ".krishna-background"
    );


let mouseX = 0;
let mouseY = 0;

let currentX = 0;
let currentY = 0;


if (
    krishnaBackground &&
    window.matchMedia(
        "(pointer: fine)"
    ).matches
) {

    window.addEventListener(
        "mousemove",
        event => {

            mouseX =
                (
                    event.clientX /
                    window.innerWidth -
                    0.5
                ) * 9;


            mouseY =
                (
                    event.clientY /
                    window.innerHeight -
                    0.5
                ) * 6;

        }
    );


    function animateBackground() {

        currentX +=
            (mouseX - currentX) *
            0.035;


        currentY +=
            (mouseY - currentY) *
            0.035;


        krishnaBackground.style.transform =
            `translate3d(${currentX}px, ${currentY}px, 0) scale(1.04)`;


        requestAnimationFrame(
            animateBackground
        );

    }


    animateBackground();

}


/* =========================================================
   HOSTEL CARD TILT
========================================================= */

const cards =
    document.querySelectorAll(
        ".hostel-card"
    );


if (
    window.matchMedia(
        "(pointer: fine)"
    ).matches
) {

    cards.forEach(card => {

        const image =
            card.querySelector(
                ".card-image"
            );


        if (!image) return;


        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateX =
                    (
                        (y - centerY) /
                        centerY
                    ) * -1.8;


                const rotateY =
                    (
                        (x - centerX) /
                        centerX
                    ) * 1.8;


                image.style.transform =
                    `scale(1.045) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                image.style.transform =
                    "scale(1) rotateX(0deg) rotateY(0deg)";

            }
        );

    });

}


/* =========================================================
   MEMORY EVENTS / CELEBRATIONS PHOTO CATALOGUE
========================================================= */

/*
   IMPORTANT:

   These photos are inside:

       memory-photos/

   Existing filenames are NOT renamed.

   GitHub Pages cannot safely scan a folder
   and automatically discover filenames.

   Therefore the exact existing filenames
   are listed here.
*/

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

    "WhatsApp Image 2026-09-26 at 4.36.56 PM (1).jpeg",

    "WhatsApp Image 2026-09-26 at 4.36.56 PM (2).jpeg",

    "WhatsApp Image 2026-09-26 at 4.36.56 PM.jpeg",

    "WhatsApp Image 2026-09-26 at 4.36.57 PM.jpeg",

    "WhatsApp Image 2026-09-26 at 4.36.58 PM.jpeg",

    "b51d30b1-b2b0-4170-9810-ba2b747b9e54.jpg"

];


const memoryTrack =
    document.getElementById(
        "memoryPhotoTrack"
    );


/* =========================================================
   CREATE MEMORY PHOTOS
========================================================= */

if (memoryTrack) {

    memoryPhotos.forEach(
        (fileName, index) => {

            const button =
                document.createElement(
                    "button"
                );


            button.type = "button";

            button.className =
                "memory-photo";


            button.setAttribute(
                "aria-label",
                `Open Memory Group photo ${index + 1}`
            );


            const image =
                document.createElement(
                    "img"
                );


            image.src =
                "memory-photos/" +
                encodeURIComponent(
                    fileName
                );


            image.alt =
                "Memory Group moment";


            image.loading =
                index < 4
                    ? "eager"
                    : "lazy";


            button.appendChild(
                image
            );


            memoryTrack.appendChild(
                button
            );

        }
    );

}


/* =========================================================
   MEMORY AUTO SCROLL
========================================================= */

if (memoryTrack) {

    let paused = false;

    let position = 0;

    const speed = 0.45;


    function animateMemoryTrack() {

        if (!paused) {

            position += speed;


            const firstPhoto =
                memoryTrack.querySelector(
                    ".memory-photo"
                );


            if (firstPhoto) {

                const photoWidth =
                    firstPhoto.offsetWidth;


                const gap =
                    parseFloat(
                        getComputedStyle(
                            memoryTrack
                        ).gap
                    ) || 0;


                const moveDistance =
                    photoWidth + gap;


                if (
                    position >=
                    moveDistance
                ) {

                    memoryTrack.appendChild(
                        firstPhoto
                    );


                    position -=
                        moveDistance;

                }


                memoryTrack.style.transform =
                    `translate3d(${-position}px, 0, 0)`;

            }

        }


        requestAnimationFrame(
            animateMemoryTrack
        );

    }


    animateMemoryTrack();


    /* -----------------------------------------
       DESKTOP HOVER PAUSE
    ----------------------------------------- */

    memoryTrack.addEventListener(
        "mouseenter",
        () => {

            paused = true;

        }
    );


    memoryTrack.addEventListener(
        "mouseleave",
        () => {

            paused = false;

        }
    );


    /* -----------------------------------------
       MOBILE TOUCH PAUSE
    ----------------------------------------- */

    memoryTrack.addEventListener(
        "touchstart",
        () => {

            paused = true;

        },
        {
            passive:true
        }
    );


    memoryTrack.addEventListener(
        "touchend",
        () => {

            setTimeout(
                () => {

                    paused = false;

                },
                1200
            );

        },
        {
            passive:true
        }
    );

}


/* =========================================================
   MEMORY PHOTO FULLSCREEN VIEWER
========================================================= */

function openMemoryViewer(
    imageSrc
) {

    const viewer =
        document.createElement(
            "div"
        );


    viewer.className =
        "memory-photo-viewer";


    const image =
        document.createElement(
            "img"
        );


    image.src =
        imageSrc;


    image.alt =
        "Memory Group moment";


    const close =
        document.createElement(
            "button"
        );


    close.type =
        "button";


    close.className =
        "memory-photo-viewer-close";


    close.innerHTML =
        "×";


    close.setAttribute(
        "aria-label",
        "Close photo"
    );


    viewer.appendChild(
        image
    );


    viewer.appendChild(
        close
    );


    document.body.appendChild(
        viewer
    );


    requestAnimationFrame(
        () => {

            viewer.classList.add(
                "active"
            );

        }
    );


    document.body.classList.add(
        "lightbox-open"
    );


    function closeViewer() {

        viewer.classList.remove(
            "active"
        );


        document.body.classList.remove(
            "lightbox-open"
        );


        setTimeout(
            () => {

                viewer.remove();

            },
            300
        );

    }


    close.addEventListener(
        "click",
        closeViewer
    );


    viewer.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                viewer
            ) {

                closeViewer();

            }

        }
    );


    document.addEventListener(
        "keydown",
        function escapeHandler(
            event
        ) {

            if (
                event.key ===
                "Escape"
            ) {

                closeViewer();

                document.removeEventListener(
                    "keydown",
                    escapeHandler
                );

            }

        }
    );

}


/* =========================================================
   PHOTO CLICK EVENTS
========================================================= */

if (memoryTrack) {

    memoryTrack.addEventListener(
        "click",
        event => {

            const photo =
                event.target.closest(
                    ".memory-photo"
                );


            if (!photo) return;


            const image =
                photo.querySelector(
                    "img"
                );


            if (!image) return;


            openMemoryViewer(
                image.src
            );

        }
    );

}


/* =========================================================
   IMAGE ERROR CHECK
========================================================= */

const images =
    document.querySelectorAll(
        "img"
    );


images.forEach(
    image => {

        image.addEventListener(
            "error",
            () => {

                console.warn(
                    "Image could not be loaded:",
                    image.src
                );

            }
        );

    }
);


/* =========================================================
   PREVENT MOBILE MENU FROM STAYING OPEN
========================================================= */

window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth > 650
        ) {

            if (menuButton) {

                menuButton.classList.remove(
                    "active"
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


/* =========================================================
   PREVENT BACKGROUND SCROLL
   WHEN MOBILE MENU IS OPEN
========================================================= */

const bodyObserver =
    new MutationObserver(
        () => {

            if (
                document.body.classList.contains(
                    "menu-open"
                )
            ) {

                document.body.style.overflow =
                    "hidden";

            } else {

                document.body.style.overflow =
                    "";

            }

        }
    );


bodyObserver.observe(
    document.body,
    {
        attributes:true,

        attributeFilter:[
            "class"
        ]
    }
);


/* =========================================================
   SMOOTH ANCHOR SCROLL
========================================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(
    link => {

        link.addEventListener(
            "click",
            function(event) {

                const targetId =
                    this.getAttribute(
                        "href"
                    );


                if (
                    targetId === "#" ||
                    !targetId
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
                    behavior:"smooth",

                    block:"start"
                });

            }
        );

    }
);


/* =========================================================
   REDUCED MOTION SUPPORT
========================================================= */

const prefersReducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );


if (
    prefersReducedMotion.matches
) {

    if (krishnaBackground) {

        krishnaBackground.style.transform =
            "none";

    }

}
