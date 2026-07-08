// Enlaces del sitio, en UN solo lugar (DRY). Reserva = WhatsApp, el canal
// natural en LatAm para este tipo de negocio.
// DEMO: datos ficticios coherentes (glamping ubicado en Jardín, Antioquia).
const TELEFONO = "573145678901"; // formato internacional sin "+"
export const TELEFONO_E164 = `+${TELEFONO}`; // para JSON-LD (schema.org)

export const WHATSAPP =
  `https://wa.me/${TELEFONO}?text=` +
  encodeURIComponent("Hola, quiero reservar una noche en LUMBRE 🌙");

export const EMAIL = "hola@lumbre.co";
export const UBICACION = "Jardín, Antioquia";

export const REDES = {
  instagram: "https://instagram.com/lumbre.glamping",
  whatsapp: `https://wa.me/${TELEFONO}`,
  maps: `https://maps.google.com/?q=${encodeURIComponent(`${UBICACION}, Colombia`)}`,
};

// Navegación del sitio, en UN solo lugar. El footer filtra lo que no muestra.
export const NAV = [
  { href: "#exp", texto: "Experiencia" },
  { href: "#domos", texto: "Domos" },
  { href: "#galeria", texto: "Galería" },
  { href: "#contacto", texto: "Contacto" },
];
