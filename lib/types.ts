export interface MenuCategory {
  id: string
  name: string
  slug: string
  display_order: number
  created_at: string
  updated_at: string
}

export interface MenuItem {
  id: string
  category_id: string
  name: string
  description: string | null
  price: string
  family_price: string | null
  image_url: string | null
  is_veg: boolean
  is_spicy: boolean
  is_available: boolean
  display_order: number
  created_at: string
  updated_at: string
}

export interface SiteSetting {
  id: string
  key: string
  value: string | null
  created_at: string
  updated_at: string
}

export interface Offer {
  id: string
  title: string
  description: string | null
  image_url: string | null
  price: string | null
  discount_percent: number | null
  valid_from: string | null
  valid_until: string | null
  is_active: boolean
  display_order: number
  created_at: string
  updated_at: string
}
