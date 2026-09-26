```javascript
document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     ELEMENTS
  ========================================================= */

  const header = document.querySelector(".site-header");
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  /* =========================================================
     NAVBAR — SCROLL EFFECT
  ========================================================= */

  const updateHeader = () => {

    if (!header) return;

    header.classList.toggle(
      "scrolled",
      window.scrollY > 24
    );

  };

  updateHeader();

  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );


  /* =========================================================
     MOBILE NAVBAR
  ========================================================= */

  const closeMenu = () => {

    if (navToggle) {

      navToggle.classList.remove("active");

      navToggle.setAttribute(
        "aria-expanded",
        "false"
      );

      navToggle.setAttribute(
        "aria-label",
        "Open menu"
      );
    }

    if (navLinks) {
      navLinks.classList.remove("open");
    }

    document.body.classList.remove(
      "menu-open"
    );

  };


  const openMenu = () => {

    if (navToggle) {

      navToggle.classList.add("active");

      navToggle.setAttribute(
        "aria-expanded",
        "true"
      );

      navToggle.setAttribute(
        "aria-label",
        "Close menu"
      );
    }

    if (navLinks) {
      navLinks.classList.add("open");
    }

    document.body.classList.add(
      "menu-open"
    );

  };


  if (navToggle && navLinks) {

    navToggle.addEventListener(
      "click",
      () => {

        const isOpen =
          navLinks.classList.contains("open");

        if (isOpen) {
          closeMenu();
        } else {
          openMenu();
        }

      }
    );


    navLinks
      .querySelectorAll("a")
      .forEach(link => {

        link.addEventListener(
          "click",
          () => {

            closeMenu();

          }
        );

      });

  }


  /* =========================================================
     CLOSE MENU WHEN CLICKING OUTSIDE
  ========================================================= */

  document.addEventListener(
    "click",
    event => {

      if (!navLinks || !navToggle) return;

      const clickedInsideMenu =
        navLinks.contains(event.target);

      const clickedToggle =
        navToggle.contains(event.target);

      if (
        navLinks.classList.contains("open") &&
        !clickedInsideMenu &&
        !clickedToggle
      ) {

        closeMenu();

      }

    }
  );


  /* =========================================================
     ESC KEY
  ========================================================= */

  document.addEventListener(
    "keydown",
    event => {

      if (event.key === "Escape") {

        closeMenu();

      }

    }
  );


  /* =========================================================
     RESIZE
  ========================================================= */

  window.addEventListener(
    "resize",
    () => {

      if (window.innerWidth > 800) {

        closeMenu();

      }

    },
    { passive: true }
  );


  /* =========================================================
     SMOOTH ANCHOR SCROLL
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
            document.querySelector(targetId);

          if (!target) return;

          event.preventDefault();

          const headerHeight =
            header
              ? header.offsetHeight
              : 0;

          const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
          });

        }
      );

    });


  /* =========================================================
     KRISHNA HERO PARALLAX
     DESKTOP ONLY
  ========================================================= */

  const hero =
    document.querySelector(".hero");

  const heroBg =
    document.querySelector(".hero-bg");

  if (
    hero &&
    heroBg &&
    !window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
  ) {

    hero.addEventListener(
      "pointermove",
      event => {

        if (window.innerWidth < 900) {
          return;
        }

        const rect =
          hero.getBoundingClientRect();

        const x =
          (
            (event.clientX - rect.left) /
            rect.width -
            0.5
          ) * 8;

        const y =
          (
            (event.clientY - rect.top) /
            rect.height -
            0.5
          ) * 5;

        heroBg.style.transform =
          `scale(1.055) translate3d(${x}px, ${y}px, 0)`;

      }
    );


    hero.addEventListener(
      "pointerleave",
      () => {

        heroBg.style.transform =
          "scale(1.035)";

      }
    );

  }


  /* =========================================================
     REVEAL ANIMATION
  ========================================================= */

  const revealItems =
    document.querySelectorAll(
      ".room-card, " +
      ".hostel-card, " +
      ".event-card, " +
      ".owner-content, " +
      ".memory-copy, " +
      ".philosophy-grid > div"
    );


  if (
    "IntersectionObserver" in window
  ) {

    const observer =
      new IntersectionObserver(
        (entries, obs) => {

          entries.forEach(entry => {

            if (
              !entry.isIntersecting
            ) {
              return;
            }

            entry.target.classList.add(
              "is-visible"
            );

            obs.unobserve(
              entry.target
            );

          });

        },
        {
          threshold: 0.12
        }
      );


    revealItems.forEach(
      item => observer.observe(item)
    );

  }


  /* =========================================================
     MOMENTS THAT STAY
     GITHUB GALLERY
  ========================================================= */

  const galleryTrack =
    document.getElementById(
      "memoryGallery"
    );

  const galleryWindow =
    document.querySelector(
      ".gallery-window"
    );


  const galleryApi =
    "https://api.github.com/repos/" +
    "krishnakm00q-source/memoryhostel/" +
    "contents/memory-photos";


  const imageExtensions =
    /\.(jpe?g|png|webp|gif|avif)$/i;


  /* =========================================================
     CREATE GALLERY IMAGE
  ========================================================= */

  const makeGalleryItem =
    file => {

      const item =
        document.createElement(
          "figure"
        );

      item.className =
        "gallery-item";


      const img =
        document.createElement(
          "img"
        );

      img.src =
        file.download_url;

      img.alt =
        "Life at Memory";

      img.loading =
        "lazy";

      img.decoding =
        "async";


      item.appendChild(img);

      return item;

    };


  /* =========================================================
     FALLBACK IMAGE LIST
     ========================================================= */

  const galleryFallbackFiles = [

    "WhatsApp Image 2026-09-26 at 4.36.49 PM.jpeg",

    "WhatsApp Image 2026-09-26 at 4.36.50 PM (1).jpeg",

    "WhatsApp Image 2026-09-26 at 4.36.50 PM (2).jpeg",

    "WhatsApp Image 2026-09-26 at 4.36.50 PM.jpeg",

    "WhatsApp Image 2026-09-26 at 4.36.51 PM (1).jpeg",

    "WhatsApp Image 2026-09-26 at 4.36.51 PM (2).jpeg",

    "WhatsApp Image 2026-09-26 at 4.36.51 PM.jpeg",

    "WhatsApp Image 2026-09-26 at 4.36.52 PM (1).jpeg",

    "WhatsApp Image 2026-09-26 at 4.36.52 PM (2).jpeg",

    "WhatsApp Image 2026-09-26 at 4.36.52 PM.jpeg",

    "WhatsApp Image 2026-09-26 at 4.36.56 PM (1).jpeg",

    "WhatsApp Image 2026-09-26 at 4.36.56 PM (2).jpeg",

    "WhatsApp Image 2026-09-26 at 4.36.56 PM.jpeg",

    "WhatsApp Image 2026-09-26 at 4.36.57 PM.jpeg",

    "WhatsApp Image 2026-09-26 at 4.36.58 PM.jpeg",

    "b51d30b1-b2b0-4170-9810-ba2b747b9e54.jpg"

  ];


  /* =========================================================
     FALLBACK GALLERY ITEM
  ========================================================= */

  const makeFallbackItem =
    filename => {

      const item =
        document.createElement(
          "figure"
        );

      item.className =
        "gallery-item";


      const img =
        document.createElement(
          "img"
        );


      img.src =
        "memory-photos/" +
        encodeURIComponent(
          filename
        );


      img.alt =
        "Life at Memory";


      img.loading =
        "lazy";

      img.decoding =
        "async";


      item.appendChild(img);

      return item;

    };


  /* =========================================================
     START AUTO SCROLL
  ========================================================= */

  const startGallery =
    () => {

      if (!galleryTrack) {
        return;
      }


      const items =
        [
          ...galleryTrack.querySelectorAll(
            ".gallery-item"
          )
        ];


      if (items.length < 2) {
        return;
      }


      if (
        window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches
      ) {
        return;
      }


      /*
       * Duplicate the complete first set.
       */

      items.forEach(
        item => {

          const clone =
            item.cloneNode(true);

          clone
            .querySelectorAll("img")
            .forEach(img => {

              img.loading =
                "eager";

            });

          galleryTrack.appendChild(
            clone
          );

        }
      );


      let position = 0;

      let last =
        performance.now();

      let paused = false;


      const pause =
        () => {

          paused = true;

        };


      const resume =
        () => {

          paused = false;

          last =
            performance.now();

        };


      /*
       * Desktop hover
       */

      if (galleryWindow) {

        galleryWindow.addEventListener(
          "mouseenter",
          pause
        );

        galleryWindow.addEventListener(
          "mouseleave",
          resume
        );


        /*
         * Mobile touch
         */

        galleryWindow.addEventListener(
          "touchstart",
          pause,
          {
            passive: true
          }
        );


        galleryWindow.addEventListener(
          "touchend",
          () => {

            setTimeout(
              resume,
              1000
            );

          },
          {
            passive: true
          }
        );

      }


      const firstSetWidth =
        () => {

          const all =
            [
              ...galleryTrack.children
            ];

          const half =
            Math.floor(
              all.length / 2
            );


          const gap =
            parseFloat(
              getComputedStyle(
                galleryTrack
              ).gap
            ) || 0;


          return all
            .slice(
              0,
              half
            )
            .reduce(
              (
                total,
                element
              ) => {

                return (
                  total +
                  element.getBoundingClientRect().width
                );

              },
              0
            )
            +
            Math.max(
              0,
              half - 1
            ) *
            gap;

        };


      const animate =
        now => {

          const delta =
            Math.min(
              now - last,
              40
            );

          last = now;


          if (!paused) {

            /*
             * Mobile = slightly slower
             * Desktop = slightly faster
             */

            const speed =
              window.innerWidth <= 768
                ? 0.025
                : 0.035;


            position +=
              delta * speed;


            const loopWidth =
              firstSetWidth();


            if (
              loopWidth > 0 &&
              position >= loopWidth
            ) {

              position -=
                loopWidth;

            }


            galleryTrack.style.transform =
              `translate3d(${-position}px, 0, 0)`;

          }


          requestAnimationFrame(
            animate
          );

        };


      requestAnimationFrame(
        animate
      );

    };


  /* =========================================================
     RENDER FALLBACK
  ========================================================= */

  const renderFallbackGallery =
    () => {

      if (!galleryTrack) {
        return;
      }


      galleryTrack.innerHTML =
        "";


      galleryFallbackFiles.forEach(
        filename => {

          galleryTrack.appendChild(
            makeFallbackItem(
              filename
            )
          );

        }
      );


      startGallery();

    };


  /* =========================================================
     LOAD GALLERY
  ========================================================= */

  const loadGallery =
    async () => {

      if (!galleryTrack) {
        return;
      }


      try {

        const response =
          await fetch(
            galleryApi,
            {
              headers: {
                Accept:
                  "application/vnd.github+json"
              }
            }
          );


        if (!response.ok) {

          throw new Error(
            `GitHub API error: ${response.status}`
          );

        }


        const files =
          await response.json();


        const images =
          files
            .filter(
              file =>
                file.type === "file" &&
                imageExtensions.test(
                  file.name
                )
            )
            .sort(
              (a, b) =>
                a.name.localeCompare(
                  b.name,
                  undefined,
                  {
                    numeric: true
                  }
                )
            );


        if (!images.length) {

          throw new Error(
            "No gallery images found."
          );

        }


        galleryTrack.innerHTML =
          "";


        images.forEach(
          file => {

            galleryTrack.appendChild(
              makeGalleryItem(
                file
              )
            );

          }
        );


        startGallery();


      } catch (error) {

        console.warn(
          "GitHub gallery API unavailable. Using direct images.",
          error
        );


        renderFallbackGallery();

      }

    };


  loadGallery();


  /* =========================================================
     IMAGE ERROR HANDLING
  ========================================================= */

  document
    .querySelectorAll("img")
    .forEach(img => {

      img.addEventListener(
        "error",
        () => {

          console.warn(
            "Memory Group image could not load:",
            img.src
          );

          img.classList.add(
            "image-error"
          );

        }
      );

    });


  /* =========================================================
     PAGE READY
  ========================================================= */

  document.body.classList.add(
    "page-loaded"
  );

});
```
