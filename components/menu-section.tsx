"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import type { MenuCategory, MenuItem } from "@/lib/types"
import { Leaf, Flame, ChevronRight } from "lucide-react"
import Image from "next/image"

interface MenuSectionProps {
  categories: MenuCategory[]
  items: MenuItem[]
}

function getCategoryEmoji(categoryId: string, categories: MenuCategory[]): string {
  const category = categories.find(c => c.id === categoryId)
  const slug = category?.slug?.toLowerCase() || ""
  const name = category?.name?.toLowerCase() || ""
  
  if (slug.includes("burger") || slug.includes("burgare") || name.includes("burger") || name.includes("burgare")) {
    return "🍔"
  }
  if (slug.includes("nugget") || name.includes("nugget")) {
    return "🍗"
  }
  if (slug.includes("shawarma") || name.includes("shawarma")) {
    return "🥙"
  }
  if (slug.includes("tallrik") || name.includes("tallrik")) {
    return "🍽️"
  }
  if ((slug.includes("rull") || name.includes("rull")) && !slug.includes("pizza") && !name.includes("pizza")) {
    return "🌯"
  }
  if (slug.includes("pizza") || name.includes("pizza") || slug.includes("oxfile") || slug.includes("special")) {
    return "🍕"
  }
  if (slug.includes("kebab") || name.includes("kebab")) {
    return "🥙"
  }
  
  return "🍕"
}

function MobileMenuItem({ item, categories }: { item: MenuItem; categories: MenuCategory[] }) {
  const [imageError, setImageError] = useState(false)

  return (
    <div className="flex items-center gap-3 p-3 bg-white/90 rounded-xl border border-border/30 active:scale-[0.98] transition-transform">
      {item.image_url && !imageError ? (
        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
          <Image
            src={item.image_url}
            alt={item.name}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
          />
        </div>
      ) : (
        <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-[#c41e1e]/10 to-[#c8a84b]/10 flex-shrink-0 flex items-center justify-center">
          <span className="text-2xl">{getCategoryEmoji(item.category_id, categories)}</span>
        </div>
      )}

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-foreground text-sm leading-tight line-clamp-1">{item.name}</h3>
          <div className="flex gap-1 flex-shrink-0">
            {item.is_veg && <Leaf className="w-3.5 h-3.5 text-green-600" />}
            {item.is_spicy && <Flame className="w-3.5 h-3.5 text-red-500" />}
          </div>
        </div>
        {item.description && (
          <p className="text-xs text-muted-foreground/70 line-clamp-1 mt-0.5">{item.description}</p>
        )}
        <div className="flex items-center gap-2 mt-1.5">
          <span className="font-bold text-[#c41e1e] text-sm">{item.price}</span>
          {item.family_price && (
            <span className="text-xs text-muted-foreground">Familj: {item.family_price}</span>
          )}
        </div>
      </div>

      <ChevronRight className="w-4 h-4 text-muted-foreground/40 flex-shrink-0" />
    </div>
  )
}

function DesktopMenuCard({ item, index }: { item: MenuItem; index: number }) {
  const [imageError, setImageError] = useState(false)

  return (
    <div 
      className="h-full bg-white/90 backdrop-blur-sm border border-border/50 hover:border-[#c41e1e] hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-xl overflow-hidden group flex flex-col"
      style={{ animationDelay: `${index * 30}ms` }}
    >
      {item.image_url && !imageError ? (
        <div className="relative w-full h-48 bg-gradient-to-br from-gray-100 to-gray-50 overflow-hidden">
          <Image
            src={item.image_url}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImageError(true)}
          />
        </div>
      ) : null}

      <div className="p-4 flex flex-col flex-grow">
        <div className="mb-2">
          <h3 className="font-bold text-foreground text-lg leading-tight mb-1.5">{item.name}</h3>
          <div className="flex gap-1.5 flex-wrap">
            {item.is_veg && (
              <Badge className="bg-green-100 text-green-700 border-green-200 text-xs gap-1 py-0.5">
                <Leaf className="w-3 h-3" />
                Veg
              </Badge>
            )}
            {item.is_spicy && (
              <Badge className="bg-red-100 text-red-700 border-red-200 text-xs gap-1 py-0.5">
                <Flame className="w-3 h-3" />
                Stark
              </Badge>
            )}
          </div>
        </div>

        {item.description && (
          <p className="text-sm text-muted-foreground/70 mb-3 line-clamp-2 leading-relaxed">{item.description}</p>
        )}

        <div className="mt-auto pt-3 border-t border-border/30 flex items-end justify-between gap-2">
          <div>
            <p className="text-xs text-muted-foreground/50 mb-0.5">Pris</p>
            <p className="font-bold text-xl text-[#c41e1e]">{item.price}</p>
          </div>
          {item.family_price && (
            <div className="text-right">
              <p className="text-xs text-muted-foreground/50 mb-0.5">Familj</p>
              <p className="font-bold text-lg text-[#c41e1e]">{item.family_price}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function MenuSection({ categories, items }: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id || "")

  function getItemsByCategory(categoryId: string) {
    return items.filter((item) => item.category_id === categoryId).sort((a, b) => a.display_order - b.display_order)
  }

  const activeItems = getItemsByCategory(activeCategory)
  const activeCategoryData = categories.find(c => c.id === activeCategory)

  return (
    <section id="menu" className="py-6 sm:py-12 md:py-20 relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 sm:w-96 sm:h-96 bg-[#c41e1e]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-[#c8a84b]/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-3 sm:px-4 relative z-10">
        <div className="text-center mb-5 sm:mb-10">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-foreground mb-2 sm:mb-4 uppercase tracking-wide">
            Var Meny
          </h2>
          <div className="flex justify-center gap-1.5 sm:gap-2 mb-3 sm:mb-5">
            <div className="w-6 sm:w-10 h-0.5 sm:h-1 bg-[#c41e1e] rounded-full" />
            <div className="w-6 sm:w-10 h-0.5 sm:h-1 bg-[#c8a84b] rounded-full" />
            <div className="w-6 sm:w-10 h-0.5 sm:h-1 bg-[#c41e1e] rounded-full" />
          </div>
          <p className="text-muted-foreground text-xs sm:text-base max-w-xl mx-auto px-2 hidden sm:block">
            Valj bland vara autentiska pizzor, lackra burgare, saftiga rullar och mycket mer!
          </p>
        </div>

        <div className="sticky top-0 z-20 -mx-3 sm:mx-0 px-3 sm:px-0 py-2 sm:py-3 bg-background/95 backdrop-blur-md mb-4 sm:mb-8 border-b sm:border-none border-border/30">
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex gap-2 sm:gap-3 pb-1">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`
                    px-3 sm:px-5 py-2 sm:py-2.5 rounded-full font-semibold text-xs sm:text-sm transition-all duration-200 whitespace-nowrap
                    ${activeCategory === category.id 
                      ? "bg-[#c41e1e] text-white shadow-md shadow-[#c41e1e]/25" 
                      : "bg-white/80 border border-border/50 text-foreground active:bg-gray-100"
                    }
                  `}
                >
                  {category.name}
                </button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="h-1.5" />
          </ScrollArea>
        </div>

        <div className="flex items-center justify-between mb-3 sm:mb-6 px-1">
          <h3 className="text-lg sm:text-2xl font-bold text-[#c41e1e] flex items-center gap-2 uppercase tracking-wide">
            <span className="w-1 h-6 sm:h-8 bg-[#c41e1e] rounded-full" />
            {activeCategoryData?.name}
          </h3>
          <span className="text-xs sm:text-sm text-muted-foreground/60 bg-muted/50 px-2 py-1 rounded-full">
            {activeItems.length} st
          </span>
        </div>

        <div className="flex flex-col gap-2 sm:hidden">
          {activeItems.map((item) => (
            <MobileMenuItem key={item.id} item={item} categories={categories} />
          ))}
        </div>

        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
          {activeItems.map((item, index) => (
            <DesktopMenuCard key={item.id} item={item} index={index} />
          ))}
        </div>

        {activeItems.length === 0 && (
          <div className="text-center py-10 sm:py-16">
            <p className="text-muted-foreground text-sm sm:text-lg">Inga ratter i denna kategori</p>
          </div>
        )}
      </div>
    </section>
  )
}
