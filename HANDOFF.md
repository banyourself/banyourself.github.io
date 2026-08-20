# HANDOFF

Everything needed to pick this up in a fresh chat. Written 2026-08-18.

Paste this whole file into a new conversation, or just say "read HANDOFF.md in
Downloads/banyourself-portfolio".

---

## 1. Who this is for

| | |
|---|---|
| Name | Kevin Le |
| GitHub | `banyourself`, https://github.com/banyourself |
| Email | publicusekevin@gmail.com |
| Phone | (714) 837-1468 |
| Location | Westminster, California |
| School | Coastline College (legal name: Coastline Community College), A.S. Cybersecurity, expected April 2027 |
| GPA | **3.47** (was 3.16 on the old resume, 3.47 is correct) |
| LinkedIn | https://www.linkedin.com/in/kevin-le-cyber |
| Credly | https://www.credly.com/users/kevin-le-cyber |
| Track | Security Operations / Cloud Security |
| Goal | Summer 2027 internship, SOC / cloud security / IT |

---

## 2. How Kevin wants me to work

These are hard preferences, already saved to auto-memory but repeat them anyway:

- **No em-dashes.** Ever. Use `-`, commas, colons, or a new sentence.
- **Comments: rare and short.** No banner blocks, no design-rationale essays, no
  labels restating obvious code (`/* paper stock */` above color vars was called out
  specifically). One line, only when a reader would ask "why is this here?"
- **Voice:** should read like a college student wrote it. Casual, a bit of gamer
  personality, first person in comments. Must not read as AI-generated.
- He notices UI detail fast and will screenshot it. Verify visually where possible.

---

## 3. What this project is

A GitHub Pages portfolio at `banyourself.github.io`, plus a profile README and a
one-page resume. Hand-written HTML/CSS/vanilla JS. **No framework, no build step,
no npm.** Push it and it's live.

Two themes, toggled by a button, persisted in `localStorage`:

1. **Case File** (default), manila dossier. Special Elite + IBM Plex Mono + Spectral.
   Paper texture, punch holes, rubber stamps, redaction bars, dotted leaders.
2. **Minecraft Mode**, MC GUI skin. Press Start 2P + VT323. Bedrock background,
   2px bevels, item-tooltip styling, minecraft.net green CTAs.

Design constraint that drove everything: Kevin explicitly did **not** want the
stock shadcn/Tailwind look. The reference site he liked (`gunav0486.github.io`) turned
out to be unmodified shadcn defaults, so we deliberately went the opposite direction.

---

## 4. File map

```
index.html                  structure only, no content
assets/js/casefiles.js      ← ALL CONTENT LIVES HERE. This is the only file to edit.
assets/js/app.js            routing, rendering, theme, toasts
assets/js/ambient.js        decorative background layer (mobs, slips, redstone)
assets/css/dossier.css      case-file theme
assets/css/gui.css           minecraft skin, layered on [data-theme="gui"]
assets/css/ambient.css      background layer styles
assets/img/subject.jpg      cropped headshot (from me1.jpg, 800x1000, EXIF stripped)
assets/img/og.png           1200x630 link-preview card
assets/img/bedrock.svg      generated tile
assets/img/redstone-*.svg   generated tiles (off/on)
assets/Kevin_Le_Resume.pdf  generated, 1 page
tools/serve.py              no-cache dev server  ← use this, not http.server
tools/validate.js           data + asset validator
tools/build_resume.py       regenerates the resume PDF
tools/build_og.py           regenerates the OG card
tools/build_bedrock.py      regenerates the bedrock tile
tools/build_redstone.py     regenerates the redstone tiles
PROFILE-README.md           for the banyourself/banyourself repo (OUT OF SYNC, see §8)
README.md                   repo readme / how to edit
```

---

## 5. Commands

```bash
python tools/serve.py            # http://localhost:8000, sends no-store headers
node tools/validate.js           # data validation, exits non-zero on error
node --check assets/js/app.js    # syntax only
python tools/build_resume.py     # rebuild resume PDF (verifies 1 page)
python tools/build_og.py         # rebuild link-preview card
```

**Always use `tools/serve.py`, not `python -m http.server`.** Plain http.server sends
`Last-Modified`, browsers cache the JS, and Kevin spent a round-trip staring at a stale
page convinced the edits hadn't applied. `serve.py` sends `no-store`.

Toolchain installed and confirmed working: node v24.19.0, Python 3.12.10, fpdf2 2.8.8,
Pillow 12.3.0, pypdf 6.16.1. Node lives at `C:/Program Files/nodejs` and is **not** on
the Bash tool's PATH by default, prepend it:
`export PATH="$PATH:/c/Program Files/nodejs"`

---

## 6. Verified facts. Do not guess at these.

### Certifications (Kevin confirmed the exam codes himself)

| Cert | Issuer | Earned | Credly badge |
|---|---|---|---|
| CySA+ - CS0-003 | CompTIA | May 2026 | `17bda361-2ea7-4c40-96f7-f42228a7c8b9` |
| Server+ - SK0-005 | CompTIA | May 2026 | `e9261ad2-e97b-44bf-ad48-56aa778b4e58` |
| Network+ - N10-009 | CompTIA | Dec 2025 | `4108b7b1-1289-4a79-8eaa-98e4bd5cb094` |
| Security+ - SY0-701 | CompTIA | Aug 2025 | `2b6ee0a4-27e8-4685-8ddb-eeff1cf118c5` |
| Cloud and AI Security Engineer Associate - SC-500 | Microsoft | Aug 2026 | not on Credly |
| Security Operations Analyst Associate - SC-200 | Microsoft | May 2026 | not on Credly |

Badge URL format: `https://www.credly.com/badges/<uuid>` (all four verified 200).

**In progress:** ISC2 CISSP, Microsoft Cybersecurity Architect - SC-100.
Note: CISSP needs 5 years experience, so until then it's *Associate of ISC2*, not
full CISSP. Never let the site imply he holds it.

The two Microsoft certs came from certificate PNGs in `Downloads/`, not Credly.
Credential IDs: `E1FF73-CP4B86` (SC-500), `S8251F-6F9F75` (SC-200).
To link them, Kevin needs to grab Microsoft Learn share URLs and drop them in the
`url: ""` fields.

**Deliberately excluded** from the site (Kevin's call, CompTIA and Microsoft only):
CompTIA CSAP and CNIP stacks, Google Cybersecurity, Google IT Support, Cisco Python
Essentials, ISC2 Candidate, IBM SkillsBuild, AWS Educate. These ARE still on the
resume under "Additional", which is intentional.

**Four certs on his OLD resume could not be verified** and were left off: EC-Council
Information Security Analyst, AWS Cloud Support Associate, Microsoft Azure AI
Essentials, Microsoft Security Essentials. If he says they're real, add them.

### The four case files

1. **MC-001** Modded Minecraft - Missing Packet Authorization (vuln research).
   Decompiled Forge mods, found server-bound packet handlers with no permission gate
   (CWE-862). Affects modpacks incl. RLCraft (30M+ downloads). 4 findings graded
   critical/high/medium/low. **This is the drill-down showcase case.**
2. **CS-002** CS:GO Server Plugins - Anti-Cheat, Anti-VPN, Gamemodes (defensive
   tooling). It's **CS:GO, not CS2**, and SourcePawn. Filled in 2026-08-19 from the
   real repos: **14 findings**, one per plugin, so the case page is a filterable index
   instead of one long page. Grouped by area via `tones` (see below). Source of truth
   for the plugin details is `Downloads/Projects/HANDOFF-CSGO.md`.
3. **LAB-003** Home Security Lab - Build & Detection Log (blue team). Proxmox/pfSense,
   attacks himself, logs what fired vs what didn't.
4. **DNS-004** Network-Wide DNS Filtering - Pi-hole on Raspberry Pi (blue team).

### Taglines (per theme, swapped live on toggle)

- **Case File:** "Every case started because of an interest, a file does that too, I
  hope you're taking a peek into this classified file cause of an interest in me!"
- **Minecraft:** "I've played games my whole life and I realized that finding,
  patching, and documenting security vulnerabilities is just like a game, so I'm going
  to grind this game out and learn as much as I can!"

(I capitalized his lowercase "i" in the first one. He hasn't objected.)

---

## 7. Architecture notes worth knowing

- **`casefiles.js` is the whole content layer.** `SUBJECT`, `CREDENTIALS`,
  `CAPABILITIES`, `CASES`, `FIELD_NOTES`. Loaded as plain globals before `app.js`.
- **`{TOKENS}`** auto-fill at page load so dates never go stale, usable in any string:
  `{YEAR} {NEXT_YEAR} {INTERN_YEAR} {TODAY} {FILEDATE} {MONTH} {NAME} {HANDLE}`.
  `{INTERN_YEAR}` rolls to next year after June (an internship you apply for in the
  fall is for next summer). Substitution happens inside `esc()`, so it works everywhere.
- **Routing** is hash-based (`#/case/MC-001`, `#/finding/MC-001-A`). Works on Pages with
  no config, back button free. Sets `document.title` per view.
- **Severity** must be `critical|high|medium|low|info`. **Levels** must be
  `working|pending|learning`. The validator enforces both.
- **A case can relabel the severity buckets.** `tones: {critical: "Anti-cheat", ...}`
  plus `filterLabel: "Area"` makes the filter chips, folder pills and detail pill read
  as categories instead of severities. CS-002 uses this; the vuln cases don't set it and
  fall through to the raw severity word. Sort order is still severity order, which is why
  the anticheat sits at `critical` and the QoL forks at `info`.
- **A finding can override its own labels.** `sub` replaces the `mod · version · cwe`
  index subtitle, `meta: [[label, value], ...]` replaces the four fixed meta rows, and
  `beats: [{head, body}]` replaces the fixed Discovery/Root cause/Impact/Patch beats. All
  three fall back to the old behavior when absent, so MC-001 is untouched.
- **A meta value starting `http`** renders as a "repository" link automatically.
- **`REPOS_PUBLIC` at the top of `casefiles.js`** is a single flag. It's `false`, so every
  plugin shows "name (private repo)". Flip it to `true` the moment Kevin makes the CS:GO
  repos public and all 14 turn into real links. No other edit needed.
- **Writeup fields accept ``` fenced code blocks** so decompiled Java pastes in raw.
  It gets escaped, not executed, tested against an injected `<script>` tag.
- **`safeUrl()`** allowlists schemes (`http`, `https`, `mailto`, relative paths) and
  blocks `javascript:`/`data:`. Tested 10/10.
- **Email button copies to clipboard** rather than using `mailto:`, because `mailto:`
  silently does nothing without a mail client configured.
- **Resume link uses `download`**, and the fishing-hook does a synthetic `<a download>`.
  Also does a `HEAD` check and hides itself if the PDF 404s.
- **`ambient.js` is wrapped in try/catch** and the click handler has its own, a
  decorative layer must never break the site. `app.js` deliberately is NOT wrapped;
  if the core throws, hiding it would be worse.
- **Slip click uses `document.elementsFromPoint`** hit-testing, because `.wrap` sits
  above the ambient layer and its box includes the gutters, so slips in the margin never
  receive the click directly. Slips must keep `pointer-events: auto` or
  `elementsFromPoint` skips them.

---

## 8. Outstanding work

### High value
1. **`PROFILE-README.md` is out of sync.** Still has the old tagline, 28 placeholders,
   `⟨CompTIA Cert⟩` stubs, `⟨University⟩`, "Graded honestly", and CSAP/CNIP-era framing.
   Needs the six real certs, exam codes, Coastline College, and the case-file tagline.
   This is the first thing a recruiter sees on his GitHub profile.
2. **88 placeholders in `casefiles.js`** (was 104; CS-002's 16 are done). Biggest wins:
   - `MC-001-A.discovery`, the honest story of why he opened that mod. The one part
     of the portfolio nobody else can copy.
   - Real mod names, versions, packet names for the Minecraft findings
   - Disclosure dates
3. **`tags: []` on LAB-003 / DNS-004.** Kevin said he'd supply the footer tag wording
   later. Empty renders nothing, which is fine for now. CS-002 has real tags.
4. **The resume PDF still undersells the plugins.** `tools/build_resume.py` has one
   two-line bullet and no C++ in its Languages line. Kevin only asked for the site and
   the profile README, so the PDF was deliberately left alone. Offered, not done.

### Blocked on Kevin
- Microsoft Learn share URLs, to link the two Microsoft cert names
- Whether to trim the resume's "Additional" certs to match the site

### Not started
- **No git repo, nothing pushed.** He said "let's not do repos yet, I'll tell you what
  to do later." Do not init or push without being asked.
- Two repos will eventually be needed: `banyourself.github.io` (this folder) and
  `banyourself` (profile README).
- `TryHackMe` / `Hack The Box` link fields are blank, so those buttons don't render.

---

## 9. Environment gotchas that cost time

- **Browser/preview MCP tools got permanently blocked** partway through by a safety
  classifier reacting to earlier conversation content. Could not screenshot or run the
  page for most of the build. Everything since is verified statically. **In a fresh
  chat these should work again, use them, visual verification is much better.**
- **LinkedIn returns HTTP 999** to scrapers. Cannot be fetched. Use Credly instead.
- **Credly has an undocumented public JSON endpoint** and it's the best source of truth:
  `https://www.credly.com/users/kevin-le-cyber/badges.json?page=1&page_size=50`
  Note it does NOT expose a `public_url` field, build the badge URL from `id`.
- **Windows console is cp1252.** Printing `⟨` or `-` from a Python script raises
  `UnicodeEncodeError` and can abort the script *before it writes the file*. Never print
  non-ASCII in a patch script.
- Git config already set: `banyourself` / `publicusekevin@gmail.com`, SSH key works,
  `gh` CLI 2.97.0 installed but **not authenticated** (`gh auth login` needs the user).

---

## 10. Lessons from mistakes I made

Read this before scripting any edit.

1. **Scripted find-and-replace with substring anchors broke this code three times.**
   - `  paintToggle();` matched inside the indented `    paintToggle();`, injecting an
     event listener into `setTheme()` so every theme toggle leaked a new listener.
   - Inserting after `id: "CS-002"` produced `tags: [],,`, a hard SyntaxError.
   - "Fixing" that stripped the comma off `id: "CS-002"`, also a SyntaxError.
   Either would have blanked the entire site. **Bracket-balance checks do not catch
   these.** Use `node --check` after every edit, and read the result.
2. **`white-space: pre-wrap` on prose caused ragged mid-sentence wrapping**, because it
   preserved source line breaks *and* soft-wrapped. Fixed in `prose()`: blank line =
   paragraph, single newlines flow.
3. **`<button>` centers its own content vertically**, so grid-stretched cards floated
   their text to the middle. Needed explicit `flex-direction: column;
   justify-content: flex-start`.
4. **`display: none` stops `animationend` from firing**, so the mob cleanup handler never
   ran and the live counter stuck. CSS hiding alone is not enough, JS must remove them.
5. **Transform conflicts:** an element can only have one `transform`. Animation transforms
   clobber inline ones. Scale had to move into the keyframe via a custom property.
6. **Press Start 2P is illegible below ~11px.** Anything smaller uses VT323.
7. Don't render text over the photo column without checking width, several overflow
   bugs came from long strings in `auto`-sized grid columns.

---

## 11. Design tokens

**Case File:** paper `#efe8d6` / `#f6f1e3`, manila `#d7c39a`, ink `#211e19`,
stamp red `#9c2b21`, green `#3d6349`.
Severity: critical `#8c2019`, high `#a8551e`, medium `#87701d`, low `#4f6350`.

**Minecraft:** backdrop `#201f24` + bedrock tile at 70% dark overlay, stone panel
`#c6c6c6`, slot grey `#8b8b8b`, CTA green `#3c8527`.
Bevels: out = `inset 2px 2px 0 #fff, inset -2px -2px 0 #555`; in = the reverse.

Contrast was checked, not eyeballed. The bedrock overlay is `.70` specifically because
`.66` gave the footer only 4.37:1 and failed AA; `.70` gives 4.88:1 worst case.
