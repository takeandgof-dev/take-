import { getCategories, createCategory, updateCategory, deleteCategory } from '@/lib/neon/menu-service'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const categories = await getCategories()
    return NextResponse.json({ success: true, data: categories })
  } catch (error) {
    console.error('[v0] Error fetching categories:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const newCategory = await createCategory(body)
    
    if (!newCategory) {
      return NextResponse.json(
        { success: false, error: 'Failed to create category' },
        { status: 400 }
      )
    }
    
    return NextResponse.json({ success: true, data: newCategory })
  } catch (error) {
    console.error('[v0] Error creating category:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create category' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, data } = await request.json()
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Category ID is required' },
        { status: 400 }
      )
    }
    
    const updatedCategory = await updateCategory(id, data)
    
    if (!updatedCategory) {
      return NextResponse.json(
        { success: false, error: 'Failed to update category' },
        { status: 400 }
      )
    }
    
    return NextResponse.json({ success: true, data: updatedCategory })
  } catch (error) {
    console.error('[v0] Error updating category:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update category' },
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
        { success: false, error: 'Category ID is required' },
        { status: 400 }
      )
    }
    
    const success = await deleteCategory(id)
    
    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Failed to delete category' },
        { status: 400 }
      )
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[v0] Error deleting category:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete category' },
      { status: 500 }
    )
  }
}
