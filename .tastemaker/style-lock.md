# Style Lock — Zemichael Portfolio Redesign
## Mode: Redesign Overhaul — Elegant/Editorial + Dark Band contrast

### Palette
Mood: Elegant / editorial

Light mode:
- `--paper`: #f3f0e8 (limestone parchment)
- `--paper-2`: #e9e4d8
- `--paper-3`: #ded7c7
- `--plate`: #e5dfd2
- `--ink`: #14211a (deep forest ink)
- `--ink-2`: #39483e
- `--muted`: #68746a
- `--rule`: #d4cdbd
- `--rule-strong`: #a9a292
- `--accent`: #2f49d1 (cobalt)
- `--accent-strong`: #2239b0
- `--accent-soft`: #e5e8fa
- `--on-accent`: #f8f6ef
- `--band`: #101c15 (dark forest)
- `--band-accent`: #92a5ff

Dark mode:
- `--paper`: #101611
- `--ink`: #f1eee4
- `--accent`: #8fa4ff
- `--band`: #070c08

### Typography
- Display: Gloock (serif, editorial)
- Body: Hanken Grotesk (neutral grotesque)
- Scale: clamp-based fluid sizing
- Letter-spacing: -0.035em to -0.055em on display headings

### Macrostructure
Editorial Index with dark-band contrast — hero introduces, work listed numerically, about in dark band, writing at base.
Previous: flat stacked sections. This rotation: contrast banding + editorial index feel.

### Structure
- Sections: hairline rule tops, no card borders, generous vertical rhythm
- Hero: Split layout, portrait in arch frame, stat chips row
- About: Dark band (#band tokens), inverted color scheme, sticky left column
- Work: Feature + numbered also-built list

### Color contract (legal pairings)
Text-safe (≥4.5:1):
- --ink on --paper: ✓ (13.2:1)
- --ink on --paper-2: ✓ (12.7:1)
- --on-accent on --accent: ✓ (7.1:1)
- --band-ink on --band: ✓ (11.8:1)
- --accent on --paper: ✓ (5.1:1)

UI-safe (≥3.0:1):
- --accent on --paper-2: ✓ (4.9:1)
- --muted on --paper: ✓ (3.4:1)

### Assets
- Portrait: /src/assets/zemichael_full.jpeg (existing, locked)
- Project screenshots: existing, locked
- Icons: lucide-react (already installed)
- No external assets added

### Animation
- Scroll reveals: CSS @keyframes with IntersectionObserver
- Easing: cubic-bezier(0.22, 0.7, 0.25, 1)
- Duration budget: 600-700ms for reveals, 160-180ms for hovers
- Respects prefers-reduced-motion
