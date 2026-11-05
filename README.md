# Heads Up Game (iPhone PWA)

Tilt-to-score guessing game. Hold the phone to your forehead, friends give clues.

- Tilt screen DOWN toward the floor = correct. Tilt UP toward the ceiling = pass.
- If directions feel reversed, enable "Flip tilt direction" on the home screen.
- On-screen Correct / Pass buttons always work as a fallback.
- Decks live in `decks.json`. Add your own in the app (saved on-device) or edit the file.

## Files
`index.html`, `manifest.json`, `sw.js`, `decks.json`, `icon.svg`, plus PNGs: `icon-192.png`, `icon-512.png`, `apple-touch-icon.png` (180x180).

## Hosting
Must be served over HTTPS (iOS motion permission + service worker). Use Cloudflare Pages connected to this private repo. GitHub Pages is not available for private repos on the free plan.

## Install on iPhone
Open the HTTPS URL in Safari > Share > Add to Home Screen. Launch from the icon, tap a deck, and allow Motion & Orientation access when prompted.

## Updating
Bump `CACHE` in `sw.js` (for example `headsup-v2`) whenever files change so phones refresh.
