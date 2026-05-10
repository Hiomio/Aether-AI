'use client'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Globe, User, CheckCircle } from 'lucide-react'
import { Message } from '@/types'
import { cn } from '@/lib/utils'

interface Props {
  message: Message
}

export function ChatMessage({ message }: Props) {
  const isUser = message.role === 'user'

  if (isUser) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-end"
      >
        <div className="max-w-[80%] px-4 py-3 bg-green-600 rounded-2xl rounded-tr-sm text-sm">
          {message.content}
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-3"
    >
      <div className="w-8 h-8 rounded-full bg-green-600/30 border border-green-500/30 flex items-center justify-center flex-shrink-0 mt-1">
        <Globe className="w-4 h-4 text-green-400" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="glass rounded-2xl rounded-tl-sm border border-white/5 p-4">
          {message.metadata?.plan && (
            <div className="mb-3">
              <div className="text-xs font-semibold text-white/60 mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
                Research Plan
              </div>
              <ol className="space-y-1">
                {message.metadata.plan.map((step: string, i: number) => (
                  <li key={i} className="text-xs text-white/50 flex items-start gap-2">
                    <span className="text-green-400 flex-shrink-0">{i + 1}.</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          )}
          <div className="prose prose-invert prose-sm max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => <h1 className="text-lg font-bold mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>{children}</h1>,
                h2: ({ children }) => <h2 className="text-base font-semibold mb-2 mt-4" style={{ fontFamily: 'Syne, sans-serif' }}>{children}</h2>,
                h3: ({ children }) => <h3 className="text-sm font-semibold mb-1 mt-3">{children}</h3>,
                p: ({ children }) => <p className="text-sm text-white/80 leading-relaxed mb-2">{children}</p>,
                ul: ({ children }) => <ul className="space-y-1 my-2">{children}</ul>,
                li: ({ children }) => (
                  <li className="text-sm text-white/70 flex items-start gap-1.5">
                    <span className="text-green-400 mt-1 flex-shrink-0">•</span>
                    <span>{children}</span>
                  </li>
                ),
                a: ({ href, children }) => (
                  <a href={href} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 underline underline-offset-2 text-xs">
                    {children}
                  </a>
                ),
                code: ({ children, className }) => {
                  const isBlock = className?.includes('language-')
                  if (isBlock) {
                    return (
                      <pre className="bg-black/30 rounded-xl p-4 overflow-x-auto my-3 border border-white/5">
                        <code className="text-xs font-mono text-green-300">{children}</code>
                      </pre>
                    )
                  }
                  return <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs font-mono text-green-300">{children}</code>
                },
                strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
          {message.metadata?.planning_completed && (
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/5">
              <CheckCircle className="w-3.5 h-3.5 text-green-400" />
              <span className="text-xs text-green-400">Planning completed</span>
            </div>
          )}
        </div>
        {message.sources && message.sources.length > 0 && (
          <div className="mt-2 flex items-center gap-2">
            <button className="text-xs text-white/30 hover:text-white/60 transition-colors flex items-center gap-1">
              <Globe className="w-3 h-3" /> Sources ({message.sources.length}) ↓
            </button>
          </div>
        )}
      </div>
    </motion.div>
  )
}
