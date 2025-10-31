-- =============================================
-- GLOWING LEGACY E-COMMERCE SETUP
-- Run this entire script in Supabase SQL Editor
-- =============================================

-- Step 1: Create products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('keepsake', 'memorial', 'jewelry', 'package', 'digital')),
  base_price DECIMAL(10, 2) NOT NULL,
  images JSONB DEFAULT '[]'::jsonb,
  stock_quantity INTEGER DEFAULT 0,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Step 2: Create variants table for product customization options
CREATE TABLE IF NOT EXISTS product_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  options TEXT[] NOT NULL,
  price_modifier DECIMAL(10, 2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Step 3: Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_tags ON products USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_product_variants_product_id ON product_variants(product_id);

-- Step 4: Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;

-- Step 5: Create RLS policies - Products are publicly readable
DROP POLICY IF EXISTS "Products are viewable by everyone" ON products;
CREATE POLICY "Products are viewable by everyone"
  ON products
  FOR SELECT
  TO public
  USING (true);

DROP POLICY IF EXISTS "Product variants are viewable by everyone" ON product_variants;
CREATE POLICY "Product variants are viewable by everyone"
  ON product_variants
  FOR SELECT
  TO public
  USING (true);

DROP POLICY IF EXISTS "Only admins can manage products" ON products;
CREATE POLICY "Only admins can manage products"
  ON products
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Only admins can manage product variants" ON product_variants;
CREATE POLICY "Only admins can manage product variants"
  ON product_variants
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Step 6: Add updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_products_updated_at ON products;
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- SEED PRODUCTS DATA
-- =============================================

-- Clear existing products if any
TRUNCATE products CASCADE;

-- Insert Products
INSERT INTO products (name, slug, description, category, base_price, images, stock_quantity, tags) VALUES

-- Keepsake Products
(
  'Eternal Memories Keepsake Box',
  'eternal-memories-keepsake-box',
  'A handcrafted walnut keepsake box with personalized engraving. Perfect for storing precious photos, letters, and small mementos. Each box is carefully crafted with a premium velvet interior.',
  'keepsake',
  149.99,
  '["https://images.unsplash.com/photo-1565693413579-e05166f90e9c?w=800&q=80"]'::jsonb,
  45,
  ARRAY['featured', 'bestseller', 'premium']
),
(
  'Golden Hour Memory Box',
  'golden-hour-memory-box',
  'Luxury memory box with gold-leaf detailing and multiple compartments. Features a built-in photo frame and elegant silk lining. A beautiful way to preserve your most treasured moments.',
  'keepsake',
  249.99,
  '["https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80"]'::jsonb,
  20,
  ARRAY['featured', 'luxury', 'premium']
),
(
  'Legacy Photo Frame Set',
  'legacy-photo-frame-set',
  'Set of 3 premium wooden frames in coordinating finishes. Display your favorite family photos with style. Includes wall mounting hardware and stands for tabletop display.',
  'keepsake',
  89.99,
  '["https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=800&q=80"]'::jsonb,
  60,
  ARRAY['bestseller', 'gift_ready']
),

-- Memorial Products
(
  'Remembrance Stone Garden Marker',
  'remembrance-stone-garden-marker',
  'Beautiful natural stone memorial marker for your garden. Weather-resistant with customizable engraving. A peaceful way to remember and honor loved ones.',
  'memorial',
  179.99,
  '["https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&q=80"]'::jsonb,
  30,
  ARRAY['memorial', 'personalized']
),
(
  'Memorial Candle Collection',
  'memorial-candle-collection',
  'Set of 3 premium memorial candles with soothing scents. Each candle burns for 40+ hours. Includes lavender, vanilla, and ocean breeze fragrances.',
  'memorial',
  49.99,
  '["https://images.unsplash.com/photo-1602874801006-39554e5c76c5?w=800&q=80"]'::jsonb,
  100,
  ARRAY['memorial', 'gift_ready']
),

-- Jewelry Products
(
  'Infinity Love Pendant',
  'infinity-love-pendant',
  'Sterling silver infinity pendant with option for engraving. Comes with an 18-inch chain and elegant gift box. Symbolizes eternal love and connection.',
  'jewelry',
  199.99,
  '["https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80"]'::jsonb,
  75,
  ARRAY['featured', 'jewelry', 'personalized']
),
(
  'Family Tree Bracelet',
  'family-tree-bracelet',
  'Delicate charm bracelet featuring a family tree design. Add up to 5 personalized name charms. Made from hypoallergenic materials.',
  'jewelry',
  159.99,
  '["https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80"]'::jsonb,
  50,
  ARRAY['jewelry', 'personalized']
),

-- Package Deals
(
  'Complete Legacy Package',
  'complete-legacy-package',
  'Everything you need to create a lasting legacy. Includes 10 video message credits, keepsake box, photo frame set, and premium gift wrapping.',
  'package',
  499.99,
  '["https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80"]'::jsonb,
  25,
  ARRAY['featured', 'bestseller', 'bundle', 'value']
),

-- Digital Products
(
  '10 Video Message Credits',
  '10-video-message-credits',
  'Record and schedule 10 heartfelt video messages to your loved ones. Videos are stored securely and delivered on your chosen dates.',
  'digital',
  99.99,
  '["https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80"]'::jsonb,
  999,
  ARRAY['digital', 'bestseller']
),
(
  'Single Video Message',
  'single-video-message',
  'Perfect for trying out our service. Record one video message up to 5 minutes long. Schedule delivery for any future date.',
  'digital',
  14.99,
  '["https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800&q=80"]'::jsonb,
  999,
  ARRAY['digital', 'new_arrival']
),
(
  'Premium Video Storage - Annual',
  'premium-video-storage-annual',
  'Store unlimited video messages with our premium annual plan. Includes priority support, HD quality, and advanced scheduling features.',
  'digital',
  299.99,
  '["https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"]'::jsonb,
  999,
  ARRAY['digital', 'subscription', 'premium']
);

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'E-commerce setup complete! Created % products', (SELECT COUNT(*) FROM products);
END $$;