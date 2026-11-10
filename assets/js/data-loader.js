document.addEventListener("DOMContentLoaded", () => {
  fetch("assets/data/invitation.json")
    .then((res) => {
      if (!res.ok) throw new Error("No se pudo cargar invitation.json");
      return res.json();
    })
    .then((data) => {
      window.invitationData = data;
      /* =====================================================
         🎵 MUSIC DESDE JSON (NO BORRA NADA)
         ===================================================== */
      const musicEl = document.getElementById("bgMusic");
      if (musicEl && data.music?.src) {
        musicEl.src = data.music.src;
        musicEl.preload = "auto";
      }

      /* =====================================================
         META / SITE
         ===================================================== */

      if (data.meta?.pageTitle) {
        document.title = data.meta.pageTitle;
      }

      const headerLogo = document.getElementById("headerLogo");
      if (headerLogo && data.site?.couple) {
        headerLogo.innerHTML = data.site.couple;
      }

      /* =====================================================
   NAV
   ===================================================== */

      const navLeft = document.getElementById("navLeft");
      const navRight = document.getElementById("navRight");

      // Render desktop normal
      if (navLeft && data.nav?.left) {
        navLeft.innerHTML = data.nav.left
          .map((link) => `<a href="${link.href}">${link.label}</a>`)
          .join("");
      }

      if (navRight && data.nav?.right) {
        navRight.innerHTML = data.nav.right
          .map((link) => `<a href="${link.href}">${link.label}</a>`)
          .join("");
      }

      /* =====================================================
   FIX MOBILE (fusionar menús)
   ===================================================== */

      if (window.innerWidth <= 768 && navLeft && navRight) {
        navRight.innerHTML = navLeft.innerHTML + navRight.innerHTML;
        navLeft.style.display = "none";
      }

      /* =====================================================
         HERO
         ===================================================== */

      const heroPretitle = document.getElementById("heroPretitle");
      const heroNames = document.getElementById("heroNames");
      const heroBg = document.querySelector(".hero-bg");

      if (heroPretitle) heroPretitle.innerHTML = data.hero?.pretitle || "";
      if (heroNames) heroNames.innerHTML = data.hero?.names || "";
      if (heroBg && data.hero?.background) {
        heroBg.style.backgroundImage = `url(${data.hero.background})`;
      }

      /* =====================================================
   COUNTDOWN DESDE JSON
   ===================================================== */

      if (data.hero?.date && typeof startCountdown === "function") {
        startCountdown(data.hero.date);
      }

      /* =====================================================
         PRESENTACIÓN
         ===================================================== */

      const presentationTitle = document.getElementById("presentationTitle");
      const presentationParents = document.getElementById(
        "presentationParents",
      );
      const presentationText = document.getElementById("presentationText");
      const presentationIcon = document.getElementById("presentationIcon");

      if (presentationTitle)
        presentationTitle.innerHTML = data.presentation?.title || "";

      if (presentationText)
        presentationText.innerHTML = data.presentation?.text || "";

      if (presentationIcon && data.presentation?.icon)
        presentationIcon.src = data.presentation.icon;
      function renderPresentationGroup(containerId, groups) {
        const container = document.getElementById(containerId);
        if (!container || !groups) return;

        container.innerHTML = "";

        groups.forEach((group) => {
          container.innerHTML += `
      <div class="presentation-group">
        <span class="presentation-role">${group.note}</span>
        <p class="presentation-names">
          ${group.names.join("<br>")}
        </p>
      </div>
    `;
        });
      }

      // Papás
      renderPresentationGroup(
        "presentationParents",
        data.presentation?.parents,
      );

      // Padrinos
      renderPresentationGroup(
        "presentationPadrinos",
        data.presentation?.padrinos,
      );

      /* =====================================================
         LOCATION
         ===================================================== */

      /* =====================================================
   LOCATION
   ===================================================== */

      const locationTitle = document.getElementById("locationTitle");
      const locationSubtitle = document.getElementById("locationSubtitle");
      const locationDate = document.getElementById("locationDate");
      const locationGrid = document.getElementById("locationGrid");

      if (locationTitle) {
        locationTitle.innerHTML = data.location?.title || "";
      }

      if (locationSubtitle) {
        locationSubtitle.innerHTML = data.location?.subtitle || "";
      }

      if (locationDate) {
        locationDate.innerHTML = data.location?.dateText || "";
      }

      if (locationGrid && data.location?.places) {

        locationGrid.innerHTML = "";

        // 👇 SI SOLO HAY 1 CARD
        if (data.location.places.length === 1) {
          locationGrid.classList.add("location-grid-single");
        } else {
          locationGrid.classList.remove("location-grid-single");
        }

        data.location.places.forEach((place) => {

          locationGrid.innerHTML += `
      <div class="location-card reveal-zoom">
        
        <h3 class="location-card-title">
          ${place.title}
        </h3>

        <p class="location-time">
          ${place.time}
        </p>

        ${place.image
              ? `<img src="${place.image}" alt="${place.title}">`
              : ""
            }

        <p class="location-place">
          ${place.place}
        </p>

        <p class="location-address">
          ${place.address}
        </p>

        <a
          href="${place.map}"
          class="btn btn-primary"
          target="_blank"
        >
          Ver mapa
        </a>

      </div>
    `;
        });
      }

      /* =====================================================
         TIMELINE
         ===================================================== */

      const timelineTitle = document.getElementById("timelineTitle");
      const timelineContainer = document.getElementById("timelineContainer");

      if (timelineTitle) timelineTitle.innerHTML = data.timeline?.title || "";

      if (timelineContainer && data.timeline?.items) {
        timelineContainer.innerHTML = `<div class="timeline-line"></div>`;
        data.timeline.items.forEach((item, i) => {
          timelineContainer.innerHTML += `
            <div class="timeline-row ${i % 2 ? "is-flip" : ""}">
              <div class="timeline-side timeline-side--left">
                ${i % 2 === 0
              ? `<img class="timeline-icon" src="${item.icon}">`
              : `<div class="timeline-text"><span class="time">${item.time}</span>${item.text}</div>`
            }
              </div>
              <div class="timeline-center"><span class="timeline-point"></span></div>
              <div class="timeline-side timeline-side--right">
                ${i % 2
              ? `<img class="timeline-icon" src="${item.icon}">`
              : `<div class="timeline-text"><span class="time">${item.time}</span>${item.text}</div>`
            }
              </div>
            </div>
          `;
        });
      }

      /* =====================================================
         GIFTS
         ===================================================== */

      const giftsTitle = document.getElementById("giftsTitle");
      const giftsText = document.getElementById("giftsText");
      const giftsOptions = document.getElementById("giftsOptions");

      if (giftsTitle) giftsTitle.innerHTML = data.gifts?.title || "";

      if (giftsText) giftsText.innerHTML = data.gifts?.intro || "";

      if (giftsOptions && data.gifts?.options) {
        giftsOptions.innerHTML = "";
        data.gifts.options
          .filter((gift) => gift.title || gift.description)
          .forEach((gift) => {
            giftsOptions.innerHTML += `
      <div class="gift-item reveal-zoom">
        <h4 class="gift-title">${gift.title}</h4>
        <p class="gift-desc">${gift.description}</p>
        ${gift.type === "link"
                ? `<a href="${gift.url}" target="_blank" class="gift-button">
                ${gift.buttonText}
               </a>`
                : ""
              }
      </div>
    `;
          });
      }

      /* =====================================================
   DRESSCODE
   ===================================================== */

      const dresscodeTitle = document.getElementById("dresscodeTitle");
      const dresscodeType = document.getElementById("dresscodeType");
      const dresscodeImage = document.getElementById("dresscodeImage");
      const dresscodeNote = document.getElementById("dresscodeNote");
      const menTitle = document.getElementById("dresscodeMenTitle");
      const womenTitle = document.getElementById("dresscodeWomenTitle");
      const menList = document.getElementById("dresscodeMen");
      const womenList = document.getElementById("dresscodeWomen");

      if (dresscodeTitle)
        dresscodeTitle.innerHTML = data.dresscode?.title || "";
      if (dresscodeType) dresscodeType.innerHTML = data.dresscode?.type || "";
      if (dresscodeImage) dresscodeImage.src = data.dresscode?.image || "";
      if (dresscodeNote) dresscodeNote.innerHTML = data.dresscode?.note || "";
      if (menTitle) menTitle.innerHTML = data.dresscode?.menTitle || "";
      if (womenTitle) womenTitle.innerHTML = data.dresscode?.womenTitle || "";

      if (menList) {
        menList.innerHTML = "";
        data.dresscode?.men?.forEach(
          (i) => (menList.innerHTML += `<li>${i}</li>`),
        );
      }

      if (womenList) {
        womenList.innerHTML = "";
        data.dresscode?.women?.forEach(
          (i) => (womenList.innerHTML += `<li>${i}</li>`),
        );
      }

      // OCULTAR INDICACIONES SI ESTÁN VACÍAS
      const dresscodeGrid = document.querySelector(".dresscode-grid");

      if (dresscodeGrid) {
        const hasInstructions =
          menTitle?.textContent.trim() ||
          womenTitle?.textContent.trim() ||
          menList?.children.length ||
          womenList?.children.length;

        dresscodeGrid.style.display = hasInstructions ? "grid" : "none";
      }

      /* =====================================================
   GRATITUDE (AGRADECIMIENTO)
   ===================================================== */

      const gratitudeTitle = document.getElementById("gratitudeTitle");
      const gratitudeText = document.getElementById("gratitudeText");

      if (gratitudeTitle)
        gratitudeTitle.innerHTML = data.gratitude?.title || "";

      if (gratitudeText) gratitudeText.innerHTML = data.gratitude?.text || "";

      /* =====================================================
   GALLERY
   ===================================================== */

      const gallerySection = document.getElementById("gallery");
      const galleryTitle = document.getElementById("galleryTitle");
      const galleryGrid = document.getElementById("galleryGrid");

      // 🔥 SIEMPRE resetear visibilidad
      if (gallerySection) {
        gallerySection.style.display = "";
      }

      if (galleryTitle) {
        galleryTitle.innerHTML = data.gallery?.title || "";
      }

      if (galleryGrid && data.gallery?.type) {
        galleryGrid.innerHTML = "";
        galleryGrid.classList.remove("gallery-wishes");

        /* =========================
     IMAGES
     ========================= */
        if (data.gallery.type === "images" && data.gallery.items?.length) {
          data.gallery.items.forEach((img) => {
            galleryGrid.insertAdjacentHTML(
              "beforeend",
              `<img src="${img}" alt="Galería">`,
            );
          });

          // ✅ forma segura
          if (typeof initGallery === "function") {
            initGallery();
          }
        } else if (
          /* =========================
       WISHES
       ========================= */
          data.gallery.type === "wishes" &&
          data.gallery.items?.length
        ) {
          galleryGrid.classList.add("gallery-wishes");

          data.gallery.items.forEach((wish) => {
            galleryGrid.insertAdjacentHTML(
              "beforeend",
              `
        <div class="wish-card">
          <p>${wish}</p>
        </div>
        `,
            );
          });
        } else {
          /* =========================
       VACÍO
       ========================= */
          if (gallerySection) {
            gallerySection.style.display = "none";
          }
        }
      }

      /* =====================================================
   RSVP – SOLO TEXTO DINÁMICO
   ===================================================== */

      const rsvpTitle = document.getElementById("rsvpTitle");
      const rsvpIntro = document.getElementById("rsvpIntro");
      const rsvpNote = document.getElementById("rsvpNote");
      const rsvpSuccess = document.getElementById("rsvpSuccess");

      const rsvpForm = document.getElementById("rsvpForm");
      const rsvpName = document.getElementById("rsvpName");
      const rsvpAttendance = document.getElementById("rsvpAttendance");
      const rsvpMessage = document.getElementById("rsvpMessage");
      const rsvpButton = document.getElementById("rsvpButton");

      if (rsvpTitle) rsvpTitle.innerHTML = data.rsvp?.title || "";
      if (rsvpIntro) rsvpIntro.innerHTML = data.rsvp?.intro || "";
      if (rsvpNote) rsvpNote.innerHTML = data.rsvp?.note || "";

      if (rsvpName)
        rsvpName.placeholder = data.rsvp?.fields?.namePlaceholder || "";

      if (rsvpMessage)
        rsvpMessage.placeholder = data.rsvp?.fields?.messagePlaceholder || "";

      if (rsvpButton)
        rsvpButton.innerHTML = data.rsvp?.fields?.buttonText || "";

      if (rsvpAttendance) {
        rsvpAttendance.innerHTML = `
    <option value="">
      ${data.rsvp?.fields?.attendancePlaceholder || ""}
    </option>
  `;
        data.rsvp?.fields?.attendanceOptions?.forEach((opt) => {
          rsvpAttendance.innerHTML += `<option>${opt}</option>`;
        });
      }

      /* =====================================================
         FOOTER
         ===================================================== */

      const footerNames = document.getElementById("footerNames");
      const footerCredits = document.getElementById("footerCredits");

      if (footerNames) footerNames.innerHTML = data.footer?.names || "";
      if (footerCredits) footerCredits.innerHTML = data.footer?.credits || "";
    })
    .catch((err) => console.error("Error cargando invitation.json:", err));
});
