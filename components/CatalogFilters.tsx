"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";

type CatalogFiltersProps = {
  values: { q: string; region: string; max: string; area: string };
  resultCount: number;
};

function FilterFields({ values, mobile = false }: { values: CatalogFiltersProps["values"]; mobile?: boolean }) {
  const suffix = mobile ? "mobile" : "desktop";
  return (
    <>
      <div className="filter-field filter-field--wide">
        <label htmlFor={`catalog-q-${suffix}`}>Ville, zone ou terrain</label>
        <input id={`catalog-q-${suffix}`} name="q" type="search" defaultValue={values.q} placeholder="Ex. Yaoundé, Missolé…" />
      </div>
      <div className="filter-field">
        <label htmlFor={`catalog-region-${suffix}`}>Région</label>
        <select id={`catalog-region-${suffix}`} name="region" defaultValue={values.region}>
          <option value="">Toutes les régions</option><option>Littoral</option><option>Centre</option>
        </select>
      </div>
      <div className="filter-field">
        <label htmlFor={`catalog-max-${suffix}`}>Prix maximal au m²</label>
        <select id={`catalog-max-${suffix}`} name="max" defaultValue={values.max}>
          <option value="">Tous les prix</option><option value="5000">Jusqu’à 5 000 FCFA/m²</option><option value="10000">Jusqu’à 10 000 FCFA/m²</option><option value="15000">Jusqu’à 15 000 FCFA/m²</option>
        </select>
      </div>
      <div className="filter-field">
        <label htmlFor={`catalog-area-${suffix}`}>Superficie minimale</label>
        <input id={`catalog-area-${suffix}`} name="area" type="number" min="0" defaultValue={values.area} placeholder="Non disponible" disabled title="Les surfaces ne sont pas encore confirmées" />
      </div>
    </>
  );
}

export function CatalogFilters({ values, resultCount }: CatalogFiltersProps) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    document.body.classList.add("filter-sheet-open");
    window.addEventListener("keydown", close);
    return () => {
      document.body.classList.remove("filter-sheet-open");
      window.removeEventListener("keydown", close);
    };
  }, [open]);

  return (
    <>
      <form className="filters filters--desktop">
        <FilterFields values={values} />
        <button className="btn" type="submit">Filtrer</button>
      </form>
      <div className="mobile-catalog-search">
        <form className="mobile-catalog-search__bar">
          <Search aria-hidden="true" />
          <input name="q" type="search" defaultValue={values.q} placeholder="Ville, zone ou terrain" aria-label="Rechercher une ville, une zone ou un terrain" />
          <button type="submit" aria-label="Lancer la recherche">Rechercher</button>
        </form>
        <div className="mobile-catalog-search__chips" aria-label="Filtres rapides">
          <Link className={!values.region ? "is-active" : undefined} href="/terrains">Tous</Link>
          <Link className={values.region === "Littoral" ? "is-active" : undefined} href="/terrains?region=Littoral">Littoral</Link>
          <Link className={values.region === "Centre" ? "is-active" : undefined} href="/terrains?region=Centre">Centre</Link>
          <button type="button" onClick={() => setOpen(true)}><SlidersHorizontal aria-hidden="true" />Filtres</button>
        </div>
      </div>
      {open && (
        <div className="filter-sheet" role="dialog" aria-modal="true" aria-labelledby="filter-sheet-title">
          <button className="filter-sheet__backdrop" type="button" aria-label="Fermer les filtres" onClick={() => setOpen(false)} />
          <div className="filter-sheet__panel">
            <div className="filter-sheet__header">
              <div><span>{resultCount} résultat{resultCount !== 1 ? "s" : ""}</span><h2 id="filter-sheet-title">Affiner la recherche</h2></div>
              <button className="icon-btn" type="button" aria-label="Fermer" onClick={() => setOpen(false)}><X aria-hidden="true" /></button>
            </div>
            <form className="filter-sheet__form">
              <FilterFields values={values} mobile />
              <div className="filter-sheet__actions">
                <Link href="/terrains" onClick={() => setOpen(false)}>Réinitialiser</Link>
                <button className="btn" type="submit">Afficher les résultats</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

