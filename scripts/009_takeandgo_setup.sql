-- Create menu categories table (if not exists)
CREATE TABLE IF NOT EXISTS menu_categories (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create menu items table (if not exists)
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

-- Clear existing data for fresh start
TRUNCATE menu_items CASCADE;
TRUNCATE menu_categories CASCADE;

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
('Shawarma', 'shawarma', 11);

-- Get category IDs for insertion
WITH cat AS (
  SELECT id, slug FROM menu_categories
)

INSERT INTO menu_items (category_id, name, description, price, family_price, is_veg, is_spicy, display_order) VALUES
-- Pizzagrupp 1
((SELECT id FROM cat WHERE slug = 'pizzagrupp-1'), 'Margherita', 'Tomatsås, ost', '105:-', '212:-', true, false, 1),
((SELECT id FROM cat WHERE slug = 'pizzagrupp-1'), 'Vesuvio', 'Skinka', '109:-', '226:-', false, false, 2),
((SELECT id FROM cat WHERE slug = 'pizzagrupp-1'), 'Funghi', 'Champinjoner', '109:-', '226:-', true, false, 3),
((SELECT id FROM cat WHERE slug = 'pizzagrupp-1'), 'Köttfärspizza', 'Köttfärs', '109:-', '226:-', false, false, 4),

-- Pizzagrupp 2
((SELECT id FROM cat WHERE slug = 'pizzagrupp-2'), 'Hawaii', 'Skinka, ananas', '114:-', '242:-', false, false, 1),
((SELECT id FROM cat WHERE slug = 'pizzagrupp-2'), 'Capricciosa', 'Skinka, champinjoner', '114:-', '242:-', false, false, 2),
((SELECT id FROM cat WHERE slug = 'pizzagrupp-2'), 'Salami', 'Salami, paprika, lök', '114:-', '242:-', false, false, 3),
((SELECT id FROM cat WHERE slug = 'pizzagrupp-2'), 'Hot Honey Pepperoni', 'Pepperoni, chili, honung', '114:-', '242:-', false, true, 4),

-- Specialpizzor
((SELECT id FROM cat WHERE slug = 'specialpizzor'), 'Naki''s Special', 'Tonfisk, champinjoner, paprika, lök, vitlök', '127:-', '272:-', false, false, 1),
((SELECT id FROM cat WHERE slug = 'specialpizzor'), 'Mexicana', 'Köttfärs, paprika, champinjoner, lök, vitlök, feferoni, cayennepeppar', '129:-', '272:-', false, true, 2),
((SELECT id FROM cat WHERE slug = 'specialpizzor'), 'Vegetariana', 'Champinjoner, paprika, lök, oliver, ananas', '129:-', '272:-', true, false, 3),
((SELECT id FROM cat WHERE slug = 'specialpizzor'), 'Greek Sunset', 'Fetaost, oliver, tomat', '129:-', '272:-', true, false, 4),
((SELECT id FROM cat WHERE slug = 'specialpizzor'), 'Napoli', 'Fetaost, champinjoner, lök, vitlök, oliver', '129:-', '272:-', true, false, 5),
((SELECT id FROM cat WHERE slug = 'specialpizzor'), 'Svamp', 'Crème fraiche, ost, champinjoner, tryffelolja', '129:-', '272:-', true, false, 6),

-- Oxfilépizzor
((SELECT id FROM cat WHERE slug = 'oxfilepizzor'), 'Oxfilépizza', 'Tomatsås, ost, oxfilé, lök, bearnaisesås', '135:-', '286:-', false, false, 1),
((SELECT id FROM cat WHERE slug = 'oxfilepizzor'), 'Oxfilé Special', 'Oxfilé, färska champinjoner, lök, färska tomater, bearnaisesås', '139:-', '289:-', false, false, 2),
((SELECT id FROM cat WHERE slug = 'oxfilepizzor'), 'Acapulco', 'Oxfilé, champinjoner, lök, vitlök, tacosås, jalapeno', '139:-', '289:-', false, true, 3),

-- Kycklingpizzor
((SELECT id FROM cat WHERE slug = 'kycklingpizzor'), 'Kyckling pizza / kycklingkebab pizza', 'Ost, kyckling, valfri sås', '119:-', '264:-', false, false, 1),
((SELECT id FROM cat WHERE slug = 'kycklingpizzor'), 'BBQ Kyckling', 'BBQ-sås, ost, kyckling, rödlök', '129:-', '272:-', false, false, 2),
((SELECT id FROM cat WHERE slug = 'kycklingpizzor'), 'Kyckling Special', 'Kyckling, champinjoner, lök, valfri sås', '129:-', '272:-', false, false, 3),
((SELECT id FROM cat WHERE slug = 'kycklingpizzor'), 'Tikka Masala Pizza', 'Tikka masala, mozzarella, kyckling, rödlök', '135:-', '286:-', false, false, 4),
((SELECT id FROM cat WHERE slug = 'kycklingpizzor'), 'Garlic Butter Chicken', 'Vitlökssmör, ost, kyckling, lök', '135:-', '286:-', false, false, 5),
((SELECT id FROM cat WHERE slug = 'kycklingpizzor'), 'Creamy Pesto Chicken', 'Pesto, ost, kyckling, parmesan', '135:-', '286:-', false, false, 6),

-- Kebabpizzor
((SELECT id FROM cat WHERE slug = 'kebabpizzor'), 'Kebabpizza', 'Kebabkött, ost, lök, feferoni, valfri sås', '119:-', '264:-', false, false, 1),
((SELECT id FROM cat WHERE slug = 'kebabpizzor'), 'Pommespizza', 'Kebabkött, pommes, valfri sås', '124:-', '274:-', false, false, 2),
((SELECT id FROM cat WHERE slug = 'kebabpizzor'), 'Kebab Special', 'Kebabkött, tomat, lök, gurka, sallad, feferoni, valfri sås', '124:-', '274:-', false, false, 3),

-- Rullar
((SELECT id FROM cat WHERE slug = 'rullar'), 'Kebab i bröd / Kyckling', 'Isbergssallad, lök, kebabkött eller kyckling, valfri sås', '104:-', NULL, false, false, 1),
((SELECT id FROM cat WHERE slug = 'rullar'), 'Kebabrulle', 'Isbergssallad, lök, kebabkött, valfri sås', '104:-', NULL, false, false, 2),
((SELECT id FROM cat WHERE slug = 'rullar'), 'Kycklingrulle', 'Isbergssallad, lök, kyckling, valfri sås', '104:-', NULL, false, false, 3),
((SELECT id FROM cat WHERE slug = 'rullar'), 'Kycklingkebabrulle', 'Isbergssallad, lök, kycklingkebab, valfri sås', '104:-', NULL, false, false, 4),
((SELECT id FROM cat WHERE slug = 'rullar'), 'Falafelrulle', 'Isbergssallad, lök, tomat, gurka, falafel, valfri sås', '104:-', NULL, true, false, 5),
((SELECT id FROM cat WHERE slug = 'rullar'), 'Pommesrulle', 'Pommes, majonnäs, ketchup', '59:-', NULL, true, false, 6),

-- Tallrikar
((SELECT id FROM cat WHERE slug = 'tallrikar'), 'Kebabtallrik', 'Isbergssallad, kebabkött, pommes, tomat, gurka, feferoni, lök', '119:-', NULL, false, false, 1),
((SELECT id FROM cat WHERE slug = 'tallrikar'), 'Kycklingtallrik / Kycklingkebab', 'Isbergssallad, kyckling, pommes, tomat, gurka, feferoni, lök', '119:-', NULL, false, false, 2),
((SELECT id FROM cat WHERE slug = 'tallrikar'), 'Falafeltallrik', 'Isbergssallad, lök, tomat, gurka, pommes, falafel, feferoni, valfri sås', '119:-', NULL, true, false, 3),

-- Burgare
((SELECT id FROM cat WHERE slug = 'burgare'), 'Cheeseburger', 'Högkvalitativ nötkött, smörrostat briochebröd, hamburgerdressing, sallad, tomat, lök, pickles, dubbel cheddarost serveras med pommes frites. 1 x 90g = 99:-, 2 x 90g = 129:-', '99:-', '129:-', false, false, 1),
((SELECT id FROM cat WHERE slug = 'burgare'), 'Hot N'' Cheesy', 'Högkvalitativ nötkött, smörrostat briochebröd, ChiliMayo, sallad, tomat, lök, jalapeno, dubbel cheddarost serveras med pommes. 1 x 90g = 99:-, 2 x 90g = 129:-', '99:-', '129:-', false, true, 2),
((SELECT id FROM cat WHERE slug = 'burgare'), 'Crispy Fried Chicken Burger', 'Avokadomajonnäs eller aioli, smörrostat briochebröd, sallad, tomat, picklad rödlök. Serveras med pommes', '99:-', NULL, false, false, 3),
((SELECT id FROM cat WHERE slug = 'burgare'), 'Halloumiburgare', 'Potatisbröd, Pesto/ Aioli/ ChiliMayo dressing, sallad, tomat, picklad rödlök, gurka. Serveras med pommes', '99:-', NULL, true, false, 4),

-- Nuggets
((SELECT id FROM cat WHERE slug = 'nuggets'), 'Chicken nuggets tallrik', 'Pommes, 8 bitar nuggets, ketchup', '119:-', NULL, false, false, 1),
((SELECT id FROM cat WHERE slug = 'nuggets'), 'Chicken nuggets barntallrik', 'Pommes, 4 bitar nuggets, ketchup', '79:-', NULL, false, false, 2),

-- Shawarma
((SELECT id FROM cat WHERE slug = 'shawarma'), 'Shawarma Arabi (Kyckling)', 'Kycklingrulle i bitar med pommes, vitlökssås, tomat, pickles, granatäppelsås', '104:-', NULL, false, false, 1),
((SELECT id FROM cat WHERE slug = 'shawarma'), 'Kyckling Shawarma Rulle', 'Kyckling, vitlökssås, saltgurka, granatäppelsås', '79:-', NULL, false, false, 2);
