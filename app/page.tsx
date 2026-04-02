import { getClient } from '@/lib/drupal-client'
import HomepageRenderer from './components/HomepageRenderer'
import SetupGuide from './components/SetupGuide'
import ContentSetupGuide from './components/ContentSetupGuide'
import { Metadata } from 'next'
import { checkConfiguration } from '../lib/config-check'

export const revalidate = 3600
export const dynamic = 'force-dynamic'


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

  const client = getClient()
  const homepageContent = await client.getEntryByPath('/') as any

  if (!homepageContent) {
    const drupalBaseUrl = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL
    return <ContentSetupGuide drupalBaseUrl={drupalBaseUrl} />
  }

  return <HomepageRenderer homepageContent={homepageContent} />
}
