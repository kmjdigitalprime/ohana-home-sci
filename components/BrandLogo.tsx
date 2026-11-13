import Image from "next/image";
import Link from "next/link";

type BrandLogoProps = {
  priority?: boolean;
  footer?: boolean;
};

export function BrandLogo({ priority = false, footer = false }: BrandLogoProps) {
  return (
    <Link
      className={`brand-logo${footer ? " brand-logo--footer" : ""}`}
      href="/"
      aria-label="OHANA HOME SCI — Accueil"
    >
      <Image
        className="brand-logo__image"
        src="/ohana-home-logo.png"
        alt="OHANA HOME SCI — Sentez vous chez vous"
        width={756}
        height={363}
        priority={priority}
        sizes="(max-width: 800px) 145px, 184px"
      />
    </Link>
  );
}
