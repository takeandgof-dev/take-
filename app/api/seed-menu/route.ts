import { NextRequest, NextResponse } from "next/server"

// This endpoint is deprecated - menu data is stored in Neon PostgreSQL
// Use the admin dashboard to manage menu items

export async function POST(request: NextRequest) {
  return NextResponse.json(
    { 
      error: "This endpoint is deprecated. Menu data is now stored in Neon PostgreSQL.",
      message: "Use the admin dashboard at /admin to manage menu items."
    },
    { status: 400 }
  )
}
