import { NextRequest, NextResponse } from 'next/server'
import { getOfferById, updateOffer, deleteOffer } from '@/lib/neon/offers-service'
import type { Offer } from '@/lib/types'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    console.log('[v0] GET /api/offers/[id] - id:', id)
    const offer = await getOfferById(id)
    
    if (!offer) {
      return NextResponse.json({ error: 'Offer not found' }, { status: 404 })
    }
    
    return NextResponse.json(offer)
  } catch (error) {
    console.error('[v0] Error in GET /api/offers/[id]:', error)
    return NextResponse.json({ error: 'Failed to fetch offer' }, { status: 500 })
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    const body = await request.json() as Partial<Offer>
    
    console.log('[v0] PATCH /api/offers/[id] - id:', id)
    const offer = await updateOffer(id, body)
    
    if (!offer) {
      return NextResponse.json({ error: 'Failed to update offer' }, { status: 400 })
    }
    
    return NextResponse.json(offer)
  } catch (error) {
    console.error('[v0] Error in PATCH /api/offers/[id]:', error)
    return NextResponse.json({ error: 'Failed to update offer' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    console.log('[v0] DELETE /api/offers/[id] - id:', id)
    const success = await deleteOffer(id)
    
    if (!success) {
      return NextResponse.json({ error: 'Failed to delete offer' }, { status: 400 })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[v0] Error in DELETE /api/offers/[id]:', error)
    return NextResponse.json({ error: 'Failed to delete offer' }, { status: 500 })
  }
}
