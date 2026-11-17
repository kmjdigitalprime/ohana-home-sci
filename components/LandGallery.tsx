"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { LandGalleryImage } from "@/lib/land-media";

type LandGalleryProps = {
  images: LandGalleryImage[];
  landName: string;
};

export function LandGallery({ images, landName }: LandGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const expandButton = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  const current = images[activeIndex];
  const move = (direction: number) => {
    setActiveIndex((index) => (index + direction + images.length) % images.length);
  };

  useEffect(() => {
    if (!lightboxOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxOpen(false);
      if (event.key === "ArrowLeft") {
        setActiveIndex((index) => (index - 1 + images.length) % images.length);
      }
      if (event.key === "ArrowRight") {
        setActiveIndex((index) => (index + 1) % images.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      expandButton.current?.focus();
    };
  }, [images.length, lightboxOpen]);

  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const distance = endX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(distance) < 45 || images.length < 2) return;
    move(distance > 0 ? -1 : 1);
  };

  return (
    <section className="land-gallery" aria-label={`Galerie photo de ${landName}`}>
      <div
        className="land-gallery__stage"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          key={current.src}
          className="land-gallery__main-image"
          src={current.src}
          alt={current.alt}
          fill
          priority={activeIndex === 0}
          sizes="(max-width: 800px) calc(100vw - 32px), 66vw"
        />

        <div className="land-gallery__counter" aria-live="polite">
          {activeIndex + 1} / {images.length}
        </div>

        <button
          ref={expandButton}
          className="land-gallery__expand"
          type="button"
          onClick={() => setLightboxOpen(true)}
          aria-label={`Afficher en plein écran : ${current.alt}`}
        >
          <Expand aria-hidden="true" />
          <span>Plein écran</span>
        </button>

        {images.length > 1 ? (
          <>
            <button
              className="land-gallery__arrow land-gallery__arrow--previous"
              type="button"
              onClick={() => move(-1)}
              aria-label="Photo précédente"
            >
              <ChevronLeft aria-hidden="true" />
            </button>
            <button
              className="land-gallery__arrow land-gallery__arrow--next"
              type="button"
              onClick={() => move(1)}
              aria-label="Photo suivante"
            >
              <ChevronRight aria-hidden="true" />
            </button>
          </>
        ) : null}
      </div>

      {images.length > 1 ? (
        <div className="land-gallery__thumbnails" aria-label="Choisir une photographie">
          {images.map((image, index) => (
            <button
              className={index === activeIndex ? "is-active" : undefined}
              type="button"
              key={image.src}
              onClick={() => setActiveIndex(index)}
              aria-label={`Afficher la photographie ${index + 1} sur ${images.length}`}
              aria-current={index === activeIndex ? "true" : undefined}
            >
              <Image
                src={image.src}
                alt=""
                fill
                sizes="(max-width: 800px) 132px, 160px"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      ) : null}

      {lightboxOpen ? (
        <div
          className="land-gallery__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Photographie en plein écran de ${landName}`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            ref={closeButton}
            className="land-gallery__close"
            type="button"
            onClick={() => setLightboxOpen(false)}
            aria-label="Fermer la galerie plein écran"
          >
            <X aria-hidden="true" />
          </button>

          <div className="land-gallery__lightbox-image">
            <Image
              key={`lightbox-${current.src}`}
              src={current.src}
              alt={current.alt}
              fill
              priority
              sizes="100vw"
            />
          </div>

          <div className="land-gallery__lightbox-counter" aria-live="polite">
            {activeIndex + 1} / {images.length}
          </div>

          {images.length > 1 ? (
            <>
              <button
                className="land-gallery__lightbox-arrow land-gallery__lightbox-arrow--previous"
                type="button"
                onClick={() => move(-1)}
                aria-label="Photo précédente"
              >
                <ChevronLeft aria-hidden="true" />
              </button>
              <button
                className="land-gallery__lightbox-arrow land-gallery__lightbox-arrow--next"
                type="button"
                onClick={() => move(1)}
                aria-label="Photo suivante"
              >
                <ChevronRight aria-hidden="true" />
              </button>
            </>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
