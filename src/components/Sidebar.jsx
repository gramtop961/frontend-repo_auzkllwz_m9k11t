import React from 'react'
import { Lightbulb, MessageSquare } from 'lucide-react'

const suggestions = [
  'Buatkan saya itinerary liburan 3 hari di Bali',
  'Ringkas artikel ini dalam 5 poin utama',
  'Tulis email profesional untuk klien',
  'Bantu saya belajar konsep React hooks',
]

export default function Sidebar({ onSelectSuggestion }) {
  return (
    <aside className="hidden lg:block w-80 shrink-0 p-4">
      <div className="sticky top-20 space-y-4">
        <div className="rounded-2xl border border-black/5 bg-white shadow-sm">
          <div className="p-4 border-b border-black/5 flex items-center gap-2 text-amber-600">
            <Lightbulb size={18} />
            <span className="text-sm font-semibold">Ide Cepat</span>
          </div>
          <ul className="p-3 space-y-2">
            {suggestions.map((s, i) => (
              <li key={i}>
                <button
                  onClick={() => onSelectSuggestion(s)}
                  className="w-full text-left text-sm p-3 rounded-xl border border-black/5 hover:border-indigo-300 hover:bg-indigo-50 transition flex items-start gap-2"
                >
                  <MessageSquare size={16} className="mt-0.5 text-indigo-500" />
                  <span className="text-gray-700">{s}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  )
}
