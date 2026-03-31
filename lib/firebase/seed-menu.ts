// Firebase seed-menu is disabled - using Neon PostgreSQL instead
// See scripts/ folder for Neon database seeding

export async function seedMenuData(menuData: {
  categories: Array<{ name: string; order: number }>;
  items: Array<{ category: string; name: string; description: string; prices: Array<{ size: string; price: number }>; tags: string[]; order: number }>;
}) {
  console.log('[v0] Firebase seed disabled - menu data is stored in Neon PostgreSQL')
  return { categoriesAdded: 0, itemsAdded: 0 }
}
