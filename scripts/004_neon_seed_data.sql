-- Seed menu categories
INSERT INTO menu_categories (id, name, description, display_order, created_at, updated_at) VALUES
('cat-1', 'Pizza', 'Våra klassiska pizzor gjorda med färska ingredienser', 1, NOW(), NOW()),
('cat-2', 'Burgare', 'Saftig amerikanska burgare med premium ingredienser', 2, NOW(), NOW()),
('cat-3', 'Kebab & Rullar', 'Förpackade och goda kebab och rullar', 3, NOW(), NOW()),
('cat-4', 'Drycker', 'Läskande drycker och öl', 4, NOW(), NOW()),
('cat-5', 'Dessert', 'Söta avslutningar på maten', 5, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Seed pizza menu items
INSERT INTO menu_items (id, name, description, price, category_id, is_available, display_order, created_at, updated_at) VALUES
('item-1', 'Margherita', 'Tomatsås, mozzarella, basilika', '89 kr', 'cat-1', true, 1, NOW(), NOW()),
('item-2', 'Pepperoni', 'Tomatsås, mozzarella, pepperoni', '99 kr', 'cat-1', true, 2, NOW(), NOW()),
('item-3', 'Quattro Formaggi', 'Fyra sorters ost på en pizza', '119 kr', 'cat-1', true, 3, NOW(), NOW()),
('item-4', 'Vegetariana', 'Grönsaker, löök, paprika och svamp', '99 kr', 'cat-1', true, 4, NOW(), NOW()),
('item-5', 'Carnivore', 'Skinka, bacon, köttfärs och beef', '129 kr', 'cat-1', true, 5, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Seed burger menu items
INSERT INTO menu_items (id, name, description, price, category_id, is_available, display_order, created_at, updated_at) VALUES
('item-6', 'Klassisk Burger', 'Beef, ost, grönsaker, dressing', '89 kr', 'cat-2', true, 1, NOW(), NOW()),
('item-7', 'Double Cheese Burger', 'Två beef patties, två ostar, löök', '109 kr', 'cat-2', true, 2, NOW(), NOW()),
('item-8', 'Bacon & Blå', 'Beef, bacon, blåost, rödlök', '119 kr', 'cat-2', true, 3, NOW(), NOW()),
('item-9', 'Spicy Burger', 'Beef, jalapeño, chili mayo, ost', '99 kr', 'cat-2', true, 4, NOW(), NOW()),
('item-10', 'Mushroom Swiss', 'Beef, svamp, schweizerost, gräslök', '109 kr', 'cat-2', true, 5, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Seed kebab & rullar items
INSERT INTO menu_items (id, name, description, price, category_id, is_available, display_order, created_at, updated_at) VALUES
('item-11', 'Kyckling Kebab', 'Grillad kyckling, sallad, sås', '79 kr', 'cat-3', true, 1, NOW(), NOW()),
('item-12', 'Beef Kebab', 'Marmorerad beef, grönsaker, tahini', '89 kr', 'cat-3', true, 2, NOW(), NOW()),
('item-13', 'Falafel Rulla', 'Frukta falafel, hummus, grönsaker', '69 kr', 'cat-3', true, 3, NOW(), NOW()),
('item-14', 'Dubbel Kyckling Kebab', 'Extra mycket grillad kyckling', '109 kr', 'cat-3', true, 4, NOW(), NOW()),
('item-15', 'Vegetarisk Rulla', 'Blandade grönsaker, ost, dressing', '79 kr', 'cat-3', true, 5, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Seed drinks
INSERT INTO menu_items (id, name, description, price, category_id, is_available, display_order, created_at, updated_at) VALUES
('item-16', 'Coca Cola', 'Läskande klassiker', '29 kr', 'cat-4', true, 1, NOW(), NOW()),
('item-17', 'Fanta', 'Orange, citron eller jordgubb', '29 kr', 'cat-4', true, 2, NOW(), NOW()),
('item-18', 'Jugo', 'Fruktjugo', '34 kr', 'cat-4', true, 3, NOW(), NOW()),
('item-19', 'Öl', 'Urvalsöl (18+)', '49 kr', 'cat-4', true, 4, NOW(), NOW()),
('item-20', 'Vatten', 'Mineralvatten', '19 kr', 'cat-4', true, 5, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Seed desserts
INSERT INTO menu_items (id, name, description, price, category_id, is_available, display_order, created_at, updated_at) VALUES
('item-21', 'Choklad Brownie', 'Varmt choklad med glass', '49 kr', 'cat-5', true, 1, NOW(), NOW()),
('item-22', 'Kanelbulle', 'Klassisk svensk kanelbulle', '39 kr', 'cat-5', true, 2, NOW(), NOW()),
('item-23', 'Glass', 'Olika smaker av glass', '34 kr', 'cat-5', true, 3, NOW(), NOW()),
('item-24', 'Tiramisu', 'Italiensk klassiker', '59 kr', 'cat-5', true, 4, NOW(), NOW()),
('item-25', 'Frukt Smoothie', 'Frukt och yoghurt blend', '49 kr', 'cat-5', true, 5, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;
