# Glowing Legacy Email Templates

Beautiful, branded email templates matching the site's gold/black design.

## 📧 Templates Included:

1. **confirm-signup.html** - Welcome email with email confirmation
2. **magic-link.html** - Passwordless login link
3. **recovery.html** - Password reset email
4. **invite.html** - Team/family invitation email

## 🎨 Design Features:

- Black background with gold accents (#D4AF37)
- Professional glassmorphism effects
- Mobile-responsive design
- Security badges and warnings
- Branded header and footer
- Clear call-to-action buttons

## 📝 How to Install in Supabase:

### Step 1: Go to Supabase Dashboard
1. Visit https://supabase.com/dashboard
2. Select your "Glowing Legacy" project

### Step 2: Navigate to Email Templates
1. Click **Authentication** in left sidebar
2. Click **Email Templates** tab

### Step 3: Update Each Template
For each template (Confirm signup, Magic Link, Reset Password, Invite user):

1. Click **Edit** on the template
2. Copy the entire HTML from the corresponding file
3. Paste it into the **Message (HTML)** field
4. Keep the **Message (Text)** field as is (for fallback)
5. Click **Save**

### Step 4: Test Your Emails
1. Try signing up with a new email
2. Check that the email looks branded and professional
3. Verify all links work correctly

## 🔗 Email Variables:

These Supabase variables are automatically replaced:

- `{{ .ConfirmationURL }}` - The confirmation/action link
- `{{ .Token }}` - The verification token
- `{{ .TokenHash }}` - Hashed token
- `{{ .SiteURL }}` - Your site URL
- `{{ .Email }}` - User's email address

## ✨ Customization:

To customize the templates:

1. Edit the HTML files in this directory
2. Modify colors, text, or layout as needed
3. Re-paste into Supabase dashboard
4. Test thoroughly

## 📱 Mobile Responsive:

All templates use:
- Max-width: 600px
- Flexible padding
- Large touch-friendly buttons
- Readable font sizes

## 🎯 Brand Consistency:

Templates match the site:
- Logo: "GLOWING LEGACY"
- Primary Color: Gold (#D4AF37)
- Background: Black (#000000)
- Font: Inter (fallback to system fonts)
- Button Style: Gold gradient with shadow

---

**Need help?** These templates are production-ready and tested across major email clients (Gmail, Outlook, Apple Mail, etc.)