import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Le promoteur",
  description: "La page dédiée au promoteur d’OHANA HOME SCI.",
};

export default function Promoteur() {
  return (
    <>
      <div className="page-hero promoter-page-hero">
        <div className="container">
          <div className="eyebrow">OHANA HOME SCI</div>
          <h1>Le promoteur</h1>
        </div>
      </div>

      <section className="section promoter-portrait" aria-label="Portrait du promoteur">
        <div className="container promoter-portrait__grid">
          <figure className="promoter-portrait__main">
            <Image
              src="/ohana-promoteur-studio.jpg"
              alt="Portrait du promoteur d’OHANA HOME SCI"
              fill
              sizes="(max-width: 800px) 100vw, 48vw"
              priority
            />
          </figure>
          <div className="promoter-portrait__identity">
            <span className="eyebrow">Une vision de l’immobilier au Cameroun</span>
            <div className="promoter-portrait__line" aria-hidden="true" />
            <div className="actions">
              <Link className="btn" href="/terrains">
                Découvrir les terrains
              </Link>
              <Link className="btn outline" href="/contact">
                Échanger avec l’agence
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section cream promoter-gallery-section" aria-label="Galerie du promoteur">
        <div className="container promoter-gallery promoter-gallery--silent">
          <figure className="promoter-gallery__item promoter-gallery__item--plan">
            <Image
              src="/ohana-promoteur-plan.jpg"
              alt="Le promoteur consultant un grand document dans son bureau"
              fill
              sizes="(max-width: 800px) 100vw, 58vw"
            />
          </figure>
          <figure className="promoter-gallery__item">
            <Image
              src="/ohana-promoteur-bureau-large.jpg"
              alt="Le promoteur à son bureau devant un ordinateur portable"
              fill
              sizes="(max-width: 800px) 100vw, 42vw"
            />
          </figure>
          <figure className="promoter-gallery__item">
            <Image
              src="/ohana-promoteur-bureau.jpg"
              alt="Le promoteur dans son environnement de travail"
              fill
              sizes="(max-width: 800px) 100vw, 42vw"
            />
          </figure>
          <figure className="promoter-gallery__item promoter-gallery__item--portrait">
            <Image
              src="/ohana-promoteur-portrait.jpg"
              alt="Portrait rapproché du promoteur d’OHANA HOME SCI"
              fill
              sizes="(max-width: 800px) 100vw, 32vw"
            />
          </figure>
        </div>
      </section>
    </>
  );
}
