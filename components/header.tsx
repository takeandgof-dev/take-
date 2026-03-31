"use client"

import Image from "next/image"
import { Menu, X, Phone, MapPin } from "lucide-react"
import { useState, useEffect } from "react"

interface HeaderProps {
  phone?: string
}

export function Header({ phone = "0722-562660" }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hasOffers, setHasOffers] = useState(false)
  const phoneDigits = phone.replace(/[^0-9]/g, "")

  useEffect(() => {
    fetch("/api/offers?active=true")
      .then((r) => r.json())
      .then((data) => setHasOffers(Array.isArray(data) && data.length > 0))
      .catch(() => setHasOffers(false))
  }, [])

  const scrollToSection = (id: string) => {
    const isHomePage = window.location.pathname === "/" || window.location.pathname === ""
    if (isHomePage) {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      window.location.href = `/#${id}`
    }
    setIsMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 shadow-2xl">
      {/* Top bar */}
      <div
        className="relative overflow-hidden"
        style={{
          backgroundImage: "url('/bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-[#1a0f0a]/90" />
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#c41e1e]" />

        <div className="relative container mx-auto px-4">
          <div className="flex items-center justify-between h-20 md:h-24">

            {/* Logo with offers badge */}
            <a href="/" className="flex items-center group shrink-0 relative">
              <Image
                src="/logo.png"
                alt="Take & Go Falkenberg"
                width={160}
                height={80}
                className="h-14 md:h-18 w-auto object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-lg"
                priority
                loading="eager"
              />
              {/* Offers badge - pulsing red dot near logo */}
              {hasOffers && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center">
                  <span className="absolute inline-flex h-4 w-4 rounded-full bg-[#c41e1e] opacity-75 animate-ping" />
                  <span className="relative inline-flex items-center justify-center h-4 w-4 rounded-full bg-[#c41e1e] text-white text-[8px] font-black shadow-lg">
                    %
                  </span>
                </span>
              )}
            </a>

            {/* Center: Tagline (desktop only) */}
            <div className="hidden lg:flex flex-col items-center gap-0.5">
              <span className="text-[#f5e6c8] text-xs uppercase tracking-[0.25em] font-semibold opacity-80">
                Pizza • Burgare • Kebab • Rullar
              </span>
              <div className="flex items-center gap-1.5 text-[#f5e6c8]/50 text-xs">
                <MapPin className="w-3 h-3" />
                <span>Falkenberg</span>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              <a
                href="/erbjudanden"
                className="relative text-sm font-bold text-[#f5e6c8] hover:text-[#c41e1e] transition-colors uppercase tracking-widest group flex items-center gap-1.5"
              >
                Erbjudanden
                {hasOffers && (
                  <span className="inline-flex h-2 w-2 rounded-full bg-[#c41e1e] animate-pulse" />
                )}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#c41e1e] group-hover:w-full transition-all duration-300" />
              </a>
              {["menu", "oppettider", "kontakt"].map((id) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className="relative text-sm font-bold text-[#f5e6c8] hover:text-[#c41e1e] transition-colors uppercase tracking-widest group"
                >
                  {id === "menu" ? "Meny" : id === "oppettider" ? "Öppettider" : "Kontakt"}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#c41e1e] group-hover:w-full transition-all duration-300" />
                </button>
              ))}

              <a
                href={`tel:${phoneDigits}`}
                className="flex items-center gap-2 bg-[#c41e1e] hover:bg-[#a51818] text-white px-5 py-2.5 rounded-sm font-bold text-sm transition-all hover:scale-105 shadow-lg shadow-[#c41e1e]/30 uppercase tracking-wide"
              >
                <Phone className="w-4 h-4" />
                {phone}
              </a>
            </nav>

            {/* Mobile: Phone + Hamburger */}
            <div className="flex md:hidden items-center gap-3">
              <a
                href={`tel:${phoneDigits}`}
                className="flex items-center gap-1.5 bg-[#c41e1e] text-white px-4 py-2 rounded-sm font-bold text-sm shadow-md"
              >
                <Phone className="w-4 h-4" />
                Ring
              </a>
              <button
                className="p-2.5 bg-[#f5e6c8]/10 hover:bg-[#f5e6c8]/20 rounded border border-[#f5e6c8]/20 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5 text-[#f5e6c8]" />
                ) : (
                  <Menu className="w-5 h-5 text-[#f5e6c8]" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c8a84b]/60" />
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div
          className="md:hidden relative overflow-hidden"
          style={{
            backgroundImage: "url('/bg.jpg')",
            backgroundSize: "cover",
          }}
        >
          <div className="absolute inset-0 bg-[#1a0f0a]/95" />
          <nav className="relative container mx-auto px-4 py-5">
            <div className="flex flex-col">
              <a
                href="/erbjudanden"
                className="text-left text-base font-bold text-[#f5e6c8] hover:text-[#c41e1e] transition-colors uppercase tracking-widest py-4 border-b border-[#f5e6c8]/10 flex items-center justify-between"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Erbjudanden</span>
                {hasOffers && (
                  <span className="flex items-center gap-1.5 text-[#c41e1e] text-xs font-bold">
                    <span className="inline-flex h-2 w-2 rounded-full bg-[#c41e1e] animate-pulse" />
                    Aktiva nu
                  </span>
                )}
              </a>
              {[
                { id: "menu", label: "Meny" },
                { id: "oppettider", label: "Öppettider" },
                { id: "kontakt", label: "Kontakt" },
              ].map(({ id, label }, i) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`text-left text-base font-bold text-[#f5e6c8] hover:text-[#c41e1e] transition-colors uppercase tracking-widest py-4 ${
                    i < 2 ? "border-b border-[#f5e6c8]/10" : ""
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
