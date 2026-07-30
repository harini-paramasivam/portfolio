import { useMemo, useState } from 'react'
import { useReveal } from '../hooks/useReveal.js'

const CATEGORIES = [
  {
    name: 'Languages',
    color: '#22D3EE',
    skills: ['Python', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3'],
  },
  {
    name: 'Frontend',
    color: '#6366F1',
    skills: ['React.js', 'Next.js', 'Tailwind CSS', 'Bootstrap', 'Responsive Design'],
  },
  {
    name: 'Backend',
    color: '#A78BFA',
    skills: ['Node.js', 'Express.js', 'REST APIs'],
  },
  {
    name: 'AI & ML',
    color: '#F472B6',
    skills: ['LLMs', 'RAG', 'Prompt Engineering', 'OpenAI API', 'LangChain', 'Hugging Face'],
  },
  {
    name: 'Databases',
    color: '#34D399',
    skills: ['MySQL', 'MongoDB', 'PostgreSQL'],
  },
  {
    name: 'Tooling',
    color: '#FBBF24',
    skills: ['Git', 'GitHub', 'VS Code', 'Vite', 'Postman'],
  },
]

const WIDTH = 900
const HEIGHT = 640
const CENTER = { x: WIDTH / 2, y: HEIGHT / 2 }
const HUB_RADIUS = 180

function polar(cx, cy, r, angleDeg) {
  const a = (angleDeg * Math.PI) / 180
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) }
}

export default function Skills() {
  const [ref, visible] = useReveal()
  const [activeCategory, setActiveCategory] = useState(null)

  const graph = useMemo(() => {
    const angleStep = 360 / CATEGORIES.length
    return CATEGORIES.map((cat, i) => {
      const angle = i * angleStep - 90
      const hub = polar(CENTER.x, CENTER.y, HUB_RADIUS, angle)
      const skillAngleSpread = 65
      const skillNodes = cat.skills.map((skill, j) => {
        const t = cat.skills.length > 1 ? j / (cat.skills.length - 1) : 0.5
        const skillAngle = angle - skillAngleSpread / 2 + t * skillAngleSpread
        const dists = [70, 92, 115]
        const dist = dists[j % 3]
        const pos = polar(hub.x, hub.y, dist, skillAngle)
        return { skill, x: pos.x, y: pos.y, skillAngle }
      })
      return { ...cat, angle, hub, skillNodes }
    })
  }, [])

  return (
    <section id="skills" className="relative py-28 px-6 bg-panel/40">
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className={`node-fade ${visible ? 'visible' : ''} mb-4 text-center`}>
          <p className="eyebrow mb-4">02 / skill graph</p>
          <h2 className="section-title text-3xl sm:text-4xl text-ink">
            A network, not a checklist.
          </h2>
          <p className="text-muted mt-3 max-w-xl mx-auto">
            Hover a cluster to see how it connects to the rest of the stack.
          </p>
        </div>

        <div className={`node-fade ${visible ? 'visible' : ''}`} style={{ transitionDelay: '120ms' }}>
          <svg
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            className="w-full h-auto select-none"
            role="img"
            aria-label="Skill graph clustered by category"
          >
            {/* Spokes: center to hub */}
            {graph.map((cat) => (
              <line
                key={`spoke-${cat.name}`}
                x1={CENTER.x}
                y1={CENTER.y}
                x2={cat.hub.x}
                y2={cat.hub.y}
                stroke={cat.color}
                strokeWidth={activeCategory === cat.name ? 2 : 1}
                opacity={activeCategory === null || activeCategory === cat.name ? 0.45 : 0.1}
              />
            ))}

            {/* Hub to skill lines */}
            {graph.map((cat) =>
              cat.skillNodes.map((s) => (
                <line
                  key={`${cat.name}-${s.skill}`}
                  x1={cat.hub.x}
                  y1={cat.hub.y}
                  x2={s.x}
                  y2={s.y}
                  stroke={cat.color}
                  strokeWidth={1}
                  opacity={activeCategory === null || activeCategory === cat.name ? 0.35 : 0.06}
                />
              ))
            )}

            {/* Center node */}
            <circle cx={CENTER.x} cy={CENTER.y} r={30} fill="#0F1424" stroke="#E8EAF2" strokeOpacity={0.25} />
            <text
              x={CENTER.x}
              y={CENTER.y + 5}
              textAnchor="middle"
              className="font-mono"
              fontSize="13"
              fill="#E8EAF2"
            >
              SM
            </text>

            {/* Category hubs */}
            {graph.map((cat) => (
              <g
                key={cat.name}
                onMouseEnter={() => setActiveCategory(cat.name)}
                onMouseLeave={() => setActiveCategory(null)}
                style={{ cursor: 'pointer' }}
              >
                <circle
                  cx={cat.hub.x}
                  cy={cat.hub.y}
                  r={activeCategory === cat.name ? 9 : 7}
                  fill={cat.color}
                  opacity={activeCategory === null || activeCategory === cat.name ? 1 : 0.4}
                  style={{ transition: 'r 0.2s ease' }}
                />
                <text
                  x={cat.hub.x}
                  y={cat.hub.y - 16}
                  textAnchor="middle"
                  fontSize="13"
                  fontFamily="Space Grotesk, sans-serif"
                  fontWeight="600"
                  fill={activeCategory === null || activeCategory === cat.name ? '#E8EAF2' : '#8B93A7'}
                >
                  {cat.name}
                </text>
              </g>
            ))}

            {/* Skill nodes */}
            {graph.map((cat) =>
              cat.skillNodes.map((s) => {
                const rad = (s.skillAngle * Math.PI) / 180
                const cos = Math.cos(rad)
                const sin = Math.sin(rad)
                
                // Radial offset: push text away from the node along the radial line
                const textDist = 12
                const textX = s.x + cos * textDist
                const textY = s.y + sin * textDist + (Math.abs(cos) > 0.3 ? 3.5 : (sin < 0 ? -2 : 8))
                
                let textAnchor = 'middle'
                if (cos > 0.3) {
                  textAnchor = 'start'
                } else if (cos < -0.3) {
                  textAnchor = 'end'
                }

                return (
                  <g key={`node-${cat.name}-${s.skill}`}>
                    <circle
                      cx={s.x}
                      cy={s.y}
                      r={3.2}
                      fill={cat.color}
                      opacity={activeCategory === null || activeCategory === cat.name ? 0.9 : 0.15}
                    />
                    <text
                      x={textX}
                      y={textY}
                      textAnchor={textAnchor}
                      fontSize="10.5"
                      fontFamily="JetBrains Mono, monospace"
                      fill={activeCategory === null || activeCategory === cat.name ? '#C7CBDA' : '#4b5165'}
                    >
                      {s.skill}
                    </text>
                  </g>
                )
              })
            )}
          </svg>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mt-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.name}
              onMouseEnter={() => setActiveCategory(cat.name)}
              onMouseLeave={() => setActiveCategory(null)}
              onFocus={() => setActiveCategory(cat.name)}
              onBlur={() => setActiveCategory(null)}
              className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wide px-3 py-1.5 rounded-full border border-line text-muted hover:text-ink transition-colors"
            >
              <span className="w-2 h-2 rounded-full" style={{ background: cat.color }} />
              {cat.name}
            </button>
          ))}
        </div>

        <p className="text-center text-muted text-sm mt-8 font-body">
          Plus the human layer: problem solving, communication, team collaboration,
          adaptability, and time management.
        </p>
      </div>
    </section>
  )
}
