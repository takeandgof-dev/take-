-- Complete Take & Go Falkenberg Database Setup
-- This script creates all tables and seeds the complete menu

-- Drop existing tables if they exist (for clean setup)
DROP TABLE IF EXISTS menu_items CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS offers CASCADE;

-- Create categories table
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create menu_items table
CREATE TABLE menu_items (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  family_price DECIMAL(10, 2),
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  image_url TEXT,
  is_vegetarian BOOLEAN DEFAULT FALSE,
  is_spicy BOOLEAN DEFAULT FALSE,
  is_popular BOOLEAN DEFAULT FALSE,
  is_available BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create offers table
CREATE TABLE offers (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  original_price DECIMAL(10, 2),
  offer_price DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  valid_from TIMESTAMP,
  valid_until TIMESTAMP,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert Categories
INSERT INTO categories (name, description, sort_order) VALUES
('Pizzagrupp 1', 'Klassiska pizzor', 1),
('Pizzagrupp 2', 'Populara pizzor', 2),
('Specialpizzor', 'Vara speciella pizzor', 3),
('Oxfilepizzor', 'Lyxiga pizzor med oxfile', 4),
('Kycklingpizzor', 'Pizzor med kyckling', 5),
('Kebabpizzor', 'Pizzor med kebab', 6),
('Rullar', 'Goda rullar', 7),
('Tallrikar', 'Serveras med tillbehor', 8),
('Burgare', 'Handgjorda burgare', 9),
('Nuggets', 'Chicken nuggets', 10),
('Shawarma', 'Autentisk shawarma', 11);

-- Insert Pizzagrupp 1
INSERT INTO menu_items (name, description, price, family_price, category_id, is_vegetarian, sort_order) VALUES
('Margherita', 'Tomatsas, ost', 105, 212, 1, TRUE, 1),
('Vesuvio', 'Skinka', 109, 226, 1, FALSE, 2),
('Funghi', 'Champinjoner', 109, 226, 1, TRUE, 3),
('Kottfarspizza', 'Kottfars', 109, 226, 1, FALSE, 4);

-- Insert Pizzagrupp 2
INSERT INTO menu_items (name, description, price, family_price, category_id, is_vegetarian, sort_order) VALUES
('Hawaii', 'Skinka, ananas', 114, 242, 2, FALSE, 1),
('Capricciosa', 'Skinka, champinjoner', 114, 242, 2, FALSE, 2),
('Salami', 'Salami, paprika, lok', 114, 242, 2, FALSE, 3),
('Hot Honey Pepperoni', 'Pepperoni, chili, honung', 114, 242, 2, FALSE, 4);

-- Insert Specialpizzor
INSERT INTO menu_items (name, description, price, family_price, category_id, is_vegetarian, is_spicy, is_popular, sort_order) VALUES
('Nakis Special', 'Tonfisk, champinjoner, paprika, lok, vitlok', 127, 272, 3, FALSE, FALSE, TRUE, 1),
('Mexicana', 'Kottfars, paprika, champinjoner, lok, vitlok, feferoni, cayennepeppar', 129, 272, 3, FALSE, TRUE, FALSE, 2),
('Vegetariana', 'Champinjoner, paprika, lok, oliver, ananas', 129, 272, 3, TRUE, FALSE, FALSE, 3),
('Greek Sunset', 'Fetaost, oliver, tomat', 129, 272, 3, TRUE, FALSE, FALSE, 4),
('Napoli', 'Fetaost, champinjoner, lok, vitlok, oliver', 129, 272, 3, TRUE, FALSE, FALSE, 5),
('Svamp', 'Creme fraiche, ost, champinjoner, tryffelolja', 129, 272, 3, TRUE, FALSE, FALSE, 6);

-- Insert Oxfilepizzor
INSERT INTO menu_items (name, description, price, family_price, category_id, is_popular, sort_order) VALUES
('Oxfilepizza', 'Tomatsas, ost, oxfile, lok, bearnaisesas', 135, 286, 4, TRUE, 1),
('Oxfile Special', 'Oxfile, farsk champinjoner, lok, farsk tomater, bearnaisesas', 139, 289, 4, TRUE, 2),
('Acapulco', 'Oxfile, champinjoner, lok, vitlok, tacosas, jalapeno', 139, 289, 4, FALSE, 3);

-- Insert Kycklingpizzor
INSERT INTO menu_items (name, description, price, family_price, category_id, sort_order) VALUES
('Kycklingpizza', 'Ost, kyckling, valfri sas', 119, 264, 5, 1),
('BBQ Kyckling', 'BBQ-sas, ost, kyckling, rodlok', 129, 272, 5, 2),
('Kyckling Special', 'Kyckling, champinjoner, lok, valfri sas', 129, 272, 5, 3),
('Tikka Masala Pizza', 'Tikka masala, mozzarella, kyckling, rodlok', 135, 286, 5, 4),
('Garlic Butter Chicken', 'Vitloksmor, ost, kyckling, lok', 135, 286, 5, 5),
('Creamy Pesto Chicken', 'Pesto, ost, kyckling, parmesan', 135, 286, 5, 6);

-- Insert Kebabpizzor
INSERT INTO menu_items (name, description, price, family_price, category_id, sort_order) VALUES
('Kebabpizza', 'Kebabkott, ost, lok, feferoni, valfri sas', 119, 264, 6, 1),
('Pommespizza', 'Kebabkott, pommes, valfri sas', 124, 274, 6, 2),
('Kebab Special', 'Kebabkott, tomat, lok, gurka, sallad, feferoni, valfri sas', 124, 274, 6, 3);

-- Insert Rullar
INSERT INTO menu_items (name, description, price, category_id, sort_order) VALUES
('Kebab i brod / Kyckling', 'Isbergssallad, lok, kebabkott eller kyckling, valfri sas', 104, 7, 1),
('Kebabrulle', 'Isbergssallad, lok, kebabkott, valfri sas', 104, 7, 2),
('Kycklingrulle', 'Isbergssallad, lok, kyckling, valfri sas', 104, 7, 3),
('Kycklingkebabrulle', 'Isbergssallad, lok, kycklingkebab, valfri sas', 104, 7, 4),
('Falafelrulle', 'Isbergssallad, lok, tomat, gurka, falafel, valfri sas', 104, 7, 5),
('Pommesrulle', 'Pommes, majonnas, ketchup', 59, 7, 6);

-- Insert Tallrikar
INSERT INTO menu_items (name, description, price, category_id, sort_order) VALUES
('Kebabtallrik', 'Isbergssallad, kebabkott, pommes, tomat, gurka, feferoni, lok', 119, 8, 1),
('Kycklingtallrik', 'Isbergssallad, kyckling, pommes, tomat, gurka, feferoni, lok', 119, 8, 2),
('Falafeltallrik', 'Isbergssallad, lok, tomat, gurka, pommes, falafel, feferoni, valfri sas', 119, 8, 3);

-- Insert Burgare
INSERT INTO menu_items (name, description, price, category_id, is_popular, sort_order) VALUES
('Cheeseburger', 'Hogkvalitativ notkott, smorrostat briochebrod, hamburgerdressing, sallad, tomat, lok, pickles, dubbel cheddarost. Serveras med pommes frites', 99, 9, TRUE, 1),
('Hot N Cheesy', 'Hogkvalitativ notkott, smorrostat briochebrod, ChiliMayo, sallad, tomat, lok, jalapeno, dubbel cheddarost. Serveras med pommes', 99, 9, FALSE, 2),
('Crispy Fried Chicken Burger', 'Avokadomajonnas eller aioli, smorrostat briochebrod, sallad, tomat, picklad rodlok. Serveras med pommes', 99, 9, FALSE, 3),
('Halloumiburgare', 'Potatisbrod, Pesto/Aioli/ChiliMayo dressing, sallad, tomat, picklad rodlok, gurka. Serveras med pommes', 99, 9, TRUE, 4);

-- Insert Nuggets
INSERT INTO menu_items (name, description, price, category_id, sort_order) VALUES
('Chicken Nuggets Tallrik', 'Pommes, 8 bitar nuggets, ketchup', 119, 10, 1),
('Chicken Nuggets Barntallrik', 'Pommes, 4 bitar nuggets, ketchup', 79, 10, 2);

-- Insert Shawarma
INSERT INTO menu_items (name, description, price, category_id, sort_order) VALUES
('Shawarma Arabi', 'Kycklingrulle i bitar med pommes, vitlokssas, tomat, pickles, granatappelsas', 104, 11, 1),
('Kyckling Shawarma Rulle', 'Kyckling, vitlokssas, saltgurka, granatappelsas', 79, 11, 2);

-- Insert sample offers
INSERT INTO offers (title, description, original_price, offer_price, is_active, sort_order) VALUES
('Veckans Erbjudande', 'Valfri pizza + dryck', 140, 119, TRUE, 1),
('Familjepaket', '2 stora familjepizzor + 2 drycker', 450, 379, TRUE, 2),
('Lunchkampanj', 'Valfri liten pizza + sallad', 150, 109, TRUE, 3);

-- Create indexes for better performance
CREATE INDEX idx_menu_items_category ON menu_items(category_id);
CREATE INDEX idx_menu_items_available ON menu_items(is_available);
CREATE INDEX idx_categories_sort ON categories(sort_order);
CREATE INDEX idx_offers_active ON offers(is_active);
