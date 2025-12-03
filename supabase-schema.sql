-- Script SQL pour créer les tables dans Supabase
-- À exécuter dans l'éditeur SQL de Supabase

-- Table projects
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  tags TEXT[] DEFAULT '{}',
  demo_url TEXT,
  code_url TEXT,
  category TEXT DEFAULT 'frontend',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table experiences
CREATE TABLE IF NOT EXISTS experiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  company TEXT,
  location TEXT,
  period TEXT,
  description TEXT,
  achievements TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table educations
CREATE TABLE IF NOT EXISTS educations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  degree TEXT NOT NULL,
  institution TEXT,
  location TEXT,
  period TEXT,
  description TEXT,
  courses TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table about
CREATE TABLE IF NOT EXISTS about (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  description_fr TEXT,
  description_en TEXT,
  experience_years INTEGER DEFAULT 0,
  projects_count INTEGER DEFAULT 0,
  clients_count INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS) Policies

-- Enable RLS on all tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE educations ENABLE ROW LEVEL SECURITY;
ALTER TABLE about ENABLE ROW LEVEL SECURITY;

-- Policies for projects table
-- Public read access
CREATE POLICY "Public read access for projects"
  ON projects FOR SELECT
  USING (true);

-- Authenticated users can insert
CREATE POLICY "Authenticated users can insert projects"
  ON projects FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Authenticated users can update
CREATE POLICY "Authenticated users can update projects"
  ON projects FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Authenticated users can delete
CREATE POLICY "Authenticated users can delete projects"
  ON projects FOR DELETE
  USING (auth.role() = 'authenticated');

-- Policies for experiences table
CREATE POLICY "Public read access for experiences"
  ON experiences FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert experiences"
  ON experiences FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update experiences"
  ON experiences FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete experiences"
  ON experiences FOR DELETE
  USING (auth.role() = 'authenticated');

-- Policies for educations table
CREATE POLICY "Public read access for educations"
  ON educations FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert educations"
  ON educations FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update educations"
  ON educations FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete educations"
  ON educations FOR DELETE
  USING (auth.role() = 'authenticated');

-- Policies for about table
CREATE POLICY "Public read access for about"
  ON about FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert about"
  ON about FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update about"
  ON about FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete about"
  ON about FOR DELETE
  USING (auth.role() = 'authenticated');

