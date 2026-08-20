"""Renders PROFILE-README.md the way GitHub roughly will. python tools/preview_readme.py

Local preview only. Rewrites the Pages asset URLs to local paths so the banner shows
up before anything is pushed, and pins the column to GitHub's 890px so badge wrapping
matches what you'll actually get.
"""
import io, os, re
from markdown_it import MarkdownIt

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "..", "PROFILE-README.md")
OUT = os.path.join(HERE, "..", "_readme-preview.html")

md = io.open(SRC, encoding="utf-8").read()
md = md.replace("https://banyourself.github.io/assets/", "assets/")
md = re.sub(r"^- \[x\] ", "- \u2611 ", md, flags=re.M)
md = re.sub(r"^- \[ \] ", "- \u2610 ", md, flags=re.M)

body = MarkdownIt("commonmark", {"html": True}).enable("table").render(md)

CSS = """
body{background:#0d1117;color:#c9d1d9;font:16px/1.6 -apple-system,Segoe UI,Helvetica,Arial,sans-serif;margin:0;padding:32px 16px}
.col{max-width:890px;margin:0 auto}
.col img{max-width:100%}
h1,h2{border-bottom:1px solid #21262d;padding-bottom:.3em;margin-top:1.6em}
h2{font-size:1.5em}h3{font-size:1.2em}
a{color:#58a6ff;text-decoration:none}a:hover{text-decoration:underline}
code{background:#161b22;padding:.2em .4em;border-radius:6px;font-size:85%}
pre{background:#161b22;padding:16px;border-radius:6px;overflow:auto;line-height:1.45}
pre code{background:none;padding:0;font-size:100%}
table{border-collapse:collapse;margin:1em 0}
th,td{border:1px solid #30363d;padding:6px 13px}
tr:nth-child(2n){background:#161b22}
details{background:#161b22;border:1px solid #30363d;border-radius:6px;padding:12px 16px;margin:10px 0}
summary{cursor:pointer;font-weight:600}
hr{border:0;border-top:1px solid #21262d;margin:24px 0}
p img{vertical-align:middle;margin:2px}
blockquote{border-left:3px solid #30363d;margin:0;padding-left:14px;color:#8b949e}
.note{max-width:890px;margin:0 auto 20px;padding:8px 12px;background:#1c2128;border:1px solid #30363d;border-radius:6px;color:#8b949e;font-size:13px}
"""

html = ("<!doctype html><meta charset=utf-8><title>PROFILE-README preview</title>"
        "<style>%s</style><div class=note>Local preview of PROFILE-README.md. "
        "Column pinned to GitHub's 890px. Asset URLs rewritten to local paths.</div>"
        "<div class=col>%s</div>" % (CSS, body))

io.open(OUT, "w", encoding="utf-8", newline="\n").write(html)
print("written:", os.path.abspath(OUT), "%.0f KB" % (os.path.getsize(OUT) / 1024))
