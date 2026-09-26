/* =========================================================
   MEMORY GROUP — SCRIPT.JS
   Existing functionality preserved
========================================================= */


/* =========================================
   MOBILE MENU
========================================= */

const menuButton =
    document.getElementById("menuButton");

const mobileMenu =
    document.getElementById("mobileMenu");

const mobileLinks =
    document.querySelectorAll(
        ".mobile-menu-inner > a"
    );


if (menuButton && mobileMenu) {

    menuButton.addEventListener("click", () => {

        menuButton.classList.toggle("active");

        mobileMenu.classList.toggle("active");

        document.body.classList.toggle(
            "menu-open"
        );

    });

}


mobileLinks.forEach(link => {

    link.addEventListener("click", () => {

        if (menuButton) {
            menuButton.classList.remove("active");
        }

        if (mobileMenu) {
            mobileMenu.classList.remove("active");
        }

        document.body.classList.remove(
            "menu-open"
        );

    });

});



/* =========================================
   KRISHNA BACKGROUND PARALLAX
========================================= */

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
        (event) => {

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



/* =========================================
   HOSTEL CARD TILT
========================================= */

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
            (event) => {

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
                    ((y - centerY) /
                    centerY) * -1.8;


                const rotateY =
                    ((x - centerX) /
                    centerX) * 1.8;


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



/* =========================================
   MEMORY PHOTO GALLERY
   Safe auto-scrolling gallery
========================================= */

const gallery =
    document.querySelector(
        ".memory-gallery"
    );


if (gallery) {

    let galleryPaused = false;


    /* -----------------------------------------
       AUTO SCROLL
    ----------------------------------------- */

    let gallerySpeed = 0.6;


    function autoScrollGallery() {

        if (!galleryPaused) {

            gallery.scrollLeft +=
                gallerySpeed;


            /*
               When reaching the end,
               smoothly return to beginning.
            */

            if (
                gallery.scrollLeft +
                gallery.clientWidth >=
                gallery.scrollWidth - 5
            ) {

                gallery.scrollTo({
                    left: 0,
                    behavior: "smooth"
                });

            }

        }


        requestAnimationFrame(
            autoScrollGallery
        );

    }


    autoScrollGallery();



    /* -----------------------------------------
       PAUSE ON MOUSE HOVER
    ----------------------------------------- */

    gallery.addEventListener(
        "mouseenter",
        () => {

            galleryPaused = true;

        }
    );


    gallery.addEventListener(
        "mouseleave",
        () => {

            galleryPaused = false;

        }
    );



    /* -----------------------------------------
       PAUSE ON TOUCH
       Mobile friendly
    ----------------------------------------- */

    gallery.addEventListener(
        "touchstart",
        () => {

            galleryPaused = true;

        },
        { passive: true }
    );


    gallery.addEventListener(
        "touchend",
        () => {

            setTimeout(() => {

                galleryPaused = false;

            }, 1500);

        },
        { passive: true }
    );

}



/* =========================================
   GALLERY IMAGE LIGHTBOX
   Opens photo when clicked
========================================= */

const galleryImages =
    document.querySelectorAll(
        ".memory-gallery img"
    );


galleryImages.forEach(image => {

    image.addEventListener(
        "click",
        () => {

            const lightbox =
                document.createElement(
                    "div"
                );


            lightbox.className =
                "photo-lightbox";


            const fullImage =
                document.createElement(
                    "img"
                );


            fullImage.src =
                image.src;


            fullImage.alt =
                image.alt || "Memory Group";


            lightbox.appendChild(
                fullImage
            );


            document.body.appendChild(
                lightbox
            );


            document.body.classList.add(
                "lightbox-open"
            );


            lightbox.addEventListener(
                "click",
                () => {

                    lightbox.remove();

                    document.body.classList.remove(
                        "lightbox-open"
                    );

                }
            );

        }
    );

});



/* =========================================
   ESC KEY CLOSES LIGHTBOX
========================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape"
        ) {

            const lightbox =
                document.querySelector(
                    ".photo-lightbox"
                );


            if (lightbox) {

                lightbox.remove();

                document.body.classList.remove(
                    "lightbox-open"
                );

            }

        }

    }
);



/* =========================================
   IMAGE ERROR CHECK
========================================= */

const images =
    document.querySelectorAll(
        "img"
    );


images.forEach(image => {

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



/* =========================================
   PREVENT MOBILE MENU FROM STAYING OPEN
   AFTER RESIZE
========================================= */

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



/* =========================================
   PREVENT BACKGROUND SCROLL
   WHEN MOBILE MENU IS OPEN
========================================= */

const bodyObserver =
    new MutationObserver(() => {

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

    });


bodyObserver.observe(
    document.body,
    {
        attributes: true,
        attributeFilter: [
            "class"
        ]
    }
);



/* =========================================
   SMOOTH ANCHOR SCROLL
========================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(link => {

    link.addEventListener(
        "click",
        function (event) {

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
                behavior: "smooth",
                block: "start"
            });

        }
    );

});



/* =========================================
   REDUCED MOTION SUPPORT
========================================= */

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
