import { useReveal } from '../hooks/useReveal.js'

const CHANNELS = [
  { label: 'Email', value: 'sanjaymit27@gmail.com', href: 'mailto:sanjaymit27@gmail.com' },
  { label: 'Phone', value: '+91 98430 40326', href: 'tel:+919843040326' },
  { label: 'LinkedIn', value: 'linkedin.com/in/sanjay0327', href: 'https://linkedin.com/in/sanjay0327' },
  { label: 'GitHub', value: 'github.com/Sanjay27032005', href: 'https://github.com/Sanjay27032005' },
]

export default function Contact() {
  const [ref, visible] = useReveal()

  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo/5 to-transparent pointer-events-none" />
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div ref={ref} className={`node-fade ${visible ? 'visible' : ''}`}>
          <p className="eyebrow mb-4">06 / contact</p>
          <h2 className="section-title text-4xl sm:text-5xl text-ink leading-tight">
            Let's build something
            <br />
            <span className="bg-gradient-to-r from-indigo via-cyan to-violet bg-clip-text text-transparent">
              worth shipping.
            </span>
          </h2>
          <p className="text-muted mt-6 max-w-lg mx-auto">
            Open to software developer roles and collaborations. The fastest way to reach me
            is email — I read every one.
          </p>
        </div>

        <div
          className={`node-fade ${visible ? 'visible' : ''} mt-12 grid sm:grid-cols-2 gap-4 max-w-xl mx-auto`}
          style={{ transitionDelay: '150ms' }}
        >
          {CHANNELS.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith('http') ? '_blank' : undefined}
              rel={c.href.startsWith('http') ? 'noreferrer' : undefined}
              className="card rounded-xl px-5 py-4 text-left hover:border-cyan/50 transition-colors group"
            >
              <p className="font-mono text-[10px] uppercase tracking-widest text-cyan mb-1">
                {c.label}
              </p>
              <p className="text-ink text-sm group-hover:text-cyan transition-colors break-all">
                {c.value}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
