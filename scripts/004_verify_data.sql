-- Count categories
SELECT 'Categories' as type, COUNT(*) as count FROM menu_categories;

-- Count menu items
SELECT 'Menu Items' as type, COUNT(*) as count FROM menu_items;

-- Count offers
SELECT 'Offers' as type, COUNT(*) as count FROM offers;

-- Show categories
SELECT name, slug, display_order FROM menu_categories ORDER BY display_order;

-- Show first 10 menu items with category names
SELECT mi.name, mc.name as category, mi.price, mi.family_price, mi.is_veg, mi.is_spicy 
FROM menu_items mi
JOIN menu_categories mc ON mi.category_id = mc.id
ORDER BY mc.display_order, mi.display_order
LIMIT 10;
