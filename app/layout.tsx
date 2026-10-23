import type { Metadata } from "next";
import { Suspense } from "react";
import { MetaPixel } from "@/components/MetaPixel";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "./globals.css";
const origin = process.env.SITE_URL;
export const metadata: Metadata = {
  ...(origin ? { metadataBase: new URL(origin) } : {}),
  title: "Pack Empreendedor | App Gratuito com Cursos para Empreendedores",
  description: "Conheça o Pack Empreendedor, aplicativo gratuito para Android com conteúdos sobre gestão, finanças, marketing e atendimento para desenvolver suas habilidades empreendedoras.",
  robots: { index: false, follow: false },
  openGraph: { title: "Pack Empreendedor | App Gratuito com Cursos para Empreendedores", description: "Conheça o Pack Empreendedor, aplicativo gratuito para Android com conteúdos sobre gestão, finanças, marketing e atendimento para desenvolver suas habilidades empreendedoras.", locale: "pt_BR", type: "website", images: origin ? [{ url: "/images/hero.webp", width: 1200, height: 800, alt: "Profissionais planejando em um escritório" }] : [] },
  twitter: { card: "summary_large_image" }
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}<Suspense fallback={null}><MetaPixel /></Suspense></body></html>;
}


