#!/bin/bash
set -e
cd "$(dirname "$0")"

echo "→ Initializing git..."
git init
git add .
git commit -m "feat: initial PhotoFuse scaffold

- Next.js 14 App Router + TypeScript + Tailwind CSS
- better-auth with Google + Apple OAuth
- Unified gallery: iCloud, Google Photos, Amazon Photos
- Pinterest masonry grid, Airbnb card shadows, Apple glass nav
- Prisma schema: User, Session, Account, Photo
- API routes for all three photo providers
- AI duplicate detection groundwork (hash field)"

echo "→ Setting remote..."
git remote add origin https://github.com/kakarot0105/Photofuse.git
git branch -M main

echo "→ Pushing to GitHub..."
git push -u origin main

echo "✓ Done! https://github.com/kakarot0105/Photofuse"
