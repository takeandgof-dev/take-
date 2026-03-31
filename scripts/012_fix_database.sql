-- Drop existing tables if they exist (to start fresh)
DROP TABLE IF EXISTS offers CASCADE;
DROP TABLE IF EXISTS menu_items CASCADE;
DROP TABLE IF EXISTS menu_categories CASCADE;

-- Create menu_categories table
CREATE TABLE menu_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create menu_items table
CREATE TABLE menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES menu_categories(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  family_price DECIMAL(10, 2),
  is_veg BOOLEAN DEFAULT FALSE,
  is_spicy BOOLEAN DEFAULT FALSE,
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create offers table
CREATE TABLE offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  discount_percent INTEGER,
  discount_amount DECIMAL(10, 2),
  valid_from TIMESTAMP,
  valid_until TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert categories
INSERT INTO menu_categories (name, slug, display_order) VALUES
('Pizzor', 'pizzor', 1),
('Rullar', 'rullar', 2),
('Tallrikar', 'tallrikar', 3),
('Burgare', 'burgare', 4),
('Nuggets', 'nuggets', 5),
('Shawarma', 'shawarma', 6);

-- Insert Pizza items
INSERT INTO menu_items (category_id, name, description, price, is_veg, is_available)
VALUES (
  (SELECT id FROM menu_categories WHERE slug = 'pizzor'),
  'Margherita',
  'Tomatsås, ost',
  105.00,
  TRUE,
  TRUE
);

INSERT INTO menu_items (category_id, name, description, price, is_veg, is_available)
VALUES (
  (SELECT id FROM menu_categories WHERE slug = 'pizzor'),
  'Vesuvio',
  'Skinka',
  109.00,
  FALSE,
  TRUE
);

INSERT INTO menu_items (category_id, name, description, price, is_veg, is_available)
VALUES (
  (SELECT id FROM menu_categories WHERE slug = 'pizzor'),
  'Funghi',
  'Champinjoner',
  109.00,
  TRUE,
  TRUE
);

INSERT INTO menu_items (category_id, name, description, price, is_veg, is_available)
VALUES (
  (SELECT id FROM menu_categories WHERE slug = 'pizzor'),
  'Köttfärspizza',
  'Köttfärs',
  109.00,
  FALSE,
  TRUE
);

INSERT INTO menu_items (category_id, name, description, price, is_veg, is_available)
VALUES (
  (SELECT id FROM menu_categories WHERE slug = 'pizzor'),
  'Hawaii',
  'Skinka, ananas',
  114.00,
  FALSE,
  TRUE
);

INSERT INTO menu_items (category_id, name, description, price, is_veg, is_available)
VALUES (
  (SELECT id FROM menu_categories WHERE slug = 'pizzor'),
  'Capricciosa',
  'Skinka, champinjoner',
  114.00,
  FALSE,
  TRUE
);

INSERT INTO menu_items (category_id, name, description, price, is_veg, is_available)
VALUES (
  (SELECT id FROM menu_categories WHERE slug = 'pizzor'),
  'Salami',
  'Salami, paprika, lök',
  114.00,
  FALSE,
  TRUE
);

INSERT INTO menu_items (category_id, name, description, price, is_veg, is_available)
VALUES (
  (SELECT id FROM menu_categories WHERE slug = 'pizzor'),
  'Hot Honey Pepperoni',
  'Pepperoni, chili, honung',
  114.00,
  FALSE,
  TRUE
);

INSERT INTO menu_items (category_id, name, description, price, is_veg, is_available)
VALUES (
  (SELECT id FROM menu_categories WHERE slug = 'pizzor'),
  'Naki''s Special',
  'Tonfisk, champinjoner, paprika, lök, vitlök',
  127.00,
  FALSE,
  TRUE
);

INSERT INTO menu_items (category_id, name, description, price, is_veg, is_available)
VALUES (
  (SELECT id FROM menu_categories WHERE slug = 'pizzor'),
  'Mexicana',
  'Köttfärs, paprika, champinjoner, lök, vitlök, feferoni',
  129.00,
  FALSE,
  TRUE
);

INSERT INTO menu_items (category_id, name, description, price, is_veg, is_available)
VALUES (
  (SELECT id FROM menu_categories WHERE slug = 'pizzor'),
  'Vegetariana',
  'Champinjoner, paprika, lök, oliver, ananas',
  129.00,
  TRUE,
  TRUE
);

INSERT INTO menu_items (category_id, name, description, price, is_veg, is_available)
VALUES (
  (SELECT id FROM menu_categories WHERE slug = 'pizzor'),
  'Greek Sunset',
  'Fetaost, oliver, tomat',
  129.00,
  TRUE,
  TRUE
);

INSERT INTO menu_items (category_id, name, description, price, is_veg, is_available)
VALUES (
  (SELECT id FROM menu_categories WHERE slug = 'pizzor'),
  'Napoli',
  'Fetaost, champinjoner, lök, vitlök, oliver',
  129.00,
  TRUE,
  TRUE
);

INSERT INTO menu_items (category_id, name, description, price, is_veg, is_available)
VALUES (
  (SELECT id FROM menu_categories WHERE slug = 'pizzor'),
  'Svamp',
  'Crème fraiche, ost, champinjoner, tryffelolja',
  129.00,
  TRUE,
  TRUE
);

INSERT INTO menu_items (category_id, name, description, price, is_veg, is_available)
VALUES (
  (SELECT id FROM menu_categories WHERE slug = 'pizzor'),
  'Oxfilépizza',
  'Tomatsås, ost, oxfilé, lök, bearnaisesås',
  135.00,
  FALSE,
  TRUE
);

INSERT INTO menu_items (category_id, name, description, price, is_veg, is_available)
VALUES (
  (SELECT id FROM menu_categories WHERE slug = 'pizzor'),
  'Oxfilé Special',
  'Oxfilé, färska champinjoner, lök, färska tomater, bearnaisesås',
  139.00,
  FALSE,
  TRUE
);

INSERT INTO menu_items (category_id, name, description, price, is_veg, is_available)
VALUES (
  (SELECT id FROM menu_categories WHERE slug = 'pizzor'),
  'Acapulco',
  'Oxfilé, champinjoner, lök, vitlök, tacosås, jalapeno',
  139.00,
  FALSE,
  TRUE
);

INSERT INTO menu_items (category_id, name, description, price, is_veg, is_available)
VALUES (
  (SELECT id FROM menu_categories WHERE slug = 'pizzor'),
  'Kyckling pizza',
  'Ost, kyckling, valfri sås',
  119.00,
  FALSE,
  TRUE
);

INSERT INTO menu_items (category_id, name, description, price, is_veg, is_available)
VALUES (
  (SELECT id FROM menu_categories WHERE slug = 'pizzor'),
  'BBQ Kyckling',
  'BBQ-sås, ost, kyckling, rödlök',
  129.00,
  FALSE,
  TRUE
);

INSERT INTO menu_items (category_id, name, description, price, is_veg, is_available)
VALUES (
  (SELECT id FROM menu_categories WHERE slug = 'pizzor'),
  'Kyckling Special',
  'Kyckling, champinjoner, lök, valfri sås',
  129.00,
  FALSE,
  TRUE
);

INSERT INTO menu_items (category_id, name, description, price, is_veg, is_available)
VALUES (
  (SELECT id FROM menu_categories WHERE slug = 'pizzor'),
  'Tikka Masala Pizza',
  'Tikka masala, mozzarella, kyckling, rödlök',
  135.00,
  FALSE,
  TRUE
);

INSERT INTO menu_items (category_id, name, description, price, is_veg, is_available)
VALUES (
  (SELECT id FROM menu_categories WHERE slug = 'pizzor'),
  'Garlic Butter Chicken',
  'Vitlökssmör, ost, kyckling, lök',
  135.00,
  FALSE,
  TRUE
);

INSERT INTO menu_items (category_id, name, description, price, is_veg, is_available)
VALUES (
  (SELECT id FROM menu_categories WHERE slug = 'pizzor'),
  'Creamy Pesto Chicken',
  'Pesto, ost, kyckling, parmesan',
  135.00,
  FALSE,
  TRUE
);

INSERT INTO menu_items (category_id, name, description, price, is_veg, is_available)
VALUES (
  (SELECT id FROM menu_categories WHERE slug = 'pizzor'),
  'Kebabpizza',
  'Kebabkött, ost, lök, feferoni, valfri sås',
  119.00,
  FALSE,
  TRUE
);

INSERT INTO menu_items (category_id, name, description, price, is_veg, is_available)
VALUES (
  (SELECT id FROM menu_categories WHERE slug = 'pizzor'),
  'Pommespizza',
  'Kebabkött, pommes, valfri sås',
  124.00,
  FALSE,
  TRUE
);

INSERT INTO menu_items (category_id, name, description, price, is_veg, is_available)
VALUES (
  (SELECT id FROM menu_categories WHERE slug = 'pizzor'),
  'Kebab Special',
  'Kebabkött, tomat, lök, gurka, sallad, feferoni, valfri sås',
  124.00,
  FALSE,
  TRUE
);

-- Insert Rullar (Wraps) items
INSERT INTO menu_items (category_id, name, description, price, is_available)
VALUES ((SELECT id FROM menu_categories WHERE slug = 'rullar'), 'Kebab i bröd / Kyckling', 'Isbergssallad, lök, kebabkött eller kyckling, valfri sås', 104.00, TRUE);

INSERT INTO menu_items (category_id, name, description, price, is_available)
VALUES ((SELECT id FROM menu_categories WHERE slug = 'rullar'), 'Kebabrulle', 'Isbergssallad, lök, kebabkött, valfri sås', 104.00, TRUE);

INSERT INTO menu_items (category_id, name, description, price, is_available)
VALUES ((SELECT id FROM menu_categories WHERE slug = 'rullar'), 'Kycklingrulle', 'Isbergssallad, lök, kyckling, valfri sås', 104.00, TRUE);

INSERT INTO menu_items (category_id, name, description, price, is_available)
VALUES ((SELECT id FROM menu_categories WHERE slug = 'rullar'), 'Kycklingkebabrulle', 'Isbergssallad, lök, kycklingkebab, valfri sås', 104.00, TRUE);

INSERT INTO menu_items (category_id, name, description, price, is_available)
VALUES ((SELECT id FROM menu_categories WHERE slug = 'rullar'), 'Falafelrulle', 'Isbergssallad, lök, tomat, gurka, falafel, valfri sås', 104.00, TRUE);

INSERT INTO menu_items (category_id, name, description, price, is_available)
VALUES ((SELECT id FROM menu_categories WHERE slug = 'rullar'), 'Pommesrulle', 'Pommes, majonnäs, ketchup', 59.00, TRUE);

-- Insert Tallrikar (Plates) items
INSERT INTO menu_items (category_id, name, description, price, is_available)
VALUES ((SELECT id FROM menu_categories WHERE slug = 'tallrikar'), 'Kebabtallrik', 'Isbergssallad, kebabkött, pommes, tomat, gurka, feferoni, lök', 119.00, TRUE);

INSERT INTO menu_items (category_id, name, description, price, is_available)
VALUES ((SELECT id FROM menu_categories WHERE slug = 'tallrikar'), 'Kycklingtallrik', 'Isbergssallad, kyckling, pommes, tomat, gurka, feferoni, lök', 119.00, TRUE);

INSERT INTO menu_items (category_id, name, description, price, is_available)
VALUES ((SELECT id FROM menu_categories WHERE slug = 'tallrikar'), 'Falafeltallrik', 'Isbergssallad, lök, tomat, gurka, pommes, falafel, feferoni, valfri sås', 119.00, TRUE);

-- Insert Burgare (Burgers) items
INSERT INTO menu_items (category_id, name, description, price, family_price, is_available)
VALUES ((SELECT id FROM menu_categories WHERE slug = 'burgare'), 'Cheeseburger', 'Högkvalitativ nötkött, smörrostat briochebröd, hamburgerdressing, sallad, tomat, lök, pickles, dubbel cheddarost serveras med pommes frites', 99.00, 129.00, TRUE);

INSERT INTO menu_items (category_id, name, description, price, family_price, is_available)
VALUES ((SELECT id FROM menu_categories WHERE slug = 'burgare'), 'Hot N'' Cheesy', 'Högkvalitativ nötkött, smörrostat briochebröd, ChiliMayo, sallad, tomat, lök, jalapeno, dubbel cheddarost serveras med pommes', 99.00, 129.00, TRUE);

INSERT INTO menu_items (category_id, name, description, price, is_available)
VALUES ((SELECT id FROM menu_categories WHERE slug = 'burgare'), 'Crispy Fried Chicken Burger', 'Avokadomajonnäs eller aioli, smörrostat briochebröd, sallad, tomat, picklad rödlök serveras med pommes', 99.00, TRUE);

INSERT INTO menu_items (category_id, name, description, price, is_available)
VALUES ((SELECT id FROM menu_categories WHERE slug = 'burgare'), 'Halloumiburgare', 'Potatisbröd, Pesto/Aioli/ChiliMayo dressing, sallad, tomat, picklad rödlök, gurka serveras med pommes', 99.00, TRUE);

-- Insert Nuggets items
INSERT INTO menu_items (category_id, name, description, price, is_available)
VALUES ((SELECT id FROM menu_categories WHERE slug = 'nuggets'), 'Chicken nuggets tallrik', 'Pommes, 8 bitar nuggets, ketchup', 119.00, TRUE);

INSERT INTO menu_items (category_id, name, description, price, is_available)
VALUES ((SELECT id FROM menu_categories WHERE slug = 'nuggets'), 'Chicken nuggets barntallrik', 'Pommes, 4 bitar nuggets, ketchup', 79.00, TRUE);

-- Insert Shawarma items
INSERT INTO menu_items (category_id, name, description, price, is_available)
VALUES ((SELECT id FROM menu_categories WHERE slug = 'shawarma'), 'Shawarma Arabi', 'Kycklingrulle i bitar med pommes, vitlökssås, tomat, pickles, granatäppelsås', 104.00, TRUE);

INSERT INTO menu_items (category_id, name, description, price, is_available)
VALUES ((SELECT id FROM menu_categories WHERE slug = 'shawarma'), 'Kyckling Shawarma Rulle', 'Kyckling, vitlökssås, saltgurka, granatäppelsås', 79.00, TRUE);
