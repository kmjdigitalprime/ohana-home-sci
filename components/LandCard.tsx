import Link from "next/link";
import { ArrowUpRight, MapPin, Route } from "lucide-react";
import { type Land, fcfa } from "@/lib/data";

export function LandCard({ land }: { land: Land }) {
  return (
    <article className="card land-card">
      <Link className="land-card__visual" href={`/terrains/${land.slug}`}>
        <div className="land-card__topography" aria-hidden="true" />
        <span className="land-card__region">
          <MapPin aria-hidden="true" />
          {land.region}
        </span>
        <strong>{land.id}</strong>
      </Link>
      <div className="card-body">
        <span className="status">Prix indicatif</span>
        <h3>
          <Link href={`/terrains/${land.slug}`}>{land.name}</Link>
        </h3>
        <p className="meta">
          <Route aria-hidden="true" />
          {land.zone} · {land.access}
        </p>
        <p className="price">À partir de {fcfa(land.pricePerSqm)}</p>
        <Link className="land-card__link" href={`/terrains/${land.slug}`}>
          Examiner le terrain
          <ArrowUpRight aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
