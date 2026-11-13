import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  FileCheck2,
  Globe2,
  MapPin,
  MessageCircle,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { lands, whatsapp } from "@/lib/data";
import { LandCard } from "@/components/LandCard";

export default function Home() {
  const featuredLands = lands.filter((land) => land.featured).slice(0, 3);

  return (
    <>
      <section className="home-hero">
        <span className="demo-chip home-hero__demo">Photo de démonstration</span>
        <div className="container home-hero__inner">
          <div className="home-hero__copy">
            <div className="hero-kicker">
              <MapPin size={15} aria-hidden="true" />
              Terrains au Cameroun
            </div>
            <h1>Votre projet commence par un terrain.</h1>
            <p>
              Découvrez des terrains au Cameroun et bénéficiez d’un accompagnement
              clair, sur place comme à distance.
            </p>
            <div className="actions hero-actions">
              <Link className="btn btn-large" href="/terrains">
                Voir les terrains
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <a className="btn btn-large outline" href={whatsapp()}>
                <MessageCircle size={18} aria-hidden="true" />
                Parler à un conseiller
              </a>
            </div>
            <div className="hero-reassurance" aria-label="Informations importantes">
              <span>Prix exprimés en FCFA/m²</span>
              <span>Accompagnement local et diaspora</span>
              <span>Données à confirmer avec l’agence</span>
            </div>
          </div>
        </div>
      </section>

      <section className="quick-search" aria-labelledby="quick-search-title">
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

      <section className="section featured-section" aria-labelledby="featured-title">
        <div className="container">
          <div className="intro">
            <div>
              <div className="eyebrow">Sélection de terrains</div>
              <h2 id="featured-title">Des repères clairs pour mieux comparer.</h2>
            </div>
            <p>
              Prix indicatifs. Disponibilité, médias et informations foncières sont à
              confirmer avec l’agence avant toute décision.
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

      <section className="ohana-vision" aria-labelledby="ohana-vision-title">
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
            src="/ohana-vision-cameroun.jpg"
            alt="Paysage tropical camerounais traversé par une route en terre rouge, visuel éditorial de démonstration"
            fill
            sizes="100vw"
          />
          <div className="vision-stage__shade" aria-hidden="true" />
          <figcaption className="container vision-stage__content">
            <span className="editorial-label">Visuel éditorial de démonstration</span>
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

      <section className="section visit-experience" aria-labelledby="visit-experience-title">
        <div className="container visit-experience__grid">
          <figure className="editorial-photo editorial-photo--visit">
            <Image
              src="/ohana-visite-conseil.jpg"
              alt="Couple échangeant avec un conseiller autour d’un plan de terrain, scène éditoriale de démonstration"
              fill
              sizes="(max-width: 800px) 100vw, 58vw"
            />
            <figcaption className="editorial-photo__caption">
              Visuel éditorial de démonstration — cette scène ne représente pas une
              offre ni des membres identifiés de l’agence.
            </figcaption>
          </figure>

          <div className="visit-experience__copy">
            <span className="story-index" aria-hidden="true">01</span>
            <div className="eyebrow">Sur le terrain</div>
            <h2 id="visit-experience-title">Voir. Questionner. Comprendre.</h2>
            <p>
              Une visite utile ne consiste pas seulement à regarder une parcelle. Elle
              doit vous aider à relier le prix, l’accès communiqué, l’environnement et
              les informations effectivement disponibles.
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

      <section className="section diaspora-section" aria-labelledby="diaspora-title">
        <div className="container diaspora-grid">
          <div className="diaspora-copy">
            <div className="eyebrow">Depuis l’étranger</div>
            <h2 id="diaspora-title">
              Vous êtes loin. Votre décision peut rester éclairée.
            </h2>
            <p>
              Recevez les informations disponibles, préparez vos questions et organisez
              un échange selon votre fuseau horaire.
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
          <figure className="diaspora-visual">
            <Image
              src="/ohana-diaspora-distance.jpg"
              alt="Acheteur camerounais échangeant à distance devant des informations de terrain, scène éditoriale de démonstration"
              fill
              sizes="(max-width: 800px) 100vw, 52vw"
            />
            <figcaption className="editorial-label diaspora-visual__label">
              Visuel éditorial de démonstration
            </figcaption>
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

      <section className="section process-section" aria-labelledby="process-title">
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

      <section className="section final-cta" aria-labelledby="final-cta-title">
        <div className="container final-cta__inner">
          <div>
            <div className="eyebrow">Parlons de votre projet</div>
            <h2 id="final-cta-title">Quel terrain correspond à votre projet&nbsp;?</h2>
            <p>Explorez les références ou échangez directement avec un conseiller.</p>
          </div>
          <div className="actions final-cta__actions">
            <Link className="btn" href="/terrains">
              Découvrir les terrains
              <ArrowRight size={18} aria-hidden="true" />
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
