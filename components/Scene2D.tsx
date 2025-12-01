"use client"

import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useEffect, useState } from "react"
import { MathUtils } from "three"
import { SelectionOutline } from "./SelectedOutline"
import { StarShape } from "./StarShape"
import { DragPan } from "./DragPan"

const initialShapes = [
  { id: "star1", type: "star", position: [1, 1, 0] as [number, number, number], rotation: 0, color: "yellow" },
  { id: "star2", type: "star", position: [-1, 1, 0] as [number, number, number], rotation: 0, color: "yellow" },
  { id: "sphere", type: "sphere", position: [0, 0, 0] as [number, number, number], rotation: 0, color: "red" },
  { id: "square1", type: "square", position: [-1.1, -1, 0] as [number, number, number], rotation: 0, color: "blue" },
  { id: "square2", type: "square", position: [0, -1, 0] as [number, number, number], rotation: 0, color: "blue" },
  { id: "square3", type: "square", position: [1.1, -1, 0] as [number, number, number], rotation: 0, color: "blue" }
]

export const Scene2D = () => {
  const [zoom, setZoom] = useState(100)

  const [shapes, setShapes] = useState(initialShapes)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!selectedId) return

      setShapes(prev =>
        prev.map(shape => {
          if (shape.id !== selectedId) return shape

          const [x, y, z] = shape.position

          if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") return { ...shape, position: [x, y + 0.1, z] }
          if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") return { ...shape, position: [x, y - 0.1, z] }
          if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") return { ...shape, position: [x - 0.1, y, z] }
          if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") return { ...shape, position: [x + 0.1, y, z] }

          if (e.key === "q" || e.key === "Q") return { ...shape, rotation: shape.rotation - Math.PI / 36 } // CCW
          if (e.key === "e" || e.key === "E") return { ...shape, rotation: shape.rotation + Math.PI / 36 } // CW

          return shape
        })
      )
    }

    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [selectedId])

  return (
    <div className="rounded border border-cyan-200 overflow-hidden w-[80vw] h-[70vh]">
      <div className="flex items-center m-4 gap-4">
        <button onClick={() => setZoom(z => z + 20)} className="p-4 cursor-pointer size-4 border rounded-lg border-cyan-200 flex items-center justify-center hover:bg-cyan-200 hover:text-black transition active:opacity-80">
          +
        </button>
        <button onClick={() => setZoom(z => z - 20)} className="p-4 cursor-pointer size-4 border rounded-lg border-cyan-200 flex items-center justify-center hover:bg-cyan-200 hover:text-black transition active:opacity-80">
          -
        </button>
        <div>
          <p className="text-sm text-gray-400">Zoom: {zoom}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">
            Press <code className="font-mono text-cyan-200">Space</code> and move over the scene.
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-400">
            Use <code className="font-mono text-cyan-200">Mouse</code> to select objects.
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-400">
            Press <code className="font-mono text-cyan-200">Arrow Keys</code> to move objects.
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-400">
            Press <code className="font-mono text-cyan-200">Q</code> and <code className="font-mono text-cyan-200">E</code> to rotate objects.
          </p>
        </div>
      </div>

      <Canvas orthographic camera={{ zoom: 50, position: [0, 0, 10] }}>
        <CameraUpdater zoom={zoom} />
        <DragPan />
        <Scene shapes={shapes} onSelect={setSelectedId} selectedId={selectedId} />
      </Canvas>
    </div>
  )
}

function CameraUpdater({ zoom }: { zoom: number }) {
  const camera = useThree(state => state.camera)

  useFrame(() => {
    // eslint-disable-next-line react-hooks/immutability
    camera.zoom = MathUtils.lerp(camera.zoom, zoom, 0.15)
    camera.updateProjectionMatrix()
  })

  return null
}

function Scene({ shapes, selectedId, onSelect }: { shapes: { id: string; type: string; position: [number, number, number]; rotation: number; color: string }[]; selectedId: string | null; onSelect: (id: string) => void }) {
  return (
    <>
      {shapes.map(shape => (
        <Figure key={shape.id} shape={shape} selected={shape.id === selectedId} onSelect={() => onSelect(shape.id)} />
      ))}
    </>
  )
}

function Figure({ shape, selected, onSelect }: { shape: { id: string; type: string; position: [number, number, number]; rotation: number; color: string }; selected: boolean; onSelect: () => void }) {
  const { type, position } = shape

  const outlineSize = type === "sphere" ? 0.8 : type === "square" ? 1.2 : type === "star" ? 1.4 : 1

  return (
    <group position={position} rotation={[0, 0, shape.rotation]} onClick={onSelect}>
      {selected && <SelectionOutline size={outlineSize} />}

      {type === "sphere" && (
        <mesh>
          <sphereGeometry args={[0.25, 32, 32]} />
          <meshBasicMaterial color={shape.color} />
        </mesh>
      )}

      {type === "square" && (
        <mesh>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial color={shape.color} />
        </mesh>
      )}

      {type === "star" && <StarShape color={shape.color} />}
    </group>
  )
}
