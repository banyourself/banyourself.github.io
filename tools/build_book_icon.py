"""Shrinks the enchanted book to a heading-sized icon. python tools/build_book_icon.py

The source is 124x116, way oversized for a 28px heading glyph. Letting the browser do
the scaling would smear the pixels, so resize with NEAREST here and keep the alpha so
it sits on GitHub's light and dark themes alike.
"""
import os
from PIL import Image, ImageSequence

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "..", "assets", "img", "enchanted-book-src.gif")
OUT = os.path.join(HERE, "..", "assets", "img", "enchanted-book.gif")
H = 30
TRANSPARENT = 255                       # palette slot reserved below

src = Image.open(SRC)
w = round(src.width * H / src.height)

frames, durations = [], []
for fr in ImageSequence.Iterator(src):
    rgba = fr.convert("RGBA").resize((w, H), Image.NEAREST)
    p = rgba.convert("RGB").convert("P", palette=Image.ADAPTIVE, colors=TRANSPARENT)
    p.paste(TRANSPARENT, rgba.getchannel("A").point(lambda a: 255 if a < 128 else 0))
    frames.append(p)
    durations.append(fr.info.get("duration", 100))

frames[0].save(OUT, save_all=True, append_images=frames[1:], duration=durations,
               loop=0, transparency=TRANSPARENT, disposal=2)
print("written:", os.path.abspath(OUT), (w, H),
      "%d frames, %.0f KB" % (len(frames), os.path.getsize(OUT) / 1024))
