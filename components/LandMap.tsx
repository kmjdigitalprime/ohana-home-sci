"use client";

import { useState } from "react";
import { ExternalLink, LocateFixed, MapPinned, Route } from "lucide-react";
import type { Land } from "@/lib/data";

type MapLand = Pick<
  Land,
  | "name"
  | "region"
  | "zone"
  | "access"
  | "latitude"
  | "longitude"
  | "mapUrl"
  | "mapPrecision"
  | "mapVerified"
  | "mapPublicationAllowed"
>;

function coordinatesArePublic(land: MapLand) {
  return Boolean(
    land.mapVerified &&
      land.mapPublicationAllowed &&
      land.latitude !== null &&
      land.longitude !== null &&
      (land.mapPrecision === "exact" || land.mapPrecision === "approximate"),
  );
}

export function LandMap({ land }: { land: MapLand }) {
  const [loaded, setLoaded] = useState(false);
  const canDisplay = coordinatesArePublic(land);

  if (!canDisplay) {
    return (
      <section className="land-location" aria-labelledby="land-location-title">
        <div className="land-location__visual" aria-hidden="true">
          <MapPinned />
          <span>{land.region}</span>
        </div>
        <div className="land-location__copy">
          <span className="eyebrow">Localisation</span>
          <h2 id="land-location-title">{land.zone}</h2>
          <p>{land.access}</p>
          <div className="location-privacy">
            <LocateFixed aria-hidden="true" />
            <span>
              Le point cartographique sera affiché après vérification et autorisation
              de l’agence.
            </span>
          </div>
        </div>
      </section>
    );
  }

  const latitude = land.latitude as number;
  const longitude = land.longitude as number;
  const query = `${latitude},${longitude}`;
  const googleUrl = land.mapUrl ?? `https://www.google.com/maps/search/?api=1&query=${query}`;
  const embedUrl = `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=14&output=embed`;

  return (
    <section className="land-map" aria-labelledby="land-map-title">
      <div className="land-map__heading">
        <div>
          <span className="eyebrow">Localisation</span>
          <h2 id="land-map-title">Situer {land.name}</h2>
        </div>
        <span className="map-precision">
          {land.mapPrecision === "exact" ? "Localisation exacte" : "Zone approximative"}
        </span>
      </div>
      <div className="land-map__frame">
        {loaded ? (
          <iframe
            src={embedUrl}
            title={`Carte Google Maps de ${land.name}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <button className="map-consent" type="button" onClick={() => setLoaded(true)}>
            <MapPinned aria-hidden="true" />
            <strong>Afficher la carte Google Maps</strong>
            <span>La carte externe se charge uniquement après votre action.</span>
          </button>
        )}
      </div>
      <div className="actions land-map__actions">
        <a className="btn outline" href={googleUrl} target="_blank" rel="noopener noreferrer">
          Ouvrir dans Google Maps
          <ExternalLink aria-hidden="true" />
        </a>
        {land.mapPrecision === "exact" && (
          <a
            className="text-link"
            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Route aria-hidden="true" />
            Demander l’itinéraire
          </a>
        )}
      </div>
    </section>
  );
}
