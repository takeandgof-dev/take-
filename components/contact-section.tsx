"use client"

import { Phone, MapPin, Navigation, Clock, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface ContactSectionProps {
  phone?: string
  address?: string
}

export function ContactSection({ phone = "0722-562660", address = "Falkenberg" }: ContactSectionProps) {
  const phoneDigits = phone.replace(/[^0-9]/g, "")
  
  return (
    <section id="kontakt" className="py-8 sm:py-16 md:py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#c41e1e]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#c8a84b]/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-3 sm:px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#1a0f0a] mb-2 sm:mb-3">
            Kontakta Oss
          </h2>
          <div className="flex justify-center gap-1.5 sm:gap-2 mb-3">
            <div className="w-6 sm:w-10 h-0.5 sm:h-1 bg-[#c41e1e] rounded-full" />
            <div className="w-6 sm:w-10 h-0.5 sm:h-1 bg-[#c8a84b] rounded-full" />
            <div className="w-6 sm:w-10 h-0.5 sm:h-1 bg-[#c41e1e] rounded-full" />
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="sm:hidden space-y-3">
          {/* Call Button - Big and prominent */}
          <a
            href={`tel:${phoneDigits}`}
            className="flex items-center gap-4 w-full bg-gradient-to-r from-[#c41e1e] to-[#a51818] rounded-2xl p-4 shadow-lg shadow-[#c41e1e]/25 active:scale-[0.98] transition-transform"
          >
            <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <Phone className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <span className="block text-white/80 text-xs font-semibold uppercase tracking-wider">Ring & Bestall</span>
              <span className="block text-white text-2xl font-bold">{phone}</span>
            </div>
          </a>

          {/* Visit Us - Fun card with illustration feel */}
          <div className="bg-gradient-to-br from-[#f5e6c8] to-[#f5e6c8]/60 rounded-2xl p-4 border border-[#c8a84b]/30 relative overflow-hidden">
            {/* Fun decorative elements */}
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#c41e1e]/10 rounded-full" />
            <div className="absolute -left-2 -bottom-2 w-16 h-16 bg-[#c8a84b]/20 rounded-full" />
            
            <div className="relative">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
                  <MapPin className="w-6 h-6 text-[#c41e1e]" />
                </div>
                <div>
                  <h3 className="text-[#1a0f0a] font-bold text-lg">Besok Oss!</h3>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-[#c8a84b] fill-[#c8a84b]" />
                    <Star className="w-3 h-3 text-[#c8a84b] fill-[#c8a84b]" />
                    <Star className="w-3 h-3 text-[#c8a84b] fill-[#c8a84b]" />
                    <Star className="w-3 h-3 text-[#c8a84b] fill-[#c8a84b]" />
                    <Star className="w-3 h-3 text-[#c8a84b] fill-[#c8a84b]" />
                  </div>
                </div>
              </div>
              
              <p className="text-[#3d2a1e] font-bold text-xl mb-1">Take & Go</p>
              <p className="text-[#3d2a1e]/60 text-sm mb-4">{address}, Sverige</p>
              
              <a 
                href="https://www.google.com/maps/search/Take+%26+Go+Falkenberg"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-[#1a0f0a] text-white rounded-xl p-3 font-semibold active:scale-[0.98] transition-transform"
              >
                <Navigation className="w-5 h-5" />
                <span>Hitta hit</span>
              </a>
            </div>
          </div>

          {/* Opening Hours - Compact grid */}
          <div className="bg-white/90 rounded-2xl p-4 border border-border/30">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-[#c41e1e]" />
              <h3 className="text-[#1a0f0a] font-bold">Oppettider</h3>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-[#f5e6c8]/50 rounded-lg p-2.5 text-center">
                <span className="block text-[#3d2a1e]/50 text-xs mb-0.5">Man-Tor</span>
                <span className="block text-[#1a0f0a] font-bold">11:00-21:00</span>
              </div>
              <div className="bg-[#f5e6c8]/50 rounded-lg p-2.5 text-center">
                <span className="block text-[#3d2a1e]/50 text-xs mb-0.5">Fredag</span>
                <span className="block text-[#1a0f0a] font-bold">11:00-22:00</span>
              </div>
              <div className="bg-[#f5e6c8]/50 rounded-lg p-2.5 text-center">
                <span className="block text-[#3d2a1e]/50 text-xs mb-0.5">Lordag</span>
                <span className="block text-[#1a0f0a] font-bold">12:00-22:00</span>
              </div>
              <div className="bg-[#f5e6c8]/50 rounded-lg p-2.5 text-center">
                <span className="block text-[#3d2a1e]/50 text-xs mb-0.5">Sondag</span>
                <span className="block text-[#1a0f0a] font-bold">12:00-21:00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden sm:block max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Phone Card */}
            <a 
              href={`tel:${phoneDigits}`}
              className="group relative bg-gradient-to-br from-[#c41e1e] to-[#a51818] rounded-3xl p-8 text-center shadow-xl shadow-[#c41e1e]/20 hover:shadow-2xl hover:shadow-[#c41e1e]/30 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
              
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Phone className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">Ring & Bestall</h3>
                <p className="text-white/70 mb-4 text-sm">Snabb service - vi svarar alltid!</p>
                <span className="inline-block text-3xl font-bold text-white">{phone}</span>
              </div>
            </a>

            {/* Visit Card - More fun design */}
            <div className="group relative bg-gradient-to-br from-[#f5e6c8] to-[#f5e6c8]/60 rounded-3xl p-8 text-center border border-[#c8a84b]/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
              {/* Decorative circles */}
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-[#c41e1e]/10 rounded-full" />
              <div className="absolute -left-4 -bottom-4 w-24 h-24 bg-[#c8a84b]/20 rounded-full" />
              
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-md">
                  <MapPin className="w-10 h-10 text-[#c41e1e]" />
                </div>
                
                {/* Star rating */}
                <div className="flex justify-center gap-1 mb-3">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-4 h-4 text-[#c8a84b] fill-[#c8a84b]" />
                  ))}
                </div>
                
                <h3 className="text-xl font-bold text-[#1a0f0a] mb-2 uppercase tracking-wide">Besok Oss!</h3>
                <p className="text-2xl font-bold text-[#1a0f0a] mb-1">Take & Go</p>
                <p className="text-[#3d2a1e]/60 mb-6">{address}, Sverige</p>
                
                <a 
                  href="https://www.google.com/maps/search/Take+%26+Go+Falkenberg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button 
                    variant="outline"
                    size="lg" 
                    className="gap-2 rounded-full font-semibold min-h-[52px] px-8 bg-[#1a0f0a] text-white border-0 hover:bg-[#2d1f15] transition-all"
                  >
                    <Navigation className="w-5 h-5" />
                    Hitta hit
                  </Button>
                </a>
              </div>
            </div>
          </div>

          {/* Final CTA Banner */}
          <div className="mt-10 relative overflow-hidden rounded-3xl bg-[#1a0f0a]">
            <div className="p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-[#f5e6c8] mb-2">
                  Hungrig nu?
                </h3>
                <p className="text-[#f5e6c8]/70 max-w-md">
                  Ring oss direkt sa fixar vi din bestallning!
                </p>
              </div>
              <a href={`tel:${phoneDigits}`}>
                <Button 
                  size="lg" 
                  className="bg-[#c41e1e] hover:bg-[#a51818] text-white gap-2 rounded-full font-bold text-lg min-h-[56px] px-10 shadow-xl shadow-[#c41e1e]/30 hover:scale-105 transition-all"
                >
                  <Phone className="w-6 h-6" />
                  Ring nu!
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
