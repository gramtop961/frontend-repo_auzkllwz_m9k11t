import React from 'react'
import { Rocket, Sparkles } from 'lucide-react'

export default function Header() {
  return (
    <header className="w-full sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/60 border-b border-black/5">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 grid place-items-center text-white shadow-md">
            <Rocket size={20} />
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-gray-900">Flames AI Assistant</h1>
            <p className="text-xs text-gray-500">Chat, create, and explore ideas faster</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-indigo-600">
          <Sparkles size={18} />
          <span className="text-sm font-medium">Powered by smart prompts</span>
        </div>
      </div>
    </header>
  )
}
