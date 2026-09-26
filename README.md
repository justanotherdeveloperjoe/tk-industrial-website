<div align="center">

# TK Industrial

**Metal mecánico a gran escala**<br>
One-page marketing site for a Nuevo León manufacturer with 20+ years in metal stamping, Metal-FAB, wire products and machining.

<br>

[![Live site](https://img.shields.io/badge/View_live_site-→-6b8e3d?style=for-the-badge)](https://justanotherdeveloperjoe.github.io/tk-industrial-website/)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css&logoColor=white)
![JavaScript](https://img.shields.io/badge/Vanilla_JS-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-222222?style=flat-square&logo=githubpages&logoColor=white)
![No build step](https://img.shields.io/badge/build_step-none-6b8e3d?style=flat-square)

<br>

<img src="docs/preview.jpg" alt="TK Industrial website on desktop and mobile" width="100%">

</div>

<br>

## <img src="docs/icons/factory.svg" width="24" height="24" align="top" alt=""> At a glance

| | |
|---|---|
| **Client** | TK Industrial, with plants in Apodaca and Ciénega de Flores, N.L. |
| **Services shown** | Stamping (60–800 Ton) · Metal-FAB · Wire products · Machining |
| **Language** | Spanish |
| **Sections** | Hero · Nosotros · Procesos · Ingeniería & herramientas · Industrias · Galería · Contacto |

## <img src="docs/icons/sparkles.svg" width="24" height="24" align="top" alt=""> Features

| | |
|---|---|
| <img src="docs/icons/clapperboard.svg" width="18" height="18" align="top" alt=""> **Hero video + parallax** | The client's real plant footage drifts on scroll. It falls back to a poster photo when the video can't play and saves battery on mobile. |
| <img src="docs/icons/loader.svg" width="18" height="18" align="top" alt=""> **Safe preloader** | Hides as soon as the page loads, and never for more than 3.5 s even if an image stalls. |
| <img src="docs/icons/compass.svg" width="18" height="18" align="top" alt=""> **Frosted nav + scrollspy** | Scroll progress bar, and the nav highlights the section you're reading. |
| <img src="docs/icons/film.svg" width="18" height="18" align="top" alt=""> **Scroll reveals** | Staggered entrances, plus counters that count the key metrics up on first view. |
| <img src="docs/icons/images.svg" width="18" height="18" align="top" alt=""> **Gallery lightbox** | Full-size photos, with a soft fade-in so nothing pops. |
| <img src="docs/icons/message-circle.svg" width="18" height="18" align="top" alt=""> **Contact** | Sticky Cotizar / WhatsApp bar, phone link, and a form that opens the visitor's mail client. |
| <img src="docs/icons/accessibility.svg" width="18" height="18" align="top" alt=""> **Reduced motion** | Every animation respects `prefers-reduced-motion`. |

## <img src="docs/icons/rocket.svg" width="24" height="24" align="top" alt=""> Run locally

No install, no build. Open `index.html`, or serve the folder:

```bash
python3 -m http.server 8000
```

## <img src="docs/icons/folder-tree.svg" width="24" height="24" align="top" alt=""> Project structure

```
index.html     Page markup (Spanish) + SEO / Open Graph meta
styles.css     All styles
script.js      Interactions: vanilla JS, no dependencies
img/           Logos, certifications, process and product photos
video/         Hero footage (tkvideo.mp4); poster is img/tk-hero-poster.jpg
docs/          README preview
```

## <img src="docs/icons/globe.svg" width="24" height="24" align="top" alt=""> Deployment

Hosted on **GitHub Pages** from `main`. Every push redeploys it.

> [!NOTE]
> If the site moves to its own domain, update `og:url` in `index.html`.
