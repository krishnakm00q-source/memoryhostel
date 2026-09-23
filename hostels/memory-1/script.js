/* =========================================================
   MEMORY-1
   JAVASCRIPT
========================================================= */


/* =========================================================
   NAVBAR
========================================================= */

const navbar = document.getElementById("navbar");

function handleNavbar() {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", handleNavbar);

handleNavbar();


/* =========================================================
   MOBILE MENU
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

function closeMobileMenu() {
  menuToggle.classList.remove("active");
  mobileMenu.classList.remove("open");
  document.body.style.overflow = "";
}

menuToggle.addEventListener("click", () => {

  const isOpen = mobileMenu.classList.toggle("open");

  menuToggle.classList.toggle("active", isOpen);

  if (isOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }

});


document
  .querySelectorAll(".mobile-menu-inner a")
  .forEach(link => {

    link.addEventListener("click", () => {
      closeMobileMenu();
    });

  });


/* =========================================================
   ROOM WHATSAPP BUTTONS
========================================================= */

const whatsappNumber = "919576210396";

document
  .querySelectorAll("[data-whatsapp]")
  .forEach(button => {

    button.addEventListener("click", () => {

      const message = button.dataset.whatsapp;

      const whatsappURL =
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

      window.location.href = whatsappURL;

    });

  });


/* =========================================================
   ROOM HORIZONTAL DRAG SCROLL
========================================================= */

document
  .querySelectorAll("[data-drag-scroll]")
  .forEach(slider => {

    let isDown = false;
    let startX = 0;
    let startScrollLeft = 0;

    slider.addEventListener("mousedown", event => {

      isDown = true;

      slider.classList.add("dragging");

      startX = event.pageX - slider.offsetLeft;

      startScrollLeft = slider.scrollLeft;

    });


    slider.addEventListener("mouseleave", () => {

      isDown = false;

      slider.classList.remove("dragging");

    });


    slider.addEventListener("mouseup", () => {

      isDown = false;

      slider.classList.remove("dragging");

    });


    slider.addEventListener("mousemove", event => {

      if (!isDown) return;

      event.preventDefault();

      const x = event.pageX - slider.offsetLeft;

      const walk = (x - startX) * 1.25;

      slider.scrollLeft = startScrollLeft - walk;

    });

  });


/* =========================================================
   REVIEWS AUTO SCROLL
========================================================= */

const reviewScroll = document.getElementById("reviewScroll");
const reviewTrack = document.getElementById("reviewTrack");

let reviewPosition = 0;

const reviewSpeed = 0.32;

let reviewPaused = false;

function animateReviews() {

  if (!reviewPaused) {

    reviewPosition += reviewSpeed;

    const firstSetWidth =
      reviewTrack.scrollWidth / 2;

    if (reviewPosition >= firstSetWidth) {
      reviewPosition = 0;
    }

    reviewTrack.style.transform =
      `translate3d(${-reviewPosition}px, 0, 0)`;

  }

  requestAnimationFrame(animateReviews);
}

animateReviews();


/* Pause on desktop hover */

reviewScroll.addEventListener("mouseenter", () => {
  reviewPaused = true;
});

reviewScroll.addEventListener("mouseleave", () => {
  reviewPaused = false;
});


/* Pause briefly on touch */

reviewScroll.addEventListener("touchstart", () => {

  reviewPaused = true;

  clearTimeout(window.reviewTouchTimer);

}, {
  passive: true
});


reviewScroll.addEventListener("touchend", () => {

  clearTimeout(window.reviewTouchTimer);

  window.reviewTouchTimer = setTimeout(() => {
    reviewPaused = false;
  }, 1200);

}, {
  passive: true
});


/* =========================================================
   FAQ ACCORDION
========================================================= */

const faqItems =
  document.querySelectorAll(".faq-item");


faqItems.forEach(item => {

  const question =
    item.querySelector(".faq-question");

  const answer =
    item.querySelector(".faq-answer");


  question.addEventListener("click", () => {

    const isActive =
      item.classList.contains("active");


    faqItems.forEach(otherItem => {

      otherItem.classList.remove("active");

      const otherAnswer =
        otherItem.querySelector(".faq-answer");

      otherAnswer.style.maxHeight = null;

    });


    if (!isActive) {

      item.classList.add("active");

      answer.style.maxHeight =
        answer.scrollHeight + "px";

    }

  });

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


/*
  If you later add:
  class="open-menu-image"
  to any food menu image,
  the lightbox will automatically work.
*/

document
  .querySelectorAll(".open-menu-image")
  .forEach(image => {

    image.addEventListener("click", () => {

      lightboxImage.src = image.src;

      lightbox.classList.add("open");

      document.body.style.overflow = "hidden";

    });

  });


function closeLightbox() {

  lightbox.classList.remove("open");

  document.body.style.overflow = "";

  lightboxImage.src = "";

}


lightboxClose.addEventListener(
  "click",
  closeLightbox
);


lightbox.addEventListener("click", event => {

  if (event.target === lightbox) {
    closeLightbox();
  }

});


document.addEventListener("keydown", event => {

  if (
    event.key === "Escape" &&
    lightbox.classList.contains("open")
  ) {
    closeLightbox();
  }

});


/* =========================================================
   PREVENT IMAGE DRAG
========================================================= */

document
  .querySelectorAll("img")
  .forEach(image => {

    image.addEventListener("dragstart", event => {
      event.preventDefault();
    });

  });


/* =========================================================
   SMOOTH INTERNAL LINKS
========================================================= */

document
  .querySelectorAll('a[href^="#"]')
  .forEach(link => {

    link.addEventListener("click", event => {

      const targetId =
        link.getAttribute("href");

      if (
        !targetId ||
        targetId === "#"
      ) {
        return;
      }

      const target =
        document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });


/* =========================================================
   RESIZE SAFETY
========================================================= */

window.addEventListener("resize", () => {

  /*
    Close mobile menu if screen becomes desktop.
  */

  if (window.innerWidth > 850) {
    closeMobileMenu();
  }

});