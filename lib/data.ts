export type MapPrecision = "exact" | "approximate" | "private" | "unconfirmed";

export type Land = {
  id: string;
  slug: string;
  name: string;
  region: "Littoral" | "Centre";
  department: string | null;
  zone: string;
  landmark: string | null;
  access: string;
  roadDistanceM: number | null;
  pricePerSqm: number;
  totalPrice: number | null;
  area: number | null;
  availableArea: number | null;
  dimensions: string | null;
  subdividable: boolean | null;
  paymentTerms: string | null;
  landStatus: string | null;
  waterAccess: string | null;
  electricityAccess: string | null;
  pointsOfInterest: string[];
  caseManager: string | null;
  photos: string[];
  videos: string[];
  droneImages: string[];
  plans: string[];
  internalDocuments: string[];
  mediaPublicationAllowed: boolean;
  availability: "available" | "reserved" | "sold";
  editorial: "draft" | "published" | "archived";
  latitude: number | null;
  longitude: number | null;
  mapUrl: string | null;
  mapPrecision: MapPrecision;
  mapVerified: boolean;
  mapPublicationAllowed: boolean;
  featured?: boolean;
};

const sharedDraftFields = {
  department: null,
  landmark: null,
  totalPrice: null,
  area: null,
  availableArea: null,
  dimensions: null,
  subdividable: null,
  paymentTerms: null,
  landStatus: null,
  waterAccess: null,
  electricityAccess: null,
  pointsOfInterest: [],
  caseManager: null,
  photos: [],
  videos: [],
  droneImages: [],
  plans: [],
  internalDocuments: [],
  mediaPublicationAllowed: false,
  availability: "available" as const,
  editorial: "draft" as const,
  latitude: null,
  longitude: null,
  mapUrl: null,
  mapPrecision: "unconfirmed" as const,
  mapVerified: false,
  mapPublicationAllowed: false,
};

export const lands: Land[] = [
  {
    ...sharedDraftFields,
    id: "OH-001",
    slug: "missole-pk33",
    name: "Missolé PK33",
    region: "Littoral",
    zone: "Côté Douala",
    access: "À 400 m de la route",
    roadDistanceM: 400,
    pricePerSqm: 6000,
    featured: true,
  },
  {
    ...sharedDraftFields,
    id: "OH-002",
    slug: "missole-pk36",
    name: "Missolé PK36",
    region: "Littoral",
    zone: "Côté Douala",
    access: "À 100 m de la route",
    roadDistanceM: 100,
    pricePerSqm: 7000,
    featured: true,
  },
  {
    ...sharedDraftFields,
    id: "OH-003",
    slug: "missole-pk30-acces-8-km",
    name: "Missolé PK30 — accès 8 km",
    region: "Littoral",
    zone: "Côté Douala",
    access: "À 8 km de la route",
    roadDistanceM: 8000,
    pricePerSqm: 2500,
  },
  {
    ...sharedDraftFields,
    id: "OH-004",
    slug: "missole-pk30-acces-4-km",
    name: "Missolé PK30 — accès 4 km",
    region: "Littoral",
    zone: "Côté Douala",
    access: "À 4 km de la route",
    roadDistanceM: 4000,
    pricePerSqm: 4500,
  },
  {
    ...sharedDraftFields,
    id: "OH-005",
    slug: "mangoule-pk36",
    name: "Mangoulé PK36",
    region: "Littoral",
    zone: "Côté Douala",
    access: "À 800 m de la route",
    roadDistanceM: 800,
    pricePerSqm: 4000,
    featured: true,
  },
  {
    ...sharedDraftFields,
    id: "OH-006",
    slug: "mfou",
    name: "Mfou",
    region: "Centre",
    zone: "Mfou",
    access: "Non loin de la route — distance non précisée",
    roadDistanceM: null,
    pricePerSqm: 4000,
  },
  {
    ...sharedDraftFields,
    id: "OH-007",
    slug: "eloumdem-2-yaounde",
    name: "Eloumdem 2, Yaoundé",
    region: "Centre",
    zone: "Yaoundé",
    access: "En bordure d’une route non goudronnée",
    roadDistanceM: 0,
    pricePerSqm: 15000,
    featured: true,
  },
  {
    ...sharedDraftFields,
    id: "OH-008",
    slug: "ekoko",
    name: "Ekoko",
    region: "Centre",
    zone: "Ekoko",
    access: "À 400 m de la route",
    roadDistanceM: 400,
    pricePerSqm: 10000,
  },
  {
    ...sharedDraftFields,
    id: "OH-009",
    slug: "mbankomo",
    name: "Mbankomo",
    region: "Centre",
    zone: "Mbankomo",
    access: "Distance à la route non précisée",
    roadDistanceM: null,
    pricePerSqm: 4000,
  },
];

export const fcfa = (value: number) =>
  `${new Intl.NumberFormat("fr-FR").format(value)} FCFA/m²`;

export const whatsapp = (label?: string) =>
  `https://wa.me/237640235310?text=${encodeURIComponent(
    `Bonjour OHANA HOME, je souhaite obtenir des informations${
      label ? ` sur le terrain ${label}` : " sur vos terrains"
    }.`,
  )}`;
