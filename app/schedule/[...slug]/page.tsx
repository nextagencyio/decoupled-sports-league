import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { headers } from 'next/headers'
import Link from 'next/link'
import { getServerApolloClient } from '@/lib/apollo-client'
import { GET_SCHEDULE_ENTRY_BY_PATH } from '@/lib/queries'
import { DrupalScheduleEntry } from '@/lib/types'
import Header from '../../components/Header'
import ResponsiveImage from '../../components/ResponsiveImage'
import { ArrowLeft } from 'lucide-react'

export const revalidate = 300
export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ slug: string[] }>
}

interface ScheduleEntryByPathData {
  route: {
    entity: DrupalScheduleEntry
  } | null
}

async function getScheduleEntry(path: string): Promise<DrupalScheduleEntry | null> {
  try {
    const requestHeaders = await headers()
    const apolloClient = getServerApolloClient(requestHeaders)
    const { data } = await apolloClient.query<ScheduleEntryByPathData>({
      query: GET_SCHEDULE_ENTRY_BY_PATH,
      variables: { path },
      fetchPolicy: 'cache-first',
    })
    return data?.route?.entity || null
  } catch (error) {
    console.error('Error fetching schedule entry:', error)
    return null
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const path = `/schedule/${slug.join('/')}`
  const item = await getScheduleEntry(path)

  if (!item) {
    return { title: 'Schedule Entry Not Found | Sports League' }
  }

  return {
    title: `${item.title} | Sports League`,
    description: ((item as any).body?.processed ? (item as any).body.processed.replace(/<[^>]*>/g, '').substring(0, 160) : '') || `Learn more about ${item.title}.`,
  }
}

export default async function ScheduleEntryDetailPage({ params }: PageProps) {
  const { slug } = await params
  const path = `/schedule/${slug.join('/')}`
  const item = await getScheduleEntry(path)

  if (!item) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <section className="bg-gradient-to-br from-green-900 via-green-800 to-green-900 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/schedule"
            className="inline-flex items-center text-green-200 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Schedule
          </Link>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            {item.title}
          </h1>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {(item as any).image?.url && (
                <div className="relative h-64 md:h-96 rounded-xl overflow-hidden shadow-lg mb-8">
                  <ResponsiveImage
                    src={(item as any).image.url}
                    alt={(item as any).image.alt || item.title}
                    fill
                    className="object-cover"
                    variations={(item as any).image.variations}
                    targetWidth={800}
                  />
                </div>
              )}

              {(item as any).body?.processed && (
                <div className="bg-white rounded-xl shadow-sm p-8">
                  <div
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: (item as any).body.processed }}
                  />
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Details</h3>
                <dl className="space-y-4">
                  {(item as any).homeTeam && (
                    <div>
                      <dt className="text-sm text-gray-500">Home Team</dt>
                      <dd className="font-semibold text-gray-900">{(item as any).homeTeam}</dd>
                    </div>
                  )}
                  {(item as any).awayTeam && (
                    <div>
                      <dt className="text-sm text-gray-500">Away Team</dt>
                      <dd className="font-semibold text-gray-900">{(item as any).awayTeam}</dd>
                    </div>
                  )}
                  {(item as any).venue && (
                    <div>
                      <dt className="text-sm text-gray-500">Venue</dt>
                      <dd className="font-semibold text-gray-900">{(item as any).venue}</dd>
                    </div>
                  )}
                  {(item as any).score && (
                    <div>
                      <dt className="text-sm text-gray-500">Score</dt>
                      <dd className="font-semibold text-gray-900">{(item as any).score}</dd>
                    </div>
                  )}
                </dl>
                <div className="mt-8">
                  <Link
                    href="/contact"
                    className="block w-full text-center px-6 py-3 bg-green-700 text-white rounded-lg font-bold hover:bg-green-600 transition-colors"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
