import { MessageCircle } from "lucide-react";
import {
  socialNetworks,
  type SocialNetwork,
} from "@/lib/editorial";

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.098 4.388 23.093 10.125 24v-8.437H7.078v-3.49h3.047V9.414c0-3.025 1.792-4.697 4.533-4.697 1.313 0 2.686.236 2.686.236v2.97h-1.513c-1.49 0-1.956.93-1.956 1.887v2.263h3.328l-.532 3.49h-2.796V24C19.612 23.093 24 18.098 24 12.073Z"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect
        x="2.5"
        y="2.5"
        width="19"
        height="19"
        rx="5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle
        cx="12"
        cy="12"
        r="4.25"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="17.4" cy="6.7" r="1.2" fill="currentColor" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V8.98h3.42v1.57h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.29ZM5.32 7.41a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.1 20.45H3.54V8.98H7.1v11.47Z"
      />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.81ZM9.55 15.57V8.43L15.82 12l-6.27 3.57Z"
      />
    </svg>
  );
}

function NetworkIcon({ id }: { id: SocialNetwork["id"] }) {
  if (id === "facebook") return <FacebookIcon />;
  if (id === "instagram") return <InstagramIcon />;
  if (id === "linkedin") return <LinkedInIcon />;
  if (id === "youtube") return <YouTubeIcon />;
  return <MessageCircle aria-hidden="true" />;
}

const socialLabels: Record<SocialNetwork["id"], string> = {
  facebook: "Suivre OHANA HOME SCI sur Facebook",
  instagram: "Suivre OHANA HOME SCI sur Instagram",
  linkedin: "Suivre OHANA HOME SCI sur LinkedIn",
  youtube: "Suivre OHANA HOME SCI sur YouTube",
  tiktok: "Suivre OHANA HOME SCI sur TikTok",
  x: "Suivre OHANA HOME SCI sur X",
  whatsapp: "Contacter OHANA HOME SCI sur WhatsApp",
};

const displayedNetworks = new Set<SocialNetwork["id"]>([
  "facebook",
  "instagram",
  "linkedin",
  "youtube",
]);

export function SocialLinks({ includeWhatsApp = false }: { includeWhatsApp?: boolean }) {
  const visible = socialNetworks.filter(
    (network) =>
      displayedNetworks.has(network.id) ||
      (includeWhatsApp && network.id === "whatsapp"),
  );

  return (
    <div className="social-links" aria-label="Réseaux sociaux et messagerie">
      {visible.map((network) => {
        const contents = (
          <>
            <NetworkIcon id={network.id} />
            <span>{network.label}</span>
          </>
        );

        return network.confirmed && network.url ? (
          <a
            href={network.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={socialLabels[network.id]}
            key={network.id}
          >
            {contents}
          </a>
        ) : (
          <span
            className="social-link social-link--pending"
            aria-label={`${network.label} — lien officiel à renseigner`}
            title={`Lien ${network.label} à renseigner`}
            key={network.id}
          >
            {contents}
          </span>
        );
      })}
    </div>
  );
}
