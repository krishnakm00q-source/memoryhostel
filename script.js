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


menuButton.addEventListener("click", () => {

    menuButton.classList.toggle("active");

    mobileMenu.classList.toggle("active");

    document.body.classList.toggle(
        "menu-open"
    );

});


mobileLinks.forEach(link => {

    link.addEventListener("click", () => {

        menuButton.classList.remove("active");

        mobileMenu.classList.remove("active");

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
   IMAGE ERROR CHECK
========================================= */

const images =
    document.querySelectorAll("img");


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

    }
);