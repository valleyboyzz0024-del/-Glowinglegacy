-- Fix Memorial Product Images
-- Run this in Supabase SQL Editor

UPDATE products 
SET images = '["https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=800&q=80"]'::jsonb
WHERE slug = 'memorial-candle-collection';

UPDATE products 
SET images = '["https://images.unsplash.com/photo-1503149779833-1de50ebe5f8a?w=800&q=80"]'::jsonb
WHERE slug = 'remembrance-stone-garden-marker';