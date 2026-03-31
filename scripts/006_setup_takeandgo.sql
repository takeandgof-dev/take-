-- Create tables for Take & Go Falkenberg menu system
CREATE TABLE IF NOT EXISTS menu_categories (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS menu_items (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  category_id TEXT REFERENCES menu_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price TEXT NOT NULL,
  family_price TEXT,
  is_veg BOOLEAN DEFAULT FALSE,
  is_spicy BOOLEAN DEFAULT FALSE,
  is_available BOOLEAN DEFAULT TRUE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS site_settings (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  key TEXT NOT NULL UNIQUE,
  value TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert categories
INSERT INTO menu_categories (name, slug, display_order) VALUES
  ('Pizzagrupp 1', 'pizzagrupp-1', 1),
  ('Pizzagrupp 2', 'pizzagrupp-2', 2),
  ('Specialpizzor', 'specialpizzor', 3),
  ('Oxfilépizzor', 'oxfilepizzor', 4),
  ('Kycklingpizzor', 'kycklingpizzor', 5),
  ('Kebabpizzor', 'kebabpizzor', 6),
  ('Rullar', 'rullar', 7),
  ('Tallrikar', 'tallrikar', 8),
  ('Burgare', 'burgare', 9),
  ('Nuggets', 'nuggets', 10),
  ('Shawarma', 'shawarma', 11)
ON CONFLICT (slug) DO NOTHING;

-- Insert menu items for Pizzagrupp 1
INSERT INTO menu_items (category_id, name, description, price, family_price, is_veg, display_order) VALUES
  ((SELECT id FROM menu_categories WHERE slug = 'pizzagrupp-1'), 'Margherita', 'Tomatsås, ost', '105:-', '212:-', true, 1),
  ((SELECT id FROM menu_categories WHERE slug = 'pizzagrupp-1'), 'Vesuvio', 'Skinka', '109:-', '226:-', false, 2),
  ((SELECT id FROM menu_categories WHERE slug = 'pizzagrupp-1'), 'Funghi', 'Champinjoner', '109:-', '226:-', true, 3),
  ((SELECT id FROM menu_categories WHERE slug = 'pizzagrupp-1'), 'Köttfärspizza', 'Köttfärs', '109:-', '226:-', false, 4)
ON CONFLICT DO NOTHING;

-- Insert menu items for Pizzagrupp 2
INSERT INTO menu_items (category_id, name, description, price, family_price, display_order) VALUES
  ((SELECT id FROM menu_categories WHERE slug = 'pizzagrupp-2'), 'Hawaii', 'Skinka, ananas', '114:-', '242:-', 2),
  ((SELECT id FROM menu_categories WHERE slug = 'pizzagrupp-2'), 'Capricciosa', 'Skinka, champinjoner', '114:-', '242:-', 3),
  ((SELECT id FROM menu_categories WHERE slug = 'pizzagrupp-2'), 'Salami', 'Salami, paprika, lök', '114:-', '242:-', 4),
  ((SELECT id FROM menu_categories WHERE slug = 'pizzagrupp-2'), 'Hot Honey Pepperoni', 'Pepperoni, chili, honung', '114:-', '242:-', 5)
ON CONFLICT DO NOTHING;

-- Insert Specialpizzor
INSERT INTO menu_items (category_id, name, description, price, family_price, display_order) VALUES
  ((SELECT id FROM menu_categories WHERE slug = 'specialpizzor'), 'Naki''s Special', 'Tonfisk, champinjoner, paprika, lök, vitlök', '127:-', '272:-', 1),
  ((SELECT id FROM menu_categories WHERE slug = 'specialpizzor'), 'Mexicana', 'Köttfärs, paprika, champinjoner, lök, vitlök, feferoni, cayennepeppar', '129:-', '272:-', 2),
  ((SELECT id FROM menu_categories WHERE slug = 'specialpizzor'), 'Vegetariana', 'Champinjoner, paprika, lök, oliver, ananas', '129:-', '272:-', 3),
  ((SELECT id FROM menu_categories WHERE slug = 'specialpizzor'), 'Greek Sunset', 'Fetaost, oliver, tomat', '129:-', '272:-', 4),
  ((SELECT id FROM menu_categories WHERE slug = 'specialpizzor'), 'Napoli', 'Fetaost, champinjoner, lök, vitlök, oliver', '129:-', '272:-', 5),
  ((SELECT id FROM menu_categories WHERE slug = 'specialpizzor'), 'Svamp', 'Crème fraiche, ost, champinjoner, tryffelolja', '129:-', '272:-', 6)
ON CONFLICT DO NOTHING;

-- Insert Oxfilépizzor
INSERT INTO menu_items (category_id, name, description, price, family_price, display_order) VALUES
  ((SELECT id FROM menu_categories WHERE slug = 'oxfilepizzor'), 'Oxfilépizza', 'Tomatsås, ost, oxfilé, lök, bearnaisesås', '135:-', '286:-', 1),
  ((SELECT id FROM menu_categories WHERE slug = 'oxfilepizzor'), 'Oxfilé Special', 'Oxfilé, färska champinjoner, lök, färska tomater, bearnaisesås', '139:-', '289:-', 2),
  ((SELECT id FROM menu_categories WHERE slug = 'oxfilepizzor'), 'Acapulco', 'Oxfilé, champinjoner, lök, vitlök, tacosås, jalapeno', '139:-', '289:-', 3)
ON CONFLICT DO NOTHING;

-- Insert Kycklingpizzor
INSERT INTO menu_items (category_id, name, description, price, family_price, display_order) VALUES
  ((SELECT id FROM menu_categories WHERE slug = 'kycklingpizzor'), 'Kyckling pizza', 'Ost, kyckling, valfri sås', '119:-', '264:-', 1),
  ((SELECT id FROM menu_categories WHERE slug = 'kycklingpizzor'), 'BBQ Kyckling', 'BBQ-sås, ost, kyckling, rödlök', '129:-', '272:-', 2),
  ((SELECT id FROM menu_categories WHERE slug = 'kycklingpizzor'), 'Kyckling Special', 'Kyckling, champinjoner, lök, valfri sås', '129:-', '272:-', 3),
  ((SELECT id FROM menu_categories WHERE slug = 'kycklingpizzor'), 'Tikka Masala Pizza', 'Tikka masala, mozzarella, kyckling, rödlök', '135:-', '286:-', 4),
  ((SELECT id FROM menu_categories WHERE slug = 'kycklingpizzor'), 'Garlic Butter Chicken', 'Vitlökssmör, ost, kyckling, lök', '135:-', '286:-', 5),
  ((SELECT id FROM menu_categories WHERE slug = 'kycklingpizzor'), 'Creamy Pesto Chicken', 'Pesto, ost, kyckling, parmesan', '135:-', '286:-', 6)
ON CONFLICT DO NOTHING;

-- Insert Kebabpizzor
INSERT INTO menu_items (category_id, name, description, price, family_price, display_order) VALUES
  ((SELECT id FROM menu_categories WHERE slug = 'kebabpizzor'), 'Kebabpizza', 'Kebabkött, ost, lök, feferoni, valfri sås', '119:-', '264:-', 1),
  ((SELECT id FROM menu_categories WHERE slug = 'kebabpizzor'), 'Pommespizza', 'Kebabkött, pommes, valfri sås', '124:-', '274:-', 2),
  ((SELECT id FROM menu_categories WHERE slug = 'kebabpizzor'), 'Kebab Special', 'Kebabkött, tomat, lök, gurka, sallad, feferoni, valfri sås', '124:-', '274:-', 3)
ON CONFLICT DO NOTHING;

-- Insert Rullar
INSERT INTO menu_items (category_id, name, description, price, family_price, display_order) VALUES
  ((SELECT id FROM menu_categories WHERE slug = 'rullar'), 'Kebab i bröd / Kyckling', 'Isbergssallad, lök, kebabkött eller kyckling, valfri sås', '104:-', NULL, 1),
  ((SELECT id FROM menu_categories WHERE slug = 'rullar'), 'Kebabrulle', 'Isbergssallad, lök, kebabkött, valfri sås', '104:-', NULL, 2),
  ((SELECT id FROM menu_categories WHERE slug = 'rullar'), 'Kycklingrulle', 'Isbergssallad, lök, kyckling, valfri sås', '104:-', NULL, 3),
  ((SELECT id FROM menu_categories WHERE slug = 'rullar'), 'Kycklingkebabrulle', 'Isbergssallad, lök, kycklingkebab, valfri sås', '104:-', NULL, 4),
  ((SELECT id FROM menu_categories WHERE slug = 'rullar'), 'Falafelrulle', 'Isbergssallad, lök, tomat, gurka, falafel, valfri sås', '74:-', '104:-', 5),
  ((SELECT id FROM menu_categories WHERE slug = 'rullar'), 'Pommesrulle', 'Pommes, majonnäs, ketchup', '59:-', NULL, 6)
ON CONFLICT DO NOTHING;

-- Insert Tallrikar
INSERT INTO menu_items (category_id, name, description, price, display_order) VALUES
  ((SELECT id FROM menu_categories WHERE slug = 'tallrikar'), 'Kebabtallrik', 'Isbergssallad, kebabkött, pommes, tomat, gurka, feferoni, lök', '119:-', 1),
  ((SELECT id FROM menu_categories WHERE slug = 'tallrikar'), 'Kycklingtallrik', 'Isbergssallad, kyckling, pommes, tomat, gurka, feferoni, lök', '119:-', 2),
  ((SELECT id FROM menu_categories WHERE slug = 'tallrikar'), 'Falafeltallrik', 'Isbergssallad, lök, tomat, gurka, pommes, falafel, feferoni, valfri sås', '119:-', 3)
ON CONFLICT DO NOTHING;

-- Insert Burgare
INSERT INTO menu_items (category_id, name, description, price, display_order) VALUES
  ((SELECT id FROM menu_categories WHERE slug = 'burgare'), 'Cheeseburger (1x90g)', 'Högkvalitativ nötkött, smörrostat briochebröd, hamburgerdressing, sallad, tomat, lök, pickles, dubbel cheddarost serveras med pommes frites', '99:-', 1),
  ((SELECT id FROM menu_categories WHERE slug = 'burgare'), 'Cheeseburger (2x90g)', 'Högkvalitativ nötkött, smörrostat briochebröd, hamburgerdressing, sallad, tomat, lök, pickles, dubbel cheddarost serveras med pommes frites', '129:-', 2),
  ((SELECT id FROM menu_categories WHERE slug = 'burgare'), 'Hot N'' Cheesy (1x90g)', 'Högkvalitativ nötkött, smörrostat briochebröd, ChiliMayo, sallad, tomat, lök, jalapeno, dubbel cheddarost serveras med pommes', '99:-', 3),
  ((SELECT id FROM menu_categories WHERE slug = 'burgare'), 'Hot N'' Cheesy (2x90g)', 'Högkvalitativ nötkött, smörrostat briochebröd, ChiliMayo, sallad, tomat, lök, jalapeno, dubbel cheddarost serveras med pommes', '129:-', 4),
  ((SELECT id FROM menu_categories WHERE slug = 'burgare'), 'Crispy Fried Chicken Burger', 'Avokadomajonnäs eller aioli, smörrostat briochebröd, sallad, tomat, picklad rödlök. Serveras med pommes', '99:-', 5),
  ((SELECT id FROM menu_categories WHERE slug = 'burgare'), 'Halloumiburgare', 'Potatisbröd, Pesto/ Aioli/ ChiliMayo dressing, sallad, tomat, picklad rödlök, gurka. Serveras med pommes', '99:-', 6)
ON CONFLICT DO NOTHING;

-- Insert Nuggets
INSERT INTO menu_items (category_id, name, description, price, display_order) VALUES
  ((SELECT id FROM menu_categories WHERE slug = 'nuggets'), 'Chicken nuggets tallrik', 'Pommes, 8 bitar nuggets, ketchup', '119:-', 1),
  ((SELECT id FROM menu_categories WHERE slug = 'nuggets'), 'Chicken nuggets barntallrik', 'Pommes, 4 bitar nuggets, ketchup', '79:-', 2)
ON CONFLICT DO NOTHING;

-- Insert Shawarma
INSERT INTO menu_items (category_id, name, description, price, display_order) VALUES
  ((SELECT id FROM menu_categories WHERE slug = 'shawarma'), 'Shawarma Arabi (Kyckling)', 'Kycklingrulle i bitar med pommes, vitlökssås, tomat, pickles, granatäppelsås', '104:-', 1),
  ((SELECT id FROM menu_categories WHERE slug = 'shawarma'), 'Kyckling Shawarma Rulle', 'Kyckling, vitlökssås, saltgurka, granatäppelsås', '79:-', 2)
ON CONFLICT DO NOTHING;
