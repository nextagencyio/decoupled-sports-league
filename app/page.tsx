import { getClient } from '@/lib/drupal-client'
import HomepageRenderer from './components/HomepageRenderer'
import SetupGuide from './components/SetupGuide'
import ContentSetupGuide from './components/ContentSetupGuide'
import { Metadata } from 'next'
import { checkConfiguration } from '../lib/config-check'
import { GET_HOMEPAGE_DATA, GET_FEATURED_TEAMS, GET_UPCOMING_SCHEDULE } from '@/lib/queries'

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

  // Fetch homepage content using the nodeHomepages query directly
  let homepageContent: any = null
  try {
    const data = await client.raw(GET_HOMEPAGE_DATA)
    homepageContent = data?.nodeHomepages?.nodes?.[0] || null
  } catch (e) {
    console.error('Error fetching homepage:', e)
  }

  if (!homepageContent) {
    const drupalBaseUrl = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL
    return <ContentSetupGuide drupalBaseUrl={drupalBaseUrl} />
  }

  // Fetch featured teams and schedule server-side
  let featuredTeams: any[] = []
  let upcomingSchedule: any[] = []
  try {
    const teamsData = await client.raw(GET_FEATURED_TEAMS)
    featuredTeams = teamsData?.nodeTeams?.nodes || []
  } catch (e) { console.error('Error fetching featured teams:', e) }
  try {
    const scheduleData = await client.raw(GET_UPCOMING_SCHEDULE)
    upcomingSchedule = scheduleData?.nodeScheduleEntries?.nodes || []
  } catch (e) { console.error('Error fetching schedule:', e) }

  return <HomepageRenderer homepageContent={homepageContent} featuredTeams={featuredTeams} upcomingSchedule={upcomingSchedule} />
}
