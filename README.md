# TK Industrial — Website

One-page marketing site for **TK Industrial**, a metal manufacturer in Nuevo León, México: metal stamping (60–800 Ton), Metal-FAB, wire products and machining, with plants in Apodaca and Ciénega de Flores.

**Live site:** https://justanotherdeveloperjoe.github.io/tk-industrial-website/

Plain HTML, CSS and JavaScript. No framework, no build step, no dependencies.

## Sections

Hero (the client's plant footage) · Nosotros · Procesos · Ingeniería & herramientas · Industrias · Galería · Contacto

## Features

- **Hero video with parallax.** The plant footage drifts on scroll, falls back to a poster photo when the video can't play, and saves battery on mobile.
- **Preloader.** It hides as soon as the page loads and never hangs for more than 3.5 s, even if an image stalls.
- **Frosted nav + scroll progress bar**, with scrollspy that highlights the section you're reading.
- **Staggered scroll reveals** and **animated counters** that count the key metrics up on first view.
- **Gallery lightbox** and soft image fade-in, so photos don't pop in.
- **Contact form** that opens the visitor's mail client, plus WhatsApp and phone buttons.
- **Reduced motion:** every animation respects `prefers-reduced-motion`.

## Project structure

```
index.html     Page markup (Spanish) + SEO / Open Graph meta
styles.css     All styles
script.js      Interactions (vanilla JS, no deps)
img/           Logos, certifications, process and product photos
video/         Hero footage (tkvideo.mp4) — poster is img/tk-hero-poster.jpg
```

## Running locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

## Deployment

Hosted on **GitHub Pages** from `main`. Every push redeploys it. If the site moves to its own domain, update `og:url` in `index.html`.
