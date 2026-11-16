export const whatsapp = (label?: string) =>
  `https://wa.me/237640235310?text=${encodeURIComponent(
    `Bonjour OHANA HOME, je souhaite obtenir des informations${
      label ? ` sur le terrain ${label}` : " sur vos terrains"
    }.`,
  )}`;

