# ✅ Updated for Supabase's New API Keys (2025)

## What Changed

The FADEMEX admin panel has been updated to support Supabase's new API key format introduced in June 2025.

## Key Changes Summary

### Old Format (Legacy - Still Supported)
```bash
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### New Format (Recommended)
```bash
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxxxx...
SUPABASE_SECRET_KEY=sb_secret_xxxxx...
```

## What You Need to Do

### Option 1: Use New Keys (Recommended)
1. Go to Supabase Dashboard → Settings → API
2. Look for the new "API Keys" section
3. Copy the **Publishable key** (starts with `sb_publishable_`)
4. Update your `.env.local`:
   ```bash
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxxxx...
   ```

### Option 2: Keep Using Legacy Keys (Still Works)
- No action needed! Your existing `NEXT_PUBLIC_SUPABASE_ANON_KEY` will continue to work until late 2026
- The code automatically detects which key format you're using

## Code Changes Made

All Supabase client files now support both key formats with automatic fallback:

### Files Updated
- ✅ `lib/supabase/client.ts` - Client-side Supabase client
- ✅ `lib/supabase/server.ts` - Server-side Supabase clients
- ✅ `lib/supabase/middleware.ts` - Authentication middleware
- ✅ `.env.example` - Environment variable template
- ✅ `ADMIN_SETUP.md` - Setup documentation
- ✅ `SUPABASE_KEYS_GUIDE.md` - Complete key documentation (NEW!)

### How It Works
```typescript
// Automatic fallback in all clients
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||  // Try new key first
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY            // Fallback to legacy
```

## Benefits of New Keys

1. **Instant Revocation** - Immediately invalidate compromised keys
2. **Zero-Downtime Rotation** - Rotate keys without service interruption
3. **Multiple Keys** - Create and manage multiple secret keys
4. **Browser Protection** - Secret keys cannot work in browsers (401 error)
5. **Better Mobile Support** - Avoid forced app updates during rotation

## Important Notes

### Secret Keys Cannot Be Used in Browsers
If you use the new `sb_secret_...` key in client-side code, you'll get a **401 Unauthorized** error. This is by design for security.

**Correct usage:**
- ✅ Publishable key (`sb_publishable_...`) → Client AND server
- ⚠️ Secret key (`sb_secret_...`) → Server ONLY (bypasses RLS)

### Admin Panel Works the Same
The admin panel functionality is **identical**. This is purely an infrastructure upgrade. No behavior changes!

## Migration Timeline

- **June 2025**: New keys launched (current)
- **November 2025**: New projects won't get legacy keys by default
- **Late 2026**: Legacy keys will be removed

## FAQ

**Q: Do I need to update right now?**
A: No, legacy keys work until late 2026. But new keys are recommended for better security.

**Q: Will my app break if I don't update?**
A: No! The code supports both formats automatically.

**Q: What if I'm already using `sb_secret_...` keys?**
A: Perfect! Just set `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` and you're good to go.

**Q: Do I need to change any code?**
A: No! Just update your `.env.local` file with the new keys.

**Q: Where can I learn more?**
A: See `SUPABASE_KEYS_GUIDE.md` for complete documentation.

## Testing Your Setup

After updating your keys:

1. Start the dev server: `npm run dev`
2. Go to `http://localhost:3000/login`
3. Sign in with your admin credentials
4. Access the admin dashboard at `http://localhost:3000/admin`

If everything works, you're all set! ✅

## Support

- **Full Documentation**: `SUPABASE_KEYS_GUIDE.md`
- **Setup Guide**: `ADMIN_SETUP.md`
- **Supabase Announcement**: https://github.com/orgs/supabase/discussions/29260

---

**TL;DR**: The code now supports both old and new Supabase key formats. No immediate action needed, but new keys are recommended for better security. Just update your `.env.local` when ready!
