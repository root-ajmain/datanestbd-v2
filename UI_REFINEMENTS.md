# UI refinement changes

Presentation-only changes. Section order, DOM hierarchy, routing, event handlers, responsive breakpoints, grid columns, and brand color tokens are preserved. No new dependencies or network font requests.

## Components enhanced

| File/component | CSS/classes and effect |
| --- | --- |
| `app/globals.css` | `--font-ui` shared with Tailwind `font-sans`; regular body text and bold heading defaults. Existing explicit heading weights remain. |
| `GlobalNavbar` | `glass-navigation`: 12px frost with a subtle boundary. `utility-label`: uppercase, 0.05em tracking; compact desktop labels. `tactile-utility` on theme/preferences buttons. |
| `MobileBottomTabs` | `glass-navigation utility-label`; existing fixed positioning, safe-area padding, grid, and visibility preserved. |
| `Modal` | `glass-dialog`: navy translucent backdrop with 12px blur. Native focus trapping, dismissal, scroll lock, and focus restoration unchanged. |
| `SettingsPanel` and mobile navigation drawer | `glass-overlay`: 98% theme surface for readable layering; solid fallback without backdrop-filter support. |
| `SettingsPanel` theme selector | `tactile-utility utility-label`: soft extruded/inset edges; existing icons, border, and selected-state styling retained. |
| Shared `.glass-btn-accent` and primary `SplitButton` | Token-based moving highlight and inset pressed shadow. Navy labels on solid orange remain readable during hover; no darker orange hover fill. |
| Shared `.glass-card` | Solid theme surface and restrained shadow for text-heavy content. No layout-wide neumorphism. |
| `ServiceAccordion` and `/work` technical lists | `aligned-list`: top-aligned icons, 1.65 line-height, consistent icon offset; existing grid columns and gaps retained. Accordion indexes use tabular numerals. |

## Key CSS

The complete implementation is in `app/globals.css`.

```css
--font-ui: "Inter", "SF Pro Text", -apple-system, BlinkMacSystemFont,
  "Helvetica Neue", "Segoe UI", Arial, sans-serif;

.utility-label, .glass-btn, .split-button {
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

/* Applied within a backdrop-filter feature query; solid fallback precedes it. */
.glass-navigation, .glass-overlay {
  background: color-mix(in srgb, var(--color-surface) 98%, transparent);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
}

.aligned-list > li { align-items: flex-start; line-height: 1.65; }
.aligned-list > li > svg { margin-top: 0.2em; }
```

Inter/SF Pro are used when locally available; otherwise the system stack applies. No font file was added.

## Accessibility and validation

- Existing UI suite: 11/11 tests pass; TypeScript `--noEmit` and the Next.js build command pass. Build configuration skips linting; no lint pass is claimed.
- Browser review: home, work, services, and contact at 320px, 390px, 1280px, and 1440px in light/dark themes; no horizontal page overflow. Existing horizontally scrollable architecture controls retain their scrolling behavior. Settings, mobile navigation, theme switching, and reduced motion exercised. Dark surface colors also verified through the actual saved-preference event after transitions settled.
- Calculated WCAG text contrast for the new surface pairings: light glass secondary text **5.30:1** over black; dark glass secondary text **7.46:1** over white; navy CTA label on orange **5.67:1**. The CTA highlight only lightens its fill. These checks cover the changed pairings, not a full-site accessibility certification.
- Both OS and in-app reduced-motion settings disable CTA transforms; reduced-transparency preference provides solid surfaces. Existing focus indicators remain.
- No structural modifications were needed.
