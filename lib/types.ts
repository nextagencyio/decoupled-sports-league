// Base node type
export interface DrupalNode {
  id: string
  title: string
  path: string
  created: {
    timestamp: number
  }
  changed: {
    timestamp: number
  }
}

// Paragraph types
export interface DrupalStatItem {
  id: string
  number: string
  label: string
}

// Homepage
export interface DrupalHomepage extends DrupalNode {
  heroTitle?: string
  heroSubtitle?: string
  heroDescription?: {
    processed: string
  }
  statsItems?: DrupalStatItem[]
  featuredTeamsTitle?: string
  ctaTitle?: string
  ctaDescription?: {
    processed: string
  }
  ctaPrimary?: string
  ctaSecondary?: string
}

export interface HomepageData {
  nodeHomepages: {
    nodes: DrupalHomepage[]
  }
}

// Team
export interface DrupalTeam extends DrupalNode {
  body?: {
    processed: string
    summary?: string
  }
  division?: DrupalTerm[]
  coach?: string
  wins?: number
  losses?: number
  image?: DrupalImage
}

export interface TeamsData {
  nodeTeams: {
    nodes: DrupalTeam[]
  }
}

// Player
export interface DrupalPlayer extends DrupalNode {
  body?: {
    processed: string
  }
  teamName?: string
  position?: DrupalTerm[]
  jerseyNumber?: number
  photo?: DrupalImage
}

export interface PlayersData {
  nodePlayers: {
    nodes: DrupalPlayer[]
  }
}

// Schedule Entry
export interface DrupalScheduleEntry extends DrupalNode {
  body?: {
    processed: string
    summary?: string
  }
  homeTeam?: string
  awayTeam?: string
  gameDate?: {
    timestamp: number
  }
  venue?: string
  score?: string
  image?: DrupalImage
}

export interface ScheduleData {
  nodeScheduleEntries: {
    nodes: DrupalScheduleEntry[]
  }
}

// News Article
export interface DrupalNews extends DrupalNode {
  body?: {
    processed: string
    summary?: string
  }
  image?: DrupalImage
  category?: DrupalTerm[]
  featured?: boolean
}

export interface NewsData {
  nodeNewsItems: {
    nodes: DrupalNews[]
  }
}

// Basic Page
export interface DrupalPage extends DrupalNode {
  body?: {
    processed: string
  }
}

// Shared types
export interface DrupalImage {
  url: string
  alt?: string
  width?: number
  height?: number
  variations?: Array<{
    name: string
    url: string
    width: number
    height: number
  }>
}

export interface DrupalTerm {
  id: string
  name: string
  path?: string
}

// Feature color type
export type FeatureColor = 'blue' | 'green' | 'purple' | 'yellow' | 'red' | 'indigo'
