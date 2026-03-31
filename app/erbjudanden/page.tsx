"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { OffersDisplay } from "@/components/offers-display"
import Image from "next/image"

const siteSettings = {
  restaurant_name: "Take & Go Falkenberg",
  phone: "0722-562660",
  address: "Falkenberg",
}

export default function OffersPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header phone={siteSettings.phone} />

      {/* Hero Section with bg texture */}
      <div
        className="relative py-16 md:py-20 overflow-hidden"
        style={{
          backgroundImage: "url('/bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-[#1a0f0a]/88" />

        {/* Gold top accent */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#c8a84b]" />

        <div className="relative container mx-auto px-4 text-center">
          <Image
            src="/logo.png"
            alt="Take & Go Falkenberg"
            width={180}
            height={180}
            className="mx-auto mb-6 drop-shadow-2xl"
            priority
          />
          <h1 className="text-4xl md:text-5xl font-bold text-[#f5e6c8] mb-2 tracking-tight">
            Erbjudanden
          </h1>
          <div className="w-16 h-[3px] bg-[#c41e1e] mx-auto my-4 rounded-full" />
          <p className="text-[#f5e6c8]/65 text-base md:text-lg max-w-md mx-auto">
            Kolla våra bästa erbjudanden just nu
          </p>
        </div>
      </div>

      {/* Offers Content */}
      <div className="flex-1">
        <OffersDisplay />
      </div>

      <Footer restaurantName={siteSettings.restaurant_name} />
    </main>
  )
}
