# PhotoFuse — Pending Tasks

Ordered by priority. Critical blockers first, polish last.

Status legend: ✅ done · 🔧 fixed in this branch · ⬜ still open

---

## 🔴 Critical Blockers (App broken without these)

### 1. Fix Amazon OAuth in `lib/auth.ts` ✅
Amazon is not a built-in better-auth provider. Wired via `genericOAuth` plugin with Login with Amazon endpoints + `getUserInfo` against `api.amazon.com/user/profile`. Client uses `genericOAuthClient()`.
- **Files**: `lib/auth.ts`, `lib/auth-client.ts`

### 2. Fix type cast in `ConnectProviders.tsx` ✅
`handleConnect` / sign-in now accept `"google" | "apple" | "amazon"` via `AuthProvider`. Connect uses `linkSocial` so linking a second provider does not replace the session.
- **Files**: `components/ConnectProviders.tsx`, `app/(auth)/sign-in/page.tsx`

### 3. Wrap Prisma transactions in try-catch (all 3 API routes) ✅
All three photo sync routes catch transaction failures and return `{ error: 'Sync failed' }` with status 500.

### 4. Implement CloudKit client-side SDK ✅
`CloudKitSync` loads CloudKit JS on demand, uses private DB, POSTs validated photos to `/api/photos/icloud`. Shown on Connect when Apple is linked.
- **Files**: `components/CloudKitSync.tsx`, `components/ConnectProviders.tsx`

---

## 🟠 Important Features (Missing functionality)

### 5. Add photo refresh / "Sync Now" mechanism ✅
`SyncButton` on dashboard calls Google/Amazon sync routes and refreshes.

### 6. Add provider disconnect functionality ✅
`DELETE /api/providers/[id]/disconnect` removes Account + photos. Apple OAuth maps to `icloud` photo provider.
- **Files**: `app/api/providers/[id]/disconnect/route.ts`, `components/ConnectProviders.tsx`

### 7. Implement AI duplicate detection ✅
Sync routes compute `simpleFingerprint` hashes and call `markDuplicatesForUser` so the "D" badge can activate.
- **Files**: `lib/dedup.ts`, all three photo API routes

### 8. Add input validation on iCloud POST route ✅
Zod schema validates the incoming photo array before the Prisma transaction.

---

## 🟡 UI / UX Gaps

### 9. Add loading states ✅
Skeleton grid in `PhotoGrid`; spinners on Connect / Sync.

### 10. Add empty state for dashboard ✅
Illustrated empty state with CTA to `/connect` or Sync Now.

### 11. Add empty states per provider in ConnectProviders ✅
Connected vs disconnected UI with badges and Disconnect.

### 12. Fix dead links on sign-in page ✅
Terms → `/terms`, Privacy → `/privacy`.

### 13. Create `/profile` and `/settings` pages ✅
Basic account + preference shells.

---

## 🟢 Schema / Database

### 14. Add index on `Photo.provider` ✅
`@@index([userId, provider])` and `@@index([userId, hash])` on Photo.

### 15. Populate `Photo.baseUrl` for Amazon and iCloud routes ✅
Both routes set `baseUrl` on create/update.

---

## ⚪ Polish / Nice-to-Have

### 16. Create `/register` page or remove the directory ✅
`/register` redirects to `/sign-in` (OAuth-only).

### 17. Add rate limiting to API routes ✅
In-memory per-user-per-route limiter on photo sync routes.

### 18. Add `DESIGN.md` tokens to Tailwind config ✅
Full Claude-inspired palette + shadows wired in `tailwind.config.ts` and CSS variables.

---

## Summary

| Priority | Count | Status |
|----------|-------|--------|
| 🔴 Critical | 4 | ✅ all fixed |
| 🟠 Important | 4 | ✅ all fixed |
| 🟡 UI/UX | 5 | ✅ all fixed |
| 🟢 Schema | 2 | ✅ all fixed |
| ⚪ Polish | 3 | ✅ all fixed |
| **Total** | **18** | **complete** |
