# PhotoFuse

A privacy-first unified photo gallery connecting iCloud, Google Photos, and Amazon Photos.

## Stack
- Next.js 14 (App Router) · TypeScript · Tailwind CSS
- better-auth (Google + Apple social providers; Amazon via `genericOAuth`)
- PostgreSQL + Prisma ORM

## Design
Inspired by Pinterest (masonry grid), Airbnb (warm card shadows, generous radius), and Apple (glass nav).

## Getting Started

```bash
npm install
cp .env.example .env.local   # fill in your API keys
npx prisma db push
npm run dev
```

## Provider Setup

| Provider | Setup link | Scope needed |
|----------|-----------|--------------|
| Google Photos | [console.cloud.google.com](https://console.cloud.google.com) | `photoslibrary.readonly` |
| iCloud (CloudKit) | [developer.apple.com](https://developer.apple.com) | Sign in with Apple Service ID |
| Amazon Photos | [developer.amazon.com/loginwithamazon](https://developer.amazon.com/loginwithamazon) | `profile` |

## Project Structure

```
app/
  page.tsx                  Landing page
  dashboard/page.tsx        Unified gallery
  connect/page.tsx          Manage providers
  (auth)/sign-in/page.tsx   Sign-in
  api/auth/[...all]/        better-auth handler
  api/photos/google/        Google Photos proxy
  api/photos/icloud/        CloudKit config
  api/photos/amazon/        Amazon Photos proxy

components/
  Navbar.tsx                Glass sticky nav
  PhotoGrid.tsx             Masonry grid + lightbox
  ProviderStatus.tsx        Connection status badges
  ConnectProviders.tsx      OAuth connect / disconnect
  SyncButton.tsx            Dashboard "Sync Now"
  CloudKitSync.tsx          Client-side iCloud photo sync

lib/
  auth.ts                   Server auth (Google, Apple, Amazon)
  auth-client.ts            Client auth hooks + genericOAuth
  dedup.ts                  Fingerprint + duplicate marking
  rate-limit.ts             Per-user API rate limiting
  prisma.ts                 DB client singleton
  utils.ts                  cn(), formatDate()

prisma/schema.prisma        User · Session · Account · Photo
```
