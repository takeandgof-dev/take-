import { NextRequest, NextResponse } from 'next/server'
import { getOffers, createOffer } from '@/lib/neon/offers-service'
import type { Offer } from '@/lib/types'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const onlyActive = searchParams.get('active') !== 'false'
    
    console.log('[v0] GET /api/offers - onlyActive:', onlyActive)
    const offers = await getOffers(onlyActive)
    return NextResponse.json(offers)
  } catch (error) {
    console.error('[v0] Error in GET /api/offers:', error)
    return NextResponse.json({ error: 'Failed to fetch offers' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as Omit<Offer, 'id' | 'created_at' | 'updated_at'>
    
    console.log('[v0] POST /api/offers - title:', body.title)
    const offer = await createOffer(body)
    
    if (!offer) {
      return NextResponse.json({ error: 'Failed to create offer' }, { status: 400 })
    }
    
    return NextResponse.json(offer, { status: 201 })
  } catch (error) {
    console.error('[v0] Error in POST /api/offers:', error)
    return NextResponse.json({ error: 'Failed to create offer' }, { status: 500 })
  }
}
