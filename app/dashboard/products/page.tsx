'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Product, formatPrice } from '@/lib/types/product';
import { Plus, Trash2, Package, X, Check, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import { getSupabase } from '@/lib/supabase';

export default function ProductsAdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    category: 'keepsake',
    base_price: '',
    image_url: '',
    stock_quantity: '50',
    tags: '',
  });

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const supabase = getSupabase();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = '/login';
        return;
      }

      const { data: userData } = await supabase
        .from('users')
        .select('is_admin')
        .eq('id', user.id)
        .single();

      if (userData?.is_admin === true) {
        setIsAdmin(true);
        fetchProducts();
      } else {
        setIsAdmin(false);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setIsAdmin(false);
    } finally {
      setCheckingAuth(false);
    }
  };

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

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/products/manage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          slug: formData.slug,
          description: formData.description,
          category: formData.category,
          base_price: formData.base_price,
          images: formData.image_url ? [formData.image_url] : [],
          stock_quantity: formData.stock_quantity,
          tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        }),
      });

      if (res.ok) {
        alert('✅ Product added successfully!');
        setShowAddForm(false);
        setFormData({
          name: '',
          slug: '',
          description: '',
          category: 'keepsake',
          base_price: '',
          image_url: '',
          stock_quantity: '50',
          tags: '',
        });
        fetchProducts();
      } else {
        const error = await res.json();
        alert('❌ Failed to add product: ' + error.error);
      }
    } catch (error) {
      alert('❌ Error: ' + error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (product: Product) => {
    if (!confirm(`Delete "${product.name}"? This cannot be undone.`)) {
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/products/manage?id=${product.id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        alert('✅ Product deleted!');
        fetchProducts();
      } else {
        const error = await res.json();
        alert('❌ Failed to delete: ' + error.error);
      }
    } catch (error) {
      alert('❌ Error: ' + error);
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  // Show loading while checking auth
  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
      </div>
    );
  }

  // Show access denied if not admin
  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="border-red-500/20 bg-red-500/10 max-w-md">
          <CardHeader>
            <CardTitle className="text-red-400 flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Access Denied
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-400 mb-4">
              You do not have permission to access this page. Only administrators can manage products.
            </p>
            <Button asChild variant="outline">
              <a href="/dashboard">Return to Dashboard</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading text-gold mb-2">Product Management</h1>
          <p className="text-text-secondary">Add, edit, and remove products from your shop</p>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? <X className="h-4 w-4 mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
          {showAddForm ? 'Cancel' : 'Add Product'}
        </Button>
      </div>

      {/* Add Product Form */}
      {showAddForm && (
        <Card className="border-gold/20 bg-background-card/60">
          <CardHeader>
            <CardTitle className="text-gold">Add New Product</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium mb-2">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => {
                      const name = e.target.value;
                      setFormData({ ...formData, name, slug: generateSlug(name) });
                    }}
                    className="w-full px-4 py-2.5 rounded-lg border border-gold/20 bg-background-card/60 focus:outline-none focus:ring-2 focus:ring-gold/50"
                    placeholder="e.g., Custom Memory Box"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Slug (URL) *</label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gold/20 bg-background-card/60 focus:outline-none focus:ring-2 focus:ring-gold/50"
                    placeholder="custom-memory-box"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Description *</label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gold/20 bg-background-card/60 focus:outline-none focus:ring-2 focus:ring-gold/50"
                    rows={3}
                    placeholder="Product description..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Category *</label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gold/20 bg-background-card/60 focus:outline-none focus:ring-2 focus:ring-gold/50"
                  >
                    <option value="keepsake">Keepsake</option>
                    <option value="memorial">Memorial</option>
                    <option value="jewelry">Jewelry</option>
                    <option value="package">Package</option>
                    <option value="digital">Digital</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Price ($) *</label>
                  <input
                    type="number"
                    required
                    step="0.01"
                    min="0"
                    value={formData.base_price}
                    onChange={(e) => setFormData({ ...formData, base_price: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gold/20 bg-background-card/60 focus:outline-none focus:ring-2 focus:ring-gold/50"
                    placeholder="149.99"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Stock Quantity *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.stock_quantity}
                    onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gold/20 bg-background-card/60 focus:outline-none focus:ring-2 focus:ring-gold/50"
                    placeholder="50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Image URL
                    <span className="text-xs text-text-secondary ml-2">(Unsplash recommended)</span>
                  </label>
                  <input
                    type="url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gold/20 bg-background-card/60 focus:outline-none focus:ring-2 focus:ring-gold/50"
                    placeholder="https://images.unsplash.com/photo-..."
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">
                    Tags
                    <span className="text-xs text-text-secondary ml-2">(comma-separated: featured, bestseller, new_arrival)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gold/20 bg-background-card/60 focus:outline-none focus:ring-2 focus:ring-gold/50"
                    placeholder="featured, bestseller"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Button type="submit" disabled={loading}>
                  <Check className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

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
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => handleDeleteProduct(product)}
                    disabled={loading}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete Product
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Helper Card */}
      <Card className="border-gold/20 bg-background-card/60">
        <CardHeader>
          <CardTitle className="text-gold">💡 Tips for Managing Products</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-text-secondary">
          <div>
            <strong className="text-white">Slug:</strong> Auto-generated from product name. Must be unique (e.g., &quot;memory-box&quot;)
          </div>
          <div>
            <strong className="text-white">Categories:</strong> keepsake, memorial, jewelry, package, digital
          </div>
          <div>
            <strong className="text-white">Tags:</strong> Use &quot;featured&quot; for homepage, &quot;bestseller&quot; for badge, &quot;new_arrival&quot; for new items
          </div>
          <div>
            <strong className="text-white">Images:</strong> Use Unsplash URLs for high-quality images (free stock photos)
            <br />
            <span className="text-xs">Example: https://images.unsplash.com/photo-123?w=1200&q=80</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
