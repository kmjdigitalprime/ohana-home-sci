import type { Metadata } from "next";
import "./globals.css";
import "./mobile.css";
import "./premium.css";
import "./mobile-premium.css";
import "./compass-mobile.css";
import "./brand.css";
import "./footer.css";
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
    icon: [
      { url: "/ohana-logo/favicon/favicon.svg", type: "image/svg+xml" },
      {
        url: "/ohana-logo/favicon/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/ohana-logo/favicon/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    shortcut: "/ohana-logo/favicon/favicon.ico",
    apple: [
      {
        url: "/ohana-logo/app-icons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  manifest: "/ohana-logo/app-icons/site.webmanifest",
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

