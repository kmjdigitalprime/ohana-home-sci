"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ChevronDown,
  House,
  MapPinned,
  Menu,
  MessageCircle,
  Phone,
  X,
} from "lucide-react";
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
            <span className="topline__badge">Site officiel</span>
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
            priority
            variant="primary"
            theme={isHome && !scrolled ? "dark" : "light"}
            mobileTheme="light"
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
          <nav
            id="mobile-navigation"
            className="container mobile-menu"
            aria-label="Navigation mobile"
          >
            <div className="mobile-menu__intro">
              <span>Menu</span>
              <small>Votre projet foncier, étape par étape</small>
            </div>
            {navigation.map((item) => (
              <Link
                key={item.href}
                className={isActive(item.href) ? "is-active" : undefined}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/agence/le-promoteur" onClick={() => setOpen(false)}>
              Le promoteur
            </Link>
            <a className="btn" href={whatsapp()} onClick={() => setOpen(false)}>
              <MessageCircle size={17} aria-hidden="true" />
              Parler à un conseiller
            </a>
          </nav>
        )}
      </header>
    </>
  );
}

export function Footer() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === href : pathname.startsWith(href);

  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer__intro">
            <div>
              <span className="footer__eyebrow">Votre projet foncier au Cameroun</span>
              <h2>Avançons ensemble, avec clarté.</h2>
              <p>
                Une équipe disponible sur place et à distance pour répondre à vos
                questions et préparer votre visite.
              </p>
            </div>
            <div className="footer__actions">
              <a className="btn footer__primary-action" href={whatsapp()}>
                <MessageCircle size={18} aria-hidden="true" />
                Parler à un conseiller
              </a>
              <Link className="btn outline footer__secondary-action" href="/contact">
                Planifier une visite
              </Link>
            </div>
          </div>

          <div className="footer-grid">
            <div className="footer-brand">
              <BrandLogo variant="primary" theme="dark" />
              <p className="footer-brand__signature">Sentez-vous chez vous.</p>
              <p>
                Des terrains présentés avec des informations claires, pour les
                clients au Cameroun comme pour la diaspora.
              </p>
              <SocialLinks includeWhatsApp />
            </div>

            <div className="footer__column">
              <b>Nous joindre</b>
              <div className="footer__contacts">
                <a href="tel:+237640235310">
                  <span>Téléphone Cameroun</span>
                  <strong>+237 6 40 23 53 10</strong>
                </a>
                <a href="tel:+15146773168">
                  <span>Téléphone international</span>
                  <strong>+1 (514) 677-3168</strong>
                </a>
                <a href={whatsapp()}>
                  <span>Messagerie</span>
                  <strong>WhatsApp</strong>
                </a>
              </div>
            </div>

            <nav className="footer__column" aria-label="Navigation du pied de page">
              <b>Découvrir</b>
              <div className="footer-links">
                <Link href="/terrains">Terrains</Link>
                <Link href="/realisations">Réalisations</Link>
                <Link href="/agence">L’agence</Link>
                <Link href="/agence/le-promoteur">Le promoteur</Link>
                <Link href="/diaspora">Diaspora</Link>
                <Link href="/contact">Contact</Link>
              </div>
            </nav>
          </div>

          <div className="footer__bottom">
            <small>© {new Date().getFullYear()} OHANA HOME SCI</small>
            <span>Sentez-vous chez vous.</span>
          </div>
        </div>
      </footer>
      <nav className="mobile-dock" aria-label="Navigation mobile rapide">
        <Link
          className={isActive("/") ? "is-active" : undefined}
          href="/"
          aria-current={isActive("/") ? "page" : undefined}
        >
          <House aria-hidden="true" />
          <span>Accueil</span>
        </Link>
        <Link
          className={isActive("/terrains") ? "is-active" : undefined}
          href="/terrains"
          aria-current={isActive("/terrains") ? "page" : undefined}
        >
          <MapPinned aria-hidden="true" />
          <span>Terrains</span>
        </Link>
        <a className="mobile-dock__whatsapp" href={whatsapp()}>
          <MessageCircle aria-hidden="true" />
          <span>WhatsApp</span>
        </a>
        <Link
          className={isActive("/contact") ? "is-active" : undefined}
          href="/contact"
          aria-current={isActive("/contact") ? "page" : undefined}
        >
          <Phone aria-hidden="true" />
          <span>Contact</span>
        </Link>
      </nav>
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
