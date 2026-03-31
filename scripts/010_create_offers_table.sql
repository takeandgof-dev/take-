-- Create offers table for Take & Go Falkenberg
CREATE TABLE IF NOT EXISTS offers (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url TEXT,
    price DECIMAL(10, 2),
    discount_percent INTEGER,
    valid_from DATE,
    valid_until DATE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert some sample offers
INSERT INTO offers (title, description, price, discount_percent, is_active, valid_from, valid_until) VALUES
('Veckans Pizza', 'Köp valfri pizza och få en läsk på köpet!', 129, 10, true, CURRENT_DATE, CURRENT_DATE + INTERVAL '30 days'),
('Familjepaket', '2 stora pizzor + 4 läsk för endast 299 kr', 299, 15, true, CURRENT_DATE, CURRENT_DATE + INTERVAL '60 days'),
('Lunchspecial', 'Valfri rätt + sallad + dryck kl 11-14', 99, 20, true, CURRENT_DATE, CURRENT_DATE + INTERVAL '90 days');
