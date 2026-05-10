'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Paperclip, Globe, Settings2, ChevronDown, Mic } from 'lucide-react'
import { ChatMessage } from '@/components/chat/ChatMessage'
import { AgentWorkflowPanel } from '@/components/workflow/AgentWorkflowPanel'
import { useResearchStore } from '@/store/researchStore'
import { researchService } from '@/services/researchService'
import { toast } from 'sonner'
import { Message } from '@/types'

export default function ResearchPage() {
  const [input, setInput] = useState('')
  const [activeTab, setActiveTab] = useState<'workflow' | 'sources' | 'logs'>('workflow')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const {
    messages, agents, progress, currentTitle,
    addMessage, updateMessage, setAgents, setProgress,
    setCurrentTitle, isStreaming, setStreaming
  } = useResearchStore()

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSubmit = useCallback(async () => {
    if (!input.trim() || isStreaming) return
    const query = input.trim()
    setInput('')
    setStreaming(true)
    setCurrentTitle(query)
    setProgress(0)

    // Add user message
    addMessage({ role: 'user', content: query, id: Date.now().toString() })

    // Reset agents
    setAgents([
      { name: 'Planner Agent', status: 'running', time: null },
      { name: 'Search Agent', status: 'pending', time: null },
      { name: 'Scraper Agent', status: 'pending', time: null },
      { name: 'Summary Agent', status: 'pending', time: null },
      { name: 'Citation Agent', status: 'pending', time: null },
      { name: 'Report Agent', status: 'pending', time: null },
    ])

    const assistantId = (Date.now() + 1).toString()
    addMessage({ role: 'assistant', content: '', id: assistantId })

    try {
      await researchService.streamResearch(query, {
        onAgentUpdate: (agentIndex, status, time) => {
          setAgents((prev: any) => {
            const updated = [...prev]
            if (updated[agentIndex]) {
              updated[agentIndex] = { ...updated[agentIndex], status, time }
            }
            if (agentIndex + 1 < updated.length && status === 'completed') {
              updated[agentIndex + 1] = { ...updated[agentIndex + 1], status: 'running' }
            }
            return updated
          })
          setProgress(Math.round(((agentIndex + 1) / 6) * 100))
        },
        onToken: (token) => {
          updateMessage(assistantId, token)
        },
        onComplete: () => {
          setStreaming(false)
          setProgress(100)
        },
        onError: (err) => {
          toast.error('Research failed. Please try again.')
          setStreaming(false)
        }
      })
    } catch (err) {
      toast.error('Connection error')
      setStreaming(false)
    }
  }, [input, isStreaming, addMessage, updateMessage, setAgents, setProgress, setCurrentTitle, setStreaming])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const hasMessages = messages.length > 0

  return (
    <div className="h-full flex">
      {/* Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        {hasMessages && (
          <div className="flex items-center justify-between px-6 py-3 border-b border-white/5 glass">
            <div>
              <h2 className="font-semibold text-sm truncate" style={{ fontFamily: 'Syne, sans-serif' }}>{currentTitle}</h2>
              <p className="text-xs text-white/30">Research created just now</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 glass rounded-lg text-xs text-white/50 hover:text-white transition-colors flex items-center gap-1.5">
                <Globe className="w-3 h-3" /> Share
              </button>
              <button className="px-3 py-1.5 glass rounded-lg text-xs text-white/50 hover:text-white transition-colors flex items-center gap-1.5">
                Export
              </button>
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-4 py-6">
          {!hasMessages ? (
            <div className="h-full flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-2xl bg-purple-600/20 flex items-center justify-center mb-6">
                <Globe className="w-8 h-8 text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
                What would you like to research?
              </h2>
              <p className="text-white/40 text-sm mb-8 text-center max-w-md">
                Ask anything — AI agents will search the web, analyze sources, and generate a comprehensive report.
              </p>
              <div className="grid grid-cols-2 gap-3 w-full max-w-lg">
                {[
                  'AI startups in India hiring in 2024',
                  'Latest breakthroughs in quantum computing',
                  'Market trends in renewable energy 2024',
                  'Top LLM frameworks compared'
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setInput(suggestion)}
                    className="p-3 glass rounded-xl text-xs text-white/50 hover:text-white hover:border-purple-500/20 border border-transparent text-left transition-all"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto space-y-4">
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}
              {isStreaming && messages[messages.length - 1]?.role === 'assistant' && !messages[messages.length - 1]?.content && (
                <div className="flex gap-3 p-4 glass rounded-2xl border border-white/5">
                  <div className="w-8 h-8 rounded-full bg-purple-600/30 flex items-center justify-center flex-shrink-0">
                    <Globe className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="flex items-center gap-1 pt-1">
                    <div className="typing-dot" /><div className="typing-dot" /><div className="typing-dot" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/5">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-end gap-2 glass rounded-2xl border border-white/10 focus-within:border-purple-500/30 transition-colors p-3">
              <button className="flex-shrink-0 p-1.5 text-white/30 hover:text-white/60 transition-colors">
                <Paperclip className="w-4 h-4" />
              </button>
              <button className="flex-shrink-0 p-1.5 text-white/30 hover:text-white/60 transition-colors">
                <Globe className="w-4 h-4" />
              </button>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything..."
                rows={1}
                className="flex-1 bg-transparent text-sm resize-none focus:outline-none placeholder-white/20 max-h-32"
                style={{ minHeight: '24px' }}
              />
              <div className="flex items-center gap-2 flex-shrink-0">
                <button className="p-1.5 text-white/30 hover:text-white/60 transition-colors text-xs flex items-center gap-1">
                  <Settings2 className="w-3.5 h-3.5" /> GPT-4o <ChevronDown className="w-3 h-3" />
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!input.trim() || isStreaming}
                  className="p-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl transition-colors glow-purple-sm"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Workflow Panel */}
      <AgentWorkflowPanel activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  )
}
