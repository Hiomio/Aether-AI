'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Brain, Search, FileText, Users, Zap, Shield, Globe } from 'lucide-react'

const features = [
  { icon: Brain, title: 'Multi-Agent Orchestration', desc: 'Autonomous AI agents working in concert to research, analyze, and synthesize information at scale.' },
  { icon: Search, title: 'Deep Web Research', desc: 'Real-time search across the web with semantic understanding and intelligent source filtering.' },
  { icon: FileText, title: 'Smart Report Generation', desc: 'Auto-generate comprehensive research reports with citations, summaries, and insights.' },
  { icon: Users, title: 'Team Collaboration', desc: 'Collaborate in real-time with your team. Share workspaces, insights, and research threads.' },
  { icon: Zap, title: 'Streaming Responses', desc: 'Real-time AI responses with WebSocket streaming for an instant, fluid research experience.' },
  { icon: Shield, title: 'Enterprise Security', desc: 'JWT authentication, role-based access control, and end-to-end encrypted workspaces.' },
]

const agents = ['Planner Agent', 'Search Agent', 'Scraper Agent', 'Summary Agent', 'Citation Agent', 'Report Agent']

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#081416] text-white overflow-hidden">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 glass border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#1D9E75] flex items-center justify-center">
            <Brain className="w-4 h-4" />
          </div>
          <span className="font-bold text-lg" style={{ fontFamily: 'Syne, sans-serif' }}>Aether AI</span>
          <span className="text-xs text-[#5DCAA5] bg-[#5DCAA5]/10 px-2 py-0.5 rounded-full">Multi-Agent</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="#features" className="text-sm text-white/60 hover:text-white transition-colors">Features</Link>
          <Link href="#agents" className="text-sm text-white/60 hover:text-white transition-colors">Agents</Link>
          <Link href="/auth/login" className="text-sm text-white/60 hover:text-white transition-colors">Sign in</Link>
          <Link
            href="/auth/signup"
            className="px-4 py-2 bg-[#1D9E75] hover:bg-[#0F6E56] rounded-lg text-sm font-medium transition-colors"
            style={{ boxShadow: '0 0 12px rgba(29,158,117,0.3)' }}
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-24 px-8 text-center">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#1D9E75]/10 rounded-full blur-[120px]" />
          <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-[#0F6E56]/6 rounded-full blur-[100px]" />
        </div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div
            className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-sm text-[#5DCAA5] mb-8"
            style={{ border: '1px solid rgba(93,202,165,0.2)' }}
          >
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Live Multi-Agent AI Research Platform
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight" style={{ fontFamily: 'Syne, sans-serif' }}>
            Research at the
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #5DCAA5 0%, #1D9E75 50%, #9FE1CB 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Speed of Thought
            </span>
          </h1>
          <p className="text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
            Orchestrate powerful AI agents to research, analyze, and synthesize complex topics.
            From query to comprehensive report in seconds.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/auth/signup"
              className="flex items-center gap-2 px-6 py-3 bg-[#1D9E75] hover:bg-[#0F6E56] rounded-xl font-medium transition-all"
              style={{ boxShadow: '0 0 20px rgba(29,158,117,0.35)' }}
            >
              Start Researching <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/auth/login" className="px-6 py-3 glass rounded-xl font-medium text-white/70 hover:text-white transition-colors">
              Sign In
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Agent Flow Preview */}
      <section id="agents" className="py-16 px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ fontFamily: 'Syne, sans-serif' }}>
            6-Agent Research Pipeline
          </h2>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {agents.map((agent, i) => (
              <motion.div
                key={agent}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3"
              >
                <div
                  className="px-5 py-3 glass rounded-xl text-sm font-medium text-[#5DCAA5]"
                  style={{ border: '1px solid rgba(93,202,165,0.2)', boxShadow: '0 0 8px rgba(29,158,117,0.15)' }}
                >
                  {agent}
                </div>
                {i < agents.length - 1 && (
                  <ArrowRight className="w-4 h-4 flex-shrink-0" style={{ color: 'rgba(93,202,165,0.4)' }} />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
            Everything you need to research at scale
          </h2>
          <p className="text-white/40 text-center mb-16">Enterprise-grade AI research infrastructure</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 glass rounded-2xl border border-white/5 group transition-all"
                style={{ ['--hover-border' as string]: 'rgba(93,202,165,0.2)' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(93,202,165,0.2)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-colors"
                  style={{ background: 'rgba(29,158,117,0.2)' }}
                >
                  <f.icon className="w-5 h-5" style={{ color: '#5DCAA5' }} />
                </div>
                <h3 className="font-semibold mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>{f.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-8 text-center">
        <div className="max-w-2xl mx-auto">
          <div
            className="p-10 glass rounded-3xl relative overflow-hidden"
            style={{
              border: '1px solid rgba(93,202,165,0.2)',
              boxShadow: '0 0 40px rgba(29,158,117,0.15)',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#1D9E75]/10 to-transparent" />
            <div className="relative">
              <Globe className="w-12 h-12 mx-auto mb-6" style={{ color: '#5DCAA5' }} />
              <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
                Ready to supercharge your research?
              </h2>
              <p className="text-white/50 mb-8">Join thousands of researchers using AI agents to work smarter.</p>
              <Link
                href="/auth/signup"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#1D9E75] hover:bg-[#0F6E56] rounded-xl font-semibold transition-all text-lg"
                style={{ boxShadow: '0 0 24px rgba(29,158,117,0.4)' }}
              >
                Get Started Free <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-8 text-center">
        <div className="flex flex-col items-center gap-3">
          <p className="text-white/30 text-sm">
            © 2026 AI Research. Multi-Agent System. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-white/40">
            <span className="text-[#5DCAA5] text-lg animate-pulse">✦</span>
            <span>
              Made with <span className="text-[#5DCAA5]">♥</span> by{' '}
              <span
                className="font-semibold"
                style={{
                  background: 'linear-gradient(135deg, #5DCAA5, #1D9E75)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Kaluri Himabindhu
              </span>
            </span>
            <span className="text-[#1D9E75] text-lg animate-pulse">✧</span>
          </div>
        </div>
      </footer>
    </div>
  )
}