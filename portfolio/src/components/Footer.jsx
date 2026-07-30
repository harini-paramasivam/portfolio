export default function Footer() {
  return (
    <footer className="border-t border-line px-6 py-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-muted font-mono text-xs">
        <p>© {new Date().getFullYear()} Sanjay Manigandan.</p>
        <p>Built with React &amp; Three.js.</p>
      </div>
    </footer>
  )
}
