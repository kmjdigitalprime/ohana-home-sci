import Link from "next/link";

type BrandLogoVariant = "horizontal" | "compact" | "primary" | "reverse";
type BrandLogoTheme = "light" | "dark";

type BrandLogoProps = {
  priority?: boolean;
  variant?: BrandLogoVariant;
  theme?: BrandLogoTheme;
  mobileTheme?: BrandLogoTheme;
  className?: string;
};

const logoFiles = {
  horizontal: {
    light: "/ohana-logo/web-optimized/ohana-home-logo-horizontal-no-tagline.svg",
    dark: "/ohana-logo/web-optimized/ohana-home-logo-horizontal-no-tagline-reverse.svg",
    width: 720,
    height: 160,
  },
  compact: {
    light: "/ohana-logo/web-optimized/ohana-home-logo-compact.svg",
    dark: "/ohana-logo/web-optimized/ohana-home-logo-compact-reverse.svg",
    width: 600,
    height: 150,
  },
  primary: {
    light: "/ohana-logo/web-optimized/ohana-home-logo-primary.svg",
    dark: "/ohana-logo/reverse/ohana-home-logo-white-orange.svg",
    width: 720,
    height: 325,
  },
} as const;

export function BrandLogo({
  priority = false,
  variant = "horizontal",
  theme = "light",
  mobileTheme,
  className = "",
}: BrandLogoProps) {
  const resolvedVariant = variant === "reverse" ? "primary" : variant;
  const resolvedTheme = variant === "reverse" ? "dark" : theme;
  const config = logoFiles[resolvedVariant];
  const src = config[resolvedTheme];
  const mobileSrc = mobileTheme
    ? logoFiles[resolvedVariant][mobileTheme]
    : resolvedVariant === "horizontal"
      ? logoFiles.compact.light
      : null;
  const classes = [
    "brand-logo",
    `brand-logo--${resolvedVariant}`,
    `brand-logo--${resolvedTheme}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Link
      className={classes}
      href="/"
      aria-label="OHANA HOME SCI — Accueil"
    >
      <picture>
        {mobileSrc ? (
          <source media="(max-width: 767px)" srcSet={mobileSrc} />
        ) : null}
        <img
          className="brand-logo__image"
          src={src}
          alt="OHANA HOME SCI — Sentez-vous chez vous"
          width={config.width}
          height={config.height}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
        />
      </picture>
    </Link>
  );
}
