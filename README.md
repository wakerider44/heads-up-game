# Heads Up Game (iPhone PWA)

Tilt-to-score guessing game. Hold the phone to your forehead, friends give clues.

- Tilt screen DOWN toward the floor = correct. Tilt UP toward the ceiling = pass.
- If directions feel reversed, enable "Flip tilt direction" on the home screen.
- On-screen Correct / Pass buttons always work as a fallback.
- Decks live in `decks.json`. Add your own in the app (saved on-device) or edit the file.

## Files
`index.html`, `manifest.json`, `sw.js`, `decks.json`, `icon.svg`, plus PNG icons:
- `app-icon-192.png` and `app-icon-512.png`: standard app icons (manifest)
- `app-icon-maskable-512.png`: maskable app icon with extra padding (manifest)
- `apple-touch-icon-180.png`: iPhone Home Screen icon (linked in `index.html`)

## Hosting
Must be served over HTTPS (iOS motion permission + service worker). Options: GitHub Pages (public repo on the free plan) or Cloudflare Pages (works with private repos).

## Install on iPhone
Open the HTTPS URL in Safari > Share > Add to Home Screen. Launch from the icon, tap a deck, and allow Motion & Orientation access when prompted.

## Updating
Bump `CACHE` in `sw.js` (for example `headsup-v3`) whenever files change so phones refresh.
