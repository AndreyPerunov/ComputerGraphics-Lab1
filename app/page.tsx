"use client"
import { Scene2D } from "@/components/Scene2D"
import { Github } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="space-y-4">
        <div className="flex items-end justify-between w-full">
          <div>
            <h1 className="text-2xl font-semibold tracking-widest">2D Scene</h1>
            <p>
              Made by{" "}
              <Link href="https://andreyperunov.com/" className="text-cyan-200 hover:underline" target="_blank" rel="noopener noreferrer">
                Andrey Perunov
              </Link>
              , for the <span className="font-bold underline">Computer Graphics</span> course at{" "}
              <Link href="https://tsi.lv/" className="text-cyan-200 hover:underline" target="_blank" rel="noopener noreferrer">
                TSI
              </Link>
              .
            </p>
          </div>
          <Link href="https://github.com/AndreyPerunov/CoputerGraphics-Lab1" className="size-10 p-2 border border-cyan-200 bg-transparent rounded-lg hover:bg-cyan-200/20 transition flex items-center justify-center" target="_blank" rel="noopener noreferrer">
            <Github className="size-8 text-cyan-200" />
          </Link>
        </div>
        <Scene2D />
      </main>
    </div>
  )
}
