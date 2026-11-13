import { MessageCircle } from "lucide-react";
import { socialNetworks } from "@/lib/editorial";

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

export function SocialLinks({ includeWhatsApp = false }: { includeWhatsApp?: boolean }) {
  const visible = socialNetworks.filter(
    (network) =>
      network.confirmed && network.url && (includeWhatsApp || network.id !== "whatsapp"),
  );

  return (
    <div className="social-links" aria-label="Réseaux sociaux et messagerie">
      {visible.map((network) => (
        <a
          href={network.url ?? "#"}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={
            network.id === "facebook"
              ? "Suivre OHANA HOME SCI sur Facebook"
              : "Contacter OHANA HOME SCI sur WhatsApp"
          }
          key={network.id}
        >
          {network.id === "facebook" ? (
            <FacebookIcon />
          ) : (
            <MessageCircle aria-hidden="true" />
          )}
          <span>{network.label}</span>
        </a>
      ))}
    </div>
  );
}
