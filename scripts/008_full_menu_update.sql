-- Full menu update for Take & Go Falkenberg
-- Clear existing data
DELETE FROM menu_items;
DELETE FROM menu_categories;

-- Insert categories
INSERT INTO menu_categories (id, name, slug, display_order) VALUES
('cat-pizza1', 'Pizzagrupp 1', 'pizza1', 1),
('cat-pizza2', 'Pizzagrupp 2', 'pizza2', 2),
('cat-special', 'Specialpizzor', 'special', 3),
('cat-oxfile', 'Oxfilépizzor', 'oxfile', 4),
('cat-kyckling', 'Kycklingpizzor', 'kyckling', 5),
('cat-kebabpizza', 'Kebabpizzor', 'kebabpizza', 6),
('cat-rullar', 'Rullar', 'rullar', 7),
('cat-tallrikar', 'Tallrikar', 'tallrikar', 8),
('cat-burgare', 'Burgare', 'burgare', 9),
('cat-nuggets', 'Nuggets', 'nuggets', 10),
('cat-shawarma', 'Shawarma', 'shawarma', 11);

-- Pizzagrupp 1
INSERT INTO menu_items (name, description, price, family_price, category_id, is_veg, is_spicy, display_order) VALUES
('Margherita', 'Tomatsås, ost', '105:-', '212:-', 'cat-pizza1', true, false, 1),
('Vesuvio', 'Skinka', '109:-', '226:-', 'cat-pizza1', false, false, 2),
('Funghi', 'Champinjoner', '109:-', '226:-', 'cat-pizza1', true, false, 3),
('Köttfärspizza', 'Köttfärs', '109:-', '226:-', 'cat-pizza1', false, false, 4);

-- Pizzagrupp 2
INSERT INTO menu_items (name, description, price, family_price, category_id, is_veg, is_spicy, display_order) VALUES
('Hawaii', 'Skinka, ananas', '114:-', '242:-', 'cat-pizza2', false, false, 1),
('Capricciosa', 'Skinka, champinjoner', '114:-', '242:-', 'cat-pizza2', false, false, 2),
('Salami', 'Salami, paprika, lök', '114:-', '242:-', 'cat-pizza2', false, false, 3),
('Hot Honey Pepperoni', 'Pepperoni, chili, honung', '114:-', '242:-', 'cat-pizza2', false, true, 4);

-- Specialpizzor
INSERT INTO menu_items (name, description, price, family_price, category_id, is_veg, is_spicy, display_order) VALUES
('Naki''s Special', 'Tonfisk, champinjoner, paprika, lök, vitlök', '127:-', '272:-', 'cat-special', false, false, 1),
('Mexicana', 'Köttfärs, paprika, champinjoner, lök, vitlök, feferoni, cayennepeppar', '129:-', '272:-', 'cat-special', false, true, 2),
('Vegetariana', 'Champinjoner, paprika, lök, oliver, ananas', '129:-', '272:-', 'cat-special', true, false, 3),
('Greek Sunset', 'Fetaost, oliver, tomat', '129:-', '272:-', 'cat-special', true, false, 4),
('Napoli', 'Fetaost, champinjoner, lök, vitlök, oliver', '129:-', '272:-', 'cat-special', true, false, 5),
('Svamp', 'Crème fraiche, ost, champinjoner, tryffelolja', '129:-', '272:-', 'cat-special', true, false, 6);

-- Oxfilépizzor
INSERT INTO menu_items (name, description, price, family_price, category_id, is_veg, is_spicy, display_order) VALUES
('Oxfilépizza', 'Tomatsås, ost, oxfilé, lök, bearnaisesås', '135:-', '286:-', 'cat-oxfile', false, false, 1),
('Oxfilé Special', 'Oxfilé, färska champinjoner, lök, färska tomater, bearnaisesås', '139:-', '289:-', 'cat-oxfile', false, false, 2),
('Acapulco', 'Oxfilé, champinjoner, lök, vitlök, tacosås, jalapeno', '139:-', '289:-', 'cat-oxfile', false, true, 3);

-- Kycklingpizzor
INSERT INTO menu_items (name, description, price, family_price, category_id, is_veg, is_spicy, display_order) VALUES
('Kycklingpizza', 'Ost, kyckling, valfri sås', '119:-', '264:-', 'cat-kyckling', false, false, 1),
('BBQ Kyckling', 'BBQ-sås, ost, kyckling, rödlök', '129:-', '272:-', 'cat-kyckling', false, false, 2),
('Kyckling Special', 'Kyckling, champinjoner, lök, valfri sås', '129:-', '272:-', 'cat-kyckling', false, false, 3),
('Tikka Masala Pizza', 'Tikka masala, mozzarella, kyckling, rödlök', '135:-', '286:-', 'cat-kyckling', false, false, 4),
('Garlic Butter Chicken', 'Vitlökssmör, ost, kyckling, lök', '135:-', '286:-', 'cat-kyckling', false, false, 5),
('Creamy Pesto Chicken', 'Pesto, ost, kyckling, parmesan', '135:-', '286:-', 'cat-kyckling', false, false, 6);

-- Kebabpizzor
INSERT INTO menu_items (name, description, price, family_price, category_id, is_veg, is_spicy, display_order) VALUES
('Kebabpizza', 'Kebabkött, ost, lök, feferoni, valfri sås', '119:-', '264:-', 'cat-kebabpizza', false, false, 1),
('Pommespizza', 'Kebabkött, pommes, valfri sås', '124:-', '274:-', 'cat-kebabpizza', false, false, 2),
('Kebab Special', 'Kebabkött, tomat, lök, gurka, sallad, feferoni, valfri sås', '124:-', '274:-', 'cat-kebabpizza', false, false, 3);

-- Rullar
INSERT INTO menu_items (name, description, price, family_price, category_id, is_veg, is_spicy, display_order) VALUES
('Kebab i bröd', 'Isbergssallad, lök, kebabkött eller kyckling, valfri sås', '104:-', NULL, 'cat-rullar', false, false, 1),
('Kebabrulle', 'Isbergssallad, lök, kebabkött, valfri sås', '104:-', NULL, 'cat-rullar', false, false, 2),
('Kycklingrulle', 'Isbergssallad, lök, kyckling, valfri sås', '104:-', NULL, 'cat-rullar', false, false, 3),
('Kycklingkebabrulle', 'Isbergssallad, lök, kycklingkebab, valfri sås', '104:-', NULL, 'cat-rullar', false, false, 4),
('Falafelrulle', 'Isbergssallad, lök, tomat, gurka, falafel, valfri sås', '104:-', NULL, 'cat-rullar', true, false, 5),
('Pommesrulle', 'Pommes, majonnäs, ketchup', '59:-', NULL, 'cat-rullar', true, false, 6);

-- Tallrikar
INSERT INTO menu_items (name, description, price, family_price, category_id, is_veg, is_spicy, display_order) VALUES
('Kebabtallrik', 'Isbergssallad, kebabkött, pommes, tomat, gurka, feferoni, lök', '119:-', NULL, 'cat-tallrikar', false, false, 1),
('Kycklingtallrik', 'Isbergssallad, kyckling, pommes, tomat, gurka, feferoni, lök', '119:-', NULL, 'cat-tallrikar', false, false, 2),
('Falafeltallrik', 'Isbergssallad, lök, tomat, gurka, pommes, falafel, feferoni, valfri sås', '119:-', NULL, 'cat-tallrikar', true, false, 3);

-- Burgare
INSERT INTO menu_items (name, description, price, family_price, category_id, is_veg, is_spicy, display_order) VALUES
('Cheeseburger', 'Högkvalitativ nötkött, smörrostat briochebröd, hamburgerdressing, sallad, tomat, lök, pickles, dubbel cheddarost serveras med pommes', '99:-', '129:-', 'cat-burgare', false, false, 1),
('Hot N'' Cheesy', 'Högkvalitativ nötkött, smörrostat briochebröd, ChiliMayo, sallad, tomat, lök, jalapeno, dubbel cheddarost serveras med pommes', '99:-', '129:-', 'cat-burgare', false, true, 2),
('Crispy Fried Chicken Burger', 'Avokadomajonnäs eller aioli, smörrostat briochebröd, sallad, tomat, picklad rödlök, serveras med pommes', '99:-', NULL, 'cat-burgare', false, false, 3),
('Halloumiburgare', 'Potatisbröd, Pesto/Aioli/ChiliMayo dressing, sallad, tomat, picklad rödlök, gurka, serveras med pommes', '99:-', NULL, 'cat-burgare', true, false, 4);

-- Nuggets
INSERT INTO menu_items (name, description, price, family_price, category_id, is_veg, is_spicy, display_order) VALUES
('Chicken Nuggets Tallrik', 'Pommes, 8 bitar nuggets, ketchup', '119:-', NULL, 'cat-nuggets', false, false, 1),
('Chicken Nuggets Barntallrik', 'Pommes, 4 bitar nuggets, ketchup', '79:-', NULL, 'cat-nuggets', false, false, 2);

-- Shawarma
INSERT INTO menu_items (name, description, price, family_price, category_id, is_veg, is_spicy, display_order) VALUES
('Shawarma Arabi', 'Kycklingrulle i bitar med pommes, vitlökssås, tomat, pickles, granatäppelsås', '104:-', NULL, 'cat-shawarma', false, false, 1),
('Kyckling Shawarma Rulle', 'Kyckling, vitlökssås, saltgurka, granatäppelsås', '79:-', NULL, 'cat-shawarma', false, false, 2);
