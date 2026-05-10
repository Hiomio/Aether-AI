'use client'
import { motion } from 'framer-motion'
import { Cpu, CheckCircle, Clock, Loader2, AlertCircle, Play, Settings } from 'lucide-react'

const agentData = [
  {
    name: 'Planner Agent',
    description: 'Decomposes queries into structured research plans with step-by-step strategies.',
    status: 'active',
    runs: 147,
    avgTime: '2.3s',
    successRate: 98.2,
    color: 'bg-purple-600/20 border-purple-500/30',
    iconColor: 'text-purple-400',
  },
  {
    name: 'Search Agent',
    description: 'Executes multi-engine web searches with semantic query optimization.',
    status: 'active',
    runs: 143,
    avgTime: '5.7s',
    successRate: 97.1,
    color: 'bg-blue-600/20 border-blue-500/30',
    iconColor: 'text-blue-400',
  },
  {
    name: 'Scraper Agent',
    description: 'Extracts and cleans content from web sources with intelligent parsing.',
    status: 'active',
    runs: 138,
    avgTime: '12.4s',
    successRate: 94.5,
    color: 'bg-green-600/20 border-green-500/30',
    iconColor: 'text-green-400',
  },
  {
    name: 'Summary Agent',
    description: 'Synthesizes and summarizes large volumes of content into key insights.',
    status: 'active',
    runs: 135,
    avgTime: '8.1s',
    successRate: 99.1,
    color: 'bg-yellow-600/20 border-yellow-500/30',
    iconColor: 'text-yellow-400',
  },
  {
    name: 'Citation Agent',
    description: 'Validates sources, extracts citations, and formats references accurately.',
    status: 'idle',
    runs: 132,
    avgTime: '3.5s',
    successRate: 99.8,
    color: 'bg-orange-600/20 border-orange-500/30',
    iconColor: 'text-orange-400',
  },
  {
    name: 'Report Agent',
    description: 'Generates comprehensive markdown reports with structured sections and insights.',
    status: 'idle',
    runs: 128,
    avgTime: '4.2s',
    successRate: 99.5,
    color: 'bg-pink-600/20 border-pink-500/30',
    iconColor: 'text-pink-400',
  },
]

export default function AgentsPage() {
  return (
    <div className="h-full overflow-y-auto custom-scrollbar p-8">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-2xl font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>AI Agents</h1>
          <p className="text-white/40 text-sm mt-1">6 specialized agents orchestrated in sequence for deep research</p>
        </motion.div>

        {/* Active Agents Summary */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Active Agents', value: '4', color: 'text-green-400' },
            { label: 'Total Runs Today', value: '147', color: 'text-purple-400' },
            { label: 'Avg Success Rate', value: '98%', color: 'text-blue-400' },
            { label: 'Avg Pipeline Time', value: '36s', color: 'text-yellow-400' },
          ].map((stat) => (
            <div key={stat.label} className="p-4 glass rounded-2xl border border-white/5 text-center">
              <div className={`text-2xl font-bold ${stat.color}`} style={{ fontFamily: 'Syne, sans-serif' }}>{stat.value}</div>
              <div className="text-xs text-white/30 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {agentData.map((agent, i) => (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className={`p-5 glass rounded-2xl border ${agent.color} hover:border-opacity-60 transition-all group`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${agent.color} flex items-center justify-center`}>
                    <Cpu className={`w-5 h-5 ${agent.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm" style={{ fontFamily: 'Syne, sans-serif' }}>{agent.name}</h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${agent.status === 'active' ? 'bg-green-400 animate-pulse' : 'bg-white/20'}`} />
                      <span className={`text-xs ${agent.status === 'active' ? 'text-green-400' : 'text-white/30'}`}>
                        {agent.status === 'active' ? 'Active' : 'Idle'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 glass rounded-lg text-white/40 hover:text-white transition-colors">
                    <Settings className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1.5 bg-purple-600/30 rounded-lg text-purple-400 hover:bg-purple-600/50 transition-colors">
                    <Play className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-white/40 mb-4 leading-relaxed">{agent.description}</p>

              <div className="grid grid-cols-3 gap-3">
                <div className="text-center">
                  <div className="text-sm font-semibold">{agent.runs}</div>
                  <div className="text-[10px] text-white/30">Runs</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold">{agent.avgTime}</div>
                  <div className="text-[10px] text-white/30">Avg Time</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-green-400">{agent.successRate}%</div>
                  <div className="text-[10px] text-white/30">Success</div>
                </div>
              </div>

              {/* Success rate bar */}
              <div className="mt-3 w-full bg-white/5 rounded-full h-1">
                <div
                  className="h-1 bg-gradient-to-r from-purple-500 to-green-400 rounded-full"
                  style={{ width: `${agent.successRate}%` }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
