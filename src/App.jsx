import React, { useMemo, useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import ChatWindow from './components/ChatWindow'
import MessageInput from './components/MessageInput'
import Spline from '@splinetool/react-spline'

function useAssistant() {
  // simple, fast on-device response generator (mock AI)
  const generate = useMemo(() => {
    return (prompt) => {
      const lower = prompt.toLowerCase()
      if (lower.includes('ringkas') || lower.includes('summary')) {
        return (
          'Berikut ringkasan singkat:\n' +
          '• Topik utama diidentifikasi dan dijelaskan secara ringkas.\n' +
          '• Poin pendukung dirangkum menjadi kalimat padat.\n' +
          '• Kesimpulan menekankan hal terpenting yang bisa ditindaklanjuti.'
        )
      }
      if (lower.includes('email')) {
        return (
          'Subjek: Tindak Lanjut Diskusi Kemarin\n\n' +
          'Halo [Nama Klien],\n\n' +
          'Terima kasih atas waktunya kemarin. Berikut rangkuman dan rencana tindak lanjut kami: ...\n' +
          'Jika ada masukan tambahan, mohon informasikan.\n\n' +
          'Salam,\nNama Anda'
        )
      }
      if (lower.includes('itinerary') || lower.includes('liburan')) {
        return (
          'Itinerary 3 hari di Bali:\n\n' +
          'Hari 1: Ubud vibes — Tegalalang Rice Terrace, Pura Tirta Empul, makan malam di Ubud Center.\n' +
          'Hari 2: Pantai selatan — Melasti, GWK, sunset di Uluwatu + Kecak.\n' +
          'Hari 3: Santai di Canggu — cafe hopping, spa, dan belanja oleh-oleh.'
        )
      }
      if (lower.includes('react') || lower.includes('kode') || lower.includes('code')) {
        return (
          'Contoh penggunaan React hook useState:\n\n' +
          'import { useState } from "react"\n' +
          'function Counter(){\n  const [count, setCount] = useState(0)\n  return (<button onClick={() => setCount(c => c+1)}>Count: {count}</button>)\n}'
        )
      }
      return (
        'Menarik! Inilah jawaban singkat:\n' +
        '• Saya memahami maksud pertanyaanmu dan menyiapkan langkah-langkah praktis.\n' +
        '• Jika ingin versi lebih detail, sebutkan konteks, batasan, dan output yang diinginkan.\n' +
        '• Kamu juga bisa minta format tabel atau poin.'
      )
    }
  }, [])

  return { generate }
}

export default function App() {
  const { generate } = useAssistant()
  const [messages, setMessages] = useState([])
  const [botTyping, setBotTyping] = useState(false)

  const send = async (text) => {
    const userMsg = { role: 'user', content: text }
    setMessages((m) => [...m, userMsg])

    setBotTyping(true)
    // simulate latency and typing
    await new Promise((r) => setTimeout(r, 600))
    const reply = generate(text)
    const chunks = reply.split('\n')
    let acc = ''
    for (const part of chunks) {
      await new Promise((r) => setTimeout(r, 180))
      acc = acc ? acc + '\n' + part : part
      setMessages((m) => {
        const base = [...m]
        const last = base[base.length - 1]
        if (last && last.role === 'assistant' && !last.final) {
          base[base.length - 1] = { ...last, content: acc }
          return base
        }
        return [...base, { role: 'assistant', content: acc, final: false }]
      })
    }
    setMessages((m) => {
      const base = [...m]
      const last = base[base.length - 1]
      if (last && last.role === 'assistant') base[base.length - 1] = { role: 'assistant', content: last.content, final: true }
      return base
    })
    setBotTyping(false)
  }

  const handleSelectSuggestion = (s) => {
    // send selected suggestion directly
    send(s)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 text-gray-900">
      <div className="fixed inset-0 -z-0">
        <div className="absolute inset-0 opacity-90 pointer-events-none">
          <Spline scene="https://prod.spline.design/4y3dHc2V3KWWr7dU/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/60 to-white/90 pointer-events-none" />
      </div>

      <Header />

      <main className="relative z-10 mx-auto max-w-6xl px-4 grid lg:grid-cols-[1fr_320px] gap-4 md:gap-6 py-6">
        <section className="rounded-3xl border border-black/5 bg-white/80 backdrop-blur shadow-sm flex flex-col min-h-[70vh] max-h-[75vh]">
          <ChatWindow messages={messages} botTyping={botTyping} />
          <MessageInput onSend={send} />
        </section>

        <Sidebar onSelectSuggestion={handleSelectSuggestion} />
      </main>

      <footer className="relative z-10 mx-auto max-w-6xl px-4 py-8 text-center text-xs text-gray-500">
        Dibuat untuk kamu — asisten chatbot AI yang keren dan menarik. ✨
      </footer>
    </div>
  )
}
