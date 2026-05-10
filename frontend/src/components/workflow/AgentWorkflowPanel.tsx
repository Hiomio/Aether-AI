'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Clock, Loader2, Circle, AlertCircle } from 'lucide-react'
import { useResearchStore } from '@/store/researchStore'
import { cn } from '@/lib/utils'

interface Props {
  activeTab: 'workflow' | 'sources' | 'logs'
  setActiveTab: (tab: 'workflow' | 'sources' | 'logs') => void
}

const mockSources = [
  { domain: 'inc42.com', type: 'News', title: 'Top AI Startups in India 2024' },
  { domain: 'yourstory.com', type: 'Blog', title: 'AI Startups Hiring Freshers' },
  { domain: 'linkedin.com', type: 'Web', title: 'AI Companies in India' },
  { domain: 'crunchbase.com', type: 'Web', title: 'Top AI Startups' },
]

const AgentIcon = ({ status }: { status: string }) => {
  if (status === 'completed') return <CheckCircle className="w-4 h-4 text-green-400" />
  if (status === 'running') return <Loader2 className="w-4 h-4 text-orange-400 animate-spin" />
  if (status === 'error') return <AlertCircle className="w-4 h-4 text-red-400" />
  return <Circle className="w-4 h-4 text-white/20" />
}

export function AgentWorkflowPanel({ activeTab, setActiveTab }: Props) {
  const { agents, progress, isStreaming } = useResearchStore()

  const hasAgentActivity = agents.some(a => a.status !== 'pending')

  return (
    <div className="w-[240px] flex-shrink-0 border-l border-white/5 glass flex flex-col">
      {/* Tabs */}
      <div className="flex border-b border-white/5">
        {(['workflow', 'sources', 'logs'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              'flex-1 py-3 text-xs capitalize transition-colors',
              activeTab === tab
                ? 'text-purple-300 border-b border-purple-500'
                : 'text-white/30 hover:text-white/60'
            )}
          >
            {tab === 'sources' ? 'Sources (12)' : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
        {activeTab === 'workflow' && (
          <div>
            {/* Agent Execution Header */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-white/50 font-medium">Agent Execution</span>
              {isStreaming && (
                <div className="flex items-center gap-1.5 px-2 py-1 bg-green-400/10 rounded-full">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-[10px] text-green-400">Live</span>
                </div>
              )}
            </div>

            {/* Agents */}
            {!hasAgentActivity ? (
              <div className="text-center py-8 text-white/20 text-xs">
                Start a research to see agent activity
              </div>
            ) : (
              <div className="space-y-1">
                {agents.map((agent, i) => (
                  <div key={agent.name}>
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className={cn(
                        'flex items-center gap-3 p-3 rounded-xl border transition-all',
                        agent.status === 'running'
                          ? 'bg-purple-600/10 border-purple-500/30 animate-pulse-glow'
                          : agent.status === 'completed'
                          ? 'bg-green-400/5 border-green-400/10'
                          : 'glass border-white/5'
                      )}
                    >
                      <div className={cn(
                        'w-7 h-7 rounded-lg flex items-center justify-center',
                        agent.status === 'running' ? 'bg-purple-600/30' : 'bg-white/5'
                      )}>
                        <AgentIcon status={agent.status} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium truncate">{agent.name}</div>
                        <div className={cn(
                          'text-[10px]',
                          agent.status === 'completed' ? 'text-green-400' :
                          agent.status === 'running' ? 'text-orange-400' :
                          'text-white/30'
                        )}>
                          {agent.status === 'completed' ? 'Completed' :
                           agent.status === 'running' ? 'Running' : 'Pending'}
                        </div>
                      </div>
                      {agent.time && (
                        <span className="text-[10px] text-white/30 flex-shrink-0">{agent.time}s</span>
                      )}
                    </motion.div>
                    {i < agents.length - 1 && (
                      <div className="connector-line my-1" />
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Progress */}
            {hasAgentActivity && (
              <div className="mt-6 p-3 glass rounded-xl border border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-white/40">Progress</span>
                  <span className="text-xs text-white/60">{progress}%</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-1.5">
                  <motion.div
                    className="h-1.5 bg-purple-500 rounded-full glow-purple-sm"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                {isStreaming && (
                  <p className="text-[10px] text-white/30 mt-2">Estimated time: 18s</p>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'sources' && (
          <div className="space-y-2">
            <p className="text-xs text-white/30 mb-3">12 sources found</p>
            {mockSources.map((source, i) => (
              <div key={i} className="p-3 glass rounded-xl border border-white/5 hover:border-purple-500/20 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-white/80 truncate">{source.domain}</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-white/5 rounded text-white/40 flex-shrink-0 ml-1">{source.type}</span>
                </div>
                <p className="text-[10px] text-white/30 truncate">{source.title}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'logs' && (
          <div className="space-y-2">
            <div className="text-[10px] font-mono text-white/30 space-y-1">
              {[
                '[00:00] Research initiated',
                '[00:01] Planner Agent: Analyzing query...',
                '[00:02] Planning strategy: 4 steps',
                '[00:03] Search Agent: Querying web...',
                '[00:05] Found 47 results',
                '[00:06] Scraper Agent: Extracting content...',
                '[00:08] Processed 12 sources',
                '[00:09] Summary Agent: Synthesizing...',
              ].map((log, i) => (
                <div key={i} className="text-white/40">{log}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
