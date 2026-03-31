-- Add missing columns to menu_items table
ALTER TABLE menu_items
ADD COLUMN display_order INTEGER DEFAULT 0;

-- Add missing columns to offers table
ALTER TABLE offers
ADD COLUMN image_url TEXT;

-- Update display_order for existing menu items to ensure they display in insertion order
UPDATE menu_items SET display_order = id WHERE display_order = 0;
