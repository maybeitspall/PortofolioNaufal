# Architecture Document
## Portfolio Website — Naufal Fadhillah
**Target:** GitHub Pages (Static Hosting)

---

## 1. Project Architecture
The project is built as a pure client-side static web application with zero compile/transpile requirements, allowing direct hosting on GitHub Pages.

```
Portofolio/
├── index.html                  # Main entry page
├── .nojekyll                   # Bypasses Jekyll processing on GitHub Pages
├── README.md                   # Repository overview
├── docs/
│   ├── PRD.md
│   ├── architecture.md
│   └── design.md
├── assets/
│   ├── css/
│   │   └── style.css           # Complete Liquid Glass design system & styling
│   └── js/
│       ├── liquid-background.js# Ambient canvas liquid blob physics engine
│       └── main.js             # UI interactions, tilt, typewriter, modal, observer
```

---

## 2. Key Modules
- **Liquid Background Engine**: Uses HTML5 Canvas rendering gradient blobs with spring physics and mouse repulsive force.
- **Glassmorphism Layering**: Deep dark base `#060818` with layered `backdrop-filter: blur(16px)` glass surfaces and linear gradient specular highlights.
- **Scroll & Navigation Spy**: `IntersectionObserver` observing DOM sections to update the active navigation state and trigger entry animations.
- **Interactive Project Modal**: Accessible dialog layer for deep-dive case study analysis without leaving the page.
