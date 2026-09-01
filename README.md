# Bright Way Dental Clinic

Premium bilingual website foundation for Bright Way Dental Clinic.

## Milestone 01

- Next.js App Router with TypeScript and Tailwind CSS
- English (`/en`) and Arabic (`/ar`) locale routing
- Native RTL layout and localized metadata
- Self-hosted English and Arabic typography
- Brand color tokens and responsive spacing system
- Responsive header, mobile navigation, locale switcher, and footer
- Internal design foundation preview at `/[locale]/style-preview`

## Milestone 02

- Premium bilingual homepage hero with an optimized, art-directed clinic image
- Editorial treatments preview without template-style cards
- Bright Way introduction and care-principles preview
- Doctor feature with an explicit placeholder for the approved clinic portrait and verified biography
- Appointment conversion section and focused in-page navigation
- Responsive desktop/mobile compositions verified in both LTR and RTL

The internal design foundation preview remains available at `/[locale]/style-preview`.

## Local development

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`; locale routing redirects to English by default.

## Quality checks

```bash
npm run lint
npm run build
```

The project intentionally has no database, authentication, CMS, or booking backend at this stage.
