import { create } from 'zustand'
import { Message, Agent } from '@/types'

interface ResearchState {
  messages: Message[]
  agents: Agent[]
  progress: number
  currentTitle: string
  isStreaming: boolean
  currentChatId: string | null

  addMessage: (msg: Message) => void
  updateMessage: (id: string, token: string) => void
  setAgents: (agents: Agent[] | ((prev: Agent[]) => Agent[])) => void
  setProgress: (p: number) => void
  setCurrentTitle: (t: string) => void
  setStreaming: (s: boolean) => void
  resetChat: () => void
  setCurrentChatId: (id: string | null) => void
}

export const useResearchStore = create<ResearchState>((set) => ({
  messages: [],
  agents: [],
  progress: 0,
  currentTitle: 'New Research',
  isStreaming: false,
  currentChatId: null,

  addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),

  updateMessage: (id, token) => set((state) => ({
    messages: state.messages.map((m) =>
      m.id === id ? { ...m, content: m.content + token } : m
    ),
  })),

  setAgents: (agents) => set((state) => ({
    agents: typeof agents === 'function' ? agents(state.agents) : agents,
  })),

  setProgress: (progress) => set({ progress }),
  setCurrentTitle: (currentTitle) => set({ currentTitle }),
  setStreaming: (isStreaming) => set({ isStreaming }),
  setCurrentChatId: (currentChatId) => set({ currentChatId }),

  resetChat: () => set({
    messages: [],
    agents: [],
    progress: 0,
    currentTitle: 'New Research',
    isStreaming: false,
    currentChatId: null,
  }),
}))
