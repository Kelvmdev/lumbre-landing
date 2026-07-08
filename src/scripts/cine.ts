// ── El cine de LUMBRE ──
// Firma "Del atardecer a las estrellas": smooth scroll (Lenis) + parallax del
// bosque + reveals escalonados + estrellas que se encienden al caer la noche.
// El degradado tarde→noche lo hace el CSS (body); aquí lo SUAVIZAMOS y añadimos
// las capas. Todo respeta prefers-reduced-motion.
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ── Estrellas: canvas fijo que se enciende conforme bajas a la noche ──
// Funciona con o sin motion (sin motion = sin parpadeo). Usa scrollY, así
// sirve igual con Lenis (que hace scroll real de la ventana).
function estrellas() {
  const c = document.getElementById("estrellas") as HTMLCanvasElement | null;
  if (!c) return;
  const x = c.getContext("2d");
  if (!x) return;

  let W = 0, H = 0, campo: { x: number; y: number; r: number; p: number; s: number }[] = [];
  function build() {
    W = c!.width = window.innerWidth;
    H = c!.height = window.innerHeight;
    const n = Math.round((W * H) / 9000);
    campo = Array.from({ length: n }, () => ({
      x: Math.random() * W,
      y: Math.random() * H * 0.85,
      r: Math.random() * 1.3 + 0.3,
      p: Math.random() * Math.PI * 2,
      s: Math.random() * 0.8 + 0.4,
    }));
  }
  function draw(t: number) {
    x!.clearRect(0, 0, W, H);
    for (const st of campo) {
      const tw = reduce ? 0.85 : 0.55 + 0.45 * Math.sin((t / 900) * st.s + st.p);
      x!.globalAlpha = tw;
      x!.fillStyle = "#f5f0e6";
      x!.beginPath();
      x!.arc(st.x, st.y, st.r, 0, 7);
      x!.fill();
    }
    if (!reduce) requestAnimationFrame(draw);
  }
  function onScroll() {
    const max = document.body.scrollHeight - window.innerHeight;
    const p = max > 0 ? window.scrollY / max : 0;
    // aparecen en el último ~60% del recorrido (cuando ya es de noche)
    c!.style.opacity = String(Math.max(0, Math.min(1, (p - 0.38) / 0.42)));
  }

  build();
  draw(0);
  onScroll();
  window.addEventListener("resize", () => { build(); if (reduce) draw(0); });
  window.addEventListener("scroll", onScroll, { passive: true });
}

function cine() {
  estrellas();

  // Sin animación: dejamos todo visible y quieto. Las estrellas ya se
  // encienden por scroll (sin parpadeo). Nada más que hacer.
  if (reduce) return;

  gsap.registerPlugin(ScrollTrigger);

  // Smooth scroll con Lenis, sincronizado con ScrollTrigger.
  import("lenis").then(({ default: Lenis }) => {
    const lenis = new Lenis({ duration: 1.1 });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  });

  // 1) Entrada del hero al cargar (escalonada).
  const heroItems = gsap.utils.toArray<HTMLElement>(
    "#inicio .eyebrow, #inicio h1, #inicio .lede, #inicio .hero-cta"
  );
  if (heroItems.length) {
    gsap.from(heroItems, {
      opacity: 0, y: 34, duration: 1, ease: "power3.out", stagger: 0.12, delay: 0.15,
    });
  }

  // 2) Parallax del bosque: cada capa se mueve según su data-speed mientras
  //    haces scroll por el hero (las cercanas más → sensación de profundidad).
  const header = document.getElementById("inicio");
  if (header) {
    gsap.utils.toArray<HTMLElement>(".capa").forEach((capa) => {
      const speed = parseFloat(capa.dataset.speed || "0");
      gsap.to(capa, {
        y: speed * 140, ease: "none",
        scrollTrigger: { trigger: header, start: "top top", end: "bottom top", scrub: true },
      });
    });
    // el domo sube un poco más lento que el resto (protagonista)
    const domo = document.getElementById("domo-hero");
    if (domo) {
      gsap.to(domo, {
        y: -40, ease: "none",
        scrollTrigger: { trigger: header, start: "top top", end: "bottom top", scrub: true },
      });
    }
  }

  // 3) Reveals: todo .reveal entra con fade+rise al acercarse; la galería
  //    hereda stagger porque sus tarjetas también son .reveal.
  gsap.set(".reveal", { opacity: 0, y: 30 });
  ScrollTrigger.batch(".reveal", {
    start: "top 85%",
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1, y: 0, duration: 0.85, ease: "power3.out", stagger: 0.1, overwrite: true,
      }),
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", cine);
} else {
  cine();
}
