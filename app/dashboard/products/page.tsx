'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Product, formatPrice } from '@/lib/types/product';
import { Plus, Edit, Trash2, Package } from 'lucide-react';
import Image from 'next/image';

export default function ProductsAdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (data.success) {
        setProducts(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading text-gold mb-2">Product Management</h1>
          <p className="text-text-secondary">Manage your product catalog from the Supabase Dashboard</p>
        </div>
        <Button asChild>
          <a 
            href="https://supabase.com/dashboard" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Product in Supabase
          </a>
        </Button>
      </div>

      {/* Instructions Card */}
      <Card className="mb-8 border-gold/20 bg-background-card/60">
        <CardHeader>
          <CardTitle className="text-gold">📝 Quick Instructions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-white font-semibold mb-2">To Add a Product:</h3>
            <ol className="list-decimal list-inside space-y-1 text-text-secondary text-sm">
              <li>Go to Supabase Dashboard → Table Editor → products table</li>
              <li>Click &quot;Insert&quot; → &quot;Insert row&quot;</li>
              <li>Fill in the fields:</li>
              <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                <li><strong>name</strong>: Product name (e.g., &quot;Memory Box&quot;)</li>
                <li><strong>slug</strong>: URL-friendly name (e.g., &quot;memory-box&quot;)</li>
                <li><strong>description</strong>: Product description</li>
                <li><strong>category</strong>: keepsake, memorial, jewelry, package, or digital</li>
                <li><strong>base_price</strong>: Price as decimal (e.g., 149.99)</li>
                <li><strong>images</strong>: JSON array [&quot;https://...&quot;]</li>
                <li><strong>stock_quantity</strong>: Number available (e.g., 50)</li>
                <li><strong>tags</strong>: Array of tags (featured, bestseller, new_arrival)</li>
              </ul>
              <li>Click &quot;Save&quot;</li>
            </ol>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-2">To Edit a Product:</h3>
            <ol className="list-decimal list-inside space-y-1 text-text-secondary text-sm">
              <li>Go to Supabase Dashboard → Table Editor → products table</li>
              <li>Click on any field to edit directly</li>
              <li>Changes save automatically</li>
            </ol>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-2">To Delete a Product:</h3>
            <ol className="list-decimal list-inside space-y-1 text-text-secondary text-sm">
              <li>Go to Supabase Dashboard → Table Editor → products table</li>
              <li>Click the row checkbox</li>
              <li>Click &quot;Delete&quot; button</li>
              <li>Confirm deletion</li>
            </ol>
          </div>

          <div className="mt-4 p-4 bg-gold/10 rounded-lg border border-gold/30">
            <p className="text-gold text-sm font-semibold mb-2">💡 Pro Tip: Use Quality Images</p>
            <p className="text-text-secondary text-sm">
              For best results, use high-quality images from Unsplash (1200x1200px minimum).
              Example: <code className="text-gold">https://images.unsplash.com/photo-xyz?w=1200&q=80</code>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Products List */}
      <div className="space-y-4">
        <h2 className="text-xl font-heading text-gold flex items-center gap-2">
          <Package className="h-5 w-5" />
          Current Products ({products.length})
        </h2>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Card 
                key={product.id}
                className="border-gold/20 bg-background-card/40 hover:border-gold/40 transition-colors"
              >
                <CardHeader className="space-y-4">
                  <div className="aspect-square w-full rounded-lg overflow-hidden bg-gold/5 relative">
                    {product.images && product.images[0] ? (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-text-secondary/40">
                        <Package className="h-12 w-12" />
                      </div>
                    )}
                    <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                      {product.tags.includes('featured') && (
                        <span className="bg-gold text-background px-2 py-0.5 rounded text-xs font-bold">
                          FEATURED
                        </span>
                      )}
                      {product.tags.includes('bestseller') && (
                        <span className="bg-emerald-500 text-white px-2 py-0.5 rounded text-xs font-bold">
                          BESTSELLER
                        </span>
                      )}
                      {product.tags.includes('new_arrival') && (
                        <span className="bg-blue-500 text-white px-2 py-0.5 rounded text-xs font-bold">
                          NEW
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <CardTitle className="text-white line-clamp-1">{product.name}</CardTitle>
                    <p className="text-sm text-text-secondary mt-1 line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="font-heading text-xl text-gold">
                      {formatPrice(product.base_price)}
                    </div>
                    <span className="text-sm text-text-secondary">
                      Stock: {product.stock_quantity}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-text-secondary">
                    <span className="px-2 py-1 bg-gold/10 rounded">
                      {product.category}
                    </span>
                    <span className="px-2 py-1 bg-gold/10 rounded">
                      {product.slug}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      asChild
                    >
                      <a 
                        href={`https://supabase.com/dashboard`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </a>
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 text-destructive hover:text-destructive"
                      asChild
                    >
                      <a 
                        href={`https://supabase.com/dashboard`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Example SQL */}
      <Card className="mt-8 border-gold/20 bg-background-card/60">
        <CardHeader>
          <CardTitle className="text-gold">📄 Example SQL (Copy & Run in Supabase)</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-black/40 p-4 rounded-lg overflow-x-auto text-sm text-text-secondary">
{`-- Add a new product
INSERT INTO products (name, slug, description, category, base_price, images, stock_quantity, tags)
VALUES (
  'Custom Engraved Memory Box',
  'custom-engraved-memory-box',
  'Beautiful handcrafted memory box with personalized engraving',
  'keepsake',
  179.99,
  '["https://images.unsplash.com/photo-xyz?w=1200&q=80"]'::jsonb,
  25,
  ARRAY['featured', 'new_arrival']
);

-- Update product price
UPDATE products 
SET base_price = 199.99 
WHERE slug = 'custom-engraved-memory-box';

-- Update stock quantity
UPDATE products 
SET stock_quantity = stock_quantity - 1 
WHERE slug = 'custom-engraved-memory-box';

-- Delete a product
DELETE FROM products 
WHERE slug = 'custom-engraved-memory-box';`}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}