"use client"
import { useThree } from "@react-three/fiber"
import { useEffect, useState, useRef } from "react"

export function DragPan() {
  const { camera, gl } = useThree()
  const [dragging, setDragging] = useState(false)
  const [isSpace, setIsSpace] = useState(false)
  const last = useRef<{ x: number; y: number } | null>(null)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateCursor = (state: { space?: boolean; dragging?: boolean }) => {
    const spaceHeld = state.space ?? isSpace
    const isDraggingNow = state.dragging ?? dragging

    if (spaceHeld && isDraggingNow) {
      gl.domElement.style.cursor = "grabbing"
    } else if (spaceHeld) {
      gl.domElement.style.cursor = "grab"
    } else {
      gl.domElement.style.cursor = "default"
    }
  }

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        setIsSpace(true)
        updateCursor({ space: true })
      }
    }

    const up = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        setIsSpace(false)
        updateCursor({ space: false, dragging: false })
      }
    }

    window.addEventListener("keydown", down)
    window.addEventListener("keyup", up)

    return () => {
      window.removeEventListener("keydown", down)
      window.removeEventListener("keyup", up)
    }
  }, [updateCursor])

  useEffect(() => {
    const handleDown = (e: MouseEvent) => {
      if (!isSpace) return
      setDragging(true)
      last.current = { x: e.clientX, y: e.clientY }
      updateCursor({ dragging: true })
    }

    const handleUp = () => {
      setDragging(false)
      last.current = null
      updateCursor({ dragging: false })
    }

    const handleMove = (e: MouseEvent) => {
      if (!dragging || !last.current) return

      const dx = e.clientX - last.current.x
      const dy = e.clientY - last.current.y
      last.current = { x: e.clientX, y: e.clientY }

      const moveFactor = 1 / camera.zoom

      camera.position.x -= dx * moveFactor
      camera.position.y += dy * moveFactor
    }

    const dom = gl.domElement
    dom.addEventListener("mousedown", handleDown)
    window.addEventListener("mouseup", handleUp)
    window.addEventListener("mousemove", handleMove)

    return () => {
      dom.removeEventListener("mousedown", handleDown)
      window.removeEventListener("mouseup", handleUp)
      window.removeEventListener("mousemove", handleMove)
    }
  }, [camera, gl, isSpace, dragging])

  return null
}
