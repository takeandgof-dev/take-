'use client'

import { useState, useEffect } from 'react'
import type { MenuCategory, MenuItem } from '@/lib/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AlertCircle, Leaf, Flame } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface OffersContentProps {
  categories: MenuCategory[]
  items: MenuItem[]
}

export function OffersContent({ categories: initialCategories, items: initialItems }: OffersContentProps) {
  const [categories, setCategories] = useState(initialCategories)
  const [items, setItems] = useState(initialItems)
  const [loading, setLoading] = useState(false)

  // Fetch data periodically to get real-time updates
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, itemsRes] = await Promise.all([
          fetch('/api/menu/categories'),
          fetch('/api/menu/items?available=true'),
        ])

        if (categoriesRes.ok) {
          const catData = await categoriesRes.json()
          setCategories(catData.data)
        }

        if (itemsRes.ok) {
          const itemData = await itemsRes.json()
          setItems(itemData.data)
        }
      } catch (error) {
        console.log('[v0] Error fetching menu updates:', error)
      }
    }

    // Fetch every 5 seconds for real-time updates
    const interval = setInterval(fetchData, 5000)
    return () => clearInterval(interval)
  }, [])

  const itemsByCategory = categories.map(cat => ({
    category: cat,
    items: items.filter(item => item.category_id === cat.id),
  }))

  return (
    <div className="container mx-auto px-4 py-12">
      {itemsByCategory.length === 0 ? (
        <div className="text-center py-12">
          <Alert className="max-w-md mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Menyn är tom. Lägg till objekt från admin-panelen.
            </AlertDescription>
          </Alert>
        </div>
      ) : (
        <Tabs defaultValue={itemsByCategory[0]?.category.id} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 mb-10 bg-white/80 p-1 rounded-lg shadow-sm">
            {itemsByCategory.map(({ category }) => (
              <TabsTrigger key={category.id} value={category.id} className="text-sm font-semibold data-[state=active]:bg-red-500 data-[state=active]:text-white">
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {itemsByCategory.map(({ category, items: categoryItems }) => (
            <TabsContent key={category.id} value={category.id} className="space-y-6">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-1 w-12 bg-red-500 rounded-full"></div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800">{category.name}</h2>
              </div>
              
              {categoryItems.length === 0 ? (
                <p className="text-muted-foreground py-8 text-center">
                  Inga objekt i denna kategori ännu.
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {categoryItems.map((item) => (
                    <Card key={item.id} className="hover:shadow-xl transition-all duration-300 hover:scale-105 border-gray-200 bg-white">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-xl font-bold text-gray-900">{item.name}</CardTitle>
                            {item.description && (
                              <CardDescription className="mt-2 text-gray-600 text-sm leading-relaxed">
                                {item.description}
                              </CardDescription>
                            )}
                          </div>
                          <div className="text-right whitespace-nowrap flex-shrink-0">
                            <p className="text-3xl font-bold text-red-600 bg-red-50 px-3 py-1 rounded-lg">
                              {item.price}<span className="text-lg text-gray-600">kr</span>
                            </p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex gap-2 flex-wrap">
                          {item.is_veg && (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                              <Leaf className="w-3 h-3 mr-1" />
                              Vegetarisk
                            </Badge>
                          )}
                          {item.is_spicy && (
                            <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
                              <Flame className="w-3 h-3 mr-1" />
                              Stark
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  )
}
