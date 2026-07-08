// Enlaces del sitio, en UN solo lugar (DRY). Reserva = WhatsApp, el canal
// natural en LatAm para este tipo de negocio.
// DEMO: datos ficticios coherentes (glamping ubicado en Jardín, Antioquia).
const TELEFONO = "573145678901"; // formato internacional sin "+"
export const TELEFONO_E164 = `+${TELEFONO}`; // para JSON-LD (schema.org)

export const WHATSAPP =
  `https://wa.me/${TELEFONO}?text=` +
  encodeURIComponent("Hola, quiero reservar una noche en LUMBRE 🌙");

export const REDES = {
  instagram: "https://instagram.com/lumbre.glamping",
  whatsapp: `https://wa.me/${TELEFONO}`,
  maps: "https://maps.google.com/?q=Jardín,+Antioquia,+Colombia",
};
