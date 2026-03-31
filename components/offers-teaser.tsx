"use client"

import { useState, useEffect } from "react"
import { Tag, ArrowRight } from "lucide-react"
import type { Offer } from "@/lib/types"

export function OffersTeaser() {
  const [offers, setOffers] = useState<Offer[]>([])
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    fetch("/api/offers?active=true")
      .then((r) => r.json())
      .then((data) => Array.isArray(data) ? setOffers(data) : setOffers([]))
      .catch(() => setOffers([]))
  }, [])

  useEffect(() => {
    if (offers.length <= 1) return
    const t = setInterval(() => setCurrent((c) => (c + 1) % offers.length), 4000)
    return () => clearInterval(t)
  }, [offers.length])

  if (offers.length === 0) return null

  const offer = offers[current]

  return (
    <a
      href="/erbjudanden"
      className="block w-full group"
      aria-label="Se aktuella erbjudanden"
    >
      <div
        className="relative overflow-hidden"
        style={{
          backgroundImage: "url('/bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark amber overlay for warmth */}
        <div className="absolute inset-0 bg-[#c41e1e]/90" />

        <div className="relative container mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-[#f5e6c8]/20 border border-[#f5e6c8]/30">
              <Tag className="w-4 h-4 text-[#f5e6c8]" />
            </div>
            <div className="min-w-0">
              <span className="text-[#f5e6c8]/70 text-xs uppercase tracking-widest font-semibold mr-2 hidden sm:inline">
                Erbjudande:
              </span>
              <span className="text-[#f5e6c8] font-bold text-sm md:text-base truncate">
                {offer.title}
              </span>
              {offer.description && (
                <span className="text-[#f5e6c8]/70 text-xs ml-2 hidden md:inline truncate">
                  — {offer.description}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {offer.discount_percent && (
              <span className="bg-[#f5e6c8] text-[#c41e1e] text-xs font-bold px-2 py-0.5 rounded-full">
                -{offer.discount_percent}%
              </span>
            )}
            {offer.price && (
              <span className="text-[#f5e6c8] font-bold text-sm hidden sm:inline">
                {offer.price} kr
              </span>
            )}
            <span className="text-[#f5e6c8]/70 text-xs uppercase tracking-widest font-semibold group-hover:text-[#f5e6c8] transition-colors flex items-center gap-1">
              Se alla <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </div>

        {/* Dot indicators for multiple offers */}
        {offers.length > 1 && (
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1">
            {offers.map((_, i) => (
              <span
                key={i}
                className={`w-1 h-1 rounded-full transition-all ${
                  i === current ? "bg-[#f5e6c8] w-3" : "bg-[#f5e6c8]/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </a>
  )
}
