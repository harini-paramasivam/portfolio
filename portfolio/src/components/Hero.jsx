import NeuralCanvas from './NeuralCanvas.jsx'
import photo from '../assets/sanjay.jpeg'

export default function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16">
      <NeuralCanvas className="absolute inset-0 w-full h-full opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-b from-void/20 via-void/40 to-void pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full grid md:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
        <div>
          <p className="eyebrow mb-5">// aspiring software developer</p>
          <h1 className="font-display font-semibold text-5xl sm:text-6xl lg:text-7xl leading-[1.02] tracking-tight text-ink">
            Sanjay
            <br />
            <span className="bg-gradient-to-r from-indigo via-cyan to-violet bg-clip-text text-transparent">
              Manigandan
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-muted text-lg leading-relaxed font-body">
            I build full-stack and AI-powered applications — from ERP systems to LLM-driven
            tools — with React, Node.js, and a growing toolkit of AI engineering skills.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="font-mono text-xs uppercase tracking-wide px-6 py-3 rounded-full bg-gradient-to-r from-indigo to-cyan text-void font-semibold hover:opacity-90 transition-opacity"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="font-mono text-xs uppercase tracking-wide px-6 py-3 rounded-full border border-line text-ink hover:border-cyan/60 hover:text-cyan transition-colors"
            >
              Get in Touch
            </a>
          </div>

          <div className="mt-12 flex items-center gap-6 text-muted font-mono text-xs">
            <span>Vellore, Tamil Nadu, India</span>
            <span className="w-1 h-1 rounded-full bg-muted/50" />
            <span>B.Tech IT — 2026</span>
          </div>
        </div>

        <div className="relative mx-auto">
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-indigo/30 via-cyan/20 to-violet/30 blur-2xl" />
          <div className="relative w-56 sm:w-64 lg:w-72 aspect-[3/4] rounded-[1.75rem] overflow-hidden border border-line card">
            <img
              src={photo}
              alt="Portrait of Sanjay Manigandan"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-5 -left-5 card rounded-xl px-4 py-3 font-mono text-[11px] text-cyan shadow-lg">
            status: <span className="text-ink">open to work</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted animate-bounce">
        <span className="font-mono text-[10px] uppercase tracking-widest">scroll</span>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
          <rect x="1" y="1" width="14" height="22" rx="7" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="8" cy="7" r="2" fill="currentColor" />
        </svg>
      </div>
    </section>
  )
}
