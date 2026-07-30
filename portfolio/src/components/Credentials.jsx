import { useReveal } from '../hooks/useReveal.js'

const CERTS = [
  'Building My Own Responsive Website — NXTWAVE',
  'Python Programming — NXTWAVE',
  'Introduction to Databases — NXTWAVE',
  'Python for Data Science — NPTEL (75%)',
]

const ACHIEVEMENTS = [
  'Participated in Adobe Hackathon, contributing innovative ideas in full-stack development.',
  'Conducted a hands-on Full Stack Development workshop for 30+ juniors, with positive feedback.',
]

export default function Credentials() {
  const [ref, visible] = useReveal()

  return (
    <section id="education" className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className={`node-fade ${visible ? 'visible' : ''} mb-14`}>
          <p className="eyebrow mb-4">05 / education &amp; credentials</p>
          <h2 className="section-title text-3xl sm:text-4xl text-ink">Foundations.</h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Education */}
          <div className={`node-fade ${visible ? 'visible' : ''} card rounded-2xl p-7`}>
            <p className="font-mono text-[10px] uppercase tracking-widest text-cyan mb-3">
              Education
            </p>
            <h3 className="section-title text-lg text-ink mb-1">B.Tech in Information Technology</h3>
            <p className="text-muted text-sm mb-4">
              Sri Balaji Chockalingam Engineering College — Arni, Thiruvannamalai
            </p>
            <div className="flex items-center justify-between font-mono text-xs text-muted border-t border-line pt-4">
              <span>2022 – 2026</span>
              <span className="text-ink">CGPA 7.4 / 10</span>
            </div>
          </div>

          {/* Certifications */}
          <div
            className={`node-fade ${visible ? 'visible' : ''} card rounded-2xl p-7`}
            style={{ transitionDelay: '120ms' }}
          >
            <p className="font-mono text-[10px] uppercase tracking-widest text-indigo mb-3">
              Certifications
            </p>
            <ul className="space-y-3">
              {CERTS.map((c) => (
                <li key={c} className="text-sm text-muted leading-relaxed flex gap-2">
                  <span className="text-indigo mt-1">▸</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Achievements */}
          <div
            className={`node-fade ${visible ? 'visible' : ''} card rounded-2xl p-7`}
            style={{ transitionDelay: '240ms' }}
          >
            <p className="font-mono text-[10px] uppercase tracking-widest text-violet mb-3">
              Achievements
            </p>
            <ul className="space-y-3">
              {ACHIEVEMENTS.map((a) => (
                <li key={a} className="text-sm text-muted leading-relaxed flex gap-2">
                  <span className="text-violet mt-1">▸</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
