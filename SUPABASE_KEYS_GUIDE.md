# Supabase Keys Guide: New Format (2025+)

This guide explains Supabase's new API key system introduced in June 2025.

## 🆕 What Changed?

Supabase has migrated from JWT-based keys to a modern API key system with better security and management features.

### Old Keys (Legacy - Deprecated by late 2026)
- ❌ `anon` - JWT-based public key
- ❌ `service_role` - JWT-based admin key

### New Keys (Recommended)
- ✅ `sb_publishable_...` - Publishable key (replaces `anon`)
- ✅ `sb_secret_...` - Secret key (replaces `service_role`)

## 🔑 Key Types

### 1. Publishable Key (sb_publishable_...)
- **Environment Variable**: `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- **Prefix**: `NEXT_PUBLIC_` (safe to expose to browser)
- **Security**: Safe for client-side code, respects RLS policies
- **Access**: Low-privilege, restricted by Row Level Security
- **Use for**: Client-side operations, user authentication, public API access

### 2. Secret Key (sb_secret_...)
- **Environment Variable**: `SUPABASE_SECRET_KEY`
- **Prefix**: No `NEXT_PUBLIC_` (server-only)
- **Security**: MUST NEVER be exposed to the browser
- **Access**: High-privilege, BYPASSES ALL RLS policies
- **Important**: **CANNOT be used in browsers** - returns 401 Unauthorized
- **Use for**: Trusted server-side operations only

## 🚨 Key Security Improvements

The new key system provides:

1. **Instant Revocation** - Immediately invalidate compromised keys
2. **Zero-Downtime Rotation** - Rotate keys without service interruption
3. **Multiple Keys** - Create and manage multiple secret keys independently
4. **Browser Protection** - Secret keys physically cannot work in browsers (401 error)
5. **Better Mobile Support** - Avoid forced app updates during key rotation

## 📋 Current Implementation

Our FADEMEX admin panel uses the **Publishable Key** for all operations, which is the CORRECT and SECURE approach because:

1. ✅ We have RLS policies that check the authenticated user's email
2. ✅ Only whitelisted admin emails can access admin features
3. ✅ The publishable key respects these security policies
4. ✅ We use proper authentication via Supabase Auth
5. ✅ Code supports both new and legacy keys for smooth migration

## 🎯 When to Use Each Key

### Use Publishable Key (Default) ✅

**Client-Side (Browser)**
```typescript
// lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY! // ✅ Publishable key
  )
}
```

**Server-Side (Respecting RLS)**
```typescript
// lib/supabase/server.ts
import { createClient } from '@/lib/supabase/server'

export async function getLeads() {
  const supabase = await createClient() // ✅ Uses publishable key with RLS
  const { data } = await supabase.from('leads').select('*')
  return data
}
```

**Use Cases**:
- ✅ User authentication and session management
- ✅ Admin operations where user is authenticated (our current approach)
- ✅ Client-side queries and mutations
- ✅ Server Components that respect RLS
- ✅ Operations where you want RLS policies to apply

### Use Secret Key (Admin Only) ⚠️

**Server-Side Only (Bypassing RLS)**
```typescript
// Only use when you absolutely need to bypass RLS
import { createAdminClient } from '@/lib/supabase/server'

export async function dangerousGetAllLeads() {
  const supabase = await createAdminClient() // ⚠️ Bypasses RLS!
  const { data } = await supabase.from('leads').select('*')
  return data
}
```

**Use Cases**:
- ⚠️ Bulk operations that need to bypass RLS
- ⚠️ System migrations or data cleanup
- ⚠️ Background jobs that run without user context
- ⚠️ Operations where RLS would prevent legitimate admin access

**NEVER Use Secret Key For**:
- ❌ Client-side operations (will return 401 Unauthorized!)
- ❌ Operations where RLS provides sufficient access
- ❌ User-facing features (use authentication instead)
- ❌ As a shortcut to avoid proper RLS policies

## 🔒 Security Best Practices

### For Publishable Key ✅
- ✅ Safe to prefix with `NEXT_PUBLIC_`
- ✅ Can be included in client bundles
- ✅ Use with RLS policies for security
- ✅ Requires proper authentication for protected operations

### For Secret Key ⚠️
- ❌ NEVER prefix with `NEXT_PUBLIC_`
- ❌ NEVER send to the browser (will fail with 401)
- ❌ NEVER log in client-side code
- ❌ NEVER commit to version control without encryption
- ✅ Only use in Server Components/Actions
- ✅ Keep in `.env.local` (gitignored)
- ✅ Use with extreme caution

## 📍 Where to Find Your Keys

### Option 1: New Keys (Recommended)
1. Go to your Supabase Dashboard
2. Navigate to **Settings** → **API**
3. Look for the **New API Keys** section (if available)
4. You'll see:
   - **Publishable key** (`sb_publishable_...`) → Use for `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - **Secret key** (`sb_secret_...`) → Use for `SUPABASE_SECRET_KEY` (if needed)

### Option 2: Legacy Keys (During Migration)
1. In the same **Settings** → **API** page
2. Look for **Project API keys** section
3. You'll see:
   - **anon public** key → Use for `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → Use for `SUPABASE_SERVICE_ROLE_KEY` (if needed)

## 🔄 Migration Timeline

- **June 2025**: New key system launched (early preview)
- **November 2025**: New projects won't include legacy keys by default
- **Late 2026**: Legacy keys will be removed

## 🎯 FADEMEX Implementation Details

### Current Approach (Recommended) ✅

```
┌─────────────────────────────────────────────────────┐
│ Client (Browser)                                    │
│  └─ Uses PUBLISHABLE KEY (via createBrowserClient) │
│     └─ Supabase Auth signs in user                 │
│        └─ RLS checks authenticated user email      │
│           └─ Only whitelisted emails get access    │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ Server (Next.js)                                    │
│  └─ Uses PUBLISHABLE KEY (via createClient)        │
│     └─ Respects user session from cookies          │
│        └─ RLS checks authenticated user email      │
│           └─ Same security as client               │
└─────────────────────────────────────────────────────┘
```

### Backwards Compatibility

Our code supports **both new and legacy keys** with automatic fallback:

```typescript
// Automatically uses new key if available, falls back to legacy
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
```

This means:
- ✅ Works with new projects using modern keys
- ✅ Works with existing projects using legacy keys
- ✅ Smooth migration path - no code changes needed
- ✅ Just update environment variables when ready

## ⚡ Quick Reference

| Operation | New Key | Legacy Key | Why |
|-----------|---------|------------|-----|
| User login | Publishable | anon | Auth respects RLS |
| Admin dashboard | Publishable | anon | Authenticated user, RLS checks email |
| Client components | Publishable | anon | Only option for client-side |
| Server actions (normal) | Publishable | anon | RLS provides security |
| Public lead form | Publishable | anon | RLS allows public INSERT |
| Bulk migrations | Secret | service_role | Need to bypass RLS |
| System cleanup | Secret | service_role | No user context |
| Background jobs | Secret | service_role | Runs without authentication |

## 🚀 Setup Instructions

### Option 1: New Keys (Recommended)
```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxxxx...
```

### Option 2: Legacy Keys (During Migration)
```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Option 3: With Admin Operations
```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxxxx...
SUPABASE_SECRET_KEY=sb_secret_xxxxx...  # Optional, only if needed
```

## ❓ FAQ

**Q: Do I need the secret key for the admin panel?**
A: No! The publishable key with RLS policies is sufficient and more secure.

**Q: Is the publishable key actually secure?**
A: Yes! It's designed to be public. Security comes from RLS policies, not key secrecy.

**Q: What happens if I use a secret key in the browser?**
A: It will return **401 Unauthorized**. This is by design to prevent accidental exposure.

**Q: When would I actually use the secret key?**
A: Only for trusted server-side operations that legitimately need to bypass RLS (migrations, cleanup jobs, etc.)

**Q: Can I delete the secret key from my .env?**
A: Yes! If you don't use `createAdminClient()`, you don't need it.

**Q: What if someone steals my publishable key?**
A: It's public by design. Your RLS policies and authentication protect your data.

**Q: Should I migrate to the new keys now?**
A: Recommended but not urgent. Legacy keys work until late 2026. Our code supports both formats.

**Q: Do I need to change my code to use new keys?**
A: No! Just update your environment variables. The code automatically detects and uses the right key.

**Q: What's the difference between new publishable and legacy anon?**
A: Functionally similar, but new keys offer better security features (instant revocation, rotation, etc.)

## 📚 Key Differences: New vs Legacy

| Feature | New Keys | Legacy Keys |
|---------|----------|-------------|
| Format | `sb_publishable_...` / `sb_secret_...` | JWT tokens (long strings) |
| Instant revocation | ✅ Yes | ❌ No |
| Zero-downtime rotation | ✅ Yes | ❌ No |
| Multiple keys | ✅ Yes | ❌ No (single key) |
| Browser protection | ✅ Secret keys blocked | ⚠️ No technical block |
| Deprecation date | Never | Late 2026 |

## 📚 Further Reading

- [Supabase API Keys Announcement](https://github.com/orgs/supabase/discussions/29260)
- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)

---

**TL;DR**: Use the new **publishable key** (`sb_publishable_...`) instead of the legacy anon key. Our code automatically supports both formats. The secret key is optional and only for server operations that bypass RLS. Never use secret keys in browsers (they'll fail with 401).
