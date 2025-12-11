import type { LeadStats } from '@/lib/types/lead'
import { Users, UserCheck, Clock, TrendingUp } from 'lucide-react'

interface StatsCardsProps {
  stats: LeadStats
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: 'Total Clients',
      value: stats.total_leads,
      icon: Users,
      color: 'text-accent-gold-dark',
      bgColor: 'bg-accent-gold/10',
    },
    {
      title: 'Pending Contact',
      value: stats.pending_contact,
      icon: Clock,
      color: 'text-accent-teal',
      bgColor: 'bg-accent-teal/10',
    },
    {
      title: 'New This Week',
      value: stats.new_this_week,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-500/10',
    },
    {
      title: 'Contacted',
      value: stats.total_leads - stats.pending_contact,
      icon: UserCheck,
      color: 'text-blue-600',
      bgColor: 'bg-blue-500/10',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card) => {
        const Icon = card.icon
        return (
          <div
            key={card.title}
            className="glass-panel p-6 hover:shadow-card-hover transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${card.bgColor}`}>
                <Icon className={`w-6 h-6 ${card.color}`} />
              </div>
            </div>
            <h3 className="text-sm font-medium text-ink-light uppercase tracking-wide mb-1">
              {card.title}
            </h3>
            <p className="text-3xl font-bold text-ink">{card.value}</p>
          </div>
        )
      })}
    </div>
  )
}
