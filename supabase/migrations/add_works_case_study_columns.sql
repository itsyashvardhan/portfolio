-- Migration: Add Case Study Columns to Works Table
-- Date: 2026-01-06
-- Description: Adds constraints, decisions, tech_context, outcome, and role columns
--              required by the admin panel for full case study management

-- Add missing case study columns to works table
ALTER TABLE works ADD COLUMN IF NOT EXISTS constraints TEXT;
ALTER TABLE works ADD COLUMN IF NOT EXISTS decisions TEXT;
ALTER TABLE works ADD COLUMN IF NOT EXISTS tech_context TEXT;
ALTER TABLE works ADD COLUMN IF NOT EXISTS outcome TEXT;
ALTER TABLE works ADD COLUMN IF NOT EXISTS role TEXT;

-- Verify columns were added (this will show the table structure)
-- SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'works';
