"use client"

import { useState } from "react"
import { createCategory, updateCategory, deleteCategory } from "@/lib/neon/menu-service"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { MenuCategory } from "@/lib/types"
import { Plus, Pencil, Trash2, Save, Loader2 } from "lucide-react"

interface CategoriesManagerProps {
  categories: MenuCategory[]
  setCategories: React.Dispatch<React.SetStateAction<MenuCategory[]>>
}

export function CategoriesManager({
  categories,
  setCategories,
}: CategoriesManagerProps) {
  const [editingCategory, setEditingCategory] = useState<MenuCategory | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    display_order: 0,
  })

  function openCreateDialog() {
    setFormData({
      name: "",
      slug: "",
      display_order: categories.length + 1,
    })
    setIsCreating(true)
    setEditingCategory(null)
  }

  function openEditDialog(category: MenuCategory) {
    setFormData({
      name: category.name,
      slug: category.slug,
      display_order: category.display_order,
    })
    setEditingCategory(category)
    setIsCreating(false)
  }

  function generateSlug(name: string) {
    return name
      .toLowerCase()
      .replace(/å/g, "a")
      .replace(/ä/g, "a")
      .replace(/ö/g, "o")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  async function handleSave() {
    setLoading(true)
    const slug = formData.slug || generateSlug(formData.name)

    if (isCreating) {
      const data = await createCategory({
        name: formData.name,
        slug,
        display_order: formData.display_order,
      })

      if (data) {
        setCategories([...categories, data])
      }
    } else if (editingCategory) {
      const data = await updateCategory(editingCategory.id, {
        name: formData.name,
        slug,
        display_order: formData.display_order,
      })

      if (data) {
        setCategories(categories.map((c) => (c.id === editingCategory.id ? data : c)))
      }
    }

    setLoading(false)
    setIsCreating(false)
    setEditingCategory(null)
  }

  async function handleDelete(id: string) {
    if (!confirm("Ar du saker? Detta raderar alla produkter i denna kategori.")) return

    const success = await deleteCategory(id)
    if (success) {
      setCategories(categories.filter((c) => c.id !== id))
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Kategorier ({categories.length})</CardTitle>
        <Dialog open={isCreating || !!editingCategory} onOpenChange={(open) => {
          if (!open) {
            setIsCreating(false)
            setEditingCategory(null)
          }
        }}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}>
              <Plus className="w-4 h-4 mr-2" />
              Lagg till
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {isCreating ? "Lagg till kategori" : "Redigera kategori"}
              </DialogTitle>
            </DialogHeader>
            <FieldGroup>
              <Field>
                <FieldLabel>Namn</FieldLabel>
                <Input
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      name: e.target.value,
                      slug: generateSlug(e.target.value),
                    })
                  }}
                  placeholder="Pizza"
                />
              </Field>
              <Field>
                <FieldLabel>Slug (URL-vanligt namn)</FieldLabel>
                <Input
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="pizza"
                />
              </Field>
              <Field>
                <FieldLabel>Sorteringsordning</FieldLabel>
                <Input
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                />
              </Field>
              <Button onClick={handleSave} disabled={loading} className="w-full">
                {loading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Spara
              </Button>
            </FieldGroup>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {categories
            .sort((a, b) => a.display_order - b.display_order)
            .map((category) => (
              <div
                key={category.id}
                className="flex items-center justify-between p-4 bg-muted rounded-lg"
              >
                <div>
                  <h3 className="font-medium">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Slug: {category.slug} | Ordning: {category.display_order}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="icon" variant="outline" onClick={() => openEditDialog(category)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="destructive" onClick={() => handleDelete(category.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  )
}
