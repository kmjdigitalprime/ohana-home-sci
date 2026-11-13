import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Camera, FileCheck2, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Réalisations",
  description:
    "L’espace consacré aux réalisations documentées et autorisées d’OHANA HOME SCI.",
};

const gallery = [
  {
    src: "/ohana-terrain-parcelles-01.webp",
    alt: "Vue aérienne de parcelles desservies par plusieurs voies en terre",
    title: "Lecture aérienne",
    text: "Situer les voies et comprendre l’organisation d’un site.",
  },
  {
    src: "/ohana-terrain-reel-acces.jpg",
    alt: "Voie d’accès en terre traversant une palmeraie",
    title: "Accès au terrain",
    text: "Documenter le parcours et l’état visible de l’accès.",
  },
  {
    src: "/ohana-terrain-parcelles-03.webp",
    alt: "Vue du ciel d’un espace végétalisé structuré par des chemins",
    title: "Vue d’ensemble",
    text: "Prendre de la hauteur pour replacer chaque espace dans son environnement.",
  },
];

export default function RealisationsPage() {
  return (
    <>
      <div className="page-hero achievements-hero">
        <div className="container">
          <div className="eyebrow">Réalisations</div>
          <h1>Montrer le terrain, documenter le parcours.</h1>
          <p>
            Un espace conçu pour présenter les projets validés avec des images, un
            contexte clair et des informations autorisées.
          </p>
        </div>
      </div>

      <section className="section achievements-page" aria-labelledby="achievements-gallery-title">
        <div className="container">
          <div className="intro">
            <div>
              <div className="eyebrow">Notre regard sur le terrain</div>
              <h2 id="achievements-gallery-title">Observer avant de raconter.</h2>
            </div>
            <p>
              La galerie publique est structurée pour accueillir uniquement des
              réalisations confirmées et accompagnées d’une autorisation de diffusion.
            </p>
          </div>

          <div className="achievements-gallery">
            {gallery.map((item, index) => (
              <article className={index === 0 ? "is-featured" : undefined} key={item.src}>
                <div className="achievements-gallery__media">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes={index === 0 ? "(max-width: 800px) 100vw, 56vw" : "(max-width: 800px) 100vw, 28vw"}
                  />
                </div>
                <div className="achievements-gallery__copy">
                  <span>0{index + 1}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section achievement-method" aria-labelledby="achievement-method-title">
        <div className="container">
          <div className="eyebrow">Publication maîtrisée</div>
          <h2 id="achievement-method-title">Ce que chaque réalisation pourra préciser.</h2>
          <div className="achievement-method__grid">
            <article>
              <MapPin aria-hidden="true" />
              <h3>Le contexte</h3>
              <p>Une localisation et une date uniquement lorsqu’elles sont validées.</p>
            </article>
            <article>
              <Camera aria-hidden="true" />
              <h3>Les médias</h3>
              <p>Des photographies et vidéos dont la publication est autorisée.</p>
            </article>
            <article>
              <FileCheck2 aria-hidden="true" />
              <h3>Les informations</h3>
              <p>Un récit factuel sans résultat, client ou partenaire inventé.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section final-cta">
        <div className="container final-cta__inner">
          <div>
            <div className="eyebrow">Votre projet</div>
            <h2>Passons de l’inspiration à la recherche.</h2>
          </div>
          <div className="actions">
            <Link className="btn" href="/terrains">
              Découvrir les terrains
              <ArrowRight aria-hidden="true" />
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
