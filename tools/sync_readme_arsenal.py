"""Rewrites the ARSENAL badge grid in PROFILE-README.md from CAPABILITIES in
assets/js/casefiles.js. python tools/sync_readme_arsenal.py

casefiles.js is the single source of truth. Hand-editing the badges is how the two
drifted apart before. Only logo slugs verified to actually render are listed here:
an unknown slug is not an error, shields just silently drops the icon.

Badges are grouped by domain, not by grade. A recruiter scans for the area they
hire for, and the colour still carries the grade inside each group.
"""
import io, os, re, urllib.parse

HERE = os.path.dirname(os.path.abspath(__file__))
JS = os.path.join(HERE, "..", "assets", "js", "casefiles.js")
MD = os.path.join(HERE, "..", "PROFILE-README.md")

COLOR = {"working": "3d6349", "pending": "87701d", "learning": "7a7263"}
ORDER = {"working": 0, "pending": 1, "learning": 2}
LOGOS = {
    "Pi-hole / DNS sinkholing": "pihole", "Wireshark / tcpdump": "wireshark",
    "Linux administration": "linux", "Proxmox / VM labs": "proxmox",
    "VirtualBox / Kali Linux": "kalilinux", "pfSense / firewalls": "pfsense",
    "Raspberry Pi / ARM": "raspberrypi", "Java decompilation (Vineflower)": "openjdk",
    "Bash scripting": "gnubash", "Python tooling": "python",
    "SIEM (Splunk, QRadar)": "splunk", "Burp Suite": "burpsuite", "OWASP ASVS": "owasp",
    "SQLite": "sqlite", "MySQL": "mysql", "Git / GitHub": "github",
    "C++ (Metamod extensions)": "cplusplus", "Discord webhooks": "discord",
    "Cloudflare / DDoS mitigation": "cloudflare", "AWS (IAM, EC2)": "amazonwebservices",
    "SSH hardening & allowlists": "openssh",
}

GROUP_RE = re.compile(r'group:\s*"([^"]+)"')
ITEM_RE = re.compile(r'\{\s*name:\s*"([^"]+)",\s*level:\s*"([^"]+)"\s*\}')
BLOCK_RE = re.compile(r"const CAPABILITIES = \[(.*?)\n\];", re.S)


def capabilities():
    """[(group, name, level)] in file order, so the README mirrors the site."""
    src = io.open(JS, encoding="utf-8").read()
    block = BLOCK_RE.search(src).group(1)
    out, group = [], "Other"
    for line in block.splitlines():
        g = GROUP_RE.search(line)
        if g:
            group = g.group(1)
            continue
        m = ITEM_RE.search(line)
        if m:
            out.append((group, m.group(1), m.group(2)))
    return out


def badge(name, level):
    label = urllib.parse.quote(name.replace("-", "--").replace("_", "__").replace(" ", "_"))
    url = "https://img.shields.io/badge/%s-%s?style=for-the-badge" % (label, COLOR[level])
    if name in LOGOS:
        url += "&logo=%s&logoColor=white" % LOGOS[name]
    return '  <img src="%s" alt="%s">' % (url, name)


caps = capabilities()
groups = []
for group, _, _ in caps:
    if group not in groups:
        groups.append(group)

grid = ""
for group in groups:
    rows = sorted([(n, l) for g, n, l in caps if g == group], key=lambda r: ORDER.get(r[1], 9))
    grid += "**%s**\n\n<p>\n%s\n</p>\n\n" % (
        group.upper(), "\n".join(badge(n, l) for n, l in rows))

md = io.open(MD, encoding="utf-8").read()
start = md.index("**DETECTION & MONITORING**") if "**DETECTION & MONITORING**" in md \
    else md.index("**SHIPPED SOMETHING WITH IT**")
end = md.index("### Roadmap")
io.open(MD, "w", encoding="utf-8", newline="\n").write(md[:start] + grid + md[end:])

counts = ", ".join("%s=%d" % (l, sum(1 for _, _, x in caps if x == l)) for l in ORDER)
print("synced %d capabilities across %d groups: %s" % (len(caps), len(groups), counts))
