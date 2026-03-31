import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { OffersTeaser } from "@/components/offers-teaser"
import { MenuSection } from "@/components/menu-section"
import { OpeningHours } from "@/components/opening-hours"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { getCategories, getMenuItems } from "@/lib/neon/menu-service"

// Site settings
const siteSettings = {
  restaurant_name: "Take & Go Falkenberg",
  phone: "0722-562660",
  address: "Falkenberg",
  opening_weekdays: "11:00 - 21:00",
  opening_friday: "11:00 - 22:00",
  opening_saturday: "12:00 - 22:00",
  opening_sunday: "12:00 - 21:00",
}

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function Home() {
  // Fetch menu data from Neon
  const [categories, items] = await Promise.all([
    getCategories(),
    getMenuItems(true), // Only available items
  ])

  return (
    <main className="min-h-screen">
      <Header phone={siteSettings.phone} />
      <OffersTeaser />
      <Hero restaurantName={siteSettings.restaurant_name} phone={siteSettings.phone} />
      <MenuSection categories={categories} items={items} />
      <OpeningHours settings={siteSettings} />
      <ContactSection phone={siteSettings.phone} address={siteSettings.address} />
      <Footer restaurantName={siteSettings.restaurant_name} />
    </main>
  )
}
