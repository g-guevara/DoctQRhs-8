export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "DoctQR - Med ID",
  description: "Carry Your Medical Info Everywhere",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Recursos",
      href: "/docs",
    },


  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Recursos",
      href: "/docs",
    },
    {
      label: "-",
      href: "/about",
    },
  ],
  links: {
    github: "https://github.com/g-guevara",
    twitter: "https://www.linkedin.com/in/guillermo-guevara-585267294/",
    docs: "https://nextui.org",
    discord: "https://wa.me/56975437751",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
