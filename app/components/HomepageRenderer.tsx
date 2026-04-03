'use client'

import Image from 'next/image'
import Header from './Header'
import HeroSection from './HeroSection'
import StatsSection from './StatsSection'
import CTASection from './CTASection'
import TeamsPreview from './TeamsPreview'
import SchedulePreview from './SchedulePreview'
import ErrorBoundary from './ErrorBoundary'
import { DrupalHomepage } from '@/lib/types'
import { Trophy, Users, Calendar, Medal, MapPin, Star } from 'lucide-react'

interface HomepageRendererProps {
  homepageContent: DrupalHomepage | null | undefined
  featuredTeams?: any[]
  upcomingSchedule?: any[]
}

const experiences = [
  { icon: Trophy, label: 'Championships' },
  { icon: Users, label: 'Team Rosters' },
  { icon: Calendar, label: 'Game Schedule' },
  { icon: Medal, label: 'Player Stats' },
  { icon: MapPin, label: 'Venues' },
  { icon: Star, label: 'All-Stars' },
]

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&q=80&fit=crop', alt: 'Athletes competing' },
  { src: 'https://images.unsplash.com/photo-1471295253337-3ceaaedca402?w=600&q=80&fit=crop', alt: 'Stadium crowd' },
  { src: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&q=80&fit=crop', alt: 'Athletic training' },
  { src: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=600&q=80&fit=crop', alt: 'Team celebration' },
]

export default function HomepageRenderer({ homepageContent, featuredTeams, upcomingSchedule }: HomepageRendererProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <ErrorBoundary>
        <HeroSection homepageContent={homepageContent} />
      </ErrorBoundary>

      <ErrorBoundary>
        <StatsSection homepageContent={homepageContent} />
      </ErrorBoundary>

      {/* Experiences Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4 uppercase">The League Experience</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Everything you need to follow the action across all four divisions.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {experiences.map((exp, i) => (
              <div key={i} className="text-center group">
                <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-primary-100 to-accent-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <exp.icon className="w-8 h-8 text-primary-700" />
                </div>
                <p className="text-sm font-medium text-gray-700">{exp.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ErrorBoundary>
        <TeamsPreview homepageContent={homepageContent} teams={featuredTeams} />
      </ErrorBoundary>

      <ErrorBoundary>
        <SchedulePreview entries={upcomingSchedule} />
      </ErrorBoundary>

      {/* Photo Gallery */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4 uppercase">Game Day Moments</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              The best moments from across the league captured on and off the field.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((img, i) => (
              <div key={i} className="relative aspect-square rounded-xl overflow-hidden group">
                <Image src={img.src} alt={img.alt} fill className="object-cover group-hover:scale-110 transition-transform duration-500" unoptimized />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <ErrorBoundary>
        <CTASection homepageContent={homepageContent} />
      </ErrorBoundary>

      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1">
              <h3 className="font-display text-2xl font-bold text-white mb-4 uppercase">Pacific Athletic League</h3>
              <p className="text-gray-400 mb-4">Where champions rise. Follow your favorite teams, track standings, and never miss a game.</p>
            </div>
            <div>
              <h4 className="font-display font-semibold text-white mb-4">Explore</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/" className="hover:text-primary-400 transition-colors">Home</a></li>
                <li><a href="/about" className="hover:text-primary-400 transition-colors">About</a></li>
                <li><a href="/news" className="hover:text-primary-400 transition-colors">News</a></li>
                <li><a href="/contact" className="hover:text-primary-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-display font-semibold text-white mb-4">League</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/teams" className="hover:text-primary-400 transition-colors">Teams</a></li>
                <li><a href="/players" className="hover:text-primary-400 transition-colors">Players</a></li>
                <li><a href="/schedule" className="hover:text-primary-400 transition-colors">Schedule</a></li>
                <li><a href="/news" className="hover:text-primary-400 transition-colors">League News</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-display font-semibold text-white mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>500 Pacific Arena Drive</li>
                <li>Pacific City, CA 90210</li>
                <li>info@pacificathletic.com</li>
                <li>(555) 867-5309</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} Pacific Athletic League. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
