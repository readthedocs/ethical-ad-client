# Project Standards & Agent Instructions

This is the JavaScript client for [EthicalAds](https://www.ethicalads.io/). It is responsible for detecting ad placements on publisher websites, fetching ads from the EthicalAds decision API, and rendering them.

## 1. Project Overview

- **Language:** Vanilla JavaScript (ES6+)
- **Styling:** SCSS (compiled to CSS and injected via `style-loader`)
- **Build Tool:** `webpack` (Module bundler)
- **Testing:** `web-test-runner`
- **Linting/Formatting:** `prettier`
- **Documentation:** `sphinx`

### 1.1 Project Structure

- `index.js`: Main entry point. Contains the `Placement` class and logic for detecting placements and fetching ads.
- `styles.scss`: SCSS for ad styling, bundled into the JS client.
- `dist/`: Contains the built artifacts (`ethicalads.min.js` and `ethicalads.js`).
- `tests/`: Unit and integration tests run in a browser environment via `web-test-runner`.
- `docs/`: Sphinx documentation.

### 1.2 Key Dependencies

- `verge`: Used for viewport calculations.
- `webpack`: Bundles JS and SCSS into a single file for distribution.
- `babel`: Transpiles ES6+ code for browser compatibility.

## 2. Development Workflow

### 2.1 Local Development

To start a development server with hot reloading:

```bash
npm run dev
```

The test styleguide is available at `http://localhost:8080/`.

### 2.2 Formatting & Linting

Before committing, ensure the code is formatted:

```bash
npm run format  # Applies prettier formatting
npm run lint    # Checks formatting
```

### 2.3 Building for Production

To generate the production-ready files in `dist/`:

```bash
npm run build
```

## 3. Testing Procedures

Tests must pass before tasks are considered complete.

```bash
npm run test       # Run all tests
npm run test:dev   # Run tests in watch mode
npm run test:debug # Run tests with a manual browser for debugging
```

## 4. Agent Workflow Instructions

1.  **Source of Truth:** Always treat this `AGENTS.md` file as the primary source of project standards.
2.  **Context Loading:** At the start of a task, read `index.js` (for logic) and `styles.scss` (for UI) if relevant.
3.  **Planning:** Create a detailed task list. For complex changes, create an implementation plan.
4.  **Minimalism:** The client is served on third-party sites; keep the bundle size small and avoid heavy dependencies.
5.  **Vanilla JS:** Use vanilla JavaScript; avoid frameworks like React or Vue unless explicitly requested.
6.  **Verification:** Always run `npm run test` and `npm run lint` before declaring a task done.
