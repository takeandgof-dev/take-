-- Seed menu data for Take & Go Falkenberg

-- First, clear existing data
DELETE FROM menu_items;
DELETE FROM menu_categories;

-- Insert categories
INSERT INTO menu_categories (id, name, description, display_order) VALUES
('pizza-grupp-1', 'Pizzagrupp 1', 'Klassiska pizzor', 1),
('pizza-grupp-2', 'Pizzagrupp 2', 'Populära favoriter', 2),
('specialpizzor', 'Specialpizzor', 'Unika smaker', 3),
('oxfilepizzor', 'Oxfilépizzor', 'Med oxfilé', 4),
('kycklingpizzor', 'Kycklingpizzor', 'Med kyckling', 5),
('kebabpizzor', 'Kebabpizzor', 'Med kebab', 6),
('rullar', 'Rullar', 'Wraps och rullar', 7),
('tallrikar', 'Tallrikar', 'Serveras med tillbehör', 8),
('burgare', 'Burgare', 'Handgjorda burgare', 9),
('nuggets', 'Nuggets', 'Chicken nuggets', 10),
('shawarma', 'Shawarma', 'Arabisk street food', 11);

-- Pizzagrupp 1
INSERT INTO menu_items (name, description, price, category_id, display_order, is_available) VALUES
('Margherita', 'Tomatsås, ost (Vegetarisk)', 105, 'pizza-grupp-1', 1, true),
('Vesuvio', 'Skinka', 109, 'pizza-grupp-1', 2, true),
('Funghi', 'Champinjoner (Vegetarisk)', 109, 'pizza-grupp-1', 3, true),
('Köttfärspizza', 'Köttfärs', 109, 'pizza-grupp-1', 4, true);

-- Pizzagrupp 2
INSERT INTO menu_items (name, description, price, category_id, display_order, is_available) VALUES
('Hawaii', 'Skinka, ananas', 114, 'pizza-grupp-2', 1, true),
('Capricciosa', 'Skinka, champinjoner', 114, 'pizza-grupp-2', 2, true),
('Salami', 'Salami, paprika, lök', 114, 'pizza-grupp-2', 3, true),
('Hot Honey Pepperoni', 'Pepperoni, chili, honung', 114, 'pizza-grupp-2', 4, true);

-- Specialpizzor
INSERT INTO menu_items (name, description, price, category_id, display_order, is_available) VALUES
('Naki''s Special', 'Tonfisk, champinjoner, paprika, lök, vitlök', 127, 'specialpizzor', 1, true),
('Mexicana', 'Köttfärs, paprika, champinjoner, lök, vitlök, feferoni, cayennepeppar (Stark)', 129, 'specialpizzor', 2, true),
('Vegetariana', 'Champinjoner, paprika, lök, oliver, ananas (Vegetarisk)', 129, 'specialpizzor', 3, true),
('Greek Sunset', 'Fetaost, oliver, tomat', 129, 'specialpizzor', 4, true),
('Napoli', 'Fetaost, champinjoner, lök, vitlök, oliver (Vegetarisk)', 129, 'specialpizzor', 5, true),
('Svamp', 'Crème fraiche, ost, champinjoner, tryffelolja', 129, 'specialpizzor', 6, true);

-- Oxfilépizzor
INSERT INTO menu_items (name, description, price, category_id, display_order, is_available) VALUES
('Oxfilépizza', 'Tomatsås, ost, oxfilé, lök, bearnaisesås', 135, 'oxfilepizzor', 1, true),
('Oxfilé Special', 'Oxfilé, färska champinjoner, lök, färska tomater, bearnaisesås', 139, 'oxfilepizzor', 2, true),
('Acapulco', 'Oxfilé, champinjoner, lök, vitlök, tacosås, jalapeno', 139, 'oxfilepizzor', 3, true);

-- Kycklingpizzor
INSERT INTO menu_items (name, description, price, category_id, display_order, is_available) VALUES
('Kycklingpizza', 'Ost, kyckling, valfri sås', 119, 'kycklingpizzor', 1, true),
('BBQ Kyckling', 'BBQ-sås, ost, kyckling, rödlök', 129, 'kycklingpizzor', 2, true),
('Kyckling Special', 'Kyckling, champinjoner, lök, valfri sås', 129, 'kycklingpizzor', 3, true),
('Tikka Masala Pizza', 'Tikka masala, mozzarella, kyckling, rödlök', 135, 'kycklingpizzor', 4, true),
('Garlic Butter Chicken', 'Vitlökssmör, ost, kyckling, lök', 135, 'kycklingpizzor', 5, true),
('Creamy Pesto Chicken', 'Pesto, ost, kyckling, parmesan', 135, 'kycklingpizzor', 6, true);

-- Kebabpizzor
INSERT INTO menu_items (name, description, price, category_id, display_order, is_available) VALUES
('Kebabpizza', 'Kebabkött, ost, lök, feferoni, valfri sås', 119, 'kebabpizzor', 1, true),
('Pommespizza', 'Kebabkött, pommes, valfri sås', 124, 'kebabpizzor', 2, true),
('Kebab Special', 'Kebabkött, tomat, lök, gurka, sallad, feferoni, valfri sås', 124, 'kebabpizzor', 3, true);

-- Rullar
INSERT INTO menu_items (name, description, price, category_id, display_order, is_available) VALUES
('Kebab i bröd', 'Isbergssallad, lök, kebabkött, valfri sås', 104, 'rullar', 1, true),
('Kebabrulle', 'Isbergssallad, lök, kebabkött, valfri sås', 104, 'rullar', 2, true),
('Kycklingrulle', 'Isbergssallad, lök, kyckling, valfri sås', 104, 'rullar', 3, true),
('Kycklingkebabrulle', 'Isbergssallad, lök, kycklingkebab, valfri sås', 104, 'rullar', 4, true),
('Falafelrulle', 'Isbergssallad, lök, tomat, gurka, falafel, valfri sås', 104, 'rullar', 5, true),
('Pommesrulle', 'Pommes, majonnäs, ketchup', 59, 'rullar', 6, true);

-- Tallrikar
INSERT INTO menu_items (name, description, price, category_id, display_order, is_available) VALUES
('Kebabtallrik', 'Isbergssallad, kebabkött, pommes, tomat, gurka, feferoni, lök', 119, 'tallrikar', 1, true),
('Kycklingtallrik', 'Isbergssallad, kyckling, pommes, tomat, gurka, feferoni, lök', 119, 'tallrikar', 2, true),
('Falafeltallrik', 'Isbergssallad, lök, tomat, gurka, pommes, falafel, feferoni, valfri sås', 119, 'tallrikar', 3, true);

-- Burgare
INSERT INTO menu_items (name, description, price, category_id, display_order, is_available) VALUES
('Cheeseburger', 'Högkvalitativ nötkött, smörrostat briochebröd, hamburgerdressing, sallad, tomat, lök, pickles, dubbel cheddarost. Serveras med pommes', 99, 'burgare', 1, true),
('Hot N'' Cheesy', 'Högkvalitativ nötkött, smörrostat briochebröd, ChiliMayo, sallad, tomat, lök, jalapeno, dubbel cheddarost. Serveras med pommes', 99, 'burgare', 2, true),
('Crispy Fried Chicken Burger', 'Avokadomajonnäs eller aioli, smörrostat briochebröd, sallad, tomat, picklad rödlök. Serveras med pommes', 99, 'burgare', 3, true),
('Halloumiburgare', 'Potatisbröd, Pesto/Aioli/ChiliMayo dressing, sallad, tomat, picklad rödlök, gurka. Serveras med pommes', 99, 'burgare', 4, true);

-- Nuggets
INSERT INTO menu_items (name, description, price, category_id, display_order, is_available) VALUES
('Chicken Nuggets Tallrik', 'Pommes, 8 bitar nuggets, ketchup', 119, 'nuggets', 1, true),
('Chicken Nuggets Barntallrik', 'Pommes, 4 bitar nuggets, ketchup', 79, 'nuggets', 2, true);

-- Shawarma
INSERT INTO menu_items (name, description, price, category_id, display_order, is_available) VALUES
('Shawarma Arabi', 'Kycklingrulle i bitar med pommes, vitlökssås, tomat, pickles, granatäppelsås', 104, 'shawarma', 1, true),
('Kyckling Shawarma Rulle', 'Kyckling, vitlökssås, saltgurka, granatäppelsås', 79, 'shawarma', 2, true);

-- Update site settings
INSERT INTO site_settings (key, value) VALUES
('restaurant_name', 'Take & Go Falkenberg'),
('tagline', 'Pizza - Burgare - Take & Go'),
('phone', ''),
('email', ''),
('address', 'Falkenberg'),
('opening_hours_weekdays', '10:00 - 21:00'),
('opening_hours_weekends', '11:00 - 22:00')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
