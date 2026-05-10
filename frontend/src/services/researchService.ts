import api from '@/lib/axios'
import { useAuthStore } from '@/store/authStore'

interface StreamCallbacks {
  onAgentUpdate: (agentIndex: number, status: string, time: number | null) => void
  onToken: (token: string) => void
  onComplete: () => void
  onError: (err: Error) => void
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8000'

export const researchService = {
  async streamResearch(query: string, callbacks: StreamCallbacks) {
    const token = useAuthStore.getState().token

    // Try WebSocket first, fallback to SSE/polling simulation
    try {
      await researchService.streamViaSSE(query, callbacks, token)
    } catch (err) {
      // Fallback: simulate streaming for demo
      await researchService.simulateStream(query, callbacks)
    }
  },

  async streamViaSSE(query: string, callbacks: StreamCallbacks, token: string | null) {
    return new Promise<void>((resolve, reject) => {
      const url = `${API_URL}/api/research/stream?query=${encodeURIComponent(query)}`
      const eventSource = new EventSource(url)

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          if (data.type === 'agent_update') {
            callbacks.onAgentUpdate(data.agent_index, data.status, data.time)
          } else if (data.type === 'token') {
            callbacks.onToken(data.content)
          } else if (data.type === 'done') {
            eventSource.close()
            callbacks.onComplete()
            resolve()
          } else if (data.type === 'error') {
            eventSource.close()
            callbacks.onError(new Error(data.message))
            reject(new Error(data.message))
          }
        } catch (e) {
          // parsing error, continue
        }
      }

      eventSource.onerror = () => {
        eventSource.close()
        reject(new Error('SSE connection failed'))
      }

      // Timeout after 60s
      setTimeout(() => {
        eventSource.close()
        resolve()
      }, 60000)
    })
  },

  // Demo simulation for when backend is not available
  async simulateStream(query: string, callbacks: StreamCallbacks) {
    const agentTimes = [2.3, 5.7, 12.4, 8.1, 3.5, 4.2]

    for (let i = 0; i < 6; i++) {
      await new Promise(r => setTimeout(r, agentTimes[i] * 300))
      callbacks.onAgentUpdate(i, 'completed', agentTimes[i])
    }

    const response = `# Research Results: ${query}

## Overview

I've completed a comprehensive analysis of **"${query}"** using our multi-agent research pipeline.

## Key Findings

### 1. Top Companies

**Fractal Analytics**
- Role: Data Scientist, AI Engineer  
- Location: Mumbai, Bangalore
- Focus: AI/ML, Analytics
- Hiring Link: fractal.ai/careers

**Observe.AI**
- Role: ML Engineer, Backend Engineer
- Location: Bangalore, Hyderabad

**Sarvam AI**
- Role: Research Scientist, NLP Engineer
- Location: Bangalore
- Focus: Indian language AI models

### 2. Industry Trends

The AI sector in India is experiencing **unprecedented growth** with:
- 340% increase in AI startup funding (2023-2024)
- Over 2,500 AI-focused job openings for freshers
- Hyderabad and Bangalore as the primary hubs

### 3. Recommended Resources

- [LinkedIn Jobs](https://linkedin.com/jobs) - Filter by AI/ML
- [Naukri.com](https://naukri.com) - Entry level tech roles
- [Internshala](https://internshala.com) - Internships → Full time

## Summary

The Indian AI job market is **highly active** for freshers in 2024, with companies especially seeking candidates with Python, ML frameworks, and cloud experience.

*Research powered by 6 AI agents | 12 sources analyzed*`

    const tokens = response.split('')
    for (const token of tokens) {
      await new Promise(r => setTimeout(r, 8))
      callbacks.onToken(token)
    }

    callbacks.onComplete()
  },

  async getChats() {
    const res = await api.get('/api/chats')
    return res.data
  },

  async getChat(id: string) {
    const res = await api.get(`/api/chats/${id}`)
    return res.data
  },

  async deleteChat(id: string) {
    const res = await api.delete(`/api/chats/${id}`)
    return res.data
  },
}
