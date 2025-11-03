import React, { useState } from 'react'
import { Send, Sparkles } from 'lucide-react'

export default function MessageInput({ onSend }) {
  const [value, setValue] = useState('')
  const [busy, setBusy] = useState(false)

  const handleSend = async () => {
    const text = value.trim()
    if (!text || busy) return
    setBusy(true)
    await onSend(text)
    setValue('')
    setBusy(false)
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="border-t border-black/5 p-3 md:p-4">
      <div className="rounded-2xl border border-black/10 bg-white shadow-sm focus-within:ring-2 focus-within:ring-indigo-200 focus-within:border-indigo-300 overflow-hidden">
        <textarea
          className="w-full resize-none p-4 outline-none text-sm text-gray-800 placeholder:text-gray-400"
          rows={3}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Tulis pesanmu di sini... (Enter untuk kirim, Shift+Enter untuk baris baru)"
        />
        <div className="flex items-center justify-between px-3 pb-3">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Sparkles size={16} className="text-indigo-500" />
            <span>Tips: minta format poin atau contoh kode untuk jawaban lebih jelas</span>
          </div>
          <button
            onClick={handleSend}
            disabled={busy}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <Send size={16} />
            Kirim
          </button>
        </div>
      </div>
    </div>
  )
}
