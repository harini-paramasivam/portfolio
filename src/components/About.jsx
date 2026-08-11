import { useReveal } from '../hooks/useReveal.js'

const FACTS = [
  { label: 'Focus', value: 'Full-stack + AI apps' },
  { label: 'Stack', value: 'React · Node · Mongo · MySQL' },
  { label: 'Currently', value: 'B.Tech IT Completed' },
  { label: 'Based in', value: 'Vellore, Tamil Nadu' },
]

export default function About() {
  const [ref, visible] = useReveal()

  return (
    <section id="about" className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-[0.9fr_1.1fr] gap-14">
        <div ref={ref} className={`node-fade ${visible ? 'visible' : ''}`}>
          <p className="eyebrow mb-4">01 / about</p>
          <h2 className="section-title text-3xl sm:text-4xl text-ink leading-tight">
            Solving real problems with code, not just shipping features.
          </h2>
        </div>

        <div className={`node-fade ${visible ? 'visible' : ''} space-y-8`} style={{ transitionDelay: '120ms' }}>
          <p className="text-muted text-lg leading-relaxed">
            I'm an aspiring software developer with hands-on experience across the full
            stack — Python, JavaScript, React.js, Node.js, Express.js, MongoDB, and MySQL —
            and a growing specialization in applied AI: LLMs, RAG pipelines, and prompt
            engineering. I like taking a problem apart, understanding what actually matters
            to the people using it, and building something scalable around that.
          </p>
          <p className="text-muted text-lg leading-relaxed">
            Beyond the stack, I care about how software gets built: clean version control,
            thoughtful APIs, and collaborating well with a team. I'm looking to grow into a
            skilled software engineer by working on problems that stretch me.
          </p>

          <div className="grid grid-cols-2 gap-5 pt-4">
            {FACTS.map((f) => (
              <div key={f.label} className="card rounded-xl px-5 py-4">
                <p className="font-mono text-[10px] uppercase tracking-widest text-cyan mb-1">
                  {f.label}
                </p>
                <p className="text-ink text-sm">{f.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
