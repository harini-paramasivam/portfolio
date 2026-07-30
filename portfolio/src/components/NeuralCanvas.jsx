import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// Signature element: a living "skill graph" rendered in 3D — points (nodes)
// drift slowly in space and draw connecting edges when close together,
// echoing the literal skills-as-a-network idea used again in the Skills
// section. Reacts gently to pointer position for depth/parallax.
export default function NeuralCanvas({ className = '' }) {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const width = mount.clientWidth
    const height = mount.clientHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000)
    camera.position.z = 34

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(width, height)
    mount.appendChild(renderer.domElement)

    // --- Nodes ---
    const NODE_COUNT = 90
    const spread = 26
    const positions = new Float32Array(NODE_COUNT * 3)
    const velocities = []

    for (let i = 0; i < NODE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * spread * 2
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread
      velocities.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.008,
          (Math.random() - 0.5) * 0.008,
          (Math.random() - 0.5) * 0.008
        )
      )
    }

    const nodeGeometry = new THREE.BufferGeometry()
    nodeGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const nodeSprite = (() => {
      const canvas = document.createElement('canvas')
      canvas.width = 64
      canvas.height = 64
      const ctx = canvas.getContext('2d')
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
      grad.addColorStop(0, 'rgba(180,190,255,1)')
      grad.addColorStop(0.4, 'rgba(99,102,241,0.9)')
      grad.addColorStop(1, 'rgba(99,102,241,0)')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, 64, 64)
      return new THREE.CanvasTexture(canvas)
    })()

    const nodeMaterial = new THREE.PointsMaterial({
      size: 1.15,
      map: nodeSprite,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      color: 0x9fb0ff,
    })
    const points = new THREE.Points(nodeGeometry, nodeMaterial)
    scene.add(points)

    // --- Edges (updated each frame based on proximity) ---
    const maxEdges = NODE_COUNT * 6
    const edgePositions = new Float32Array(maxEdges * 2 * 3)
    const edgeGeometry = new THREE.BufferGeometry()
    edgeGeometry.setAttribute('position', new THREE.BufferAttribute(edgePositions, 3))
    const edgeMaterial = new THREE.LineBasicMaterial({
      color: 0x22d3ee,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
    })
    const lines = new THREE.LineSegments(edgeGeometry, edgeMaterial)
    scene.add(lines)

    const linkDistance = 7.2

    let pointer = { x: 0, y: 0 }
    const handlePointerMove = (e) => {
      const rect = mount.getBoundingClientRect()
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
    }
    window.addEventListener('pointermove', handlePointerMove)

    let rafId
    const clock = new THREE.Clock()

    const animate = () => {
      const dt = Math.min(clock.getDelta(), 0.05)
      const posAttr = nodeGeometry.getAttribute('position')

      for (let i = 0; i < NODE_COUNT; i++) {
        let x = posAttr.getX(i) + velocities[i].x
        let y = posAttr.getY(i) + velocities[i].y
        let z = posAttr.getZ(i) + velocities[i].z

        if (Math.abs(x) > spread) velocities[i].x *= -1
        if (Math.abs(y) > spread / 1.4) velocities[i].y *= -1
        if (Math.abs(z) > spread) velocities[i].z *= -1

        posAttr.setXYZ(i, x, y, z)
      }
      posAttr.needsUpdate = true

      // Recompute edges among nearby nodes (cap for perf)
      let edgeCount = 0
      for (let i = 0; i < NODE_COUNT && edgeCount < maxEdges; i++) {
        const xi = posAttr.getX(i), yi = posAttr.getY(i), zi = posAttr.getZ(i)
        for (let j = i + 1; j < NODE_COUNT && edgeCount < maxEdges; j++) {
          const dx = xi - posAttr.getX(j)
          const dy = yi - posAttr.getY(j)
          const dz = zi - posAttr.getZ(j)
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
          if (dist < linkDistance) {
            const base = edgeCount * 6
            edgePositions[base] = xi
            edgePositions[base + 1] = yi
            edgePositions[base + 2] = zi
            edgePositions[base + 3] = posAttr.getX(j)
            edgePositions[base + 4] = posAttr.getY(j)
            edgePositions[base + 5] = posAttr.getZ(j)
            edgeCount++
          }
        }
      }
      edgeGeometry.setDrawRange(0, edgeCount * 2)
      edgeGeometry.attributes.position.needsUpdate = true

      // Gentle camera drift toward pointer for parallax depth
      camera.position.x += (pointer.x * 4 - camera.position.x) * 0.02
      camera.position.y += (pointer.y * 2 - camera.position.y) * 0.02
      camera.lookAt(0, 0, 0)

      scene.rotation.y += dt * 0.035

      renderer.render(scene, camera)
      rafId = requestAnimationFrame(animate)
    }
    animate()

    const handleResize = () => {
      const w = mount.clientWidth
      const h = mount.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('pointermove', handlePointerMove)
      nodeGeometry.dispose()
      edgeGeometry.dispose()
      nodeMaterial.dispose()
      edgeMaterial.dispose()
      renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className={className} aria-hidden="true" />
}
