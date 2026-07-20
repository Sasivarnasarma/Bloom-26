import type { CtaLink, NavItem } from "../types/content";

export const siteInfo = {
  title: "Bloom '26",
  tagline: "Real dreams bloom in real hearts.",
  organization: "AIESEC in the University of Kelaniya",
  projectType: "Corporate Social Responsibility",
  theme: "Healthcare, community, and social impact",
  baseUrl: "https://bloomcn.lk",
};

export const footer = {
  description:
    "Bloom '26 is a CSR initiative by AIESEC in the University of Kelaniya dedicated to improving healthcare access for underserved rural communities.",
  copyright: "© 2026 Bloom. All Rights Reserved.",
  builtBy: "Developed by AIESEC in the University of Kelaniya",
  builtByLink: "https://github.com/Sasivarnasarma/Bloom-26",
};

export const seo = {
  pageTitle: "Bloom '26 | AIESEC in the University of Kelaniya",
  description:
    "Bloom '26 is a Corporate Social Responsibility initiative by AIESEC in the University of Kelaniya dedicated to improving healthcare access for underserved rural communities through fundraising, partnerships, and community engagement.",
  openGraphTitle: "Bloom '26",
  openGraphDescription:
    "Join Bloom '26 in creating lasting healthcare impact for underserved communities. Support our mission by becoming a donor or partner today.",
  keywords: [
    "Bloom 2026",
    "Bloom",
    "AIESEC",
    "AIESEC Sri Lanka",
    "AIESEC University of Kelaniya",
    "CSR",
    "Healthcare",
    "Community",
    "Hospital",
    "Donations",
    "Partnerships",
    "Fundraising",
    "Social Impact",
    "Sri Lanka",
  ],
};

export const navigation: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Why Bloom", href: "#why-bloom" },
  { label: "Fundraising", href: "#fundraising" },
  { label: "Gallery", href: "#gallery" },
  { label: "Our Legacy", href: "#legacy" },
  { label: "Partners", href: "#partners" },
  { label: "Team", href: "#team" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export const whatsappNumber = "+94 76 836 0450";

export const donorCta: CtaLink = {
  label: "Be a Donor",
  message: "Hello, I'm interested in supporting Bloom '26 as a donor.",
};

export const partnerCta: CtaLink = {
  label: "Become a Partner",
  message: "Hello, I'm interested in becoming a partner for Bloom '26.",
};
