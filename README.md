# AVA Executive Services — Production Website

Premium corporate & personal executive services website for Thailand.

## File structure

```
ava-website/
├── index.html                 # Home
├── css/
│   └── styles.css             # Design system & all styles
├── js/
│   └── main.js                # Navigation, form handling, reveals
├── images/
│   └── logo.png               # Brand logo
├── pages/
│   ├── about.html
│   ├── services.html
│   ├── private-client.html
│   ├── aviation.html
│   ├── how-it-works.html
│   ├── contact.html
│   ├── privacy.html
│   ├── terms.html
│   └── service-policy.html
├── robots.txt
├── sitemap.xml
└── README.md
```

## Setup (local)

1. Serve the folder with any static server, e.g.:
   ```bash
   npx serve .
   # or
   python3 -m http.server 8080
   ```
2. Open `http://localhost:8080` (or the port shown).

No build step is required. All assets are plain HTML, CSS and JavaScript.

## Deployment

Deploy the entire `ava-website` folder to any static host:

- **Netlify / Vercel / Cloudflare Pages**: drag-and-drop or connect the repo; set publish directory to the root of this folder.
- **Traditional hosting**: upload via SFTP/rsync to the web root.
- **Custom domain**: point DNS to the host and update the canonical URLs / Open Graph / sitemap to the live domain.

### Form submission (production)

The contact form currently simulates a successful submission. For production, replace the simulated `await` in `js/main.js` with a real endpoint:

- **Formspree**: `fetch("https://formspree.io/f/YOUR_ID", { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } })`
- **Netlify Forms**: add `netlify` attribute to the `<form>` and a hidden `form-name` input.
- **Custom API**: POST JSON to your backend.

## Environment variables

None required for the static site. If you add a form backend, store API keys only on the server side.

## Editable content areas

| Area | Location |
|------|----------|
| Package prices & service names | `pages/services.html` (service-item blocks) |
| Path Assessment price & bullets | `index.html` (assessment-box) |
| Hero headline / subheadline | `index.html` (hero section) |
| Process steps | `pages/how-it-works.html` |
| Legal text | `pages/privacy.html`, `terms.html`, `service-policy.html` |
| Brand colours / typography | `css/styles.css` (`:root` variables) |
| Logo | `images/logo.png` |

## Design system (CSS variables)

- Navy: `--navy-900` / `--navy-950`
- Gold: `--gold-500` / `--gold-400`
- Ivory: `--ivory-50` / `--ivory-100`
- Fonts: Cormorant Garamond (display), Inter (body)

## Browser support

Modern evergreen browsers (Chrome, Firefox, Safari, Edge). CSS uses custom properties, Grid and Flexbox.

## Recommended future improvements

1. Connect the contact form to a real endpoint and add server-side validation.
2. Add a CMS or structured data file for service prices so non-developers can update them.
3. Implement analytics (privacy-respecting) and conversion tracking on the consultation form.
4. Add Open Graph images generated from the brand.
5. Optional: multi-language (Thai/English) with language switcher.
6. Performance: self-host Google Fonts or use `font-display: swap` (already applied) and optimise Unsplash images via a CDN.
7. Accessibility audit with axe or Lighthouse and address any residual contrast or focus issues.
8. Add a simple blog/regulatory-watch section for SEO content as described in the business plan.

## Notes

- No fake testimonials, awards, client logos or invented statistics are present.
- All pricing matches the management document (THB, exclusive of VAT unless stated).
- Service Policy and disclaimer language follow the operating guide.
- Images are loaded from Unsplash; replace with owned photography for full brand control.