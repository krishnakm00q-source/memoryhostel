/* =====================================================
   MOBILE MENU
===================================================== */

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


    mobileLinks.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                menuButton.classList.remove(
                    "active"
                );

                mobileMenu.classList.remove(
                    "active"
                );

                document.body.classList.remove(
                    "menu-open"
                );

            }
        );

    });

}


/* =====================================================
   KRISHNA BACKGROUND PARALLAX
===================================================== */

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
            `translate3d(
                ${currentX}px,
                ${currentY}px,
                0
            ) scale(1.04)`;


        requestAnimationFrame(
            animateBackground
        );

    }


    animateBackground();

}


/* =====================================================
   HOSTEL CARD TILT
===================================================== */

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
                ".card-image img"
            );


        card.addEventListener(
            "mousemove",
            event => {

                if (!image) return;

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
                    `scale(1.045)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                if (!image) return;

                image.style.transform =
                    "scale(1) rotateX(0deg) rotateY(0deg)";

            }
        );

    });

}


/* =====================================================
   MOMENTS GALLERY
=====================================================

   IMPORTANT:

   Browser JavaScript cannot automatically read
   every file inside "memory-photos/" on GitHub Pages.

   Keep your existing filenames unchanged.

   After you upload the folder, put the exact filenames
   in this array.

===================================================== */

const galleryPhotos = [

    /*
    Example:

    "memory-photos/WhatsApp Image 2026-09-26 at 4.36.49 PM.jpg",
    "memory-photos/WhatsApp Image 2026-09-26 at 4.36.50 PM (1).jpg",
    "memory-photos/WhatsApp Image 2026-09-26 at 4.36.50 PM (2).jpg",

    DO NOT rename the actual files.
    Only put their existing filenames here.
    */

];


/* =====================================================
   CREATE GALLERY
===================================================== */

const galleryTrack =
    document.getElementById(
        "galleryTrack"
    );


const lightbox =
    document.getElementById(
        "lightbox"
    );

const lightboxImage =
    document.getElementById(
        "lightboxImage"
    );

const lightboxClose =
    document.getElementById(
        "lightboxClose"
    );

const lightboxPrev =
    document.getElementById(
        "lightboxPrev"
    );

const lightboxNext =
    document.getElementById(
        "lightboxNext"
    );


let currentGalleryIndex = 0;


function createGallery() {

    if (!galleryTrack) return;

    galleryTrack.innerHTML = "";


    /*
       Duplicate the photos.

       This creates the seamless infinite
       scrolling effect.
    */

    const photos =
        [
            ...galleryPhotos,
            ...galleryPhotos
        ];


    photos.forEach(
        (photo, index) => {

            const item =
                document.createElement(
                    "div"
                );

            item.className =
                "gallery-item";


            const image =
                document.createElement(
                    "img"
                );


            image.src = photo;

            image.alt =
                "Memory Group moment";


            image.loading =
                index < 5
                    ? "eager"
                    : "lazy";


            item.appendChild(
                image
            );


            item.addEventListener(
                "click",
                () => {

                    if (
                        galleryPhotos.length === 0
                    ) {
                        return;
                    }


                    currentGalleryIndex =
                        index %
                        galleryPhotos.length;


                    openLightbox();

                }
            );


            galleryTrack.appendChild(
                item
            );

        }
    );

}


createGallery();


/* =====================================================
   AUTO SCROLL
===================================================== */

let galleryPosition = 0;

let gallerySpeed = 0.45;

let galleryPaused = false;


function animateGallery() {

    if (
        galleryTrack &&
        galleryPhotos.length > 0 &&
        !galleryPaused
    ) {

        galleryPosition -=
            gallerySpeed;


        const firstSetWidth =
            galleryTrack.scrollWidth / 2;


        if (
            Math.abs(galleryPosition) >=
            firstSetWidth
        ) {

            galleryPosition = 0;

        }


        galleryTrack.style.transform =
            `translate3d(
                ${galleryPosition}px,
                0,
                0
            )`;

    }


    requestAnimationFrame(
        animateGallery
    );

}


animateGallery();


/* =====================================================
   PAUSE WHEN TOUCHING / HOVERING
===================================================== */

if (galleryTrack) {

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

        }
    );


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

            setTimeout(
                () => {

                    galleryPaused = false;

                },
                1500
            );

        },
        {
            passive: true
        }
    );

}


/* =====================================================
   LIGHTBOX
===================================================== */

function openLightbox() {

    if (
        !galleryPhotos.length ||
        !lightbox ||
        !lightboxImage
    ) {
        return;
    }


    lightboxImage.src =
        galleryPhotos[
            currentGalleryIndex
        ];


    lightbox.classList.add(
        "active"
    );


    lightbox.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";

}


function closeLightbox() {

    if (!lightbox) return;


    lightbox.classList.remove(
        "active"
    );


    lightbox.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        "";

}


function showPrevious() {

    if (!galleryPhotos.length)
        return;


    currentGalleryIndex--;

    if (
        currentGalleryIndex < 0
    ) {

        currentGalleryIndex =
            galleryPhotos.length - 1;

    }


    lightboxImage.src =
        galleryPhotos[
            currentGalleryIndex
        ];

}


function showNext() {

    if (!galleryPhotos.length)
        return;


    currentGalleryIndex++;

    if (
        currentGalleryIndex >=
        galleryPhotos.length
    ) {

        currentGalleryIndex = 0;

    }


    lightboxImage.src =
        galleryPhotos[
            currentGalleryIndex
        ];

}


if (lightboxClose) {

    lightboxClose.addEventListener(
        "click",
        closeLightbox
    );

}


if (lightboxPrev) {

    lightboxPrev.addEventListener(
        "click",
        showPrevious
    );

}


if (lightboxNext) {

    lightboxNext.addEventListener(
        "click",
        showNext
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


/* =====================================================
   KEYBOARD LIGHTBOX
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            !lightbox ||
            !lightbox.classList.contains(
                "active"
            )
        ) {
            return;
        }


        if (event.key === "Escape") {

            closeLightbox();

        }


        if (event.key === "ArrowLeft") {

            showPrevious();

        }


        if (event.key === "ArrowRight") {

            showNext();

        }

    }
);


/* =====================================================
   IMAGE ERROR CHECK
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
   PREVENT MOBILE MENU AFTER RESIZE
===================================================== */

window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth > 800
        ) {

            if (menuButton)
                menuButton.classList.remove(
                    "active"
                );

            if (mobileMenu)
                mobileMenu.classList.remove(
                    "active"
                );

            document.body.classList.remove(
                "menu-open"
            );

        }

    }
);
