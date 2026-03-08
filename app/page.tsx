import HomepageRenderer from './components/HomepageRenderer'
import SetupGuide from './components/SetupGuide'
import ContentSetupGuide from './components/ContentSetupGuide'
import { Metadata } from 'next'
import { headers } from 'next/headers'
import { getServerApolloClient } from '../lib/apollo-client'
import { GET_HOMEPAGE_DATA } from '../lib/queries'
import { HomepageData } from '../lib/types'
import { checkConfiguration } from '../lib/config-check'

export const revalidate = 3600
export const dynamic = 'force-dynamic'

async function getHomepageData(apolloClient: ReturnType<typeof getServerApolloClient>): Promise<HomepageData | null> {
  try {
    const { data } = await apolloClient.query<HomepageData>({ query: GET_HOMEPAGE_DATA, fetchPolicy: 'cache-first' })
    return data
  } catch (error) {
    console.error('Error fetching homepage data:', error)
    return null
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Pacific Athletic League - Where Champions Rise'
  const description = 'Follow your favorite teams, track standings, view player profiles, and never miss a game. Join the excitement of Pacific Athletic League.'
  return {
    title, description,
    keywords: ['Sports League', 'Teams', 'Players', 'Game Schedule', 'Standings', 'League News'],
    openGraph: { title, description, type: 'website', locale: 'en_US' },
    twitter: { card: 'summary_large_image', title, description },
  }
}

export default async function Home() {
  const configStatus = checkConfiguration()
  if (!configStatus.isConfigured) return <SetupGuide missingVars={configStatus.missingVars} />

  const requestHeaders = await headers()
  const apolloClient = getServerApolloClient(requestHeaders)
  const data = await getHomepageData(apolloClient)
  const homepageContent = data?.nodeHomepages?.nodes?.[0]

  if (!homepageContent) {
    const drupalBaseUrl = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL
    return <ContentSetupGuide drupalBaseUrl={drupalBaseUrl} />
  }

  return <HomepageRenderer homepageContent={homepageContent} />
}
