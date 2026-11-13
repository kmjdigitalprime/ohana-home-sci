export type EditorialField = {
  key: string;
  label: string;
  group: string;
  visibility: "public" | "private";
};

export const editorialFields: EditorialField[] = [
  { key: "company.identity", label: "Identité de l’entreprise", group: "Agence", visibility: "public" },
  { key: "company.contact", label: "Coordonnées confirmées", group: "Agence", visibility: "public" },
  { key: "company.history", label: "Histoire et valeurs", group: "Agence", visibility: "public" },
  { key: "company.services", label: "Activités confirmées", group: "Agence", visibility: "public" },
  { key: "company.objectives", label: "Objectifs commerciaux du site", group: "Stratégie", visibility: "private" },
  { key: "company.audiences", label: "Publics visés", group: "Stratégie", visibility: "private" },
  { key: "company.supportMethod", label: "Méthode d’accompagnement", group: "Agence", visibility: "public" },
  { key: "promoter.name", label: "Nom et fonction", group: "Promoteur", visibility: "public" },
  { key: "promoter.biography", label: "Biographie et parcours", group: "Promoteur", visibility: "public" },
  { key: "promoter.vision", label: "Vision et mot du promoteur", group: "Promoteur", visibility: "public" },
  { key: "diaspora.support", label: "Accompagnement à distance", group: "Diaspora", visibility: "public" },
  { key: "company.hours", label: "Horaires et adresse", group: "Coordonnées", visibility: "public" },
  { key: "portfolio.achievements", label: "Réalisations documentées", group: "Réalisations", visibility: "public" },
  { key: "trust.testimonials", label: "Témoignages autorisés", group: "Confiance", visibility: "public" },
  { key: "trust.partners", label: "Partenaires autorisés", group: "Confiance", visibility: "public" },
  { key: "company.socials", label: "Réseaux sociaux officiels", group: "Coordonnées", visibility: "public" },
  { key: "company.areas", label: "Zones géographiques couvertes", group: "Agence", visibility: "public" },
  { key: "seo.locations", label: "Zones et expressions SEO", group: "Référencement", visibility: "private" },
  { key: "team.responsibilities", label: "Responsabilités de l’équipe", group: "Gouvernance", visibility: "private" },
  { key: "governance.validators", label: "Responsables de validation", group: "Gouvernance", visibility: "private" },
  { key: "catalog.lands", label: "Informations détaillées des terrains", group: "Catalogue", visibility: "private" },
];

export type SocialNetwork = {
  id: "facebook" | "instagram" | "linkedin" | "youtube" | "tiktok" | "x" | "whatsapp";
  label: string;
  url: string | null;
  confirmed: boolean;
};

export const socialNetworks: SocialNetwork[] = [
  {
    id: "facebook",
    label: "Facebook",
    url: "https://www.facebook.com/profile.php?id=100088202852160",
    confirmed: true,
  },
  { id: "instagram", label: "Instagram", url: null, confirmed: false },
  { id: "linkedin", label: "LinkedIn", url: null, confirmed: false },
  { id: "youtube", label: "YouTube", url: null, confirmed: false },
  { id: "tiktok", label: "TikTok", url: null, confirmed: false },
  { id: "x", label: "X", url: null, confirmed: false },
  {
    id: "whatsapp",
    label: "WhatsApp",
    url: "https://wa.me/237640235310",
    confirmed: true,
  },
];
