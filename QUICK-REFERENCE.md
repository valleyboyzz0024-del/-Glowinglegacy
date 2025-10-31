# 📋 GLOWING LEGACY - QUICK REFERENCE CARD

## 🎨 Brand Identity
**Logo**: Golden heart intertwined with circle
**Primary Color**: Gold #D4AF37
**Background**: Black #000000
**Slogan**: "Leave More Than Memories"

---

## 💻 Tech Stack
- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS (custom gold theme)
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Payments**: Stripe
- **AI**: Anthropic Claude API
- **Email**: Resend
- **Hosting**: Vercel

---

## 🚀 Quick Commands
```bash
npm install              # Install dependencies
npm run dev              # Start dev server (localhost:3000)
npm run build            # Build for production
npm run lint             # Run linter
```

---

## 📁 Key Files
| File | Purpose |
|------|---------|
| `supabase/schema.sql` | Complete database schema |
| `lib/supabase.ts` | Supabase client |
| `tailwind.config.ts` | Theme colors & fonts |
| `app/globals.css` | Global styles & utilities |
| `components/ui/` | Reusable components |

---

## 🔑 Environment Variables
```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
ANTHROPIC_API_KEY=
```

---

## 📊 Database Tables
1. **users** - User accounts
2. **recipients** - People who receive videos/gifts
3. **videos** - Video messages
4. **products** - Gift packages
5. **orders** - Package orders
6. **order_items** - Individual items
7. **video_purchases** - Video credits
8. **storage_subscriptions** - Extended storage
9. **deliveries** - Scheduled deliveries

---

## 💰 Pricing Model
**Videos**:
- Single: $19.99
- 5-Pack: $79.99 ($16 each)
- Unlimited: $249.99/year

**Packages**: $49-$299
**Storage Extension**: $4.99/month per video

---

## 📅 3-Week Timeline
**Week 1**: ✅ Setup, Auth, Landing Page
**Week 2**: Dashboard, Video Recording, Recipients
**Week 3**: Stripe, Shopping, Checkout

---

## 🎯 Core User Flow
1. Sign up → 
2. Purchase credits → 
3. Record video → 
4. Add recipient → 
5. Schedule delivery → 
6. (On date) Recipient receives email/SMS

---

## 🛠️ Development Workflow
1. Create feature branch
2. Build component/page
3. Test locally
4. Commit with clear message
5. Create PR for review
6. Merge to main
7. Auto-deploy to Vercel

---

## ✅ Week 1 Deliverables (COMPLETE)
- [x] Project setup
- [x] Design system
- [x] Database schema
- [x] Authentication
- [x] Landing page
- [x] Signup/Login pages

---

## 📋 Week 2 Tasks (NEXT)
- [ ] Dashboard layout
- [ ] Video recording interface
- [ ] Video library
- [ ] Recipient management

---

## 📋 Week 3 Tasks
- [ ] Stripe integration
- [ ] Product catalog
- [ ] Shopping cart
- [ ] Checkout flow

---

## 🎨 Component Patterns
```tsx
// Button
<Button variant="default" size="lg">Click Me</Button>

// Card with gold effect
<Card className="card-gold">
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>

// Senior-friendly button
<Button size="senior">Large Text</Button>
```

---

## 🔐 Auth Pattern
```tsx
const { data: { user } } = await supabase.auth.getUser();
if (!user) redirect('/login');
```

---

## 📤 File Upload Pattern
```tsx
const { data, error } = await supabase.storage
  .from('videos')
  .upload(`${userId}/${filename}`, file);
```

---

## 💳 Stripe Checkout Pattern
```tsx
const response = await fetch('/api/checkout/video', {
  method: 'POST',
  body: JSON.stringify({ priceId: 'price_xxx' })
});
const { url } = await response.json();
window.location.href = url;
```

---

## 🐛 Common Issues

**Issue**: Supabase connection error
**Fix**: Check `.env.local` has correct keys

**Issue**: Styles not working
**Fix**: Restart dev server

**Issue**: Can't access camera
**Fix**: Must use HTTPS or localhost

---

## 📞 Support Contacts
- Project Lead: [Name]
- Senior Dev: [Name]
- Designer: [Name]

---

## 📚 Documentation Links
- [Full Spec](./SPEC.md)
- [README](./README.md)
- [Handoff Doc](./HANDOFF.md)
- [Supabase Docs](https://supabase.com/docs)
- [Stripe Docs](https://stripe.com/docs)

---

**Current Status**: Week 1 Complete ✅
**Next Milestone**: Dashboard & Video Recording (Week 2)

---

*Last Updated: October 30, 2025*
