'use client'
import { motion } from 'framer-motion'
import { Bookmark, Search, ExternalLink, Trash2 } from 'lucide-react'

const bookmarks = [
  { id: '1', title: 'AI Startups in India 2024', url: 'https://inc42.com/ai-startups', domain: 'inc42.com', saved: '2 days ago' },
  { id: '2', title: 'Quantum Computing Breakthrough', url: 'https://nature.com/quantum', domain: 'nature.com', saved: '5 days ago' },
  { id: '3', title: 'LLM Agent Frameworks Comparison', url: 'https://huggingface.co/blog', domain: 'huggingface.co', saved: '1 week ago' },
  { id: '4', title: 'Renewable Energy Market Report', url: 'https://bloomberg.com/energy', domain: 'bloomberg.com', saved: '2 weeks ago' },
]

export default function BookmarksPage() {
  return (
    <div className="h-full overflow-y-auto custom-scrollbar p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-2xl font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>Bookmarks</h1>
          <p className="text-white/40 text-sm mt-1">Saved sources from your research</p>
        </motion.div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input placeholder="Search bookmarks..." className="w-full pl-10 pr-4 py-2.5 glass border border-white/10 rounded-xl text-sm focus:outline-none focus:border-purple-500/40 placeholder-white/20" />
        </div>

        <div className="space-y-2">
          {bookmarks.map((b, i) => (
            <motion.div key={b.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
              className="flex items-center gap-4 p-4 glass rounded-xl border border-white/5 hover:border-purple-500/20 transition-all group">
              <Bookmark className="w-4 h-4 text-purple-400 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{b.title}</div>
                <div className="text-xs text-white/30 mt-0.5">{b.domain} · {b.saved}</div>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <a href={b.url} target="_blank" rel="noopener" className="p-1.5 glass rounded-lg text-white/40 hover:text-white transition-colors">
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button className="p-1.5 glass rounded-lg text-white/40 hover:text-red-400 transition-colors">
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
