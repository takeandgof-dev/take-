-- Delete existing menu items to avoid duplicates
DELETE FROM menu_items WHERE category_id IS NOT NULL;

-- Ensure categories exist
INSERT INTO menu_categories (name, slug, display_order) VALUES
  ('Pizza', 'pizza', 1),
  ('Rullar', 'rullar', 2),
  ('Tallrikar', 'tallrikar', 3),
  ('Burgare', 'burgare', 4),
  ('Nuggets', 'nuggets', 5),
  ('Shawarma', 'shawarma', 6)
ON CONFLICT (slug) DO NOTHING;

-- PIZZOR - Pizzagrupp 1
INSERT INTO menu_items (name, description, price, family_price, category_id, is_veg, is_spicy, is_available, display_order) VALUES
('Margherita', 'Tomatsås, ost', 105, 212, (SELECT id FROM menu_categories WHERE slug = 'pizza'), true, false, true, 1),
('Vesuvio', 'Skinka', 109, 226, (SELECT id FROM menu_categories WHERE slug = 'pizza'), false, false, true, 2),
('Funghi', 'Champinjoner', 109, 226, (SELECT id FROM menu_categories WHERE slug = 'pizza'), true, false, true, 3),
('Köttfärspizza', 'Köttfärs', 109, 226, (SELECT id FROM menu_categories WHERE slug = 'pizza'), false, false, true, 4);

-- PIZZOR - Pizzagrupp 2
INSERT INTO menu_items (name, description, price, family_price, category_id, is_veg, is_spicy, is_available, display_order) VALUES
('Hawaii', 'Skinka, ananas', 114, 242, (SELECT id FROM menu_categories WHERE slug = 'pizza'), false, false, true, 5),
('Capricciosa', 'Skinka, champinjoner', 114, 242, (SELECT id FROM menu_categories WHERE slug = 'pizza'), false, false, true, 6),
('Salami', 'Salami, paprika, lök', 114, 242, (SELECT id FROM menu_categories WHERE slug = 'pizza'), false, true, true, 7),
('Hot Honey Pepperoni', 'Pepperoni, chili, honung', 114, 242, (SELECT id FROM menu_categories WHERE slug = 'pizza'), false, true, true, 8);

-- PIZZOR - Specialpizzor
INSERT INTO menu_items (name, description, price, family_price, category_id, is_veg, is_spicy, is_available, display_order) VALUES
('Naki''s Special', 'Tonfisk, champinjoner, paprika, lök, vitlök', 127, 272, (SELECT id FROM menu_categories WHERE slug = 'pizza'), false, false, true, 9),
('Mexicana', 'Köttfärs, paprika, champinjoner, lök, vitlök, feferoni, cayennepeppar (Stark)', 129, 272, (SELECT id FROM menu_categories WHERE slug = 'pizza'), false, true, true, 10),
('Vegetariana', 'Champinjoner, paprika, lök, oliver, ananas', 129, 272, (SELECT id FROM menu_categories WHERE slug = 'pizza'), true, false, true, 11),
('Greek Sunset', 'Fetaost, oliver, tomat', 129, 272, (SELECT id FROM menu_categories WHERE slug = 'pizza'), true, false, true, 12),
('Napoli', 'Fetaost, champinjoner, lök, vitlök, oliver', 129, 272, (SELECT id FROM menu_categories WHERE slug = 'pizza'), true, false, true, 13),
('Svamp', 'Crème fraiche, ost, champinjoner, tryffelolja', 129, 272, (SELECT id FROM menu_categories WHERE slug = 'pizza'), true, false, true, 14);

-- PIZZOR - Oxfilépizzor
INSERT INTO menu_items (name, description, price, family_price, category_id, is_veg, is_spicy, is_available, display_order) VALUES
('Oxfilépizza', 'Tomatsås, ost, oxfilé, lök, bearnaisesås', 135, 286, (SELECT id FROM menu_categories WHERE slug = 'pizza'), false, false, true, 15),
('Oxfilé Special', 'Oxfilé, färska champinjoner, lök, färska tomater, bearnaisesås', 139, 289, (SELECT id FROM menu_categories WHERE slug = 'pizza'), false, false, true, 16),
('Acapulco', 'Oxfilé, champinjoner, lök, vitlök, tacosås, jalapeno', 139, 289, (SELECT id FROM menu_categories WHERE slug = 'pizza'), false, true, true, 17);

-- PIZZOR - Kycklingpizzor
INSERT INTO menu_items (name, description, price, family_price, category_id, is_veg, is_spicy, is_available, display_order) VALUES
('Kyckling Pizza', 'Ost, kyckling, valfri sås', 119, 264, (SELECT id FROM menu_categories WHERE slug = 'pizza'), false, false, true, 18),
('BBQ Kyckling', 'BBQ-sås, ost, kyckling, rödlök', 129, 272, (SELECT id FROM menu_categories WHERE slug = 'pizza'), false, false, true, 19),
('Kyckling Special', 'Kyckling, champinjoner, lök, valfri sås', 129, 272, (SELECT id FROM menu_categories WHERE slug = 'pizza'), false, false, true, 20),
('Tikka Masala Pizza', 'Tikka masala, mozzarella, kyckling, rödlök', 135, 286, (SELECT id FROM menu_categories WHERE slug = 'pizza'), false, false, true, 21),
('Garlic Butter Chicken', 'Vitlökssmör, ost, kyckling, lök', 135, 286, (SELECT id FROM menu_categories WHERE slug = 'pizza'), false, false, true, 22),
('Creamy Pesto Chicken', 'Pesto, ost, kyckling, parmesan', 135, 286, (SELECT id FROM menu_categories WHERE slug = 'pizza'), false, false, true, 23);

-- PIZZOR - Kebabpizzor
INSERT INTO menu_items (name, description, price, family_price, category_id, is_veg, is_spicy, is_available, display_order) VALUES
('Kebabpizza', 'Kebabkött, ost, lök, feferoni, valfri sås', 119, 264, (SELECT id FROM menu_categories WHERE slug = 'pizza'), false, false, true, 24),
('Pommespizza', 'Kebabkött, pommes, valfri sås', 124, 274, (SELECT id FROM menu_categories WHERE slug = 'pizza'), false, false, true, 25),
('Kebab Special', 'Kebabkött, tomat, lök, gurka, sallad, feferoni, valfri sås', 124, 274, (SELECT id FROM menu_categories WHERE slug = 'pizza'), false, false, true, 26);

-- RULLAR
INSERT INTO menu_items (name, description, price, family_price, category_id, is_veg, is_spicy, is_available, display_order) VALUES
('Kebab i bröd', 'Isbergssallad, lök, kebabkött, valfri sås', 104, NULL, (SELECT id FROM menu_categories WHERE slug = 'rullar'), false, false, true, 1),
('Kyckling i bröd', 'Isbergssallad, lök, kyckling, valfri sås', 104, NULL, (SELECT id FROM menu_categories WHERE slug = 'rullar'), false, false, true, 2),
('Kebabrulle', 'Isbergssallad, lök, kebabkött, valfri sås', 104, NULL, (SELECT id FROM menu_categories WHERE slug = 'rullar'), false, false, true, 3),
('Kycklingrulle', 'Isbergssallad, lök, kyckling, valfri sås', 104, NULL, (SELECT id FROM menu_categories WHERE slug = 'rullar'), false, false, true, 4),
('Kycklingkebabrulle', 'Isbergssallad, lök, kycklingkebab, valfri sås', 104, NULL, (SELECT id FROM menu_categories WHERE slug = 'rullar'), false, false, true, 5),
('Falafelrulle', 'Isbergssallad, lök, tomat, gurka, falafel, valfri sås', 74, 104, (SELECT id FROM menu_categories WHERE slug = 'rullar'), true, false, true, 6),
('Pommesrulle', 'Pommes, majonnäs, ketchup', 59, NULL, (SELECT id FROM menu_categories WHERE slug = 'rullar'), true, false, true, 7);

-- TALLRIKAR
INSERT INTO menu_items (name, description, price, family_price, category_id, is_veg, is_spicy, is_available, display_order) VALUES
('Kebabtallrik', 'Isbergssallad, kebabkött, pommes, tomat, gurka, feferoni, lök', 119, NULL, (SELECT id FROM menu_categories WHERE slug = 'tallrikar'), false, false, true, 1),
('Kycklingtallrik', 'Isbergssallad, kyckling, pommes, tomat, gurka, feferoni, lök', 119, NULL, (SELECT id FROM menu_categories WHERE slug = 'tallrikar'), false, false, true, 2),
('Kycklingkebab Tallrik', 'Isbergssallad, kycklingkebab, pommes, tomat, gurka, feferoni, lök', 119, NULL, (SELECT id FROM menu_categories WHERE slug = 'tallrikar'), false, false, true, 3),
('Falafeltallrik', 'Isbergssallad, lök, tomat, gurka, pommes, falafel, feferoni, valfri sås', 119, NULL, (SELECT id FROM menu_categories WHERE slug = 'tallrikar'), true, false, true, 4);

-- BURGARE
INSERT INTO menu_items (name, description, price, family_price, category_id, is_veg, is_spicy, is_available, display_order) VALUES
('Cheeseburger', 'Högkvalitativ nötkött, smörrostat briochebröd, hamburgerdressing, sallad, tomat, lök, pickles, dubbel cheddarost. Serveras med pommes frites', 99, 129, (SELECT id FROM menu_categories WHERE slug = 'burgare'), false, false, true, 1),
('Hot N'' Cheesy', 'Högkvalitativ nötkött, smörrostat briochebröd, ChiliMayo, sallad, tomat, lök, jalapeno, dubbel cheddarost. Serveras med pommes', 99, 129, (SELECT id FROM menu_categories WHERE slug = 'burgare'), false, true, true, 2),
('Crispy Fried Chicken Burger', 'Avokadomajonnäs, smörrostat briochebröd, sallad, tomat, picklad rödlök. Serveras med pommes', 99, NULL, (SELECT id FROM menu_categories WHERE slug = 'burgare'), false, false, true, 3),
('Halloumiburgare', 'Potatisbröd, Pesto/Aioli/ChiliMayo dressing, sallad, tomat, picklad rödlök, gurka. Serveras med pommes', 99, NULL, (SELECT id FROM menu_categories WHERE slug = 'burgare'), true, false, true, 4);

-- NUGGETS
INSERT INTO menu_items (name, description, price, family_price, category_id, is_veg, is_spicy, is_available, display_order) VALUES
('Chicken Nuggets Tallrik', 'Pommes, 8 bitar nuggets, ketchup', 119, NULL, (SELECT id FROM menu_categories WHERE slug = 'nuggets'), false, false, true, 1),
('Chicken Nuggets Barntallrik', 'Pommes, 4 bitar nuggets, ketchup', 79, NULL, (SELECT id FROM menu_categories WHERE slug = 'nuggets'), false, false, true, 2);

-- SHAWARMA
INSERT INTO menu_items (name, description, price, family_price, category_id, is_veg, is_spicy, is_available, display_order) VALUES
('Shawarma Arabi', 'Kycklingrulle i bitar med pommes, vitlökssås, tomat, pickles, granatäppelsås', 104, NULL, (SELECT id FROM menu_categories WHERE slug = 'shawarma'), false, false, true, 1),
('Kyckling Shawarma Rulle', 'Kyckling, vitlökssås, saltgurka, granatäppelsås', 79, NULL, (SELECT id FROM menu_categories WHERE slug = 'shawarma'), false, false, true, 2);
