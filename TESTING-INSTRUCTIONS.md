# E-Commerce Testing Instructions

## Step 1: Run Database Migration

1. Go to **Supabase Dashboard** → Your Project → **SQL Editor**
2. Click **New Query**
3. Copy entire contents of `glowing-legacy/supabase/migrations/FULL_E_COMMERCE_SETUP.sql`
4. Click **Run** (Ctrl+Enter)
5. You should see: "E-commerce setup complete! Created 11 products"

## Step 2: Verify Dev Server

Dev server should already be running. If not:
```bash
cd glowing-legacy
npm run dev
```

Open: http://localhost:3000

## Step 3: Test Shop Page

1. Navigate to http://localhost:3000/shop
2. **Expected to see:**
   - Hero section with "Meaningful Gifts" heading
   - Featured products section (3 products)
   - Category filter buttons
   - Product grid with 11 products
   - Product images from Unsplash
   - "Add to Cart" buttons

## Step 4: Test Category Filters

Click each category button:
- **All Products** → Shows all 11 products
- **Keepsakes** → Shows 3 products (boxes, frames)
- **Memorials** → Shows 2 products (stones, candles)
- **Jewelry** → Shows 2 products (pendant, bracelet)
- **Packages** → Shows 1 product (bundle)
- **Digital** → Shows 3 products (video credits)

## Step 5: Test Add to Cart

1. Click any "Add to Cart" button
2. **Expected:**
   - Cart drawer slides in from right
   - Product appears in cart
   - Cart badge shows "1" in navigation
   - Subtotal, tax, and total calculate correctly

## Step 6: Test Cart Drawer

With cart open:
1. **Test quantity adjustment:**
   - Click + button → Quantity increases
   - Click - button → Quantity decreases
   - Totals update automatically

2. **Test remove item:**
   - Click trash icon
   - Item removes from cart
   - Totals recalculate

3. **Test cart persistence:**
   - Add items to cart
   - Refresh page (F5)
   - Cart should still contain items

4. **Test empty cart:**
   - Remove all items
   - Should show "Your cart is empty" message

## Step 7: Test Multiple Products

1. Close cart drawer (X button)
2. Add different products
3. Each should appear in cart with correct:
   - Product name
   - Image
   - Price
   - Quantity

## Expected Calculations

Example cart with:
- Eternal Memories Box ($149.99) × 1
- Legacy Photo Frame ($89.99) × 2

**Should display:**
- Subtotal: $329.97
- Tax (8%): $26.40
- Shipping: $0.00 (or "Calculated at checkout")
- **Total: $356.37**

## Common Issues & Solutions

### Issue: Products don't load
**Solution:** 
- Check browser console (F12) for errors
- Verify migration ran successfully
- Check Network tab for failed /api/products request

### Issue: Images don't display
**Solution:**
- Normal! Unsplash URLs may have CORS issues in dev
- Images will work in production

### Issue: Cart doesn't persist
**Solution:**
- Check localStorage in DevTools
- Look for key: 'glowing-legacy-cart'
- Verify localStorage isn't disabled

### Issue: TypeScript errors
**Solution:**
- Already fixed! Should compile clean now

## What to Report

If you see any of these, let me know:
- ❌ API errors in console
- ❌ Cart doesn't open
- ❌ Products don't filter correctly
- ❌ Totals calculate wrong
- ❌ Cart doesn't persist after refresh
- ❌ TypeScript compilation errors

## Success Checklist

- [ ] Database migration successful
- [ ] Dev server running without errors
- [ ] Shop page loads with products
- [ ] Featured products section visible
- [ ] Category filters work
- [ ] Add to cart opens drawer
- [ ] Cart badge shows item count
- [ ] Quantity controls work
- [ ] Remove item works
- [ ] Totals calculate correctly
- [ ] Cart persists after refresh
- [ ] Empty cart shows message

## Next Steps After Testing

Once everything works:
1. Create `/checkout` page
2. Add shipping address form
3. Integrate Stripe payments
4. Create orders table
5. Build order confirmation

---

Ready to test! 🚀