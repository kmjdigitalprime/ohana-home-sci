"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, MessageCircle, Phone, X } from "lucide-react";
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
            <span className="topline__badge">Aperçu privé</span>
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
          <BrandLogo priority />
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
  return (
    <>
      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <BrandLogo footer />
            <p>
              Vente de terrains au Cameroun.
              <br />
              Sentez-vous chez vous.
            </p>
            <SocialLinks includeWhatsApp />
          </div>
          <div>
            <b>Nous joindre</b>
            <p>
              <a href={whatsapp()}>WhatsApp : +237 6 40 23 53 10</a>
              <br />
              Appel international : +1 (514) 677-3168
              <br />
              Horaires : Africa/Douala
            </p>
          </div>
          <div>
            <b>Informations</b>
            <p className="footer-links">
              <Link href="/terrains">Terrains</Link>
              <Link href="/realisations">Réalisations</Link>
              <Link href="/agence">L’agence</Link>
              <Link href="/agence/le-promoteur">Le promoteur</Link>
              <Link href="/diaspora">Diaspora</Link>
              <Link href="/contact">Contact</Link>
            </p>
          </div>
        </div>
      </footer>
      <div className="mobile-cta" aria-label="Actions rapides">
        <Link className="btn outline" href="/terrains">
          Voir les terrains
        </Link>
        <a className="btn" href={whatsapp()}>
          WhatsApp
        </a>
      </div>
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
