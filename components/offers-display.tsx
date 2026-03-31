"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Tag, Clock, ArrowRight } from "lucide-react"
import type { Offer } from "@/lib/types"

export function OffersDisplay() {
  const [offers, setOffers] = useState<Offer[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch("/api/offers")
        if (response.ok) {
          const data = await response.json()
          setOffers(Array.isArray(data) ? data : [])
        }
      } catch {
        setOffers([])
      } finally {
        setLoading(false)
      }
    }
    fetchOffers()
    const interval = setInterval(fetchOffers, 10000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div
        className="min-h-[40vh] flex items-center justify-center"
        style={{ backgroundImage: "url('/bg.jpg')", backgroundSize: "cover" }}
      >
        <div className="absolute inset-0 bg-white/70" />
        <p className="relative text-[#3d2a1e]/60 font-semibold tracking-wide">Laddar erbjudanden...</p>
      </div>
    )
  }

  return (
    <div
      className="relative min-h-[40vh] py-14 px-4"
      style={{ backgroundImage: "url('/bg.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="absolute inset-0 bg-white/65" />

      <div className="relative max-w-5xl mx-auto">
        {offers.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex flex-col items-center gap-4 bg-white/90 border border-[#c8a84b]/30 rounded-2xl shadow-md px-10 py-10">
              <Tag className="w-10 h-10 text-[#c41e1e]/40" />
              <p className="text-lg font-bold text-[#3d2a1e]">Inga aktiva erbjudanden just nu</p>
              <p className="text-sm text-[#3d2a1e]/55">Kom tillbaka snart – spännande erbjudanden är på väg!</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offers.map((offer) => (
              <div
                key={offer.id}
                className="group relative bg-white/90 border border-[#c8a84b]/25 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image or placeholder */}
                {offer.image_url ? (
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={offer.image_url}
                      alt={offer.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f0a]/60 to-transparent" />
                  </div>
                ) : (
                  <div
                    className="relative h-48 w-full overflow-hidden flex items-center justify-center"
                    style={{ backgroundImage: "url('/bg.jpg')", backgroundSize: "cover" }}
                  >
                    <div className="absolute inset-0 bg-[#c41e1e]/80" />
                    <div className="relative flex flex-col items-center gap-2">
                      <Tag className="w-10 h-10 text-[#f5e6c8]" />
                      <span className="text-[#f5e6c8] font-bold text-sm uppercase tracking-widest">Erbjudande</span>
                    </div>
                  </div>
                )}

                {/* Discount badge */}
                {offer.discount_percent && (
                  <div className="absolute top-3 right-3 bg-[#c41e1e] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    -{offer.discount_percent}%
                  </div>
                )}

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-[#1a0f0a] mb-1 leading-snug">{offer.title}</h3>

                  {offer.description && (
                    <p className="text-sm text-[#3d2a1e]/65 mb-3 leading-relaxed">{offer.description}</p>
                  )}

                  <div className="flex items-center justify-between flex-wrap gap-2 mt-3 pt-3 border-t border-[#c8a84b]/20">
                    {offer.price ? (
                      <span className="text-xl font-bold text-[#c41e1e]">{offer.price} kr</span>
                    ) : (
                      <span />
                    )}

                    {(offer.valid_from || offer.valid_until) && (
                      <div className="flex items-center gap-1 text-xs text-[#3d2a1e]/50">
                        <Clock className="w-3 h-3" />
                        <span>
                          {offer.valid_from && `fr. ${new Date(offer.valid_from).toLocaleDateString("sv-SE")}`}
                          {offer.valid_from && offer.valid_until && " – "}
                          {offer.valid_until && `t.o.m. ${new Date(offer.valid_until).toLocaleDateString("sv-SE")}`}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Back to menu link */}
        <div className="text-center mt-10">
          <a
            href="/#menu"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#c41e1e] hover:text-[#a51818] uppercase tracking-widest transition-colors group"
          >
            Se hela menyn
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  )
}
