// UI labels only. Resume content lives in content/resume.<lang>.yaml.
export const locales = ['en', 'fr'] as const;
export type Lang = (typeof locales)[number];
export const defaultLocale: Lang = 'en';

const en = {
  nav: { home: 'Home', experience: 'Experience', academics: 'Academics', skills: 'Skills', projects: 'Projects', more: 'More' },
  menu: 'Main navigation',
  switchTo: 'Français',
  switchTheme: 'Switch between light and dark theme',
  downloadPdf: 'Download PDF',
  pdf: 'PDF',
  skip: 'Skip to content',
  onThisPage: 'On this page',
  seeExperience: 'See experience',
  getInTouch: 'Get in touch',
  contact: 'Contact',
  email: 'Email',
  phone: 'Phone',
  location: 'Location',
  rights: 'All rights reserved.',
  builtWith: 'Built with Nuxt, hosted on GitHub Pages.',
  present: 'now',
  expires: 'expires',
  expired: 'expired',
  careerLabel: 'Career timeline, one block per employer',
  sections: {
    competencies: 'Professional competencies',
    experience: 'Experience',
    education: 'Education',
    certifications: 'Certifications',
    languages: 'Languages',
    projects: 'Projects',
    hobbies: 'Interests',
    skills: 'Skills',
  },
  levels: { native: 'native speaker', fluent: 'fluent', basic: 'basic knowledge' },
};

export type Ui = typeof en;

export const ui: Record<Lang, Ui> = {
  en,
  fr: {
    nav: { home: 'Accueil', experience: 'Expérience', academics: 'Formation', skills: 'Compétences', projects: 'Projets', more: 'Plus' },
    menu: 'Navigation principale',
    switchTo: 'English',
    switchTheme: 'Basculer entre le thème clair et le thème sombre',
    downloadPdf: 'Télécharger le PDF',
    pdf: 'PDF',
    skip: 'Aller au contenu',
    onThisPage: 'Sur cette page',
    seeExperience: "Voir l'expérience",
    getInTouch: 'Me contacter',
    contact: 'Contact',
    email: 'E-mail',
    phone: 'Téléphone',
    location: 'Lieu',
    rights: 'Tous droits réservés.',
    builtWith: 'Réalisé avec Nuxt, hébergé sur GitHub Pages.',
    present: "aujourd'hui",
    expires: 'expire en',
    expired: 'expirée en',
    careerLabel: 'Parcours professionnel, un bloc par employeur',
    sections: {
      competencies: 'Compétences professionnelles',
      experience: 'Expérience professionnelle',
      education: 'Formation',
      certifications: 'Certifications',
      languages: 'Langues',
      projects: 'Projets',
      hobbies: "Centres d'intérêt",
      skills: 'Compétences',
    },
    levels: { native: 'langue maternelle', fluent: 'courant', basic: 'notions' },
  },
};
