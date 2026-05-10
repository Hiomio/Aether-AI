'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Layers, Plus, Users, Calendar, Trash2, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { toast } from 'sonner'

const workspaces = [
  { id: '1', name: 'AI Research Hub', description: 'Primary workspace for AI/ML research projects', members: 3, chats: 12, created_at: '2024-01-15' },
  { id: '2', name: 'Market Analysis', description: 'Competitive intelligence and market trends', members: 2, chats: 8, created_at: '2024-02-20' },
  { id: '3', name: 'Product Research', description: 'User research and product discovery', members: 5, chats: 24, created_at: '2024-03-01' },
]

export default function WorkspacesPage() {
  const [showCreate, setShowCreate] = useState(false)
  const [newName, setNewName] = useState('')

  const handleCreate = () => {
    if (!newName.trim()) return
    toast.success(`Workspace "${newName}" created!`)
    setNewName('')
    setShowCreate(false)
  }

  return (
    <div className="h-full overflow-y-auto custom-scrollbar p-8">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>Workspaces</h1>
            <p className="text-white/40 text-sm mt-1">Organize your research into collaborative spaces</p>
          </div>
          <button
            onClick={() => setShowCreate(!showCreate)}
            className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 rounded-xl text-sm font-medium transition-colors glow-purple-sm"
          >
            <Plus className="w-4 h-4" /> New Workspace
          </button>
        </motion.div>

        {showCreate && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-5 glass rounded-2xl border border-purple-500/20">
            <h3 className="font-semibold mb-4 text-sm">Create Workspace</h3>
            <div className="flex gap-3">
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Workspace name..."
                className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-purple-500/40 placeholder-white/20"
              />
              <button onClick={handleCreate} className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 rounded-xl text-sm transition-colors">
                Create
              </button>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {workspaces.map((ws, i) => (
            <motion.div
              key={ws.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="p-5 glass rounded-2xl border border-white/5 hover:border-purple-500/20 transition-all group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-purple-600/20 flex items-center justify-center">
                  <Layers className="w-5 h-5 text-purple-400" />
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 glass rounded-lg text-white/30 hover:text-red-400">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <h3 className="font-semibold mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>{ws.name}</h3>
              <p className="text-xs text-white/30 mb-4 leading-relaxed">{ws.description}</p>
              <div className="flex items-center justify-between text-xs text-white/30">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {ws.members}</span>
                  <span>{ws.chats} chats</span>
                </div>
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {formatDate(ws.created_at)}</span>
              </div>
              <Link href="/dashboard/research">
                <div className="mt-4 flex items-center gap-1 text-xs text-purple-400 group-hover:gap-2 transition-all">
                  Open workspace <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
