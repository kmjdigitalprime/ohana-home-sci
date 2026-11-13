import Link from "next/link";
import { List, MapPinned } from "lucide-react";
import { LandCard } from "@/components/LandCard";
import { lands } from "@/lib/data";

type SearchValue = string | string[] | undefined;

const firstValue = (value: SearchValue) => (Array.isArray(value) ? value[0] ?? "" : value ?? "");

export default async function Terrains({
  searchParams,
}: {
  searchParams: Promise<Record<string, SearchValue>>;
}) {
  const params = await searchParams;
  const query = firstValue(params.q).toLowerCase();
  const region = firstValue(params.region);
  const max = Number(firstValue(params.max) || 0);
  const minArea = Number(firstValue(params.area) || 0);
  const view = firstValue(params.view) === "map" ? "map" : "list";

  const results = lands.filter(
    (land) =>
      (!query || `${land.name} ${land.zone}`.toLowerCase().includes(query)) &&
      (!region || land.region === region) &&
      (!max || land.pricePerSqm <= max) &&
      (!minArea || (land.area ?? 0) >= minArea),
  );

  const mappable = results.filter(
    (land) =>
      land.mapVerified &&
      land.mapPublicationAllowed &&
      land.latitude !== null &&
      land.longitude !== null,
  );

  const viewParams = new URLSearchParams();
  ["q", "region", "max", "area"].forEach((key) => {
    const value = firstValue(params[key]);
    if (value) viewParams.set(key, value);
  });
  const listHref = `/terrains${viewParams.size ? `?${viewParams.toString()}` : ""}`;
  viewParams.set("view", "map");
  const mapHref = `/terrains?${viewParams.toString()}`;

  return (
    <>
      <div className="page-hero terrain-catalog-hero">
        <div className="container">
          <div className="eyebrow">Catalogue de préparation</div>
          <h1>Terrains</h1>
          <p>Comparez les zones, les accès communiqués et les prix indicatifs au m².</p>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <div className="notice">
            Les prix sont indicatifs. Les surfaces, disponibilités et informations
            foncières sont publiées après validation.
          </div>
          <form className="filters">
            <input
              name="q"
              defaultValue={firstValue(params.q)}
              placeholder="Zone ou terrain"
              aria-label="Zone ou terrain"
            />
            <select name="region" defaultValue={region} aria-label="Région">
              <option value="">Toutes les régions</option>
              <option>Littoral</option>
              <option>Centre</option>
            </select>
            <select
              name="max"
              defaultValue={firstValue(params.max)}
              aria-label="Prix maximal"
            >
              <option value="">Prix au m²</option>
              <option value="5000">≤ 5 000 FCFA/m²</option>
              <option value="10000">≤ 10 000 FCFA/m²</option>
              <option value="15000">≤ 15 000 FCFA/m²</option>
            </select>
            <input
              name="area"
              type="number"
              min="0"
              defaultValue={firstValue(params.area)}
              placeholder="Surface min. (m²)"
              aria-label="Surface minimale"
              disabled
              title="Les surfaces ne sont pas encore confirmées"
            />
            <button className="btn">Filtrer</button>
          </form>

          <div className="catalog-toolbar">
            <p aria-live="polite">
              {results.length} résultat{results.length !== 1 ? "s" : ""}
              <Link href="/terrains">Réinitialiser</Link>
            </p>
            <div className="view-switch" aria-label="Choisir l’affichage">
              <Link className={view === "list" ? "is-active" : undefined} href={listHref}>
                <List aria-hidden="true" />
                Liste
              </Link>
              <Link className={view === "map" ? "is-active" : undefined} href={mapHref}>
                <MapPinned aria-hidden="true" />
                Carte
              </Link>
            </div>
          </div>

          {results.length === 0 ? (
            <div className="empty">
              <h2>Aucun terrain ne correspond</h2>
              <p>Élargissez la zone ou le budget au m².</p>
              <Link className="btn" href="/terrains">
                Effacer les filtres
              </Link>
            </div>
          ) : view === "map" ? (
            <section className="catalog-map" aria-labelledby="catalog-map-title">
              <div className="catalog-map__canvas">
                <MapPinned aria-hidden="true" />
                <div>
                  <span className="eyebrow">Vue cartographique</span>
                  <h2 id="catalog-map-title">Localisations publiques</h2>
                  {mappable.length === 0 ? (
                    <p>
                      Aucun emplacement n’est actuellement autorisé pour un affichage
                      cartographique public. Les résultats filtrés restent accessibles
                      dans la liste.
                    </p>
                  ) : (
                    <p>{mappable.length} emplacement(s) vérifié(s) dans cette recherche.</p>
                  )}
                </div>
              </div>
              <div className="grid catalog-map__list">
                {results.map((land) => (
                  <LandCard key={land.id} land={land} />
                ))}
              </div>
            </section>
          ) : (
            <div className="grid">
              {results.map((land) => (
                <LandCard key={land.id} land={land} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
