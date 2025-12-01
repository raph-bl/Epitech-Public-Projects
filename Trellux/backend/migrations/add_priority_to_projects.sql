-- Migration: Add priority column to project table
-- Date: 2025-11-27

USE etodo;

-- Add priority column with ENUM type
-- Values: 'low', 'normal', 'high', 'urgent'
-- Default: 'normal'
ALTER TABLE project
ADD COLUMN priority ENUM('low', 'normal', 'high', 'urgent')
DEFAULT 'normal'
AFTER image;

-- Optional: Add index for faster filtering by priority
ALTER TABLE project
ADD INDEX idx_priority (priority);
