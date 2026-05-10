'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, UserPlus, Mail, Shield, Crown, Eye, Trash2, Send } from 'lucide-react'
import { toast } from 'sonner'

const members = [
  { id: '1', name: 'Alex Johnson', email: 'alex@example.com', role: 'admin', joined: 'Jan 15, 2024', avatar: 'A' },
  { id: '2', name: 'Sarah Chen', email: 'sarah@example.com', role: 'member', joined: 'Feb 20, 2024', avatar: 'S' },
  { id: '3', name: 'Mike Torres', email: 'mike@example.com', role: 'viewer', joined: 'Mar 10, 2024', avatar: 'M' },
]

const roleIcon: Record<string, React.ReactNode> = {
  admin: <Crown className="w-3.5 h-3.5 text-yellow-400" />,
  member: <Shield className="w-3.5 h-3.5 text-blue-400" />,
  viewer: <Eye className="w-3.5 h-3.5 text-white/40" />,
}

const roleColor: Record<string, string> = {
  admin: 'text-yellow-400 bg-yellow-400/10',
  member: 'text-blue-400 bg-blue-400/10',
  viewer: 'text-white/40 bg-white/5',
}

export default function TeamPage() {
  const [inviteEmail, setInviteEmail] = useState('')
  const [showInvite, setShowInvite] = useState(false)

  const handleInvite = () => {
    if (!inviteEmail) return
    toast.success(`Invitation sent to ${inviteEmail}`)
    setInviteEmail('')
    setShowInvite(false)
  }

  return (
    <div className="h-full overflow-y-auto custom-scrollbar p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>Team</h1>
            <p className="text-white/40 text-sm mt-1">{members.length} members in your workspace</p>
          </div>
          <button
            onClick={() => setShowInvite(!showInvite)}
            className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 rounded-xl text-sm font-medium transition-colors glow-purple-sm"
          >
            <UserPlus className="w-4 h-4" /> Invite Member
          </button>
        </motion.div>

        {/* Invite form */}
        {showInvite && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-5 glass rounded-2xl border border-purple-500/20">
            <h3 className="font-semibold mb-4 text-sm" style={{ fontFamily: 'Syne, sans-serif' }}>Invite by Email</h3>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="colleague@company.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-purple-500/40 placeholder-white/20"
                />
              </div>
              <select className="px-3 py-2.5 glass border border-white/10 rounded-xl text-sm focus:outline-none">
                <option value="member">Member</option>
                <option value="viewer">Viewer</option>
                <option value="admin">Admin</option>
              </select>
              <button
                onClick={handleInvite}
                className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 rounded-xl text-sm transition-colors"
              >
                <Send className="w-4 h-4" /> Send
              </button>
            </div>
          </motion.div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Members', value: '3', icon: Users },
            { label: 'Admins', value: '1', icon: Crown },
            { label: 'Active Today', value: '2', icon: Shield },
          ].map((stat) => (
            <div key={stat.label} className="p-4 glass rounded-2xl border border-white/5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-600/20 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <div className="text-xl font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>{stat.value}</div>
                <div className="text-xs text-white/30">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Members List */}
        <div className="glass rounded-2xl border border-white/5 overflow-hidden">
          <div className="px-5 py-3 border-b border-white/5">
            <h2 className="font-semibold text-sm" style={{ fontFamily: 'Syne, sans-serif' }}>Members</h2>
          </div>
          <div className="divide-y divide-white/5">
            {members.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                className="flex items-center gap-4 px-5 py-4 hover:bg-white/2 transition-colors group"
              >
                <div className="w-9 h-9 rounded-full bg-purple-600/40 flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {member.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{member.name}</div>
                  <div className="text-xs text-white/30">{member.email}</div>
                </div>
                <div className={`flex items-center gap-1.5 text-xs px-2 py-1 rounded-full ${roleColor[member.role]}`}>
                  {roleIcon[member.role]}
                  <span className="capitalize">{member.role}</span>
                </div>
                <div className="text-xs text-white/20 hidden md:block">{member.joined}</div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 glass rounded-lg text-white/30 hover:text-red-400 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
