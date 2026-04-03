'use client'

import Link from 'next/link'
import { DrupalHomepage, DrupalTeam } from '@/lib/types'
import { ArrowRight, Trophy } from 'lucide-react'
import ResponsiveImage from './ResponsiveImage'

interface TeamsPreviewProps {
  homepageContent?: DrupalHomepage | null
  teams?: DrupalTeam[]
}

export default function TeamsPreview({ homepageContent, teams }: TeamsPreviewProps) {
  const sectionTitle = homepageContent?.featuredTeamsTitle || 'Featured Teams'

  if (!teams || teams.length === 0) return null

  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4 uppercase">{sectionTitle}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Meet the teams competing for the championship this season.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teams.map((team) => (
            <Link key={team.id} href={team.path || `/teams/${team.id}`}
              className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="relative h-48 bg-gradient-to-br from-primary-600 to-accent-800">
                {team.image?.url ? (
                  <ResponsiveImage src={team.image.url} alt={team.image.alt || team.title} fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    variations={team.image.variations} targetWidth={400} />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Trophy className="w-16 h-16 text-white/50" />
                  </div>
                )}
                {team.division && team.division.length > 0 && (
                  <div className="absolute top-4 left-4 bg-accent-800 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {team.division[0].name}
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="font-display text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-700 transition-colors">
                  {team.title}
                </h3>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  {team.wins !== undefined && team.losses !== undefined && (
                    <span className="font-semibold text-primary-700">{team.wins}W - {team.losses}L</span>
                  )}
                  {team.coach && <span>Coach: {team.coach}</span>}
                </div>
                <div className="flex items-center text-primary-700 font-medium group-hover:gap-2 transition-all">
                  View Team
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/teams"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-full hover:from-primary-500 hover:to-primary-600 transition-all duration-200 font-bold shadow-md shadow-primary-500/20">
            View All Teams
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  )
}
