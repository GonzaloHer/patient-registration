CREATE TABLE IF NOT EXISTS patients (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  phone_country_code VARCHAR(10) NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  document_photo TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
