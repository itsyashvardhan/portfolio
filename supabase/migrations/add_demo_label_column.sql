-- Add demo_label column to works table
-- This allows customization of the demo link text (e.g., "Live", "Try It", "View Site")
-- Default behavior: If NULL, displays "Live Demo →" in the UI

ALTER TABLE works ADD COLUMN IF NOT EXISTS demo_label TEXT;

-- Add comment for documentation
COMMENT ON COLUMN works.demo_label IS 'Custom label for the demo link. If NULL, defaults to "Live Demo →" in UI.';
