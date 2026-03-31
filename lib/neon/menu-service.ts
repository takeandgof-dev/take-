import { neon } from '@neondatabase/serverless'
import type { MenuCategory, MenuItem } from '@/lib/types'

const sql = process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null

// ========== CATEGORIES ==========

export async function getCategories(): Promise<MenuCategory[]> {
  try {
    if (!sql) {
      console.log('[v0] Database not configured - returning empty categories')
      return []
    }
    console.log('[v0] Fetching categories from Neon...')
    const categories = await sql<MenuCategory>`
      SELECT id, name, slug, display_order, created_at, updated_at
      FROM menu_categories
      ORDER BY display_order ASC
    `
    console.log('[v0] Fetched', categories.length, 'categories')
    return categories
  } catch (error) {
    console.error('[v0] Error fetching categories:', error)
    return []
  }
}

export async function createCategory(
  data: Omit<MenuCategory, 'id' | 'created_at' | 'updated_at'>
): Promise<MenuCategory | null> {
  try {
    if (!sql) return null
    console.log('[v0] Creating category:', data.name)
    const result = await sql<MenuCategory>`
      INSERT INTO menu_categories (name, slug, display_order, created_at, updated_at)
      VALUES (${data.name}, ${data.slug}, ${data.display_order || 0}, NOW(), NOW())
      RETURNING id, name, slug, display_order, created_at, updated_at
    `
    const created = result[0]
    console.log('[v0] Category created with ID:', created.id)
    return created
  } catch (error) {
    console.error('[v0] Error creating category:', error)
    return null
  }
}

export async function updateCategory(
  id: string,
  data: Partial<MenuCategory>
): Promise<MenuCategory | null> {
  try {
    if (!sql) return null
    console.log('[v0] Updating category:', id)
    
    // Build dynamic update query
    const updates: string[] = []
    const values: (string | number | null)[] = []
    let paramCount = 1

    if (data.name !== undefined) {
      updates.push(`name = $${paramCount++}`)
      values.push(data.name)
    }
    if (data.slug !== undefined) {
      updates.push(`slug = $${paramCount++}`)
      values.push(data.slug)
    }
    if (data.display_order !== undefined) {
      updates.push(`display_order = $${paramCount++}`)
      values.push(data.display_order)
    }

    updates.push(`updated_at = NOW()`)
    values.push(id)

    const query = `
      UPDATE menu_categories
      SET ${updates.join(', ')}
      WHERE id = $${paramCount}
      RETURNING id, name, slug, display_order, created_at, updated_at
    `

    const result = await sql(query, values) as MenuCategory[]
    console.log('[v0] Category updated successfully')
    return result[0] || null
  } catch (error) {
    console.error('[v0] Error updating category:', error)
    return null
  }
}

export async function deleteCategory(id: string): Promise<boolean> {
  try {
    if (!sql) return false
    console.log('[v0] Deleting category:', id)
    await sql`DELETE FROM menu_categories WHERE id = ${id}`
    console.log('[v0] Category deleted successfully')
    return true
  } catch (error) {
    console.error('[v0] Error deleting category:', error)
    return false
  }
}

// ========== MENU ITEMS ==========

export async function getMenuItems(onlyAvailable = false): Promise<MenuItem[]> {
  try {
    if (!sql) {
      console.log('[v0] Database not configured - returning empty menu items')
      return []
    }
    console.log('[v0] Fetching menu items from Neon, onlyAvailable:', onlyAvailable)
    
    if (onlyAvailable) {
      const items = await sql<MenuItem>`
        SELECT id, name, description, price, family_price, image_url, category_id, is_veg, is_spicy, is_available, display_order, created_at, updated_at
        FROM menu_items
        WHERE is_available = true
        ORDER BY display_order ASC
      `
      console.log('[v0] Fetched', items.length, 'available menu items')
      return items
    } else {
      const items = await sql<MenuItem>`
        SELECT id, name, description, price, family_price, image_url, category_id, is_veg, is_spicy, is_available, display_order, created_at, updated_at
        FROM menu_items
        ORDER BY display_order ASC
      `
      console.log('[v0] Fetched', items.length, 'menu items')
      return items
    }
  } catch (error) {
    console.error('[v0] Error fetching menu items:', error)
    return []
  }
}

export async function createMenuItem(
  data: Omit<MenuItem, 'id' | 'created_at' | 'updated_at'>
): Promise<MenuItem | null> {
  try {
    if (!sql) return null
    console.log('[v0] Creating menu item:', data.name)
    const result = await sql<MenuItem>`
      INSERT INTO menu_items (name, description, price, family_price, image_url, category_id, is_veg, is_spicy, is_available, display_order, created_at, updated_at)
      VALUES (${data.name}, ${data.description || null}, ${data.price}, ${data.family_price || null}, ${data.image_url || null}, ${data.category_id}, ${data.is_veg || false}, ${data.is_spicy || false}, ${data.is_available !== false}, ${data.display_order || 0}, NOW(), NOW())
      RETURNING id, name, description, price, family_price, image_url, category_id, is_veg, is_spicy, is_available, display_order, created_at, updated_at
    `
    const created = result[0]
    console.log('[v0] Menu item created with ID:', created.id)
    return created
  } catch (error) {
    console.error('[v0] Error creating menu item:', error)
    return null
  }
}

export async function updateMenuItem(
  id: string,
  data: Partial<MenuItem>
): Promise<MenuItem | null> {
  try {
    if (!sql) return null
    console.log('[v0] Updating menu item:', id)
    
    const updates: string[] = []
    const values: (string | number | boolean | null)[] = []
    let paramCount = 1

    if (data.name !== undefined) {
      updates.push(`name = $${paramCount++}`)
      values.push(data.name)
    }
    if (data.description !== undefined) {
      updates.push(`description = $${paramCount++}`)
      values.push(data.description)
    }
    if (data.price !== undefined) {
      updates.push(`price = $${paramCount++}`)
      values.push(data.price)
    }
    if (data.family_price !== undefined) {
      updates.push(`family_price = $${paramCount++}`)
      values.push(data.family_price)
    }
    if (data.category_id !== undefined) {
      updates.push(`category_id = $${paramCount++}`)
      values.push(data.category_id)
    }
    if (data.is_veg !== undefined) {
      updates.push(`is_veg = $${paramCount++}`)
      values.push(data.is_veg)
    }
    if (data.is_spicy !== undefined) {
      updates.push(`is_spicy = $${paramCount++}`)
      values.push(data.is_spicy)
    }
    if (data.is_available !== undefined) {
      updates.push(`is_available = $${paramCount++}`)
      values.push(data.is_available)
    }
    if (data.display_order !== undefined) {
      updates.push(`display_order = $${paramCount++}`)
      values.push(data.display_order)
    }
    if (data.image_url !== undefined) {
      updates.push(`image_url = $${paramCount++}`)
      values.push(data.image_url)
    }

    updates.push(`updated_at = NOW()`)
    values.push(id)

    const query = `
      UPDATE menu_items
      SET ${updates.join(', ')}
      WHERE id = $${paramCount}
      RETURNING id, name, description, price, family_price, image_url, category_id, is_veg, is_spicy, is_available, display_order, created_at, updated_at
    `

    const result = await sql(query, values) as MenuItem[]
    console.log('[v0] Menu item updated successfully')
    return result[0] || null
  } catch (error) {
    console.error('[v0] Error updating menu item:', error)
    return null
  }
}

export async function deleteMenuItem(id: string): Promise<boolean> {
  try {
    if (!sql) return false
    console.log('[v0] Deleting menu item:', id)
    await sql`DELETE FROM menu_items WHERE id = ${id}`
    console.log('[v0] Menu item deleted successfully')
    return true
  } catch (error) {
    console.error('[v0] Error deleting menu item:', error)
    return false
  }
}
