import { getMenuItems, createMenuItem, updateMenuItem, deleteMenuItem } from '@/lib/neon/menu-service'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const onlyAvailable = searchParams.get('available') === 'true'
    
    const items = await getMenuItems(onlyAvailable)
    return NextResponse.json({ success: true, data: items })
  } catch (error) {
    console.error('[v0] Error fetching items:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch menu items' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const newItem = await createMenuItem(body)
    
    if (!newItem) {
      return NextResponse.json(
        { success: false, error: 'Failed to create menu item' },
        { status: 400 }
      )
    }
    
    return NextResponse.json({ success: true, data: newItem })
  } catch (error) {
    console.error('[v0] Error creating item:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create menu item' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, data } = await request.json()
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Item ID is required' },
        { status: 400 }
      )
    }
    
    const updatedItem = await updateMenuItem(id, data)
    
    if (!updatedItem) {
      return NextResponse.json(
        { success: false, error: 'Failed to update menu item' },
        { status: 400 }
      )
    }
    
    return NextResponse.json({ success: true, data: updatedItem })
  } catch (error) {
    console.error('[v0] Error updating item:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update menu item' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Item ID is required' },
        { status: 400 }
      )
    }
    
    const success = await deleteMenuItem(id)
    
    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Failed to delete menu item' },
        { status: 400 }
      )
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[v0] Error deleting item:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete menu item' },
      { status: 500 }
    )
  }
}
