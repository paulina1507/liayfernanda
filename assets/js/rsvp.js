
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("rsvpForm");

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Obtener los datos actuales de la invitación
    const data = window.invitationData || {};
    const rsvp = data.rsvp || {};
    const hero = data.hero || {};

    // Obtener los campos del formulario
    const nombreInput = document.getElementById("rsvpName");
    const asistenciaInput = document.getElementById("rsvpAttendance");
    const mensajeInput = document.getElementById("rsvpMessage");

    const nombre = nombreInput?.value.trim() || "";
    const asistencia = asistenciaInput?.value.trim() || "";
    const mensaje = mensajeInput?.value.trim() || "";

    // Validar nombre
    if (!nombre) {
      alert("Por favor escribe tu nombre 😊");
      nombreInput?.focus();
      return;
    }

    // Validar asistencia
    if (!asistencia) {
      alert("Selecciona tu respuesta 😊");
      asistenciaInput?.focus();
      return;
    }

    // Obtener y limpiar el teléfono del JSON
    const numeroFiesta = String(rsvp.phone || "").replace(/\D/g, "");

    if (!numeroFiesta) {
      alert("No hay número de WhatsApp configurado en esta invitación.");
      console.error("No se encontró invitationData.rsvp.phone", data);
      return;
    }

    // Validar formato internacional básico
    if (numeroFiesta.length < 10) {
      alert("El número de WhatsApp configurado no parece válido.");
      console.error("Número de WhatsApp inválido:", numeroFiesta);
      return;
    }

    // Obtener nombres y tipo de evento desde el JSON
    const nombreEvento =
      hero.names ||
      data.site?.couple ||
      data.meta?.pageTitle ||
      "nuestro evento";

    const tituloEvento =
      data.site?.couple ||
      hero.pretitle ||
      rsvp.title ||
      "nuestro evento";

    // Obtener la opción afirmativa desde el JSON
    const opcionesAsistencia =
      rsvp.fields?.attendanceOptions || [];

    const respuestaAfirmativa =
      opcionesAsistencia[0] || "Sí asistiré";

    // Construir el mensaje de WhatsApp
    let textoWA = "";

    if (asistencia === respuestaAfirmativa) {
      textoWA = `¡Hola! 😊

Soy ${nombre}.

Con mucha alegría confirmo mi asistencia a ${tituloEvento} de ${nombreEvento}.

${mensaje ? `Mi mensaje: ${mensaje}` : "¡Nos vemos pronto!"}`;
    } else {
      textoWA = `¡Hola! 😊

Soy ${nombre}.

Lamentablemente no podré acompañarlos en ${tituloEvento} de ${nombreEvento}.

${mensaje ? `Mi mensaje: ${mensaje}` : "Les mando un abrazo con mucho cariño."}`;
    }

    // Crear enlace de WhatsApp
    const url =
      `https://wa.me/${numeroFiesta}?text=${encodeURIComponent(textoWA)}`;

    // Abrir WhatsApp
    const ventana = window.open(url, "_blank");

    if (!ventana) {
      alert("Tu navegador bloqueó la ventana de WhatsApp. Permite las ventanas emergentes para continuar.");
      return;
    }

    // Mostrar mensaje de éxito
    const ok = document.getElementById("rsvpSuccess");

    if (ok) {
      ok.classList.remove("hidden");

      ok.textContent =
        asistencia === respuestaAfirmativa
          ? (rsvp.success || `¡Gracias ${nombre}! Tu confirmación está lista para enviar 💗`)
          : `Gracias ${nombre} por avisarnos. 💗`;
    }

    // Limpiar formulario
    form.reset();
  });
});
