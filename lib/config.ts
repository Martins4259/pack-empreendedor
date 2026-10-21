import { appDownload } from "@/config/app-download";

// Validates configuration only; it does not verify the external APK's availability.
function resolveApkUrl(): string | null {
  if (!appDownload.enabled || !appDownload.apkUrl.trim()) return null;

  try {
    const url = new URL(appDownload.apkUrl.trim());
    if (url.protocol !== "https:" || url.username || url.password) return null;
    return url.href;
  } catch {
    return null;
  }
}

// All four DownloadButton instances receive this same direct external URL.
export const pack = {
  name: "Pack Empreendedor",
  downloadUrl: resolveApkUrl(),
};
export const futureSections = [
  "Para quem é este pack?", "Conheça o pacote completo", "Como funciona o download",
  "Perguntas frequentes", "Chamada final", "Rodapé institucional", "Página de agradecimento"
].map(title => ({ title, status: "pending" as const }));

