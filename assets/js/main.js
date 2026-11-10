/* =====================================================
   MAIN JS – SHINY MAKER EVENTS (FINAL & STABLE)
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  /* =====================================================
     AUDIO – SINCRONIZACIÓN DE ÍCONOS (GLOBAL)
     ===================================================== */

  const music = document.getElementById("bgMusic");
  const icon = document.getElementById("musicIcon");
  const toggle = document.getElementById("musicToggle");

  if (music && icon && toggle) {
    music.addEventListener("play", () => {
      icon.src = "assets/img/pause.svg";
      toggle.classList.add("playing");
    });

    music.addEventListener("pause", () => {
      icon.src = "assets/img/play.svg";
      toggle.classList.remove("playing");
    });

    // Toggle manual play / pause
    toggle.addEventListener("click", () => {
      if (music.paused) {
        music.play().catch(() => {});
      } else {
        music.pause();
      }
    });
  }

  /* =====================================================
     INTRO – SOBRE GLOBAL
     ===================================================== */

  const overlay = document.getElementById("envelopeOverlay");
  const envelope = overlay?.querySelector(".envelope");
  const seal = document.getElementById("sealButton");

  if (overlay && envelope && seal) {
    document.body.style.overflow = "hidden";

    seal.addEventListener("click", () => {
      /* Desactivar animación del sello */
      seal.style.animation = "none";
      seal.style.opacity = "0";

      /* Abrir sobre */
      envelope.classList.add("open");

      /* 🎵 AUDIO: MISMO CLICK (GESTO REAL DEL USUARIO) */
      if (music) {
        music.volume = 0.6;
        music.muted = true; // Edge workaround

        music
          .play()
          .then(() => {
            music.muted = false;

            // 🔥 SINCRONIZACIÓN FORZADA
            icon.src = "assets/img/pause.svg";
            toggle.classList.add("playing");
          })
          .catch((err) => {
            console.error("Edge bloqueó el audio:", err);
          });
      }

      /* Animación de salida del sobre */
      setTimeout(() => {
        envelope.classList.add("drop-exit");
      }, 400);

      /* Revelar contenido */
      setTimeout(() => {
        overlay.classList.add("fade-out");
        document.body.style.overflow = "auto";
        document.body.classList.add("content-ready");

        revealContent();
        initFlowerObserver();
        initFlowerParallax();
        initScrollReveal();
        initTimeline();
      }, 1400);
    });
  } else {
    /* Fallback sin sobre */
    document.body.classList.add("content-ready");
    revealContent();
    initFlowerObserver();
    initFlowerParallax();
    initScrollReveal();
    initTimeline();
  }

  /* =====================================================
     REVEAL GENERAL DE CONTENIDO
     ===================================================== */

  function revealContent() {
    const reveals = document.querySelectorAll(".reveal, .reveal-zoom");
    reveals.forEach((el, i) => {
      setTimeout(() => el.classList.add("visible"), i * 120);
    });
  }

  /* =====================================================
     SCROLL REVEAL – TÍTULOS Y TEXTO
     ===================================================== */

  function initScrollReveal() {
    const elements = document.querySelectorAll(
      ".reveal-title, .reveal-left, .reveal-right",
    );
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 },
    );

    elements.forEach((el) => observer.observe(el));
  }

  /* =====================================================
     FLORES – VISIBILIDAD POR SCROLL
     ===================================================== */

  function initFlowerObserver() {
    const sections = document.querySelectorAll(".section--flowers");
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("flowers-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 },
    );

    sections.forEach((section) => observer.observe(section));
  }

  /* =====================================================
     FLORES – PARALLAX
     ===================================================== */

  function initFlowerParallax() {
    const sections = document.querySelectorAll(".section--flowers");
    if (!sections.length) return;

    let ticking = false;

    function update() {
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const vh = window.innerHeight;

        if (rect.bottom < 0 || rect.top > vh) return;

        const progress = (vh - rect.top) / (vh + rect.height);
        const clamped = Math.max(0, Math.min(progress, 1));

        section.querySelectorAll(".flower").forEach((flower) => {
          const max = 60;
          const dir = flower.classList.contains("flower--top") ? 1 : -1;
          flower.style.transform = `translate3d(0, ${
            clamped * max * dir
          }px, 0)`;
        });
      });

      ticking = false;
    }

    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    });
  }

  /* =====================================================
     TIMELINE – ANIMACIÓN Y PROGRESO
     ===================================================== */

  function initTimeline() {
    const timeline = document.getElementById("timelineContainer");
    if (!timeline) return;

    const line = timeline.querySelector(".timeline-line");
    const rows = timeline.querySelectorAll(".timeline-row");
    if (!rows.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            rows.forEach((row, i) => {
              setTimeout(() => row.classList.add("is-visible"), i * 160);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 },
    );

    observer.observe(timeline);

    window.addEventListener("scroll", () => {
      const rect = timeline.getBoundingClientRect();
      const start = window.innerHeight * 0.7;

      let progress = (start - rect.top) / rect.height;
      progress = Math.max(0, Math.min(progress, 1));

      if (line) {
        line.style.transform = `translateX(-50%) scaleY(${progress})`;
      }
    });
  }

  /* =====================================================
   NAV MOBILE TOGGLE (REAL)
   ===================================================== */

  const menuToggle = document.getElementById("menuToggle");

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      document.body.classList.toggle("menu-open");

      // 🔥 CAMBIAR ICONO
      if (document.body.classList.contains("menu-open")) {
        menuToggle.textContent = "✕";
      } else {
        menuToggle.textContent = "☰";
      }
    });
  }
});
