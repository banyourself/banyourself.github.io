"""Builds the animated Minecraft profile banner. python tools/build_mc_banner.py

The bedrock backdrop is tiled at 1 texel per pixel then upscaled with NEAREST, so it
stays blocky. Text is drawn afterwards at full size with antialiasing off: drawing it
small and upscaling turned the small glyphs to mush.
"""
import os, sys, importlib.util
from PIL import Image, ImageDraw, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "..", "assets", "img", "mc-banner.gif")
F = "C:/Windows/Fonts/"

spec = importlib.util.spec_from_file_location("bedrock", os.path.join(HERE, "build_bedrock.py"))
bedrock = importlib.util.module_from_spec(spec)
sys.modules["bedrock"] = bedrock
spec.loader.exec_module(bedrock)

TW, TH, SCALE = 292, 76, 3
W, H = TW * SCALE, TH * SCALE
SHADOW = 3                      # matches the texel size, so shadows sit on the grid
WHITE, GOLD, GREEN, GREY = (255, 255, 255), (255, 170, 0), (85, 255, 85), (208, 208, 208)
XP, XP_BG, XP_EDGE = (128, 255, 32), (86, 86, 86), (16, 16, 16)
PHRASES = ["SECURITY OPERATIONS", "VULNERABILITY RESEARCH", "CYBERSECURITY & IT"]


def font(name, size):
    for n in (name, "consolab.ttf", "cour.ttf"):
        try:
            return ImageFont.truetype(F + n, size)
        except OSError:
            continue
    return ImageFont.load_default()


TITLE, SUB, SMALL, STAT = (font("consolab.ttf", 76), font("consolab.ttf", 27),
                           font("consolab.ttf", 21), font("consolab.ttf", 25))
shadow = lambda c: tuple(v // 4 for v in c)


def mc_text(d, xy, s, f, c):
    """Minecraft draws text twice: color, plus color/4 offset down-right."""
    x, y = xy
    d.text((x + SHADOW, y + SHADOW), s, font=f, fill=shadow(c))
    d.text((x, y), s, font=f, fill=c)


def backdrop():
    px = bedrock.build()                     # the real 16x16 bedrock texture
    tile = Image.new("RGB", (16, 16))
    for y in range(16):
        for x in range(16):
            tile.putpixel((x, y), tuple(int(px[y][x][i:i + 2], 16) for i in (0, 2, 4)))
    # 6px texels, so one bedrock tile is 96px and reads as blocks, not noise
    tx = 6
    sw, sh = -(-W // tx), -(-H // tx)
    small = Image.new("RGB", (sw, sh))
    for oy in range(0, sh + 16, 16):
        for ox in range(0, sw + 16, 16):
            small.paste(tile, (ox, oy))
    big = small.resize((sw * tx, sh * tx), Image.NEAREST).crop((0, 0, W, H))
    return Image.blend(big, Image.new("RGB", (W, H), (0, 0, 0)), 0.45)


BG = backdrop()


def frame(sub, cursor):
    img = BG.copy()
    d = ImageDraw.Draw(img)
    d.fontmode = "1"                         # no antialiasing, hard pixel edges

    mc_text(d, (42, 20), "KEVIN LE", TITLE, WHITE)
    mc_text(d, (46, 116), sub + ("_" if cursor else " "), SUB, GOLD)
    mc_text(d, (46, 154), "banyourself.github.io", SMALL, GREY)

    bx, by, bw, bh = 42, 196, W - 84, 9
    d.rectangle([bx - 3, by - 3, bx + bw + 3, by + bh + 3], fill=XP_EDGE)
    d.rectangle([bx, by, bx + bw, by + bh], fill=XP_BG)
    d.rectangle([bx, by, bx + int(bw * 0.72), by + bh], fill=XP)

    mc_text(d, (706, 30), "LVL 6", STAT, GREEN)
    mc_text(d, (706, 66), "CERTS", SMALL, GREY)
    return img


frames, durations = [], []
for phrase in PHRASES:
    for i in range(2, len(phrase) + 1, 2):
        frames.append(frame(phrase[:i], True)); durations.append(130)
    frames.append(frame(phrase, True)); durations.append(400)
    for k in range(6):                      # long hold so it can actually be read
        frames.append(frame(phrase, k % 2 == 0)); durations.append(520)

pal = frames[0].quantize(colors=64)
frames = [f.quantize(palette=pal, dither=Image.Dither.NONE) for f in frames]
frames[0].save(OUT, save_all=True, append_images=frames[1:], duration=durations,
               loop=0, optimize=True, disposal=1)
print("written:", os.path.abspath(OUT), (W, H),
      "%d frames, %.0f KB" % (len(frames), os.path.getsize(OUT) / 1024))
