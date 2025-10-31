import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';
import type { Product } from '@/lib/types/product';

export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabase();
    const { searchParams } = new URL(request.url);
    
    // Query parameters
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const bestseller = searchParams.get('bestseller');
    const newArrival = searchParams.get('new_arrival');
    const limit = searchParams.get('limit');
    const search = searchParams.get('search');

    // Build query
    let query = supabase
      .from('products')
      .select('*');

    // Apply filters
    if (category) {
      query = query.eq('category', category);
    }

    if (featured === 'true') {
      query = query.contains('tags', ['featured']);
    }

    if (bestseller === 'true') {
      query = query.contains('tags', ['bestseller']);
    }

    if (newArrival === 'true') {
      query = query.contains('tags', ['new_arrival']);
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%,tags.cs.{${search}}`);
    }

    // Apply ordering and limit
    query = query.order('created_at', { ascending: false });

    if (limit) {
      query = query.limit(parseInt(limit));
    }

    // Execute query
    const { data: products, error } = await query;

    if (error) {
      console.error('Database query error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch products', details: error.message },
        { status: 500 }
      );
    }

    // Parse JSONB images if needed
    const parsedProducts = products?.map(p => ({
      ...p,
      images: Array.isArray(p.images) ? p.images :
              typeof p.images === 'string' ? JSON.parse(p.images) :
              []
    })) || [];

    return NextResponse.json({
      success: true,
      data: parsedProducts,
      count: parsedProducts.length,
    });
  } catch (error) {
    console.error('Fetch products exception:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET single product by slug
export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabase();
    const body = await request.json();
    const { slug } = body;

    if (!slug) {
      return NextResponse.json(
        { error: 'Product slug is required' },
        { status: 400 }
      );
    }

    const { data: product, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error('Database query error:', error);
      return NextResponse.json(
        { error: 'Product not found', details: error.message },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Fetch product exception:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}