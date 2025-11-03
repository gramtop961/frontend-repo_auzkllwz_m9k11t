import React, { useEffect, useRef } from 'react'
import { Bot, User } from 'lucide-react'

function Bubble({ role, text }) {
  const isUser = role === 'user'
  return (
    <div className={`w-full flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[80%] md:max-w-[70%] flex items-end gap-2 ${isUser ? 'flex-row-reverse' : ''}`}>
        <div className={`h-9 w-9 rounded-full grid place-items-center ${isUser ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'}`}>
          {isUser ? <User size={18} /> : <Bot size={18} />}
        </div>
        <div className={`${isUser ? 'bg-indigo-600 text-white' : 'bg-white text-gray-800'} rounded-2xl px-4 py-3 shadow-sm border border-black/5`}
          style={{ borderTopLeftRadius: isUser ? 16 : 6, borderTopRightRadius: isUser ? 6 : 16 }}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{text}</p>
        </div>
      </div>
    </div>
  )
}

function Typing() {
  return (
    <div className="flex items-center gap-2 text-gray-500">
      <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-200ms]"></div>
      <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-100ms]"></div>
      <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"></div>
    </div>
  )
}

export default function ChatWindow({ messages, botTyping }) {
  const ref = useRef(null)
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight
    }
  }, [messages, botTyping])

  return (
    <div ref={ref} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
      {messages.length === 0 && (
        <div className="h-full min-h-[40vh] grid place-items-center">
          <div className="text-center">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white shadow-md">
              <Bot />
            </div>
            <h2 className="mt-4 text-xl font-semibold text-gray-900">Mulai percakapan</h2>
            <p className="text-sm text-gray-500">Tanyakan apa saja—ide, ringkasan, atau bantuan menulis.</p>
          </div>
        </div>
      )}
      {messages.map((m, i) => (
        <Bubble key={i} role={m.role} text={m.content} />
      ))}
      {botTyping && (
        <div className="w-full flex justify-start">
          <div className="max-w-[80%] md:max-w-[70%] flex items-end gap-2">
            <div className="h-9 w-9 rounded-full grid place-items-center bg-gray-100 text-gray-700">
              <Bot size={18} />
            </div>
            <div className="bg-white rounded-2xl px-4 py-3 shadow-sm border border-black/5" style={{ borderTopRightRadius: 16, borderTopLeftRadius: 6 }}>
              <Typing />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
