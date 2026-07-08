// Enlaces del sitio, en UN solo lugar (DRY). Reserva = WhatsApp, el canal
// natural en LatAm para este tipo de negocio.
// Los DATOS de contacto (teléfono, email, ubicación, coords, redes) se editan
// en el CMS (data.json → contenido.contacto). Aquí queda solo la LÓGICA:
// helpers de WhatsApp, plantillas de mensaje y la navegación.
import { contenido } from "./contenido";

const contacto = contenido.contacto;
const TELEFONO = contacto.telefono; // formato internacional sin "+"
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

export const EMAIL = contacto.email;
export const UBICACION = contacto.ubicacion;
// Coords del pin. Fuente única: mapa + JSON-LD las leen.
export const COORDS = contacto.coords;

export const REDES = {
  instagram: contacto.instagram,
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
