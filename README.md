# Lucky Breaks - Trading Card Breaks Website

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Python](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat&logo=githubactions&logoColor=white)
![eBay](https://img.shields.io/badge/eBay_Scraper-E53238?style=flat&logo=ebay&logoColor=white)
![License](https://img.shields.io/badge/License-Private-lightgrey?style=flat)
![Status](https://img.shields.io/badge/Status-Active-00ff88?style=flat)
[![Demo](https://img.shields.io/badge/Live_Demo-Visit_Site-7c3aed?style=flat&logo=githubpages&logoColor=white)](https://supergokou.github.io/jimstore/)

A dark-themed, mobile-responsive landing page and inventory browser for **Lucky Breaks**, a trading card break business based in Vancouver, WA. The site captures emails for VIP early access, displays upcoming breaks, showcases live eBay inventory (auto-scraped every 2 hours), runs a weekly giveaway, and features community social proof via a Facebook engagement bar.

---

## Table of Contents

- [Live Features](#live-features)
- [Project Structure](#project-structure)
- [Pages](#pages)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [eBay Inventory Scraper](#ebay-inventory-scraper)
- [GitHub Actions (Automated Scraping)](#github-actions-automated-scraping)
- [JavaScript Modules](#javascript-modules)
- [CSS Architecture](#css-architecture)
- [Forms and Email Capture](#forms-and-email-capture)
- [Like Feature and Registration](#like-feature-and-registration)
- [Data Files](#data-files)
- [Responsive Breakpoints](#responsive-breakpoints)
- [Deployment](#deployment)
- [Future Work](#future-work)

---

## Live Features

1. **Top Announcement Bar** - Fixed bar above the header showing Facebook social proof (2.0K likes, 2.1K followers), a clickable like button with email-gated registration, a followers link to the Facebook group, and a "JOIN" pill button.
2. **VIP Email Capture (Hero)** - Full-width hero section with email signup form for 24-hour early access to breaks.
3. **Upcoming Breaks** - Card grid showing scheduled breaks with spot counts, progress bars, pricing, and a modal-based registration system.
4. **eBay Inventory Preview** - Shows the 6 most recent eBay listings on the landing page with a "View All Inventory" link to the dedicated inventory page.
5. **Full Inventory Page** - Standalone page (`inventory.html`) displaying all scraped eBay listings with a last-updated timestamp.
6. **Weekly Giveaway** - Giveaway section with a featured card image, entry form, and details (drawn every Sunday on Facebook Live).
7. **Like Button** - Interactive like button in the top bar. First-time users must register with name + email (stored in localStorage). After registration, the like toggles freely and their name appears next to the follower count.
8. **Newsletter Footer** - Secondary email capture in the footer for break schedules, restock alerts, and deals.

---

## Project Structure

```
jimStore/
├── .github/
│   └── workflows/
│       └── scrape.yml          # GitHub Actions workflow (runs every 2h)
├── css/
│   └── styles.css              # All styles (single file, mobile-first responsive)
├── js/
│   ├── app.js                  # Landing page logic (breaks, modals, forms, inventory preview)
│   ├── inventory.js            # Inventory page logic (full listing grid, timestamp)
│   └── likes.js                # Shared like button logic (registration, localStorage, UI)
├── data/
│   └── inventory.json          # Auto-generated eBay listings data
├── img/
│   └── logo.png                # Site logo (header + footer)
├── index.html                  # Landing page (hero, breaks, inventory preview, giveaway)
├── inventory.html              # Full inventory page (all eBay listings)
├── giveaway.html               # Giveaway page (past winners, entry)
├── scraper.py                  # eBay scraper script (Python + BeautifulSoup)
├── requirements.txt            # Python dependencies (requests, beautifulsoup4)
├── package.json                # Project metadata
├── .gitignore                  # Ignored files
└── README.md                   # This file
```

---

## Pages

### `index.html` - Landing Page

The main page with all core sections:

| Section | Description |
|---|---|
| **Top Bar** | Fixed bar with Facebook likes (interactive), followers (links to FB group), descriptive text, and JOIN button |
| **Header** | Fixed navigation with logo, links (Breaks, Inventory, Giveaway), and VIP CTA button |
| **Hero** | Email capture form, community stats (14K+ members, 4.9/5 rating), and a showcase card with pulled-value stats |
| **Upcoming Breaks** | Grid of break cards with category badges, scheduling, pricing, spot availability progress bars, and registration buttons |
| **Inventory Preview** | 6-item preview grid from eBay store with "View All Inventory (N)" button linking to the inventory page |
| **Weekly Giveaway** | Featured card with glow effects, entry form, prize details, and fine print |
| **Footer** | Newsletter signup, about text, social links, quick links, contact info, and break hours |
| **Break Registration Modal** | Email capture modal triggered when clicking "Lock Spot" on a break card |
| **Like Registration Modal** | Name + email modal triggered when an unregistered user clicks the like button |

### `inventory.html` - Full Inventory Page

Standalone page with:
- Same top bar and header (Inventory nav link highlighted)
- Full grid of all eBay listings from `data/inventory.json`
- `lastUpdated` timestamp displayed below the section title
- Same footer with newsletter form
- Like registration modal

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Vanilla HTML, CSS, JavaScript (no frameworks) |
| **Fonts** | Google Fonts - Inter (body) + Oswald (display/headings) |
| **Icons** | Inline SVGs (no icon library dependency) |
| **Scraper** | Python 3.12 + BeautifulSoup4 + curl (fallback: requests) |
| **Automation** | GitHub Actions (cron every 2 hours) |
| **Storage** | localStorage (like state, user registration) |
| **Hosting** | Static site (GitHub Pages or any static host) |

---

## Getting Started

### Prerequisites

- A web browser (for viewing the site)
- Python 3.10+ (only if running the scraper locally)
- A local HTTP server (the site fetches `data/inventory.json` via fetch, so `file://` won't work)

### Run Locally

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd jimStore
   ```

2. Start a local server:
   ```bash
   # Python
   python -m http.server 8000

   # Or Node.js (npx)
   npx serve .
   ```

3. Open `http://localhost:8000` in your browser.

### Run the Scraper Locally

1. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Run the scraper:
   ```bash
   python scraper.py
   ```

3. This writes/updates `data/inventory.json` with current eBay store listings.

---

## eBay Inventory Scraper

**File:** `scraper.py`

The scraper fetches active listings from the Lucky Breaks eBay store (`cardscards.com` seller) and outputs structured JSON.

### How It Works

1. **Fetches HTML** from the eBay store search page using `curl` (or falls back to Python `requests`)
2. **Parses listings** using BeautifulSoup, extracting:
   - Title (cleaned of eBay UI noise like "New Listing" prefix, "Opens in a new window" suffix)
   - Price
   - Image URL (upgraded from thumbnail `s-l140`/`s-l225` to larger `s-l500`)
   - Link (cleaned of eBay tracking parameters, keeping only `hash` and `item`)
3. **Writes JSON** to `data/inventory.json` with a UTC `lastUpdated` timestamp
4. **Safety:** If no listings are found (e.g., eBay changes layout), it keeps the existing data file untouched

### eBay Store URL

```
https://www.ebay.com/sch/i.html?_ssn=cardscards.com&_oac=1
```

### Output Format

```json
{
  "listings": [
    {
      "title": "2025 Topps Cosmic Chrome Paul Skenes #100 Orange Galactic /25 Pirates",
      "price": "$350.00",
      "image": "https://i.ebayimg.com/images/g/.../s-l500.jpg",
      "link": "https://www.ebay.com/itm/157596776416?hash=item24b17ff7e0"
    }
  ],
  "lastUpdated": "2026-03-03T12:00:00+00:00"
}
```

---

## GitHub Actions (Automated Scraping)

**File:** `.github/workflows/scrape.yml`

The scraper runs automatically via GitHub Actions:

| Setting | Value |
|---|---|
| **Schedule** | Every 2 hours (`0 */2 * * *`) |
| **Manual trigger** | Supported via `workflow_dispatch` |
| **Python version** | 3.12 |
| **Runner** | `ubuntu-latest` |
| **Permissions** | `contents: write` (to push updated JSON) |

### Workflow Steps

1. Checkout repository
2. Set up Python 3.12
3. Install dependencies from `requirements.txt`
4. Run `python scraper.py`
5. Stage `data/inventory.json`, commit if changed, and push

The commit is authored by `github-actions[bot]` with the message "Update eBay inventory".

---

## JavaScript Modules

### `app.js` - Landing Page

Loaded only on `index.html`. Handles:

| Feature | Details |
|---|---|
| **Break cards** | Renders the `BREAKS` array into a responsive card grid with category badges, HOT indicators, pricing, spot progress bars, and action buttons |
| **Break registration modal** | Opens on "Lock Spot" click, captures email, shows success state, auto-closes after 3 seconds |
| **VIP form** | Hero email capture, hides form and shows success message on submit |
| **Giveaway form** | Email capture for weekly giveaway entry |
| **Footer newsletter** | Email capture in footer |
| **Inventory preview** | Fetches `data/inventory.json`, renders first 6 items, appends "View All Inventory (N)" button if more exist |

Break data is currently hardcoded in the `BREAKS` array at the top of the file. Each break has:
- `id`, `title`, `category`, `date`, `spots`, `spotsLeft`, `price`, `soldOut`, `hot`

### `inventory.js` - Full Inventory Page

Loaded only on `inventory.html`. Handles:

| Feature | Details |
|---|---|
| **Full inventory grid** | Fetches `data/inventory.json` and renders ALL listings |
| **Timestamp** | Displays `lastUpdated` from the JSON in a human-readable format (e.g., "Last updated: Monday, March 3, 2026, 12:00 PM") |
| **Loading state** | Shows spinner while fetching |
| **Error state** | Shows fallback message with link to eBay store if fetch fails |
| **Footer newsletter** | Same newsletter form handler as the landing page |

### `likes.js` - Like Button (Shared)

Loaded on both pages. Self-contained IIFE. Handles:

| Feature | Details |
|---|---|
| **Like button** | Clickable heart + count in the top announcement bar |
| **Registration gate** | First click opens a modal requiring name + email |
| **localStorage keys** | `lb_like_email` (email), `lb_like_name` (name), `lb_liked` (like state) |
| **Like count** | Base count of 2,000 + 1 if the current user has liked |
| **Follower name** | After registration, the user's name appears in green next to the follower count |
| **Toggle** | Registered users can toggle like on/off freely without the modal |
| **Modal** | Auto-closes 2.5 seconds after successful registration |

---

## CSS Architecture

**File:** `styles.css` (single file, ~1300 lines)

### Design System

| Token | Value |
|---|---|
| `--color-bg` | `#0a0a0f` (near-black) |
| `--color-bg-alt` | `#0d0d18` (slightly lighter) |
| `--color-surface` | `#13131f` (card backgrounds) |
| `--color-green` | `#00ff88` (primary accent, CTAs) |
| `--color-purple` | `#7c3aed` (secondary accent) |
| `--color-pink` | `#ff3366` (hot badges, giveaway, likes) |
| `--color-text` | `#f0f0f5` (primary text) |
| `--color-text-muted` | `#8888aa` (secondary text) |
| `--color-text-dim` | `#555570` (tertiary text) |
| `--font-display` | Oswald (headings, prices, stats) |
| `--font-body` | Inter (body text, UI) |
| `--radius` | `10px` / `14px` (lg) / `9999px` (pill) |

### Key Style Sections

- **Top Bar** - Fixed gradient bar (40px height, z-index 101), interactive like button with hover/active states, follower link, responsive text hiding
- **Header** - Fixed nav (z-index 100, top: 40px to sit below the top bar), glassmorphism background with backdrop blur
- **Hero** - Gradient glow effects, two-column layout on desktop, stacked on mobile
- **Breaks** - Card grid with hover lift, progress bars, sold-out states
- **Inventory** - Card grid with image aspect-ratio 1:1, price badges, hover effects
- **Giveaway** - Gradient background with animated border lines, card glow effects
- **Modals** - Overlay with backdrop blur, slide-in animation, form + success states
- **Footer** - Newsletter bar, 4-column grid, contact items with icons

---

## Forms and Email Capture

All forms log submissions to the browser console. There is no backend connected yet.

| Form | Location | Log Tag | Captures |
|---|---|---|---|
| VIP signup | Hero section | `[VIP Signup]` | Email |
| Break registration | Modal (from break card) | `[Break Registration]` | Email + break name |
| Giveaway entry | Giveaway section | `[Giveaway Entry]` | Email |
| Newsletter | Footer | `[Newsletter Signup]` | Email |
| Like registration | Like modal (top bar) | `[Like Registration]` | Email + name |

To connect a backend, replace the `console.log` calls with `fetch()` requests to your API endpoint.

---

## Like Feature and Registration

### User Flow

1. User clicks the heart/like area in the top announcement bar
2. If **not registered** (no `lb_like_email` in localStorage): a modal opens asking for name and email
3. User submits the form: email and name are saved to localStorage, the like is applied, and the modal auto-closes
4. The heart icon fills with pink, the count updates from "2.0K" to "2.0K" (base 2000 + 1), and the user's name appears in green next to the followers count
5. On **subsequent visits**: the like state and name persist. Clicking the heart toggles the like on/off without the modal

### localStorage Keys

| Key | Value | Purpose |
|---|---|---|
| `lb_like_email` | User's email | Tracks registration status |
| `lb_like_name` | User's name | Displayed next to follower count |
| `lb_liked` | `"1"` or absent | Like toggle state |

---

## Data Files

### `data/inventory.json`

Auto-generated by the scraper. Contains:

```json
{
  "listings": [ ... ],
  "lastUpdated": "ISO 8601 timestamp"
}
```

Each listing object:

| Field | Type | Description |
|---|---|---|
| `title` | string | Cleaned listing title |
| `price` | string | Formatted price (e.g., "$199.99") |
| `image` | string | eBay image URL (500px size) |
| `link` | string | Clean eBay listing URL |

This file is committed to the repo by GitHub Actions and served as static JSON. Both `app.js` and `inventory.js` fetch it at runtime.

---

## Responsive Breakpoints

The site uses a mobile-first approach with four breakpoints:

| Breakpoint | Changes |
|---|---|
| **< 480px** (default) | Single column grids, stacked forms, top bar hides descriptive text |
| **480px+** | Break cards: 2 columns, inventory cards: 2 columns |
| **640px+** | Forms go horizontal, giveaway section goes side-by-side, footer newsletter goes row |
| **768px+** | Header nav visible, hero goes two-column with showcase, inventory: 3 columns, section headers go row layout, footer: 2-column grid |
| **1024px+** | Hero padding increases, break cards: 4 columns, footer: 4-column grid |

---

## Deployment

The site is fully static and can be deployed to any static hosting:

- **GitHub Pages** - Push to `main` branch, enable Pages in repo settings
- **Netlify / Vercel** - Connect repo, deploy with no build step
- **Any web server** - Upload all files, serve from root

The only requirement is that the server serves `data/inventory.json` as a static file (no CORS issues for same-origin fetches).

---

## Future Work

This section is a placeholder for upcoming features. Development is ongoing.

<!-- Add planned features here as they are decided -->
