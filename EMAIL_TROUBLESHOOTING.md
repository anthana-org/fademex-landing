# Email Troubleshooting Guide

## Issue: "Email delivered" but not receiving emails

### Common Causes

1. **From domain not verified in Resend**
2. **Environment variables not set correctly**
3. **Emails going to spam folder**
4. **Resend sandbox mode restrictions**

## Step-by-Step Troubleshooting

### 1. Check Resend Domain Verification

**Go to**: https://resend.com/domains

**Verify**:
- ✅ Domain is added (e.g., `anthana.agency`)
- ✅ All DNS records are verified (SPF, DKIM, DMARC)
- ✅ Domain status shows "Verified" (green checkmark)

**If not verified**:
1. Add the DNS records Resend provides to your domain
2. Wait for DNS propagation (can take up to 48 hours)
3. Click "Verify" in Resend dashboard

### 2. Check Environment Variables

**Verify your `.env.local` has**:

```bash
# Must match your verified domain in Resend
EMAIL_FROM="FADEMEX <noreply@anthana.agency>"

# Where admin notifications go
ADMIN_EMAIL=joscardona@icloud.com

# Your Resend API key
RESEND_API_KEY=re_your_actual_key_here
```

**Test in production**:
- Check deployment platform (Vercel/etc) environment variables
- Make sure they match your `.env.local`
- Redeploy after updating env vars

### 3. Check Resend Logs

**Go to**: https://resend.com/emails

**Look for**:
1. Recent email sends
2. Status: "Delivered" vs "Bounced" vs "Failed"
3. Error messages if any

**Common statuses**:
- ✅ **Delivered**: Email sent successfully to recipient's server
- ⚠️ **Queued**: Still being processed
- ❌ **Bounced**: Recipient email invalid or blocked
- ❌ **Failed**: Sending error (check error message)

### 4. Check Spam Folders

Emails might be delivered but filtered as spam:

1. **Check spam/junk folder** in recipient email
2. **Add to safe senders**: Add `noreply@anthana.agency` to contacts
3. **Check email headers** for spam scores

### 5. Test with Resend Testing Email

Instead of your domain, temporarily use Resend's test email:

```bash
EMAIL_FROM="onboarding@resend.dev"
```

This bypasses domain verification for testing. If this works, the issue is with your domain setup.

### 6. Check Server Logs

The email functions now log detailed information:

```bash
# In your deployment logs, look for:
[Email] Sending user confirmation: { from: '...', to: '...', subject: '...' }
[Email] User confirmation sent successfully: { id: '...' }

# Or errors:
[Email] User confirmation failed: { error: '...' }
```

**How to check**:
- **Local**: Check terminal/console
- **Vercel**: Go to Deployments → Functions → Logs
- **Other platforms**: Check platform-specific logs

### 7. Verify Resend API Key

**Test your API key** with Resend's test emails:

```bash
curl -X POST https://api.resend.com/emails \
  -H "Authorization: Bearer re_your_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "from": "Acme <onboarding@resend.dev>",
    "to": ["delivered@resend.dev"],
    "subject": "Test Email",
    "html": "<strong>It works!</strong>"
  }'
```

**Note**:
- Use `delivered@resend.dev` for testing - it's a special Resend email that always works
- The `to` field should be an array `["email@example.com"]`

**Expected response**:
```json
{
  "id": "abc123..."
}
```

**If you get an error**, your API key might be:
- Invalid
- Expired
- From the wrong environment (dev vs prod)

## Current Implementation Details

### Email Flow

1. **User submits contact form** → `/api/contact`
2. **Saves to Supabase** (Priority 1)
3. **Sends user confirmation email**
   - From: `EMAIL_FROM` env var
   - To: User's email
   - Subject: "¡Solicitud Recibida! - FADEMEX Energía Solar"
4. **Sends admin notification email**
   - From: `EMAIL_FROM` env var
   - To: `ADMIN_EMAIL` env var
   - Subject: "Nueva Solicitud: {company} - {name}"

### Enhanced Logging

All email sends now log:
- ✅ Request details (from, to, subject)
- ✅ Success confirmation with email ID
- ❌ Error details if failed

Check your deployment logs after submitting a form.

## Quick Fixes

### Fix 1: Test with Resend Test Emails

**Step 1**: Use Resend's test sender
```bash
# .env.local
EMAIL_FROM="Acme <onboarding@resend.dev>"
```

**Step 2**: Test with Resend's test recipient
```bash
# Temporarily hardcode in lib/email.ts for testing
to: ['delivered@resend.dev']
```

These special emails always work without domain verification.

**Once working**, switch back to your verified domain and real recipient emails.

### Fix 2: Verify Domain is Correct

```bash
# Make sure this matches your Resend verified domain
EMAIL_FROM="FADEMEX <noreply@anthana.agency>"
```

Not:
- ❌ `noreply@fademex.com` (if fademex.com isn't verified)
- ❌ `noreply@gmail.com` (can't use Gmail)
- ❌ Missing quotes around full sender

### Fix 3: Check iCloud Email Settings

If `ADMIN_EMAIL=joscardona@icloud.com`:

1. **Check iCloud spam folder**
2. **Add sender to contacts**
3. **iCloud might delay emails** - wait a few minutes
4. **Try a different email** to test (Gmail, etc)

## Testing Checklist

- [ ] Resend domain verified (green checkmark)
- [ ] DNS records added and propagated
- [ ] Environment variables set correctly
- [ ] API key is valid and not expired
- [ ] Checked spam folders
- [ ] Checked Resend email logs
- [ ] Checked deployment server logs
- [ ] Tested with `onboarding@resend.dev`
- [ ] Tried different recipient email

## Still Not Working?

1. **Share Resend logs** - Screenshot from https://resend.com/emails
2. **Share server logs** - What appears in deployment logs
3. **Test with curl** - Verify API key works
4. **Check DNS** - Use https://mxtoolbox.com/SuperTool.aspx

## Contact Support

If still having issues:
- **Resend Support**: https://resend.com/support
- **Check Resend status**: https://status.resend.com

---

**Note**: The lead data is still saved to Supabase even if email fails, so no customer information is lost!
