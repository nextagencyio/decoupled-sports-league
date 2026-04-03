'use client'

import Link from 'next/link'
import { DrupalScheduleEntry } from '@/lib/types'
import { MapPin, ArrowRight, Calendar } from 'lucide-react'

interface SchedulePreviewProps {
  entries?: DrupalScheduleEntry[]
}

function formatGameDate(timestamp: number): { month: string; day: string; time: string } {
  const date = new Date(timestamp * 1000)
  return {
    month: date.toLocaleDateString('en-US', { month: 'short' }),
    day: date.getDate().toString(),
    time: date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
  }
}

export default function SchedulePreview({ entries }: SchedulePreviewProps) {
  if (!entries || entries.length === 0) return null

  return (
    <section className="py-16 md:py-20 bg-gradient-to-r from-accent-900 via-accent-950 to-accent-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 uppercase">Upcoming Games</h2>
            <p className="text-lg text-accent-200 max-w-2xl">
              Don&apos;t miss the action. Check out the upcoming matchups.
            </p>
          </div>
          <Link href="/schedule" className="hidden md:flex items-center text-primary-400 hover:text-primary-300 font-medium">
            Full Schedule
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {entries.map((entry) => {
            const dateInfo = entry.gameDate ? formatGameDate(entry.gameDate.timestamp) : null
            return (
              <Link key={entry.id} href={entry.path || `/schedule/${entry.id}`}
                className="group bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300">
                <div className="flex gap-4">
                  {dateInfo && (
                    <div className="flex-shrink-0 text-center bg-primary-600 text-white rounded-lg p-3 w-16">
                      <div className="text-xs font-semibold uppercase">{dateInfo.month}</div>
                      <div className="text-2xl font-bold">{dateInfo.day}</div>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-primary-400 transition-colors line-clamp-2">
                      {entry.homeTeam} vs {entry.awayTeam}
                    </h3>
                    <div className="flex flex-wrap gap-3 text-sm text-accent-200">
                      {dateInfo && (
                        <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{dateInfo.time}</span>
                      )}
                      {entry.venue && (
                        <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{entry.venue}</span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="text-center mt-10">
          <Link href="/schedule"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-full hover:from-primary-500 hover:to-primary-600 transition-all duration-200 font-bold shadow-lg shadow-primary-600/30">
            View Full Schedule
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  )
}
