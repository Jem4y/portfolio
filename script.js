/* =========================================================
   Portfolio — script.js
   No dependencies. Progressive enhancement only.
   ========================================================= */
(() => {
  "use strict";

  /* ---------- Theme ---------- */
  const root = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const THEME_KEY = "portfolio-theme";

  const getStoredTheme = () => {
    try {
      return localStorage.getItem(THEME_KEY);
    } catch {
      return null;
    }
  };

  const storeTheme = (theme) => {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      /* storage may be blocked; ignore */
    }
  };

  const applyTheme = (theme) => {
    root.setAttribute("data-theme", theme);
    if (themeToggle) {
      themeToggle.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
      );
    }
  };

  // Priority: saved choice → system preference → dark
  const stored = getStoredTheme();
  const systemPrefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  applyTheme(stored || (systemPrefersLight ? "light" : "dark"));

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      storeTheme(next);
    });
  }

  /* ---------- Mobile navigation ---------- */
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  const closeMenu = () => {
    if (!navToggle || !navMenu) return;
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
    navMenu.classList.remove("is-open");
  };

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const open = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!open));
      navToggle.setAttribute("aria-label", open ? "Open menu" : "Close menu");
      navMenu.classList.toggle("is-open", !open);
    });

    // Close after choosing a link
    navMenu.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeMenu();
    });

    // Click outside closes the menu
    document.addEventListener("click", (event) => {
      if (!navMenu.classList.contains("is-open")) return;
      if (navMenu.contains(event.target) || navToggle.contains(event.target)) return;
      closeMenu();
    });

    // Escape closes the menu
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && navMenu.classList.contains("is-open")) {
        closeMenu();
        navToggle.focus();
      }
    });

    // Desktop resize resets the menu state
    window.addEventListener("resize", () => {
      if (window.innerWidth > 720) closeMenu();
    });
  }

  /* ---------- Header scroll state ---------- */
  const header = document.querySelector(".site-header");
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll(".reveal");

  // Reveal anything already inside the viewport. Acts as a safety net if the
  // IntersectionObserver is slow or unavailable, so content is never stuck hidden.
  const revealInView = () => {
    const vh = window.innerHeight || document.documentElement.clientHeight;
    revealEls.forEach((el) => {
      if (el.classList.contains("is-visible")) return;
      const rect = el.getBoundingClientRect();
      if (rect.top < vh * 0.95 && rect.bottom > 0) el.classList.add("is-visible");
    });
  };

  if ("IntersectionObserver" in window) {
    window.__revealObserver = true; // tells the inline failsafe we've taken over

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls.forEach((el) => revealObserver.observe(el));
    revealInView();
    window.addEventListener("load", revealInView);
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- Active nav link on scroll ---------- */
  const navLinks = Array.from(document.querySelectorAll(".nav-links > a[href^='#']"));
  const sections = navLinks
    .map((link) => {
      const id = link.getAttribute("href");
      return id && id !== "#" ? document.querySelector(id) : null;
    })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const setActive = (id) => {
      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
      });
    };

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((section) => sectionObserver.observe(section));
  }

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
