"""Builds the profile-README banner. python tools/build_banner.py"""
import os, random
from PIL import Image, ImageDraw, ImageFont

HERE = os.path.dirname(__file__)
OUT = os.path.join(HERE, "..", "assets", "img", "banner.png")
F = "C:/Windows/Fonts/"

W, H = 1280, 340
PAPER, PAPER_LIT = (239, 232, 214), (246, 241, 227)
INK, SOFT, FAINT = (33, 30, 25), (76, 70, 59), (122, 114, 99)
RULE, MANILA = (182, 171, 144), (215, 195, 154)
RED = (156, 43, 33)


def font(name, size):
    for n in (name, "cour.ttf", "arial.ttf"):
        try:
            return ImageFont.truetype(F + n, size)
        except OSError:
            continue
    return ImageFont.load_default()


mono_b = lambda s: font("courbd.ttf", s)
mono = lambda s: font("cour.ttf", s)
sans_b = lambda s: font("arialbd.ttf", s)

img = Image.new("RGB", (W, H), PAPER)
d = ImageDraw.Draw(img)

random.seed(7)
for _ in range(16000):
    x, y = random.randrange(W), random.randrange(H)
    v = random.randint(-8, 8)
    p = img.getpixel((x, y))
    img.putpixel((x, y), tuple(max(0, min(255, c + v)) for c in p))

d.rectangle([0, 0, 34, H], fill=MANILA)
d.line([(34, 0), (34, H)], fill=RULE, width=2)
for cy in (74, 170, 266):
    d.ellipse([8, cy - 9, 26, cy + 9], fill=PAPER_LIT, outline=RULE)

d.rectangle([56, 22, W - 24, H - 22], outline=INK, width=3)

x0 = 96
d.text((x0, 46), "P E R S O N N E L   F I L E", font=mono_b(19), fill=FAINT)
d.text((x0, 78), "KEVIN LE", font=sans_b(78), fill=INK)
d.text((x0 + 6, 178), "Security Operations  /  Cloud Security", font=mono(24), fill=SOFT)
d.line([(x0, 236), (W - 60, 236)], fill=RULE, width=2)
d.text((x0, 252), "banyourself.github.io", font=mono_b(23), fill=INK)
d.text((x0, 288), "vulnerability research  |  blue-team labs  |  disclosure write-ups",
       font=mono(17), fill=FAINT)

# stamp sits in the empty right half, angled so it reads as pressed on
st = Image.new("RGBA", (312, 74), (0, 0, 0, 0))
sd = ImageDraw.Draw(st)
sd.rectangle([2, 2, 309, 71], outline=RED + (215,), width=5)
sd.text((26, 18), "CLASSIFIED", font=mono_b(38), fill=RED + (215,))
st = st.rotate(6, expand=True, resample=Image.BICUBIC)
img.paste(st, (876, 96), st)

d.text((898, 214), "FILE NO. 2026-KL", font=mono_b(17), fill=FAINT)

os.makedirs(os.path.dirname(OUT), exist_ok=True)
img.save(OUT, "PNG", optimize=True)
print("written:", os.path.abspath(OUT), img.size, "%.0f KB" % (os.path.getsize(OUT) / 1024))
