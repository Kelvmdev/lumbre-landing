// Enlaces del sitio, en UN solo lugar (DRY). Reserva = WhatsApp, el canal
// natural en LatAm para este tipo de negocio.
// DEMO: datos ficticios coherentes (glamping ubicado en Jardín, Antioquia).
const TELEFONO = "573145678901"; // formato internacional sin "+"
export const TELEFONO_E164 = `+${TELEFONO}`; // para JSON-LD (schema.org)

export const WHATSAPP =
  `https://wa.me/${TELEFONO}?text=` +
  encodeURIComponent("Hola, quiero reservar una noche en LUMBRE 🌙");

// WhatsApp con mensaje prellenado por domo (reserva contextual).
export const waReserva = (domo: string) =>
  `https://wa.me/${TELEFONO}?text=` +
  encodeURIComponent(`Hola, quiero reservar el ${domo} en LUMBRE 🌙`);

// WhatsApp con la reserva completa del formulario (fecha + personas + domo).
export const waReservaDetalle = (fecha: string, personas: string, domo: string) =>
  `https://wa.me/${TELEFONO}?text=` +
  encodeURIComponent(
    `Hola, quiero reservar en LUMBRE 🌙\n\n📅 Llegada: ${fecha}\n👥 Personas: ${personas}\n🏕️ Domo: ${domo}`
  );

export const EMAIL = "hola@lumbre.co";
export const UBICACION = "Jardín, Antioquia";
// Coords del pin (Jardín, Antioquia — demo). Fuente única: mapa + JSON-LD las leen.
export const COORDS = { lat: 5.5983, lon: -75.8186 };

export const REDES = {
  instagram: "https://instagram.com/lumbre.glamping",
  whatsapp: `https://wa.me/${TELEFONO}`,
  maps: `https://www.google.com/maps/search/?api=1&query=${COORDS.lat},${COORDS.lon}`,
};

// Navegación del sitio, en UN solo lugar. El footer filtra lo que no muestra.
export const NAV = [
  { href: "#exp", texto: "Experiencia" },
  { href: "#domos", texto: "Domos" },
  { href: "#galeria", texto: "Galería" },
  { href: "#contacto", texto: "Contacto" },
];
