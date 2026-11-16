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
};

export function landCover(slug: string) {
  return landCovers[slug] ?? "/ohana-terrain-parcelles-01.webp";
}
