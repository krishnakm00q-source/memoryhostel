/* =========================================================
   MEMORY GROUP — MAIN WEBSITE SCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  /* =========================================================
     CONFIG
     ========================================================= */

  const HOSTEL_PATHS = {
    memory1: "hostels/memory-1/",
    memory2: "hostels/memory-2/",
    memory3: "hostels/memory-3/"
  };

  const WHATSAPP_NUMBER = "919576210396";
  const CALL_NUMBER = "918789934663";

  /*
    IMPORTANT:
    These are the images currently inside /memory-photos/
  */
  const MEMORY_PHOTOS = [
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
    "WhatsApp Image 2026-09-26 at 4.36.56 PM (2).jpeg",
    "WhatsApp Image 2026-09-26 at 4.36.57 PM.jpeg",
    "WhatsApp Image 2026-09-26 at 4.36.58 PM.jpeg",
    "b51d30b1-b2b0-4170-9810-ba2b747b9e54.jpg"
  ];


  /* =========================================================
     HELPERS
     ========================================================= */

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];

  const isReducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;


  /* =========================================================
     NAVIGATION
     ========================================================= */

  const navbar = $("[data-navbar], .navbar, header");

  function updateNavbar() {
    if (!navbar) return;

    if (window.scrollY > 30) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", updateNavbar, {
    passive: true
  });

  updateNavbar();


  /* =========================================================
     MOBILE MENU
     ========================================================= */

  const menuButton = $(
    ".menu-toggle, .mobile-menu-toggle, [data-menu-toggle]"
  );

  const mobileMenu = $(
    ".mobile-menu, .nav-mobile, [data-mobile-menu]"
  );

  if (menuButton && mobileMenu) {

    menuButton.addEventListener("click", () => {

      const isOpen = mobileMenu.classList.toggle("active");

      menuButton.classList.toggle("active", isOpen);

      menuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      document.body.classList.toggle(
        "menu-open",
        isOpen
      );
    });


    /* Close menu after clicking link */

    $$(".mobile-menu a, .nav-mobile a", mobileMenu).forEach(
      link => {
        link.addEventListener("click", () => {

          mobileMenu.classList.remove("active");

          menuButton.classList.remove("active");

          menuButton.setAttribute(
            "aria-expanded",
            "false"
          );

          document.body.classList.remove(
            "menu-open"
          );
        });
      }
    );
  }


  /* =========================================================
     SMOOTH SCROLL
     ========================================================= */

  $$('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

      const targetId =
        link.getAttribute("href");

      if (
        !targetId ||
        targetId === "#" ||
        targetId.length < 2
      ) {
        return;
      }

      const target =
        document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      const navbarHeight =
        navbar ? navbar.offsetHeight : 0;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        navbarHeight -
        20;

      if (isReducedMotion()) {
        window.scrollTo(
          0,
          targetPosition
        );
      } else {
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });
      }
    });
  });


  /* =========================================================
     HOSTEL PAGE LINKS
     ========================================================= */

  function setupHostelLinks() {

    const memory1Links = $$(
      '[data-hostel="memory-1"], [data-hostel="memory1"]'
    );

    const memory2Links = $$(
      '[data-hostel="memory-2"], [data-hostel="memory2"]'
    );

    const memory3Links = $$(
      '[data-hostel="memory-3"], [data-hostel="memory3"]'
    );


    memory1Links.forEach(link => {
      link.addEventListener("click", () => {
        window.location.href =
          HOSTEL_PATHS.memory1;
      });
    });


    memory2Links.forEach(link => {
      link.addEventListener("click", () => {
        window.location.href =
          HOSTEL_PATHS.memory2;
      });
    });


    memory3Links.forEach(link => {
      link.addEventListener("click", () => {
        window.location.href =
          HOSTEL_PATHS.memory3;
      });
    });
  }

  setupHostelLinks();


  /* =========================================================
     DIRECT HOSTEL CARD SUPPORT
     ========================================================= */

  $$(".hostel-card, .branch-card, .property-card").forEach(
    card => {

      const text =
        card.textContent.toLowerCase();

      let destination = null;

      if (
        text.includes("memory one") ||
        text.includes("memory 1")
      ) {
        destination =
          HOSTEL_PATHS.memory1;
      }

      if (
        text.includes("memory two") ||
        text.includes("memory 2")
      ) {
        destination =
          HOSTEL_PATHS.memory2;
      }

      if (
        text.includes("memory three") ||
        text.includes("memory 3")
      ) {
        destination =
          HOSTEL_PATHS.memory3;
      }

      if (!destination) return;

      const button =
        card.querySelector(
          "a, button, .know-more, .explore"
        );

      if (button) {

        button.addEventListener(
          "click",
          event => {

            if (
              button.tagName.toLowerCase() ===
              "a" &&
              button.getAttribute("href")
            ) {
              return;
            }

            event.preventDefault();

            window.location.href =
              destination;
          }
        );

      } else {

        card.style.cursor = "pointer";

        card.addEventListener(
          "click",
          () => {
            window.location.href =
              destination;
          }
        );
      }
    }
  );


  /* =========================================================
     MEMORY PHOTO GALLERY
     ========================================================= */

  function findGallery() {

    const possibleSelectors = [
      "#memory-gallery",
      "#life-gallery",
      ".memory-gallery",
      ".life-gallery",
      ".gallery-track",
      ".gallery-container",
      "[data-memory-gallery]"
    ];

    for (const selector of possibleSelectors) {

      const element =
        $(selector);

      if (element) {
        return element;
      }
    }

    return null;
  }


  const gallery = findGallery();


  if (gallery) {

    /*
      Determine whether gallery already contains
      a track element.
    */

    let track =
      gallery.querySelector(
        ".gallery-track, .memory-gallery-track"
      );

    if (!track) {

      track =
        document.createElement("div");

      track.className =
        "gallery-track memory-gallery-track";

      gallery.appendChild(track);
    }


    /* Remove loading text */

    const loading =
      gallery.querySelector(
        ".gallery-loading, .loading-memories"
      );

    if (loading) {
      loading.remove();
    }


    /* Build gallery */

    function createGalleryImage(filename) {

      const item =
        document.createElement("div");

      item.className =
        "gallery-item memory-gallery-item";

      const image =
        document.createElement("img");

      image.src =
        "memory-photos/" +
        encodeURIComponent(filename)
          .replace(/%2F/g, "/");

      image.alt =
        "Memory Group community moment";

      image.loading = "lazy";

      image.decoding = "async";

      image.addEventListener(
        "error",
        () => {
          item.remove();
        }
      );

      item.appendChild(image);

      return item;
    }


    /*
      Add images once.
    */

    MEMORY_PHOTOS.forEach(filename => {

      track.appendChild(
        createGalleryImage(filename)
      );

    });


    /*
      Duplicate images for seamless
      infinite scrolling.
    */

    MEMORY_PHOTOS.forEach(filename => {

      track.appendChild(
        createGalleryImage(filename)
      );

    });


    /*
      Auto scrolling.

      CSS animation normally handles this.
      This JS fallback keeps it moving even if
      the CSS animation isn't present.
    */

    let autoScrollAnimation = null;

    function startGalleryScroll() {

      if (
        isReducedMotion() ||
        !track
      ) {
        return;
      }

      if (
        getComputedStyle(track)
          .animationName !== "none"
      ) {
        return;
      }

      let position = 0;

      const speed =
        window.innerWidth < 700
          ? 0.35
          : 0.55;

      function animate() {

        position += speed;

        const halfWidth =
          track.scrollWidth / 2;

        if (position >= halfWidth) {
          position = 0;
        }

        track.style.transform =
          `translate3d(-${position}px,0,0)`;

        autoScrollAnimation =
          requestAnimationFrame(
            animate
          );
      }

      autoScrollAnimation =
        requestAnimationFrame(
          animate
        );
    }


    function stopGalleryScroll() {

      if (autoScrollAnimation) {

        cancelAnimationFrame(
          autoScrollAnimation
        );

        autoScrollAnimation =
          null;
      }
    }


    window.addEventListener(
      "resize",
      () => {

        stopGalleryScroll();

        setTimeout(
          startGalleryScroll,
          300
        );

      }
    );


    /*
      Pause gallery while hovering.
    */

    gallery.addEventListener(
      "mouseenter",
      () => {
        track.classList.add(
          "gallery-paused"
        );
      }
    );

    gallery.addEventListener(
      "mouseleave",
      () => {
        track.classList.remove(
          "gallery-paused"
        );
      }
    );


    startGalleryScroll();
  }


  /* =========================================================
     SCROLL REVEAL
     ========================================================= */

  const revealElements = $$(
    ".reveal, .fade-up, .section, .room-card, .hostel-card, .feature-card"
  );


  if ("IntersectionObserver" in window) {

    const revealObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (!entry.isIntersecting) {
              return;
            }

            entry.target.classList.add(
              "is-visible"
            );

            revealObserver.unobserve(
              entry.target
            );
          });

        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -50px 0px"
        }
      );


    revealElements.forEach(
      element => {
        element.classList.add(
          "reveal-ready"
        );

        revealObserver.observe(
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


  /* =========================================================
     ROOM CARD HOVER EFFECT
     ========================================================= */

  $$(".room-card, .pricing-card").forEach(
    card => {

      card.addEventListener(
        "mousemove",
        event => {

          if (
            window.matchMedia(
              "(pointer: coarse)"
            ).matches
          ) {
            return;
          }

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
              centerY) *
            -2;

          const rotateY =
            ((x - centerX) /
              centerX) *
            2;

          card.style.transform =
            `perspective(900px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-3px)`;
        }
      );


      card.addEventListener(
        "mouseleave",
        () => {

          card.style.transform = "";
        }
      );
    }
  );


  /* =========================================================
     ROOM "KNOW MORE" WHATSAPP
     ========================================================= */

  $$(".room-card, .pricing-card").forEach(
    card => {

      const button =
        card.querySelector(
          ".know-more, .room-link, [data-room]"
        );

      if (!button) return;


      button.addEventListener(
        "click",
        event => {

          const roomName =
            card.dataset.room ||
            card.querySelector(
              "h3, h4, .room-name"
            )?.textContent?.trim() ||
            "room";


          const message =
            `I want to know about this particular room at Memory Group: ${roomName}`;


          const whatsappURL =
            `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;


          if (
            !button.getAttribute("href")
          ) {
            event.preventDefault();

            window.open(
              whatsappURL,
              "_blank",
              "noopener,noreferrer"
            );
          }
        }
      );
    }
  );


  /* =========================================================
     GENERAL WHATSAPP BUTTON
     ========================================================= */

  const whatsappButtons =
    $$(".whatsapp-btn, .whatsapp, [data-whatsapp]");


  whatsappButtons.forEach(
    button => {

      button.addEventListener(
        "click",
        event => {

          if (
            button.tagName.toLowerCase() ===
            "a" &&
            button.getAttribute("href")
          ) {
            return;
          }

          event.preventDefault();


          const message =
            "Hello Memory Group, I want to know more about the rooms and accommodation.";


          const url =
            `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;


          window.open(
            url,
            "_blank",
            "noopener,noreferrer"
          );
        }
      );
    }
  );


  /* =========================================================
     CALL BUTTON
     ========================================================= */

  const callButtons =
    $$(".call-btn, .phone-btn, [data-call]");


  callButtons.forEach(
    button => {

      if (
        button.tagName.toLowerCase() ===
        "a" &&
        button.getAttribute("href")
      ) {
        return;
      }

      button.addEventListener(
        "click",
        event => {

          event.preventDefault();

          window.location.href =
            `tel:+${CALL_NUMBER}`;
        }
      );
    }
  );


  /* =========================================================
     ESC KEY
     ========================================================= */

  document.addEventListener(
    "keydown",
    event => {

      if (event.key !== "Escape") {
        return;
      }

      if (
        mobileMenu &&
        mobileMenu.classList.contains("active")
      ) {

        mobileMenu.classList.remove(
          "active"
        );

        if (menuButton) {
          menuButton.classList.remove(
            "active"
          );

          menuButton.setAttribute(
            "aria-expanded",
            "false"
          );
        }

        document.body.classList.remove(
          "menu-open"
        );
      }
    }
  );


  /* =========================================================
     IMAGE LOAD CHECK
     ========================================================= */

  $$("img").forEach(image => {

    image.addEventListener(
      "error",
      () => {
        image.classList.add(
          "image-error"
        );
      }
    );
  });


  /* =========================================================
     CURRENT YEAR
     ========================================================= */

  $$(".current-year").forEach(
    element => {
      element.textContent =
        new Date().getFullYear();
    }
  );


  /* =========================================================
     PRIVACY + TERMS
     ========================================================= */

  $$(
    'a[href*="privacy"], a[href*="terms"]'
  ).forEach(link => {

    link.addEventListener(
      "click",
      () => {

        /*
          These pages remain normal separate HTML pages.
          No SPA navigation is used.
        */

        document.body.classList.add(
          "leaving-page"
        );
      }
    );
  });


  /* =========================================================
     PAGE LOADED
     ========================================================= */

  document.documentElement.classList.add(
    "js-ready"
  );

  document.body.classList.add(
    "page-loaded"
  );

});
