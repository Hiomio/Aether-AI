'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Plus, FileText, Brain, Search, TrendingUp, Clock, ArrowRight, Zap } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { useResearchStore } from '@/store/researchStore'

const stats = [
  { label: 'Total Research', value: '24', change: '+3 this week', icon: Search },
  { label: 'Reports Generated', value: '18', change: '+2 today', icon: FileText },
  { label: 'Agent Runs', value: '147', change: '+12 today', icon: Brain },
  { label: 'Sources Found', value: '1,284', change: '+89 today', icon: TrendingUp },
]

const recentChats = [
  { title: 'AI startups in India', time: '2 mins ago', sources: 12, status: 'completed' },
  { title: 'Future of Quantum Computing', time: '1 hour ago', sources: 18, status: 'completed' },
  { title: 'LLM Agents Overview', time: '3 hours ago', sources: 15, status: 'completed' },
  { title: 'Renewable Energy Trends', time: 'Yesterday', sources: 20, status: 'completed' },
]

export default function DashboardPage() {
  const { user } = useAuthStore()
  const firstName = user?.name?.split(' ')[0] || 'Researcher'

  return (
    <div className="h-full overflow-y-auto custom-scrollbar p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <p className="text-white/40 text-sm mb-1">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
          <h1 className="text-3xl font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>
            Good morning, {firstName} 👋
          </h1>
          <p className="text-white/40 mt-1">Your AetherAI platform is ready.</p>
        </motion.div>

        {/* New Research CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
          <Link href="/dashboard/research">
            <div className="flex items-center gap-4 p-5 glass rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all cursor-pointer group glow-purple">
              <div className="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Plus className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="font-semibold" style={{ fontFamily: 'Syne, sans-serif' }}>New Research</div>
                <div className="text-sm text-white/40">Ask anything — agents will research, analyze, and report</div>
              </div>
              <ArrowRight className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="p-5 glass rounded-2xl border border-white/5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-white/40">{stat.label}</span>
                <div className="w-8 h-8 rounded-lg bg-purple-600/20 flex items-center justify-center">
                  <stat.icon className="w-4 h-4 text-purple-400" />
                </div>
              </div>
              <div className="text-2xl font-bold mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>{stat.value}</div>
              <div className="text-xs text-green-400">{stat.change}</div>
            </div>
          ))}
        </motion.div>

        {/* Recent Research */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold" style={{ fontFamily: 'Syne, sans-serif' }}>Recent Research</h2>
            <Link href="/dashboard/research" className="text-sm text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-2">
            {recentChats.map((chat, i) => (
              <motion.div
                key={chat.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
              >
                <Link href="/dashboard/research">
                  <div className="flex items-center gap-4 p-4 glass rounded-xl border border-white/5 hover:border-purple-500/20 transition-all cursor-pointer group">
                    <div className="w-8 h-8 rounded-lg bg-purple-600/20 flex items-center justify-center">
                      <Search className="w-4 h-4 text-purple-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{chat.title}</div>
                      <div className="text-xs text-white/30 flex items-center gap-2 mt-0.5">
                        <Clock className="w-3 h-3" /> {chat.time}
                        <span className="text-white/20">·</span>
                        <span>{chat.sources} sources</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                      <span className="text-xs text-white/30">Completed</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-8 grid grid-cols-3 gap-4">
          {[
            { icon: FileText, label: 'View Reports', href: '/dashboard/reports', color: 'text-blue-400' },
            { icon: Zap, label: 'Manage Agents', href: '/dashboard/agents', color: 'text-yellow-400' },
            { icon: Brain, label: 'Upload Docs', href: '/dashboard/documents', color: 'text-green-400' },
          ].map((action) => (
            <Link key={action.label} href={action.href}>
              <div className="flex items-center gap-3 p-4 glass rounded-xl border border-white/5 hover:border-white/10 transition-all cursor-pointer">
                <action.icon className={`w-5 h-5 ${action.color}`} />
                <span className="text-sm font-medium">{action.label}</span>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
