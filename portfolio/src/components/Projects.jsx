import { useRef } from 'react'
import { useReveal } from '../hooks/useReveal.js'

const PROJECTS = [
  {
    year: '2026',
    title: 'AI Resume Analyzer',
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Gemini 1.5 Flash', 'JWT'],
    description:
      'A full-stack AI-powered resume analyzer that evaluates resumes against job descriptions, generating ATS scores, flagging missing skills, and giving personalized recommendations.',
    points: [
      'Built secure auth, resume upload, and analysis history with RESTful APIs end to end.',
      'Engineered an evaluation workflow on top of Google Gemini for structured, actionable feedback.',
    ],
    accent: '#22D3EE',
  },
  {
    year: '2025',
    title: 'Smart ERP College Management System',
    stack: ['React.js', 'Node.js', 'Express.js', 'MySQL', 'JWT'],
    description:
      'A full-stack ERP system to manage student, faculty, department, and administrative operations under one roof.',
    points: [
      'Implemented JWT-based authentication with role-based access control.',
      'Designed REST APIs in Node.js/Express for full CRUD across every module.',
    ],
    accent: '#6366F1',
  },
]

function TiltCard({ project, index, visible }) {
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const rotateX = ((y / rect.height) - 0.5) * -10
    const rotateY = ((x / rect.width) - 0.5) * 10
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`
    card.style.setProperty('--mx', `${(x / rect.width) * 100}%`)
    card.style.setProperty('--my', `${(y / rect.height) * 100}%`)
  }

  const handleMouseLeave = () => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)'
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`node-fade ${visible ? 'visible' : ''} card rounded-2xl p-8 transition-transform duration-200 ease-out will-change-transform relative overflow-hidden`}
      style={{
        transitionDelay: `${index * 140}ms`,
        backgroundImage:
          'radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%), rgba(99,102,241,0.12), transparent 40%)',
      }}
    >
      <div className="flex items-start justify-between mb-5">
        <span className="font-mono text-xs text-cyan tracking-widest">{project.year}</span>
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: project.accent }} />
      </div>

      <h3 className="section-title text-2xl text-ink mb-3">{project.title}</h3>
      <p className="text-muted text-sm leading-relaxed mb-5">{project.description}</p>

      <ul className="space-y-2 mb-6">
        {project.points.map((p) => (
          <li key={p} className="text-muted text-sm leading-relaxed flex gap-2">
            <span className="text-indigo mt-1">▸</span>
            <span>{p}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-2">
        {project.stack.map((s) => (
          <span
            key={s}
            className="font-mono text-[10.5px] uppercase tracking-wide px-2.5 py-1 rounded-full border border-line text-muted"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Projects() {
  const [ref, visible] = useReveal()

  return (
    <section id="projects" className="relative py-28 px-6 bg-panel/40">
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className={`node-fade ${visible ? 'visible' : ''} mb-14`}>
          <p className="eyebrow mb-4">04 / projects</p>
          <h2 className="section-title text-3xl sm:text-4xl text-ink">Things I've built.</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {PROJECTS.map((p, i) => (
            <TiltCard key={p.title} project={p} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  )
}
