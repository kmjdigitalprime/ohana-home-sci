import Image from "next/image";
import Link from "next/link";

export default function Promoteur() {
  return (
    <>
      <div className="page-hero promoter-page-hero">
        <div className="container">
          <div className="eyebrow">Le promoteur</div>
          <h1>Une vision à documenter, une histoire à raconter.</h1>
          <p>Les portraits sont reçus. Le contenu reste privé jusqu’à validation.</p>
        </div>
      </div>

      <section className="section promoter-intro" aria-labelledby="promoter-intro-title">
        <div className="container promoter-intro__grid">
          <figure className="promoter-main-photo">
            <Image
              src="/ohana-promoteur-studio.jpg"
              alt="Portrait en pied fourni pour la page du promoteur d’OHANA HOME SCI"
              fill
              sizes="(max-width: 800px) 100vw, 46vw"
              priority
            />
            <figcaption>Portrait fourni par l’agence</figcaption>
          </figure>

          <div className="promoter-intro__copy">
            <span className="status">Portrait reçu · identité éditoriale à valider</span>
            <h2 id="promoter-intro-title">Nom et fonction à confirmer</h2>
            <p>
              Nous n’inventons ni biographie, ni diplôme, ni date, ni citation. Pour
              publier cette page, il faut encore confirmer le nom et la fonction exacts,
              les étapes vérifiées du parcours et un mot approuvé à la première
              personne.
            </p>
            <div className="promoter-pending">
              <strong>Contenus attendus</strong>
              <span>Pourquoi OHANA HOME SCI a été créée</span>
              <span>La difficulté que l’agence veut résoudre pour un acheteur</span>
              <span>L’accompagnement souhaité pour la diaspora</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section cream promoter-gallery-section" aria-labelledby="promoter-gallery-title">
        <div className="container">
          <div className="intro">
            <div>
              <div className="eyebrow">Dans son environnement de travail</div>
              <h2 id="promoter-gallery-title">Des images réelles, un récit à valider.</h2>
            </div>
            <p>
              Ces photographies ont été remises pour le site. Elles n’ajoutent aucune
              information biographique non confirmée.
            </p>
          </div>

          <div className="promoter-gallery">
            <figure className="promoter-gallery__item promoter-gallery__item--plan">
              <Image
                src="/ohana-promoteur-plan.jpg"
                alt="Personne consultant un grand document dans un bureau"
                fill
                sizes="(max-width: 800px) 100vw, 58vw"
              />
              <figcaption>Lecture d’un document — photo fournie</figcaption>
            </figure>
            <figure className="promoter-gallery__item">
              <Image
                src="/ohana-promoteur-bureau-large.jpg"
                alt="Portrait au bureau devant un ordinateur portable"
                fill
                sizes="(max-width: 800px) 100vw, 42vw"
              />
              <figcaption>Au bureau — photo fournie</figcaption>
            </figure>
            <figure className="promoter-gallery__item">
              <Image
                src="/ohana-promoteur-bureau.jpg"
                alt="Portrait assis dans un bureau avec un ordinateur portable"
                fill
                sizes="(max-width: 800px) 100vw, 42vw"
              />
              <figcaption>Environnement de travail — photo fournie</figcaption>
            </figure>
            <figure className="promoter-gallery__item promoter-gallery__item--portrait">
              <Image
                src="/ohana-promoteur-portrait.jpg"
                alt="Portrait rapproché fourni pour la page du promoteur"
                fill
                sizes="(max-width: 800px) 100vw, 32vw"
              />
              <figcaption>Portrait fourni par l’agence</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="section promoter-next">
        <div className="container">
          <h2>Poursuivre votre projet</h2>
          <div className="actions">
            <Link className="btn" href="/terrains">
              Découvrir les terrains
            </Link>
            <Link className="btn outline" href="/contact">
              Échanger avec l’agence
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
