import Image from "next/image"
import { Phone, Clock, MapPin, Facebook, Instagram } from "lucide-react"

interface FooterProps {
  restaurantName?: string
}

export function Footer({ restaurantName = "Take & Go Falkenberg" }: FooterProps) {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Logo & Description */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
              <Image
                src="/logo.png"
                alt={restaurantName}
                width={70}
                height={70}
                className="rounded-xl shadow-lg"
              />
              <div>
                <h3 className="font-bold text-xl text-secondary-foreground">{restaurantName}</h3>
                <p className="text-secondary-foreground/70 text-sm">Pizza - Burgare - Kebab</p>
              </div>
            </div>
            <p className="text-secondary-foreground/60 text-sm mt-4 max-w-xs mx-auto md:mx-0">
              Välkommen till Take & Go! Vi serverar läcker mat med kärlek och passion.
            </p>
            {/* Social Media Links */}
            <div className="flex items-center justify-center md:justify-start gap-4 mt-6">
              <a
                href="https://www.tiktok.com/@take.and.go3"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-secondary-foreground/10 hover:bg-primary text-secondary-foreground hover:text-white transition-colors"
                aria-label="TikTok"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.23 6.23 0 0 0 10.226-4.338 8.38 8.38 0 0 0 13.769-5.373v-3.1a7.7 7.7 0 0 1-3.404 1.005z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/people/Take-And-go/pfbid0uEaLUeionYHjxcz1udjmoQ6zDjPJq611HMoXkpEGb9DXMjd86ueK9WhEE1is6BA6l/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-secondary-foreground/10 hover:bg-primary text-secondary-foreground hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/take_and_go1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-secondary-foreground/10 hover:bg-primary text-secondary-foreground hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="text-center">
            <h4 className="font-bold text-lg mb-4 flex items-center justify-center gap-2 text-secondary-foreground uppercase tracking-wide">
              <Clock className="w-5 h-5 text-primary" />
              Öppettider
            </h4>
            <div className="text-sm text-secondary-foreground/70 space-y-2">
              <div className="flex justify-between max-w-[200px] mx-auto">
                <span>Mån - Tors</span>
                <span className="font-medium text-secondary-foreground">11:00 - 21:00</span>
              </div>
              <div className="flex justify-between max-w-[200px] mx-auto">
                <span>Fredag</span>
                <span className="font-medium text-secondary-foreground">11:00 - 22:00</span>
              </div>
              <div className="flex justify-between max-w-[200px] mx-auto">
                <span>Lördag</span>
                <span className="font-medium text-secondary-foreground">12:00 - 22:00</span>
              </div>
              <div className="flex justify-between max-w-[200px] mx-auto">
                <span>Söndag</span>
                <span className="font-medium text-secondary-foreground">12:00 - 21:00</span>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="text-center md:text-right">
            <h4 className="font-bold text-lg mb-4 flex items-center justify-center md:justify-end gap-2 text-secondary-foreground uppercase tracking-wide">
              <Phone className="w-5 h-5 text-primary" />
              Kontakt
            </h4>
            <a
              href="tel:0722562660"
              className="inline-block text-primary hover:text-primary/80 font-bold text-2xl transition-colors mb-4"
            >
              0722-562660
            </a>
            <div className="flex items-center justify-center md:justify-end gap-2 text-secondary-foreground/70">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Falkenberg, Sverige</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-secondary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <p className="text-sm text-secondary-foreground/60">
              &copy; {new Date().getFullYear()} {restaurantName}. Alla rättigheter förbehållna.
            </p>
            <div className="flex items-center gap-6 text-sm text-secondary-foreground/60">
              <a href="#menu" className="hover:text-secondary-foreground transition-colors">Meny</a>
              <a href="#oppettider" className="hover:text-secondary-foreground transition-colors">Öppettider</a>
              <a href="#kontakt" className="hover:text-secondary-foreground transition-colors">Kontakt</a>
              <a href="/admin" className="hover:text-secondary-foreground transition-colors">Admin</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
