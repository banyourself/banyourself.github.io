"""Builds the 1200x630 link-preview card. python tools/build_og.py"""
import os, random
from PIL import Image, ImageDraw, ImageFont

HERE = os.path.dirname(__file__)
OUT = os.path.join(HERE, "..", "assets", "img", "og.png")
PHOTO = os.path.join(HERE, "..", "assets", "img", "subject.jpg")
F = "C:/Windows/Fonts/"

W, H = 1200, 630
PAPER, PAPER_LIT = (239, 232, 214), (246, 241, 227)
INK, SOFT, FAINT = (33, 30, 25), (76, 70, 59), (122, 114, 99)
RULE, MANILA = (182, 171, 144), (215, 195, 154)
RED, GREEN = (156, 43, 33), (61, 99, 73)


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

# paper grain
random.seed(7)
for _ in range(24000):
    x, y = random.randrange(W), random.randrange(H)
    v = random.randint(-8, 8)
    p = img.getpixel((x, y))
    img.putpixel((x, y), tuple(max(0, min(255, c + v)) for c in p))

# folder edge + punch holes
d.rectangle([0, 0, 26, H], fill=MANILA)
d.line([(26, 0), (26, H)], fill=RULE, width=2)
for cy in (150, 315, 480):
    d.ellipse([6, cy - 8, 22, cy + 8], fill=PAPER_LIT, outline=RULE)

# inner frame
d.rectangle([46, 26, W - 26, H - 26], outline=INK, width=3)

x0, y = 78, 62

d.text((x0, y), "P E R S O N N E L   F I L E", font=mono_b(21), fill=INK)
y += 34
d.line([(x0, y), (W - 60, y)], fill=INK, width=3)
y += 26

d.text((x0, y), "KEVIN LE", font=sans_b(92), fill=INK)
y += 104
d.text((x0, y), "Cybersecurity Student  |  Security Ops / Cloud", font=mono(24), fill=SOFT)
y += 54

rows = [
    ("CERTS", "CySA+ | Microsoft SC x2 | Sec+ | Net+ | Server+"),
    ("FOCUS", "Detection engineering | Vulnerability research"),
    ("SEEKING", "2027 internship - SOC / Cloud Security / IT"),
]
for label, val in rows:
    d.text((x0, y), label, font=mono_b(17), fill=FAINT)
    d.text((x0 + 118, y), val, font=mono(19), fill=INK)
    y += 36

# photo, taped on the right
if os.path.exists(PHOTO):
    ph = Image.open(PHOTO).convert("RGB").resize((268, 335), Image.LANCZOS)
    card = Image.new("RGB", (288, 355), PAPER_LIT)
    ImageDraw.Draw(card).rectangle([0, 0, 287, 354], outline=RULE, width=2)
    card.paste(ph, (10, 10))
    card = card.rotate(-2.0, expand=True, resample=Image.BICUBIC, fillcolor=PAPER)
    img.paste(card, (W - card.width - 74, 132))
    tape = Image.new("RGBA", (108, 30), (226, 214, 178, 190))
    img.paste(tape.rotate(-6, expand=True, resample=Image.BICUBIC),
              (W - card.width - 20, 118), tape.rotate(-6, expand=True, resample=Image.BICUBIC))

# CLASSIFIED stamp
st = Image.new("RGBA", (330, 78), (0, 0, 0, 0))
sd = ImageDraw.Draw(st)
sd.rectangle([2, 2, 327, 75], outline=RED + (215,), width=5)
sd.text((26, 20), "CLASSIFIED", font=mono_b(40), fill=RED + (215,))
st = st.rotate(6, expand=True, resample=Image.BICUBIC)
img.paste(st, (700, 458), st)

# footer
d.line([(x0, H - 104), (W - 60, H - 104)], fill=RULE, width=2)
d.text((x0, H - 90), "banyourself.github.io", font=mono_b(27), fill=INK)
d.text((x0, H - 56), "case files: vulnerability research, blue-team labs, disclosure write-ups",
       font=mono(17), fill=FAINT)

os.makedirs(os.path.dirname(OUT), exist_ok=True)
img.save(OUT, "PNG", optimize=True)
print("written:", os.path.abspath(OUT), img.size, "%.0f KB" % (os.path.getsize(OUT) / 1024))
