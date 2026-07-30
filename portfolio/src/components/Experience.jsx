import { useReveal } from '../hooks/useReveal.js'

const ROLES = [
  {
    role: 'Web Developer Intern',
    org: '8 Queens Software Technologies Pvt. Ltd. — Chennai, India',
    period: 'June 2025 – July 2025',
    points: [
      'Developed responsive web pages using HTML, CSS, JavaScript, and Bootstrap, ensuring cross-device compatibility.',
      'Gained practical experience in full-stack development workflows, version control, and software development lifecycle processes.',
    ],
  },
]

export default function Experience() {
  const [ref, visible] = useReveal()

  return (
    <section id="experience" className="relative py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <div ref={ref} className={`node-fade ${visible ? 'visible' : ''} mb-14`}>
          <p className="eyebrow mb-4">03 / experience</p>
          <h2 className="section-title text-3xl sm:text-4xl text-ink">Where I've worked.</h2>
        </div>

        <ol className="relative border-l border-line pl-8 space-y-12">
          {ROLES.map((r, i) => (
            <li
              key={r.role}
              className={`relative node-fade ${visible ? 'visible' : ''}`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <span className="absolute -left-[2.35rem] top-1.5 w-3.5 h-3.5 rounded-full bg-cyan shadow-[0_0_0_4px_rgba(34,211,238,0.15)]" />
              <p className="font-mono text-xs uppercase tracking-widest text-cyan mb-2">{r.period}</p>
              <h3 className="section-title text-xl text-ink">{r.role}</h3>
              <p className="text-muted text-sm mb-3">{r.org}</p>
              <ul className="space-y-2">
                {r.points.map((p) => (
                  <li key={p} className="text-muted text-sm leading-relaxed flex gap-2">
                    <span className="text-indigo mt-1.5">▸</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}

          <li className="relative">
            <span className="absolute -left-[2.35rem] top-1.5 w-3.5 h-3.5 rounded-full bg-violet/60" />
            <p className="font-mono text-xs uppercase tracking-widest text-violet">next</p>
            <h3 className="section-title text-xl text-ink mt-2">
              Looking for my next role as a Software Developer.
            </h3>
          </li>
        </ol>
      </div>
    </section>
  )
}
