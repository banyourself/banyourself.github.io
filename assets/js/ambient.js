// Decorative background layer. Wrapped so a failure here can never take the site down.
(() => {
  "use strict";

  const amb = document.getElementById("ambient");
  if (!amb) return;

  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const root = document.documentElement;
  const isGui = () => root.getAttribute("data-theme") === "gui";
  const rand = (a, b) => a + Math.random() * (b - a);

  // Flat sprites on a 12x16 grid. The 3D version looked like melted lego, so the
  // depth now comes from shading inside the sprite the way the real textures do:
  // a lighter top edge, a darker right edge, and a few off-tone pixels for noise.
  const px = (cells) =>
    '<svg viewBox="0 0 12 16" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges">' +
    cells.map(([x, y, w, h, c]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}"/>`).join("") +
    "</svg>";

  const MOBS = {
    creeper: px([
      [2, 0, 8, 8, "#5aa34a"], [2, 0, 8, 1, "#6dbf59"], [9, 1, 1, 7, "#478236"],
      [3, 2, 2, 2, "#141f18"], [7, 2, 2, 2, "#141f18"],
      [5, 4, 2, 2, "#141f18"], [4, 5, 1, 3, "#141f18"], [7, 5, 1, 3, "#141f18"],
      [5, 6, 2, 2, "#141f18"],
      [3, 1, 1, 1, "#6dbf59"], [3, 6, 1, 1, "#478236"], [8, 4, 1, 1, "#66b352"],
      [3, 8, 6, 5, "#4f9441"], [3, 8, 6, 1, "#5aa34a"], [8, 9, 1, 4, "#437c37"],
      [4, 10, 1, 2, "#478236"],
      [3, 13, 2, 3, "#4f9441"], [7, 13, 2, 3, "#4f9441"], [8, 13, 1, 3, "#437c37"]
    ]),
    zombie: px([
      [3, 0, 6, 6, "#4f8f42"], [3, 0, 6, 1, "#5c9e4d"], [8, 1, 1, 5, "#42782f"],
      [4, 2, 1, 2, "#101c14"], [7, 2, 1, 2, "#101c14"],
      [5, 4, 2, 1, "#375c2c"], [4, 1, 1, 1, "#5c9e4d"],
      [3, 6, 6, 5, "#3f6f8f"], [3, 6, 6, 1, "#4a7d9c"], [8, 7, 1, 4, "#35607d"],
      [1, 6, 2, 4, "#4f8f42"], [9, 6, 2, 4, "#4f8f42"],
      [1, 6, 2, 1, "#5c9e4d"], [10, 7, 1, 3, "#42782f"],
      [3, 11, 2, 5, "#2f4f6f"], [7, 11, 2, 5, "#2f4f6f"], [8, 11, 1, 5, "#28455e"]
    ]),
    skeleton: px([
      [3, 0, 6, 6, "#dcdcdc"], [3, 0, 6, 1, "#efefef"], [8, 1, 1, 5, "#bdbdbd"],
      [4, 2, 2, 2, "#242424"], [7, 2, 1, 2, "#242424"], [5, 5, 2, 1, "#9e9e9e"],
      [4, 6, 4, 5, "#d0d0d0"], [4, 6, 4, 1, "#e4e4e4"], [7, 7, 1, 4, "#b4b4b4"],
      [2, 6, 1, 5, "#dcdcdc"], [9, 6, 1, 5, "#cccccc"],
      [4, 11, 1, 5, "#d0d0d0"], [7, 11, 1, 5, "#c4c4c4"]
    ]),
    villager: px([
      [3, 0, 6, 5, "#b5875c"], [3, 0, 6, 1, "#c3956a"], [8, 1, 1, 4, "#a2744c"],
      [3, 1, 6, 1, "#5c4326"],
      [4, 2, 1, 1, "#2b1c12"], [7, 2, 1, 1, "#2b1c12"],
      [5, 2, 2, 4, "#a2744c"], [5, 5, 2, 1, "#8f6540"],
      [3, 6, 6, 6, "#6f5540"], [3, 6, 6, 1, "#7d6049"], [8, 7, 1, 5, "#5e4735"],
      [2, 7, 1, 4, "#6f5540"], [9, 7, 1, 4, "#5e4735"],
      [4, 12, 2, 4, "#5e4735"], [7, 12, 2, 4, "#5e4735"]
    ]),
    pillager: px([
      [3, 0, 6, 5, "#9d9d9d"], [3, 0, 6, 1, "#adadad"], [8, 1, 1, 4, "#8a8a8a"],
      [4, 2, 1, 1, "#6e1010"], [7, 2, 1, 1, "#6e1010"],
      [5, 2, 2, 4, "#8f8f8f"],
      [3, 6, 6, 6, "#2f4a75"], [3, 6, 6, 1, "#3a5885"], [8, 7, 1, 5, "#264063"],
      [5, 6, 2, 6, "#c9a227"], [5, 6, 2, 1, "#dcb63a"],
      [2, 7, 1, 4, "#2f4a75"], [9, 7, 1, 4, "#264063"],
      [4, 12, 2, 4, "#6b4b25"], [7, 12, 2, 4, "#5c3f1f"]
    ])
  };
  const MOB_KEYS = Object.keys(MOBS);

  const make = (cls, style) => {
    const d = document.createElement("div");
    d.className = cls;
    if (style) d.setAttribute("style", style);
    return d;
  };

  const STRIPS = 6;

  // One paper slip: six 8px strips that look like one card until you click it.
  // `stagger` only on first build, so the initial batch isn't all in lockstep.
  function spawnSlip(i, stagger) {
    if (reduce) return;
    const side = i % 2 ? rand(72, 96) : rand(2, 24);   // margins only, never the middle
    const dur = rand(38, 74);
    const slip = make("amb-slip",
      `left:${side.toFixed(1)}%;top:${rand(30, 140).toFixed(1)}%;` +
      `--dx:${rand(-70, 70).toFixed(0)}px;--r0:${rand(-14, 14).toFixed(0)}deg;` +
      `--r1:${rand(-40, 40).toFixed(0)}deg;--o:${rand(0.3, 0.55).toFixed(2)};` +
      `--dur:${dur.toFixed(1)}s;--delay:-${(stagger ? rand(0, dur) : 0).toFixed(1)}s`);
    slip.dataset.slot = i;   // so a respawn keeps the same margin

    for (let n = 0; n < STRIPS; n++) {
      const strip = document.createElement("i");
      // each strip shows its own 8px slice of the same 48px card
      strip.style.cssText =
        `--bp:-${n * 8}px;` +
        `--sx:${rand(-38, 38).toFixed(0)}px;--sy:${rand(46, 104).toFixed(0)}px;` +
        `--sr:${rand(-70, 70).toFixed(0)}deg;--sd:${(n * 0.035).toFixed(3)}s`;
      slip.appendChild(strip);
    }

    amb.appendChild(slip);
  }

  function shredSlip(slip) {
    if (slip.classList.contains("shredding")) return;
    slip.classList.add("shredding");
    const slot = Number(slip.dataset.slot) || 0;
    // swap in a fresh one once the strips have fallen, so the margins don't empty out
    setTimeout(() => { slip.remove(); spawnSlip(slot, false); }, 1000);
  }

  /* .wrap sits above the ambient layer and its box includes the page gutters, so a
     slip showing in the margin is still underneath it and never receives the click.
     Hit-test by hand instead: walk what's under the cursor, top down, and shred the
     first slip found. Bail if an opaque surface comes first, otherwise you'd be
     shredding slips hidden behind the sheet. */
  const OPAQUE = ".sheet, .cover, .tabs, .cred, .folder, .finding, #toast, #reel, .btn, .mug";

  document.addEventListener("click", (e) => {
    if (reduce) return;
    // this runs on every click for the life of the page, so it gets its own guard.
    // the try/catch further down only covers setup.
    try {
      const t = e.target;
      if (!t || typeof t.closest !== "function") return;
      if (t.closest("a, button, input, textarea, [data-copy], .redact")) return;
      for (const el of document.elementsFromPoint(e.clientX, e.clientY)) {
        if (el.classList && el.classList.contains("amb-slip")) return shredSlip(el);
        if (el.matches && el.matches(OPAQUE)) return;
      }
    } catch (err) { /* decorative, never let it break a real click */ }
  });

  function buildStatic() {
    if (reduce) return;

    for (let i = 0; i < 30; i++) {
      amb.appendChild(make("amb-mote",
        `left:${rand(0, 100).toFixed(1)}%;top:${rand(20, 130).toFixed(1)}%;` +
        `animation-duration:${rand(22, 52).toFixed(1)}s;animation-delay:-${rand(0, 40).toFixed(1)}s`));
    }

    for (let i = 0; i < 8; i++) spawnSlip(i, true);

    // redstone dust down each edge; the <i> is the lit segment travelling down
    ["left", "right"].forEach((side, w) => {
      const wire = make("amb-wire", `${side}:1.1%;--lag:-${w ? 1.8 : 0}s`);
      wire.appendChild(document.createElement("i"));
      amb.appendChild(wire);
    });
  }

  let live = 0;
  function spawnMob() {
    if (reduce || !isGui() || live >= 3 || document.hidden) return;
    const rtl = Math.random() < 0.5;
    const secs = rand(16, 30).toFixed(1);
    const m = make(
      "amb-mob" + (rtl ? " amb-mob--rtl" : ""),
      `${rtl ? "left:100vw" : "left:-70px"};--amb-dx:${rtl ? "-110vw" : "110vw"};` +
      `animation-duration:${secs}s;opacity:${rand(0.28, 0.5).toFixed(2)};` +
      `--amb-scale:${rand(0.8, 1.25).toFixed(2)}`
    );
    const inner = document.createElement("i");
    inner.innerHTML = MOBS[MOB_KEYS[(Math.random() * MOB_KEYS.length) | 0]];
    m.appendChild(inner);
    m.addEventListener("animationend", () => { m.remove(); live--; });
    amb.appendChild(m);
    live++;
  }

  // ---------- resume grab ----------
  function setupReel() {
    const reel = document.getElementById("reel");
    if (!reel) return;

    const href = (typeof SUBJECT !== "undefined" && SUBJECT.links && SUBJECT.links.resume) || "";
    if (!href || href.charAt(0) === "⟨") { reel.hidden = true; return; }
    reel.hidden = false;

    const grab = reel.querySelector(".reel-grab");
    if (!grab) return;

    // better to hide the button than send a recruiter to a 404. file:// rejects
    // the request, so local previews fail open and keep it visible.
    if (window.fetch) {
      fetch(href, { method: "HEAD" }).then((r) => { if (!r.ok) reel.hidden = true; }).catch(() => {});
    }

    grab.addEventListener("click", () => {
      reel.classList.add("caught");
      document.dispatchEvent(new CustomEvent("portfolio:toast", {
        detail: isGui()
          ? { kind: "Item Obtained!", name: "Resume", icon: "paper" }
          : { kind: "Retrieved from file", name: "Resume", icon: "paper" }
      }));
      setTimeout(() => {
        // same as the Resume button: download it instead of opening a tab
        const a = document.createElement("a");
        a.href = href;
        a.download = "Kevin_Le_Resume.pdf";
        a.rel = "noopener";
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => reel.classList.remove("caught"), 900);
      }, 480);
    });
  }

  try {
    buildStatic();
    setupReel();
    if (!reduce) {
      for (let i = 0; i < 2; i++) setTimeout(spawnMob, 900 + i * 5200);
      setInterval(spawnMob, 7400);
      // leaving minecraft mode has to clear mobs already mid-walk, and reset the
      // counter, because a display:none element never fires animationend
      new MutationObserver(() => {
        if (isGui()) { spawnMob(); return; }
        amb.querySelectorAll(".amb-mob").forEach((m) => m.remove());
        live = 0;
      }).observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    }
  } catch (e) {
    if (window.console) console.warn("ambient layer disabled:", e);
  }
})();
