"""Turns the real 16x16 bedrock texture into the background tile SVG.
python tools/build_bedrock.py

assets/img/bedrock-src.png is the source of truth, downsampled from the texture Kevin
supplied. gui.css darkens the result with a translucent overlay, which keeps the
contrast between patches while letting light text sit on top.
"""
import os
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "..", "assets", "img", "bedrock-src.png")
OUT = os.path.join(HERE, "..", "assets", "img", "bedrock.svg")
N = 16


def build():
    im = Image.open(SRC).convert("RGB")
    if im.size != (N, N):
        raise SystemExit("expected a %dx%d tile, got %s" % (N, N, im.size))
    return [["%02x%02x%02x" % im.getpixel((x, y)) for x in range(N)] for y in range(N)]


def svg(px):
    out = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 %d %d" '
           'shape-rendering="crispEdges">' % (N, N)]
    for y in range(N):
        x = 0
        while x < N:                       # merge horizontal runs to keep the file small
            t, run = px[y][x], 1
            while x + run < N and px[y][x + run] == t:
                run += 1
            out.append('<rect x="%d" y="%d" width="%d" height="1" fill="#%s"/>' % (x, y, run, t))
            x += run
    out.append("</svg>")
    return "".join(out)


if __name__ == "__main__":          # importable, so the banner builder can reuse build()
    px = build()
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    open(OUT, "w", encoding="utf-8").write(svg(px))
    flat = [c for row in px for c in row]
    print("wrote", os.path.abspath(OUT))
    print("distinct tones:", len(set(flat)))
    print("darkest/lightest:", min(set(flat)), max(set(flat)))
