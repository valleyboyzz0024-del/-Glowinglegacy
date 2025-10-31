# 🚀 SENIOR DEV HANDOFF - GLOWING LEGACY

## Quick Start (5 minutes to running app)

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env.local
# Fill in Supabase and Stripe keys

# 3. Run the database schema
# Go to Supabase SQL Editor and paste contents of supabase/schema.sql

# 4. Start dev server
npm run dev
```

Visit http://localhost:3000 - You should see the landing page.

---

## What's Already Built (Week 1 Complete)

### ✅ Project Foundation
- Next.js 14 with App Router
- TypeScript fully configured
- Tailwind CSS with custom gold/black theme
- Framer Motion for animations
- All dependencies installed

### ✅ Design System
- **Colors**: Gold (#D4AF37) primary, black background
- **Typography**: Playfair Display (headings), Inter (body)
- **Components**: Button, Card with gold glow effects
- **Utilities**: className merger, date/currency formatters

### ✅ Database Schema
- All 9 tables created with Row Level Security
- Indexes for performance
- Triggers for auto-generated order numbers
- Full schema in `supabase/schema.sql`

### ✅ Authentication
- Signup page with validation
- Login page with OAuth (Google/Apple ready)
- Password strength requirements
- Supabase Auth integration

### ✅ Landing Page
- Hero section with CTAs
- "How It Works" (4 steps)
- Pricing preview (3 tiers)
- Footer with newsletter signup
- Fully responsive

---

## File Structure Overview

```
glowing-legacy/
├── app/
│   ├── page.tsx              ← Landing page (DONE)
│   ├── layout.tsx            ← Root layout with fonts (DONE)
│   ├── globals.css           ← Global styles with gold theme (DONE)
│   ├── login/page.tsx        ← Login page (DONE)
│   ├── signup/page.tsx       ← Signup page (DONE)
│   └── dashboard/            ← START HERE (Week 2)
│       ├── layout.tsx        ← TODO: Dashboard wrapper with nav
│       ├── page.tsx          ← TODO: Dashboard home
│       ├── record/page.tsx   ← TODO: Video recorder
│       ├── videos/page.tsx   ← TODO: Video library
│       └── recipients/page.tsx ← TODO: Recipient management
│
├── components/ui/
│   ├── button.tsx            ← Gold-styled button component (DONE)
│   └── card.tsx              ← Card with hover effects (DONE)
│
├── lib/
│   ├── supabase.ts           ← Supabase client (DONE)
│   └── utils.ts              ← Helper functions (DONE)
│
└── supabase/
    └── schema.sql            ← Full database schema (DONE)
```

---

## Next 3 Weeks - Task Breakdown

### **WEEK 2: Dashboard & Video Recording**

#### Priority 1: Dashboard Layout (Days 8-9)
Create the authenticated app shell that wraps all dashboard pages.

**Files to create:**
```
app/dashboard/layout.tsx
app/dashboard/page.tsx
components/dashboard/TopNav.tsx
components/dashboard/Sidebar.tsx
```

**Key features:**
- Top nav bar with logo, search, notifications, profile dropdown
- Sidebar with: Dashboard, Videos, Packages, Recipients, Shop, Settings
- User info display (name, credits, tier)
- Logout functionality
- Responsive mobile menu

**Design notes:**
- Sticky top nav (black background, gold accents)
- Sidebar collapsible on mobile
- Profile dropdown shows: Settings, Billing, Help, Logout

---

#### Priority 2: Video Recording (Days 10-11)
Build the core video recording interface.

**Files to create:**
```
app/dashboard/record/page.tsx
components/video/CameraPreview.tsx
components/video/RecordingControls.tsx
lib/video-upload.ts
```

**Key features:**
- Request camera/microphone permissions
- Live preview window (large, centered)
- Record button (gold, 96px diameter)
- Timer display (00:00:00 format)
- Audio visualizer bars
- Stop recording → preview → save flow
- Upload to Supabase Storage
- Generate thumbnail from first frame

**Technical notes:**
- Use `react-webcam` for camera access
- Use MediaRecorder API for recording
- Max video length: 10 minutes (configurable)
- Supported formats: webm, mp4
- Chunk upload for large files (>50MB)

**After recording modal:**
1. Title video (required)
2. Add description (optional)
3. Select recipient (dropdown)
4. Set delivery date (date picker)
5. Save to database

---

#### Priority 3: Video Library (Day 12)
Display all user's videos in a grid.

**Files to create:**
```
app/dashboard/videos/page.tsx
components/video/VideoCard.tsx
components/video/VideoPlayer.tsx
components/video/FilterBar.tsx
```

**Key features:**
- Grid layout (4 columns on desktop, 2 on tablet, 1 on mobile)
- Video thumbnail with duration overlay
- Title, recipient name, delivery date
- Status badge (Scheduled, Delivered, Draft)
- Filters: By recipient, By status, By date
- Sort: Most recent, Oldest, Delivery date
- Search by title
- Click card → open modal with video player

**Video card hover state:**
- Show overlay with: Preview, Edit, Share, Delete buttons

---

#### Priority 4: Recipient Management (Days 13-14)
CRUD operations for recipients.

**Files to create:**
```
app/dashboard/recipients/page.tsx
app/dashboard/recipients/[id]/page.tsx
components/recipients/RecipientCard.tsx
components/recipients/AddRecipientModal.tsx
```

**Key features:**
- List of all recipients (card layout)
- Each card shows: Photo, Name, Relationship, Contact info
- Count of scheduled items (videos + packages)
- Next delivery date
- Add new recipient (modal form)
- Edit recipient (modal form)
- Delete recipient (with confirmation)
- Recipient detail page showing all their scheduled items

**Form fields:**
- Profile photo (optional, upload to Supabase)
- Full name (required)
- Relationship (dropdown: Spouse, Child, Parent, Sibling, Friend, Other)
- Email (optional but recommended)
- Phone (optional)
- Mailing address (full address form)
- Birth date (for birthday reminders)
- Private notes (text area)

---

### **WEEK 3: Payments & Shopping**

#### Priority 1: Video Purchase Flow (Days 15-16)
Stripe integration for buying video credits.

**Files to create:**
```
app/api/checkout/video/route.ts
app/api/webhooks/stripe/route.ts
app/dashboard/purchase/page.tsx
components/payments/PricingCards.tsx
```

**Key features:**
- Display 3 pricing tiers: Single ($19.99), 5-Pack ($79.99), Unlimited ($249.99/yr)
- Click "Purchase" → Stripe Checkout
- Handle successful payment → add credits to user
- Handle failed payment → show error
- Update `video_purchases` table
- Webhook for subscription renewals

**Stripe products to create (in Stripe Dashboard):**
- `video_single` - $19.99 one-time
- `video_5pack` - $79.99 one-time
- `video_unlimited` - $249.99/year recurring

---

#### Priority 2: Product Catalog (Days 17-18)
Display gift packages for sale.

**Files to create:**
```
app/shop/page.tsx
app/shop/[slug]/page.tsx
components/shop/ProductCard.tsx
components/shop/ProductFilters.tsx
components/shop/ProductGallery.tsx
```

**Key features:**
- Grid of products (3-4 columns)
- Each card: Image, Name, Starting price, Rating
- Filters: Category, Price range, Occasion, Recipient type
- Search bar
- Sort: Popular, Price (low-high), Newest
- Product detail page with:
  - Image gallery (multiple angles)
  - Description
  - Personalization options (text engraving, etc.)
  - Recipient selector
  - Delivery date picker
  - Add to cart button

**Sample products to seed:**
- Memory Box - Walnut ($89.99)
- Photo Album - Leather ($124.99)
- Jewelry Box - Oak ($149.99)
- Letter Set - Vintage ($34.99)
- Custom Care Package ($199.99)

---

#### Priority 3: Shopping Cart (Day 19)
State management for cart items.

**Files to create:**
```
app/dashboard/cart/page.tsx
lib/stores/cart-store.ts (Zustand)
components/cart/CartItem.tsx
components/cart/CartSummary.tsx
```

**Key features:**
- Add/remove items from cart
- Edit item details (personalization, recipient, date)
- Cart persists in localStorage
- Cart badge in top nav (shows item count)
- Cart page with:
  - List of items with thumbnails
  - Edit/remove buttons
  - Subtotal calculation
  - Shipping info
  - Promo code input
  - Proceed to checkout button

**Zustand store structure:**
```typescript
interface CartItem {
  productId: string;
  quantity: number;
  recipientId?: string;
  personalization?: string;
  deliveryDate?: string;
  price: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateItem: (productId: string, updates: Partial<CartItem>) => void;
  clearCart: () => void;
  getTotal: () => number;
}
```

---

#### Priority 4: Package Checkout (Day 20)
Complete the purchase flow for packages.

**Files to create:**
```
app/api/checkout/package/route.ts
app/dashboard/checkout/page.tsx
app/dashboard/orders/page.tsx
components/checkout/CheckoutForm.tsx
```

**Key features:**
- Review order page (all items, recipients, dates)
- Stripe Payment Element
- Shipping address confirmation
- Place order button
- Create order in database
- Link items to recipients and delivery dates
- Confirmation page with order number
- Email confirmation (use Resend API)

**Order flow:**
1. Cart → Checkout
2. Enter payment info (Stripe Elements)
3. Confirm order → Create Stripe PaymentIntent
4. Success → Insert into `orders` and `order_items` tables
5. Redirect to confirmation page
6. Send email with order details

---

#### Day 21: Testing & Polish
- Test entire flow: Signup → Purchase credits → Record video → Add recipient → Schedule delivery
- Test package flow: Browse → Add to cart → Checkout → View order
- Fix bugs
- Add loading states
- Add error handling
- Add toast notifications (use `sonner`)
- Improve mobile responsiveness
- Optimize images

---

## Technical Decisions & Patterns

### State Management
- **Zustand** for client-side state (cart, UI state)
- **Supabase Realtime** for live updates (optional, Phase 2)
- **React Context** for auth state (wrap dashboard in AuthProvider)

### Data Fetching
- Server Components for initial data load
- Client Components for interactive features
- React Query for caching (optional, can add later)

### File Uploads
```typescript
// Example: Upload video to Supabase Storage
async function uploadVideo(file: File, userId: string) {
  const fileName = `${userId}/${Date.now()}.webm`;
  const { data, error } = await supabase.storage
    .from('videos')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    });
  
  if (error) throw error;
  
  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('videos')
    .getPublicUrl(fileName);
  
  return publicUrl;
}
```

### Authentication Guard
```typescript
// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const { data: { session } } = await supabase.auth.getSession();

  // Protect dashboard routes
  if (req.nextUrl.pathname.startsWith('/dashboard') && !session) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return res;
}
```

---

## Known Gotchas & Solutions

### Issue: Video Upload Fails for Large Files
**Solution**: Implement chunked upload:
```typescript
// Upload in 5MB chunks
const chunkSize = 5 * 1024 * 1024;
// Use tus-js-client for resumable uploads
```

### Issue: Stripe Webhook Not Receiving Events
**Solution**: 
1. In development, use Stripe CLI: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
2. Copy webhook signing secret to `.env.local`
3. Verify signature in webhook handler

### Issue: Camera Permission Denied
**Solution**:
1. Must be on HTTPS (or localhost)
2. Show clear permission prompt with instructions
3. Handle denied state gracefully (show fallback upload option)

---

## Performance Optimizations

### Images
- Use Next.js `<Image>` component for all images
- Set `priority` for above-the-fold images
- Use `loading="lazy"` for below-the-fold

### Videos
- Generate thumbnail on upload (use ffmpeg or canvas)
- Store multiple quality versions (720p, 1080p, 4K)
- Use CDN for video delivery (Supabase Storage has CDN)

### Database
- Indexes already added for common queries
- Use `.select('id, title, ...')` to only fetch needed fields
- Enable Realtime only where necessary

---

## Testing Strategy

### Unit Tests (Optional but recommended)
```bash
npm install -D vitest @testing-library/react
```
Test utility functions, data formatting, validation

### E2E Tests (Phase 2)
```bash
npm install -D playwright
```
Test critical user flows

### Manual Testing Checklist (Week 3)
- [ ] User can sign up
- [ ] User can log in
- [ ] User can purchase video credits
- [ ] Credits appear in dashboard
- [ ] User can record a video
- [ ] Video appears in library
- [ ] User can add recipient
- [ ] User can link video to recipient
- [ ] User can schedule delivery date
- [ ] User can browse shop
- [ ] User can add product to cart
- [ ] User can checkout
- [ ] Order appears in orders page
- [ ] Order confirmation email sent

---

## Deployment Checklist (After Week 3)

### Environment Setup
- [ ] Deploy to Vercel (connect GitHub repo)
- [ ] Add production environment variables
- [ ] Set up custom domain
- [ ] Enable Vercel Analytics

### Supabase Production
- [ ] Create production Supabase project
- [ ] Run schema.sql in production
- [ ] Set up storage buckets
- [ ] Enable RLS policies
- [ ] Configure email templates

### Stripe Production
- [ ] Switch to live API keys
- [ ] Create production products
- [ ] Set up production webhook endpoint
- [ ] Test with real payment (refund after)

---

## Support Resources

- **Next.js**: https://nextjs.org/docs
- **Supabase**: https://supabase.com/docs
- **Stripe**: https://stripe.com/docs/payments/checkout
- **Tailwind**: https://tailwindcss.com/docs
- **React Webcam**: https://github.com/mozmorris/react-webcam

---

## Success Metrics

By end of Week 3, you should be able to:
1. ✅ Complete full user journey from signup to first video
2. ✅ Purchase video credits successfully
3. ✅ Record and upload a video
4. ✅ Link video to recipient with delivery date
5. ✅ Browse and purchase gift packages
6. ✅ View all scheduled deliveries

**This is 60% of the MVP. Remaining 40% is in Phase 2 (Weeks 4-8).**

---

## Questions? Issues?

If you hit a blocker:
1. Check the README.md for common issues
2. Review the full spec document
3. Check official docs for the technology
4. Console.log and debug step by step

**Good luck! The foundation is solid - now build something amazing! 🚀**
