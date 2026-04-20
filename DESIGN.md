# PhotoFuse Design System

*Adapted from Claude (Anthropic) · Warm editorial aesthetic meets privacy-first photo gallery*

---

## 1. Visual Theme & Atmosphere

PhotoFuse is a quiet, trustworthy space — the opposite of the noisy, algorithm-driven feeds that dominate photo apps. Inspired by Claude's warm parchment canvas and editorial typography, the interface feels like a beautifully curated physical photo book rather than a social platform. Where Instagram leans cold and performative, PhotoFuse is warm, personal, and unhurried.

The primary canvas is a warm parchment tone (`#f5f4ed`) that makes photos feel like they're resting on archival paper. The terracotta accent (`#c96442`) — the same earthy brand color used by Claude — appears only at high-signal moments: connecting a new provider, triggering an upload, or the primary CTA. Everything else retreats to warm neutrals so the photos themselves dominate.

**Key Characteristics:**
- Warm parchment canvas (`#f5f4ed`) — photos are the subject, the UI is the frame
- Serif headlines (Georgia fallback) for section anchors and page titles; sans-serif for all UI chrome
- Terracotta accent (`#c96442`) strictly reserved for primary actions and brand moments
- Exclusively warm-toned neutrals — no cool blue-grays anywhere
- Ring-based shadow system (`0px 0px 0px 1px`) for subtle card depth without harsh borders
- Generous border-radius (12–32px) — soft, approachable, never clinical
- Photo-first layout: the masonry grid is the hero; navigation and chrome are as quiet as possible

---

## 2. Color Palette & Roles

### Primary
| Name | Hex | Role |
|------|-----|------|
| Near Black | `#141413` | Primary text, dark surfaces, photo overlays |
| Terracotta Brand | `#c96442` | Primary CTA: "Connect", "Upload", "Get Started" |
| Coral Accent | `#d97757` | Text links on dark surfaces, secondary emphasis |

### Surfaces & Backgrounds
| Name | Hex | Role |
|------|-----|------|
| Parchment | `#f5f4ed` | Primary page background — the emotional foundation |
| Ivory | `#faf9f5` | Card surfaces, elevated containers, modal backgrounds |
| Pure White | `#ffffff` | Nav background on scroll, maximum-contrast elements |
| Warm Sand | `#e8e6dc` | Secondary button backgrounds, input fields, skeleton loaders |
| Dark Surface | `#30302e` | Dark nav, photo overlay backgrounds, dark-mode containers |
| Deep Dark | `#141413` | Dark-mode page background, full-bleed dark sections |

### Neutrals & Text
| Name | Hex | Role |
|------|-----|------|
| Charcoal Warm | `#4d4c48` | Button text, high-emphasis UI labels |
| Olive Gray | `#5e5d59` | Body text, card descriptions, secondary UI |
| Stone Gray | `#87867f` | Metadata, timestamps, tertiary text |
| Dark Warm | `#3d3d3a` | Hover state text, emphasized secondary text |
| Warm Silver | `#b0aea5` | Text on dark surfaces |

### Borders
| Name | Hex | Role |
|------|-----|------|
| Border Cream | `#f0eee6` | Standard card borders on light surfaces |
| Border Warm | `#e8e6dc` | Prominent borders, section dividers |
| Border Dark | `#30302e` | Borders on dark surfaces |

### Semantic
| Name | Hex | Role |
|------|-----|------|
| Error Crimson | `#b53333` | Failed sync, auth errors, destructive actions |
| Focus Blue | `#3898ec` | Input focus rings — the only cool-toned color |
| Success Sage | `#5a7a5a` | Connected provider status, successful sync |

> **Rule**: No gradients. No purple. No cool grays. Depth comes from the interplay of warm surface tones and the photos themselves.

---

## 3. Typography

### Font Stack
```css
--font-serif: Georgia, 'Times New Roman', serif;       /* Section headings, page titles */
--font-sans: system-ui, -apple-system, sans-serif;     /* All UI chrome, buttons, labels */
--font-mono: 'Courier New', monospace;                 /* Code, API keys */
```

### Scale
| Role | Font | Size | Weight | Line Height | Letter Spacing |
|------|------|------|--------|-------------|----------------|
| Page Title (Hero) | Serif | 52px / 3.25rem | 500 | 1.15 | normal |
| Section Heading | Serif | 36px / 2.25rem | 500 | 1.25 | normal |
| Card Title | Serif | 22px / 1.375rem | 500 | 1.30 | normal |
| Body Large | Sans | 20px / 1.25rem | 400 | 1.60 | normal |
| Body | Sans | 16px / 1rem | 400 | 1.60 | normal |
| UI / Nav | Sans | 15px / 0.94rem | 400–500 | 1.40 | normal |
| Caption / Meta | Sans | 14px / 0.875rem | 400 | 1.43 | normal |
| Label / Badge | Sans | 12px / 0.75rem | 500 | 1.25 | 0.12px |
| Overline | Sans | 10px / 0.625rem | 500 | 1.60 | 0.5px |

### Principles
- **Serif for authority**: Page titles and section headings use Georgia at weight 500 — gives the app a "curated gallery" personality, not "another cloud sync tool"
- **Sans for utility**: All navigation, buttons, labels, and metadata use system-ui — clean and fast to scan
- **Relaxed body text**: 1.60 line-height — generous, never cramped
- **Tight headings**: 1.15–1.30 for display — booklike, not social-media flat

---

## 4. Component Specifications

### Navbar (Glass Sticky)
```
Background:     rgba(245, 244, 237, 0.85)  — parchment at 85% opacity
Backdrop blur:  12px
Border bottom:  1px solid #f0eee6
Height:         64px
Max width:      1280px, centered
Padding:        0 24px

Logo:           "PhotoFuse" wordmark in Near Black (#141413), Georgia 18px w500
Nav links:      Olive Gray (#5e5d59), 15px system-ui w400
                Hover → Near Black (#141413), no underline
CTA button:     "Connect Photos" — Terracotta (#c96442), Ivory text, 10px radius

On scroll:      Background shifts from parchment → Pure White (#ffffff)
                Shadow: rgba(0,0,0,0.05) 0px 2px 12px
Mobile:         Hamburger collapses links; CTA persists as icon button
```

### Photo Card (Masonry Grid)
```
Container:      No fixed size — masonry flow
Background:     None (photo fills the card)
Border radius:  12px (standard), 16px (featured/hero photos)
Shadow:         Level 2 ring: 0px 0px 0px 1px rgba(0,0,0,0.08)
Overflow:       hidden

Hover overlay:
  Background:   rgba(20, 20, 19, 0.55)  — Near Black at 55%
  Transition:   opacity 200ms ease
  Shows:        Photo title (Georgia 15px w500, Ivory), date (system-ui 12px, Warm Silver),
                source provider badge (see ProviderBadge)

Active/selected:
  Ring:         0px 0px 0px 3px #c96442  — Terracotta selection ring
```

### Lightbox
```
Backdrop:       rgba(20, 20, 19, 0.92)  — Near Black at 92%
Photo area:     Centered, max 90vw × 88vh, border-radius 8px
Controls bar:   Bottom-fixed, Dark Surface (#30302e) background, 60px height
                Buttons: Warm Silver (#b0aea5) icons, hover → Ivory
Navigation:     Prev/Next arrows, Warm Silver, hover → Ivory
Caption:        Georgia 14px w400, Stone Gray (#87867f), below photo
Close button:   Top-right, 40px tap target, Warm Silver icon
```

### Provider Status Badge (ProviderStatus.tsx)
```
Connected:
  Background:   rgba(90, 122, 90, 0.12)  — Success Sage tint
  Text:         #5a7a5a (Success Sage)
  Icon:         Checkmark
  Border:       1px solid rgba(90, 122, 90, 0.25)

Disconnected:
  Background:   rgba(245, 244, 237, 0.6)  — faint parchment
  Text:         Stone Gray (#87867f)
  Icon:         Link-off

Syncing:
  Background:   rgba(201, 100, 66, 0.10)  — faint terracotta
  Text:         Charcoal Warm (#4d4c48)
  Icon:         Spinner (Terracotta #c96442, animated)

Error:
  Background:   rgba(181, 51, 51, 0.10)
  Text:         Error Crimson (#b53333)
  Icon:         Warning

All badges:
  Padding:      4px 10px
  Radius:       99px (pill)
  Font:         12px system-ui w500, letter-spacing 0.1px
```

### Connect Provider Card (ConnectProviders.tsx)
```
Background:     Ivory (#faf9f5)
Border:         1px solid #f0eee6 (Border Cream)
Border radius:  16px
Padding:        28px
Shadow:         rgba(0,0,0,0.05) 0px 4px 24px  — whisper elevation

Provider logo:  48px × 48px, comfortably rounded (10px)
Provider name:  Georgia 20px w500, Near Black
Description:    system-ui 14px, Olive Gray (#5e5d59), line-height 1.6

Connect button: Full-width, Terracotta Brand (#c96442), Ivory text,
                12px radius, 12px 20px padding, system-ui 15px w500
                Hover: darken to #b85a3a
                Ring shadow: 0px 0px 0px 1px #c96442

Disconnect:     Warm Sand (#e8e6dc) background, Charcoal Warm text,
                same dimensions as connect button

Connected state: Border shifts to 1px solid rgba(90,122,90,0.3) (sage tint)
                 ProviderStatus badge replaces the connect button
```

### Buttons
```
Primary (Terracotta Brand):
  Background:   #c96442
  Text:         #faf9f5 (Ivory), 15px system-ui w500
  Padding:      10px 20px
  Radius:       10px
  Shadow:       0px 0px 0px 0px #c96442, 0px 0px 0px 1px #c96442
  Hover:        background → #b85a3a

Secondary (Warm Sand):
  Background:   #e8e6dc
  Text:         #4d4c48, 15px system-ui w500
  Padding:      10px 18px
  Radius:       8px
  Shadow:       0px 0px 0px 1px #d1cfc5
  Hover:        background → #d9d7cd

Ghost / Outline:
  Background:   transparent
  Border:       1px solid #e8e6dc
  Text:         #5e5d59
  Padding:      10px 18px
  Radius:       8px
  Hover:        background → rgba(232,230,220,0.4)

Dark (for use on dark sections):
  Background:   #141413
  Text:         #b0aea5 (Warm Silver), 15px
  Border:       1px solid #30302e
  Radius:       10px
  Hover:        border-color → #5e5d59

Destructive:
  Background:   rgba(181,51,51,0.10)
  Text:         #b53333
  Border:       1px solid rgba(181,51,51,0.25)
  Radius:       8px
  Hover:        background → rgba(181,51,51,0.18)
```

### Input Fields
```
Background:     #ffffff (Pure White) or #faf9f5 (Ivory)
Border:         1px solid #e8e6dc
Radius:         10px
Padding:        10px 14px
Font:           16px system-ui w400, Near Black
Placeholder:    Stone Gray (#87867f)

Focus:          border-color → #3898ec (Focus Blue — the only cool color)
                box-shadow: 0px 0px 0px 3px rgba(56,152,236,0.15)

Error:          border-color → #b53333
                box-shadow: 0px 0px 0px 3px rgba(181,51,51,0.12)
```

### Empty State
```
Background:     Parchment (#f5f4ed)
Illustration:   Terracotta-toned, hand-drawn-feeling SVG (camera or photo frame motif)
Heading:        Georgia 28px w500, Near Black — e.g. "Your gallery is empty"
Body:           16px system-ui, Olive Gray — "Connect a photo provider to get started"
CTA:            Primary Terracotta button
Container:      Centered, max-width 400px, vertical padding 80px
```

### Modal / Sheet
```
Backdrop:       rgba(20,20,19,0.5)  — Near Black at 50%
Container:      Ivory (#faf9f5) background
Border radius:  20px (desktop floating), 20px top corners (mobile sheet)
Shadow:         rgba(0,0,0,0.15) 0px 24px 64px
Padding:        32px
Max width:      480px (desktop)

Header:         Georgia 22px w500, Near Black
Close button:   32px tap target, Stone Gray (#87867f), hover → Near Black
Divider:        1px solid #f0eee6
Footer:         Border Cream divider + button row, right-aligned
```

### Skeleton Loader
```
Base color:     Warm Sand (#e8e6dc)
Shimmer color:  #f0eee6 (Border Cream, lighter pass)
Animation:      220ms shimmer, left → right
Radius:         Matches the element being loaded
```

---

## 5. Layout

### Spacing Scale
```
Base unit: 8px
Scale: 4px · 8px · 12px · 16px · 20px · 24px · 32px · 40px · 48px · 64px · 80px · 120px
```

### Grid
- **Max container width**: 1280px, centered, `padding: 0 24px`
- **Masonry photo grid**: Responsive columns using `columns` CSS property
  - Mobile (< 640px): 2 columns, 8px gap
  - Tablet (640–1024px): 3 columns, 12px gap
  - Desktop (> 1024px): 4–5 columns, 16px gap
- **Provider cards**: 1-column (mobile) → 2-column (tablet) → 3-column (desktop)

### Border Radius Scale
| Token | Value | Use |
|-------|-------|-----|
| `radius-sm` | 6px | Small badges, inline elements |
| `radius-md` | 8px | Secondary buttons, small cards |
| `radius-lg` | 10–12px | Primary buttons, inputs, standard cards |
| `radius-xl` | 16px | Provider cards, feature containers |
| `radius-2xl` | 20px | Modals, sheets |
| `radius-3xl` | 32px | Hero containers, large feature areas |
| `radius-full` | 9999px | Pills, status badges, avatars |

### Page Rhythm
- **Landing page**: Alternates Parchment and Near Black sections, magazine-like pacing
- **Dashboard**: Parchment background, photo grid as the full-page hero
- **Connect page**: Provider cards in Ivory, centered, breathing room (80px vertical padding)
- **Section spacing**: 80–120px between major page sections

---

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat (0) | No shadow, no border | Parchment background, inline text |
| Contained (1) | `1px solid #f0eee6` | Cards, input fields, list items |
| Ring (2) | `0px 0px 0px 1px rgba(0,0,0,0.08)` | Photo cards, interactive containers |
| Whisper (3) | `rgba(0,0,0,0.05) 0px 4px 24px` | Provider cards, modals, nav on scroll |
| Lifted (4) | `rgba(0,0,0,0.12) 0px 8px 32px` | Lightbox, active dropdowns |

**Depth philosophy**: Elevation comes from warm ring shadows and background color shifts, not heavy drop shadows. A photo card gains depth via a barely-visible ring; the lightbox gains depth via a near-black backdrop. Never stack multiple drop shadows.

---

## 7. Dark Mode

PhotoFuse supports a dark mode for low-light photo reviewing.

```
Page background:    #141413 (Deep Dark)
Card surfaces:      #30302e (Dark Surface)
Text primary:       #faf9f5 (Ivory)
Text secondary:     #b0aea5 (Warm Silver)
Text tertiary:      #87867f (Stone Gray)
Borders:            #30302e (Border Dark)
Nav background:     rgba(20,20,19,0.85) with backdrop-blur: 12px
Terracotta:         Unchanged (#c96442) — remains the primary CTA
```

The masonry grid renders identically in dark mode — the photos provide all the visual richness; the dark background simply frames them better for photo review sessions.

---

## 8. Responsive Breakpoints

| Name | Width | Key changes |
|------|-------|-------------|
| Mobile | < 640px | 2-col masonry, hamburger nav, stacked provider cards |
| Tablet | 640–1024px | 3-col masonry, 2-col provider grid, condensed nav |
| Desktop | > 1024px | 4–5 col masonry, 3-col provider grid, full nav |

**Touch targets**: Minimum 44×44px for all interactive elements.

---

## 9. Quick Reference for AI Agents

### Color Quick Picks
```
Page background:    Parchment (#f5f4ed)
Card surface:       Ivory (#faf9f5)
Primary text:       Near Black (#141413)
Secondary text:     Olive Gray (#5e5d59)
Muted text:         Stone Gray (#87867f)
Primary CTA:        Terracotta Brand (#c96442)
Borders (light):    Border Cream (#f0eee6)
Dark surface:       Dark Surface (#30302e)
```

### Prompt Examples
- "Create the PhotoFuse dashboard on Parchment (#f5f4ed). The main content is a masonry photo grid using 4 columns with 16px gap. Each photo card has 12px border-radius and a ring shadow (0px 0px 0px 1px rgba(0,0,0,0.08)). On hover show a near-black overlay with the photo title in Ivory at 15px Georgia w500."
- "Design a Connect Provider card on Ivory (#faf9f5) with a 1px solid #f0eee6 border and 16px radius. Provider logo at 48px. Provider name in Georgia 20px w500 Near Black. Description in Olive Gray at 14px. Full-width Terracotta (#c96442) connect button at the bottom."
- "Build the PhotoFuse nav bar with parchment-tinted glass background (rgba(245,244,237,0.85)), backdrop-blur 12px, 1px solid #f0eee6 bottom border, 64px height. Logo in Georgia 18px w500 Near Black. Links in Olive Gray (#5e5d59). Terracotta CTA button right-aligned."
- "Create a provider status badge for 'Connected' state: pill shape (radius 99px), sage-tinted background (rgba(90,122,90,0.12)), Success Sage (#5a7a5a) text and border, 12px system-ui w500."

### Do's
- Use Parchment (`#f5f4ed`) as the page background — it frames photos beautifully
- Keep UI chrome quiet so photos are the star of every screen
- Use Georgia at weight 500 for section headings — gives a curated-gallery feel
- Use Terracotta only for the primary action — one brand moment per screen
- Apply ring shadows (`0px 0px 0px 1px`) on photo cards instead of drop shadows
- Use pills (`border-radius: 9999px`) for all provider status badges
- Maintain 16px minimum gap between masonry columns on desktop

### Don'ts
- Don't use cool blue-grays — every neutral must have a warm, yellow-brown undertone
- Don't use pure white (`#ffffff`) as a page background — use Parchment or Ivory
- Don't apply heavy drop shadows to photo cards — the photos need to breathe
- Don't use more than one Terracotta element per screen section
- Don't use sans-serif for page titles — Georgia carries the editorial personality
- Don't reduce masonry gap below 8px on any breakpoint
- Don't use sharp corners (< 6px) on any card or button — softness is core to the identity
