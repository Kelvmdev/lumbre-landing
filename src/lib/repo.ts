// Guardar data.json. Dual backend: en dev escribe el archivo local (instantáneo,
// sin commits de ruido); en prod commitea a GitHub (Vercel es read-only y
// rebuildea al detectar el push). (Tema 04.)
import fs from "node:fs";
import path from "node:path";

const env = (k: string) =>
  (import.meta.env as Record<string, string | undefined>)[k] ?? process.env[k];

const RUTA_LOCAL = path.join(process.cwd(), "src", "data.json");
const RUTA_REPO = "src/data.json";

// GitHub Contents API: GET trae el sha actual → PUT commitea. base64 desde un
// Buffer UTF-8 (los acentos no se rompen). User-Agent es obligatorio o da 403.
async function commitGithub(json: string): Promise<void> {
  const owner = env("GITHUB_OWNER");
  const repo = env("GITHUB_REPO");
  const branch = env("GITHUB_BRANCH") || "main";
  const token = env("GITHUB_TOKEN");
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${RUTA_REPO}`;
  const headers = {
    Authorization: `Bearer ${token}`,
    "User-Agent": "lumbre-cms",
    Accept: "application/vnd.github+json",
  };

  // Releer el sha justo antes del PUT (último en guardar gana; ok con 1 editor).
  const get = await fetch(`${url}?ref=${branch}`, { headers });
  if (!get.ok) throw new Error(`GitHub GET ${get.status}: ${await get.text()}`);
  const { sha } = await get.json();

  const put = await fetch(url, {
    method: "PUT",
    headers,
    body: JSON.stringify({
      message: "cms: actualizar contenido",
      content: Buffer.from(json, "utf-8").toString("base64"),
      sha,
      branch,
    }),
  });
  if (!put.ok) throw new Error(`GitHub PUT ${put.status}: ${await put.text()}`);
}

export async function guardarDatos(datos: unknown): Promise<void> {
  const json = JSON.stringify(datos, null, 2) + "\n";
  if (import.meta.env.PROD) await commitGithub(json);
  else fs.writeFileSync(RUTA_LOCAL, json, "utf-8");
}
