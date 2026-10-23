import { Download } from "lucide-react";
export function DownloadButton({ url, helperText = "Gratuito para Android. Sem cadastro obrigatório.", compact = false }: { url: string | null; statusId?: string; helperText?: string; compact?: boolean }) {
  const label = <><Download size={compact ? 18 : 20} aria-hidden="true" />{compact ? "BAIXAR APP" : "BAIXAR APP GRATUITO"}</>;
  return <div className="download-area">
    {url ? <a className="button primary" href={url}>{label}</a> : <button className="button primary" disabled>{label}</button>}
    {!compact && <p className="download-note">{helperText}</p>}
  </div>;
}


