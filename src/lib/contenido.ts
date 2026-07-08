// Capa de datos del sitio: el contenido editable vive en data.json y los
// componentes lo leen desde aquí. Una sola fuente de verdad (futuro CMS).
import type { ImageMetadata } from "astro";
import datos from "../data.json";

// Imágenes locales optimizadas, por clave. El data.json guarda la clave
// (no la imagen); aquí la traducimos. En la Fase 4 (Cloudinary) la clave
// pasará a ser una URL remota.
import domoAtardecer from "../assets/fotos/domo-atardecer.jpg";
import interiorDomo from "../assets/fotos/interior-domo.jpg";
import fogata from "../assets/fotos/fogata.jpg";
import cieloNocturno from "../assets/fotos/cielo-nocturno.jpg";
import senderoBosque from "../assets/fotos/sendero-bosque.jpg";

export const IMAGENES: Record<string, ImageMetadata> = {
  "domo-atardecer": domoAtardecer,
  "interior-domo": interiorDomo,
  "fogata": fogata,
  "cielo-nocturno": cieloNocturno,
  "sendero-bosque": senderoBosque,
};

// El campo `img` puede ser una clave local (arriba) o una URL de Cloudinary
// (fotos subidas desde el CMS). Estos helpers deciden cómo renderizarla.
export const esRemota = (img: string) => img.startsWith("http");
// Cloudinary optimiza por URL: f_auto (mejor formato) + q_auto (calidad).
export const optimizar = (url: string) => url.replace("/upload/", "/upload/f_auto,q_auto/");

export interface Hero {
  eyebrow: string;
  titulo: string;
  lede: string;
  ctaPrimario: string;
  ctaSecundario: string;
}

export interface Foto {
  img: string;
  titulo: string;
  big: boolean;
  alt: string;
}

export interface Domo {
  nombre: string;
  img: string;
  alt: string;
  capacidad: string;
  precio: string;
  detalles: string[];
}

export interface Feature {
  titulo: string;
  desc: string;
  icono: string;
}

export interface Pregunta {
  q: string;
  a: string;
}

export interface Contacto {
  telefono: string; // internacional sin "+" (ej. 573145678901)
  email: string;
  ubicacion: string;
  instagram: string;
  coords: { lat: number; lon: number };
}

export interface Contenido {
  hero: Hero;
  galeria: Foto[];
  domos: Domo[];
  cielo: { titulo: string; texto: string };
  experiencia: { eyebrow: string; titulo: string; features: Feature[] };
  faq: { eyebrow: string; titulo: string; preguntas: Pregunta[] };
  mapa: { eyebrow: string; titulo: string; texto: string; cta: string };
  reserva: { eyebrow: string; titulo: string; texto: string };
  cta: { titulo: string; texto: string; label: string };
  footer: { tagline: string; reservaTexto: string; reservaLabel: string };
  nav: { marca: string; ctaReserva: string };
  seo: { titulo: string; descripcion: string; nombreNegocio: string };
  contacto: Contacto;
}

export const contenido = datos as Contenido;
