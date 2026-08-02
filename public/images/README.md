# Photography

Every image slot degrades to a composed navy plate, so the site is never broken
while shooting is pending. Drop real files here with these exact names.

## Required

| File                     | Where            | Brief                                                                                                                              |
| ------------------------ | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `hero-birebir-ders.jpg`  | Hero             | **One** teacher working with **one** student at a table. Portrait/tall crop (≈5:6). Teacher leaning in, pointing at the student's notebook. |
| `akademik-kocluk.jpg`    | Akademik Koçluk  | A coach and a student reviewing a printed weekly plan. Portrait crop (4:5).                                                          |

## Optional — student photos (enrollment toasts)

`lib/enrollments.ts` drives the notifications in the bottom-left corner. Add
`photo: "/images/ogrenciler/<slug>.jpg"` to an entry and that card renders the
photo instead of the initial monogram — same size, same layout either way.

**These must be real students, with written parental consent.** They are minors
and the notification asserts a factual enrollment, so stock photography or
AI-generated faces are not an option here. Surnames stay abbreviated to a single
initial. Until real photos exist, the monogram is the correct state to ship.

## Optional — teacher portraits

Add `photo: "/images/ogretmenler/<slug>.jpg"` to any entry in
`lib/content.ts → teachers` and the card renders the portrait automatically.
Without it the card shows an initials monogram. **The layout is identical either
way** — adding photos later requires no layout work.

Shoot portraits at 4:5, eyes on the upper third, consistent background.

## Direction

- Real teachers and real students of the institution. No stock, no AI faces.
- Natural daylight. Bright, quiet interiors.
- Professional clothing. Warm but serious — focused, not posed.
- Never a full classroom. Never rows of desks. Never a staged group smile.
- Muted, low-saturation grade so images sit inside the navy/white palette.

## Technical

- Export at 2× the largest rendered size (hero ≈ 1600×1920).
- JPEG quality ~85; Next.js re-encodes to AVIF/WebP and serves per-device sizes.
- Keep files under ~500 KB before optimisation.
