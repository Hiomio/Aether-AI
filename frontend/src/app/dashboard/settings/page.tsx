'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Key, Bell, Shield, Palette, Database, Save } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { toast } from 'sonner'

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'api', label: 'API Keys', icon: Key },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
]

export default function SettingsPage() {
  const { user, updateUser } = useAuthStore()
  const [activeTab, setActiveTab] = useState('profile')
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')

  const handleSave = () => {
    updateUser({ name, email })
    toast.success('Settings saved!')
  }

  return (
    <div className="h-full overflow-y-auto custom-scrollbar p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-2xl font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>Settings</h1>
          <p className="text-white/40 text-sm mt-1">Manage your account and preferences</p>
        </motion.div>

        <div className="flex gap-6">
          {/* Sidebar tabs */}
          <div className="w-48 flex-shrink-0">
            <div className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                    activeTab === tab.id
                      ? 'bg-purple-600/20 text-purple-300 border border-purple-500/20'
                      : 'text-white/40 hover:text-white/70 hover:bg-white/5'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            {activeTab === 'profile' && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass rounded-2xl border border-white/5 p-6">
                <h2 className="font-semibold mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>Profile Information</h2>

                {/* Avatar */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-purple-600/40 flex items-center justify-center text-2xl font-bold">
                    {user?.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <div>
                    <button className="px-3 py-1.5 glass rounded-lg text-xs text-white/50 hover:text-white transition-colors">
                      Change Avatar
                    </button>
                    <p className="text-xs text-white/20 mt-1">JPG, PNG up to 2MB</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-white/50 mb-1.5 block">Full Name</label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/50 mb-1.5 block">Email Address</label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/50 mb-1.5 block">Plan</label>
                    <div className="flex items-center gap-2 px-4 py-3 glass rounded-xl border border-white/5">
                      <span className="text-sm">Pro Plan</span>
                      <span className="text-xs px-2 py-0.5 bg-purple-600/20 text-purple-300 rounded-full">Active</span>
                    </div>
                  </div>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 rounded-xl text-sm font-medium transition-colors glow-purple-sm"
                  >
                    <Save className="w-4 h-4" /> Save Changes
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === 'api' && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass rounded-2xl border border-white/5 p-6">
                <h2 className="font-semibold mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>API Keys</h2>
                <div className="space-y-4">
                  {[
                    { label: 'OpenAI API Key', placeholder: 'sk-...' },
                    { label: 'Anthropic API Key', placeholder: 'sk-ant-...' },
                    { label: 'Serper API Key (Web Search)', placeholder: 'Your key' },
                    { label: 'Firecrawl API Key (Scraping)', placeholder: 'Your key' },
                  ].map((k) => (
                    <div key={k.label}>
                      <label className="text-xs text-white/50 mb-1.5 block">{k.label}</label>
                      <input
                        type="password"
                        placeholder={k.placeholder}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500/50 transition-colors font-mono placeholder-white/10"
                      />
                    </div>
                  ))}
                  <button className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 rounded-xl text-sm font-medium transition-colors glow-purple-sm">
                    <Save className="w-4 h-4" /> Save API Keys
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === 'notifications' && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass rounded-2xl border border-white/5 p-6">
                <h2 className="font-semibold mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>Notifications</h2>
                <div className="space-y-4">
                  {[
                    'Research completed',
                    'Report generated',
                    'Team member joined',
                    'Agent errors',
                    'Weekly summary',
                  ].map((item) => (
                    <div key={item} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                      <span className="text-sm text-white/60">{item}</span>
                      <div className="w-10 h-5 bg-purple-600 rounded-full relative cursor-pointer">
                        <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full" />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'security' && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass rounded-2xl border border-white/5 p-6">
                <h2 className="font-semibold mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>Security</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-white/50 mb-1.5 block">Current Password</label>
                    <input type="password" placeholder="••••••••" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500/50" />
                  </div>
                  <div>
                    <label className="text-xs text-white/50 mb-1.5 block">New Password</label>
                    <input type="password" placeholder="••••••••" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500/50" />
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 rounded-xl text-sm font-medium transition-colors glow-purple-sm">
                    <Shield className="w-4 h-4" /> Update Password
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
