import { neon } from '@neondatabase/serverless'
import type { Offer } from '@/lib/types'

const sql = process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null

// ========== OFFERS ==========

export async function getOffers(onlyActive = true): Promise<Offer[]> {
  try {
    if (!sql) {
      console.log('[v0] Database not configured - returning empty offers')
      return []
    }
    console.log('[v0] Fetching offers from Neon, onlyActive:', onlyActive)
    
    if (onlyActive) {
      const offers = await sql<Offer>`
        SELECT id, title, description, image_url, price, discount_percent, valid_from, valid_until, is_active, display_order, created_at, updated_at
        FROM offers
        WHERE is_active = true
        ORDER BY display_order ASC
      `
      console.log('[v0] Fetched', offers.length, 'active offers')
      return offers
    } else {
      const offers = await sql<Offer>`
        SELECT id, title, description, image_url, price, discount_percent, valid_from, valid_until, is_active, display_order, created_at, updated_at
        FROM offers
        ORDER BY display_order ASC
      `
      console.log('[v0] Fetched', offers.length, 'offers')
      return offers
    }
  } catch (error) {
    console.error('[v0] Error fetching offers:', error)
    return []
  }
}

export async function getOfferById(id: string): Promise<Offer | null> {
  try {
    if (!sql) return null
    console.log('[v0] Fetching offer:', id)
    const result = await sql<Offer>`
      SELECT id, title, description, image_url, price, discount_percent, valid_from, valid_until, is_active, display_order, created_at, updated_at
      FROM offers
      WHERE id = ${id}
    `
    return result[0] || null
  } catch (error) {
    console.error('[v0] Error fetching offer:', error)
    return null
  }
}

export async function createOffer(
  data: Omit<Offer, 'id' | 'created_at' | 'updated_at'>
): Promise<Offer | null> {
  try {
    if (!sql) return null
    console.log('[v0] Creating offer:', data.title)
    const result = await sql<Offer>`
      INSERT INTO offers (title, description, image_url, price, discount_percent, valid_from, valid_until, is_active, display_order, created_at, updated_at)
      VALUES (${data.title}, ${data.description || null}, ${data.image_url || null}, ${data.price || null}, ${data.discount_percent || null}, ${data.valid_from || null}, ${data.valid_until || null}, ${data.is_active !== false}, ${data.display_order || 0}, NOW(), NOW())
      RETURNING id, title, description, image_url, price, discount_percent, valid_from, valid_until, is_active, display_order, created_at, updated_at
    `
    const created = result[0]
    console.log('[v0] Offer created with ID:', created.id)
    return created
  } catch (error) {
    console.error('[v0] Error creating offer:', error)
    return null
  }
}

export async function updateOffer(
  id: string,
  data: Partial<Offer>
): Promise<Offer | null> {
  try {
    if (!sql) return null
    console.log('[v0] Updating offer:', id)
    
    const updates: string[] = []
    const values: (string | number | boolean | null)[] = []
    let paramCount = 1

    if (data.title !== undefined) {
      updates.push(`title = $${paramCount++}`)
      values.push(data.title)
    }
    if (data.description !== undefined) {
      updates.push(`description = $${paramCount++}`)
      values.push(data.description)
    }
    if (data.image_url !== undefined) {
      updates.push(`image_url = $${paramCount++}`)
      values.push(data.image_url)
    }
    if (data.price !== undefined) {
      updates.push(`price = $${paramCount++}`)
      values.push(data.price)
    }
    if (data.discount_percent !== undefined) {
      updates.push(`discount_percent = $${paramCount++}`)
      values.push(data.discount_percent)
    }
    if (data.valid_from !== undefined) {
      updates.push(`valid_from = $${paramCount++}`)
      values.push(data.valid_from)
    }
    if (data.valid_until !== undefined) {
      updates.push(`valid_until = $${paramCount++}`)
      values.push(data.valid_until)
    }
    if (data.is_active !== undefined) {
      updates.push(`is_active = $${paramCount++}`)
      values.push(data.is_active)
    }
    if (data.display_order !== undefined) {
      updates.push(`display_order = $${paramCount++}`)
      values.push(data.display_order)
    }

    updates.push(`updated_at = NOW()`)
    values.push(id)

    const query = `
      UPDATE offers
      SET ${updates.join(', ')}
      WHERE id = $${paramCount}
      RETURNING id, title, description, image_url, price, discount_percent, valid_from, valid_until, is_active, display_order, created_at, updated_at
    `

    const result = await sql(query, values) as Offer[]
    console.log('[v0] Offer updated successfully')
    return result[0] || null
  } catch (error) {
    console.error('[v0] Error updating offer:', error)
    return null
  }
}

export async function deleteOffer(id: string): Promise<boolean> {
  try {
    if (!sql) return false
    console.log('[v0] Deleting offer:', id)
    await sql`DELETE FROM offers WHERE id = ${id}`
    console.log('[v0] Offer deleted successfully')
    return true
  } catch (error) {
    console.error('[v0] Error deleting offer:', error)
    return false
  }
}
