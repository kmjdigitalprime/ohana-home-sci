import Image from "next/image";
import Link from "next/link";

export default function Agence() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="eyebrow">L’agence</div>
          <h1>Un accompagnement clair, à chaque étape.</h1>
          <p>OHANA HOME SCI accompagne les projets de terrains au Cameroun.</p>
        </div>
      </div>

      <section className="section agency-method" aria-labelledby="agency-method-title">
        <div className="container agency-method__grid">
          <div className="agency-method__copy">
            <div className="eyebrow">Notre méthode</div>
            <h2 id="agency-method-title">Comprendre avant d’avancer.</h2>
            <p>
              Écouter le projet, présenter les informations confirmées, préparer la
              visite puis accompagner les prochaines vérifications, au Cameroun comme
              à distance.
            </p>
            <Link className="btn" href="/agence/le-promoteur">
              Découvrir le promoteur
            </Link>
          </div>

          <figure className="agency-photo">
            <Image
              src="/ohana-agence-douala.jpg"
              alt="Façade de l’agence OHANA HOME SCI à Douala"
              fill
              sizes="(max-width: 800px) 100vw, 56vw"
              priority
            />
          </figure>
        </div>
      </section>
    </>
  );
}
