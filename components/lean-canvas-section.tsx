"use client"

import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger)

const leanCanvasSections = [
  {
    id: "problem",
    title: "Problem",
    items: [
      {
        title: "Top 3 Problems:",
        points: [
          "Uncertain wait times leading to anxiety",
          "Static schedules don't reflect real-world traffic",
          "Overcrowding surprises at the bus stop",
        ],
      },
      {
        title: "Existing Alternatives:",
        points: [
          "WhatsApp groups for updates",
          "Calling drivers directly",
          "Waiting blindly at stops",
          "Static printed timetables",
        ],
      },
    ],
  },
  {
    id: "solution",
    title: "Solution",
    items: [
      {
        title: "Top 3 Features:",
        points: [
          "Real-time driver GPS tracking",
          "Live ETA and status updates",
          "Crowd density indicators",
        ],
      },
    ],
  },
  {
    id: "uvp",
    title: "Unique Value Proposition",
    items: [
      {
        title: "",
        points: [
          "Real-time shuttle visibility for smarter commuting",
          "Know exactly when to leave for the stop",
          "Zero hardware implementation (Driver App)",
          "Why this matters:",
          "Reduces wait time",
          "Eliminates uncertainty",
          "Improves daily productivity",
        ],
      },
    ],
  },
  {
    id: "unfair-advantage",
    title: "Unfair Advantage",
    items: [
      {
        title: "",
        points: [
          "No expensive GPS hardware required",
          "Works with existing driver smartphones",
          "Privacy-first 'On-Duty' logic",
          "Rapid deployment in campuses",
        ],
      },
    ],
  },
  {
    id: "customer-segments",
    title: "Customer Segments",
    items: [
      {
        title: "Target Customers:",
        points: [
          "University Students & Faculty",
          "Corporate Employees",
          "Transport Administrators",
        ],
      },
      {
        title: "Early Adopters:",
        points: [
          "Campus transport committees",
          "Tech-savvy commuter students",
          "Office admin teams",
        ],
      },
    ],
  },
  {
    id: "key-metrics",
    title: "Key Metrics",
    items: [
      {
        title: "",
        points: [
          "Daily Active Users (DAU)",
          "Tracking uptime percentage",
          "Average wait time reduction",
          "Passenger satisfaction score",
          "Number of tracked trips",
        ],
      },
    ],
  },
  {
    id: "channels",
    title: "Channels",
    items: [
      {
        title: "Path to Customers:",
        points: [
          "University administration partnerships",
          "Student council endorsements",
          "QR codes at bus stops",
          "Corporate HR departments",
        ],
      },
    ],
  },
  {
    id: "cost-structure",
    title: "Cost Structure",
    items: [
      {
        title: "",
        points: [
          "Server & Map API costs",
          "App development & maintenance",
          "Marketing materials",
          "Sales & onboarding",
        ],
      },
    ],
  },
  {
    id: "revenue-streams",
    title: "Revenue Streams",
    items: [
      {
        title: "",
        points: [
          "B2B SaaS Subscription (Colleges/Offices)",
          "Premium Analytics for Admins",
          "White-label licensing",
          "Future: Hardware integration fees",
        ],
      },
    ],
  },
]

export function LeanCanvasSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const [expandedSection, setExpandedSection] = useState<{
    sectionId: string
    sectionTitle: string
  } | null>(null)

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !gridRef.current) return

    const ctx = gsap.context(() => {
      // Header fade in
      gsap.from(headerRef.current, {
        opacity: 0,
        y: -20,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      })

      // Cards stagger in
      const cards = gridRef.current?.querySelectorAll(".lean-card")
      if (cards) {
        gsap.from(cards, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Handle ESC key to close expanded section
  useEffect(() => {
    if (!expandedSection) return
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setExpandedSection(null)
      }
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [expandedSection])

  const handleCardClick = (sectionId: string, sectionTitle: string) => {
    setExpandedSection({ sectionId, sectionTitle })
  }

  const handleCloseExpanded = () => {
    setExpandedSection(null)
  }

  const getExpandedSection = () => {
    if (!expandedSection) return null
    return leanCanvasSections.find((s) => s.id === expandedSection.sectionId)
  }

  const expandedSectionData = getExpandedSection()

  return (
    <section ref={sectionRef} className="relative min-h-screen md:h-screen overflow-y-auto md:overflow-hidden px-4 md:px-6 py-4 md:py-6 bg-background flex flex-col ml-0 md:ml-20">
      {/* Expanded Section Modal */}
      {expandedSection && expandedSectionData && (
        <div
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 ml-0 md:ml-20"
          onClick={handleCloseExpanded}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-auto bg-card border border-border/50 rounded-lg p-6 md:p-12 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            data-lenis-prevent
          >
            <button
              onClick={handleCloseExpanded}
              className="absolute top-4 right-4 p-2 hover:bg-accent/20 rounded-full transition-colors duration-200 text-foreground hover:text-accent"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="font-[var(--font-bebas)] text-3xl md:text-5xl tracking-tight mb-6 text-foreground pr-12">
              {expandedSection.sectionTitle}
            </h2>
            <div className="space-y-4 md:space-y-6">
              {expandedSectionData.items.map((item, itemIdx) => (
                <div
                  key={itemIdx}
                  className="bg-yellow-200 dark:bg-yellow-900/30 rounded-lg p-6 md:p-8 shadow-lg border border-yellow-300/50 dark:border-yellow-800/50"
                >
                  {item.title && (
                    <h3 className="font-mono text-lg md:text-xl font-semibold mb-4 text-foreground/90">
                      {item.title}
                    </h3>
                  )}
                  <ul className="space-y-3 md:space-y-4">
                    {item.points.map((point, pIdx) => (
                      <li key={pIdx} className="font-mono text-sm md:text-base text-foreground/80 leading-relaxed">
                        {point.startsWith("Key Numbers:") || point.startsWith("Why this matters:") ? (
                          <span className="font-semibold text-foreground block mb-2">{point}</span>
                        ) : (
                          `• ${point}`
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div ref={headerRef} className="mb-2 md:mb-4 text-center flex-shrink-0">
        <Link
          href="/"
          className="inline-block mb-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors duration-200"
        >
          ← Back to Home
        </Link>
        <h1 className="font-[var(--font-bebas)] text-3xl md:text-4xl tracking-tight">LEAN CANVAS</h1>
      </div>

      {/* Lean Canvas Grid - 3x3 layout matching the image */}
      <div
        ref={gridRef}
        className="flex-1 max-w-full mx-auto grid grid-cols-1 md:grid-cols-5 gap-2 md:gap-3 border border-border/30 bg-background p-2 md:p-3 overflow-y-auto md:overflow-auto"
        data-lenis-prevent
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '20% 33.33%',
        }}
      >
        {/* Row 1: Top 5 sections */}
        <div className="lean-card border border-border/50 bg-card p-2 md:p-3 flex flex-col">
          <h3 className="font-[var(--font-bebas)] text-base md:text-lg tracking-tight mb-2 text-foreground flex-shrink-0">
            Problem
          </h3>
          <div className="space-y-2 flex-1 overflow-auto">
            {leanCanvasSections[0].items.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleCardClick("problem", "Problem")}
                className={cn(
                  "bg-yellow-200 dark:bg-yellow-900/30 rounded-sm p-2 shadow-sm border border-yellow-300/50 dark:border-yellow-800/50",
                  "cursor-pointer transition-all duration-200",
                  "hover:border-accent hover:bg-accent/10 hover:shadow-md"
                )}
              >
                {item.title && (
                  <h4 className="font-mono text-[9px] font-semibold mb-1 text-foreground/90">
                    {item.title}
                  </h4>
                )}
                <ul className="space-y-0.5">
                  {item.points.map((point, pIdx) => (
                    <li key={pIdx} className="font-mono text-[9px] text-foreground/80 leading-tight">
                      {point.startsWith("Key Numbers:") || point.startsWith("Why this matters:") ? (
                        <span className="font-semibold">{point}</span>
                      ) : (
                        `• ${point}`
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="lean-card border border-border/50 bg-card p-2 md:p-3 flex flex-col">
          <h3 className="font-[var(--font-bebas)] text-base md:text-lg tracking-tight mb-2 text-foreground flex-shrink-0">
            Solution
          </h3>
          <div className="space-y-2 flex-1 overflow-auto">
            {leanCanvasSections[1].items.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleCardClick("solution", "Solution")}
                className={cn(
                  "bg-yellow-200 dark:bg-yellow-900/30 rounded-sm p-2 shadow-sm border border-yellow-300/50 dark:border-yellow-800/50",
                  "cursor-pointer transition-all duration-200",
                  "hover:border-accent hover:bg-accent/10 hover:shadow-md"
                )}
              >
                {item.title && (
                  <h4 className="font-mono text-[9px] font-semibold mb-1 text-foreground/90">
                    {item.title}
                  </h4>
                )}
                <ul className="space-y-0.5">
                  {item.points.map((point, pIdx) => (
                    <li key={pIdx} className="font-mono text-[9px] text-foreground/80 leading-tight">
                      {point.startsWith("Key Numbers:") || point.startsWith("Why this matters:") ? (
                        <span className="font-semibold">{point}</span>
                      ) : (
                        `• ${point}`
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="lean-card border border-border/50 bg-card p-2 md:p-3 flex flex-col">
          <h3 className="font-[var(--font-bebas)] text-base md:text-lg tracking-tight mb-2 text-foreground flex-shrink-0">
            Unique Value Proposition
          </h3>
          <div className="space-y-2 flex-1 overflow-auto">
            {leanCanvasSections[2].items.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleCardClick("uvp", "Unique Value Proposition")}
                className={cn(
                  "bg-yellow-200 dark:bg-yellow-900/30 rounded-sm p-2 shadow-sm border border-yellow-300/50 dark:border-yellow-800/50",
                  "cursor-pointer transition-all duration-200",
                  "hover:border-accent hover:bg-accent/10 hover:shadow-md"
                )}
              >
                {item.title && (
                  <h4 className="font-mono text-[9px] font-semibold mb-1 text-foreground/90">
                    {item.title}
                  </h4>
                )}
                <ul className="space-y-0.5">
                  {item.points.map((point, pIdx) => (
                    <li key={pIdx} className="font-mono text-[9px] text-foreground/80 leading-tight">
                      {point.startsWith("Key Numbers:") || point.startsWith("Why this matters:") ? (
                        <span className="font-semibold">{point}</span>
                      ) : (
                        `• ${point}`
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="lean-card border border-border/50 bg-card p-2 md:p-3 flex flex-col">
          <h3 className="font-[var(--font-bebas)] text-base md:text-lg tracking-tight mb-2 text-foreground flex-shrink-0">
            Unfair Advantage
          </h3>
          <div className="space-y-2 flex-1 overflow-auto">
            {leanCanvasSections[3].items.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleCardClick("unfair-advantage", "Unfair Advantage")}
                className={cn(
                  "bg-yellow-200 dark:bg-yellow-900/30 rounded-sm p-2 shadow-sm border border-yellow-300/50 dark:border-yellow-800/50",
                  "cursor-pointer transition-all duration-200",
                  "hover:border-accent hover:bg-accent/10 hover:shadow-md"
                )}
              >
                {item.title && (
                  <h4 className="font-mono text-[9px] font-semibold mb-1 text-foreground/90">
                    {item.title}
                  </h4>
                )}
                <ul className="space-y-0.5">
                  {item.points.map((point, pIdx) => (
                    <li key={pIdx} className="font-mono text-[9px] text-foreground/80 leading-tight">
                      {point.startsWith("Key Numbers:") || point.startsWith("Why this matters:") ? (
                        <span className="font-semibold">{point}</span>
                      ) : (
                        `• ${point}`
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="lean-card border border-border/50 bg-card p-2 md:p-3 flex flex-col">
          <h3 className="font-[var(--font-bebas)] text-base md:text-lg tracking-tight mb-2 text-foreground flex-shrink-0">
            Customer Segments
          </h3>
          <div className="space-y-2 flex-1 overflow-auto">
            {leanCanvasSections[4].items.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleCardClick("customer-segments", "Customer Segments")}
                className={cn(
                  "bg-yellow-200 dark:bg-yellow-900/30 rounded-sm p-2 shadow-sm border border-yellow-300/50 dark:border-yellow-800/50",
                  "cursor-pointer transition-all duration-200",
                  "hover:border-accent hover:bg-accent/10 hover:shadow-md"
                )}
              >
                {item.title && (
                  <h4 className="font-mono text-[9px] font-semibold mb-1 text-foreground/90">
                    {item.title}
                  </h4>
                )}
                <ul className="space-y-0.5">
                  {item.points.map((point, pIdx) => (
                    <li key={pIdx} className="font-mono text-[9px] text-foreground/80 leading-tight">
                      {point.startsWith("Key Numbers:") || point.startsWith("Why this matters:") ? (
                        <span className="font-semibold">{point}</span>
                      ) : (
                        `• ${point}`
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Key Metrics and Channels */}
        <div className="lean-card border border-border/50 bg-card p-2 md:p-3 flex flex-col md:col-span-2">
          <h3 className="font-[var(--font-bebas)] text-base md:text-lg tracking-tight mb-2 text-foreground flex-shrink-0">
            Key Metrics
          </h3>
          <div className="space-y-2 flex-1 overflow-auto">
            {leanCanvasSections[5].items.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleCardClick("key-metrics", "Key Metrics")}
                className={cn(
                  "bg-yellow-200 dark:bg-yellow-900/30 rounded-sm p-2 shadow-sm border border-yellow-300/50 dark:border-yellow-800/50",
                  "cursor-pointer transition-all duration-200",
                  "hover:border-accent hover:bg-accent/10 hover:shadow-md"
                )}
              >
                {item.title && (
                  <h4 className="font-mono text-[9px] font-semibold mb-1 text-foreground/90">
                    {item.title}
                  </h4>
                )}
                <ul className="space-y-0.5">
                  {item.points.map((point, pIdx) => (
                    <li key={pIdx} className="font-mono text-[9px] text-foreground/80 leading-tight">
                      {point.startsWith("Key Numbers:") || point.startsWith("Why this matters:") ? (
                        <span className="font-semibold">{point}</span>
                      ) : (
                        `• ${point}`
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="lean-card border border-border/50 bg-card p-2 md:p-3 flex flex-col md:col-span-2">
          <h3 className="font-[var(--font-bebas)] text-base md:text-lg tracking-tight mb-2 text-foreground flex-shrink-0">
            Channels
          </h3>
          <div className="space-y-2 flex-1 overflow-auto">
            {leanCanvasSections[6].items.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleCardClick("channels", "Channels")}
                className={cn(
                  "bg-yellow-200 dark:bg-yellow-900/30 rounded-sm p-2 shadow-sm border border-yellow-300/50 dark:border-yellow-800/50",
                  "cursor-pointer transition-all duration-200",
                  "hover:border-accent hover:bg-accent/10 hover:shadow-md"
                )}
              >
                {item.title && (
                  <h4 className="font-mono text-[9px] font-semibold mb-1 text-foreground/90">
                    {item.title}
                  </h4>
                )}
                <ul className="space-y-0.5">
                  {item.points.map((point, pIdx) => (
                    <li key={pIdx} className="font-mono text-[9px] text-foreground/80 leading-tight">
                      {point.startsWith("Key Numbers:") || point.startsWith("Why this matters:") ? (
                        <span className="font-semibold">{point}</span>
                      ) : (
                        `• ${point}`
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="lean-card border border-border/50 bg-card p-2 md:p-3"></div>

        {/* Row 3: Cost Structure and Revenue Streams */}
        <div className="lean-card border border-border/50 bg-card p-2 md:p-3 flex flex-col md:col-span-2">
          <h3 className="font-[var(--font-bebas)] text-base md:text-lg tracking-tight mb-2 text-foreground flex-shrink-0">
            Cost Structure
          </h3>
          <div className="space-y-2 flex-1 overflow-auto">
            {leanCanvasSections[7].items.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleCardClick("cost-structure", "Cost Structure")}
                className={cn(
                  "bg-yellow-200 dark:bg-yellow-900/30 rounded-sm p-2 shadow-sm border border-yellow-300/50 dark:border-yellow-800/50",
                  "cursor-pointer transition-all duration-200",
                  "hover:border-accent hover:bg-accent/10 hover:shadow-md"
                )}
              >
                {item.title && (
                  <h4 className="font-mono text-[9px] font-semibold mb-1 text-foreground/90">
                    {item.title}
                  </h4>
                )}
                <ul className="space-y-0.5">
                  {item.points.map((point, pIdx) => (
                    <li key={pIdx} className="font-mono text-[9px] text-foreground/80 leading-tight">
                      {point.startsWith("Key Numbers:") || point.startsWith("Why this matters:") ? (
                        <span className="font-semibold">{point}</span>
                      ) : (
                        `• ${point}`
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="lean-card border border-border/50 bg-card p-2 md:p-3 flex flex-col md:col-span-3">
          <h3 className="font-[var(--font-bebas)] text-base md:text-lg tracking-tight mb-2 text-foreground flex-shrink-0">
            Revenue Streams
          </h3>
          <div className="space-y-2 flex-1 overflow-auto">
            {leanCanvasSections[8].items.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleCardClick("revenue-streams", "Revenue Streams")}
                className={cn(
                  "bg-yellow-200 dark:bg-yellow-900/30 rounded-sm p-2 shadow-sm border border-yellow-300/50 dark:border-yellow-800/50",
                  "cursor-pointer transition-all duration-200",
                  "hover:border-accent hover:bg-accent/10 hover:shadow-md"
                )}
              >
                {item.title && (
                  <h4 className="font-mono text-[9px] font-semibold mb-1 text-foreground/90">
                    {item.title}
                  </h4>
                )}
                <ul className="space-y-0.5">
                  {item.points.map((point, pIdx) => (
                    <li key={pIdx} className="font-mono text-[9px] text-foreground/80 leading-tight">
                      {point.startsWith("Key Numbers:") || point.startsWith("Why this matters:") ? (
                        <span className="font-semibold">{point}</span>
                      ) : (
                        `• ${point}`
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
