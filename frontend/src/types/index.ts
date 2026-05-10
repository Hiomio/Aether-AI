export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  created_at?: string
  sources?: Source[]
  metadata?: Record<string, any>
}

export interface Agent {
  name: string
  status: 'pending' | 'running' | 'completed' | 'error'
  time: number | null
  logs?: string[]
}

export interface Source {
  id: string
  title: string
  url: string
  domain: string
  type: string
  snippet?: string
}

export interface Report {
  id: string
  title: string
  content: string
  created_at: string
  sources_count: number
  status: 'generating' | 'completed' | 'failed'
}

export interface Document {
  id: string
  name: string
  size: number
  type: string
  uploaded_at: string
  status: 'processing' | 'ready' | 'error'
}

export interface Workspace {
  id: string
  name: string
  description?: string
  created_at: string
  members_count: number
}

export interface TeamMember {
  id: string
  name: string
  email: string
  role: 'admin' | 'member' | 'viewer'
  joined_at: string
  avatar?: string
}

export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}
