# Site tracking versions

Page opens and named actions go to a GoatCounter site (cookie-free, no personal data). The site code lives in /nav.js as BS_GC; empty means nothing is sent.

## v1 (22 Oct 2026) at /track/v1.js, live as /track.js
- Loads GoatCounter's counter when BS_GC is set and exposes window.bsTrack(name, title). Actions fired before the counter is ready are queued.
- Shipped with nav.js v6 (loads /track.js on every page; also injects favicon, home-screen icon, manifest, theme colour), Library v27 (open, role, filter, sort, share, no-result search), Calculator v18 (first full calculation, copy card, copy math), 404 page v1 (logs the missing path).
- Every version path counts as its own page, so old links show up as their version.
