import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./mobile.css";
import "./premium.css";
import "./compass-mobile.css";
import "./brand-logo.css";
import { Footer, Header } from "@/components/Site";
import { socialNetworks } from "@/lib/editorial";

const siteUrl = "https://ohanahomesci.com";
const shareImage = `${siteUrl}/ohana-logo/open-graph/ohana-home-open-graph-1200x630.png`;
const organizationLogo = `${siteUrl}/ohana-logo/web-optimized/ohana-home-logo-primary.svg`;
const sameAs = socialNetworks
  .filter((network) => network.confirmed && network.url && network.id !== "whatsapp")
  .map((network) => network.url as string);

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "@id": `${siteUrl}/#organization`,
  name: "OHANA HOME SCI",
  url: `${siteUrl}/`,
  logo: organizationLogo,
  image: shareImage,
  description:
    "Agence immobilière spécialisée dans la présentation et la vente de terrains au Cameroun, pour les clients locaux et la diaspora.",
  telephone: "+237640235310",
  areaServed: {
    "@type": "Country",
    name: "Cameroun",
    alternateName: "Cameroon",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+237640235310",
      contactType: "service client",
      areaServed: "CM",
      availableLanguage: ["fr"],
    },
    {
      "@type": "ContactPoint",
      telephone: "+15146773168",
      contactType: "service client international",
      availableLanguage: ["fr"],
    },
  ],
  sameAs,
};

export const viewport: Viewport = {
  themeColor: "#E26110",
  colorScheme: "light",
};

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
      { url: "/favicon.ico?v=3", sizes: "any", type: "image/x-icon" },
      { url: "/icon.svg?v=3", type: "image/svg+xml" },
      { url: "/ohana-logo/favicon/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/ohana-logo/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/ohana-logo/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.ico?v=3",
    apple: [
      {
        url: "/apple-icon.png?v=3",
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
        url: "/ohana-logo/open-graph/ohana-home-open-graph-1200x630.png",
        width: 1200,
        height: 630,
        alt: "OHANA HOME SCI — Terrains au Cameroun — Sentez vous chez vous",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OHANA HOME SCI | Terrains au Cameroun",
    description:
      "Découvrez des terrains au Cameroun et préparez votre visite avec OHANA HOME SCI.",
    images: [
      {
        url: "/ohana-logo/open-graph/ohana-home-open-graph-1200x630.png",
        width: 1200,
        height: 630,
        alt: "OHANA HOME SCI — Terrains au Cameroun — Sentez vous chez vous",
      },
    ],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr-CM">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
