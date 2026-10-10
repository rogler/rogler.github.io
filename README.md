# Résumé site (Nuxt 4, EN/FR, web + A4 PDF)

Content and display are separate: edit `content/resume.en.yaml` and `content/resume.fr.yaml`, never the components.

## Commands
| Command | What it does |
|---|---|
| `npm install` | install dependencies (commit the generated `package-lock.json`) |
| `npm run dev` | dev server; pages at `/en`, `/fr`, `/en/print`, `/fr/print` |
| `npm run check:data` | validate both YAML files against the schema and check EN/FR match (also runs before `dev` and `generate`) |
| `npm run generate` | static build into `.output/public` |
| `npx playwright install chromium` | one-time, needed for PDFs |
| `npm run build:all` | generate, then write `resume-en.pdf` and `resume-fr.pdf` into `.output/public` |
| `npx serve .output/public` | preview the generated site |

## Layout
- `content/` resume data, one file per language, same shape and ids
- `shared/schema.ts` Zod schema (used by Nuxt Content for types and by `scripts/check-data.mjs` for validation)
- `content.config.ts` one Nuxt Content data collection per language
- `app/utils/ui.ts` UI labels (nav, section titles, "now"/"aujourd'hui", language levels)
- `app/pages/[lang]/` home, experience, academics, skills, projects, more, print
- `app/components/`, `app/layouts/` display only; `app/assets/css/main.css` all styling (web + print)
- `scripts/build-pdf.mjs` Playwright renders `/<lang>/print/` to PDF

## Deploy
1. Name the repo `<username>.github.io` and push to `main`.
2. Settings > Pages > Source: **GitHub Actions**.
3. The workflow validates the data, builds, generates the PDFs and deploys.

Project site (`<username>.github.io/<repo>`)? Set `BASE_PATH: /<repo>/` in `.github/workflows/deploy.yml`.

## Privacy
Fields marked `print_only: true` (phone, street address) appear only on the print page and in the PDF.

## Adding a language
Add the code to `locales` and a block to `ui` in `app/utils/ui.ts`, add `content/resume.<code>.yaml`,
a collection in `content.config.ts`, and the code to `LANGS` in `scripts/build-pdf.mjs` and `scripts/check-data.mjs`.
