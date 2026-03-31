import Image from "next/image"
import { Phone, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeroProps {
  restaurantName?: string
  phone?: string
}

export function Hero({ restaurantName = "Take & Go Falkenberg", phone = "0722-562660" }: HeroProps) {
  const phoneDigits = phone.replace(/[^0-9]/g, "")
  
  return (
    <section className="relative overflow-hidden">

      {/* Main Hero Content */}
      <div className="relative container mx-auto px-3 sm:px-4 py-6 sm:py-10 md:py-14">
        {/* Logo - Smaller on mobile */}
        <div className="flex flex-col items-center text-center mb-6 sm:mb-8">
          <div className="relative mb-3 sm:mb-4">
            <Image
              src="/logo.png"
              alt={restaurantName}
              width={200}
              height={200}
              className="w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 drop-shadow-xl"
              priority
            />
          </div>
          <p className="text-xs sm:text-base text-[#3d2a1e]/60 font-medium tracking-widest uppercase">
            Pizza &bull; Burgare &bull; Kebab
          </p>
        </div>

        {/* Mobile: Stacked call-to-action */}
        <div className="sm:hidden space-y-3 mb-4">
          {/* Big Call Button */}
          <a
            href={`tel:${phoneDigits}`}
            className="flex items-center justify-center gap-3 w-full bg-[#c41e1e] hover:bg-[#a51818] active:scale-[0.98] rounded-xl p-4 shadow-lg shadow-[#c41e1e]/20 transition-all"
          >
            <Phone className="w-6 h-6 text-white" />
            <div className="text-left">
              <span className="block text-white/80 text-xs font-medium uppercase tracking-wide">Ring & Beställ</span>
              <span className="block text-white text-lg font-bold">{phone}</span>
            </div>
          </a>

          {/* Info Row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 bg-white/80 rounded-xl p-3 border border-[#c8a84b]/20">
              <MapPin className="w-5 h-5 text-[#c41e1e] flex-shrink-0" />
              <div className="min-w-0">
                <span className="block text-[#3d2a1e] text-xs font-bold truncate">Falkenberg</span>
                <span className="block text-[#3d2a1e]/50 text-xs">Sverige</span>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white/80 rounded-xl p-3 border border-[#c8a84b]/20">
              <Clock className="w-5 h-5 text-[#c41e1e] flex-shrink-0" />
              <div className="min-w-0">
                <span className="block text-[#3d2a1e] text-xs font-bold">11:00–22:00</span>
                <span className="block text-[#3d2a1e]/50 text-xs">Alla dagar</span>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop: Three column cards */}
        <div className="hidden sm:grid sm:grid-cols-3 gap-4 mb-8">
          <a
            href={`tel:${phoneDigits}`}
            className="group flex flex-col items-center justify-center gap-2 bg-[#c41e1e] hover:bg-[#a51818] rounded-xl p-5 md:p-6 text-center transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-[#c41e1e]/20"
          >
            <Phone className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
            <span className="text-white font-bold text-xs md:text-sm uppercase tracking-wide">Ring & Beställ</span>
            <span className="text-white text-lg md:text-xl font-bold">{phone}</span>
          </a>

          <div className="flex flex-col items-center justify-center gap-2 bg-white/80 border border-[#c8a84b]/30 rounded-xl p-5 md:p-6 text-center shadow-sm hover:shadow-md transition-shadow">
            <MapPin className="w-7 h-7 text-[#c41e1e]" />
            <span className="text-[#3d2a1e] font-bold text-xs md:text-sm uppercase tracking-wide">Hitta hit</span>
            <span className="text-[#3d2a1e]/60 text-sm">Falkenberg, Sverige</span>
          </div>

          <div className="flex flex-col items-center justify-center gap-2 bg-white/80 border border-[#c8a84b]/30 rounded-xl p-5 md:p-6 text-center shadow-sm hover:shadow-md transition-shadow">
            <Clock className="w-7 h-7 text-[#c41e1e]" />
            <span className="text-[#3d2a1e] font-bold text-xs md:text-sm uppercase tracking-wide">Öppettider</span>
            <span className="text-[#3d2a1e]/60 text-sm">Mån–Sön 11:00–22:00</span>
          </div>
        </div>

        {/* CTA Banner - Hidden on mobile, shown on desktop */}
        <div className="hidden sm:block relative rounded-xl overflow-hidden bg-[#1a0f0a]">
          <div className="p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-[#f5e6c8] mb-1">Hungrig?</h2>
              <p className="text-[#f5e6c8]/65 text-sm">Ring oss nu – snabb service och läcker mat!</p>
            </div>
            <a href={`tel:${phoneDigits}`}>
              <Button
                size="lg"
                className="bg-[#c41e1e] hover:bg-[#a51818] text-white rounded-sm font-bold text-base px-8 py-5 shadow-lg shadow-[#c41e1e]/30 transition-all hover:scale-105 uppercase tracking-wide"
              >
                <Phone className="w-5 h-5 mr-2" />
                {phone}
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
