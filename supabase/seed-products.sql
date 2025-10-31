-- Seed Products for Glowing Legacy E-Commerce
-- Run this in Supabase SQL Editor to populate products table

-- Clear existing products (optional, for testing)
-- DELETE FROM products;

-- Legacy Keepsake Boxes
INSERT INTO products (id, name, slug, description, long_description, category, base_price, images, stock_quantity, is_active, tags, featured, bestseller) VALUES
(
  gen_random_uuid(),
  'Eternal Memories Keepsake Box',
  'eternal-memories-keepsake-box',
  'Handcrafted wooden box with gold inlay, perfect for storing precious mementos',
  'Our signature keepsake box is meticulously handcrafted from premium walnut wood with elegant gold inlay details. Features a velvet-lined interior with compartments for photos, letters, and small treasures. Includes a brass nameplate that can be personalized with your loved ones name. Perfect for preserving cherished memories for generations.',
  'keepsake',
  149.99,
  ARRAY['https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=800', 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=800'],
  50,
  true,
  ARRAY['keepsake', 'memorial', 'wooden', 'personalized', 'premium'],
  true,
  true
),
(
  gen_random_uuid(),
  'Golden Hour Memory Box',
  'golden-hour-memory-box',
  'Elegant gold-plated box with crystal accents for your most treasured moments',
  'This stunning memory box features a lustrous gold-plated finish with hand-set Swarovski crystal accents. The interior is lined with soft cream silk and includes photo holders and a hidden compartment for special keepsakes. Each box comes with a certificate of authenticity and lifetime warranty.',
  'keepsake',
  249.99,
  ARRAY['https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800', 'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=800'],
  30,
  true,
  ARRAY['keepsake', 'luxury', 'gold', 'crystal', 'premium'],
  true,
  false
);

-- Memorial Items
INSERT INTO products (id, name, slug, description, long_description, category, base_price, images, stock_quantity, is_active, tags, bestseller, new_arrival) VALUES
(
  gen_random_uuid(),
  'Legacy Photo Frame Set',
  'legacy-photo-frame-set',
  'Premium gold and black frame set (3 pieces) with engraved accents',
  'This exquisite frame set includes three coordinating frames in our signature gold and black design. Each frame features laser-engraved decorative elements and can display 5x7" photos. Perfect for creating a memorial gallery wall. Includes mounting hardware and detailed instructions.',
  'memorial',
  89.99,
  ARRAY['https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=800', 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=800'],
  100,
  true,
  ARRAY['memorial', 'frames', 'set', 'engraved', 'wall-art'],
  true,
  false
),
(
  gen_random_uuid(),
  'Remembrance Candle Collection',
  'remembrance-candle-collection',
  'Hand-poured luxury candles (set of 3) with custom memory labels',
  'Our premium candle collection features three hand-poured soy candles in elegant gold vessels. Each candle includes a customizable label where you can add a cherished photo and name. Scents include: Peaceful Garden, Warm Embrace, and Eternal Light. Burns for 40+ hours each.',
  'memorial',
  79.99,
  ARRAY['https://images.unsplash.com/photo-1602874801007-dfcfb7ed1f4d?w=800', 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800'],
  75,
  true,
  ARRAY['memorial', 'candles', 'set', 'personalized', 'luxury'],
  false,
  true
);

-- Jewelry
INSERT INTO products (id, name, slug, description, long_description, category, base_price, images, stock_quantity, is_active, tags, featured) VALUES
(
  gen_random_uuid(),
  'Infinity Love Pendant',
  'infinity-love-pendant',
  '14k gold pendant with infinity symbol and optional birthstone',
  'This timeless pendant features a delicate infinity symbol crafted in 14k gold. The center can hold a birthstone of your choice, making it deeply personal. Comes on an 18" gold chain with adjustable length. Perfect for honoring everlasting love and connection. Gift boxed with care card.',
  'jewelry',
  199.99,
  ARRAY['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800', 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800'],
  40,
  true,
  ARRAY['jewelry', 'pendant', 'gold', 'birthstone', 'personalized'],
  true
),
(
  gen_random_uuid(),
  'Memory Keeper Locket',
  'memory-keeper-locket',
  'Vintage-style gold locket that holds two photos',
  'Our classic oval locket opens to reveal space for two precious photos. Crafted in lustrous gold-tone with intricate engraving on the exterior. Can be personalized with initials on the back. Includes 20" chain and velvet gift pouch. A timeless way to keep loved ones close to your heart.',
  'jewelry',
  129.99,
  ARRAY['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800', 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800'],
  60,
  true,
  ARRAY['jewelry', 'locket', 'vintage', 'personalized', 'photo'],
  false
);

-- Package Deals
INSERT INTO products (id, name, slug, description, long_description, category, base_price, images, stock_quantity, is_active, tags, featured, bestseller) VALUES
(
  gen_random_uuid(),
  'Complete Legacy Package',
  'complete-legacy-package',
  'Everything you need: 5 video messages, keepsake box, and memory book',
  'Our most comprehensive package includes: 5 recorded video message credits, premium Eternal Memories Keepsake Box, beautifully bound legacy memory book (100 pages), and our exclusive Legacy Planning Guide. Save $150 when you purchase this complete package. Perfect for those who want to create a complete legacy preservation system.',
  'package',
  499.99,
  ARRAY['https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=800', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800'],
  25,
  true,
  ARRAY['package', 'bundle', 'video', 'keepsake', 'complete', 'best-value'],
  true,
  true
),
(
  gen_random_uuid(),
  'Starter Legacy Kit',
  'starter-legacy-kit',
  'Perfect beginner package: 3 video messages and memory journal',
  'Begin your legacy journey with this thoughtfully curated starter kit. Includes 3 video message credits and our guided Legacy Memory Journal with prompts to help you capture life stories, wisdom, and messages for loved ones. Great gift for anyone wanting to preserve their memories.',
  'package',
  199.99,
  ARRAY['https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800'],
  100,
  true,
  ARRAY['package', 'bundle', 'video', 'journal', 'starter', 'gift'],
  false,
  false
);

-- Digital Products
INSERT INTO products (id, name, slug, description, long_description, category, base_price, images, stock_quantity, is_active, tags, new_arrival) VALUES
(
  gen_random_uuid(),
  '10 Video Message Credits',
  '10-video-message-credits',
  'Record and store 10 video messages (up to 5 minutes each)',
  'Purchase credits to record and securely store up to 10 video messages, each up to 5 minutes long. All videos are stored in high definition with unlimited views and downloads. Schedule delivery for any future date. Credits never expire. Perfect for creating a collection of messages for multiple recipients or occasions.',
  'digital',
  99.99,
  ARRAY['https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=800'],
  999,
  true,
  ARRAY['digital', 'video', 'credits', 'messages', 'popular'],
  false
),
(
  gen_random_uuid(),
  'Single Video Message',
  'single-video-message',
  'One video message credit (up to 5 minutes)',
  'Perfect for that one special message you want to preserve. Record up to 5 minutes in HD quality, schedule delivery for any date, and give access to your chosen recipient. Video is stored securely with unlimited views and downloads. Great for trying out the service.',
  'digital',
  14.99,
  ARRAY['https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=800'],
  999,
  true,
  ARRAY['digital', 'video', 'single', 'trial', 'budget-friendly'],
  true
),
(
  gen_random_uuid(),
  'Premium Video Storage (Annual)',
  'premium-video-storage-annual',
  'Unlimited video storage for one year with priority support',
  'Upgrade to premium storage and record unlimited video messages for an entire year. Includes priority customer support, advanced scheduling features, custom branding on delivery emails, and analytics on when your videos are viewed. All videos stored in 4K quality when available.',
  'digital',
  299.99,
  ARRAY['https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800'],
  999,
  true,
  ARRAY['digital', 'subscription', 'premium', 'unlimited', 'annual'],
  false
);

-- Update sequence for order numbers (if not exists)
CREATE SEQUENCE IF NOT EXISTS order_number_seq START 1;

-- Verify products were inserted
SELECT COUNT(*) as total_products FROM products;
SELECT category, COUNT(*) as count FROM products GROUP BY category;