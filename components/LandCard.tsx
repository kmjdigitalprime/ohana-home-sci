import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin, MessageCircle, Route } from "lucide-react";
import { type Land, fcfa, whatsapp } from "@/lib/data";
import { landCover } from "@/lib/land-media";

export function LandCard({ land }: { land: Land }) {
  const href = `/terrains/${land.slug}`;

  return (
    <article className="card land-card">
      <Link
        className="land-card__visual"
        href={href}
        aria-label={`Découvrir le terrain ${land.name}`}
      >
        <Image
          className="land-card__image"
          src={landCover(land.slug)}
          alt={`Vue du secteur du terrain ${land.name}`}
          fill
          sizes="(max-width: 560px) 88vw, (max-width: 800px) 46vw, 33vw"
        />
        <span className="land-card__shade" aria-hidden="true" />
        <span className="land-card__region">
          <MapPin aria-hidden="true" />
          {land.region}
        </span>
        <span className="land-card__availability">Disponible</span>
      </Link>

      <div className="card-body">
        <span className="land-card__reference">{land.id}</span>
        <h3>
          <Link href={href}>{land.name}</Link>
        </h3>
        <p className="meta">
          <Route aria-hidden="true" />
          <span>
            {land.zone}
            <small>{land.access}</small>
          </span>
        </p>
        <p className="price">
          <small>Prix indicatif</small>
          <strong>{fcfa(land.pricePerSqm)}</strong>
        </p>
        <div className="land-card__actions">
          <Link className="land-card__link" href={href}>
            Voir le terrain
            <ArrowUpRight aria-hidden="true" />
          </Link>
          <a
            className="land-card__whatsapp"
            href={whatsapp(land.name)}
            aria-label={`Demander les informations du terrain ${land.name} sur WhatsApp`}
          >
            <MessageCircle aria-hidden="true" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </article>
  );
}
