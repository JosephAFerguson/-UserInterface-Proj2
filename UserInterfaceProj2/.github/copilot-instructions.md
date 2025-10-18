# Copilot instructions for UserInterfaceProj2

Purpose: quick, actionable guidance so AI coding agents can be immediately productive in this Svelte + Vite project.

Key entry points
- `src/App.svelte` — central app that holds the initial state (books_on_shelf, books_off_shelf) and binds that state into child components. Preserve prop names when changing APIs (e.g. `books_on_shelf`).
- `src/main.js` — app bootstrap. Note it imports `mount` from `svelte` (non-standard compared to `new App({...})`); verify runtime expectations before changing this file.
- `package.json` — dev scripts: `npm run dev` (vite), `npm run build` and `npm run preview`.

Architecture & patterns
- This is a small client-side Svelte app using component-local state passed via bind: (two-way binding). Example: in `App.svelte`:
  `<DeviceUI bind:books_on_shelf bind:books_off_shelf/>`
- No Svelte stores or centralized state management are present — modifications should either continue using prop binding or explicitly introduce stores and update all bindings.
- Components export props with snake_case names (e.g. `export let books_on_shelf = []`). Keep that naming convention consistent when adding props.
- Styling is component-scoped (each `.svelte` file has its own `<style>`); prefer editing component CSS rather than a global stylesheet unless necessary.

Build & run
- Typical local iteration:
  1) Install deps: `npm install`
  2) Start dev server: `npm run dev` (Vite)
  3) Build for production: `npm run build` (output: `dist/`)
  4) Preview production build: `npm run preview`

Project-specific notes & gotchas
- `svelte-spa-router` is present in `package.json` but not referenced in top-level files inspected — search `src/` before adding routes to avoid duplicate router implementations.
- Public assets live in `public/` and are referenced directly (e.g. images used in `testing-ui.svelte`). Use `/`-rooted paths when referring to them in new code.
- `main.js` uses `document.getElementById('app')` as the mount target — ensure `index.html` has a matching element when modifying bootstrap.
- Initial sample data for books lives in `App.svelte`; tests or features relying on that data expect the same object shape (Title, Color, Genre, Pages, Synopsis, DateAdded, LastRead, TimesPulledOffShelf).

Common edits to be careful about
- Changing a prop name (e.g., renaming `books_on_shelf`) requires updating all `bind:` usages in `App.svelte` and child components.
- Avoid switching from bind-based two-way props to immutable props without migrating callers (or introducing stores) — this will break UI interactivity.
- Do not assume presence of tests; add unit tests and small integration checks if you change component contracts.

Where to look next (examples)
- `src/data-display-ui.svelte` — derived reactive values using `$:` (e.g. `totalBooksOnShelf`, `mostReadBook`). Use the same reactive patterns when adding computed values.
- `src/device-ui.svelte` — visual layout for shelves; updates here should preserve exported props and DOM shape used by consumers.

If unsure
- Run `npm run dev` and open the dev server console; Vite/HMR errors are highly informative.
- Search for `bind:books_on_shelf` and `bind:books_off_shelf` before renaming props.

When you finish a change
- Sanity-check locally: `npm run dev` then exercise the UI flows (add/remove interactions, search, navigation).
- Keep changes small and backward compatible; document any API changes in `README.md` at the project root.

Questions? Ask the repo owner to confirm whether `mount` in `main.js` is intentional and whether adding Svelte stores is acceptable.
