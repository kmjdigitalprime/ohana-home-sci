"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, MessageCircle, X } from "lucide-react";
import { whatsapp } from "@/lib/data";
import { BrandLogo } from "@/components/BrandLogo";

const navigation = [
  { href: "/", label: "Accueil" },
  { href: "/terrains", label: "Terrains" },
  { href: "/agence", label: "L’agence" },
  { href: "/diaspora", label: "Diaspora" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <>
      <div className="topline">
        <span className="topline__badge">Aperçu privé</span>
        <span>Offres, prix et médias à confirmer avant publication</span>
      </div>
      <header className="site-header">
        <div className="container header-inner">
          <BrandLogo priority />
          <nav className="nav" aria-label="Navigation principale">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
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
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
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
            <small>Informations indicatives soumises à validation.</small>
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
              <Link href="/agence">L’agence</Link>
              <Link href="/agence/le-promoteur">Le promoteur</Link>
              <Link href="/diaspora">Diaspora</Link>
              <Link href="/contact">Contact</Link>
            </p>
            <small>FAQ, mentions légales et confidentialité à fournir.</small>
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
