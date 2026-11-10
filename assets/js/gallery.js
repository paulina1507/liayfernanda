/* =====================================================
   GALLERY LIGHTBOX + CAROUSEL
   Compatible con gallery.css actual
   ===================================================== */

function initGallery() {

  // Evitar duplicar modal
  if (document.querySelector('.gallery-modal')) return;

  const galleryImages = document.querySelectorAll('.gallery-grid img');
  if (!galleryImages.length) return;

  let currentIndex = 0;

  /* =========================
     CREAR MODAL
     ========================= */

  const modal = document.createElement('div');
  modal.classList.add('gallery-modal');

  const modalImg = document.createElement('img');
  modalImg.classList.add('gallery-modal-img');

  const closeBtn = document.createElement('button');
  closeBtn.classList.add('gallery-close');
  closeBtn.innerHTML = '✕';

  const prevBtn = document.createElement('button');
  prevBtn.classList.add('gallery-nav', 'prev');
  prevBtn.innerHTML = '‹';

  const nextBtn = document.createElement('button');
  nextBtn.classList.add('gallery-nav', 'next');
  nextBtn.innerHTML = '›';

  modal.appendChild(closeBtn);
  modal.appendChild(prevBtn);
  modal.appendChild(modalImg);
  modal.appendChild(nextBtn);

  document.body.appendChild(modal);

  /* =========================
     FUNCIONES
     ========================= */

  function openGallery(index) {
    currentIndex = index;
    modalImg.src = galleryImages[currentIndex].src;
    modal.classList.add('active');
  }

  function closeGallery() {
    modal.classList.remove('active');
  }

  function showPrev() {
    currentIndex =
      (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    modalImg.src = galleryImages[currentIndex].src;
  }

  function showNext() {
    currentIndex =
      (currentIndex + 1) % galleryImages.length;
    modalImg.src = galleryImages[currentIndex].src;
  }

  /* =========================
     EVENTOS
     ========================= */

  galleryImages.forEach((image, index) => {
    image.addEventListener('click', () => openGallery(index));
  });

  closeBtn.addEventListener('click', closeGallery);
  prevBtn.addEventListener('click', showPrev);
  nextBtn.addEventListener('click', showNext);

  modal.addEventListener('click', e => {
    if (e.target === modal) closeGallery();
  });

  document.addEventListener('keydown', e => {
    if (!modal.classList.contains('active')) return;

    if (e.key === 'Escape') closeGallery();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  });
}
