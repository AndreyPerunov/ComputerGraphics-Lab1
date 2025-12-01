"use client"
import { Line } from "@react-three/drei"

export function SelectionOutline({ size = 1, color = "cyan" }: { size?: number; color?: string }) {
  const half = size / 2

  const points: [number, number, number][] = [
    [-half, -half, 0],
    [half, -half, 0],
    [half, half, 0],
    [-half, half, 0],
    [-half, -half, 0]
  ]

  return <Line points={points} color={color} lineWidth={1} dashed={true} dashSize={0.15} gapSize={0.1} />
}
