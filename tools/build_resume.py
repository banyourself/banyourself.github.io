"""RETIRED 2026-08-19. assets/Kevin_Le_Resume.pdf is now exported from Kevin's own
Word document (Downloads/Kevin_Le_Resume.docx), which is the single source of truth.
Running this would overwrite it with a different, older design.

Kept for reference only. Pass --force if you genuinely want the generated version back.
"""
import sys
if "--force" not in sys.argv:
    raise SystemExit("build_resume.py is retired: it would overwrite the PDF exported from the .docx. Re-run with --force only if you want the old generated design back.")

"""Builds the one-page resume PDF. python tools/build_resume.py"""
import os
from fpdf import FPDF

OUT = os.path.join(os.path.dirname(__file__), "..", "assets", "Kevin_Le_Resume.pdf")
F = "C:/Windows/Fonts/"
INK, MUTED, RULE = (26, 26, 26), (90, 90, 90), (150, 150, 150)

pdf = FPDF(format="letter", unit="mm")
pdf.set_auto_page_break(auto=False)
pdf.add_page()
pdf.set_margins(13, 11, 13)
W = pdf.w - 26

pdf.add_font("A", "", F + "arial.ttf")
pdf.add_font("A", "B", F + "arialbd.ttf")
pdf.add_font("A", "I", F + "ariali.ttf")


def rule(gap_before=1.4, gap_after=1.4):
    pdf.ln(gap_before)
    pdf.set_draw_color(*RULE)
    pdf.set_line_width(0.25)
    y = pdf.get_y()
    pdf.line(13, y, 13 + W, y)
    pdf.ln(gap_after)


def head(txt):
    pdf.set_font("A", "B", 9.6)
    pdf.set_text_color(*INK)
    pdf.cell(0, 4.4, txt.upper(), new_x="LMARGIN", new_y="NEXT")
    pdf.set_draw_color(*INK)
    pdf.set_line_width(0.4)
    y = pdf.get_y() + 0.2
    pdf.line(13, y, 13 + W, y)
    pdf.ln(1.9)


def role(left, right, sub=None):
    pdf.set_font("A", "B", 9.6)
    pdf.set_text_color(*INK)
    pdf.cell(W - 42, 4.3, left)
    pdf.set_font("A", "", 8.8)
    pdf.set_text_color(*MUTED)
    pdf.cell(42, 4.3, right, align="R", new_x="LMARGIN", new_y="NEXT")
    if sub:
        pdf.set_font("A", "I", 8.8)
        pdf.set_text_color(*MUTED)
        pdf.cell(0, 3.9, sub, new_x="LMARGIN", new_y="NEXT")


def bullet(txt):
    pdf.set_font("A", "", 8.9)
    pdf.set_text_color(*INK)
    x = pdf.get_x()
    pdf.cell(3.2, 3.9, chr(0x2022))
    pdf.set_x(x + 3.2)
    pdf.multi_cell(W - 3.2, 3.9, txt, new_x="LMARGIN", new_y="NEXT")


def line(label, body):
    pdf.set_font("A", "B", 8.9)
    pdf.set_text_color(*INK)
    lw = pdf.get_string_width(label + " ")
    pdf.cell(lw, 3.9, label)
    pdf.set_font("A", "", 8.9)
    pdf.set_x(13 + lw)
    pdf.multi_cell(W - lw, 3.9, body, new_x="LMARGIN", new_y="NEXT")


# ---------- header ----------
pdf.set_font("A", "B", 21)
pdf.set_text_color(*INK)
pdf.cell(0, 8.6, "Kevin Le", new_x="LMARGIN", new_y="NEXT")
pdf.set_font("A", "", 8.9)
pdf.set_text_color(*MUTED)
pdf.cell(0, 4.2, "Cybersecurity Student  |  Security Operations / Cloud Security", new_x="LMARGIN", new_y="NEXT")
pdf.set_text_color(*INK)
pdf.cell(0, 4.2, "(714) 837-1468  |  publicusekevin@gmail.com  |  Westminster, CA",
         new_x="LMARGIN", new_y="NEXT")
pdf.cell(0, 4.2, "linkedin.com/in/kevin-le-cyber  |  credly.com/users/kevin-le-cyber  |  github.com/banyourself",
         new_x="LMARGIN", new_y="NEXT")
rule(1.2, 2.0)

# ---------- summary ----------
pdf.set_font("A", "", 8.9)
pdf.set_text_color(*INK)
pdf.multi_cell(W, 4.0,
    "Cybersecurity student who learns by breaking things and then writing down how to catch it. "
    "CySA+ and two Microsoft Security Associate certifications, with hands-on vulnerability research "
    "in widely-deployed Java software and a segmented home lab I use to attack myself and tune "
    "detections. Looking for a summer 2027 internship in security operations, cloud security, or IT.",
    new_x="LMARGIN", new_y="NEXT")
pdf.ln(1.4)

# ---------- education ----------
head("Education")
role("Coastline Community College  |  Associate of Science, Cybersecurity", "Expected April 2027",
     "Westminster, CA  |  GPA: 3.54")
pdf.ln(0.5)
line("Relevant Coursework:", "Network Security (Security+), Computer Networking Principles (Network+), "
                            "Introduction to Cybersecurity, Introduction to Python Programming")

# ---------- certifications ----------
head("Certifications")
line("Microsoft:", "Cloud and AI Security Engineer Associate, SC-500 (2026)  |  "
                     "Security Operations Analyst Associate, SC-200 (2026)")
line("CompTIA:", "CySA+ CS0-003 (2026)  |  Server+ SK0-005 (2026)  |  Network+ N10-009 (2025)  |  "
                 "Security+ SY0-701 (2025)")
line("CompTIA Stacks:", "Security Analytics Professional (CSAP)  |  Network Infrastructure Professional (CNIP)")
line("Additional:", "Google Cybersecurity  |  Google IT Support  |  Cisco Python Essentials 1 & 2  |  "
                    "ISC2 Candidate  |  IBM Cybersecurity Fundamentals  |  AWS Educate (Security, Networking, Cloud)")

# ---------- skills ----------
head("Technical Skills")
line("Security Operations:", "SIEM (Splunk, IBM QRadar), EDR (CrowdStrike, SentinelOne, Microsoft Defender), "
                            "incident response, traffic and log analysis, vulnerability scanning, IPS/IDS")
line("Cloud & Identity:", "AWS (IAM, EC2), Microsoft Azure, Google Cloud, Active Directory, access control, "
                          "authentication (OAuth 2.0, SSO, 2FA)")
line("Tools:", "Wireshark, tcpdump, Nmap, Metasploit, Suricata, Pi-hole, Proxmox, VMware, VirtualBox, "
                "Git/GitHub, ServiceNow, Jira, Zendesk")
line("Languages:", "Python, Bash/Shell, PowerShell, SQL, Java (reading/decompilation), SourcePawn")
line("Frameworks:", "MITRE ATT&CK, NIST CSF, ISO 27001, CIA Triad, OWASP ASVS, PCI DSS")

# ---------- projects ----------
head("Security Projects")
role("Vulnerability Research  |  Modded Minecraft Packet Authorization", "2025 - Present")
bullet("Decompiled widely-deployed Forge mods and identified server-bound packet handlers registered with "
       "no permission gate (CWE-862), affecting servers running modpacks with 30M+ downloads.")
bullet("Reported findings privately to maintainers with suggested patches before any public write-up; all "
       "testing performed against self-hosted local servers.")
pdf.ln(0.6)
role("Home Security Lab  |  Detection Engineering", "2025 - Present")
bullet("Built a segmented Proxmox and pfSense lab, ran attack techniques against it, and logged what fired, "
       "what did not, and the rule or log-source change that closed each gap.")
pdf.ln(0.6)
role("Network Defense  |  Pi-hole DNS Sinkhole  &  CS:GO Server Tooling", "2024 - Present")
bullet("Deployed network-wide DNS filtering on Raspberry Pi with Unbound; documented DNS as a detection "
       "surface and its limits against DNS-over-HTTPS.")
bullet("Wrote SourcePawn plugins for servers I administer: a server-sided anticheat using behavioral "
       "detections, and a VPN/proxy blocker combining static CIDR ranges with a cached reputation API.")

# ---------- experience ----------
head("Work Experience")
role("Polars  |  Operations Manager", "Oct 2021 - Sep 2023")
bullet("Deployed the company website with secure authentication (IAM policies, OAuth 2.0, OpenID, 2FA, SSO) "
       "aligned to OWASP ASVS to mitigate account-compromise risk.")
bullet("Configured PCI-compliant payment processing (Stripe, Coinbase Commerce API), improving handling of "
       "customer PII and fraud prevention.")
bullet("Authored and enforced security governance policies (ToS, Privacy Policy, Data Handling, Security "
       "Awareness Training); implemented password-complexity and high-risk email domain filtering.")
bullet("Led a small support team resolving 2,500+ tickets through Zendesk with a defined escalation workflow; "
       "grew revenue to $80,000 gross profit by converting 3,000+ visitors.")
pdf.ln(0.6)
role("Coastline Community College  |  Financial Aid Student Assistant", "Apr 2025 - Jun 2025")
bullet("Supported 1,500+ students through the financial aid process while enforcing FERPA compliance and PII "
       "protection standards.")
bullet("Digitized and secured 10,000+ financial records using Ellucian and Microsoft 365, improving processing "
       "speed while following confidentiality policy.")

# ---------- organizations ----------
head("Organizations")
pdf.set_font("A", "", 8.9)
pdf.set_text_color(*INK)
pdf.multi_cell(W, 3.9,
    "Coastline Xploit Cybersecurity Club, Student Member (Aug 2025 - Present)  |  "
    "Coastline E-Sports Club, Student Member (Aug 2025 - Present)  |  "
    "Asian Community Development Corporation, Volunteer Staff (Aug 2023)",
    new_x="LMARGIN", new_y="NEXT")

os.makedirs(os.path.dirname(OUT), exist_ok=True)
pdf.output(OUT)
print("pages:", pdf.page_no())
print("bottom of content at %.1fmm of %.1fmm" % (pdf.get_y(), pdf.h))
print("written:", os.path.abspath(OUT))
