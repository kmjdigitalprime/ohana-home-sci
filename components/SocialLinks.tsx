import {
  Instagram,
  Linkedin,
  MessageCircle,
  Youtube,
} from "lucide-react";
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

function NetworkIcon({ id }: { id: SocialNetwork["id"] }) {
  if (id === "facebook") return <FacebookIcon />;
  if (id === "instagram") return <Instagram aria-hidden="true" />;
  if (id === "linkedin") return <Linkedin aria-hidden="true" />;
  if (id === "youtube") return <Youtube aria-hidden="true" />;
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
