import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  FileCheck2,
  Globe2,
  Map,
  MessageCircle,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { HeroCarousel } from "@/components/HeroCarousel";
import { LandCard } from "@/components/LandCard";
import { MotionObserver } from "@/components/MotionObserver";
import { lands, whatsapp } from "@/lib/data";

export default function Home() {
  const featuredLands = lands.filter((land) => land.featured).slice(0, 3);

  return (
    <>
      <MotionObserver />
      <HeroCarousel />

      <section
        className="quick-search"
        id="recherche-rapide"
        aria-labelledby="quick-search-title"
      >
        <form className="search-panel container" action="/terrains">
          <div className="search-panel__heading">
            <span className="search-panel__icon">
              <SlidersHorizontal size={21} aria-hidden="true" />
            </span>
            <div>
              <span className="eyebrow">Recherche rapide</span>
              <h2 id="quick-search-title">Trouvez votre point de départ.</h2>
            </div>
          </div>
          <div className="field">
            <label htmlFor="home-zone">Zone</label>
            <input id="home-zone" name="q" placeholder="Missolé, Yaoundé…" />
          </div>
          <div className="field">
            <label htmlFor="home-region">Région</label>
            <select id="home-region" name="region" defaultValue="">
              <option value="">Toutes les régions</option>
              <option>Littoral</option>
              <option>Centre</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="home-budget">Prix maximal au m²</label>
            <select id="home-budget" name="max" defaultValue="">
              <option value="">Tous les prix</option>
              <option value="5000">Jusqu’à 5 000 FCFA/m²</option>
              <option value="10000">Jusqu’à 10 000 FCFA/m²</option>
              <option value="15000">Jusqu’à 15 000 FCFA/m²</option>
            </select>
          </div>
          <button className="btn search-panel__button" type="submit">
            <Search size={18} aria-hidden="true" />
            Rechercher
          </button>
        </form>
      </section>

      <section
        className="section featured-section"
        aria-labelledby="featured-title"
        data-reveal
      >
        <div className="container">
          <div className="intro">
            <div>
              <div className="eyebrow">Sélection de terrains</div>
              <h2 id="featured-title">Des repères clairs pour mieux comparer.</h2>
            </div>
            <p>
              Prix indicatifs. Disponibilité et informations foncières doivent être
              confirmées avec l’agence avant toute décision.
            </p>
          </div>
          <div className="grid">
            {featuredLands.map((land) => (
              <LandCard key={land.id} land={land} />
            ))}
          </div>
          <div className="section-link">
            <Link className="text-link" href="/terrains">
              Voir les 9 références
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section
        className="section terrain-proof"
        aria-labelledby="terrain-proof-title"
        data-reveal
      >
        <div className="container">
          <div className="intro terrain-proof__intro">
            <div>
              <div className="eyebrow">Le territoire en images</div>
              <h2 id="terrain-proof-title">Du sol au ciel, comprendre l’environnement.</h2>
            </div>
            <div className="terrain-proof__note">
              <p>
                Les vues aériennes et les accès donnent une lecture plus concrète des
                paysages dans lesquels s’inscrivent les projets fonciers.
              </p>
              <Link className="text-link" href="/terrains">
                Explorer le catalogue
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="terrain-gallery terrain-gallery--extended">
            <figure className="terrain-gallery__item terrain-gallery__item--lead">
              <Image
                src="/ohana-terrain-reel-acces.jpg"
                alt="Voie en terre aménagée au milieu d’une végétation tropicale"
                fill
                sizes="(max-width: 800px) 100vw, 58vw"
              />
              <figcaption>
                <span>Voies d’accès</span>
                <small>Lire le terrain depuis le sol</small>
              </figcaption>
            </figure>
            <figure className="terrain-gallery__item">
              <Image
                src="/ohana-terrain-parcelles-01.webp"
                alt="Vue aérienne de parcelles et de chemins dans un environnement verdoyant"
                fill
                sizes="(max-width: 800px) 100vw, 42vw"
              />
              <figcaption>
                <span>Parcelles vues du ciel</span>
                <small>Comprendre l’organisation des accès</small>
              </figcaption>
            </figure>
            <figure className="terrain-gallery__item">
              <Image
                src="/ohana-terrain-parcelles-03.webp"
                alt="Vue aérienne d’un réseau de voies en terre autour de parcelles végétalisées"
                fill
                sizes="(max-width: 800px) 100vw, 42vw"
              />
              <figcaption>
                <span>Lecture du site</span>
                <small>Relier les voies et les espaces</small>
              </figcaption>
            </figure>
            <figure className="terrain-gallery__item terrain-gallery__item--wide">
              <Image
                src="/ohana-terrain-reel-aerien-02.jpg"
                alt="Panorama aérien de voies traversant une zone tropicale"
                fill
                sizes="100vw"
              />
              <figcaption>
                <span>Le paysage dans son ensemble</span>
                <small>Prendre de la hauteur avant de décider</small>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="ohana-vision" aria-labelledby="ohana-vision-title" data-reveal>
        <div className="container vision-intro">
          <div>
            <div className="eyebrow">La vision OHANA</div>
            <h2 id="ohana-vision-title">
              Une nouvelle manière d’aborder le terrain au Cameroun.
            </h2>
          </div>
          <p>
            Un terrain ne se résume pas à un prix. Il faut comprendre son accès,
            situer les informations disponibles et pouvoir poser les bonnes questions.
          </p>
        </div>

        <figure className="vision-stage">
          <Image
            className="vision-stage__image"
            src="/ohana-terrain-parcelles-02.webp"
            alt="Vue aérienne de parcelles structurées par plusieurs voies en terre"
            fill
            sizes="100vw"
          />
          <div className="vision-stage__shade" aria-hidden="true" />
          <figcaption className="container vision-stage__content">
            <p className="vision-stage__statement">
              Voir plus loin que la parcelle&nbsp;: comprendre le lieu, l’accès et le
              projet qu’il peut accueillir.
            </p>
            <div className="vision-principles" aria-label="Les repères OHANA">
              <span>
                <strong>Prix lisible</strong>
                <small>Une unité claire en FCFA/m²</small>
              </span>
              <span>
                <strong>Accès expliqué</strong>
                <small>La distance communiquée sans l’embellir</small>
              </span>
              <span>
                <strong>Information structurée</strong>
                <small>Les éléments confirmés distingués des données à vérifier</small>
              </span>
            </div>
          </figcaption>
        </figure>
      </section>

      <section
        className="section visit-experience"
        aria-labelledby="visit-experience-title"
        data-reveal
      >
        <div className="container visit-experience__grid">
          <figure className="editorial-photo editorial-photo--visit">
            <Image
              src="/ohana-terrain-reel-aerien-01.jpg"
              alt="Vue aérienne de chemins reliant plusieurs espaces végétalisés"
              fill
              sizes="(max-width: 800px) 100vw, 58vw"
            />
          </figure>

          <div className="visit-experience__copy">
            <span className="story-index" aria-hidden="true">
              01
            </span>
            <div className="eyebrow">Sur le terrain</div>
            <h2 id="visit-experience-title">Voir. Questionner. Comprendre.</h2>
            <p>
              Une visite utile aide à relier le prix, l’accès communiqué,
              l’environnement et les informations effectivement disponibles.
            </p>
            <div className="question-card">
              <span>Les bons repères avant de décider</span>
              <ul>
                <li>Quel accès est communiqué pour ce terrain&nbsp;?</li>
                <li>Quelles données sont confirmées aujourd’hui&nbsp;?</li>
                <li>Quels éléments doivent encore être vérifiés&nbsp;?</li>
              </ul>
            </div>
            <Link className="text-link" href="/contact?demande=visite">
              Préparer une visite
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section
        className="section diaspora-section"
        aria-labelledby="diaspora-title"
        data-reveal
      >
        <div className="container diaspora-grid">
          <div className="diaspora-copy">
            <div className="eyebrow">Depuis l’étranger</div>
            <h2 id="diaspora-title">Vous êtes loin. Votre décision peut rester éclairée.</h2>
            <p>
              Recevez les informations disponibles, préparez vos questions et
              organisez un échange selon votre fuseau horaire.
            </p>
            <ul className="check-list">
              <li>
                <FileCheck2 aria-hidden="true" />
                Informations disponibles présentées de façon structurée
              </li>
              <li>
                <Globe2 aria-hidden="true" />
                Échange préparé selon votre pays et votre fuseau
              </li>
              <li>
                <CalendarCheck aria-hidden="true" />
                Visite proposée puis confirmée par l’agence
              </li>
            </ul>
            <Link className="btn" href="/diaspora">
              Découvrir l’accompagnement diaspora
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <figure className="diaspora-visual diaspora-visual--real">
            <Image
              src="/ohana-terrain-reel-aerien-03.jpg"
              alt="Vaste territoire verdoyant traversé par plusieurs voies d’accès"
              fill
              sizes="(max-width: 800px) 100vw, 52vw"
            />
            <div className="diaspora-visual__note">
              <Globe2 size={24} aria-hidden="true" />
              <span>
                <b>Un même niveau d’information</b>
                <small>Au Cameroun comme à l’étranger</small>
              </span>
            </div>
          </figure>
        </div>
      </section>

      <section className="section process-section" aria-labelledby="process-title" data-reveal>
        <div className="container">
          <div className="intro process-intro">
            <div>
              <div className="eyebrow">Votre parcours</div>
              <h2 id="process-title">De la recherche à la visite.</h2>
            </div>
            <p>Trois étapes simples pour avancer sans confondre vitesse et précipitation.</p>
          </div>
          <div className="steps">
            <article className="step-card">
              <div className="step-num">01</div>
              <h3>Comparez</h3>
              <p>Filtrez les terrains par région, zone et prix au m².</p>
            </article>
            <article className="step-card">
              <div className="step-num">02</div>
              <h3>Vérifiez</h3>
              <p>Demandez les informations confirmées et disponibles sur le terrain.</p>
            </article>
            <article className="step-card">
              <div className="step-num">03</div>
              <h3>Visitez</h3>
              <p>Proposez un créneau ; l’agence vous le confirme ensuite.</p>
            </article>
          </div>
        </div>
      </section>

      <section
        className="section achievements-teaser"
        aria-labelledby="achievements-title"
        data-reveal
      >
        <div className="container achievements-teaser__grid">
          <div className="achievements-teaser__copy">
            <div className="eyebrow">Réalisations</div>
            <h2 id="achievements-title">Une galerie pensée pour la preuve.</h2>
            <p>
              Chaque réalisation publiée réunira son contexte, ses médias et les
              informations autorisées par l’agence.
            </p>
            <Link className="btn" href="/realisations">
              Découvrir l’espace Réalisations
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <div className="achievements-teaser__mosaic" aria-hidden="true">
            <div>
              <Image src="/ohana-terrain-parcelles-03.webp" alt="" fill sizes="35vw" />
            </div>
            <div>
              <Image src="/ohana-terrain-reel-acces.jpg" alt="" fill sizes="22vw" />
            </div>
            <div>
              <Image src="/ohana-terrain-reel-aerien-02.jpg" alt="" fill sizes="22vw" />
            </div>
          </div>
        </div>
      </section>

      <section
        className="section promoter-teaser"
        aria-labelledby="promoter-teaser-title"
        data-reveal
      >
        <div className="container promoter-teaser__grid">
          <figure className="promoter-teaser__portrait">
            <Image
              src="/ohana-promoteur-studio.jpg"
              alt="Portrait du promoteur d’OHANA HOME SCI"
              fill
              sizes="(max-width: 800px) 100vw, 42vw"
            />
          </figure>
          <div>
            <div className="eyebrow">Le promoteur</div>
            <h2 id="promoter-teaser-title">La vision derrière OHANA HOME SCI.</h2>
            <p>
              Une page éditoriale dédiée à la personne qui porte le projet et à la
              manière dont l’agence souhaite accompagner les acheteurs.
            </p>
            <Link className="text-link" href="/agence/le-promoteur">
              Découvrir la page du promoteur
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section final-cta" aria-labelledby="final-cta-title" data-reveal>
        <div className="container final-cta__inner">
          <div>
            <div className="eyebrow">Parlons de votre projet</div>
            <h2 id="final-cta-title">Quel terrain correspond à votre projet&nbsp;?</h2>
            <p>Explorez les références ou échangez directement avec un conseiller.</p>
          </div>
          <div className="actions final-cta__actions">
            <Link className="btn" href="/terrains">
              <Map aria-hidden="true" />
              Découvrir les terrains
            </Link>
            <a className="btn outline" href={whatsapp()}>
              <MessageCircle aria-hidden="true" />
              Échanger avec l’agence
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
