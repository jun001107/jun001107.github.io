# Portfolio

Interactive, glassmorphic portfolio with windowed apps (profile, projects, photos, contact, AI terminal) backed by Vite + React.

## Run Locally

**Prerequisites:** Node.js


1. Install dependencies: `npm install`
2. Create `.env.local` with `GEMINI_API_KEY=<your key>` (or `API_KEY`) for the AI terminal.
3. Start dev server: `npm run dev`
4. Run tests: `npm test`
5. Build for prod: `npm run build`

## Project Structure

```
src/
  app/
    AppShell.tsx               # Root shell wiring layout + window management
    hooks/useWindowManager.ts  # Open/focus/close state
    layout/                    # Desktop + status bar framing
  components/ui/               # Reusable UI building blocks
  config/env.ts                # Environment accessors
  data/                        # App registry and project content
  features/                    # Feature-specific app UIs
    terminal/prompt.ts         # System prompt for Gemini
  services/genaiClient.ts      # Gemini chat client wiring
  types/                       # Shared type definitions
  utils/time.ts                # Formatting helpers
```

## Notes
- Terminal AI uses the Gemini API; Vite injects `GEMINI_API_KEY`/`API_KEY` into `process.env`.
- `npm test` runs Vitest (jsdom) covering window manager behavior and time formatting.
- Build bundles a single JS chunk (~618 kB minified); consider manual chunking or dynamic imports if you want a smaller payload.
