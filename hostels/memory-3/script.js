/* =====================================================
   MEMORY-3 — SCRIPT.JS
===================================================== */

document.addEventListener("DOMContentLoaded", () => {


  /* =====================================================
     NAVBAR SCROLL
  ===================================================== */

  const navbar =
    document.querySelector(".navbar");


  function updateNavbar() {

    if (!navbar) return;

    if (window.scrollY > 40) {

      navbar.classList.add("scrolled");

    } else {

      navbar.classList.remove("scrolled");

    }

  }


  window.addEventListener(
    "scroll",
    updateNavbar,
    { passive: true }
  );


  updateNavbar();



  /* =====================================================
     MOBILE MENU
  ===================================================== */

  const menuToggle =
    document.getElementById("menuToggle");

  const mobileMenu =
    document.getElementById("mobileMenu");


  if (menuToggle && mobileMenu) {


    menuToggle.addEventListener(
      "click",
      () => {

        const isOpen =
          mobileMenu.classList.toggle("active");


        menuToggle.classList.toggle(
          "active",
          isOpen
        );


        menuToggle.setAttribute(
          "aria-expanded",
          isOpen ? "true" : "false"
        );


        document.body.classList.toggle(
          "menu-open",
          isOpen
        );

      }
    );


    mobileMenu
      .querySelectorAll("a")
      .forEach(link => {

        link.addEventListener(
          "click",
          () => {

            mobileMenu.classList.remove(
              "active"
            );

            menuToggle.classList.remove(
              "active"
            );

            menuToggle.setAttribute(
              "aria-expanded",
              "false"
            );

            document.body.classList.remove(
              "menu-open"
            );

          }
        );

      });


    document.addEventListener(
      "click",
      event => {

        if (
          mobileMenu.classList.contains("active") &&
          !mobileMenu.contains(event.target) &&
          !menuToggle.contains(event.target)
        ) {

          mobileMenu.classList.remove(
            "active"
          );

          menuToggle.classList.remove(
            "active"
          );

          menuToggle.setAttribute(
            "aria-expanded",
            "false"
          );

          document.body.classList.remove(
            "menu-open"
          );

        }

      }
    );

  }



  /* =====================================================
     SMOOTH SCROLL
  ===================================================== */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

      link.addEventListener(
        "click",
        function(event) {

          const targetId =
            this.getAttribute("href");


          if (
            !targetId ||
            targetId === "#"
          ) return;


          const target =
            document.querySelector(targetId);


          if (!target) return;


          event.preventDefault();


          const navbarHeight =
            navbar
              ? navbar.offsetHeight
              : 0;


          const position =
            target.getBoundingClientRect().top +
            window.scrollY -
            navbarHeight;


          window.scrollTo({
            top: position,
            behavior: "smooth"
          });

        }
      );

    });



  /* =====================================================
     ROOM → OWNER WHATSAPP
  ===================================================== */

  const roomButtons =
    document.querySelectorAll(
      ".room-whatsapp"
    );


  roomButtons.forEach(button => {

    button.addEventListener(
      "click",
      () => {


        /* OWNER NUMBER */

        const ownerNumber =
          "919576210396";


        /* ROOM NAME */

        const roomType =
          button.dataset.room ||
          "room";


        /* MESSAGE */

        const message =
          `Hello, I want to know about the ${roomType} room at Memory-3. Please share the availability, rent and other details.`;


        /* WHATSAPP URL */

        const whatsappURL =
          `https://wa.me/${ownerNumber}?text=${encodeURIComponent(message)}`;


        /* OPEN */

        window.open(
          whatsappURL,
          "_blank",
          "noopener,noreferrer"
        );

      }
    );

  });



  /* =====================================================
     ROOM IMAGE DRAG SCROLL
  ===================================================== */

  document
    .querySelectorAll(
      "[data-drag-scroll]"
    )
    .forEach(container => {


      let isDown = false;
      let startX = 0;
      let scrollLeft = 0;


      container.addEventListener(
        "pointerdown",
        event => {

          isDown = true;

          startX =
            event.clientX;

          scrollLeft =
            container.scrollLeft;

          container.classList.add(
            "dragging"
          );

        }
      );


      container.addEventListener(
        "pointermove",
        event => {

          if (!isDown) return;


          const distance =
            event.clientX - startX;


          container.scrollLeft =
            scrollLeft - distance;

        }
      );


      const stopDragging = () => {

        isDown = false;

        container.classList.remove(
          "dragging"
        );

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
        stopDragging
      );

    });



  /* =====================================================
     REVIEWS DRAG
  ===================================================== */

  const reviewsWindow =
    document.querySelector(
      ".reviews-window"
    );


  if (reviewsWindow) {

    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;


    reviewsWindow.addEventListener(
      "pointerdown",
      event => {

        isDragging = true;

        startX =
          event.clientX;

        scrollLeft =
          reviewsWindow.scrollLeft;

        reviewsWindow.classList.add(
          "dragging"
        );

      }
    );


    reviewsWindow.addEventListener(
      "pointermove",
      event => {

        if (!isDragging) return;


        const distance =
          event.clientX - startX;


        reviewsWindow.scrollLeft =
          scrollLeft - distance;

      }
    );


    const stopReviewDrag = () => {

      isDragging = false;

      reviewsWindow.classList.remove(
        "dragging"
      );

    };


    reviewsWindow.addEventListener(
      "pointerup",
      stopReviewDrag
    );


    reviewsWindow.addEventListener(
      "pointercancel",
      stopReviewDrag
    );


    reviewsWindow.addEventListener(
      "mouseleave",
      stopReviewDrag
    );

  }



  /* =====================================================
     FAQ
  ===================================================== */

  const faqItems =
    document.querySelectorAll(
      ".faq-item"
    );


  faqItems.forEach(item => {

    const question =
      item.querySelector(
        ".faq-question"
      );


    const answer =
      item.querySelector(
        ".faq-answer"
      );


    if (!question || !answer) return;


    question.addEventListener(
      "click",
      () => {


        const isActive =
          item.classList.contains(
            "active"
          );


        faqItems.forEach(otherItem => {

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


        if (isActive) {

          item.classList.remove(
            "active"
          );

          answer.style.maxHeight =
            null;

        } else {

          item.classList.add(
            "active"
          );

          answer.style.maxHeight =
            answer.scrollHeight +
            "px";

        }

      }
    );

  });



  /* =====================================================
     LIGHTBOX
  ===================================================== */

  const lightbox =
    document.getElementById(
      "lightbox"
    );


  const lightboxImage =
    document.getElementById(
      "lightboxImage"
    );


  const lightboxClose =
    document.querySelector(
      ".lightbox-close"
    );


  if (lightbox && lightboxImage) {


    document
      .querySelectorAll(
        ".room-gallery img, .waiting-image img"
      )
      .forEach(image => {

        image.addEventListener(
          "click",
          () => {

            lightboxImage.src =
              image.src;

            lightboxImage.alt =
              image.alt || "";


            lightbox.classList.add(
              "active"
            );


            document.body.classList.add(
              "lightbox-open"
            );

          }
        );

      });


    const closeLightbox = () => {

      lightbox.classList.remove(
        "active"
      );


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


    lightbox.addEventListener(
      "click",
      event => {

        if (
          event.target === lightbox ||
          event.target === lightboxImage
        ) {

          closeLightbox();

        }

      }
    );


    document.addEventListener(
      "keydown",
      event => {

        if (
          event.key === "Escape" &&
          lightbox.classList.contains(
            "active"
          )
        ) {

          closeLightbox();

        }

      }
    );

  }



  /* =====================================================
     IMAGE ERROR HANDLING
  ===================================================== */

  document
    .querySelectorAll("img")
    .forEach(image => {

      image.setAttribute(
        "draggable",
        "false"
      );


      image.addEventListener(
        "error",
        () => {

          console.warn(
            "Memory-3 image could not be loaded:",
            image.src
          );

        }
      );

    });



  /* =====================================================
     HERO PARALLAX
  ===================================================== */

  const heroImage =
    document.querySelector(
      ".hero-image"
    );


  if (heroImage) {

    window.addEventListener(
      "scroll",
      () => {

        if (
          window.scrollY <=
          window.innerHeight
        ) {

          heroImage.style.transform =
            `translateY(${window.scrollY * 0.10}px)`;

        }

      },
      { passive: true }
    );

  }



  /* =====================================================
     REVEAL ANIMATION
  ===================================================== */

  const revealElements =
    document.querySelectorAll(
      ".about-grid, .room-card, .meal-time-card, .menu-day, .waiting-grid, .review-card, .location-grid, .faq-item"
    );


  if (
    "IntersectionObserver" in window
  ) {


    const observer =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (
              entry.isIntersecting
            ) {

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


    revealElements.forEach(
      element => {

        observer.observe(
          element
        );

      }
    );


  } else {

    revealElements.forEach(
      element => {

        element.classList.add(
          "is-visible"
        );

      }
    );

  }


  console.log(
    "%cMemory-3 Website Loaded",
    "font-weight:bold;"
  );

});