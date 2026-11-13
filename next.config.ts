import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hostinger sert correctement les fichiers du dossier public, mais son
  // environnement d'aperçu ne garantit pas le fonctionnement de /_next/image.
  // Les photographies sont déjà optimisées : on les livre donc directement.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
