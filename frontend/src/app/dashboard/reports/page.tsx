'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Search, Download, Eye, Trash2, Calendar, Globe } from 'lucide-react'
import { formatDate } from '@/lib/utils'

const reports = [
  { id: '1', title: 'AI Startups in India', date: '2024-05-20', sources: 12, type: 'PDF', size: '2.4 MB', status: 'completed' },
  { id: '2', title: 'Future of Quantum Computing', date: '2024-05-19', sources: 18, type: 'DOCX', size: '1.8 MB', status: 'completed' },
  { id: '3', title: 'Market Research Report', date: '2024-05-18', sources: 9, type: 'TXT', size: '0.6 MB', status: 'completed' },
  { id: '4', title: 'AI Companies Data Analysis', date: '2024-05-17', sources: 23, type: 'PDF', size: '3.1 MB', status: 'completed' },
  { id: '5', title: 'Renewable Energy Trends 2024', date: '2024-05-16', sources: 15, type: 'PDF', size: '2.8 MB', status: 'completed' },
]

const typeColor: Record<string, string> = {
  PDF: 'text-red-400 bg-red-400/10',
  DOCX: 'text-blue-400 bg-blue-400/10',
  TXT: 'text-green-400 bg-green-400/10',
}

const filters = ['All', 'Today', 'This Week', 'This Month']

export default function ReportsPage() {
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = reports.filter(r => r.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="h-full overflow-y-auto custom-scrollbar p-8">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>Reports</h1>
            <p className="text-white/40 text-sm mt-1">{reports.length} research reports generated</p>
          </div>
          <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-xl text-sm font-medium transition-colors glow-purple-sm flex items-center gap-2">
            <FileText className="w-4 h-4" /> New Report
          </button>
        </motion.div>

        {/* Search + Filters */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search reports..."
              className="w-full pl-10 pr-4 py-2.5 glass border border-white/10 rounded-xl text-sm focus:outline-none focus:border-purple-500/40 placeholder-white/20"
            />
          </div>
          <div className="flex gap-1">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-3 py-2 rounded-lg text-xs transition-colors ${
                  activeFilter === f
                    ? 'bg-purple-600/30 text-purple-300 border border-purple-500/30'
                    : 'text-white/40 hover:text-white/60 glass'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Reports List */}
        <div className="space-y-2">
          {filtered.map((report, i) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className="flex items-center gap-4 p-4 glass rounded-2xl border border-white/5 hover:border-purple-500/20 transition-all group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-600/20 flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-purple-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm truncate">{report.title}</div>
                <div className="flex items-center gap-3 mt-1 text-xs text-white/30">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {formatDate(report.date)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Globe className="w-3 h-3" /> {report.sources} sources
                  </span>
                  <span>{report.size}</span>
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded-lg font-mono ${typeColor[report.type] || 'text-white/40 bg-white/5'}`}>
                {report.type}
              </span>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 glass rounded-lg text-white/40 hover:text-white transition-colors">
                  <Eye className="w-3.5 h-3.5" />
                </button>
                <button className="p-2 glass rounded-lg text-white/40 hover:text-white transition-colors">
                  <Download className="w-3.5 h-3.5" />
                </button>
                <button className="p-2 glass rounded-lg text-white/40 hover:text-red-400 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
