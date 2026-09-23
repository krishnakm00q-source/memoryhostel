/* =========================================================
   MEMORY-2 — SCRIPT.JS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     NAVBAR — SCROLL EFFECT
     ========================================================= */

  const navbar = document.querySelector(".navbar");

  const handleNavbarScroll = () => {
    if (!navbar) return;

    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleNavbarScroll);
  handleNavbarScroll();


  /* =========================================================
     MOBILE MENU
     ========================================================= */

  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  if (menuToggle && mobileMenu) {

    menuToggle.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.toggle("active");

      menuToggle.classList.toggle("active", isOpen);
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");

      document.body.classList.toggle("menu-open", isOpen);
    });

    // Close menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll("a");

    mobileLinks.forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (event) => {
      if (
        mobileMenu.classList.contains("active") &&
        !mobileMenu.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        mobileMenu.classList.remove("active");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
      }
    });

    // Close menu after resizing to desktop
    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) {
        mobileMenu.classList.remove("active");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
      }
    });
  }


  /* =========================================================
     SMOOTH SCROLL
     ========================================================= */

  document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (event) {

      const targetId = this.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      const navbarHeight = navbar
        ? navbar.offsetHeight
        : 0;

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


  /* =========================================================
     ROOM WHATSAPP BUTTONS
     ========================================================= */

  const roomButtons = document.querySelectorAll(".room-whatsapp");

  roomButtons.forEach(button => {

    button.addEventListener("click", () => {

      const phone =
        button.dataset.whatsapp ||
        "919576210396";

      const roomType =
        button.closest(".room-card")
          ?.querySelector(".room-type")
          ?.textContent
          ?.trim() ||
        "room";

      const message =
        `Hello Memory-2, I am interested in the ${roomType}. Please share availability, rent and other details.`;

      const whatsappURL =
        `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

      window.open(whatsappURL, "_blank");

    });

  });


  /* =========================================================
     DRAG SCROLL — ROOM GALLERIES
     ========================================================= */

  const dragContainers =
    document.querySelectorAll("[data-drag-scroll]");

  dragContainers.forEach(container => {

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    container.addEventListener("pointerdown", event => {

      isDown = true;

      container.classList.add("dragging");

      startX = event.clientX;
      scrollLeft = container.scrollLeft;

      try {
        container.setPointerCapture(event.pointerId);
      } catch (error) {}

    });

    container.addEventListener("pointermove", event => {

      if (!isDown) return;

      event.preventDefault();

      const distance = event.clientX - startX;

      container.scrollLeft =
        scrollLeft - distance;

    });

    const stopDragging = event => {

      if (!isDown) return;

      isDown = false;

      container.classList.remove("dragging");

      try {
        container.releasePointerCapture(event.pointerId);
      } catch (error) {}

    };

    container.addEventListener(
      "pointerup",
      stopDragging
    );

    container.addEventListener(
      "pointercancel",
      stopDragging
    );

    container.addEventListener(
      "mouseleave",
      () => {
        isDown = false;
        container.classList.remove("dragging");
      }
    );

  });


  /* =========================================================
     REVIEW SLIDER — DRAG
     ========================================================= */

  const reviewsWindow =
    document.querySelector(".reviews-window");

  const reviewsTrack =
    document.querySelector(".reviews-track");

  if (reviewsWindow && reviewsTrack) {

    let isDragging = false;
    let startX = 0;
    let initialScroll = 0;

    reviewsWindow.addEventListener("pointerdown", event => {

      isDragging = true;

      startX = event.clientX;
      initialScroll = reviewsWindow.scrollLeft;

      reviewsWindow.classList.add("dragging");

      try {
        reviewsWindow.setPointerCapture(event.pointerId);
      } catch (error) {}

    });

    reviewsWindow.addEventListener("pointermove", event => {

      if (!isDragging) return;

      const distance =
        event.clientX - startX;

      reviewsWindow.scrollLeft =
        initialScroll - distance;

    });

    const stopReviewDrag = event => {

      isDragging = false;

      reviewsWindow.classList.remove("dragging");

      try {
        reviewsWindow.releasePointerCapture(event.pointerId);
      } catch (error) {}

    };

    reviewsWindow.addEventListener(
      "pointerup",
      stopReviewDrag
    );

    reviewsWindow.addEventListener(
      "pointercancel",
      stopReviewDrag
    );

  }


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

    if (!question || !answer) return;

    question.addEventListener("click", () => {

      const isActive =
        item.classList.contains("active");

      // Close all other FAQ items
      faqItems.forEach(otherItem => {

        if (otherItem !== item) {

          otherItem.classList.remove("active");

          const otherAnswer =
            otherItem.querySelector(".faq-answer");

          if (otherAnswer) {
            otherAnswer.style.maxHeight = null;
          }

        }

      });

      // Toggle current item
      if (isActive) {

        item.classList.remove("active");
        answer.style.maxHeight = null;

      } else {

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
    document.querySelector(".lightbox-close");

  const galleryImages =
    document.querySelectorAll(
      ".room-gallery img, .waiting-image img"
    );

  if (lightbox && lightboxImage) {

    galleryImages.forEach(image => {

      image.addEventListener("click", () => {

        if (!image.src) return;

        lightboxImage.src = image.src;

        if (image.alt) {
          lightboxImage.alt = image.alt;
        }

        lightbox.classList.add("active");

        document.body.classList.add("lightbox-open");

      });

    });

    const closeLightbox = () => {

      lightbox.classList.remove("active");

      document.body.classList.remove(
        "lightbox-open"
      );

      setTimeout(() => {
        lightboxImage.src = "";
      }, 200);

    };

    if (lightboxClose) {
      lightboxClose.addEventListener(
        "click",
        closeLightbox
      );
    }

    // Close when clicking background
    lightbox.addEventListener("click", event => {

      if (
        event.target === lightbox ||
        event.target === lightboxImage
      ) {
        closeLightbox();
      }

    });

    // Escape key
    document.addEventListener("keydown", event => {

      if (
        event.key === "Escape" &&
        lightbox.classList.contains("active")
      ) {
        closeLightbox();
      }

    });

  }


  /* =========================================================
     IMAGE ERROR HANDLING
     ========================================================= */

  document.querySelectorAll("img").forEach(image => {

    image.addEventListener("error", () => {

      console.warn(
        "Memory-2 image could not be loaded:",
        image.src
      );

    });

  });


  /* =========================================================
     HERO IMAGE — SIMPLE PARALLAX
     ========================================================= */

  const heroImage =
    document.querySelector(".hero-image");

  if (heroImage) {

    const updateParallax = () => {

      const scrollY = window.scrollY;

      if (scrollY <= window.innerHeight) {

        heroImage.style.transform =
          `translateY(${scrollY * 0.12}px)`;

      }

    };

    window.addEventListener(
      "scroll",
      updateParallax,
      { passive: true }
    );

  }


  /* =========================================================
     REVEAL ANIMATION
     ========================================================= */

  const revealElements =
    document.querySelectorAll(
      ".about-grid, .room-card, .meal-time-card, .menu-day, .waiting-grid, .review-card, .location-grid, .faq-item"
    );

  if ("IntersectionObserver" in window) {

    const observer =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "is-visible"
              );

              observer.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.12
        }
      );

    revealElements.forEach(element => {
      observer.observe(element);
    });

  } else {

    revealElements.forEach(element => {
      element.classList.add("is-visible");
    });

  }


  /* =========================================================
     DISABLE IMAGE DRAGGING
     ========================================================= */

  document.querySelectorAll("img").forEach(image => {

    image.setAttribute(
      "draggable",
      "false"
    );

  });


  /* =========================================================
     CONSOLE
     ========================================================= */

  console.log(
    "%cMemory-2 Website Loaded",
    "font-weight:bold;"
  );

});