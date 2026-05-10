'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Brain, Home, MessageSquare, Layers, Cpu, FileText,
  FolderOpen, Bookmark, Users, Settings, Plus,
  ChevronDown, ChevronRight, LogOut
} from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

const navItems = [
  { icon: Home, label: 'Home', href: '/dashboard' },
  { icon: MessageSquare, label: 'Research Chats', href: '/dashboard/research' },
  { icon: Layers, label: 'Workspaces', href: '/dashboard/workspaces' },
  { icon: Cpu, label: 'Agents', href: '/dashboard/agents' },
  { icon: FileText, label: 'Reports', href: '/dashboard/reports' },
  { icon: FolderOpen, label: 'Documents', href: '/dashboard/documents' },
  { icon: Bookmark, label: 'Bookmarks', href: '/dashboard/bookmarks' },
  { icon: Users, label: 'Team', href: '/dashboard/team' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
]

const recentChats = [
  { title: 'AI startups in India', id: '1' },
  { title: 'Future of Quantum Co...', id: '2' },
  { title: 'LLM Agents Overview', id: '3' },
  { title: 'Renewable Energy Tr...', id: '4' },
  { title: 'AI in Healthcare', id: '5' },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuthStore()
  const [showRecent, setShowRecent] = useState(true)

  const handleLogout = () => {
    logout()
    router.push('/auth/login')
  }

  return (
    <div className="w-[200px] h-full glass border-r border-white/5 flex flex-col flex-shrink-0">
      {/* Logo */}
      <div className="p-4 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center flex-shrink-0">
            <Brain className="w-4 h-4" />
          </div>
          <div>
            <div className="text-sm font-bold leading-tight" style={{ fontFamily: 'Syne, sans-serif' }}>Aether AI</div>
            <div className="text-[10px] text-white/30">Multi-Agent System</div>
          </div>
        </div>
      </div>

      {/* New Research Button */}
      <div className="p-3">
        <Link href="/dashboard/research">
          <button className="w-full flex items-center gap-2 px-3 py-2.5 bg-green-600 hover:bg-green-700 rounded-xl text-sm font-medium transition-colors glow-green-sm">
            <Plus className="w-4 h-4" />
            New Research
          </button>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto custom-scrollbar px-2">
        <div className="space-y-0.5">
          {navItems.map((item) => {
            const active = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
            return (
              <Link key={item.href} href={item.href}>
                <div className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all cursor-pointer',
                  active
                    ? 'bg-green-600/20 text-green-300 border border-green-500/20'
                    : 'text-white/50 hover:text-white/80 hover:bg-white/5'
                )}>
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{item.label}</span>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Recent Chats */}
        <div className="mt-4">
          <button
            onClick={() => setShowRecent(!showRecent)}
            className="flex items-center gap-1 px-3 py-1 text-xs text-white/30 hover:text-white/50 transition-colors w-full"
          >
            {showRecent ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
            Recent Chats
          </button>
          <AnimatePresence>
            {showRecent && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-1 space-y-0.5">
                  {recentChats.map((chat) => (
                    <Link key={chat.id} href={`/dashboard/research?id=${chat.id}`}>
                      <div className="px-3 py-1.5 text-xs text-white/40 hover:text-white/70 hover:bg-white/5 rounded-lg transition-all cursor-pointer truncate">
                        {chat.title}
                      </div>
                    </Link>
                  ))}
                  <Link href="/dashboard/research">
                    <div className="px-3 py-1.5 text-xs text-green-400 hover:text-green-300 transition-colors cursor-pointer">
                      View all →
                    </div>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* User */}
      <div className="p-3 border-t border-white/5">
        <div className="flex items-center gap-2 p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
          <div className="w-7 h-7 rounded-full bg-green-600/40 flex items-center justify-center flex-shrink-0 text-xs font-bold">
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium truncate">{user?.name || 'User'}</div>
            <div className="text-[10px] text-white/30 truncate">{user?.email || ''}</div>
          </div>
          <button onClick={handleLogout} className="opacity-0 group-hover:opacity-100 transition-opacity">
            <LogOut className="w-3.5 h-3.5 text-white/40 hover:text-red-400 transition-colors" />
          </button>
        </div>
      </div>
    </div>
  )
}
