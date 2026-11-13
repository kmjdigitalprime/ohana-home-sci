"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Globe2,
  MapPin,
  MessageCircle,
  Route,
  Ruler,
} from "lucide-react";
import { whatsapp } from "@/lib/data";

const slides = [
  {
    src: "/ohana-terrain-parcelles-01.webp",
    alt: "Vue aérienne de parcelles desservies par des voies en terre dans un environnement verdoyant",
  },
  {
    src: "/ohana-terrain-reel-aerien-03.jpg",
    alt: "Vue aérienne de voies d’accès traversant un vaste espace tropical",
  },
  {
    src: "/ohana-terrain-reel-acces.jpg",
    alt: "Voie d’accès en terre aménagée au milieu d’une palmeraie",
  },
  {
    src: "/ohana-terrain-parcelles-02.webp",
    alt: "Parcelles vues du ciel avec un réseau de voies d’accès",
  },
  {
    src: "/ohana-terrain-reel-aerien-01.jpg",
    alt: "Panorama aérien d’un territoire vert structuré par des voies en terre",
  },
];

export function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const touchStart = useRef<number | null>(null);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion) return;

    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % slides.length),
      7000,
    );
    return () => window.clearInterval(timer);
  }, [paused, reducedMotion]);

  const previous = () =>
    setActive((current) => (current - 1 + slides.length) % slides.length);
  const next = () => setActive((current) => (current + 1) % slides.length);

  return (
    <section
      className="home-hero home-hero--carousel"
      aria-roledescription="carrousel"
      aria-label="Découvrir les terrains OHANA HOME SCI"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
      onTouchStart={(event) => {
        touchStart.current = event.touches[0]?.clientX ?? null;
        setPaused(true);
      }}
      onTouchEnd={(event) => {
        const start = touchStart.current;
        const end = event.changedTouches[0]?.clientX;
        if (start !== null && end !== undefined && Math.abs(start - end) > 48) {
          if (start > end) next();
          else previous();
        }
        touchStart.current = null;
      }}
    >
      <div className="hero-carousel" aria-live="off">
        {slides.map((slide, index) => (
          <div
            className={`hero-carousel__slide${index === active ? " is-active" : ""}`}
            aria-hidden={index !== active}
            key={slide.src}
          >
            <Image
              src={slide.src}
              alt={index === active ? slide.alt : ""}
              fill
              sizes="100vw"
              preload={index === 0}
            />
          </div>
        ))}
      </div>
      <div className="home-hero__shade" aria-hidden="true" />
      <div className="home-hero__lines" aria-hidden="true" />

      <div className="container home-hero__inner">
        <div className="home-hero__copy">
          <div className="hero-kicker">
            <MapPin size={15} aria-hidden="true" />
            Cameroun · Littoral &amp; Centre
          </div>
          <h1>
            Votre projet commence par <em>un terrain.</em>
          </h1>
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
        </div>

        <aside className="hero-commitments" aria-label="Les repères OHANA HOME SCI">
          <div className="hero-commitments__heading">
            <span>Les repères OHANA</span>
            <small>Pour décider avec plus de clarté</small>
          </div>
          <div className="hero-commitments__item">
            <Ruler aria-hidden="true" />
            <span>
              <strong>Prix au m² explicite</strong>
              <small>Une unité lisible en FCFA/m²</small>
            </span>
          </div>
          <div className="hero-commitments__item">
            <Route aria-hidden="true" />
            <span>
              <strong>Accès renseigné</strong>
              <small>Selon les informations disponibles</small>
            </span>
          </div>
          <div className="hero-commitments__item">
            <Globe2 aria-hidden="true" />
            <span>
              <strong>Accompagnement à distance</strong>
              <small>Pour les acheteurs de la diaspora</small>
            </span>
          </div>
        </aside>
      </div>

      <div className="hero-carousel__controls" aria-label="Contrôles de la bannière">
        <button type="button" onClick={previous} aria-label="Image précédente">
          <ArrowLeft aria-hidden="true" />
        </button>
        <div className="hero-carousel__dots" aria-label="Choisir une image">
          {slides.map((slide, index) => (
            <button
              type="button"
              className={index === active ? "is-active" : undefined}
              aria-label={`Afficher l’image ${index + 1} sur ${slides.length}`}
              aria-current={index === active ? "true" : undefined}
              onClick={() => setActive(index)}
              key={slide.src}
            />
          ))}
        </div>
        <button type="button" onClick={next} aria-label="Image suivante">
          <ArrowRight aria-hidden="true" />
        </button>
      </div>

      <p className="sr-only" aria-live="polite">
        Image {active + 1} sur {slides.length}
      </p>
      <a className="hero-scroll" href="#recherche-rapide">
        <span>Poursuivre l’exploration</span>
        <ArrowDown size={17} aria-hidden="true" />
      </a>
    </section>
  );
}
