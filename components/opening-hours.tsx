import { Clock, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

interface OpeningHoursProps {
  settings: Record<string, string>
}

export function OpeningHours({ settings }: OpeningHoursProps) {
  const phone = settings.phone || "0722-562660"
  const phoneDigits = phone.replace(/[^0-9]/g, "")
  
  const hours = [
    { day: "Måndag - Torsdag", time: settings.opening_weekdays || "11:00 - 21:00" },
    { day: "Fredag", time: settings.opening_friday || "11:00 - 22:00" },
    { day: "Lördag", time: settings.opening_saturday || "12:00 - 22:00" },
    { day: "Söndag", time: settings.opening_sunday || "12:00 - 21:00" },
  ]

  return (
    <section id="oppettider" className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 uppercase tracking-wide">
            Öppettider
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="max-w-lg mx-auto">
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-border">
            {/* Header */}
            <div className="bg-primary text-primary-foreground p-6 flex items-center justify-center gap-3">
              <Clock className="w-7 h-7" />
              <h3 className="text-xl font-bold uppercase tracking-wide">Våra Öppettider</h3>
            </div>
            
            {/* Hours List */}
            <div className="p-6 md:p-8">
              <div className="space-y-1">
                {hours.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-4 border-b border-border last:border-0 hover:bg-muted/30 px-3 -mx-3 rounded-lg transition-colors"
                  >
                    <span className="font-medium text-foreground">{item.day}</span>
                    <span className="text-primary font-bold text-lg tabular-nums">{item.time}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-8 pt-6 border-t border-border text-center">
                <p className="text-muted-foreground mb-4">Ring oss för att beställa!</p>
                <a href={`tel:${phoneDigits}`}>
                  <Button 
                    size="lg" 
                    className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 rounded-full font-bold min-h-[52px] px-8 shadow-lg hover:shadow-xl transition-all hover:scale-105"
                  >
                    <Phone className="w-5 h-5" />
                    {phone}
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
