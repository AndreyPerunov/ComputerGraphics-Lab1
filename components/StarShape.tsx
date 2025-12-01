"use client"
import { Shape } from "three"

export function StarShape({ color = "yellow" }: { color?: string }) {
  const shape = new Shape()
  const outer = 0.6
  const inner = 0.25
  const spikes = 5
  const step = Math.PI / spikes

  shape.moveTo(0, outer)
  for (let i = 0; i < spikes * 2; i++) {
    const radius = i % 2 === 0 ? outer : inner
    const angle = i * step
    shape.lineTo(Math.sin(angle) * radius, Math.cos(angle) * radius)
  }
  shape.closePath()

  return (
    <mesh>
      <shapeGeometry args={[shape]} />
      <meshBasicMaterial color={color} />
    </mesh>
  )
}
