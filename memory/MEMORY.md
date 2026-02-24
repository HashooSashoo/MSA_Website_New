# MSA Website Memory

## Project Overview
Rice Muslim Student Association website. Main files:
- `index.html` — homepage
- `html/` — subpages (resources, events, about, etc.)
- `articles/` — article pages (e.g. `articles/halal-eats/`)
- `css/styles-new.css` — single global stylesheet
- `js/script-new.js` — main JS (dark mode, admin login, mobile menu)
- `js/prayer-times-header.js` — prayer times widget

## Key CSS Variables (styles-new.css :root)
- `--font-primary`: 'Jeju Myeongjo', serif
- `--font-secondary`: 'Alexandria', sans-serif
- `--color-black` / `--color-white` — theme-aware (dark mode swaps them)
- `--color-gray-text`: #333333
- `--color-quote-bg`: #ECECEC
- `--color-green`: #2d5a27
- `--color-green-light`: #4a7c42
- `--color-gold`: #c9a84c
- `--color-contact-button`: #FF7E7E
- `--color-donate-button`: #93CBF8
- `--color-footer-bg`: #93CBF8

## Article Page Template
See `articles/halal-eats/index.html` as the canonical example.

**Structure of every article page:**
1. Standard site header (copy from any html/ page, adjusting `../../` paths)
2. `.halal-article-hero` — green hero banner with:
   - `.halal-article-byline-tag` — category tag (e.g. "Food & Drink")
   - `.halal-article-hero-title` — article title
   - `.halal-article-hero-meta` with:
     - `.halal-meta-author` — "By [Name]"
     - `.halal-meta-dates` — "Published: [date] · Last edited: [date]"
   - `.halal-article-divider` with gold dot
3. `<section class="halal-article-section">` wrapping:
   - `<a class="article-back-link">` — back to Resources
   - `.halal-intro` — centered intro block with `.halal-salam` + paragraph
   - Numbered meal/section blocks: `.halal-meal-section` > `.halal-meal-header` + `.halal-meal-content`
     - `.halal-meal-number` (01, 02…), `.halal-meal-title-block` > `h2` + `.halal-meal-line`
     - `.halal-meal-content` (normal) or `.halal-meal-content halal-meal-content-reverse` (image on left)
     - `.halal-meal-text` + `.halal-meal-image` (with `<img>`)
   - `.halal-section-sep` `<hr>` between sections
   - `.halal-closing` — rounded quote-box-style closing with `.halal-sign-off`
4. Standard site footer

**Images** go in `articles/[slug]/images/` and are referenced as `images/imageN.jpg`.

**All article CSS** lives in the `HALAL EATS ARTICLE` section of `styles-new.css` (~line 1822).
These classes are reusable for future articles — just copy the HTML structure.

## Resource Cards (html/resources.html)
- Cards live in `.resource-cards` > `.resource-card` (anchor tags)
- Card image: `.resource-card-image` > `<img>` (440px tall)
- Card text: `.resource-card-content` > `.resource-card-title` + `.resource-card-description`
- `.resource-card-description` format: `Last Updated: [date]<br>By [Author]`
- Card 1 links to `../articles/halal-eats/halaleats.html`
- Cards 2 and 3 are placeholder

## Article Tags
- Tags are set via `.halal-article-byline-tag` in the hero
- Current tags in use: "Food & Drink"
- Tag-based filtering on resources.html is planned but not yet implemented

## Admin Login
- Triggered by holding M+S+A for 5 seconds
- Password: stored in `js/script-new.js`
- Password field has show/hide toggle button; password text is white
- Admin label shows bottom-left when logged in; click to log out

## User Preferences
- No auto-commits unless explicitly asked
- Keep solutions minimal — don't add features beyond what's asked
