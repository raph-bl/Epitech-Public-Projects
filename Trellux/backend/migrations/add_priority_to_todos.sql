-- Migration: Add priority column to todo table
-- Date: 2025-11-27

USE etodo;

-- Add priority column with ENUM type
-- Note: This will fail if the column already exists, which is fine
ALTER TABLE todo
ADD COLUMN priority ENUM('low', 'normal', 'high', 'urgent')
DEFAULT 'normal'
AFTER status;
