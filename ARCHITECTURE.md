# 🏗️ GLOWING LEGACY - ARCHITECTURE DIAGRAM

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER DEVICES                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │  Mobile  │  │  Tablet  │  │  Desktop │  │ Laptop   │       │
│  │  Safari  │  │  Chrome  │  │  Firefox │  │  Edge    │       │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘       │
└───────┼─────────────┼─────────────┼─────────────┼──────────────┘
        │             │             │             │
        └─────────────┴─────────────┴─────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────────┐
│                     VERCEL EDGE NETWORK                          │
│                    (Global CDN + Hosting)                        │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │         Next.js 14 Application (React/TypeScript)           │ │
│  │                                                              │ │
│  │  ┌───────────┐  ┌───────────┐  ┌───────────┐              │ │
│  │  │  Landing  │  │   Auth    │  │ Dashboard │              │ │
│  │  │   Page    │  │  Pages    │  │   Pages   │              │ │
│  │  └───────────┘  └───────────┘  └───────────┘              │ │
│  │                                                              │ │
│  │  ┌───────────┐  ┌───────────┐  ┌───────────┐              │ │
│  │  │   Shop    │  │   Video   │  │Recipients │              │ │
│  │  │  Pages    │  │  Recorder │  │Management │              │ │
│  │  └───────────┘  └───────────┘  └───────────┘              │ │
│  │                                                              │ │
│  │  ┌────────────────────────────────────────────────────────┐│ │
│  │  │            API Routes (Serverless Functions)            ││ │
│  │  │  • /api/checkout/video                                  ││ │
│  │  │  • /api/checkout/package                                ││ │
│  │  │  • /api/webhooks/stripe                                 ││ │
│  │  │  • /api/chat (AI Assistant)                             ││ │
│  │  └────────────────────────────────────────────────────────┘│ │
│  └────────────────────────────────────────────────────────────┘ │
└───────┬──────────────────┬──────────────────┬───────────────────┘
        │                  │                  │
        ▼                  ▼                  ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│   SUPABASE   │  │    STRIPE    │  │  ANTHROPIC   │
│  (Backend)   │  │  (Payments)  │  │   (Claude)   │
├──────────────┤  ├──────────────┤  ├──────────────┤
│              │  │              │  │              │
│ PostgreSQL   │  │ Checkout     │  │ Chat API     │
│ (Database)   │  │ Sessions     │  │ (Sonnet 4)   │
│              │  │              │  │              │
│ Auth System  │  │ Webhooks     │  │ Streaming    │
│ (Email/OAuth)│  │ (Events)     │  │ Responses    │
│              │  │              │  │              │
│ Storage      │  │ Products     │  │ Context      │
│ (Videos/     │  │ Subscriptions│  │ Management   │
│  Images)     │  │              │  │              │
│              │  │ Payment      │  │              │
│ Realtime     │  │ Intents      │  │              │
│ (Future)     │  │              │  │              │
└──────────────┘  └──────────────┘  └──────────────┘
        │                  │
        ▼                  ▼
┌──────────────┐  ┌──────────────┐
│    RESEND    │  │   TWILIO     │
│   (Email)    │  │    (SMS)     │
├──────────────┤  ├──────────────┤
│              │  │              │
│ Transactional│  │ SMS          │
│ Emails       │  │ Delivery     │
│              │  │              │
│ Templates    │  │ Verification │
│ (HTML)       │  │ Codes        │
│              │  │              │
│ Delivery     │  │ Notifications│
│ Tracking     │  │              │
└──────────────┘  └──────────────┘
```

---

## Data Flow Diagrams

### 1. User Signup Flow

```
┌─────────┐      ┌──────────┐      ┌──────────┐      ┌──────────┐
│  User   │─────▶│ Next.js  │─────▶│ Supabase │─────▶│  Resend  │
│ Browser │      │  (Form)  │      │   Auth   │      │  (Email) │
└─────────┘      └──────────┘      └──────────┘      └──────────┘
     ▲                                   │
     │                                   ▼
     │                            ┌──────────┐
     └────────────────────────────│  Users   │
                                  │  Table   │
                                  └──────────┘
```

**Steps:**
1. User fills signup form
2. Next.js validates data
3. Supabase Auth creates account
4. User profile inserted into `users` table
5. Verification email sent via Resend
6. User redirects to onboarding

---

### 2. Video Recording & Upload Flow

```
┌─────────┐      ┌──────────┐      ┌──────────┐      ┌──────────┐
│  User   │─────▶│ Webcam   │─────▶│ Next.js  │─────▶│ Supabase │
│ Camera  │      │   API    │      │ (Upload) │      │ Storage  │
└─────────┘      └──────────┘      └──────────┘      └──────────┘
                                         │
                                         ▼
                                  ┌──────────┐
                                  │  Videos  │
                                  │  Table   │
                                  └──────────┘
```

**Steps:**
1. User grants camera permission
2. Browser captures video via MediaRecorder
3. Video uploaded to Supabase Storage
4. Thumbnail generated
5. Metadata saved to `videos` table
6. User links video to recipient and delivery date

---

### 3. Video Purchase Flow

```
┌─────────┐      ┌──────────┐      ┌──────────┐      ┌──────────┐
│  User   │─────▶│ Next.js  │─────▶│  Stripe  │─────▶│ Webhook  │
│ Browser │      │   API    │      │ Checkout │      │ Handler  │
└─────────┘      └──────────┘      └──────────┘      └──────────┘
     ▲                                                      │
     │                                                      ▼
     │                                               ┌──────────┐
     └───────────────────────────────────────────────│  Users   │
                 (Redirect with success)             │  Table   │
                                                     │ (Credits)│
                                                     └──────────┘
```

**Steps:**
1. User clicks "Purchase 5-Pack"
2. Next.js creates Stripe Checkout session
3. User redirected to Stripe
4. User completes payment
5. Stripe sends webhook to Next.js
6. Credits added to user account
7. User redirected back to dashboard

---

### 4. Package Shopping Flow

```
┌─────────┐      ┌──────────┐      ┌──────────┐      ┌──────────┐
│  User   │─────▶│  Browse  │─────▶│   Cart   │─────▶│ Checkout │
│ Browser │      │Products  │      │ (Zustand)│      │ (Stripe) │
└─────────┘      └──────────┘      └──────────┘      └──────────┘
                                                            │
                                                            ▼
                                                     ┌──────────┐
                                                     │  Orders  │
                                                     │  Table   │
                                                     └──────────┘
                                                            │
                                                            ▼
                                                     ┌──────────┐
                                                     │Order Items│
                                                     │  Table   │
                                                     └──────────┘
```

**Steps:**
1. User browses product catalog
2. Adds items to cart (stored in Zustand + localStorage)
3. Proceeds to checkout
4. Enters payment info (Stripe)
5. Order created in database
6. Items linked to recipients and delivery dates
7. Confirmation email sent

---

### 5. Delivery System Flow (Future - Week 4+)

```
┌──────────┐      ┌──────────┐      ┌──────────┐      ┌──────────┐
│  Cron    │─────▶│ Supabase │─────▶│  Resend  │─────▶│Recipient │
│   Job    │      │ Function │      │  (Email) │      │  Email   │
│(Daily)   │      │(Delivery)│      └──────────┘      └──────────┘
└──────────┘      └──────────┘             │
                       │                   ▼
                       │            ┌──────────┐
                       │            │  Twilio  │
                       │            │  (SMS)   │
                       │            └──────────┘
                       ▼
                ┌──────────┐
                │Deliveries│
                │  Table   │
                │(Updated) │
                └──────────┘
```

**Steps:**
1. Cron job runs daily at 12:01 AM
2. Queries `deliveries` table for today's date
3. For each delivery:
   - Send email with video link
   - Send SMS notification
   - Update status to "delivered"
   - Notify user of successful delivery

---

## Database Schema Overview

```
┌──────────┐     ┌──────────────┐     ┌──────────┐
│  users   │────▶│  recipients  │────▶│ videos   │
└──────────┘     └──────────────┘     └──────────┘
     │                   │                   │
     │                   │                   ▼
     │                   │            ┌──────────┐
     │                   │            │deliveries│
     │                   │            └──────────┘
     │                   │
     │                   ▼
     │            ┌──────────────┐
     ├───────────▶│ order_items  │
     │            └──────────────┘
     │                   │
     ▼                   ▼
┌──────────┐     ┌──────────┐
│  orders  │     │ products │
└──────────┘     └──────────┘
     │
     ▼
┌─────────────────┐
│video_purchases  │
└─────────────────┘
     │
     ▼
┌─────────────────────┐
│storage_subscriptions│
└─────────────────────┘
```

---

## Component Hierarchy

```
App (Root Layout)
│
├── Landing Page
│   ├── Hero Section
│   ├── How It Works
│   ├── Pricing Preview
│   ├── Testimonials
│   └── Footer
│
├── Auth Pages
│   ├── Signup
│   │   ├── Signup Form
│   │   └── OAuth Buttons
│   └── Login
│       ├── Login Form
│       └── OAuth Buttons
│
└── Dashboard (TODO: Week 2)
    ├── Top Nav
    │   ├── Logo
    │   ├── Search
    │   ├── Notifications
    │   └── Profile Dropdown
    │
    ├── Sidebar
    │   ├── Dashboard
    │   ├── Videos
    │   ├── Packages
    │   ├── Recipients
    │   ├── Shop
    │   └── Settings
    │
    └── Content Area
        ├── Dashboard Home
        │   ├── Quick Actions
        │   ├── Upcoming Deliveries
        │   ├── Video Credits
        │   └── Recent Activity
        │
        ├── Video Pages
        │   ├── Record Video
        │   │   ├── Camera Preview
        │   │   ├── Recording Controls
        │   │   └── Save Modal
        │   └── Video Library
        │       ├── Video Grid
        │       ├── Filters
        │       └── Video Player Modal
        │
        ├── Recipient Pages
        │   ├── Recipients List
        │   ├── Add Recipient Modal
        │   └── Recipient Detail
        │
        ├── Shop Pages
        │   ├── Product Grid
        │   ├── Product Detail
        │   └── Shopping Cart
        │
        └── Settings Pages
            ├── Profile
            ├── Security
            ├── Notifications
            ├── Privacy
            ├── Billing
            └── Executor Access
```

---

## Tech Stack Layers

```
┌─────────────────────────────────────────────────────┐
│                PRESENTATION LAYER                    │
│  Next.js 14 │ React 18 │ TypeScript │ Tailwind CSS │
└─────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────┐
│                 APPLICATION LAYER                    │
│  React Components │ Hooks │ Context │ Zustand       │
└─────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────┐
│                   API LAYER                          │
│  Next.js API Routes │ Server Actions │ Middleware   │
└─────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────┐
│                 BUSINESS LOGIC LAYER                 │
│  Validation │ Authentication │ Payment Processing   │
└─────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────┐
│                   DATA LAYER                         │
│  Supabase Client │ Database Queries │ File Storage  │
└─────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────┐
│               EXTERNAL SERVICES LAYER                │
│  Stripe │ Anthropic │ Resend │ Twilio │ Analytics   │
└─────────────────────────────────────────────────────┘
```

---

## Deployment Pipeline

```
┌─────────┐      ┌──────────┐      ┌──────────┐      ┌──────────┐
│  Local  │─────▶│  GitHub  │─────▶│  Vercel  │─────▶│   Live   │
│  Dev    │ push │  Repo    │ hook │  Build   │deploy│   Site   │
└─────────┘      └──────────┘      └──────────┘      └──────────┘
                                         │
                                         ▼
                                  ┌──────────┐
                                  │  Tests   │
                                  │  Lint    │
                                  │  Build   │
                                  └──────────┘
```

**Steps:**
1. Developer writes code locally
2. Commits and pushes to GitHub
3. GitHub webhook triggers Vercel build
4. Vercel runs tests and lints code
5. Vercel builds Next.js app
6. Deploy to production (automatic)
7. Users access via glowinglegacy.com

---

## Security Layers

```
┌─────────────────────────────────────────────────────┐
│           EDGE PROTECTION (Vercel)                   │
│  DDoS Protection │ Rate Limiting │ WAF              │
└─────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────┐
│         APPLICATION SECURITY (Next.js)               │
│  CSRF Tokens │ Input Validation │ XSS Protection   │
└─────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────┐
│      AUTHENTICATION (Supabase Auth)                  │
│  JWT Tokens │ Session Management │ OAuth            │
└─────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────┐
│     AUTHORIZATION (Row Level Security)               │
│  RLS Policies │ User Isolation │ Role-Based Access  │
└─────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────┐
│         DATA ENCRYPTION (Supabase)                   │
│  At Rest (AES-256) │ In Transit (TLS 1.3)           │
└─────────────────────────────────────────────────────┘
```

---

This architecture ensures:
- **Scalability**: Serverless functions scale automatically
- **Security**: Multiple layers of protection
- **Performance**: Global CDN, optimized delivery
- **Reliability**: Managed services with 99.9% uptime
- **Developer Experience**: Clean separation of concerns

---

*Last Updated: October 30, 2025*
