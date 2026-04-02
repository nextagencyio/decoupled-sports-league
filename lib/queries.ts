// Tagged template that returns the query string
const gql = (strings: TemplateStringsArray, ...values: any[]) => strings.reduce((a, s, i) => a + s + (values[i] || ''), '')

// Homepage query with stats
export const GET_HOMEPAGE_DATA = gql`
  query GetHomepageData {
    nodeHomepages(first: 1) {
      nodes {
        id
        title
        path
        heroTitle
        heroSubtitle
        heroDescription {
          processed
        }
        statsItems {
          ... on ParagraphStatItem {
            id
            number
            label
          }
        }
        featuredTeamsTitle
        ctaTitle
        ctaDescription {
          processed
        }
        ctaPrimary
        ctaSecondary
      }
    }
  }
`

// Teams
export const GET_TEAMS = gql`
  query GetTeams($first: Int = 20) {
    nodeTeams(first: $first, sortKey: TITLE) {
      nodes {
        id
        title
        path
        ... on NodeTeam {
          body {
            processed
            summary
          }
          division {
            ... on TermInterface {
              id
              name
            }
          }
          coach
          wins
          losses
          image {
            url
            alt
            width
            height
            variations(styles: [LARGE, MEDIUM]) {
              name
              url
              width
              height
            }
          }
        }
      }
    }
  }
`

export const GET_TEAM_BY_PATH = gql`
  query GetTeamByPath($path: String!) {
    route(path: $path) {
      ... on RouteInternal {
        entity {
          ... on NodeTeam {
            id
            title
            path
            body {
              processed
            }
            division {
              ... on TermInterface {
                id
                name
              }
            }
            coach
            wins
            losses
            image {
              url
              alt
              width
              height
              variations(styles: [LARGE, MEDIUM]) {
                name
                url
                width
                height
              }
            }
          }
        }
      }
    }
  }
`

// Players
export const GET_PLAYERS = gql`
  query GetPlayers($first: Int = 50) {
    nodePlayers(first: $first, sortKey: TITLE) {
      nodes {
        id
        title
        path
        ... on NodePlayer {
          body {
            processed
          }
          teamName
          position {
            ... on TermInterface {
              id
              name
            }
          }
          jerseyNumber
          photo {
            url
            alt
            width
            height
            variations(styles: [MEDIUM, THUMBNAIL]) {
              name
              url
              width
              height
            }
          }
        }
      }
    }
  }
`

export const GET_PLAYER_BY_PATH = gql`
  query GetPlayerByPath($path: String!) {
    route(path: $path) {
      ... on RouteInternal {
        entity {
          ... on NodePlayer {
            id
            title
            path
            body {
              processed
            }
            teamName
            position {
              ... on TermInterface {
                id
                name
              }
            }
            jerseyNumber
            photo {
              url
              alt
              width
              height
              variations(styles: [LARGE, MEDIUM]) {
                name
                url
                width
                height
              }
            }
          }
        }
      }
    }
  }
`

// Schedule
export const GET_SCHEDULE = gql`
  query GetSchedule($first: Int = 50) {
    nodeScheduleEntries(first: $first, sortKey: CREATED_AT) {
      nodes {
        id
        title
        path
        ... on NodeScheduleEntry {
          body {
            processed
            summary
          }
          homeTeam
          awayTeam
          gameDate {
            timestamp
          }
          venue
          score
          image {
            url
            alt
            width
            height
            variations(styles: [LARGE, MEDIUM]) {
              name
              url
              width
              height
            }
          }
        }
      }
    }
  }
`

export const GET_SCHEDULE_ENTRY_BY_PATH = gql`
  query GetScheduleEntryByPath($path: String!) {
    route(path: $path) {
      ... on RouteInternal {
        entity {
          ... on NodeScheduleEntry {
            id
            title
            path
            body {
              processed
            }
            homeTeam
            awayTeam
            gameDate {
              timestamp
            }
            venue
            score
            image {
              url
              alt
              width
              height
              variations(styles: [LARGE, MEDIUM]) {
                name
                url
                width
                height
              }
            }
          }
        }
      }
    }
  }
`

// News
export const GET_NEWS = gql`
  query GetNews($first: Int = 20) {
    nodeNewsItems(first: $first, sortKey: CREATED_AT) {
      nodes {
        id
        title
        path
        created {
          timestamp
        }
        ... on NodeNews {
          body {
            processed
            summary
          }
          image {
            url
            alt
            width
            height
            variations(styles: [LARGE, MEDIUM, THUMBNAIL]) {
              name
              url
              width
              height
            }
          }
          category {
            ... on TermInterface {
              id
              name
            }
          }
          featured
        }
      }
    }
  }
`

export const GET_NEWS_BY_PATH = gql`
  query GetNewsByPath($path: String!) {
    route(path: $path) {
      ... on RouteInternal {
        entity {
          ... on NodeNews {
            id
            title
            path
            created {
              timestamp
            }
            body {
              processed
            }
            image {
              url
              alt
              width
              height
              variations(styles: [LARGE, MEDIUM]) {
                name
                url
                width
                height
              }
            }
            category {
              ... on TermInterface {
                id
                name
              }
            }
            featured
          }
        }
      }
    }
  }
`

// Generic route query for pages and other content
export const GET_NODE_BY_PATH = gql`
  query GetNodeByPath($path: String!) {
    route(path: $path) {
      ... on RouteInternal {
        entity {
          ... on NodePage {
            id
            title
            body {
              processed
            }
          }
          ... on NodeTeam {
            id
            title
            path
            body {
              processed
            }
            division {
              ... on TermInterface {
                id
                name
              }
            }
            coach
            wins
            losses
          }
          ... on NodePlayer {
            id
            title
            path
            body {
              processed
            }
            teamName
            position {
              ... on TermInterface {
                id
                name
              }
            }
            jerseyNumber
          }
          ... on NodeScheduleEntry {
            id
            title
            path
            body {
              processed
            }
            homeTeam
            awayTeam
            gameDate {
              timestamp
            }
            venue
            score
          }
          ... on NodeNews {
            id
            title
            path
            created {
              timestamp
            }
            body {
              processed
            }
            category {
              ... on TermInterface {
                id
                name
              }
            }
            featured
          }
          ... on NodeHomepage {
            id
            title
            heroTitle
            heroSubtitle
            heroDescription {
              processed
            }
            statsItems {
              ... on ParagraphStatItem {
                id
                number
                label
              }
            }
            featuredTeamsTitle
            ctaTitle
            ctaDescription {
              processed
            }
            ctaPrimary
            ctaSecondary
          }
        }
      }
    }
  }
`

// Featured teams for homepage (limit to 3)
export const GET_FEATURED_TEAMS = gql`
  query GetFeaturedTeams {
    nodeTeams(first: 3, sortKey: TITLE) {
      nodes {
        id
        title
        path
        ... on NodeTeam {
          division {
            ... on TermInterface {
              id
              name
            }
          }
          coach
          wins
          losses
          image {
            url
            alt
            variations(styles: [MEDIUM]) {
              name
              url
              width
              height
            }
          }
        }
      }
    }
  }
`

// Featured news for homepage
export const GET_FEATURED_NEWS = gql`
  query GetFeaturedNews {
    nodeNewsItems(first: 3, sortKey: CREATED_AT) {
      nodes {
        id
        title
        path
        created {
          timestamp
        }
        ... on NodeNews {
          body {
            summary
          }
          image {
            url
            alt
            variations(styles: [MEDIUM, THUMBNAIL]) {
              name
              url
              width
              height
            }
          }
          category {
            ... on TermInterface {
              id
              name
            }
          }
          featured
        }
      }
    }
  }
`

// Upcoming schedule for homepage
export const GET_UPCOMING_SCHEDULE = gql`
  query GetUpcomingSchedule {
    nodeScheduleEntries(first: 3, sortKey: CREATED_AT) {
      nodes {
        id
        title
        path
        ... on NodeScheduleEntry {
          homeTeam
          awayTeam
          gameDate {
            timestamp
          }
          venue
          score
        }
      }
    }
  }
`
