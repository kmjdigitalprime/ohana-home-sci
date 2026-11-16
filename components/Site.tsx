"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronDown, Menu, MessageCircle, Phone, ShieldCheck, X } from "lucide-react";
import { whatsapp } from "@/lib/data";
import { BrandLogo } from "@/components/BrandLogo";
import { SocialLinks } from "@/components/SocialLinks";

const navigation = [
  { href: "/", label: "Accueil" },
  { href: "/terrains", label: "Terrains" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/agence", label: "L’agence" },
  { href: "/diaspora", label: "Diaspora" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  useEffect(() => {
    if (!isHome) return;

    const updateHeader = () => setScrolled(window.scrollY > 36);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, [isHome]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === href : pathname.startsWith(href);

  return (
    <>
      <div className="topline">
        <div className="container topline__inner">
          <div className="topline__promise">
            <span className="topline__badge">OHANA HOME SCI</span>
            <span>Terrains au Cameroun</span>
            <i aria-hidden="true" />
            <span>Accompagnement local et diaspora</span>
          </div>
          <div className="topline__contacts" aria-label="Coordonnées rapides">
            <a href={whatsapp()}>
              <MessageCircle size={14} aria-hidden="true" />
              <span>+237 6 40 23 53 10</span>
            </a>
            <a className="topline__international" href="tel:+15146773168">
              <Phone size={13} aria-hidden="true" />
              <span>+1 (514) 677-3168</span>
            </a>
            <SocialLinks />
          </div>
        </div>
      </div>
      <header
        className={`site-header${isHome ? " site-header--home" : ""}${
          isHome && scrolled ? " is-scrolled" : ""
        }`}
      >
        <div className="container header-inner">
          <BrandLogo
            variant="horizontal"
            theme={isHome && !scrolled ? "dark" : "light"}
            responsive
            priority
          />
          <nav className="nav" aria-label="Navigation principale">
            {navigation.map((item) =>
              item.href === "/agence" ? (
                <div className="nav-group" key={item.href}>
                  <Link
                    className={isActive(item.href) ? "is-active" : undefined}
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                  >
                    {item.label}
                    <ChevronDown size={14} aria-hidden="true" />
                  </Link>
                  <div className="nav-submenu">
                    <Link href="/agence/le-promoteur">Le promoteur</Link>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  className={isActive(item.href) ? "is-active" : undefined}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>
          <div className="header-actions">
            <a className="btn header-cta" href={whatsapp()}>
              <MessageCircle size={17} aria-hidden="true" />
              Parler à un conseiller
            </a>
            <button
              className="icon-btn menu-btn"
              type="button"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-controls="mobile-navigation"
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </button>
          </div>
        </div>
        {open && (
          <div
            id="mobile-navigation"
            className="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu principal"
          >
            <div className="mobile-menu__top">
              <BrandLogo variant="horizontal" responsive />
              <button className="icon-btn" type="button" aria-label="Fermer le menu" onClick={() => setOpen(false)}>
                <X aria-hidden="true" />
              </button>
            </div>
            <nav className="mobile-menu__links" aria-label="Navigation mobile">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  className={isActive(item.href) ? "is-active" : undefined}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  <span>{item.label}</span>
                  <ArrowRight aria-hidden="true" />
                </Link>
              ))}
              <Link href="/agence/le-promoteur" onClick={() => setOpen(false)}>
                <span>Le promoteur</span>
                <ArrowRight aria-hidden="true" />
              </Link>
            </nav>
            <div className="mobile-menu__footer">
              <p><ShieldCheck aria-hidden="true" />Informations claires pour avancer avec confiance.</p>
              <a className="btn" href={whatsapp()} onClick={() => setOpen(false)}>
                <MessageCircle size={18} aria-hidden="true" />
                Parler à un conseiller
              </a>
              <div className="mobile-menu__contact">
                <a href="tel:+237640235310">+237 6 40 23 53 10</a>
                <a href="tel:+15146773168">+1 (514) 677-3168</a>
              </div>
              <SocialLinks includeWhatsApp />
            </div>
          </div>
        )}
      </header>
    </>
  );
}

export function Footer() {
  const pathname = usePathname();
  const isLandDetail = /^\/terrains\/[^/]+$/.test(pathname);
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="footer" aria-labelledby="footer-title">
        <div className="container footer__inner">
          <div className="footer__lead">
            <div className="footer-brand">
              <BrandLogo variant="primary" theme="dark" footer />
              <p>Terrains au Cameroun · Accompagnement local et diaspora.</p>
            </div>
            <div className="footer__invitation">
              <span className="footer__eyebrow">Votre projet mérite des réponses claires</span>
              <h2 id="footer-title">Avançons sereinement vers votre terrain.</h2>
              <div className="footer__actions">
                <a className="btn footer__primary-action" href={whatsapp()}>
                  <MessageCircle size={18} aria-hidden="true" />
                  Parler à un conseiller
                </a>
                <Link className="footer__text-action" href="/contact?demande=visite">
                  Planifier une visite
                  <ArrowRight size={17} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>

          <div className="footer__divider" aria-hidden="true" />

          <div className="footer-grid">
            <div className="footer__column footer__contact">
              <h3>Nous joindre</h3>
              <a className="footer__contact-link" href={whatsapp()}>
                <span>WhatsApp Cameroun</span>
                <strong>+237 6 40 23 53 10</strong>
              </a>
              <a className="footer__contact-link" href="tel:+15146773168">
                <span>Appel international</span>
                <strong>+1 (514) 677-3168</strong>
              </a>
              <small>Douala · Fuseau Africa/Douala</small>
            </div>

            <nav className="footer__column" aria-label="Navigation du pied de page">
              <h3>Explorer</h3>
              <div className="footer-links">
                <Link href="/terrains">Terrains disponibles</Link>
                <Link href="/realisations">Réalisations</Link>
                <Link href="/agence">L’agence</Link>
                <Link href="/agence/le-promoteur">Le promoteur</Link>
                <Link href="/diaspora">Accompagnement diaspora</Link>
                <Link href="/contact">Contact</Link>
              </div>
            </nav>

            <div className="footer__column footer__assurances">
              <h3>Nos repères</h3>
              <ul>
                <li>Prix présentés clairement</li>
                <li>Informations disponibles structurées</li>
                <li>Visites organisées avec l’agence</li>
              </ul>
              <SocialLinks includeWhatsApp />
            </div>
          </div>

          <div className="footer__bottom">
            <span>© {currentYear} OHANA HOME SCI</span>
            <span>Sentez-vous chez vous.</span>
          </div>
        </div>
      </footer>
      {isLandDetail ? (
        <div className="mobile-cta mobile-cta--detail" aria-label="Actions pour ce terrain">
          <a className="btn outline" href={whatsapp()}>
            <MessageCircle aria-hidden="true" />
            WhatsApp
          </a>
          <a className="btn" href="#visite">Planifier une visite</a>
        </div>
      ) : (
        <div className="mobile-cta" aria-label="Actions rapides">
          <Link className="btn outline" href="/terrains">Voir les terrains</Link>
          <a className="btn" href={whatsapp()}>WhatsApp</a>
        </div>
      )}
    </>
  );
}

export function EventLink({
  href,
  type,
  slug,
  children,
  className = "",
}: {
  href: string;
  type: string;
  slug?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={className}
      onClick={() =>
        navigator.sendBeacon(
          "/api/events",
          new Blob([JSON.stringify({ type, landSlug: slug })], {
            type: "application/json",
          }),
        )
      }
    >
      {children}
    </a>
  );
}
