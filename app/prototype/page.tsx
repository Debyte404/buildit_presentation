"use client"

import Link from "next/link"
import { AnimatedNoise } from "@/components/animated-noise"
import { ScrambleTextOnHover } from "@/components/scramble-text"

export default function PrototypePage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-background p-6">
      <AnimatedNoise opacity={0.05} />
      
      <div className="text-center space-y-8 z-10">
        <h1 className="font-[var(--font-bebas)] text-6xl md:text-9xl tracking-tight text-foreground">
          COMING SOON
        </h1>
        
        <div className="font-mono text-xl md:text-2xl text-accent tracking-[0.2em]">
          FEB 13
        </div>

        <p className="max-w-md mx-auto font-mono text-sm text-muted-foreground leading-relaxed">
          The STEELPATH prototype is currently under development for the upcoming hackathon. 
          Check back soon for the live demo.
        </p>

        <div className="pt-8">
          <Link 
            href="/"
            className="inline-flex items-center justify-center border border-foreground/20 px-8 py-4 font-mono text-xs uppercase tracking-widest text-foreground hover:border-accent hover:text-accent transition-all duration-200"
          >
            <ScrambleTextOnHover text="BACK TO HOME" as="span" duration={0.6} />
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 text-center">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/40">
          STEELPATH | PROTOTYPE
        </span>
      </div>
    </main>
  )
}
