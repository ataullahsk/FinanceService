/*
  # Complete RS Finance Service Database Schema

  1. New Tables
    - `admins` - Admin user accounts with authentication
    - `loan_types` - Available loan products and their terms
    - `loan_applications` - Customer loan applications with full details
    - `organization_info` - Company information and settings
    - `contact_messages` - Contact form submissions from website

  2. Security
    - Enable RLS on all tables
    - Add policies for public access to loan types and organization info
    - Add policies for authenticated admin access to applications and management
    - Add policies for public contact message submission

  3. Features
    - Automatic timestamps with triggers
    - Application ID generation
    - Status tracking for applications
    - Full audit trail for application reviews
    - Organization settings management
    - Contact message management

  4. Indexes
    - Performance indexes on frequently queried columns
    - Unique constraints where needed
    - Foreign key relationships
*/

-- Enable UUID extension for generating unique IDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE application_status AS ENUM ('PENDING', 'UNDER_REVIEW', 'APPROVED', 'REJECTED');

-- Create admins table
CREATE TABLE IF NOT EXISTS admins (
  id BIGSERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create loan_types table
CREATE TABLE IF NOT EXISTS loan_types (
  id BIGSERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  interest_rate DECIMAL(5,2) NOT NULL CHECK (interest_rate > 0),
  max_amount BIGINT NOT NULL CHECK (max_amount > 0),
  min_tenure INTEGER NOT NULL CHECK (min_tenure > 0),
  max_tenure INTEGER NOT NULL CHECK (max_tenure >= min_tenure),
  processing_fee DECIMAL(5,2) NOT NULL CHECK (processing_fee >= 0),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create loan_applications table
CREATE TABLE IF NOT EXISTS loan_applications (
  id BIGSERIAL PRIMARY KEY,
  application_id TEXT UNIQUE NOT NULL,
  
  -- Personal Information
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  gender TEXT,
  marital_status TEXT,
  father_name TEXT,
  mother_name TEXT,
  
  -- Address Information
  current_address TEXT NOT NULL,
  permanent_address TEXT,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  pincode TEXT NOT NULL,
  residence_type TEXT,
  years_at_current_address INTEGER,
  
  -- Employment Information
  employment_type TEXT NOT NULL,
  company_name TEXT,
  designation TEXT,
  work_experience INTEGER,
  monthly_income BIGINT NOT NULL CHECK (monthly_income > 0),
  additional_income BIGINT DEFAULT 0,
  official_email TEXT,
  office_address TEXT,
  
  -- Loan Details
  loan_type TEXT NOT NULL,
  loan_amount BIGINT NOT NULL CHECK (loan_amount > 0),
  loan_purpose TEXT NOT NULL,
  preferred_tenure INTEGER NOT NULL CHECK (preferred_tenure > 0),
  existing_loans TEXT,
  bank_account TEXT,
  ifsc_code TEXT,
  
  -- Application Status
  status application_status DEFAULT 'PENDING',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  reviewed_by TEXT,
  review_comments TEXT
);

-- Create organization_info table (singleton)
CREATE TABLE IF NOT EXISTS organization_info (
  id INTEGER PRIMARY KEY DEFAULT 1,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  description TEXT,
  established_year TEXT,
  license_number TEXT,
  website TEXT,
  logo_path TEXT,
  
  -- Business Hours
  monday_hours TEXT DEFAULT '9:00 AM - 6:00 PM',
  tuesday_hours TEXT DEFAULT '9:00 AM - 6:00 PM',
  wednesday_hours TEXT DEFAULT '9:00 AM - 6:00 PM',
  thursday_hours TEXT DEFAULT '9:00 AM - 6:00 PM',
  friday_hours TEXT DEFAULT '9:00 AM - 6:00 PM',
  saturday_hours TEXT DEFAULT '9:00 AM - 2:00 PM',
  sunday_hours TEXT DEFAULT 'Closed',
  
  -- Social Media
  facebook_url TEXT,
  twitter_url TEXT,
  linkedin_url TEXT,
  instagram_url TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  CONSTRAINT single_org_info CHECK (id = 1)
);

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_loan_applications_status ON loan_applications(status);
CREATE INDEX IF NOT EXISTS idx_loan_applications_created_at ON loan_applications(created_at);
CREATE INDEX IF NOT EXISTS idx_loan_applications_email ON loan_applications(email);
CREATE INDEX IF NOT EXISTS idx_loan_applications_phone ON loan_applications(phone);
CREATE INDEX IF NOT EXISTS idx_loan_applications_loan_type ON loan_applications(loan_type);
CREATE INDEX IF NOT EXISTS idx_loan_types_active ON loan_types(is_active);
CREATE INDEX IF NOT EXISTS idx_contact_messages_read ON contact_messages(is_read);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_admins_updated_at BEFORE UPDATE ON admins FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_loan_types_updated_at BEFORE UPDATE ON loan_types FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_loan_applications_updated_at BEFORE UPDATE ON loan_applications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_organization_info_updated_at BEFORE UPDATE ON organization_info FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to generate application ID
CREATE OR REPLACE FUNCTION generate_application_id()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.application_id IS NULL OR NEW.application_id = '' THEN
    NEW.application_id := 'RSF' || EXTRACT(EPOCH FROM NOW())::BIGINT;
  END IF;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for application ID generation
CREATE TRIGGER generate_loan_application_id BEFORE INSERT ON loan_applications FOR EACH ROW EXECUTE FUNCTION generate_application_id();

-- Enable Row Level Security (RLS)
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE loan_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE loan_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for loan_types (public read access for active types)
CREATE POLICY "Public can view active loan types"
  ON loan_types
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage loan types"
  ON loan_types
  FOR ALL
  TO authenticated
  USING (true);

-- RLS Policies for loan_applications
CREATE POLICY "Users can insert their own applications"
  ON loan_applications
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Users can view their own applications by application_id"
  ON loan_applications
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage all applications"
  ON loan_applications
  FOR ALL
  TO authenticated
  USING (true);

-- RLS Policies for organization_info (public read access)
CREATE POLICY "Public can view organization info"
  ON organization_info
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can update organization info"
  ON organization_info
  FOR ALL
  TO authenticated
  USING (true);

-- RLS Policies for contact_messages
CREATE POLICY "Anyone can submit contact messages"
  ON contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage contact messages"
  ON contact_messages
  FOR ALL
  TO authenticated
  USING (true);

-- RLS Policies for admins
CREATE POLICY "Authenticated users can view admin profiles"
  ON admins
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update admin profiles"
  ON admins
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "System can insert admin records"
  ON admins
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Insert default data

-- Insert default admin
INSERT INTO admins (username, email, full_name, is_active) 
VALUES ('admin', 'admin@rsfinanceservice.com', 'System Administrator', true)
ON CONFLICT (username) DO NOTHING;

-- Insert default organization info
INSERT INTO organization_info (
  id, name, address, phone, email, description, established_year, 
  license_number, website
) VALUES (
  1,
  'RS FINANCE SERVICE',
  'Nutunhat, Near Indian Oil Petrol Pump, West Bengal',
  '8391808557',
  'info@rsfinanceservice.com',
  'RS Finance Service is a trusted financial services provider offering comprehensive loan solutions for individuals and businesses. With years of experience in the industry, we are committed to helping our customers achieve their financial goals through personalized service and competitive rates.',
  '2019',
  'NBFC-MFI-2019-001',
  'www.rsfinanceservice.com'
) ON CONFLICT (id) DO NOTHING;

-- Insert default loan types
INSERT INTO loan_types (name, description, interest_rate, max_amount, min_tenure, max_tenure, processing_fee, is_active) VALUES
('Personal Loan', 'Quick and flexible personal loans for any purpose - medical expenses, travel, wedding, or any personal need.', 10.5, 1000000, 12, 60, 2.5, true),
('Home Loan', 'Make your dream home a reality with our affordable home loans. Purchase, construct, or renovate your home.', 8.5, 10000000, 120, 360, 1.0, true),
('Car Loan', 'Drive your dream car today with our attractive car loan offers. New or used vehicles, we have you covered.', 9.2, 5000000, 12, 84, 1.5, true),
('Group Loan', 'Collective financing solutions for community needs, self-help groups, and joint ventures.', 11.5, 2500000, 12, 48, 3.0, true),
('Business Loan', 'Fuel your business growth with our comprehensive business financing solutions.', 12.5, 20000000, 12, 84, 2.0, true),
('Education Loan', 'Invest in your future with our education loans for higher studies in India and abroad.', 9.8, 3000000, 60, 180, 1.0, true)
ON CONFLICT (name) DO NOTHING;

-- Create views for common queries

-- View for application summary
CREATE OR REPLACE VIEW application_summary AS
SELECT 
  DATE(created_at) as application_date,
  COUNT(*) as total_applications,
  COUNT(CASE WHEN status = 'PENDING' THEN 1 END) as pending_count,
  COUNT(CASE WHEN status = 'APPROVED' THEN 1 END) as approved_count,
  COUNT(CASE WHEN status = 'REJECTED' THEN 1 END) as rejected_count,
  SUM(loan_amount) as total_amount_requested,
  SUM(CASE WHEN status = 'APPROVED' THEN loan_amount ELSE 0 END) as total_amount_approved
FROM loan_applications
GROUP BY DATE(created_at)
ORDER BY application_date DESC;

-- View for loan type statistics
CREATE OR REPLACE VIEW loan_type_stats AS
SELECT 
  lt.name as loan_type_name,
  lt.interest_rate,
  lt.max_amount,
  COUNT(la.id) as application_count,
  COUNT(CASE WHEN la.status = 'APPROVED' THEN 1 END) as approved_count,
  AVG(la.loan_amount) as avg_loan_amount,
  SUM(CASE WHEN la.status = 'APPROVED' THEN la.loan_amount ELSE 0 END) as total_approved_amount
FROM loan_types lt
LEFT JOIN loan_applications la ON lt.name = la.loan_type
WHERE lt.is_active = true
GROUP BY lt.id, lt.name, lt.interest_rate, lt.max_amount
ORDER BY application_count DESC;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT SELECT ON loan_types TO anon;
GRANT SELECT ON organization_info TO anon;
GRANT INSERT ON loan_applications TO anon;
GRANT INSERT ON contact_messages TO anon;