/* =========================================
   MEMORY GROUP
   MAIN JAVASCRIPT
========================================= */


/* =========================================
   ELEMENTS
========================================= */

const menuButton =
    document.getElementById("menuButton");

const mobileMenu =
    document.getElementById("mobileMenu");

const mobileLinks =
    document.querySelectorAll(
        ".mobile-menu-inner a"
    );


/* =========================================
   MOBILE MENU
========================================= */

if (menuButton && mobileMenu) {

    menuButton.addEventListener(
        "click",
        () => {

            const isActive =
                menuButton.classList.toggle(
                    "active"
                );

            mobileMenu.classList.toggle(
                "active"
            );

            document.body.classList.toggle(
                "menu-open"
            );

            menuButton.setAttribute(
                "aria-expanded",
                isActive ? "true" : "false"
            );

            menuButton.setAttribute(
                "aria-label",
                isActive
                    ? "Close menu"
                    : "Open menu"
            );

        }
    );

}


mobileLinks.forEach(
    (link) => {

        link.addEventListener(
            "click",
            () => {

                if (menuButton) {

                    menuButton.classList.remove(
                        "active"
                    );

                    menuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    menuButton.setAttribute(
                        "aria-label",
                        "Open menu"
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

    }
);


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


const finePointer =
    window.matchMedia(
        "(pointer: fine)"
    );


if (
    krishnaBackground &&
    finePointer.matches &&
    !window.matchMedia(
        "(prefers-reduced-motion: reduce)"
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

        },
        { passive: true }
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
    finePointer.matches &&
    !window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches
) {

    cards.forEach(
        (card) => {

            const image =
                card.querySelector(
                    ".card-image"
                );


            if (!image) {
                return;
            }


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

        }
    );

}


/* =========================================
   IMAGE ERROR CHECK
========================================= */

const images =
    document.querySelectorAll(
        "img"
    );


images.forEach(
    (image) => {

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


/* =========================================
   RESIZE
   CLOSE MOBILE MENU
========================================= */

window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth > 800
        ) {

            if (menuButton) {

                menuButton.classList.remove(
                    "active"
                );

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuButton.setAttribute(
                    "aria-label",
                    "Open menu"
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
   SMOOTH INTERNAL LINKS
========================================= */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(
        (link) => {

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


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        }
    );
