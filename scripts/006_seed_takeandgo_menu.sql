-- Clear existing data
DELETE FROM menu_items;
DELETE FROM menu_categories;

-- Insert categories
INSERT INTO menu_categories (id, name, slug, display_order) VALUES
('cat-pizza', 'Pizzor', 'pizzor', 1),
('cat-burgare', 'Burgare', 'burgare', 2),
('cat-kebab', 'Kebab', 'kebab', 3),
('cat-sallad', 'Sallader', 'sallader', 4),
('cat-dryck', 'Drycker', 'drycker', 5);

-- Insert Pizzor
INSERT INTO menu_items (category_id, name, description, price, family_price, is_veg, is_spicy, display_order) VALUES
('cat-pizza', 'Margherita', 'Tomatsås, ost', '95 kr', '180 kr', true, false, 1),
('cat-pizza', 'Vesuvio', 'Tomatsås, ost, skinka', '100 kr', '190 kr', false, false, 2),
('cat-pizza', 'Capricciosa', 'Tomatsås, ost, skinka, champinjoner', '105 kr', '195 kr', false, false, 3),
('cat-pizza', 'Hawaii', 'Tomatsås, ost, skinka, ananas', '105 kr', '195 kr', false, false, 4),
('cat-pizza', 'Kebabpizza', 'Tomatsås, ost, kebabkött, lök, tomat, kebabsås', '115 kr', '210 kr', false, false, 5),
('cat-pizza', 'Mexicana', 'Tomatsås, ost, köttfärs, jalapeño, lök, vitlök', '115 kr', '210 kr', false, true, 6),
('cat-pizza', 'Quattro Stagioni', 'Tomatsås, ost, skinka, räkor, musslor, champinjoner', '120 kr', '220 kr', false, false, 7),
('cat-pizza', 'Vegetariana', 'Tomatsås, ost, champinjoner, paprika, lök, oliver', '105 kr', '195 kr', true, false, 8),
('cat-pizza', 'Calzone', 'Inbakad pizza med skinka, champinjoner, lök', '115 kr', NULL, false, false, 9),
('cat-pizza', 'Pepperoni', 'Tomatsås, ost, pepperoni', '105 kr', '195 kr', false, true, 10);

-- Insert Burgare
INSERT INTO menu_items (category_id, name, description, price, family_price, is_veg, is_spicy, display_order) VALUES
('cat-burgare', 'Hamburgare', '90g nötfärs, sallad, tomat, lök, dressing, bröd', '85 kr', NULL, false, false, 1),
('cat-burgare', 'Cheeseburgare', '90g nötfärs, ost, sallad, tomat, lök, dressing', '95 kr', NULL, false, false, 2),
('cat-burgare', 'Dubbelburgare', '2x90g nötfärs, ost, sallad, tomat, lök, dressing', '120 kr', NULL, false, false, 3),
('cat-burgare', 'Kycklingburgare', 'Kycklingfilé, sallad, tomat, lök, dressing', '95 kr', NULL, false, false, 4),
('cat-burgare', 'Veganburgare', 'Vegetarisk biff, sallad, tomat, lök, vegansås', '95 kr', NULL, true, false, 5),
('cat-burgare', 'Baconburgare', '90g nötfärs, bacon, ost, sallad, tomat, dressing', '105 kr', NULL, false, false, 6);

-- Insert Kebab
INSERT INTO menu_items (category_id, name, description, price, family_price, is_veg, is_spicy, display_order) VALUES
('cat-kebab', 'Kebabtalrik', 'Kebabkött, sallad, tomat, lök, sås, pommes', '110 kr', NULL, false, false, 1),
('cat-kebab', 'Kebabrulle', 'Kebabkött, sallad, tomat, lök, sås i tunnbröd', '95 kr', NULL, false, false, 2),
('cat-kebab', 'Falafeltalrik', 'Falafel, sallad, tomat, lök, sås, pommes', '100 kr', NULL, true, false, 3),
('cat-kebab', 'Falafelrulle', 'Falafel, sallad, tomat, lök, sås i tunnbröd', '85 kr', NULL, true, false, 4),
('cat-kebab', 'Kycklingtalrik', 'Grillad kyckling, sallad, tomat, lök, sås, pommes', '115 kr', NULL, false, false, 5);

-- Insert Sallader
INSERT INTO menu_items (category_id, name, description, price, family_price, is_veg, is_spicy, display_order) VALUES
('cat-sallad', 'Kebabsallad', 'Kebabkött, isbergssallad, tomat, gurka, lök, dressing', '95 kr', NULL, false, false, 1),
('cat-sallad', 'Kycklingsallad', 'Grillad kyckling, isbergssallad, tomat, gurka, dressing', '100 kr', NULL, false, false, 2),
('cat-sallad', 'Räksallad', 'Räkor, isbergssallad, tomat, gurka, ägg, dressing', '105 kr', NULL, false, false, 3),
('cat-sallad', 'Grekisk sallad', 'Fetaost, oliver, tomat, gurka, paprika, lök', '90 kr', NULL, true, false, 4);

-- Insert Drycker
INSERT INTO menu_items (category_id, name, description, price, family_price, is_veg, is_spicy, display_order) VALUES
('cat-dryck', 'Coca-Cola', '33cl', '25 kr', NULL, true, false, 1),
('cat-dryck', 'Fanta', '33cl', '25 kr', NULL, true, false, 2),
('cat-dryck', 'Sprite', '33cl', '25 kr', NULL, true, false, 3),
('cat-dryck', 'Vatten', '50cl', '20 kr', NULL, true, false, 4),
('cat-dryck', 'Ayran', '25cl', '20 kr', NULL, true, false, 5);
