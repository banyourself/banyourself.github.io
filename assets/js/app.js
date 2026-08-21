(() => {
  "use strict";

  const SEV_ORDER = ["critical", "high", "medium", "low", "info"];
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // {TOKEN} placeholders in casefiles.js get filled at page load so dates never go stale
  const NOW = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const YEAR = NOW.getFullYear();
  const TOKENS = {
    YEAR:        String(YEAR),
    NEXT_YEAR:   String(YEAR + 1),
    // an internship hunt after June is aiming at next summer, not the one that just ended
    INTERN_YEAR: String(NOW.getMonth() >= 6 ? YEAR + 1 : YEAR),
    TODAY:       `${YEAR}-${pad(NOW.getMonth() + 1)}-${pad(NOW.getDate())}`,
    FILEDATE:    `${pad(NOW.getMonth() + 1)}${pad(NOW.getDate())}${pad(YEAR % 100)}`,
    MONTH:       NOW.toLocaleString("en-US", { month: "long" }),
    NAME:        (typeof SUBJECT !== "undefined" && SUBJECT.name) || "",
    HANDLE:      (typeof SUBJECT !== "undefined" && SUBJECT.handle) || ""
  };
  const fill = (s) => s.indexOf("{") === -1 ? s
    : s.replace(/\{([A-Z_]+)\}/g, (m, k) => (k in TOKENS ? TOKENS[k] : m));

  // escape everything from casefiles.js before it touches innerHTML
  const esc = (s) => fill(String(s ?? "")).replace(/[&<>"']/g, (c) => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
  ));

  // ``` fences become <pre>, so you can paste code in raw
  // runs on already-escaped text, so the only tag it can ever emit is <strong>
  const bold = (s) => s.replace(/\*\*([^*\n]+)\*\*/g, "<strong>$1</strong>");

  function prose(text) {
    if (!text) return "";
    return String(text).split(/```/).map((chunk, i) => {
      if (i % 2) return `<pre><code>${esc(chunk.replace(/^\n/, ""))}</code></pre>`;
      // blank line = new paragraph. single newlines are just source wrapping, so flow them.
      return chunk.split(/\n[ \t]*\n/)
        .map((p) => p.replace(/[ \t]*\n[ \t]*/g, " ").trim())
        .filter(Boolean)
        .map((p) => `<p>${linkify(bold(esc(p)))}</p>`)
        .join("");
    }).join("");
  }

  // a case can relabel the severity buckets (CS-002 uses them as plugin categories).
  // falls through to the raw severity word, which is what the vuln cases want.
  const toneLabel = (c, sev) => ((c && c.tones && c.tones[sev]) || sev);

  const sevRank = (s) => {
    const i = SEV_ORDER.indexOf(String(s || "info").toLowerCase());
    return i === -1 ? SEV_ORDER.length : i;
  };

  function stamps(st = {}) {
    const out = [];
    if (st.cve)       out.push(`<span class="stamp" data-land>CVE assigned</span>`);
    if (st.credited)  out.push(`<span class="stamp stamp--ok" data-land>Credited</span>`);
    if (st.patched)   out.push(`<span class="stamp stamp--ok" data-land>Patched</span>`);
    if (st.reported && !st.patched) out.push(`<span class="stamp" data-land>Reported</span>`);
    if (st.shipped)   out.push(`<span class="stamp stamp--info" data-land>Deployed</span>`);
    if (!out.length)  out.push(`<span class="stamp stamp--void" data-land>In progress</span>`);
    return out.join("");
  }

  // Allowlist the schemes a link is ever allowed to use. Nothing here should be
  // able to become javascript: or data: even if I fat-finger casefiles.js.
  const safeUrl = (u) => {
    const s = String(u || "").trim();
    if (!s || s.charAt(0) === "⟨") return "";
    if (/^(https?:|mailto:)/i.test(s)) return s;
    if (/^#[\w/-]*$/.test(s)) return s;        // same-page route, e.g. #/case/MC-001
    if (/^[\w][\w./-]*$/.test(s)) return s;   // relative path, no protocol
    return "";
  };

  // [label](url) in prose. Input is already escaped, so the brackets are literal and the
  // only thing this can add is an anchor whose href safeUrl already allowed.
  function linkify(escaped) {
    return escaped.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (whole, label, href) => {
      const u = safeUrl(href.replace(/&amp;/g, "&"));
      if (!u) return whole;
      const ext = /^https?:/i.test(u) ? ' target="_blank" rel="noopener noreferrer"' : "";
      return `<a href="${esc(u)}"${ext}>${label}</a>`;
    });
  }

  function link(label, href, opt = {}) {
    const u = safeUrl(href);
    if (!u) return "";
    const external = /^https?:/i.test(u) ? ' target="_blank" rel="noopener noreferrer"' : "";
    const dl = opt.download ? ` download="${esc(opt.download)}"` : "";
    return `<a class="btn${opt.solid ? " btn--solid" : ""}" href="${esc(u)}"${external}${dl}>${esc(label)}</a>`;
  }

  function copyButton(label, value) {
    if (!value || String(value).charAt(0) === "⟨") return "";
    return `<button class="btn" type="button" data-copy="${esc(value)}">${esc(label)}</button>`;
  }

  const redact = (txt, on) => on
    ? `<span class="redact" tabindex="0" role="button" aria-label="Redacted - click to reveal">${esc(txt)}</span>`
    : esc(txt);

  // Nothing behind this one. The name never reaches the page at all, because
  // casefiles.js ships publicly and a reveal-on-click bar withholds nothing.
  const sealed = (why) => `<span class="redact redact--sealed" role="img" aria-label="${esc(why)}"></span>`;

  function renderCover() {
    const s = SUBJECT;
    $("#cover-name").insertAdjacentHTML("afterbegin", esc(s.name));
    $("#cover-role").textContent = fill(`${s.role}  ·  @${s.handle}`);
    $("#cover-fileno").textContent = `FILE NO. ${TOKENS.FILEDATE}-${String(s.handle).toUpperCase()}`;
    $("#m-track").textContent  = fill(s.track);
    $("#m-school").textContent = fill(s.school);
    $("#m-loc").textContent    = fill(s.location);
    $("#m-status").textContent = fill(s.status);
    $("#foot-left").textContent = fill(`${s.name} · @${s.handle}`);
    $("#foot-updated").textContent = `Last updated ${new Date(document.lastModified).toISOString().slice(0, 10)}`;
    $("#about-status").textContent = fill(s.status);

    const L = s.links || {};
    const buttons = [
      link("GitHub", L.github, { solid: true }),
      link("LinkedIn", L.linkedin),
      // mailto only works if you have a mail client set up, and plenty of people
      // don't, so this copies the address instead. Always works.
      copyButton("Email", L.email),
      link("TryHackMe", L.tryhackme),
      link("Hack The Box", L.hackthebox),
      link("Credly", L.credly),
      link("Resume", L.resume, { download: "Kevin_Le_Resume.pdf" })
    ].filter(Boolean).join("");

    $("#cover-links").innerHTML = buttons;
    $("#about-links").innerHTML = buttons;

    mountPhoto(s);
    typewrite($("#cover-line"), lineFor());
  }

  // line may be a string, or { dossier, gui } for a per-theme tagline
  function lineFor() {
    const l = SUBJECT.line;
    if (!l) return "";
    return fill(typeof l === "string" ? l : (themeIsGui() ? l.gui : l.dossier) || l.dossier || "");
  }

  // falls back to the "not on file" card if the path is blank or the file 404s
  function mountPhoto(s) {
    const mug = $("#mug");
    if (!mug || !s.photo || s.photo.charAt(0) === "⟨") return;
    const keep = mug.innerHTML;
    const img = document.createElement("img");
    img.alt = s.name;
    img.addEventListener("error", () => {
      // pre-2020 Safari has no webp, retry the jpg once before giving up
      if (/\.webp$/.test(img.getAttribute("src") || "")) {
        img.src = s.photo.replace(/\.webp$/, ".jpg");
        return;
      }
      mug.innerHTML = keep;
      mug.classList.remove("mug--photo");
    });
    img.src = s.photo;
    mug.innerHTML = '<div class="clip" aria-hidden="true"></div>';
    mug.appendChild(img);
    mug.classList.add("mug--photo");
  }

  // bumped on every call so a theme switch mid-type cancels the run in flight
  let twRun = 0;

  function typewrite(el, text) {
    if (!el) return;
    const run = ++twRun;
    el.classList.remove("done");
    if (reduceMotion) { el.textContent = text; el.classList.add("done"); return; }
    el.textContent = "";
    let i = 0;
    const tick = () => {
      if (run !== twRun) return;
      el.textContent = text.slice(0, ++i);
      if (i < text.length) setTimeout(tick, text[i] === " " ? 14 : 22);
      else setTimeout(() => { if (run === twRun) el.classList.add("done"); }, 1400);
    };
    setTimeout(tick, 320);
  }

  function renderIndex() {
    $("#case-count").textContent = `${CASES.length} folder${CASES.length === 1 ? "" : "s"}`;

    $("#folders").innerHTML = CASES.map((c) => {
      const counts = {};
      (c.findings || []).forEach((f) => {
        const k = String(f.severity).toLowerCase();
        counts[k] = (counts[k] || 0) + 1;
      });
      const hasTags = (c.tags || []).length > 0;
      const pills = hasTags ? "" : SEV_ORDER
        .filter((s) => counts[s])
        .map((s) => `<span class="pill pill--${s}">${esc(toneLabel(c, s))}</span>`)
        .join("");
      // a tag is either "Name" or { name, tone }. tone reuses the severity pill colors.
      const tags = (c.tags || [])
        .map((t) => (typeof t === "string" ? { name: t } : t))
        .map((t) => {
          const tone = SEV_ORDER.includes(t.tone) ? t.tone : "info";
          return `<span class="pill pill--${tone}">${esc(t.name)}</span>`;
        })
        .join("");

      return `
        <button class="folder" data-case="${esc(c.id)}">
          <span class="folder__no">Case ${esc(c.caseNo)}</span>
          <span class="folder__kind">${esc(c.kind)}</span>
          <span class="folder__t">${esc(c.title)}</span>
          <span class="folder__b">${esc(c.blurb)}</span>
          <span class="folder__f">
            ${pills}${tags}
            <span class="folder__open">Open file →</span>
          </span>
        </button>`;
    }).join("");
  }

  let activeCase = null;
  let sevFilter = "all";
  let page = 1;
  const PER_PAGE = 10;

  function renderCase(id) {
    const c = CASES.find((x) => x.id === id);
    if (!c) return go("#/cases");
    activeCase = c;
    sevFilter = "all";
    page = 1;
    setTitle(c.title);

    // color the meta block by the worst finding, not just "has findings"
    const worst = (c.findings || []).reduce((w, f) => Math.min(w, sevRank(f.severity)), SEV_ORDER.length);
    const metaSev = worst < SEV_ORDER.length ? SEV_ORDER[worst] : "info";

    const meta = `
      <div class="writeup__meta sev-${metaSev}">
        <div class="row"><span class="lbl">Case no.</span><span class="lead"></span><span class="val">${esc(c.caseNo)}</span></div>
        <div class="row"><span class="lbl">Type</span><span class="lead"></span><span class="val">${esc(c.kind)}</span></div>
        <div class="row"><span class="lbl">Period</span><span class="lead"></span><span class="val">${esc(c.period)}</span></div>
        ${c.repo && !c.repo.startsWith("⟨") ? `<div class="row"><span class="lbl">Source</span><span class="lead"></span><span class="val"><a href="${esc(c.repo)}" target="_blank" rel="noopener">repository ↗</a></span></div>` : ""}
        <div style="margin-top:.9rem;display:flex;flex-wrap:wrap;gap:.6rem">${stamps(c.status)}</div>
      </div>`;

    // the footprint is a property of the pack, not of any one packet, so it lives on the
    // case and is stated once here rather than repeated on every finding
    // one row per pack, same shape for each, so the headline and the rest read as one
    // set instead of a big number followed by a bullet list
    const dep = c.deployment || {};
    const packs = dep.headline ? [dep.headline, ...(dep.others || [])] : [];
    const footprint = packs.length ? `
      <div class="deploy__sub">
        <div class="lbl">Deployment footprint<span class="fp__disc">- all mods mentioned below can be found actively deployed in the following modpacks below;</span></div>
        <div class="fp">${packs.map((k) => `
          <div class="fp__row">
            <span class="fp__n">${esc(k.downloads || "?")}</span>
            <span class="fp__u">downloads</span>
            <span class="fp__name">${k.url ? `<a href="${esc(k.url)}" target="_blank" rel="noopener">${esc(k.name)}</a>` : esc(k.name)}</span>
            ${k.note ? `<span class="fp__note">${esc(k.note)}</span>` : ""}
          </div>`).join("")}
        </div>
      </div>` : "";

    const scope = (c.scope || footprint) ? `
      <div class="deploy" style="border-left:.3rem solid var(--stamp-green)">
        <div class="deploy__head">Scope &amp; authorization</div>
        ${c.scope ? `<p style="margin:0;font-size:.95rem">${linkify(esc(c.scope))}</p>` : ""}
        ${footprint}
      </div>` : "";

    const stack = (c.stack || []).length
      ? `<div class="chips">${c.stack.map((s) => `<span>${esc(s)}</span>`).join("")}</div>` : "";

    let body;
    if (c.findings && c.findings.length) {
      body = `
        <div class="filters" role="group" aria-label="Filter by ${esc(c.filterLabel || "severity")}">
          <span class="lbl" style="margin-right:.3rem">${esc(c.filterLabel || "Severity")}</span>
          <button class="chip" data-sev="all" aria-pressed="true">All</button>
          ${SEV_ORDER.filter((s) => c.findings.some((f) => String(f.severity).toLowerCase() === s))
            .map((s) => `<button class="chip" data-sev="${s}" aria-pressed="false">${esc(toneLabel(c, s))}</button>`).join("")}
        </div>
        <ul class="findings" id="findings-list"></ul>
        <nav class="pager" id="findings-pager" aria-label="Finding pages"></nav>`;
    } else {
      body = `<div class="dossier">${(c.sections || []).map((s, i) => `
        <div class="beat">
          <h3 class="beat__h"><span class="n">${String(i + 1).padStart(2, "0")}</span>${esc(s.head)}</h3>
          ${prose(s.body)}
        </div>`).join("")}</div>`;
    }

    $("#view-case").innerHTML = `
      ${crumb([["Case Files", "#/cases"]], c.caseNo)}
      <h2 class="h">${esc(c.title)}</h2>
      ${meta}${scope}
      <p class="sub" style="margin-bottom:1.2rem">${esc(c.blurb)}</p>
      ${stack}
      <div style="margin-top:2rem">${body}</div>`;

    if (c.findings && c.findings.length) renderFindings();
    show("view-case");
    landStamps();
  }

  function renderFindings() {
    const list = $("#findings-list");
    if (!list) return;
    const items = [...activeCase.findings]
      .filter((f) => sevFilter === "all" || String(f.severity).toLowerCase() === sevFilter)
      .sort((a, b) => sevRank(a.severity) - sevRank(b.severity));

    const pages = Math.max(1, Math.ceil(items.length / PER_PAGE));
    if (page > pages) page = pages;
    const shown = items.slice((page - 1) * PER_PAGE, page * PER_PAGE);

    list.innerHTML = shown.length ? shown.map((f) => {
      const sev = String(f.severity).toLowerCase();
      return `
        <li>
          <button class="finding sev-${sev}" data-finding="${esc(f.ref)}">
            <span class="finding__bar" aria-hidden="true"></span>
            <span class="finding__sev">${esc(toneLabel(activeCase, sev))}</span>
            <span>
              <span class="finding__t">${esc(f.title)}</span>
              <span class="finding__mod">${esc(f.sub || [f.mod, f.version, f.cwe].filter(Boolean).join(" · "))}</span>
            </span>
            <span class="finding__ref">${esc(f.ref)} →</span>
          </button>
        </li>`;
    }).join("") : `<li><p class="sub">Nothing at this filter.</p></li>`;

    const pager = $("#findings-pager");
    if (!pager) return;
    if (pages < 2) { pager.innerHTML = ""; return; }
    const from = (page - 1) * PER_PAGE + 1;
    const to = Math.min(page * PER_PAGE, items.length);
    // page numbers stay a short window so 7 pages does not become 7 buttons of noise
    const win = [];
    for (let n = 1; n <= pages; n++) {
      if (n === 1 || n === pages || Math.abs(n - page) <= 1) win.push(n);
      else if (win[win.length - 1] !== "gap") win.push("gap");
    }
    pager.innerHTML = `
      <span class="lbl">${from}-${to} of ${items.length}</span>
      <button class="chip" data-page="prev"${page === 1 ? " disabled" : ""}>Prev</button>
      ${win.map((n) => n === "gap"
        ? `<span class="pager__gap">...</span>`
        : `<button class="chip" data-page="${n}" aria-pressed="${n === page}">${n}</button>`).join("")}
      <button class="chip" data-page="next"${page === pages ? " disabled" : ""}>Next</button>`;
  }

  function renderFinding(ref) {
    let c = null, f = null;
    for (const cs of CASES) {
      const hit = (cs.findings || []).find((x) => x.ref === ref);
      if (hit) { c = cs; f = hit; break; }
    }
    if (!f) return go("#/cases");
    setTitle(`${f.ref} ${f.title}`);
    const sev = String(f.severity).toLowerCase();

    const packets = (f.packets || []).length ? `
      <table class="tbl">
        <caption>Affected packet handlers</caption>
        <thead><tr><th>Handler</th><th>Intended behavior</th><th>Abuse potential</th></tr></thead>
        <tbody>${f.packets.map((p) => `
          <tr><td>${f.redacted ? sealed("Handler name withheld until a patch ships") : esc(p.name)}</td><td>${esc(p.does)}</td><td>${esc(p.couldDo)}</td></tr>`).join("")}
        </tbody>
      </table>` : "";

    const beatSrc = (f.beats || []).length
      ? f.beats.map((b) => [b.head, b.body])
      : [["Discovery",  f.discovery],
         ["Root cause", f.rootCause],
         ["Impact",     f.impact],
         ["The patch",  f.patch]];
    const beats = beatSrc.filter(([, v]) => v).map(([h, v], i) => `
      <div class="beat">
        <h3 class="beat__h"><span class="n">${String(i + 1).padStart(2, "0")}</span>${esc(h)}</h3>
        ${prose(v)}
        ${!f.beats && h === "Impact" ? packets : ""}
      </div>`).join("");

    const timeline = (f.disclosure || []).length ? `
      <div class="beat">
        <h3 class="beat__h"><span class="n">05</span>Disclosure</h3>
        <ol class="tl">${f.disclosure.map((d) =>
          `<li><time>${esc(d.date)}</time>${esc(d.event)}</li>`).join("")}
        </ol>
        ${f.credit ? `<p style="margin-top:1.1rem"><span class="stamp stamp--ok" data-land>Credited</span> &nbsp;${esc(f.credit)}</p>` : ""}
      </div>` : "";

    $("#view-finding").innerHTML = `
      ${crumb([["Case Files", "#/cases"], [c.caseNo, `#/case/${c.id}`]], f.ref)}
      <article class="writeup">
        <span class="pill pill--${sev}" style="font-size:.72rem">${esc(toneLabel(c, sev))}</span>
        <h2>${esc(f.title)}</h2>
        <div class="writeup__meta sev-${sev}">
          <div class="row"><span class="lbl">Reference</span><span class="lead"></span><span class="val">${esc(f.ref)}</span></div>
          ${(f.meta || [["Component", f.mod], ["Version", f.version], ["Weakness", f.cwe]])
            .map((r) => (Array.isArray(r) ? r : [r.lbl, r.val]))
            .filter(([, v]) => v)
            .map(([l, v]) => `<div class="row"><span class="lbl">${esc(l)}</span><span class="lead"></span><span class="val">${/^https?:/.test(String(v)) ? `<a href="${esc(v)}" target="_blank" rel="noopener">repository ↗</a>` : esc(v)}</span></div>`).join("")}
          ${f.redacted ? `<p style="margin:.9rem 0 0;font-size:.85rem;font-family:var(--f-mono);color:var(--ink-faint)">
            Mod and version are published. Handler names stay withheld until a patch ships,
            so the bars below are empty rather than hidden.
          </p>` : ""}
        </div>
        ${beats}
        ${timeline}
      </article>`;

    show("view-finding");
    landStamps();
  }

  function crumb(trail, current) {
    return `<nav class="crumb" aria-label="Breadcrumb">
      ${trail.map(([label, href]) =>
        `<button data-go="${esc(href)}">${esc(label)}</button><span aria-hidden="true">/</span>`).join("")}
      <span aria-current="page">${esc(current)}</span>
    </nav>`;
  }

  // deep links should bookmark and share with a useful tab title
  const BASE_TITLE = document.title;
  const setTitle = (extra) => {
    document.title = extra ? `${fill(extra)} | ${BASE_TITLE}` : BASE_TITLE;
  };

  // no auto-scroll on first paint, let people read the cover
  let booted = false;

  function show(which) {
    ["view-index", "view-case", "view-finding"].forEach((v) => {
      $("#" + v).hidden = v !== which;
    });
    $("#panel-cases").focus({ preventScroll: true });
    scrollToContent();
  }

  // without this, clicking a folder feels like nothing happened
  function scrollToContent() {
    if (!booted) return;
    const tabs = $(".tabs");
    if (!tabs) return;
    const y = tabs.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: y, behavior: reduceMotion ? "auto" : "smooth" });
  }

  function selectTab(id) {
    $$(".tab").forEach((t) => {
      const on = t.id === id;
      t.setAttribute("aria-selected", String(on));
      $("#" + t.getAttribute("aria-controls")).hidden = !on;
    });
  }

  function landStamps() {
    const els = $$(".stamp[data-land]:not(.landed)");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("landed"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en, i) => {
        if (!en.isIntersecting) return;
        setTimeout(() => en.target.classList.add("landed"), i * 90);
        io.unobserve(en.target);
      });
    }, { threshold: 0.9 });
    els.forEach((e) => io.observe(e));
  }

  const go = (hash) => { location.hash = hash; };

  function route() {
    const h = location.hash || "#/cases";
    const m = h.match(/^#\/(cases|case|finding|creds|caps|about)\/?(.*)$/);
    if (!m) { selectTab("tab-cases"); setTitle(null); show("view-index"); return; }
    const [, kind, arg] = m;

    if (kind === "creds") { selectTab("tab-creds"); setTitle("Credentials");  scrollToContent(); landStamps(); return; }
    if (kind === "caps")  { selectTab("tab-caps");  setTitle("Capabilities"); scrollToContent(); return; }
    if (kind === "about") { selectTab("tab-about"); setTitle("Contact");      scrollToContent(); return; }

    selectTab("tab-cases");
    if (kind === "case" && arg)         renderCase(decodeURIComponent(arg));
    else if (kind === "finding" && arg) renderFinding(decodeURIComponent(arg));
    else { setTitle(null); show("view-index"); landStamps(); }
  }

  function renderCreds() {
    const card = (c, cls = "") => {
      const u = safeUrl(c.url);
      // name links straight to the badge when there is one, plain text when there isn't
      const name = u
        ? `<a class="cred__link" href="${esc(u)}" target="_blank" rel="noopener noreferrer">${esc(c.name)}</a>`
        : esc(c.name);
      return `
      <div class="cred ${cls}">
        <div class="cred__n">${name}</div>
        <div class="cred__i">${esc(c.issuer)} · ${esc(c.year || c.eta || "")}</div>
      </div>`;
    };
    $("#creds-earned").innerHTML   = (CREDENTIALS.earned   || []).map((c) => card(c)).join("");
    const pursuing = CREDENTIALS.pursuing || [];
    $("#creds-pursuing").innerHTML = pursuing.map((c) => card(c, "cred--pursuing")).join("");
    // no point showing an empty "In Progress" heading
    const ph = $("#creds-pursuing-head");
    if (ph) ph.hidden = !pursuing.length;
    $("#creds-pursuing").hidden = !pursuing.length;
    $("#verify-links").innerHTML = (CREDENTIALS.verify || [])
      .filter((v) => v.url)
      .map((v, i) => `<a class="btn${i === 0 ? " btn--solid" : ""}" href="${esc(v.url)}" target="_blank" rel="noopener">${esc(v.label)}</a>`)
      .join("");
  }

  function renderCaps() {
    $("#caps").innerHTML = (CAPABILITIES || []).map((g) => `
      <div>
        <h3>${esc(g.group)}</h3>
        <ul>${g.items.map((i) => `
          <li><span>${esc(i.name)}</span><span class="lead"></span>
              <span class="lvl lvl--${esc(i.level)}">${esc(i.level)}</span></li>`).join("")}
        </ul>
      </div>`).join("");
  }

  function renderNotes() {
    const ul = $("#notes");
    // entries still holding a placeholder are drafts, so they stay off the live page
    const notes = (typeof FIELD_NOTES === "undefined" ? [] : FIELD_NOTES)
      .filter((n) => !`${n.date}${n.note}`.includes("⟨"));
    if (!notes.length) {
      ul.closest("section").querySelectorAll(".h")[1]?.remove();
      ul.remove();
      return;
    }
    ul.innerHTML = notes.map((n) =>
      `<li><time>${esc(n.date)}</time>${prose(n.note)}</li>`).join("");
  }

  document.addEventListener("click", (e) => {
    const folder = e.target.closest("[data-case]");
    if (folder) return go(`#/case/${encodeURIComponent(folder.dataset.case)}`);

    const finding = e.target.closest("[data-finding]");
    if (finding) return go(`#/finding/${encodeURIComponent(finding.dataset.finding)}`);

    const back = e.target.closest("[data-go]");
    if (back) return go(back.dataset.go);

    const pageBtn = e.target.closest(".chip[data-page]");
    if (pageBtn) {
      const v = pageBtn.dataset.page;
      const items = (activeCase.findings || []).filter(
        (f) => sevFilter === "all" || String(f.severity).toLowerCase() === sevFilter);
      const pages = Math.max(1, Math.ceil(items.length / PER_PAGE));
      page = v === "prev" ? Math.max(1, page - 1)
           : v === "next" ? Math.min(pages, page + 1)
           : Math.min(pages, Math.max(1, Number(v) || 1));
      renderFindings();
      const tabs = $(".tabs");
      if (tabs) window.scrollTo({ top: tabs.offsetTop - 8, behavior: "smooth" });
      return;
    }

    const chip = e.target.closest(".chip[data-sev]");
    if (chip) {
      sevFilter = chip.dataset.sev;
      page = 1;
      $$(".chip[data-sev]").forEach((c) => c.setAttribute("aria-pressed", String(c === chip)));
      renderFindings();
      return;
    }

    const tab = e.target.closest(".tab");
    if (tab) {
      const map = { "tab-cases": "#/cases", "tab-creds": "#/creds", "tab-caps": "#/caps", "tab-about": "#/about" };
      return go(map[tab.id]);
    }

    const bar = e.target.closest(".redact:not(.redact--sealed)");
    if (bar) bar.classList.add("open");

    const cp = e.target.closest("[data-copy]");
    if (cp) {
      const val = cp.dataset.copy;
      const done = () => document.dispatchEvent(new CustomEvent("portfolio:toast", {
        detail: { kind: "Copied to clipboard", name: val, icon: "paper" }
      }));
      // clipboard API needs https or localhost, so keep the old textarea trick around
      if (navigator.clipboard) {
        navigator.clipboard.writeText(val).then(done).catch(() => fallbackCopy(val, done));
      } else {
        fallbackCopy(val, done);
      }
    }
  });

  function fallbackCopy(text, done) {
    const t = document.createElement("textarea");
    t.value = text;
    t.setAttribute("readonly", "");
    t.style.cssText = "position:fixed;top:-100px;opacity:0";
    document.body.appendChild(t);
    t.select();
    try { document.execCommand("copy"); done(); } catch (e) {}
    t.remove();
  }

  document.addEventListener("keydown", (e) => {
    if ((e.key === "Enter" || e.key === " ") && e.target.classList?.contains("redact")) {
      e.preventDefault();
      e.target.classList.add("open");
      return;
    }
    // Escape walks back up the drill-down
    if (e.key === "Escape") {
      const h = location.hash;
      const mf = h.match(/^#\/finding\/(.+)$/);
      if (mf) {
        const ref = decodeURIComponent(mf[1]);
        const owner = CASES.find((c) => (c.findings || []).some((f) => f.ref === ref));
        if (owner) return go(`#/case/${encodeURIComponent(owner.id)}`);
      }
      if (/^#\/case\//.test(h)) return go("#/cases");
      return;
    }

    if (!e.target.classList?.contains("tab")) return;
    const tabs = $$(".tab");
    const i = tabs.indexOf(e.target);
    let n = null;
    if (e.key === "ArrowRight") n = (i + 1) % tabs.length;
    if (e.key === "ArrowLeft")  n = (i - 1 + tabs.length) % tabs.length;
    if (e.key === "Home")       n = 0;
    if (e.key === "End")        n = tabs.length - 1;
    if (n !== null) { e.preventDefault(); tabs[n].focus(); tabs[n].click(); }
  });

  window.addEventListener("hashchange", route);

  const root = document.documentElement;
  const toggle = $("#theme-toggle");
  let toastTimer = null;

  function themeIsGui() { return root.getAttribute("data-theme") === "gui"; }

  function paintToggle() {
    const gui = themeIsGui();
    $("#theme-label").textContent = gui ? "Case File Mode" : "Minecraft Mode";
    toggle.setAttribute("aria-pressed", String(gui));
    toggle.setAttribute("aria-label", gui
      ? "Switch to Case File theme"
      : "Switch to Minecraft Mode");
  }

  // Little 16x16 pixel items for the advancement toast, same idea as the real ones.
  const item = (cells) =>
    '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges">' +
    cells.map(([x, y, w, h, c]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}"/>`).join("") +
    "</svg>";

  const ITEMS = {
    // grass block, for flipping into Minecraft Mode
    grass: item([
      [1, 4, 14, 11, "#7c5636"], [1, 4, 14, 3, "#8a6340"],
      [1, 1, 14, 4, "#5fa63c"], [1, 1, 14, 1, "#77c44d"],
      [3, 7, 2, 2, "#6b482c"], [9, 9, 3, 2, "#6b482c"], [6, 11, 2, 2, "#6b482c"]
    ]),
    // book, for going back to the case files
    book: item([
      [2, 1, 12, 14, "#7a3b22"], [2, 1, 2, 14, "#5c2b17"],
      [4, 2, 9, 12, "#ece0c4"],
      [6, 4, 6, 1, "#5a5145"], [6, 6, 6, 1, "#5a5145"],
      [6, 8, 4, 1, "#5a5145"], [6, 10, 5, 1, "#5a5145"]
    ]),
    // sheet of paper, for the resume and anything copied
    paper: item([
      [3, 1, 10, 14, "#f4eeda"], [3, 1, 10, 1, "#ffffff"], [12, 1, 1, 14, "#cfc3a6"],
      [5, 4, 6, 1, "#3a352c"], [5, 6, 6, 1, "#3a352c"],
      [5, 8, 4, 1, "#3a352c"], [5, 10, 5, 1, "#9c2b21"]
    ])
  };

  function toast(kind, name, icon) {
    const el = $("#toast");
    if (!el) return;
    const slot = el.querySelector(".icon");
    if (slot) slot.innerHTML = ITEMS[icon] || ITEMS.paper;
    $("#toast-kind").textContent = kind;
    $("#toast-name").textContent = name;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 3600);
  }

  function setTheme(gui, announce) {
    if (gui) root.setAttribute("data-theme", "gui");
    else root.removeAttribute("data-theme");
    try { localStorage.setItem("theme", gui ? "gui" : "dossier"); } catch (e) {}
    paintToggle();
    typewrite($("#cover-line"), lineFor());
    if (announce) {
      gui ? toast("Advancement Made!", "Minecraft Mode", "grass")
          : toast("Advancement Made!", "Back to Paperwork", "book");
    }
  }

  toggle.addEventListener("click", () => setTheme(!themeIsGui(), true));

  document.addEventListener("portfolio:toast", (e) => {
    const d = e.detail || {};
    toast(d.kind || "", d.name || "", d.icon);
  });

  paintToggle();

  // auto case numbers for any case that doesn't set one
  CASES.forEach((c, i) => {
    if (!c.caseNo) c.caseNo = String(i + 1).padStart(3, "0");
  });

  renderCover();
  renderIndex();
  renderCreds();
  renderCaps();
  renderNotes();
  route();
  landStamps();
  booted = true;

  // console-only nudge while you're still filling this in. Recruiters never see it.
  try {
    const left = (JSON.stringify([SUBJECT, CREDENTIALS, CAPABILITIES, CASES, FIELD_NOTES])
      .match(/⟨/g) || []).length;
    if (left && window.console) {
      console.info(`%c${left} placeholder${left === 1 ? "" : "s"} left in casefiles.js`,
        "color:#9c2b21;font-weight:bold");
    }
  } catch (e) {}
})();
