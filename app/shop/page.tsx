'use client';

import { PublicShell } from '@/components/layout/public-shell';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/context/cart-context';
import { Product, formatPrice } from '@/lib/types/product';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ShoppingBag, Star, TrendingUp, Sparkles } from 'lucide-react';

type CategoryFilter = 'all' | 'keepsake' | 'memorial' | 'jewelry' | 'package' | 'digital';

const categories = [
  { id: 'all' as CategoryFilter, label: 'All Products', icon: ShoppingBag },
  { id: 'keepsake' as CategoryFilter, label: 'Keepsakes', icon: Star },
  { id: 'memorial' as CategoryFilter, label: 'Memorials', icon: Sparkles },
  { id: 'jewelry' as CategoryFilter, label: 'Jewelry', icon: Star },
  { id: 'package' as CategoryFilter, label: 'Packages', icon: TrendingUp },
  { id: 'digital' as CategoryFilter, label: 'Digital', icon: Sparkles },
];

export default function ShopPage() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        // Fetch featured products
        const featuredRes = await fetch('/api/products?featured=true&limit=3');
        const featuredData = await featuredRes.json();
        if (featuredData.success) {
          setFeaturedProducts(featuredData.data);
        }

        // Fetch all products or filtered by category
        const url = selectedCategory === 'all' 
          ? '/api/products'
          : `/api/products?category=${selectedCategory}`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.success) {
          setProducts(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [selectedCategory]);

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
  };

  return (
    <PublicShell>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-background-card/50 py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.1),transparent_50%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl md:text-5xl lg:text-6xl font-heading text-gold">
              Meaningful Gifts
            </h1>
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
              Hand-selected keepsakes and memorial items that pair beautifully with your video messages. 
              Each piece is crafted to preserve precious memories and celebrate lasting legacies.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      {featuredProducts.length > 0 && (
        <section className="container mx-auto px-4 py-12">
          <div className="flex items-center gap-2 mb-8">
            <Star className="h-5 w-5 text-gold fill-gold" />
            <h2 className="text-2xl font-heading text-gold">Featured Products</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <Card 
                key={product.id} 
                className="border-gold/30 bg-background-card/60 hover:shadow-glow transition-all hover:border-gold/50 group"
              >
                <CardHeader className="space-y-4">
                  <div className="aspect-square w-full rounded-lg overflow-hidden bg-gold/5 relative">
                    {product.images && product.images[0] ? (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-text-secondary/40">
                        <ShoppingBag className="h-16 w-16" />
                      </div>
                    )}
                    {product.tags.includes('bestseller') && (
                      <div className="absolute top-2 right-2 bg-gold text-background px-2 py-1 rounded text-xs font-bold">
                        BESTSELLER
                      </div>
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-white group-hover:text-gold transition-colors">
                      {product.name}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 mt-2">
                      {product.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="font-heading text-2xl text-gold">
                      {formatPrice(product.base_price)}
                    </div>
                    {product.stock_quantity > 0 && product.stock_quantity < 10 && (
                      <span className="text-xs text-amber-500">
                        Only {product.stock_quantity} left
                      </span>
                    )}
                  </div>
                  <Button 
                    className="w-full" 
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock_quantity === 0}
                  >
                    {product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="container mx-auto px-4 py-8 border-t border-gold/20">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg border transition-all
                  ${selectedCategory === category.id
                    ? 'bg-gold/20 border-gold text-gold shadow-glow'
                    : 'border-gold/20 text-text-secondary hover:border-gold/40 hover:text-gold'
                  }
                `}
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm font-medium">{category.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Products Grid */}
      <section className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag className="h-16 w-16 text-text-secondary/40 mx-auto mb-4" />
            <p className="text-text-secondary">No products found in this category.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <Card 
                key={product.id} 
                className="border-gold/20 bg-background-card/40 hover:shadow-glow transition-all hover:border-gold/40 group"
              >
                <CardHeader className="space-y-4">
                  <div className="aspect-square w-full rounded-lg overflow-hidden bg-gold/5 relative">
                    {product.images && product.images[0] ? (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-text-secondary/40">
                        <ShoppingBag className="h-12 w-12" />
                      </div>
                    )}
                    {product.tags.includes('new_arrival') && (
                      <div className="absolute top-2 left-2 bg-emerald-500 text-white px-2 py-1 rounded text-xs font-bold">
                        NEW
                      </div>
                    )}
                    {product.tags.includes('bestseller') && !product.tags.includes('featured') && (
                      <div className="absolute top-2 right-2 bg-gold text-background px-2 py-1 rounded text-xs font-bold">
                        BESTSELLER
                      </div>
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-white group-hover:text-gold transition-colors line-clamp-1">
                      {product.name}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 mt-2">
                      {product.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="font-heading text-xl text-gold">
                      {formatPrice(product.base_price)}
                    </div>
                    {product.stock_quantity > 0 && product.stock_quantity < 10 && (
                      <span className="text-xs text-amber-500">
                        {product.stock_quantity} left
                      </span>
                    )}
                  </div>
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock_quantity === 0}
                  >
                    {product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Info Section */}
      <section className="container mx-auto px-4 py-16 border-t border-gold/20">
        <div className="grid gap-8 md:grid-cols-3 text-center">
          <div>
            <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🚚</span>
            </div>
            <h3 className="text-lg font-heading text-gold mb-2">Free Shipping</h3>
            <p className="text-sm text-text-secondary">On orders over $100</p>
          </div>
          <div>
            <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⭐</span>
            </div>
            <h3 className="text-lg font-heading text-gold mb-2">Premium Quality</h3>
            <p className="text-sm text-text-secondary">Hand-selected keepsakes</p>
          </div>
          <div>
            <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💝</span>
            </div>
            <h3 className="text-lg font-heading text-gold mb-2">Gift Wrapping</h3>
            <p className="text-sm text-text-secondary">Available at checkout</p>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
