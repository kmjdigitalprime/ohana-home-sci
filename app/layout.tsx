import type { Metadata } from "next";
import "./globals.css";
import "./mobile.css";
import "./premium.css";
import { Footer, Header } from "@/components/Site";

export const metadata: Metadata = {
  title: {
    default: "OHANA HOME SCI — Terrains au Cameroun",
    template: "%s — OHANA HOME SCI",
  },
  description:
    "Découvrez des terrains au Cameroun et préparez votre visite avec OHANA HOME SCI.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "OHANA HOME SCI",
    description: "Votre projet commence par un terrain.",
    locale: "fr_CM",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
