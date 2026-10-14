# Datanest BD light redesign

The October 2026 redesign uses warm white, restrained green, translucent surfaces, and a simpler editorial type hierarchy. `app/premium.css` is the shared presentation layer loaded after the legacy component styles. Existing routes, pricing data, service content, metadata, and inquiry submission logic remain in use.

## Homepage

`components/sections/GrowthExperience.tsx` tells a three-chapter business journey: operational bottlenecks, connecting workflows with Datanest BD, and creating room to grow. The workspace is an illustrative CSS 3D composition, not a product screenshot or a claim of measured client results. Motion uses the existing `motion` dependency; no WebGL engine or animation dependency was added.

Desktop scroll changes the hero perspective and the sticky story workspace. Mobile uses normal document flow. The motion toggle persists through the existing preference provider and respects the OS preference until the visitor chooses otherwise. Reduced motion removes decorative transitions and typing effects while retaining all story content. Normal browser scrolling, keyboard focus, and native FAQ disclosures remain available.

## Other routes

Shared light navigation, mobile dock, buttons, forms, and footer apply across routes. Services uses a category/sidebar layout, Work uses an asymmetric project grid, About has offset sections, Pricing has a shorter header, and Contact places the inquiry form beside the introduction on desktop and ahead of contact channels on mobile.

## Verification

- `node node_modules/typescript/bin/tsc --noEmit`
- `node --import tsx --test tests/ui.test.tsx`
- Run ESLint on the changed TSX files.
- `scripts/check-redesign.cjs` uses Playwright with installed Chrome to check ten desktop routes, six routes at 390px and 768px, the three scroll chapters, motion persistence, horizontal overflow, and browser exceptions. Set `PLAYWRIGHT_MODULE` to an available Playwright module path if it is not installed locally. It expects a local server on port 3000 and saves screenshots to `artifacts/redesign/`.

12ui concept generation was attempted but requires an account connection. The implementation follows the Redesign skill's code audit and improvement workflow; no generated 12ui design is claimed as a reference.
