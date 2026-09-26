document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  const year = document.getElementById("year");

  // Current year
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  /* =========================================
     NAVBAR SCROLL EFFECT
  ========================================= */

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


  /* =========================================
     MOBILE NAVIGATION
  ========================================= */

  const closeMenu = () => {
    navToggle?.classList.remove("active");
    navToggle?.setAttribute(
      "aria-expanded",
      "false"
    );

    navLinks?.classList.remove("open");

    document.body.classList.remove(
      "menu-open"
    );
  };

  navToggle?.addEventListener("click", () => {
    const isOpen =
      navLinks?.classList.toggle("open");

    navToggle.classList.toggle(
      "active",
      isOpen
    );

    navToggle.setAttribute(
      "aria-expanded",
      String(Boolean(isOpen))
    );

    document.body.classList.toggle(
      "menu-open",
      Boolean(isOpen)
    );
  });


  // Close mobile menu after clicking a link
  navLinks?.querySelectorAll("a").forEach(
    (link) => {
      link.addEventListener(
        "click",
        closeMenu
      );
    }
  );


  // Close mobile menu when switching to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 800) {
      closeMenu();
    }
  });


  /* =========================================
     KRISHNA HERO PARALLAX
  ========================================= */

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
      (event) => {
        if (window.innerWidth < 900) return;

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


  /* =========================================
     SCROLL REVEAL ANIMATIONS
  ========================================= */

  const revealItems =
    document.querySelectorAll(
      `
      .room-card,
      .hostel-card,
      .event-card,
      .owner-content,
      .memory-copy,
      .philosophy-grid > div
      `
    );

  if (
    "IntersectionObserver" in window
  ) {
    const observer =
      new IntersectionObserver(
        (entries, obs) => {
          entries.forEach(
            (entry) => {
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
            }
          );
        },
        {
          threshold: 0.12
        }
      );

    revealItems.forEach(
      (item) => {
        observer.observe(item);
      }
    );
  }


  /* =========================================
     LIFE AT MEMORY GALLERY
     
     Images are automatically loaded from:
     /memory-photos/
  ========================================= */

  const galleryTrack =
    document.getElementById(
      "memoryGallery"
    );

  const galleryApi =
    "https://api.github.com/repos/krishnakm00q-source/memoryhostel/contents/memory-photos";

  const imageExtensions =
    /\.(jpe?g|png|webp|gif|avif)$/i;


  /* =========================================
     CREATE GALLERY IMAGE
  ========================================= */

  const makeGalleryItem = (file) => {
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


  /* =========================================
     START AUTO-SCROLL GALLERY
  ========================================= */

  const startGallery = () => {
    if (!galleryTrack) {
      return;
    }


    const items = [
      ...galleryTrack.querySelectorAll(
        ".gallery-item"
      )
    ];


    if (items.length < 2) {
      return;
    }


    // Respect user's reduced motion setting
    if (
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
    ) {
      return;
    }


    /*
      Duplicate the first sequence.

      This creates a seamless
      infinite scrolling effect.
    */

    items.forEach(
      (item) => {
        galleryTrack.appendChild(
          item.cloneNode(true)
        );
      }
    );


    let position = 0;

    let last =
      performance.now();

    let paused = false;


    /* Pause when mouse is over gallery */
    const pause = () => {
      paused = true;
    };


    /* Resume when mouse leaves gallery */
    const resume = () => {
      paused = false;

      last =
        performance.now();
    };


    galleryTrack.addEventListener(
      "mouseenter",
      pause
    );


    galleryTrack.addEventListener(
      "mouseleave",
      resume
    );


    galleryTrack.addEventListener(
      "touchstart",
      pause,
      {
        passive: true
      }
    );


    galleryTrack.addEventListener(
      "touchend",
      resume,
      {
        passive: true
      }
    );


    /*
      Calculate width of the
      original image sequence.
    */

    const firstSetWidth = () => {
      const all = [
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


      return (
        all
          .slice(0, half)
          .reduce(
            (
              sum,
              element
            ) =>
              sum +
              element.getBoundingClientRect()
                .width,
            0
          )
        +
        Math.max(
          0,
          half - 1
        ) *
          gap
      );
    };


    /* =========================================
       ANIMATION LOOP
    ========================================= */

    const animate = (now) => {
      const delta =
        Math.min(
          now - last,
          40
        );

      last = now;


      if (!paused) {
        /*
          Gallery movement speed.

          Increase 0.035 for faster.
          Decrease 0.035 for slower.
        */

        position +=
          delta * 0.035;


        const loopWidth =
          firstSetWidth();


        /*
          Reset position when
          first image sequence ends.
        */

        if (
          loopWidth > 0 &&
          position >= loopWidth
        ) {
          position -= loopWidth;
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


  /* =========================================
     LOAD MEMORY PHOTOS FROM GITHUB
  ========================================= */

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


        /*
          Keep only image files.
        */

        const images =
          files
            .filter(
              (file) =>
                file.type === "file" &&
                imageExtensions.test(
                  file.name
                )
            )
            .sort(
              (
                a,
                b
              ) =>
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


        /*
          Remove loading content
          and insert actual photos.
        */

        galleryTrack.innerHTML =
          "";


        images.forEach(
          (file) => {
            galleryTrack.appendChild(
              makeGalleryItem(file)
            );
          }
        );


        /*
          Start automatic
          horizontal scrolling.
        */

        startGallery();


      } catch (error) {

        console.error(
          "Memory gallery could not load:",
          error
        );


        galleryTrack.innerHTML = `
          <div class="gallery-loading">
            The Memory gallery is preparing.
            Please refresh once the photo
            collection is available.
          </div>
        `;
      }
    };


  /*
    Start loading the
    Life at Memory gallery.
  */

  loadGallery();

});
