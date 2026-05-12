import VideoGrid from '@/components/VideoGrid'
import videos from '@/lib/videos.json'
import { Video } from '@/lib/types'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
              src="/Softbox.png" 
              alt="SoftBox" 
              className="w-8 h-8" 
              style={{ filter: 'brightness(0)' }} 
            />
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', letterSpacing: '0.05em' }}>
            Soft<span className="text-accent">Box</span>
          </span>
        </div>
        <span className="text-xs text-muted hidden sm:block">
          Tutoriels réalisés par des étudiants en audiovisuel
        </span>
      </nav>

      {/* Hero */}
      <section className="px-6 pt-16 pb-12 max-w-5xl mx-auto">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent mb-4">
          Plateforme étudiante
        </p>
        <h1
          className="leading-none mb-4"
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 8vw, 6rem)', letterSpacing: '0.02em' }}
        >
          APPRENEZ<br />
          <span className="text-accent">L'AUDIOVISUEL</span><br />
          PAR L'EXEMPLE
        </h1>
        <p className="text-muted max-w-lg leading-relaxed">
          Des tutos vidéo pensés et produits par des étudiants en audiovisuel —
          cadrage, son, montage, motion design et bien plus.
        </p>

        {/* Stats */}
        <div className="flex gap-8 mt-8">
          {[
            { n: videos.length, label: 'tutoriels' },
            { n: new Set(videos.map(v => (v as any).author)).size, label: 'auteurs' },
            { n: new Set(videos.map(v => (v as any).category)).size, label: 'catégories' },
          ].map(({ n, label }) => (
            <div key={label}>
              <div className="text-2xl font-medium text-accent" style={{ fontFamily: 'var(--font-display)', fontSize: '2rem' }}>{n}</div>
              <div className="text-xs text-muted uppercase tracking-widest">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-border" />

      {/* Grid section */}
      <section className="px-6 py-12 max-w-5xl mx-auto">
        <VideoGrid initial={videos as Video[]} />
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-8 text-center text-xs text-muted">
        <span style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.1em' }}>SoftBox</span>
        {' '}— Plateforme pédagogique réalisée par et pour des étudiants en audiovisuel
      </footer>
    </main>
  )
}