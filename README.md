# Glowing Legacy - Development Guide

## Phase 1: Foundation & Core Setup (Week 1-3)

This is the **first 3 weeks** of work to get the core platform running.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- A Supabase account (free tier is fine)
- A Stripe account (test mode)

### Setup Instructions

#### 1. Install Dependencies
```bash
cd glowing-legacy
npm install
```

#### 2. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Once your project is created, go to Project Settings > API
3. Copy your project URL and anon key
4. Go to SQL Editor and run the schema from `supabase/schema.sql`
5. Go to Storage and create these buckets:
   - `videos` (private)
   - `thumbnails` (public)
   - `profile-photos` (private)

#### 3. Set Up Stripe

1. Go to [stripe.com](https://stripe.com) and create an account
2. Go to Developers > API Keys
3. Copy your publishable and secret keys (use test mode keys)

#### 4. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Fill in your credentials:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Anthropic (Claude AI) - Optional for now
ANTHROPIC_API_KEY=your_key_here

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

#### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
glowing-legacy/
├── app/
│   ├── page.tsx                 # Landing page
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Global styles
│   ├── login/
│   │   └── page.tsx             # Login page
│   ├── signup/
│   │   └── page.tsx             # Signup page
│   └── dashboard/               # Dashboard pages (Week 2-3)
├── components/
│   └── ui/
│       ├── button.tsx           # Button component
│       └── card.tsx             # Card component
├── lib/
│   ├── supabase.ts              # Supabase client
│   └── utils.ts                 # Utility functions
├── supabase/
│   └── schema.sql               # Database schema
└── public/                      # Static assets
```

---

## 🗓️ Week-by-Week Breakdown

### **Week 1: Foundation (Days 1-7)** ✅ COMPLETED

You now have:
- ✅ Project initialized with Next.js 14, TypeScript, Tailwind
- ✅ Design system with Glowing Legacy brand colors (gold/black)
- ✅ Database schema with all tables
- ✅ Authentication (signup/login with Supabase)
- ✅ Landing page with hero, features, pricing preview
- ✅ Reusable UI components (Button, Card)

**What to test:**
1. Run `npm run dev`
2. Visit the landing page - make sure it looks good
3. Try signing up with a test email
4. Try logging in
5. Check Supabase dashboard to see if user was created

---

### **Week 2: Dashboard & Video Recording (Days 8-14)**

**Day 8-9: Dashboard Layout**
- [ ] Create `/app/dashboard/page.tsx` - Main dashboard overview
- [ ] Create `/app/dashboard/layout.tsx` - Dashboard layout with nav
- [ ] Build top navigation bar with user dropdown
- [ ] Build sidebar navigation
- [ ] Create "Quick Actions" cards

**Day 10-11: Video Recording**
- [ ] Create `/app/dashboard/record/page.tsx`
- [ ] Implement webcam access using `react-webcam`
- [ ] Build recording controls (record/stop/preview)
- [ ] Add timer display during recording
- [ ] Add audio visualizer
- [ ] Implement video upload to Supabase Storage

**Day 12: Video Library**
- [ ] Create `/app/dashboard/videos/page.tsx`
- [ ] Display grid of user's videos
- [ ] Add filtering and sorting
- [ ] Create video detail modal
- [ ] Implement video player

**Day 13-14: Recipients Management**
- [ ] Create `/app/dashboard/recipients/page.tsx`
- [ ] Build "Add Recipient" form
- [ ] Display list of recipients
- [ ] Create recipient detail page
- [ ] Link videos to recipients

**Key files to create:**
```
app/dashboard/
├── layout.tsx                    # Dashboard wrapper with nav
├── page.tsx                      # Dashboard home
├── record/
│   └── page.tsx                  # Video recording interface
├── videos/
│   └── page.tsx                  # Video library
└── recipients/
    ├── page.tsx                  # Recipients list
    └── [id]/
        └── page.tsx              # Recipient detail
```

---

### **Week 3: Stripe Integration & Package Shopping (Days 15-21)**

**Day 15-16: Video Purchase Flow**
- [ ] Create `/app/api/checkout/video/route.ts`
- [ ] Implement Stripe Checkout for video packages
- [ ] Handle successful payment (add credits to user)
- [ ] Create purchase confirmation page

**Day 17-18: Product Catalog**
- [ ] Seed products table with sample gift packages
- [ ] Create `/app/shop/page.tsx` - Product listing
- [ ] Create `/app/shop/[slug]/page.tsx` - Product detail
- [ ] Build product filters and search

**Day 19: Shopping Cart**
- [ ] Create cart state management (Zustand)
- [ ] Build cart UI component
- [ ] Create `/app/dashboard/cart/page.tsx`
- [ ] Implement add/remove from cart

**Day 20: Package Checkout**
- [ ] Create `/app/api/checkout/package/route.ts`
- [ ] Handle package purchases
- [ ] Link packages to recipients
- [ ] Create order confirmation page

**Day 21: Testing & Polish**
- [ ] Test full user flow: signup → purchase → record → schedule
- [ ] Fix any bugs found
- [ ] Improve loading states and error handling
- [ ] Add toast notifications

---

## 🎨 Design System Reference

### Colors
```css
/* Primary */
--gold: #D4AF37
--gold-dark: #B8960F
--gold-light: #F4E4C1

/* Backgrounds */
--background: #000000
--background-card: #1A1A1A

/* Text */
--text-primary: #FFFFFF
--text-secondary: #A0A0A0

/* Accent */
--accent-warm: #8B4513
```

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)
- **Base Size**: 16px
- **Senior-friendly**: 20px minimum for important UI

### Component Variants
```tsx
// Buttons
<Button variant="default" size="lg">Primary Action</Button>
<Button variant="outline">Secondary Action</Button>
<Button variant="ghost">Tertiary Action</Button>
<Button size="senior">Senior-Friendly</Button>

// Cards
<Card className="card-gold"> // Has hover effect with gold glow
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

---

## 🔐 Authentication Flow

1. User visits `/signup`
2. Fills out form (name, email, password)
3. Supabase Auth creates user
4. Profile created in `users` table
5. Redirect to `/onboarding` (to be built in Week 2)
6. After onboarding, redirect to `/dashboard`

**Protected Routes**: Use Supabase's `getUser()` to check auth status.

---

## 🗄️ Database Tables

All tables are created via the `supabase/schema.sql` file:

- `users` - User accounts
- `recipients` - People who receive videos/packages
- `videos` - Video messages
- `products` - Gift packages for sale
- `orders` - Package orders
- `order_items` - Individual items in orders
- `video_purchases` - Video credit purchases
- `storage_subscriptions` - Extended storage subscriptions
- `deliveries` - Scheduled deliveries (videos + packages)

**Row Level Security (RLS)** is enabled on all tables to ensure users can only access their own data.

---

## 🧪 Testing Checklist

### Week 1 Tests
- [ ] Landing page loads and looks correct
- [ ] Can sign up with new account
- [ ] Receives email verification (check Supabase Auth)
- [ ] Can log in with credentials
- [ ] Can log out
- [ ] User data appears in Supabase `users` table

### Week 2 Tests (To Do)
- [ ] Dashboard loads after login
- [ ] Can access camera for recording
- [ ] Can record a video
- [ ] Video uploads to Supabase Storage
- [ ] Video appears in library
- [ ] Can add a recipient
- [ ] Can link video to recipient

### Week 3 Tests (To Do)
- [ ] Can purchase video credits
- [ ] Stripe payment succeeds (test mode)
- [ ] Credits added to user account
- [ ] Can browse shop
- [ ] Can add items to cart
- [ ] Can checkout and create order
- [ ] Order appears in dashboard

---

## 🐛 Common Issues & Solutions

### Issue: Supabase connection error
**Solution**: Check your `.env.local` file has correct `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Issue: "Module not found" errors
**Solution**: Run `npm install` again

### Issue: Tailwind styles not applying
**Solution**: 
1. Make sure `tailwind.config.ts` exists
2. Restart dev server (`npm run dev`)
3. Check that `globals.css` has the @tailwind directives

### Issue: Can't sign up - database error
**Solution**: Make sure you ran the `schema.sql` in Supabase SQL Editor

---

## 📚 Resources

- [Next.js 14 Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Stripe Docs](https://stripe.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)

---

## 🎯 Success Criteria for Phase 1

By the end of Week 3, you should have:
1. ✅ A working landing page
2. ✅ User authentication (signup/login)
3. ✅ Basic dashboard
4. ✅ Video recording and upload
5. ✅ Recipient management
6. ✅ Video purchase flow with Stripe
7. ✅ Product catalog and shopping
8. ✅ Package checkout

---

## 🚦 Next Steps (Phase 2)

After completing Phase 1, you'll move to:
- AI Chat Assistant integration
- Delivery scheduling system
- Email/SMS notifications
- Calendar view
- Account settings
- Mobile responsive improvements

---

## 📧 Need Help?

If you get stuck on any part of this, refer to:
1. This README
2. The detailed spec document (the long message before this)
3. Official docs for each technology

**Current Status**: Week 1 Complete ✅

**Next Task**: Start Week 2 - Dashboard & Video Recording

Good luck! 🚀
