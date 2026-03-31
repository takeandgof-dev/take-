"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { getCurrentUser } from "@/lib/firebase/auth-service"
import type { MenuCategory, MenuItem } from "@/lib/types"
import { Spinner } from "@/components/ui/spinner"

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [categories, setCategories] = useState<MenuCategory[]>([])
  const [items, setItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function checkAuth() {
      const isAuth = await getCurrentUser()
      if (!isAuth) {
        router.push("/admin/login")
        return
      }
      
      setAuthenticated(true)
      
      // Fetch data via API routes
      try {
        const [catsRes, itemsRes] = await Promise.all([
          fetch('/api/menu/categories'),
          fetch('/api/menu/items?available=false'), // All items, not just available
        ])
        
        if (catsRes.ok) {
          const catsData = await catsRes.json()
          setCategories(catsData.data || [])
        }
        
        if (itemsRes.ok) {
          const itemsData = await itemsRes.json()
          setItems(itemsData.data || [])
        }
      } catch (error) {
        console.error('[v0] Error fetching menu data:', error)
      }
      
      setLoading(false)
    }

    checkAuth()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Spinner className="mx-auto mb-4" />
          <p className="text-muted-foreground">Laddar admin...</p>
        </div>
      </div>
    )
  }

  if (!authenticated) {
    return null
  }

  return (
    <AdminDashboard
      initialCategories={categories}
      initialItems={items}
      userEmail="Admin"
    />
  )
}
