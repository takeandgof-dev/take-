// Firebase menu service is disabled - using Neon PostgreSQL instead
// See lib/neon/menu-service.ts for the active implementation

import type { MenuCategory, MenuItem } from "@/lib/types"

export async function getCategories(): Promise<MenuCategory[]> {
  console.log("[v0] Firebase menu service disabled - use Neon instead")
  return []
}

export async function createCategory(data: Omit<MenuCategory, "id" | "created_at" | "updated_at">): Promise<MenuCategory | null> {
  console.log("[v0] Firebase menu service disabled - use Neon instead")
  return null
}

export async function updateCategory(id: string, data: Partial<MenuCategory>): Promise<MenuCategory | null> {
  console.log("[v0] Firebase menu service disabled - use Neon instead")
  return null
}

export async function deleteCategory(id: string): Promise<boolean> {
  console.log("[v0] Firebase menu service disabled - use Neon instead")
  return false
}

export async function getMenuItems(onlyAvailable = false): Promise<MenuItem[]> {
  console.log("[v0] Firebase menu service disabled - use Neon instead")
  return []
}

export async function createMenuItem(data: Omit<MenuItem, "id" | "created_at" | "updated_at">): Promise<MenuItem | null> {
  console.log("[v0] Firebase menu service disabled - use Neon instead")
  return null
}

export async function updateMenuItem(id: string, data: Partial<MenuItem>): Promise<MenuItem | null> {
  console.log("[v0] Firebase menu service disabled - use Neon instead")
  return null
}

export async function deleteMenuItem(id: string): Promise<boolean> {
  console.log("[v0] Firebase menu service disabled - use Neon instead")
  return false
}
