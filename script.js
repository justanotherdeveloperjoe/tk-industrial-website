/* ═══════════════════════════════════════════════════════════
   TK INDUSTRIAL — interactions
   Preloader · Scroll reveal · Counters · Lightbox · Scrollspy
   Parallax · Progress bar · Back-to-top  (vanilla JS, no deps)
═══════════════════════════════════════════════════════════ */
"use strict";

const prefersReducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ═══ PRELOADER ═══ */
const preloader = document.getElementById("preloader");
function hidePreloader() {
  if (!preloader || preloader.classList.contains("done")) return;
  preloader.classList.add("done");
  setTimeout(() => preloader.remove(), 700);
}
window.addEventListener("load", () => setTimeout(hidePreloader, 400));
setTimeout(hidePreloader, 3500); // never trap the user if an image stalls

/* ═══ NAV — frosted on scroll + scroll progress bar ═══ */
const nav = document.getElementById("nav");
const progressBar = document.getElementById("scrollProgress");
const backToTop = document.getElementById("backToTop");

function onScroll() {
  const y = scrollY;
  nav.classList.toggle("scrolled", y > 40);
  if (backToTop) backToTop.classList.toggle("show", y > 700);
  if (progressBar) {
    const max = document.documentElement.scrollHeight - innerHeight;
    progressBar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
  }
}
addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ═══ MOBILE MENU ═══ */
const toggle = document.getElementById("navToggle");
const links = document.getElementById("navLinks");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
links.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }
});

/* ═══ SCROLLSPY — highlight the section you're reading ═══ */
const sections = document.querySelectorAll("section[id], header[id]");
const navAnchors = document.querySelectorAll(".nav-links a[href^='#']");
const spy = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navAnchors.forEach((a) =>
      a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id)
    );
  });
}, { rootMargin: "-45% 0px -50% 0px" });
sections.forEach((s) => spy.observe(s));

/* ═══ HERO VIDEO — graceful fallbacks + battery-friendly ═══ */
const heroVideo = document.getElementById("heroVideo");
if (heroVideo) {
  if (prefersReducedMotion) {
    heroVideo.remove(); // poster / background photo takes over
  } else {
    const source = heroVideo.querySelector("source");
    (source || heroVideo).addEventListener("error", () => heroVideo.remove());
    // pause when scrolled out of view
    new IntersectionObserver(([entry]) => {
      if (!heroVideo.isConnected) return;
      if (entry.isIntersecting) heroVideo.play().catch(() => {});
      else heroVideo.pause();
    }).observe(heroVideo);
  }
}

/* ═══ HERO PARALLAX — video (or photo fallback) drifts on scroll ═══ */
const hero = document.getElementById("inicio");
if (hero && !prefersReducedMotion) {
  addEventListener("scroll", () => {
    const y = scrollY;
    if (y >= innerHeight) return;
    if (heroVideo && heroVideo.isConnected) {
      heroVideo.style.transform = `translateY(${y * 0.22}px) scale(1.12)`;
    } else {
      hero.style.backgroundPositionY = `calc(50% + ${y * 0.35}px)`;
    }
  }, { passive: true });
}

/* ═══ SCROLL REVEAL — staggered entrances ═══ */
const revealSelector = [
  ".section-title", ".section-sub",
  ".about-img", ".about-block", ".metrics", ".cert-card",
  ".process-card", ".eng-img", ".eng-list li",
  ".industry-card", ".gallery-item", ".gallery-more",
  ".cta-banner h2", ".cta-banner p", ".cta-banner .btn",
  ".contact-block", ".contact-form",
].join(", ");

const revealEls = document.querySelectorAll(revealSelector);
if (prefersReducedMotion) {
  // no-op: elements stay visible
} else {
  // stagger siblings that reveal together inside the same parent
  const byParent = new Map();
  revealEls.forEach((el) => {
    el.classList.add("reveal");
    const group = byParent.get(el.parentElement) || [];
    group.push(el);
    byParent.set(el.parentElement, group);
  });
  byParent.forEach((group) => {
    group.forEach((el, i) => { el.style.transitionDelay = `${Math.min(i * 90, 540)}ms`; });
  });

  const revealer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        revealer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
  revealEls.forEach((el) => revealer.observe(el));
}

/* ═══ ANIMATED COUNTERS — metrics count up on first view ═══ */
function animateCounter(el) {
  const original = el.textContent.trim();
  const duration = 1800;
  const start = performance.now();
  function frame(now) {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
    // rebuild the string, scaling every number in it (handles "79%", "60–800")
    el.textContent = original.replace(/\d+/g, (n) => Math.round(Number(n) * eased));
    if (t < 1) requestAnimationFrame(frame);
    else el.textContent = original;
  }
  requestAnimationFrame(frame);
}

const counters = document.querySelectorAll(".metric-value");
if (prefersReducedMotion) {
  // leave final values as-is
} else {
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        countObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });
  counters.forEach((c) => countObserver.observe(c));
}

/* ═══ IMAGE FADE-IN — photos ease in once loaded, no pop ═══ */
document
  .querySelectorAll(".process-img img, .gallery-item img, .industry-card img, .about-img img, .eng-img img, .cert-card img")
  .forEach((img) => {
    img.classList.add("img-fade");
    if (img.complete && img.naturalWidth) img.classList.add("loaded");
    else img.addEventListener("load", () => img.classList.add("loaded"), { once: true });
  });

/* ═══ GALLERY LIGHTBOX ═══ */
const galleryImgs = Array.from(document.querySelectorAll(".gallery-item img"));
if (galleryImgs.length) {
  const lb = document.createElement("div");
  lb.className = "lightbox";
  lb.setAttribute("role", "dialog");
  lb.setAttribute("aria-label", "Galería ampliada");
  lb.innerHTML = `
    <button class="lb-close" aria-label="Cerrar">&times;</button>
    <button class="lb-prev" aria-label="Anterior">&#10094;</button>
    <img class="lb-img" alt="" />
    <button class="lb-next" aria-label="Siguiente">&#10095;</button>
    <div class="lb-caption"></div>`;
  document.body.appendChild(lb);

  const lbImg = lb.querySelector(".lb-img");
  const lbCaption = lb.querySelector(".lb-caption");
  let current = 0;

  function show(i) {
    current = (i + galleryImgs.length) % galleryImgs.length;
    const src = galleryImgs[current].src;
    lbImg.src = src;
    lbImg.alt = galleryImgs[current].alt;
    lbCaption.textContent = `${galleryImgs[current].alt} — ${current + 1} / ${galleryImgs.length}`;
    // warm the neighbors so prev/next feel instant
    [current - 1, current + 1].forEach((n) => {
      const neighbor = galleryImgs[(n + galleryImgs.length) % galleryImgs.length];
      new Image().src = neighbor.src;
    });
  }
  function openLb(i) {
    show(i);
    lb.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeLb() {
    lb.classList.remove("open");
    document.body.style.overflow = "";
  }

  galleryImgs.forEach((img, i) => {
    img.closest(".gallery-item").addEventListener("click", () => openLb(i));
  });
  lb.querySelector(".lb-close").addEventListener("click", closeLb);
  lb.querySelector(".lb-prev").addEventListener("click", () => show(current - 1));
  lb.querySelector(".lb-next").addEventListener("click", () => show(current + 1));
  lb.addEventListener("click", (e) => { if (e.target === lb) closeLb(); });
  addEventListener("keydown", (e) => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") closeLb();
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
  });
}

/* ═══ BACK TO TOP ═══ */
if (backToTop) {
  backToTop.addEventListener("click", () =>
    scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" })
  );
}

/* ═══ CONTACT FORM → mail client, with visual feedback ═══ */
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const f = e.target;
  const subject = encodeURIComponent(f.asunto.value || "Cotización — sitio web");
  const body = encodeURIComponent(
    `Nombre: ${f.nombre.value}\nCorreo: ${f.email.value}\n\n${f.mensaje.value}`
  );
  const btn = f.querySelector("button[type='submit']");
  btn.textContent = "Abriendo tu correo…";
  setTimeout(() => (btn.textContent = "Enviar"), 2500);
  location.href = `mailto:sales@taekyung.com.mx?subject=${subject}&body=${body}`;
});
