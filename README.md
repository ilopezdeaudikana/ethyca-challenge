# Ethyca Systems Map (Prototype)

A prototype that renders a systems map from a JSON dataset, with filters, selection, and dependency navigation.

**Summary**
- Data is fetched from `public/sample_data.json`.
- Filters are multi-select and the layout grouping stays stable.
- Selecting a system highlights its direct dependencies.
- Dependency panel provides scroll-to navigation.
- UI uses React + TypeScript + Vite, CSS Modules, and MUI controls.

**Scripts**
1. `npm run dev` – Start the dev server
2. `npm run build` – Type-check and build
3. `npm run typecheck` – Type-check only
4. `npm run preview` – Preview the production build
5. `npm run lint` – Lint
6. `npm test` – Unit tests (Vitest)
7. `npm run test:e2e` – Playwright tests

**Technologies**
- React 19 (new compiler) + TypeScript
- Vite
- Zustand
- Material UI
- CSS Modules
- Vitest + Testing Library
- Playwright

**Design Choices**
- `useSystemsData` fetches `sample_data.json`; tests mock fetch.
- Layout groups are derived from the full dataset, so filtering doesn’t reorder columns.
- Dependency navigation links scroll to specific cards; if the page doesn’t overflow, those links have no effect.
- CSS Modules keep styles scoped and easier to manage.
- Zustand centralizes selection/dependency state across components.

**Possible Improvements**
1. Loading/error UI for data fetch
2. Search and quick filters
3. Accessibility pass (keyboard, ARIA)
4. Virtualization for large datasets
5. Persist filters in the URL
6. Theming
7. Folder structure adjustments as the app grows
8. Add another scroll-navigation panel for filtered items
9. Use scss

**Notes**
- Data is fetched at runtime from `public/sample_data.json`.
- Tests mock fetch to keep unit tests deterministic.
- On smaller screens the top bar collapses into toggles and the layout narrows.
