# Logo

The official TOGAN KAMPÜS lockup is **not** included in this repository and must
never be redrawn, recoloured or re-proportioned.

Drop the official artwork here, with these exact filenames:

| File             | Use                                             |
| ---------------- | ----------------------------------------------- |
| `logo.svg`       | Full-colour lockup — header, light backgrounds   |
| `logo-light.svg` | Reversed (white/red) lockup — footer, navy areas |

SVG is preferred. PNG also works — if you use PNG, change the two paths in
`components/brand/Logo.tsx` to match the extension.

The component renders whatever file it finds at its native aspect ratio and
only constrains the height, so proportions are preserved automatically. No other
code changes are needed.

Until these files exist, the header and footer fall back to a plain typeset
wordmark. That fallback is a temporary placeholder — it is **not** the logo.
