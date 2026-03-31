"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { MenuCategory, MenuItem } from "@/lib/types"
import { Plus, Pencil, Trash2, Save, Loader2, Upload, X } from "lucide-react"

interface MenuItemsManagerProps {
  items: MenuItem[]
  setItems: React.Dispatch<React.SetStateAction<MenuItem[]>>
  categories: MenuCategory[]
}

export function MenuItemsManager({
  items,
  setItems,
  categories,
}: MenuItemsManagerProps) {
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [uploadingImage, setUploadingImage] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    family_price: "",
    image_url: "",
    category_id: "",
    is_veg: false,
    is_spicy: false,
    is_available: true,
  })

  const filteredItems = selectedCategory === "all"
    ? items
    : items.filter((item) => item.category_id === selectedCategory)

  function openCreateDialog() {
    setFormData({
      name: "",
      description: "",
      price: "",
      family_price: "",
      image_url: "",
      category_id: categories[0]?.id || "",
      is_veg: false,
      is_spicy: false,
      is_available: true,
    })
    setIsCreating(true)
    setEditingItem(null)
  }

  function openEditDialog(item: MenuItem) {
    setFormData({
      name: item.name,
      description: item.description || "",
      price: item.price,
      family_price: item.family_price || "",
      image_url: item.image_url || "",
      category_id: item.category_id,
      is_veg: item.is_veg,
      is_spicy: item.is_spicy,
      is_available: item.is_available,
    })
    setEditingItem(item)
    setIsCreating(false)
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingImage(true)
    const formDataToSend = new FormData()
    formDataToSend.append("file", file)

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formDataToSend,
      })

      if (res.ok) {
        const result = await res.json()
        setFormData({ ...formData, image_url: result.url })
        toast({
          title: "Bild uppladdad",
          description: "Bilden laddades upp framgångsrikt.",
        })
      } else {
        throw new Error("Failed to upload image")
      }
    } catch (error) {
      console.error("[v0] Error uploading image:", error)
      toast({
        title: "Fel",
        description: "Misslyckades att ladda upp bilden",
        variant: "destructive",
      })
    } finally {
      setUploadingImage(false)
    }
  }

  async function handleSave() {
    setLoading(true)

    try {
      if (isCreating) {
        const res = await fetch("/api/menu/items", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            description: formData.description || null,
            price: formData.price,
            family_price: formData.family_price || null,
            image_url: formData.image_url || null,
            category_id: formData.category_id,
            is_veg: formData.is_veg,
            is_spicy: formData.is_spicy,
            is_available: formData.is_available,
            display_order: items.length,
          }),
        })

        if (res.ok) {
          const result = await res.json()
          setItems([...items, result.data])
          toast({
            title: "Produkten skapades",
            description: `${formData.name} har lagts till.`,
          })
        } else {
          throw new Error("Failed to create item")
        }
      } else if (editingItem) {
        const res = await fetch("/api/menu/items", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingItem.id,
            data: {
              name: formData.name,
              description: formData.description || null,
              price: formData.price,
              family_price: formData.family_price || null,
              image_url: formData.image_url || null,
              category_id: formData.category_id,
              is_veg: formData.is_veg,
              is_spicy: formData.is_spicy,
              is_available: formData.is_available,
            },
          }),
        })

        if (res.ok) {
          const result = await res.json()
          setItems(items.map((i) => (i.id === editingItem.id ? result.data : i)))
          toast({
            title: "Produkten uppdaterad",
            description: `${formData.name} har uppdaterats.`,
          })
        } else {
          throw new Error("Failed to update item")
        }
      }

      setLoading(false)
      setIsCreating(false)
      setEditingItem(null)
    } catch (error) {
      console.error("[v0] Error saving item:", error)
      toast({
        title: "Fel",
        description: "Misslyckades att spara produkten",
        variant: "destructive",
      })
      setLoading(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Är du säker på att du vill ta bort denna produkt?")) return

    try {
      const res = await fetch(`/api/menu/items?id=${id}`, {
        method: "DELETE",
      })

      if (res.ok) {
        setItems(items.filter((i) => i.id !== id))
        toast({
          title: "Produkten raderad",
          description: "Produkten har lagts bort från menyn.",
        })
      } else {
        throw new Error("Failed to delete item")
      }
    } catch (error) {
      console.error("[v0] Error deleting item:", error)
      toast({
        title: "Fel",
        description: "Misslyckades att ta bort produkten",
        variant: "destructive",
      })
    }
  }

  function getCategoryName(categoryId: string) {
    return categories.find((c) => c.id === categoryId)?.name || "Okand"
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Menyprodukter ({items.length})</CardTitle>
        <div className="flex items-center gap-4">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filtrera kategori" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alla kategorier</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Dialog
            open={isCreating || !!editingItem}
            onOpenChange={(open) => {
              if (!open) {
                setIsCreating(false)
                setEditingItem(null)
              }
            }}
          >
            <DialogTrigger asChild>
              <Button onClick={openCreateDialog}>
                <Plus className="w-4 h-4 mr-2" />
                Lagg till
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {isCreating ? "Lagg till produkt" : "Redigera produkt"}
                </DialogTitle>
              </DialogHeader>
              <FieldGroup>
                {/* Image Upload */}
                <Field>
                  <FieldLabel>Produktbild</FieldLabel>
                  <div className="space-y-3">
                    {formData.image_url && (
                      <div className="relative w-full h-48 bg-muted rounded-lg overflow-hidden">
                        <img
                          src={formData.image_url}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, image_url: "" })}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                    <label className="flex items-center justify-center w-full p-4 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition">
                      <div className="flex flex-col items-center gap-2">
                        <Upload className="w-6 h-6 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {uploadingImage ? "Laddar upp..." : "Klicka för att ladda upp bild"}
                        </span>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploadingImage}
                        className="hidden"
                      />
                    </label>
                  </div>
                </Field>

                <Field>
                  <FieldLabel>Namn</FieldLabel>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Pizza Margherita"
                  />
                </Field>
                <Field>
                  <FieldLabel>Beskrivning</FieldLabel>
                  <Input
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Tomatsas, ost, basilika"
                  />
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel>Pris</FieldLabel>
                    <Input
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="95 kr"
                    />
                  </Field>
                  <Field>
                    <FieldLabel>Familjepris</FieldLabel>
                    <Input
                      value={formData.family_price}
                      onChange={(e) =>
                        setFormData({ ...formData, family_price: e.target.value })
                      }
                      placeholder="180 kr"
                    />
                  </Field>
                </div>
                <Field>
                  <FieldLabel>Kategori</FieldLabel>
                  <Select
                    value={formData.category_id}
                    onValueChange={(value) =>
                      setFormData({ ...formData, category_id: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={formData.is_veg}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, is_veg: checked })
                      }
                    />
                    <span className="text-sm">Vegetarisk</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={formData.is_spicy}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, is_spicy: checked })
                      }
                    />
                    <span className="text-sm">Stark</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={formData.is_available}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, is_available: checked })
                      }
                    />
                    <span className="text-sm">Tillganglig</span>
                  </div>
                </div>
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
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {filteredItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-4 flex-1">
                {item.image_url && (
                  <div className="w-16 h-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{item.name}</h3>
                    {!item.is_available && (
                      <Badge variant="secondary">Ej tillganglig</Badge>
                    )}
                    {item.is_veg && (
                      <Badge className="bg-secondary text-secondary-foreground">
                        Veg
                      </Badge>
                    )}
                    {item.is_spicy && (
                      <Badge className="bg-primary text-primary-foreground">Stark</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                  <p className="text-sm text-muted-foreground">
                    Kategori: {getCategoryName(item.category_id)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-bold text-primary">{item.price}</p>
                  {item.family_price && (
                    <p className="text-xs text-muted-foreground">
                      Familj: {item.family_price}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => openEditDialog(item)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
