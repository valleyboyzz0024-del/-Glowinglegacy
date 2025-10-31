# 🎨 GLOWING LEGACY - VISUAL STYLE GUIDE

## Color Palette

### Primary Colors
```
Gold (Primary)
#D4AF37
rgb(212, 175, 55)
Use for: CTAs, headers, highlights, icons

Gold Dark
#B8960F
rgb(184, 150, 15)
Use for: Hover states, active states

Gold Light
#F4E4C1
rgb(244, 228, 193)
Use for: Subtle backgrounds, borders
```

### Background Colors
```
Black (Main Background)
#000000
rgb(0, 0, 0)
Use for: Page backgrounds, dark sections

Card Background
#1A1A1A
rgb(26, 26, 26)
Use for: Cards, modals, elevated surfaces
```

### Text Colors
```
White (Primary Text)
#FFFFFF
rgb(255, 255, 255)
Use for: Main content, headings, labels

Gray (Secondary Text)
#A0A0A0
rgb(160, 160, 160)
Use for: Descriptions, metadata, placeholders
```

### Accent Colors
```
Warm Accent
#8B4513
rgb(139, 69, 19)
Use for: Copper tones, secondary highlights
```

---

## Typography

### Font Families
**Headings**: Playfair Display (Serif)
- Elegant, classic, emotional
- Use for: H1-H6, logo text, feature titles

**Body**: Inter (Sans-serif)
- Clean, modern, readable
- Use for: Paragraphs, buttons, UI text, forms

### Font Sizes
```css
/* Headings */
h1: 3rem (48px)      /* Hero titles */
h2: 2.5rem (40px)    /* Section headers */
h3: 2rem (32px)      /* Card titles */
h4: 1.5rem (24px)    /* Subsection headers */
h5: 1.25rem (20px)   /* Small headers */
h6: 1rem (16px)      /* Labels */

/* Body */
Base: 1rem (16px)    /* Standard text */
Large: 1.25rem (20px) /* Important text */
Small: 0.875rem (14px) /* Captions, metadata */

/* Senior-Friendly */
Senior: 1.25rem (20px) minimum for all UI elements
```

### Font Weights
```css
Light: 300          /* Decorative only */
Regular: 400        /* Body text */
Medium: 500         /* Emphasized text */
Semibold: 600       /* Buttons, labels */
Bold: 700           /* Strong emphasis */
```

---

## Spacing System

### Base Unit: 4px
```
2  = 0.5rem (8px)
3  = 0.75rem (12px)
4  = 1rem (16px)
6  = 1.5rem (24px)
8  = 2rem (32px)
12 = 3rem (48px)
16 = 4rem (64px)
20 = 5rem (80px)
24 = 6rem (96px)
```

### Common Spacing Patterns
```css
/* Card padding */
padding: 1.5rem (24px)

/* Section spacing */
margin-bottom: 3rem (48px)

/* Element gaps */
gap: 1rem (16px)

/* Container max-width */
max-width: 1280px
```

---

## Effects & Shadows

### Gold Glow
```css
/* Normal glow */
box-shadow: 0 0 20px rgba(212, 175, 55, 0.3);

/* Hover glow */
box-shadow: 0 0 40px rgba(212, 175, 55, 0.6);

/* Strong glow */
box-shadow: 0 0 60px rgba(212, 175, 55, 0.8);
```

### Card Shadows
```css
/* Resting state */
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);

/* Hover state */
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
transform: translateY(-2px);
```

### Border Radius
```css
Small: 0.375rem (6px)   /* Badges */
Medium: 0.5rem (8px)    /* Buttons, inputs */
Large: 0.75rem (12px)   /* Cards */
Full: 9999px            /* Pills, circles */
```

---

## Components

### Buttons

**Primary Button (Gold)**
```css
background: #D4AF37
color: #000000
padding: 12px 24px
border-radius: 8px
font-weight: 600
box-shadow: 0 0 20px rgba(212, 175, 55, 0.3)

Hover:
background: #B8960F
box-shadow: 0 0 40px rgba(212, 175, 55, 0.6)
```

**Secondary Button (Outlined)**
```css
background: transparent
color: #D4AF37
border: 2px solid #D4AF37
padding: 12px 24px
border-radius: 8px
font-weight: 600

Hover:
background: #D4AF37
color: #000000
```

**Ghost Button**
```css
background: transparent
color: #FFFFFF
padding: 12px 24px

Hover:
background: #1A1A1A
```

**Senior-Friendly Button**
```css
min-height: 64px
min-width: 64px
font-size: 20px
padding: 16px 40px
```

---

### Cards

**Standard Card**
```css
background: #1A1A1A
border: 1px solid rgba(212, 175, 55, 0.2)
border-radius: 12px
padding: 24px

Hover:
border-color: rgba(212, 175, 55, 0.5)
box-shadow: 0 0 20px rgba(212, 175, 55, 0.3)
transform: translateY(-2px)
transition: all 0.3s ease
```

---

### Form Inputs

**Text Input**
```css
background: #000000
border: 1px solid rgba(212, 175, 55, 0.2)
border-radius: 8px
padding: 12px 16px
font-size: 16px
color: #FFFFFF

Focus:
border-color: #D4AF37
box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1)
outline: none
```

**Label**
```css
font-size: 14px
font-weight: 500
color: #FFFFFF
margin-bottom: 8px
```

**Helper Text**
```css
font-size: 12px
color: #A0A0A0
margin-top: 4px
```

---

### Badges & Tags

**Status Badge**
```css
padding: 4px 12px
border-radius: 9999px
font-size: 12px
font-weight: 600

Scheduled:
background: rgba(212, 175, 55, 0.1)
color: #D4AF37

Delivered:
background: rgba(34, 197, 94, 0.1)
color: #22C55E

Draft:
background: rgba(160, 160, 160, 0.1)
color: #A0A0A0
```

---

## Icons

### Icon Library
Use **Lucide React** for all icons
- Consistent stroke width (2px)
- Size: 20px (small), 24px (default), 32px (large)
- Color: Inherit from parent or use gold

### Common Icons
```
🎥 Video
📦 Package/Gift
👥 People/Recipients
📅 Calendar
⚙️ Settings
🔔 Notifications
❤️ Heart (for love/legacy)
✨ Sparkle (for logo/magic)
🔒 Lock (for security)
```

---

## Animations

### Transitions
```css
/* Standard transition */
transition: all 0.3s ease;

/* Fast transition */
transition: all 0.2s ease;

/* Slow transition */
transition: all 0.5s ease;
```

### Hover Effects
```css
/* Lift on hover */
transform: translateY(-2px);

/* Scale on hover */
transform: scale(1.05);

/* Glow on hover */
box-shadow: 0 0 40px rgba(212, 175, 55, 0.6);
```

### Loading States
```css
/* Spinner */
animation: spin 1s linear infinite;

/* Pulse */
animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;

/* Shimmer */
animation: shimmer 2s infinite;
```

---

## Accessibility

### Contrast Ratios
- Gold (#D4AF37) on Black (#000000): **9.5:1** ✅ (AAA)
- White (#FFFFFF) on Black (#000000): **21:1** ✅ (AAA)
- Gray (#A0A0A0) on Black (#000000): **5.7:1** ✅ (AA)

### Touch Targets
- Minimum: **44px x 44px**
- Recommended for seniors: **48px x 48px**
- Large buttons: **64px x 64px**

### Focus States
All interactive elements must have visible focus:
```css
*:focus-visible {
  outline: 2px solid #D4AF37;
  outline-offset: 2px;
}
```

---

## Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 640px) { }

/* Tablet */
@media (min-width: 641px) and (max-width: 1024px) { }

/* Desktop */
@media (min-width: 1025px) { }

/* Large Desktop */
@media (min-width: 1280px) { }
```

---

## Layout Patterns

### Container
```css
max-width: 1280px
margin: 0 auto
padding: 0 16px (mobile)
padding: 0 24px (tablet+)
```

### Grid Layouts
```css
/* Product/Card Grid */
display: grid
grid-template-columns: repeat(1, 1fr) /* Mobile */
grid-template-columns: repeat(2, 1fr) /* Tablet */
grid-template-columns: repeat(3, 1fr) /* Desktop */
gap: 24px
```

### Flex Layouts
```css
/* Horizontal Stack */
display: flex
gap: 16px
align-items: center

/* Vertical Stack */
display: flex
flex-direction: column
gap: 24px
```

---

## Best Practices

### DO ✅
- Use gold for primary actions and highlights
- Maintain high contrast (black/white/gold)
- Use generous spacing (especially for seniors)
- Include hover states on all interactive elements
- Provide visual feedback for user actions
- Use smooth transitions (0.3s ease)
- Keep text readable (16px minimum)
- Make touch targets large (44px minimum)

### DON'T ❌
- Use low-contrast colors
- Rely solely on color to convey information
- Use animations that are too fast (<0.1s)
- Make text too small (<14px)
- Forget hover/focus states
- Use harsh red for errors (use softer tones)
- Overuse animations
- Make clickable areas too small

---

## Component Examples

### Hero Section
```
Black background
Gold heading (48px+)
White subheading (20px)
Gold CTA button (prominent)
Trust badges below (subtle)
```

### Card Hover Effect
```
Rest: Border gold/20, No shadow
Hover: Border gold/50, Gold glow shadow, Lift 2px
Active: Border gold/100, Stronger glow
```

### Form Validation
```
Success: Green accent, checkmark icon
Error: Soft red, X icon
Warning: Yellow accent, ! icon
Info: Blue accent, i icon
```

---

**This style guide ensures visual consistency across the entire platform.**
**When in doubt, refer to this document.**

*Last Updated: October 30, 2025*
