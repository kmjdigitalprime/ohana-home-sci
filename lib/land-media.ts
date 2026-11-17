export type LandGalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const landCovers: Record<string, string> = {
  "missole-pk33": "/ohana-terrain-parcelles-01.webp",
  "missole-pk36": "/ohana-terrain-reel-aerien-03.jpg",
  "missole-pk30-acces-8-km": "/ohana-terrain-reel-acces.jpg",
  "missole-pk30-acces-4-km": "/ohana-terrain-parcelles-03.webp",
  "mangoule-pk36": "/ohana-terrain-reel-aerien-02.jpg",
  mfou: "/ohana-terrain-reel-aerien-01.jpg",
  "eloumdem-2-yaounde": "/ohana-terrain-parcelles-02.webp",
  ekoko: "/ohana-vision-cameroun.jpg",
  mbankomo: "/hero-cameroun.jpg",
  "pk27-village-tonde-nkam":
    "/terrains/pk27-village-tonde-nkam/pk27-village-tonde-nkam-aerial-01.jpg",
};

const landGalleries: Record<string, LandGalleryImage[]> = {
  "pk27-village-tonde-nkam": [
    {
      src: "/terrains/pk27-village-tonde-nkam/pk27-village-tonde-nkam-aerial-01.jpg",
      alt: "Vue aérienne du terrain PK27 à Village Tondè, Nkam",
      width: 2048,
      height: 1150,
    },
    {
      src: "/terrains/pk27-village-tonde-nkam/pk27-village-tonde-nkam-access-road-01.jpg",
      alt: "Voie d’accès au terrain PK27 à Village Tondè, Nkam",
      width: 2048,
      height: 1150,
    },
    {
      src: "/terrains/pk27-village-tonde-nkam/pk27-village-tonde-nkam-aerial-02.jpg",
      alt: "Vue aérienne des voies desservant le terrain PK27 à Village Tondè",
      width: 2048,
      height: 1150,
    },
    {
      src: "/terrains/pk27-village-tonde-nkam/pk27-village-tonde-nkam-aerial-03.jpg",
      alt: "Environnement du terrain PK27 à Village Tondè, département du Nkam",
      width: 2048,
      height: 1150,
    },
  ],
};

export function landCover(slug: string) {
  return landCovers[slug] ?? "/ohana-terrain-parcelles-01.webp";
}

export function landGallery(slug: string, landName: string): LandGalleryImage[] {
  return (
    landGalleries[slug] ?? [
      {
        src: landCover(slug),
        alt: `Vue du secteur du terrain ${landName}`,
        width: 1600,
        height: 900,
      },
    ]
  );
}
