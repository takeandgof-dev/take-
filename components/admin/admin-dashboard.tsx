"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signOut } from "@/lib/firebase/auth-service"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MenuItemsManager } from "./menu-items-manager"
import { CategoriesManager } from "./categories-manager"
import { OffersManager } from "./offers-manager"
import type { MenuCategory, MenuItem } from "@/lib/types"
import { LogOut, Pizza, FolderOpen, Upload, RefreshCw, Sparkles } from "lucide-react"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"

interface AdminDashboardProps {
  initialCategories: MenuCategory[]
  initialItems: MenuItem[]
  userEmail: string
}

export function AdminDashboard({
  initialCategories,
  initialItems,
  userEmail,
}: AdminDashboardProps) {
  const [categories, setCategories] = useState(initialCategories)
  const [items, setItems] = useState(initialItems)
  const [isSeeding, setIsSeeding] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  async function handleLogout() {
    await signOut()
    router.push("/admin/login")
  }

  async function handleSeedMenu() {
    setIsSeeding(true)
    try {
      const response = await fetch("/api/seed-menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Meny importerad!",
          description: `${data.categoriesAdded} kategorier och ${data.itemsAdded} items laddades upp.`,
        })
        // Wait a moment then reload to show new data
        setTimeout(() => window.location.reload(), 1000)
      } else {
        toast({
          title: "Fel",
          description: data.error || "Misslyckades att importera meny",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Fel",
        description: "Ett fel uppstod vid import av meny",
        variant: "destructive",
      })
    } finally {
      setIsSeeding(false)
    }
  }

  function handleRefresh() {
    window.location.reload()
  }

  return (
    <div 
      className="min-h-screen"
      style={{
        backgroundImage: 'url(/bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Dark overlay for readability */}
      <div className="fixed inset-0 bg-black/40 pointer-events-none z-0" />
      
      {/* Header */}
      <header className="relative z-40 bg-[#1a0f0a]/95 border-b border-[#c8a84b]/30 sticky top-0 backdrop-blur">
        {/* Red accent line top */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#c41e1e]" />
        
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Logo and Title */}
            <div className="flex items-center gap-4">
              <Image
                src="/logo.png"
                alt="Take & Go"
                width={80}
                height={40}
                className="h-12 w-auto object-contain"
              />
              <div>
                <h1 className="text-xl font-bold text-[#f5e6c8]">Admin Panel</h1>
                <p className="text-sm text-[#f5e6c8]/60">{userEmail}</p>
              </div>
            </div>
            
            {/* Navigation */}
            <nav className="flex flex-wrap items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleRefresh} 
                title="Uppdatera" 
                className="text-[#f5e6c8] hover:bg-[#f5e6c8]/10 hover:text-[#f5e6c8]"
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => router.push("/")} 
                className="text-[#f5e6c8] hover:bg-[#f5e6c8]/10 hover:text-[#f5e6c8]"
              >
                Hem
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => router.push("/erbjudanden")} 
                className="text-[#f5e6c8] hover:bg-[#f5e6c8]/10 hover:text-[#f5e6c8]"
              >
                Erbjudanden
              </Button>
              <Button 
                className="bg-[#c41e1e] hover:bg-[#a51818] text-white"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logga ut
              </Button>
            </nav>
          </div>
        </div>
        
        {/* Bottom gold accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c8a84b]/60" />
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-8">
        {/* Info Alert */}
        <div className="mb-8 p-4 bg-[#1a0f0a]/80 border border-[#c8a84b]/30 rounded-lg backdrop-blur">
          <p className="text-[#f5e6c8] font-semibold">Tips:</p>
          <p className="text-[#f5e6c8]/80 text-sm mt-1">
            Alla ändringar du gör här syns direkt på <a href="/erbjudanden" className="underline font-semibold hover:no-underline text-[#c41e1e]">erbjudandessidan</a>. Du kan ändra priser, namn, ta bort pizzor och lägga till nya menyalternativ.
          </p>
        </div>

        <Tabs defaultValue="items" className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <TabsList className="grid w-full sm:w-auto grid-cols-3 max-w-full bg-[#1a0f0a]/90 backdrop-blur border border-[#c8a84b]/30">
              <TabsTrigger 
                value="items" 
                className="flex items-center gap-2 text-[#f5e6c8]/70 data-[state=active]:bg-[#c41e1e] data-[state=active]:text-white"
              >
                <Pizza className="w-4 h-4" />
                <span className="hidden sm:inline">Meny</span>
              </TabsTrigger>
              <TabsTrigger 
                value="categories" 
                className="flex items-center gap-2 text-[#f5e6c8]/70 data-[state=active]:bg-[#c41e1e] data-[state=active]:text-white"
              >
                <FolderOpen className="w-4 h-4" />
                <span className="hidden sm:inline">Kategorier</span>
              </TabsTrigger>
              <TabsTrigger 
                value="offers" 
                className="flex items-center gap-2 text-[#f5e6c8]/70 data-[state=active]:bg-[#c41e1e] data-[state=active]:text-white"
              >
                <Sparkles className="w-4 h-4" />
                <span className="hidden sm:inline">Erbjudanden</span>
              </TabsTrigger>
            </TabsList>
            <Button 
              onClick={handleSeedMenu} 
              disabled={isSeeding}
              className="gap-2 bg-[#c41e1e] hover:bg-[#a51818] text-white"
            >
              <Upload className="w-4 h-4" />
              {isSeeding ? "Importerar..." : "Importera meny"}
            </Button>
          </div>

          <TabsContent value="items" className="bg-[#1a0f0a]/90 backdrop-blur border border-[#c8a84b]/30 rounded-lg p-6">
            <MenuItemsManager
              items={items}
              setItems={setItems}
              categories={categories}
            />
          </TabsContent>

          <TabsContent value="categories" className="bg-[#1a0f0a]/90 backdrop-blur border border-[#c8a84b]/30 rounded-lg p-6">
            <CategoriesManager
              categories={categories}
              setCategories={setCategories}
            />
          </TabsContent>

          <TabsContent value="offers" className="bg-[#1a0f0a]/90 backdrop-blur border border-[#c8a84b]/30 rounded-lg p-6">
            <OffersManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
