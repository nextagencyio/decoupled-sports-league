// Auto-generated TypeScript types from Drupal GraphQL schema.
// Run `decoupled-cli schema sync` to regenerate.

export interface NodeHomepage {
  id: string;
  ctaDescription: { value: string };
  ctaPrimary: string;
  ctaSecondary: string;
  ctaTitle: string;
  featuredTeamsTitle: string;
  heroDescription: { value: string };
  heroSubtitle: string;
  heroTitle: string;
  path: string;
  statsItems: any[];
  title: string;
}

export interface ParagraphStatItem {
  id: string;
  label: string;
  number: string;
}

export interface NodeNews {
  id: string;
  body: { value: string; summary?: string };
  category: any[];
  featured: boolean;
  image: { url: string; alt: string; width: number; height: number };
  path: string;
  title: string;
}

export interface NodePage {
  id: string;
  body: { value: string; summary?: string };
  path: string;
  title: string;
}

export interface NodePlayer {
  id: string;
  body: { value: string; summary?: string };
  jerseyNumber: number;
  path: string;
  photo: { url: string; alt: string; width: number; height: number };
  position: any[];
  teamName: string;
  title: string;
}

export interface NodeScheduleEntry {
  id: string;
  awayTeam: string;
  body: { value: string; summary?: string };
  gameDate: { time: string };
  homeTeam: string;
  image: { url: string; alt: string; width: number; height: number };
  path: string;
  score: string;
  title: string;
  venue: string;
}

export interface NodeTeam {
  id: string;
  body: { value: string; summary?: string };
  coach: string;
  division: any[];
  image: { url: string; alt: string; width: number; height: number };
  losses: number;
  path: string;
  title: string;
  wins: number;
}
