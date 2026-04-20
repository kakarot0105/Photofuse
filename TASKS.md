# PhotoFuse — Pending Tasks

Ordered by priority. Critical blockers first, polish last.

---

## 🔴 Critical Blockers (App broken without these)

### 1. Fix Amazon OAuth in `lib/auth.ts`
`AMAZON_CLIENT_ID` and `AMAZON_CLIENT_SECRET` are in `.env.example` but never wired into the `better-auth` `socialProviders` config. Clicking "Connect Amazon Photos" will fail silently.
- **File**: `lib/auth.ts`
- **Fix**: Add `amazon` to `socialProviders` using `AMAZON_CLIENT_ID` / `AMAZON_CLIENT_SECRET`

### 2. Fix type cast in `ConnectProviders.tsx`
`handleConnect` casts provider to `"google" | "apple"` only — Amazon is excluded. Runtime error when Amazon button is clicked.
- **File**: `components/ConnectProviders.tsx` line 24
- **Fix**: Update cast to `"google" | "apple" | "amazon"` once Amazon is added to better-auth

### 3. Wrap Prisma transactions in try-catch (all 3 API routes)
`prisma.$transaction()` calls have no error handling — DB errors crash the route handler with a 500 and no JSON response body.
- **Files**:
  - `app/api/photos/google/route.ts`
  - `app/api/photos/amazon/route.ts`
  - `app/api/photos/icloud/route.ts`
- **Fix**: Wrap each transaction in `try { } catch (err) { return NextResponse.json({ error: 'Sync failed' }, { status: 500 }) }`

### 4. Implement CloudKit client-side SDK
The iCloud API route only returns a config object — there is no client-side CloudKit JS integration. iCloud photos cannot actually sync.
- **Files**: `app/api/photos/icloud/route.ts`, new `components/CloudKitSync.tsx`
- **Fix**: Initialize CloudKit JS SDK client-side using `CLOUDKIT_CONTAINER_ID` + `CLOUDKIT_API_TOKEN`, query `Photos.Photo` record type, POST results to `/api/photos/icloud`

---

## 🟠 Important Features (Missing functionality)

### 5. Add photo refresh / "Sync Now" mechanism
Dashboard fetches photos once on server render — no way to pull fresh photos without a hard reload. No background sync.
- **Fix**: Add a `"Sync Now"` button to the dashboard that re-calls all `/api/photos/*` routes and refreshes the grid

### 6. Add provider disconnect functionality
Users can connect providers but cannot unlink them. No API endpoint, no UI button.
- **Files**: New `app/api/providers/[id]/disconnect/route.ts`, update `components/ConnectProviders.tsx`
- **Fix**: DELETE route that removes the `Account` record from Prisma; show a "Disconnect" button when provider is connected

### 7. Implement AI duplicate detection
`Photo.hash` and `Photo.isDuplicate` exist in schema but are never populated. The "D" duplicate badge in the UI is always inactive.
- **Files**: All three API routes + new `lib/dedup.ts`
- **Fix**: Compute a perceptual hash (pHash) when syncing photos; set `isDuplicate = true` for photos sharing a hash; surface in the UI

### 8. Add input validation on iCloud POST route
The iCloud API route accepts arbitrary photo objects with no validation — invalid data can corrupt the database.
- **File**: `app/api/photos/icloud/route.ts`
- **Fix**: Add Zod schema validation for the incoming photo array before the Prisma transaction

---

## 🟡 UI / UX Gaps

### 9. Add loading states
No skeleton loaders or spinners anywhere in the app.
- **Files**: `components/PhotoGrid.tsx`, `app/dashboard/page.tsx`, `components/ConnectProviders.tsx`
- **Fix**: Add skeleton grid while photos load; spinner on OAuth redirect in ConnectProviders; loading overlay during sync

### 10. Add empty state for dashboard
When no photos exist (new user, no providers connected), the dashboard shows a blank screen.
- **File**: `app/dashboard/page.tsx`
- **Fix**: Show an illustrated empty state with a CTA to `/connect`

### 11. Add empty states per provider in ConnectProviders
Cards show all 3 providers identically — no distinction between "connected", "not connected", and "connecting".
- **File**: `components/ConnectProviders.tsx`
- **Fix**: Per the DESIGN.md spec: connected state shows a disconnect button + ProviderStatus badge; disconnected state shows the Connect button

### 12. Fix dead links on sign-in page
Terms and Privacy Policy both link to `#`.
- **File**: `app/(auth)/sign-in/page.tsx` lines 72–73
- **Fix**: Either create `/terms` and `/privacy` pages, or link to external docs

### 13. Create `/profile` and `/settings` pages
No user profile, no way to update account info or app preferences.
- **Fix**: New `app/profile/page.tsx` and `app/settings/page.tsx` with basic account management

---

## 🟢 Schema / Database

### 14. Add index on `Photo.provider`
Dashboard queries filter by `provider` but there's no index on that field — will slow down as photo count grows.
- **File**: `prisma/schema.prisma`
- **Fix**: Add `@@index([provider])` and `@@index([hash])` to the `Photo` model; run `prisma migrate`

### 15. Populate `Photo.baseUrl` for Amazon and iCloud routes
`baseUrl` is set for Google Photos but not for Amazon or iCloud — inconsistent data model.
- **Files**: `app/api/photos/amazon/route.ts`, `app/api/photos/icloud/route.ts`
- **Fix**: Map and set `baseUrl` from each provider's photo object

---

## ⚪ Polish / Nice-to-Have

### 16. Create `/register` page or remove the directory
`app/(auth)/register/` directory exists but is empty. Either implement a register flow or delete it.

### 17. Add rate limiting to API routes
Photo sync routes make external API calls with no rate limiting — a misbehaving client could exhaust provider quotas.
- **Fix**: Add simple in-memory or Redis-based rate limiting per user per route

### 18. Add `DESIGN.md` tokens to Tailwind config
`DESIGN.md` specifies the full Claude-inspired color palette and spacing system. Wire it into `tailwind.config.ts` as custom tokens so components use design variables instead of arbitrary hex values.
- **File**: `tailwind.config.ts`

---

## Summary

| Priority | Count | Items |
|----------|-------|-------|
| 🔴 Critical | 4 | #1 #2 #3 #4 |
| 🟠 Important | 4 | #5 #6 #7 #8 |
| 🟡 UI/UX | 7 | #9–#15 |
| 🟢 Schema | 2 | #14 #15 |
| ⚪ Polish | 3 | #16–#18 |
| **Total** | **18** | |
