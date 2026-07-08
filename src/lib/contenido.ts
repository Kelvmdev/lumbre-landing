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

export interface Contenido {
  galeria: Foto[];
  domos: Domo[];
}

export const contenido = datos as Contenido;
