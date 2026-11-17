import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, FileSearch, MapPin, MessageCircle, Route } from "lucide-react";
import { EnquiryForm } from "@/components/EnquiryForm";
import { LandGallery } from "@/components/LandGallery";
import { LandCard } from "@/components/LandCard";
import { LandMap } from "@/components/LandMap";
import { EventLink } from "@/components/Site";
import { fcfa, lands, whatsapp } from "@/lib/data";
import { landGallery } from "@/lib/land-media";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const land = lands.find((item) => item.slug === slug);
  const gallery = land ? landGallery(land.slug, land.name) : [];
  const description = land
    ? land.pricePerSqm === null
      ? `${land.name}, ${land.region} — informations disponibles auprès d’OHANA HOME SCI.`
      : `${land.name}, ${land.region} — prix indicatif ${fcfa(land.pricePerSqm)}.`
    : "Terrain";

  return {
    title: land?.name ?? "Terrain",
    description,
    alternates: land ? { canonical: `/terrains/${land.slug}` } : undefined,
    openGraph: land
      ? {
          title: land.name,
          description,
          url: `/terrains/${land.slug}`,
          images: gallery[0]
            ? [
                {
                  url: gallery[0].src,
                  width: gallery[0].width,
                  height: gallery[0].height,
                  alt: gallery[0].alt,
                },
              ]
            : undefined,
        }
      : undefined,
    twitter:
      land && gallery[0]
        ? {
            card: "summary_large_image" as const,
            title: land.name,
            description,
            images: [gallery[0].src],
          }
        : undefined,
  };
}

export default async function Detail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const land = lands.find((item) => item.slug === slug);
  if (!land) notFound();
  const gallery = landGallery(land.slug, land.name);
  const similarLands = lands
    .filter((item) => item.slug !== land.slug && item.region === land.region)
    .slice(0, 3);

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
            <LandGallery images={gallery} landName={land.name} />

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

            <section className="land-steps" aria-labelledby="land-steps-title">
              <span className="eyebrow">Comment avancer</span>
              <h2 id="land-steps-title" className="section-subtitle">Un parcours clair avant toute décision.</h2>
              <div className="land-steps__grid">
                <article>
                  <span>01</span>
                  <FileSearch aria-hidden="true" />
                  <h3>Demandez les informations</h3>
                  <p>Recevez les éléments actuellement disponibles pour cette référence.</p>
                </article>
                <article>
                  <span>02</span>
                  <MessageCircle aria-hidden="true" />
                  <h3>Échangez avec l’agence</h3>
                  <p>Posez vos questions et distinguez les données confirmées de celles à vérifier.</p>
                </article>
                <article>
                  <span>03</span>
                  <CheckCircle2 aria-hidden="true" />
                  <h3>Planifiez une visite</h3>
                  <p>Proposez un créneau ; l’agence vous confirme ensuite les modalités.</p>
                </article>
              </div>
            </section>

            <section className="land-faq" aria-labelledby="land-faq-title">
              <span className="eyebrow">Questions fréquentes</span>
              <h2 id="land-faq-title" className="section-subtitle">Préparer votre échange.</h2>
              <details>
                <summary>Le prix affiché est-il définitif&nbsp;?</summary>
                <p>Le prix au m² est indicatif et doit être confirmé directement avec OHANA HOME SCI.</p>
              </details>
              <details>
                <summary>Peut-on organiser une visite depuis l’étranger&nbsp;?</summary>
                <p>Vous pouvez demander un échange à distance et proposer un créneau de visite. L’agence vous confirme ensuite les possibilités.</p>
              </details>
              <details>
                <summary>Où trouver les informations foncières&nbsp;?</summary>
                <p>Les informations publiables et disponibles sont communiquées par l’agence. Les éléments encore non confirmés restent clairement signalés.</p>
              </details>
            </section>

            <h2 className="section-subtitle" id="visite">
              Demander une visite
            </h2>
            <p>Indiquez vos coordonnées. L’agence confirmera ensuite le créneau.</p>
            <EnquiryForm landSlug={land.slug} />
          </div>

          <aside className="detail-aside">
            <span className="status">Informations indicatives</span>
            <h2>Intéressé par ce terrain&nbsp;?</h2>
            <p className="detail-aside__price">
              <small>Prix indicatif</small>
              <strong>{fcfa(land.pricePerSqm)}</strong>
            </p>
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

      {similarLands.length > 0 && (
        <section className="section similar-lands" aria-labelledby="similar-lands-title">
          <div className="container">
            <div className="intro">
              <div>
                <span className="eyebrow">Dans la même région</span>
                <h2 id="similar-lands-title">Continuez votre recherche.</h2>
              </div>
              <Link className="text-link" href={`/terrains?region=${encodeURIComponent(land.region)}`}>
                Voir toute la région
              </Link>
            </div>
            <div className="grid">
              {similarLands.map((item) => <LandCard key={item.id} land={item} />)}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

