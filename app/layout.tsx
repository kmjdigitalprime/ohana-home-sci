import type { Metadata } from "next";
import "./globals.css";
import "./mobile.css";
import "./premium.css";
import "./mobile-premium.css";
import "./compass-mobile.css";
import "./brand.css";
import "./header.css";
import "./footer.css";
import "./land-gallery.css";
import { Footer, Header } from "@/components/Site";
import { socialNetworks } from "@/lib/editorial";

export const metadata: Metadata = {
  metadataBase: new URL("https://ohanahomesci.com"),
  applicationName: "OHANA HOME SCI",
  title: {
    default: "OHANA HOME SCI | Terrains au Cameroun",
    template: "%s — OHANA HOME SCI",
  },
  description:
    "Découvrez des terrains au Cameroun et préparez votre visite avec OHANA HOME SCI.",
  alternates: {
    canonical: "/",
  },
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
        url: "/ohana-logo/open-graph/ohana-home-open-graph-1200x630.png",
        width: 1200,
        height: 630,
        alt: "OHANA HOME SCI — Terrains au Cameroun — Sentez-vous chez vous",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OHANA HOME SCI | Terrains au Cameroun",
    description:
      "Découvrez des terrains au Cameroun et préparez votre visite avec OHANA HOME SCI.",
    images: ["/ohana-logo/open-graph/ohana-home-open-graph-1200x630.png"],
  },
};

const confirmedSocialProfiles = socialNetworks
  .filter(
    (network) =>
      network.confirmed &&
      network.url &&
      network.id !== "whatsapp",
  )
  .map((network) => network.url as string);

const realEstateAgent = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "OHANA HOME SCI",
  url: "https://ohanahomesci.com/",
  logo: "https://ohanahomesci.com/ohana-logo/web-optimized/ohana-home-logo-primary.svg",
  image:
    "https://ohanahomesci.com/ohana-logo/open-graph/ohana-home-open-graph-1200x630.png",
  telephone: "+237640235310",
  areaServed: {
    "@type": "Country",
    name: "Cameroun",
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
      areaServed: "CM",
      availableLanguage: ["fr"],
    },
  ],
  sameAs: confirmedSocialProfiles,
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr-CM">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(realEstateAgent).replace(/</g, "\\u003c"),
          }}
        />
        <Header />
        <main id="contenu-principal">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

