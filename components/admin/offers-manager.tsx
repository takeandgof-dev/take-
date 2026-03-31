'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import type { Offer } from '@/lib/types'

export function OffersManager() {
  const [offers, setOffers] = useState<Offer[]>([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState<Partial<Offer>>({
    title: '',
    description: '',
    image_url: '',
    price: '',
    discount_percent: undefined,
    valid_from: '',
    valid_until: '',
    is_active: true,
    display_order: 0,
  })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [uploadingImage, setUploadingImage] = useState(false)

  useEffect(() => {
    fetchOffers()
  }, [])

  const fetchOffers = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/offers?active=false')
      if (response.ok) {
        const data = await response.json()
        setOffers(data)
      }
    } catch (error) {
      console.error('[v0] Error fetching offers:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setUploadingImage(true)
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        setFormData((prev) => ({ ...prev, image_url: data.url }))
      }
    } catch (error) {
      console.error('[v0] Error uploading image:', error)
    } finally {
      setUploadingImage(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (editingId) {
        // Update
        const response = await fetch(`/api/offers/${editingId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })

        if (response.ok) {
          const updated = await response.json()
          setOffers((prev) =>
            prev.map((offer) => (offer.id === editingId ? updated : offer))
          )
          setEditingId(null)
        }
      } else {
        // Create
        const response = await fetch('/api/offers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })

        if (response.ok) {
          const newOffer = await response.json()
          setOffers((prev) => [...prev, newOffer])
        }
      }

      // Reset form
      setFormData({
        title: '',
        description: '',
        image_url: '',
        price: '',
        discount_percent: undefined,
        valid_from: '',
        valid_until: '',
        is_active: true,
        display_order: 0,
      })
    } catch (error) {
      console.error('[v0] Error saving offer:', error)
    }
  }

  const handleEdit = (offer: Offer) => {
    setFormData(offer)
    setEditingId(offer.id)
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/offers/${id}`, { method: 'DELETE' })
      if (response.ok) {
        setOffers((prev) => prev.filter((offer) => offer.id !== id))
        setDeleteId(null)
      }
    } catch (error) {
      console.error('[v0] Error deleting offer:', error)
    }
  }

  if (loading) {
    return <div className="text-center py-8">Laddar erbjudanden...</div>
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editingId ? 'Redigera erbjudande' : 'Lägg till nytt erbjudande'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Titel</label>
              <Input
                value={formData.title || ''}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="T.ex. 20% rabatt på pizza"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Beskrivning</label>
              <Textarea
                value={formData.description || ''}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Beskrivning av erbjudandet"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Bild</label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploadingImage}
                  className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                />
                {uploadingImage && (
                  <span className="text-sm text-gray-500 animate-pulse">Laddar upp...</span>
                )}
              </div>
              {formData.image_url && (
                <div className="mt-2 flex items-center gap-3">
                  <img
                    src={formData.image_url}
                    alt="Preview"
                    className="h-20 w-20 object-cover rounded border"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setFormData((prev) => ({ ...prev, image_url: '' }))}
                  >
                    Ta bort bild
                  </Button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Pris</label>
                <Input
                  value={formData.price || ''}
                  onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                  placeholder="T.ex. 199 kr"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Rabatt %</label>
                <Input
                  type="number"
                  value={formData.discount_percent || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      discount_percent: e.target.value ? parseInt(e.target.value) : null,
                    }))
                  }
                  placeholder="0-100"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Gäller från</label>
                <Input
                  type="date"
                  value={formData.valid_from || ''}
                  onChange={(e) => setFormData((prev) => ({ ...prev, valid_from: e.target.value }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Gäller till</label>
                <Input
                  type="date"
                  value={formData.valid_until || ''}
                  onChange={(e) => setFormData((prev) => ({ ...prev, valid_until: e.target.value }))}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.is_active !== false}
                onChange={(e) => setFormData((prev) => ({ ...prev, is_active: e.target.checked }))}
                className="rounded"
              />
              <label className="text-sm font-medium">Aktivt</label>
            </div>

            <div className="flex gap-2">
              <Button type="submit" className="flex-1">
                {editingId ? 'Uppdatera' : 'Lägg till'}
              </Button>
              {editingId && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setEditingId(null)
                    setFormData({
                      title: '',
                      description: '',
                      image_url: '',
                      price: '',
                      discount_percent: undefined,
                      valid_from: '',
                      valid_until: '',
                      is_active: true,
                      display_order: 0,
                    })
                  }}
                >
                  Avbryt
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <div>
        <h3 className="text-lg font-semibold mb-4">Befintliga erbjudanden ({offers.length})</h3>
        <div className="space-y-3">
          {offers.map((offer) => (
            <Card key={offer.id}>
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  {offer.image_url && (
                    <img
                      src={offer.image_url}
                      alt={offer.title}
                      className="h-20 w-20 object-cover rounded"
                    />
                  )}
                  <div className="flex-1">
                    <h4 className="font-semibold">{offer.title}</h4>
                    {offer.description && (
                      <p className="text-sm text-gray-600">{offer.description}</p>
                    )}
                    <div className="flex gap-2 mt-2 text-sm">
                      {offer.price && <span>Pris: {offer.price}</span>}
                      {offer.discount_percent && <span>Rabatt: {offer.discount_percent}%</span>}
                      <span className={offer.is_active ? 'text-green-600' : 'text-gray-500'}>
                        {offer.is_active ? 'Aktiv' : 'Inaktiv'}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(offer)}
                    >
                      Redigera
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setDeleteId(offer.id)}
                    >
                      Ta bort
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {offers.length === 0 && (
            <p className="text-center text-gray-500 py-8">Inga erbjudanden ännu</p>
          )}
        </div>
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Ta bort erbjudande</AlertDialogTitle>
            <AlertDialogDescription>
              Är du säker på att du vill ta bort detta erbjudande? Detta kan inte ångras.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-2 justify-end">
            <AlertDialogCancel>Avbryt</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteId && handleDelete(deleteId)}>
              Ta bort
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
