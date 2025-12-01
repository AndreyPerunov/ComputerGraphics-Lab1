"use client"
import { Scene2D } from "@/components/Scene2D"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="space-y-4">
        <h1 className="text-2xl font-semibold tracking-widest">2D Scene</h1>
        <p>
          Made by{" "}
          <Link href="https://andreyperunov.com/" className="text-cyan-200 hover:underline">
            Andrey Perunov
          </Link>
          , for the <span className="font-bold underline">Computer Graphics</span> course at{" "}
          <Link href="https://tsi.lv/" className="text-cyan-200 hover:underline">
            TSI
          </Link>
          .
        </p>
        <Scene2D />
      </main>
    </div>
  )
}
