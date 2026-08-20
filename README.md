# banyourself.github.io

My cybersecurity portfolio. Case-file theme, with a Minecraft GUI mode you can
toggle in the top right.

Hand-written HTML, CSS and vanilla JS. No framework, no build step, no npm.
Push it and it's live.

## Editing

Everything lives in [`assets/js/casefiles.js`](assets/js/casefiles.js). Add a
case, add a finding, done. You don't touch `index.html`, `app.js` or the CSS.

Placeholders look like `⟨this⟩`. Search for `⟨` to find what's left, or just open
the browser console, it prints how many are still in there.

## Auto-filled tokens

Drop any of these into a string in `casefiles.js` and it fills in on page load, so
nothing needs editing every January:

| token | becomes |
|---|---|
| `{YEAR}` | current year |
| `{NEXT_YEAR}` | current year + 1 |
| `{INTERN_YEAR}` | next summer's year (rolls over after June) |
| `{TODAY}` | `2026-08-18` |
| `{MONTH}` | `August` |
| `{NAME}` / `{HANDLE}` | pulled from `SUBJECT` |

Also automatic: the file number on the cover (`FILE NO. MMDDYY-HANDLE`), the folder
count, severity counts per case, "Last updated", the page title per view, and case
numbers for any case where you leave `caseNo` off.

## Files

```
index.html              structure
assets/css/dossier.css  default theme
assets/css/gui.css       Minecraft skin, layered on data-theme="gui"
assets/js/casefiles.js  ← the only file you edit
assets/js/app.js        routing + rendering
```

## Running it locally

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`. Opening `index.html` straight off disk works
too, but a server matches how Pages actually serves it.

## Deploying

1. Make a public repo named `banyourself.github.io`
2. Push this folder to `main`
3. Settings → Pages → Source: `main`, folder `/ (root)`
4. Live at `https://banyourself.github.io` in about a minute

## Notes

- Writeup fields accept ``` fenced code blocks, so decompiled source can be
  pasted in raw. It gets escaped, not executed.
- `redacted: true` blacks out a finding's mod name and version until you flip it.
  Use it while something is still unpatched.
- Theme choice is saved to `localStorage` and applied before first paint.
- The whole thing prints cleanly, so it can be attached to an email as a PDF.

## Checking it before you push

```bash
node tools/validate.js
```

Catches what a syntax error won't: bad severity or level values, duplicate case
ids or finding refs, unclosed ``` fences, unknown `{TOKENS}`, missing image or
PDF files, and ids `app.js` looks up that nothing creates. Exits non-zero on
error so it works in a pre-commit hook.

Syntax only:

```bash
node --check assets/js/casefiles.js
```
