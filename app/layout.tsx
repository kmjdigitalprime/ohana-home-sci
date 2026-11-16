import type { Metadata } from "next";
import "./globals.css";
import "./mobile.css";
import "./premium.css";
import "./mobile-premium.css";
import { Footer, Header } from "@/components/Site";

export const metadata: Metadata = {
  metadataBase: new URL("https://ohanahomesci.com"),
  applicationName: "OHANA HOME SCI",
  title: {
    default: "OHANA HOME SCI | Terrains au Cameroun",
    template: "%s — OHANA HOME SCI",
  },
  description:
    "Découvrez des terrains au Cameroun et préparez votre visite avec OHANA HOME SCI.",
  icons: {
    icon: [{ url: "/ohana-home-logo.png", type: "image/png" }],
    shortcut: "/ohana-home-logo.png",
    apple: [{ url: "/ohana-home-logo.png", type: "image/png" }],
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "OHANA HOME SCI | Terrains au Cameroun",
    description:
      "Découvrez des terrains au Cameroun et préparez votre visite avec OHANA HOME SCI.",
    url: "/",
    siteName: "OHANA HOME SCI",
    locale: "fr_CM",
    type: "website",
    images: [
      {
        url: "/ohana-home-logo.png",
        width: 756,
        height: 363,
        alt: "Logo OHANA HOME SCI — Sentez vous chez vous",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OHANA HOME SCI | Terrains au Cameroun",
    description:
      "Découvrez des terrains au Cameroun et préparez votre visite avec OHANA HOME SCI.",
    images: ["/ohana-home-logo.png"],
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
