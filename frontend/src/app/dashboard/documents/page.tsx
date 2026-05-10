'use client'
import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import { FolderOpen, Upload, Search, File, Trash2, Download, Plus } from 'lucide-react'
import { formatBytes, formatDate } from '@/lib/utils'
import { toast } from 'sonner'

const docs = [
  { id: '1', name: 'AI Startups List.pdf', size: 2516582, type: 'PDF', uploaded_at: '2024-05-20', status: 'ready' },
  { id: '2', name: 'Hiring Trends 2024.docx', size: 1887436, type: 'DOCX', uploaded_at: '2024-05-19', status: 'ready' },
  { id: '3', name: 'Market Research.txt', size: 629145, type: 'TXT', uploaded_at: '2024-05-18', status: 'ready' },
  { id: '4', name: 'AI Companies Data.pdf', size: 3250586, type: 'PDF', uploaded_at: '2024-05-17', status: 'processing' },
]

const typeColor: Record<string, string> = {
  PDF: 'bg-red-500/10 text-red-400',
  DOCX: 'bg-blue-500/10 text-blue-400',
  TXT: 'bg-green-500/10 text-green-400',
  CSV: 'bg-yellow-500/10 text-yellow-400',
}

export default function DocumentsPage() {
  const [search, setSearch] = useState('')
  const [uploads, setUploads] = useState(docs)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const newDoc = {
        id: Date.now().toString(),
        name: file.name,
        size: file.size,
        type: file.name.split('.').pop()?.toUpperCase() || 'FILE',
        uploaded_at: new Date().toISOString(),
        status: 'processing',
      }
      setUploads(prev => [newDoc, ...prev])
      toast.success(`${file.name} uploaded successfully`)
      setTimeout(() => {
        setUploads(prev => prev.map(d => d.id === newDoc.id ? { ...d, status: 'ready' } : d))
      }, 2000)
    })
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt'],
      'text/csv': ['.csv'],
    },
  })

  const filtered = uploads.filter(d => d.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="h-full overflow-y-auto custom-scrollbar p-8">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>Documents</h1>
            <p className="text-white/40 text-sm mt-1">{uploads.length} documents in your workspace</p>
          </div>
        </motion.div>

        {/* Dropzone */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-6">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
              isDragActive
                ? 'border-purple-500 bg-purple-600/10'
                : 'border-white/10 hover:border-purple-500/40 hover:bg-white/2'
            }`}
          >
            <input {...getInputProps()} />
            <Upload className={`w-8 h-8 mx-auto mb-3 ${isDragActive ? 'text-purple-400' : 'text-white/20'}`} />
            <p className="text-sm font-medium text-white/60">
              {isDragActive ? 'Drop files here...' : 'Drop files here or click to upload'}
            </p>
            <p className="text-xs text-white/30 mt-1">Supports PDF, DOCX, TXT, CSV</p>
          </div>
        </motion.div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search documents..."
            className="w-full pl-10 pr-4 py-2.5 glass border border-white/10 rounded-xl text-sm focus:outline-none focus:border-purple-500/40 placeholder-white/20"
          />
        </div>

        {/* Documents List */}
        <div className="space-y-2">
          {filtered.map((doc, i) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-4 p-4 glass rounded-2xl border border-white/5 hover:border-purple-500/20 transition-all group"
            >
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold ${typeColor[doc.type] || 'bg-white/5 text-white/40'}`}>
                {doc.type.slice(0, 3)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{doc.name}</div>
                <div className="text-xs text-white/30 mt-0.5">
                  {formatDate(doc.uploaded_at)} · {formatBytes(doc.size)}
                </div>
              </div>
              <div className={`flex items-center gap-1.5 text-xs px-2 py-1 rounded-full ${
                doc.status === 'ready' ? 'text-green-400 bg-green-400/10' : 'text-orange-400 bg-orange-400/10'
              }`}>
                <span className={`w-1 h-1 rounded-full ${doc.status === 'ready' ? 'bg-green-400' : 'bg-orange-400 animate-pulse'}`} />
                {doc.status === 'ready' ? 'Ready' : 'Processing...'}
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 glass rounded-lg text-white/40 hover:text-white transition-colors">
                  <Download className="w-3.5 h-3.5" />
                </button>
                <button className="p-2 glass rounded-lg text-white/40 hover:text-red-400 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
