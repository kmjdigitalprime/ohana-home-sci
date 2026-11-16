import Image from "next/image";
import Link from "next/link";

export type BrandLogoVariant =
  | "primary"
  | "horizontal"
  | "compact"
  | "symbol"
  | "reverse"
  | "photo";

export type BrandLogoTheme = "light" | "dark" | "orange";

type LogoAsset = {
  src: string;
  width: number;
  height: number;
};

type BrandLogoProps = {
  variant?: BrandLogoVariant;
  theme?: BrandLogoTheme;
  priority?: boolean;
  responsive?: boolean;
  footer?: boolean;
  decorative?: boolean;
  className?: string;
  href?: string | null;
  sizes?: string;
};

const assets = {
  primary: {
    src: "/ohana-logo/web-optimized/ohana-home-logo-primary.svg",
    width: 720,
    height: 325,
  },
  horizontal: {
    src: "/ohana-logo/web-optimized/ohana-home-logo-horizontal-no-tagline.svg",
    width: 720,
    height: 160,
  },
  horizontalReverse: {
    src: "/ohana-logo/web-optimized/ohana-home-logo-horizontal-no-tagline-reverse.svg",
    width: 720,
    height: 160,
  },
  horizontalWhite: {
    src: "/ohana-logo/web-optimized/ohana-home-logo-horizontal-no-tagline-white.svg",
    width: 720,
    height: 160,
  },
  compact: {
    src: "/ohana-logo/web-optimized/ohana-home-logo-compact.svg",
    width: 600,
    height: 150,
  },
  compactReverse: {
    src: "/ohana-logo/web-optimized/ohana-home-logo-compact-reverse.svg",
    width: 600,
    height: 150,
  },
  compactWhite: {
    src: "/ohana-logo/web-optimized/ohana-home-logo-compact-white.svg",
    width: 600,
    height: 150,
  },
  symbol: {
    src: "/ohana-logo/web-optimized/ohana-home-symbol.svg",
    width: 440,
    height: 182,
  },
  symbolWhite: {
    src: "/ohana-logo/symbol/ohana-home-symbol-white.svg",
    width: 440,
    height: 182,
  },
  reverse: {
    src: "/ohana-logo/reverse/ohana-home-logo-white-orange.svg",
    width: 720,
    height: 325,
  },
  white: {
    src: "/ohana-logo/reverse/ohana-home-logo-white.svg",
    width: 720,
    height: 325,
  },
  photoDark: {
    src: "/ohana-logo/photo/ohana-home-logo-photo-white-orange.svg",
    width: 720,
    height: 325,
  },
  photoLight: {
    src: "/ohana-logo/photo/ohana-home-logo-photo-panel-light.svg",
    width: 800,
    height: 405,
  },
} satisfies Record<string, LogoAsset>;

function resolveAsset(variant: BrandLogoVariant, theme: BrandLogoTheme): LogoAsset {
  if (variant === "horizontal") {
    if (theme === "dark") return assets.horizontalReverse;
    if (theme === "orange") return assets.horizontalWhite;
  }
  if (variant === "compact") {
    if (theme === "dark") return assets.compactReverse;
    if (theme === "orange") return assets.compactWhite;
  }
  if (variant === "reverse") return theme === "orange" ? assets.white : assets.reverse;
  if (variant === "photo") return theme === "light" ? assets.photoLight : assets.photoDark;
  if (variant === "symbol") return theme === "light" ? assets.symbol : assets.symbolWhite;
  if (variant === "primary" && theme === "dark") return assets.reverse;
  if (variant === "primary" && theme === "orange") return assets.white;
  return assets[variant];
}

export function BrandLogo({
  variant = "horizontal",
  theme = "light",
  priority = false,
  responsive = false,
  footer = false,
  decorative = false,
  className = "",
  href = "/",
  sizes = "(max-width: 767px) 136px, 184px",
}: BrandLogoProps) {
  const asset = resolveAsset(variant, theme);
  const responsiveCompactAsset = resolveAsset("compact", theme);
  const classes = [
    "brand-logo",
    `brand-logo--${variant}`,
    `brand-logo--theme-${theme}`,
    responsive ? "brand-logo--responsive" : "",
    footer ? "brand-logo--footer" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  const alt = decorative ? "" : "OHANA HOME SCI — Sentez vous chez vous";

  const image = (
    <picture className="brand-logo__picture">
      {responsive && variant === "horizontal" ? (
        <source media="(max-width: 767px)" srcSet={responsiveCompactAsset.src} />
      ) : null}
      <Image
        className="brand-logo__image"
        src={asset.src}
        alt={alt}
        width={asset.width}
        height={asset.height}
        sizes={sizes}
        fetchPriority={priority ? "high" : "auto"}
        loading={priority ? undefined : "lazy"}
        decoding="async"
        unoptimized
      />
    </picture>
  );

  if (!href) {
    return (
      <span className={classes} aria-hidden={decorative || undefined}>
        {image}
      </span>
    );
  }

  return (
    <Link className={classes} href={href} aria-label="OHANA HOME SCI — Accueil">
      {image}
    </Link>
  );
}
