# Portfolio — Sample Site

A fast, responsive, single-page portfolio built with plain **HTML, CSS, and JavaScript**.
No build step, no framework, no dependencies to install.

## Preview

```bash
xdg-open index.html
```

Or, if you use VS Code, right-click `index.html` → **Open with Live Server**.

## Files

| File | What it does |
| --- | --- |
| `index.html` | Page structure and content |
| `styles.css` | Theme tokens, layout, responsive rules, animations |
| `script.js` | Theme toggle, mobile menu, scroll reveal, active nav, footer year |

## Customize

Everything is placeholder content — replace it with your own.

### 1. Your identity
In `index.html`:
- `<title>` and `<meta name="description">`
- `.brand-text` (the `jeremie.dev` logo text)
- `<h1>` in the hero
- `.hero-sub`, `.hero-stats`
- `.about-text` and `.about-facts`

### 2. Links
Search for these and swap them:
- `jeremiecaspillo16@gmail.com` → your email
- `https://github.com/Jem4y` → your GitHub
- `https://www.linkedin.com/` → your LinkedIn
- `resume.pdf` → drop a PDF named `resume.pdf` next to `index.html`,
  or delete the "Download résumé" button. (A placeholder `resume.pdf` is
  already included so the link isn't broken.)

### 3. Projects
Each `<article class="project-card">` contains a title, description, tags
(`.chips`), and a link. Replace the four samples with your own. The colored
thumbnail gradients are defined in `styles.css` as `.project-thumb--one` …
`.project-thumb--four`.

### 4. Theme colors
Open `styles.css` and edit the CSS variables at the top:
- `--accent`, `--accent-2`, `--accent-3` — the gradient colors
- `--bg`, `--text`, etc. — base palette (both dark and light blocks)

### 5. Add a section
Copy any `<section class="section container">` block. Add a matching link in
`.nav-links` and the scroll-spy will pick it up automatically (it watches every
`.nav-links > a[href^='#']` whose target exists).

## Features

- Dark / light theme toggle, saved to `localStorage` and respecting
  `prefers-color-scheme` on first visit
- Responsive layout (desktop → tablet → mobile) with an animated mobile menu
- Scroll-reveal animations via `IntersectionObserver`
- Active navigation link highlighting
- Keyboard-friendly: skip link, visible focus rings, `Escape` closes the menu
- Respects `prefers-reduced-motion`
- Sensible print styles

## Notes

- Fonts are loaded from Google Fonts. Offline, the site falls back to system
  fonts and still looks fine.
- No analytics, no tracking, no external scripts.
