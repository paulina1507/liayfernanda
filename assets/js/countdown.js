/* =====================================================
   COUNTDOWN DINÁMICO DESDE JSON
   ===================================================== */

const countdownEl = document.getElementById('countdownTimer');

function startCountdown(eventDateString) {

  const eventDate = new Date(eventDateString).getTime();

  function updateCountdown() {

    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance < 0) {
      countdownEl.innerHTML = '<p>¡Hoy es el gran día!</p>';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    countdownEl.innerHTML = `
      <div>
        <strong>${days}</strong>
        <span>Días</span>
      </div>
      <div>
        <strong>${hours}</strong>
        <span>Horas</span>
      </div>
      <div>
        <strong>${minutes}</strong>
        <span>Min</span>
      </div>
      <div>
        <strong>${seconds}</strong>
        <span>Seg</span>
      </div>
    `;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}
