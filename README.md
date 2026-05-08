# SCRO @ UCF Website

Production-quality Next.js website for the **Semiconductor Career Readiness Organization at UCF**.

## Start the site

From the project root:

```bash
npm install
npm run dev
```

The dev server is configured to bind to `0.0.0.0:3000`.

## Open the pages

- Homepage: `http://localhost:3000/`
- New member page: `http://localhost:3000/new-members`
- Officers: `http://localhost:3000/officers`
- Gallery: `http://localhost:3000/gallery`

If you are using a cloud IDE/container, open the **forwarded URL for port 3000** (not your local machine's localhost).

## If "site cannot be reached"

1. Confirm the server is running and prints `ready` in the terminal.
2. If port 3000 is busy, run:
   ```bash
   lsof -i :3000
   ```
   then stop the existing process.
3. In remote environments, use the platform's "Open Port 3000" action.

## Stack

- Next.js 16.2 (App Router)
- React 19 + TypeScript (strict)
- Tailwind CSS
- Framer Motion
- shadcn-style reusable UI primitives
- custom SVG icon set (local, no extra dependency)

## Build

```bash
npm run build
npm run start
```

## CI/CD

Pull requests are automatically validated via GitHub Actions:

- **Type check** — `npm run typecheck`
- **Build** — `npm run build`

See `.github/workflows/ci.yml` for the full pipeline.
