"""Generates the redstone dust tiles. python tools/build_redstone.py

Real dust is an irregular chain of small blobs that wanders left and right, not a
straight band. This walks a seeded path down a 16x64 tile and forces it back to the
start x so the tile repeats seamlessly.
"""
import os, random

OUT = os.path.join(os.path.dirname(__file__), "..", "assets", "img")
W, H, STEP = 16, 64, 2
START = 7

# unpowered / powered: (core, edge, fleck)
STATES = {
    "off": ("6e1512", "4a0d0c", "8a1c17"),
    "on":  ("fc1400", "c00f00", "ff5c33"),
}


def path(seed=11):
    random.seed(seed)
    xs, x = [], START
    steps = H // STEP
    for i in range(steps):
        xs.append(x)
        remaining = steps - i - 1
        # steer home near the end so the tile seams cleanly
        if remaining and abs(x - START) >= remaining:
            x += 1 if x < START else -1
        else:
            x += random.choice([-1, -1, 0, 1, 1])
        x = max(3, min(11, x))
    return xs


def svg(core, edge, fleck, xs):
    r = ['<svg xmlns="http://www.w3.org/2000/svg" width="%d" height="%d" '
         'shape-rendering="crispEdges">' % (W, H)]
    random.seed(23)
    for i, x in enumerate(xs):
        y = i * STEP
        r.append('<rect x="%d" y="%d" width="2" height="2" fill="#%s"/>' % (x, y, core))
        # a darker pixel on one shoulder gives the chain its uneven edge
        sx = x - 1 if random.random() < 0.5 else x + 2
        if 0 <= sx < W:
            r.append('<rect x="%d" y="%d" width="1" height="1" fill="#%s"/>' % (sx, y, edge))
        # occasional bright speck, like the dust catching light
        if random.random() < 0.22:
            fx = x + random.choice([-2, 3])
            if 0 <= fx < W:
                r.append('<rect x="%d" y="%d" width="1" height="1" fill="#%s"/>' % (fx, y + 1, fleck))
    r.append("</svg>")
    return "".join(r)


xs = path()
os.makedirs(OUT, exist_ok=True)
for name, (core, edge, fleck) in STATES.items():
    p = os.path.join(OUT, "redstone-%s.svg" % name)
    open(p, "w", encoding="utf-8").write(svg(core, edge, fleck, xs))
    print("wrote", os.path.abspath(p))
print("path drift x=%d..%d, seams at x=%d" % (min(xs), max(xs), xs[0]))
