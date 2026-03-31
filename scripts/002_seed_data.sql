-- Insert initial categories
INSERT INTO menu_categories (name, slug, display_order) VALUES
  ('Pizza', 'pizza', 1),
  ('Burgare', 'burgare', 2),
  ('Drycker', 'drycker', 3),
  ('Efterätter', 'efteratter', 4)
ON CONFLICT (slug) DO NOTHING;

-- Insert initial menu items
INSERT INTO menu_items (name, description, price, family_price, category_id, is_veg, is_spicy, is_available, display_order)
SELECT 
  'Margherita',
  'Klassisk italiensk pizza med tomatsås, mozzarella och basilika',
  12.99,
  18.99,
  (SELECT id FROM menu_categories WHERE slug = 'pizza'),
  true,
  false,
  true,
  1
WHERE NOT EXISTS (SELECT 1 FROM menu_items WHERE name = 'Margherita');

INSERT INTO menu_items (name, description, price, family_price, category_id, is_veg, is_spicy, is_available, display_order)
SELECT 
  'Klassisk Burger',
  'Saftig nötburgare med bacon, ost och franska lökar',
  9.99,
  15.99,
  (SELECT id FROM menu_categories WHERE slug = 'burgare'),
  false,
  false,
  true,
  1
WHERE NOT EXISTS (SELECT 1 FROM menu_items WHERE name = 'Klassisk Burger');

-- Insert initial offers
INSERT INTO offers (title, description, discount_percent, start_date, end_date, is_active)
SELECT 
  'Fredags Pizza',
  'Få 20% rabatt på alla pizzor på fredagar!',
  20,
  CURRENT_DATE,
  CURRENT_DATE + INTERVAL '30 days',
  true
WHERE NOT EXISTS (SELECT 1 FROM offers WHERE title = 'Fredags Pizza');
