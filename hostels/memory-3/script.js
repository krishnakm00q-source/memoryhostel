/* =========================================================
   MEMORY-3 — SCRIPT.JS
========================================================= */


/* =========================================================
   NAVBAR SCROLL
========================================================= */

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {

    if (!navbar) return;

    if (window.scrollY > 40) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

}, { passive: true });



/* =========================================================
   MOBILE MENU
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

function closeMenu() {

    if (!mobileMenu || !menuToggle) return;

    mobileMenu.classList.remove("active");

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

    document.body.classList.remove("menu-open");

}


if (menuToggle && mobileMenu) {

    menuToggle.addEventListener("click", () => {

        const active =
            mobileMenu.classList.toggle("active");

        menuToggle.setAttribute(
            "aria-expanded",
            active ? "true" : "false"
        );

        document.body.classList.toggle(
            "menu-open",
            active
        );

    });


    mobileMenu
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                closeMenu
            );

        });

}


/* Close menu when screen becomes desktop */

window.addEventListener("resize", () => {

    if (window.innerWidth > 1000) {
        closeMenu();
    }

});



/* =========================================================
   ROOM WHATSAPP BUTTONS
========================================================= */

const ownerNumber = "918789934663";

document
    .querySelectorAll(".room-whatsapp")
    .forEach(button => {

        button.addEventListener("click", () => {

            const roomType =
                button.dataset.room || "room";

            const message =
                `Hello, I want to know about the ${roomType} room at Memory-3. Please share the availability, rent and other details.`;

            const whatsappURL =
                `https://wa.me/${ownerNumber}?text=${encodeURIComponent(message)}`;

            window.open(
                whatsappURL,
                "_blank",
                "noopener"
            );

        });

    });



/* =========================================================
   ROOM GALLERY DRAG / SWIPE
========================================================= */

document
    .querySelectorAll("[data-drag-scroll]")
    .forEach(gallery => {

        let isDown = false;
        let startX = 0;
        let scrollLeft = 0;


        gallery.addEventListener(
            "mousedown",
            event => {

                isDown = true;

                gallery.classList.add("dragging");

                startX = event.pageX -
                    gallery.offsetLeft;

                scrollLeft =
                    gallery.scrollLeft;

            }
        );


        gallery.addEventListener(
            "mouseleave",
            () => {

                isDown = false;

                gallery.classList.remove(
                    "dragging"
                );

            }
        );


        gallery.addEventListener(
            "mouseup",
            () => {

                isDown = false;

                gallery.classList.remove(
                    "dragging"
                );

            }
        );


        gallery.addEventListener(
            "mousemove",
            event => {

                if (!isDown) return;

                event.preventDefault();

                const x =
                    event.pageX -
                    gallery.offsetLeft;

                const walk =
                    (x - startX) * 1.2;

                gallery.scrollLeft =
                    scrollLeft - walk;

            }
        );

    });



/* =========================================================
   LIGHTBOX
========================================================= */

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const lightboxClose =
    document.getElementById("lightboxClose");


document
    .querySelectorAll(".room-gallery img, .about-image img, .dining-photo img, .waiting-image img")
    .forEach(image => {

        image.addEventListener("click", () => {

            if (!lightbox || !lightboxImage) return;

            lightboxImage.src =
                image.src;

            lightboxImage.alt =
                image.alt;

            lightbox.classList.add(
                "active"
            );

            document.body.classList.add(
                "lightbox-open"
            );

        });

    });


function closeLightbox() {

    if (!lightbox) return;

    lightbox.classList.remove(
        "active"
    );

    document.body.classList.remove(
        "lightbox-open"
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

            if (event.target === lightbox) {
                closeLightbox();
            }

        }
    );

}


document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {
            closeLightbox();
            closeMenu();
        }

    }
);



/* =========================================================
   FAQ ACCORDION
========================================================= */

document
    .querySelectorAll(".faq-question")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const item =
                    button.closest(".faq-item");

                if (!item) return;


                document
                    .querySelectorAll(".faq-item")
                    .forEach(otherItem => {

                        if (otherItem !== item) {

                            otherItem.classList.remove(
                                "active"
                            );

                            const otherAnswer =
                                otherItem.querySelector(
                                    ".faq-answer"
                                );

                            if (otherAnswer) {
                                otherAnswer.style.maxHeight =
                                    null;
                            }

                        }

                    });


                item.classList.toggle(
                    "active"
                );


                const answer =
                    item.querySelector(
                        ".faq-answer"
                    );

                if (!answer) return;


                if (item.classList.contains("active")) {

                    answer.style.maxHeight =
                        answer.scrollHeight + "px";

                } else {

                    answer.style.maxHeight =
                        null;

                }

            }
        );

    });



/* =========================================================
   IMAGE ERROR DETECTION
========================================================= */

document
    .querySelectorAll("img")
    .forEach(image => {

        image.addEventListener(
            "error",
            () => {

                console.warn(
                    "Memory-3 image failed to load:",
                    image.src
                );

            }
        );

    });



/* =========================================================
   PREVENT BROKEN HASH SCROLL
========================================================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");

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

                if (!target) return;


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });