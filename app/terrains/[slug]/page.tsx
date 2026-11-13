import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, MessageCircle, Route } from "lucide-react";
import { EnquiryForm } from "@/components/EnquiryForm";
import { LandMap } from "@/components/LandMap";
import { EventLink } from "@/components/Site";
import { fcfa, lands, whatsapp } from "@/lib/data";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const land = lands.find((item) => item.slug === slug);
  return {
    title: land?.name ?? "Terrain",
    description: land
      ? `${land.name}, ${land.region} — prix indicatif ${fcfa(land.pricePerSqm)}.`
      : "Terrain",
  };
}

export default async function Detail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const land = lands.find((item) => item.slug === slug);
  if (!land) notFound();

  return (
    <>
      <div className="page-hero land-detail-hero">
        <div className="container">
          <Link className="back-link" href="/terrains">
            <ArrowLeft aria-hidden="true" />
            Tous les terrains
          </Link>
          <div className="eyebrow">
            {land.region} · {land.id}
          </div>
          <h1>{land.name}</h1>
          <p>
            {land.zone} · {land.access}
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container detail">
          <div>
            <div className="land-overview">
              <div className="land-overview__graphic" aria-hidden="true">
                <MapPin />
                <span>{land.region}</span>
              </div>
              <div>
                <span className="eyebrow">Repère principal</span>
                <h2>{land.zone}</h2>
                <p>
                  <Route aria-hidden="true" />
                  {land.access}
                </p>
              </div>
            </div>

            <div className="notice">
              Informations indicatives soumises à confirmation par OHANA HOME SCI.
            </div>
            <h2 className="section-subtitle">Ce que nous savons</h2>
            <div className="facts">
              <div className="fact">
                <small>Prix indicatif</small>
                <br />
                <b>{fcfa(land.pricePerSqm)}</b>
              </div>
              <div className="fact">
                <small>Accès communiqué</small>
                <br />
                <b>{land.access}</b>
              </div>
              <div className="fact">
                <small>Superficie</small>
                <br />
                <b>Non communiquée</b>
              </div>
              <div className="fact">
                <small>Prix total</small>
                <br />
                <b>Non calculé</b>
              </div>
              <div className="fact">
                <small>Plan de lotissement</small>
                <br />
                <b>Information non publiée</b>
              </div>
              <div className="fact">
                <small>Informations foncières</small>
                <br />
                <b>Validation requise</b>
              </div>
            </div>

            <LandMap land={land} />

            <h2 className="section-subtitle" id="visite">
              Demander une visite
            </h2>
            <p>Indiquez vos coordonnées. L’agence confirmera ensuite le créneau.</p>
            <EnquiryForm landSlug={land.slug} />
          </div>

          <aside className="detail-aside">
            <span className="status">Informations indicatives</span>
            <h2>Intéressé par ce terrain&nbsp;?</h2>
            <EventLink
              className="btn"
              href={whatsapp(land.name)}
              type="whatsapp_click"
              slug={land.slug}
            >
              <MessageCircle aria-hidden="true" />
              Ouvrir WhatsApp
            </EventLink>
            <p>
              <small>Le message contient le nom du terrain et reste modifiable.</small>
            </p>
            <a className="text-link" href="#visite">
              Demander une visite
            </a>
          </aside>
        </div>
      </section>
    </>
  );
}
