// Everything on the site comes from this file. You never need to touch app.js or the CSS.
// ⟨angle brackets⟩ = placeholder, replace it.
// Only set a status flag true if it actually happened. Fake credit is how you lose an offer.
// severity: critical | high | medium | low | info
//
// {TOKENS} auto-fill on page load, so dates never go stale. Usable in any string here:
//   {YEAR} {NEXT_YEAR} {INTERN_YEAR} {TODAY} {MONTH} {NAME} {HANDLE}
// {INTERN_YEAR} is the smart one: after June it rolls to next year, since an
// internship you apply for in the fall is for next summer.

const SUBJECT = {
  name: "Kevin Le",
  handle: "banyourself",
  role: "Cybersecurity Student",
  track: "Security Operations / Cloud Security",
  // one tagline per theme, swapped live when you flip Minecraft Mode
  line: {
    dossier: "Every case started because of an interest, a file does that too, I hope you're taking a peek into this classified file cause of an interest in me!",
    gui: "I've played games my whole life and I realized that finding, patching, and documenting security vulnerabilities is just like a game, so I'm going to grind this game out and learn as much as I can!"
  },
  location: "Westminster, California",
  // blank keeps the "not on file" card
  photo: "assets/img/subject.jpg",
  school: "Coastline College - A.S. Cybersecurity, class of 2027",
  status: "Seeking {INTERN_YEAR} Internship for Cybersecurity, IT, Cloud/Network Security, or SOC",
  links: {
    github: "https://github.com/banyourself",
    linkedin: "https://www.linkedin.com/in/kevin-le-cyber",
    email: "publicusekevin@gmail.com",
    credly: "https://www.credly.com/users/kevin-le-cyber",
    tryhackme: "",
    hackthebox: "",
    resume: "assets/Kevin_Le_Resume.pdf"   // blank string hides the button
  }
};

// LinkedIn carries more than this list, so nothing here should contradict it.
const CREDENTIALS = {
  // CompTIA first so all four land on one row, Microsoft on the next.
  // `url` makes the name a link. The Microsoft two aren't on Credly, so drop their
  // Microsoft Learn share links in when I grab them and they'll link the same way.
  earned: [
    { name: "CySA+ - CS0-003",    issuer: "CompTIA", year: "May 2026", id: "", url: "https://www.credly.com/badges/17bda361-2ea7-4c40-96f7-f42228a7c8b9" },
    { name: "Server+ - SK0-005",  issuer: "CompTIA", year: "May 2026", id: "", url: "https://www.credly.com/badges/e9261ad2-e97b-44bf-ad48-56aa778b4e58" },
    { name: "Network+ - N10-009", issuer: "CompTIA", year: "Dec 2025", id: "", url: "https://www.credly.com/badges/4108b7b1-1289-4a79-8eaa-98e4bd5cb094" },
    { name: "Security+ - SY0-701", issuer: "CompTIA", year: "Aug 2025", id: "", url: "https://www.credly.com/badges/2b6ee0a4-27e8-4685-8ddb-eeff1cf118c5" },
    { name: "Cloud and AI Security Engineer - SC-500", issuer: "Microsoft", year: "Aug 2026", id: "E1FF73-CP4B86", url: "https://learn.microsoft.com/api/credentials/share/en-us/banyourself/797D79AF65A767C7?sharingId=A1B4A5D77D21B4A1" },
    { name: "Security Operations Analyst - SC-200", issuer: "Microsoft", year: "May 2026", id: "S8251F-6F9F75", url: "https://learn.microsoft.com/api/credentials/share/en-us/banyourself/5012D6FD8738088A" }
  ],
  // In Progress. Empty this array and the whole section hides itself.
  // These link to the official cert pages, since there's no badge to point at yet.
  pursuing: [
    { name: "CISSP - Certified Information Systems Security Professional", issuer: "ISC2", eta: "studying",
      url: "https://www.isc2.org/certifications/cissp" },
    { name: "Cybersecurity Architect - SC-100", issuer: "Microsoft", eta: "studying",
      url: "https://learn.microsoft.com/en-us/credentials/certifications/cybersecurity-architect-expert/" }
  ],
  verify: [
    { label: "Verify on Credly",   url: "https://www.credly.com/users/kevin-le-cyber" },
    { label: "Verify on LinkedIn", url: "https://www.linkedin.com/in/kevin-le-cyber/details/certifications/" }
  ]
};

// CS:GO plugin repos are private until Kevin flips them. Set this to true and every
// plugin row turns into a real link, no other edit needed.
const REPOS_PUBLIC = false;
const repoRow = (name) => REPOS_PUBLIC
  ? ["Source", "https://github.com/banyourself/" + name]
  : ["Source", name + " (private repo)"];

// levels: working | pending | learning
// working = shipped or broke something real with it. pending = studied and tested on it,
// not yet used in anger. learning = started, that's all.
const CAPABILITIES = [
  { group: "Detection & Monitoring", items: [
    { name: "Detection engineering",      level: "working" },
    { name: "False-positive tuning",      level: "working" },
    { name: "Threat intelligence feeds",  level: "working" },
    { name: "IP reputation & enrichment", level: "working" },
    { name: "Log analysis",               level: "working" },
    { name: "Pi-hole / DNS sinkholing",   level: "working" },
    { name: "Wireshark / tcpdump",        level: "working" },
    { name: "Microsoft Sentinel",         level: "pending" },
    { name: "Microsoft Defender XDR",     level: "pending" },
    { name: "SIEM (Splunk, QRadar)",      level: "pending" },
    { name: "Suricata / Snort",           level: "pending" },
    { name: "Incident response",          level: "pending" },
    { name: "MITRE ATT&CK",               level: "pending" },
    { name: "EDR (Defender, CrowdStrike)", level: "pending" }
  ]},
  { group: "Cloud & Identity", items: [
    { name: "IAM / SSO / OAuth 2.0",      level: "working" },
    { name: "MFA rollout",                level: "working" },
    { name: "Least privilege / RBAC",     level: "working" },
    { name: "SSH hardening & allowlists", level: "working" },
    { name: "Microsoft Azure",            level: "pending" },
    { name: "Microsoft Entra ID",         level: "pending" },
    { name: "Defender for Cloud",         level: "pending" },
    { name: "AWS (IAM, EC2)",             level: "pending" }
  ]},
  { group: "Infrastructure", items: [
    { name: "Linux administration",       level: "working" },
    { name: "Windows Server / Active Directory", level: "working" },
    { name: "Proxmox / VM labs",          level: "working" },
    { name: "VirtualBox / Kali Linux",    level: "working" },
    { name: "pfSense / firewalls",        level: "working" },
    { name: "TCP/IP & DNS",               level: "working" },
    { name: "Raspberry Pi / ARM",         level: "working" },
    { name: "Load balancing",             level: "working" },
    { name: "Cloudflare / DDoS mitigation", level: "working" },
    { name: "Automation (cron, systemd)", level: "working" },
    { name: "Network segmentation",       level: "pending" },
    { name: "Backup & recovery",          level: "pending" }
  ]},
  { group: "Analysis & Research", items: [
    { name: "Java decompilation (Vineflower, CFR)", level: "working" },
    { name: "Protocol / packet analysis",      level: "working" },
    { name: "Coordinated disclosure",          level: "working" },
    { name: "Secure code review",              level: "working" },
    { name: "CWE classification & triage",     level: "working" },
    { name: "Bash scripting",                  level: "working" },
    { name: "Vulnerability management",        level: "pending" },
    { name: "Python tooling",                  level: "pending" },
    { name: "Burp Suite",                      level: "learning" }
  ]},
  { group: "Development & Data", items: [
    { name: "SourcePawn / SourceMod",     level: "working" },
    { name: "C++ (Metamod extensions)",   level: "working" },
    { name: "Function hooking / detours", level: "working" },
    { name: "SQLite",                     level: "working" },
    { name: "MySQL",                      level: "working" },
    { name: "Parameterized / escaped SQL", level: "working" },
    { name: "REST API integration",       level: "working" },
    { name: "Discord webhooks",           level: "working" },
    { name: "Git / GitHub",               level: "working" },
    { name: "Secrets hygiene",            level: "working" },
    { name: "C / memory safety",          level: "learning" }
  ]},
  { group: "Governance & Support", items: [
    { name: "PII handling (FERPA)",       level: "working" },
    { name: "Ticketing & escalation",     level: "working" },
    { name: "Open source licensing (GPL)", level: "working" },
    { name: "OWASP ASVS",                 level: "pending" },
    { name: "NIST CSF",                   level: "pending" },
    { name: "PCI DSS",                    level: "pending" }
  ]}
];

// A case with `findings` becomes a drill-down index. A case with `sections` renders as one page.
const CASES = [

  {
    id: "MC-001",
    caseNo: "{TODAY}-001",
    title: "Modded Minecraft - Missing Packet Authorization",
    kind: "Vulnerability Research",
    blurb: "Swept every client-sendable packet registration in RLCraft and RLCraft Dregora, 400+ Forge mods across two packs with 50M+ downloads, and read the server-side handler for each one. Catalogued 211 client-sendable packets across 64 mods whose server handlers run with no permission check, every one written up here: 4 mods critical, 22 high, 13 medium, 25 low. One chains into level-2 command execution. The RLCraft development team acknowledged the report, committed to shipping the fixes in a new mixins mod, and offered credit. One maintainer tightened their packet handling the same day it was reported.",
    status: { reported: true, patched: false, credited: false, cve: false },
    period: "Aug 2026 to present",
    scope: "Static analysis of jars I already had from hosting the pack, plus testing against my own local servers through a client-side mod I wrote for the purpose. Nothing unauthorized was touched. Every packet registration was cross-checked against two exposed-packet inventories built from the jars before any handler was graded. Reported privately to maintainers and the RLCraft development team before publishing anything. They confirmed the ungated packets were a known concern, are building a mixins mod to carry the fixes, and invited pull requests against it.",
    stack: ["Java", "Forge", "Vineflower", "CFR", "javap", "SimpleNetworkWrapper", "Gradle"],
    filterLabel: "Severity",
    tones: {
      critical: "Critical",
      high:     "High",
      medium:   "Medium",
      low:      "Low"
    },
    findings: [

      {
        ref: "MC-001-01",
        severity: "critical",
        redacted: false,
        mod: "ChunkPregenerator",
        version: "2.5.1",
        cwe: "CWE-862 Missing Authorization",
        title: "Any client can wipe every entity and tile-entity in an entire dimension",
        deployment: {
          headline: { name: "RLCraft", url: "https://www.curseforge.com/minecraft/modpacks/rlcraft", downloads: "50M+", note: "most-downloaded CurseForge modpack" },
          others: [
            { name: "RLCraft Dregora", url: "", downloads: "1M+" }
          ]
        },
        packets: [
          { name: "KillWorldRequest  [critical]", does: "pregenerator.impl.network.packets.chunkRequest.KillWorldRequest  \u00b7  channel chunkpregenerator", couldDo: "Kills ALL entities (by registry class) or breaks ALL tile-entities (by registry class) in an entire dimension (`tiles` bool)." },
          { name: "KillRequest  [critical]", does: "pregenerator.impl.network.packets.chunkRequest.KillRequest  \u00b7  channel chunkpregenerator", couldDo: "Kills ALL entities of an arbitrary registry name in the chunk at (x,z) via `setDead()`, or breaks all tile-entities of an arbitrary class at that chunk." },
          { name: "RemoveStructurePacket  [critical]", does: "pregenerator.impl.network.packets.chunkRequest.RemoveStructurePacket  \u00b7  channel chunkpregenerator", couldDo: "Deletes a structure (by `type` string, e.g." },
          { name: "DeletionTaskPacket  [critical]", does: "pregenerator.impl.network.packets.chunkRequest.DeletionTaskPacket  \u00b7  channel chunkpregenerator", couldDo: "Starts a `DeleteProcessor` task deleting an arbitrary region of chunks (deletes chunk data)." },
          { name: "DimensionTaskPacket  [critical]", does: "pregenerator.impl.network.packets.chunkRequest.DimensionTaskPacket  \u00b7  channel chunkpregenerator", couldDo: "DELETE ENTIRE DIMENSION FILES: with `unload=true` unloads a dimension;" },
          { name: "ManualTaskPacket  [high]", does: "pregenerator.impl.network.packets.chunkRequest.ManualTaskPacket  \u00b7  channel chunkpregenerator", couldDo: "Interrupts/starts generation tasks on the server `ChunkProcessor`/`DeleteProcessor`." },
          { name: "MassPregenTaskPacket  [high]", does: "pregenerator.impl.network.packets.chunkRequest.MassPregenTaskPacket  \u00b7  channel chunkpregenerator", couldDo: "Starts a mass chunk-pregen task (shape/dim/center/radius/split/genType) \u2192 massive chunk generation \u2192 server lag/DoS." },
          { name: "PregenTaskPacket  [high]", does: "pregenerator.impl.network.packets.chunkRequest.PregenTaskPacket  \u00b7  channel chunkpregenerator", couldDo: "Starts a chunk-pregen task (type/dim/middle/radiusX/radiusZ/postProc) \u2192 chunk generation." },
          { name: "RetrogenChangePacket  [high]", does: "pregenerator.impl.network.packets.chunkRequest.RetrogenChangePacket  \u00b7  channel chunkpregenerator", couldDo: "Server-side enable/disable a retrogen generator by `id` string (`RetrogenHandler.enableGenerator/disableGenerator`)." },
          { name: "DimRequestPacket  [low]", does: "pregenerator.impl.network.packets.DimRequestPacket  \u00b7  channel chunkpregenerator", couldDo: "Read-only query." },
          { name: "PermissionRequestPacket  [low]", does: "pregenerator.impl.network.packets.PermissionRequestPacket  \u00b7  channel chunkpregenerator", couldDo: "Read-only query." },
          { name: "TrackerRequestPacket  [low]", does: "pregenerator.impl.network.packets.TrackerRequestPacket  \u00b7  channel chunkpregenerator", couldDo: "Read-only query for the server's chunk-generation tracker state;" },
          { name: "ProcessRequestPacket  [low]", does: "pregenerator.impl.network.packets.gui.ProcessRequestPacket  \u00b7  channel chunkpregenerator", couldDo: "Read-only query of the server's generation/deletion processor state." },
          { name: "ChunkRequest  [low]", does: "pregenerator.impl.network.packets.chunkRequest.ChunkRequest  \u00b7  channel chunkpregenerator", couldDo: "Read-only request for a chunk's generation state;" },
          { name: "EntityRequestPacket  [low]", does: "pregenerator.impl.network.packets.chunkRequest.EntityRequestPacket  \u00b7  channel chunkpregenerator", couldDo: "Read-only request for entity data in a chunk;" },
          { name: "StructureRequestPacket  [low]", does: "pregenerator.impl.network.packets.chunkRequest.StructureRequestPacket  \u00b7  channel chunkpregenerator", couldDo: "Read-only query/handshake for the structure-manager UI browse." },
          { name: "RetrogenCheckPacket  [low]", does: "pregenerator.impl.network.packets.retrogen.RetrogenCheckPacket  \u00b7  channel chunkpregenerator", couldDo: "Read-only query of retrogen generator state;" },
          { name: "TPChunkPacket  [low]", does: "pregenerator.impl.network.packets.chunkRequest.TPChunkPacket.process  \u00b7  channel chunkpregenerator", couldDo: "Teleports the sender to an arbitrary (x,z) in the sender's own dimension." },
        ],
        rootCause: "Handler: `pregenerator.impl.network.packets.chunkRequest.KillWorldRequest` (disc 14) -\nserver-side `handle(EntityPlayer)`; bytecode-only (javap in `scratch/cpjar/`)\n\n```\n// NOTE: ChunkPregenerator packet handlers are only available as javap bytecode\n// (scratch/cpjar/pregenerator/impl/network/packets/chunkRequest/*.class).\n// The audit verified by bytecode that this handler calls setDead() on every\n// entity of the client-supplied registry class in the dimension, with NO\n// isOpped / permission-level / PregenAPI.hasPermission check anywhere in the\n// packet path. Raw Java source is not available in this decompile.\n```",
        impact: "Kills ALL entities (by registry class) or breaks ALL tile-entities (by registry class) in an\nentire dimension (`tiles` bool). A client can wipe every entity and every tile-entity in a\nwhole dimension - mass entity/TE destruction across the world.\n\n18 client-sendable packets in this mod, graded 5 critical, 4 high, 9 low. Every one is\nlisted above with its handler and channel.",
        disclosure: [
          { date: "2026-08-15", event: "Reported privately to the mod maintainer and the RLCraft development team" },
          { date: "2026-08-15", event: "RLCraft development team acknowledged the report, confirmed credit, and committed to carrying the fixes in a new mixins mod (RLMixins2), starting with the grappling hook mod, with pull requests welcome" }
        ],
        patch: "Should check `player.isCreative() || player.canUseCommand(2, \"pregen\")` (or\n`PregenAPI.hasPermission`) before acting. No packet handler in ChunkPregenerator calls\n`isOpped` / permission-level / `PregenAPI.hasPermission` - the only permission reference is\nin `onPlayerLoggedIn` (auto-restart tasks for ops), not in any packet path."
      },

      {
        ref: "MC-001-02",
        severity: "critical",
        redacted: false,
        mod: "Trinkets & Baubles",
        version: "0.32.5",
        cwe: "CWE-862 Missing Authorization",
        title: "Write arbitrary items into any entity's slots, and attack any entity by ID",
        deployment: {
          headline: { name: "RLCraft", url: "https://www.curseforge.com/minecraft/modpacks/rlcraft", downloads: "50M+", note: "most-downloaded CurseForge modpack" },
          others: [
            { name: "RLCraft Dregora", url: "", downloads: "1M+" }
          ]
        },
        packets: [
          { name: "SyncItemDataPacket  [critical]", does: "xzeroair.trinkets.network.SyncItemDataPacket.handleServerSafe  \u00b7  channel xat", couldDo: "A client sends an entityID + slot + handler + ItemStack." },
          { name: "IncreasedReachPacket  [high]", does: "xzeroair.trinkets.network.IncreasedReachPacket.handleServerSafe  \u00b7  channel xat", couldDo: "A client sends an entityID + hand + targetEntityID + xyz." },
          { name: "SyncRaceDataPacket  [high]", does: "xzeroair.trinkets.network.SyncRaceDataPacket.handleServerSafe  \u00b7  channel xat", couldDo: "A client sends an entityID + NBT." },
          { name: "OpenTrinketGui  [high]", does: "xzeroair.trinkets.network.trinketcontainer.OpenTrinketGui.handleServerSafe  \u00b7  channel xat", couldDo: "A client sends a guiID." },
          { name: "EffectsRenderPacket  [low]", does: "xzeroair.trinkets.network.particles.EffectsRenderPacket.handleServerSafe  \u00b7  channel xat", couldDo: "A client sends an entityID + effectID + color + coords." },
          { name: "KeybindPacket  [low]", does: "xzeroair.trinkets.network.keybinds.KeybindPacket.handleServerSafe  \u00b7  channel xat", couldDo: "A client sends an entityID + ability + key state." },
          { name: "MovementKeyPacket  [low]", does: "xzeroair.trinkets.network.keybinds.MovementKeyPacket.handleServerSafe  \u00b7  channel xat", couldDo: "A client sends an entityID + key + state." },
        ],
        rootCause: "Handler: `xzeroair.trinkets.network.SyncItemDataPacket.handleServerSafe`\n(SyncItemDataPacket.java:177-184)\n\n```\npublic void handleServerSafe(NetHandlerPlayServer server) {\n    EntityPlayerMP serverPlayer = server.field_147369_b;\n    WorldServer world = serverPlayer.func_71121_q();\n    Entity entity = world.func_73045_a(this.entityID);\n    if (entity instanceof EntityLivingBase) {\n        this.handlePacket((EntityLivingBase)entity, Side.SERVER);\n    }\n}\n// handlePacket -> handleTrinkets/handleBaubles -> setStackInSlot(this.slot, this.item)\n```",
        impact: "A client sends an entityID + slot + handler + ItemStack. The server looks up ANY entity by\nID and calls `setStackInSlot(slot, item)` on its trinket or baubles handler - arbitrary item\ninjection into any entity's trinket/baubles slots, no ownership/permission check.\n\n7 client-sendable packets in this mod, graded 1 critical, 3 high, 3 low. Every one is listed\nabove with its handler and channel.",
        disclosure: [
          { date: "2026-08-12", event: "Reported privately to the maintainer (XzeroAir) and the RLCraft development team" },
          { date: "2026-08-12", event: "Maintainer replied the same day: logic checks added and packet handling tightened in-dev, and asked which name to credit the report under" },
          { date: "2026-08-14", event: "RLCraft development team acknowledged the report, confirmed credit, and committed to carrying the fixes in a new mixins mod (RLMixins2), starting with the grappling hook mod, with pull requests welcome" }
        ],
        patch: "Should verify the target entity is the sender (or within reach) and gate on permission. No\ncheck in `handleServerSafe`."
      },

      {
        ref: "MC-001-03",
        severity: "critical",
        redacted: false,
        mod: "RecurrentComplex",
        version: "1.4.8.4",
        cwe: "CWE-862 Missing Authorization",
        title: "Ungated packet chains into level-2 command execution on the server",
        deployment: {
          headline: { name: "RLCraft", url: "https://www.curseforge.com/minecraft/modpacks/rlcraft", downloads: "50M+", note: "most-downloaded CurseForge modpack" },
          others: [
            { name: "RLCraft Dregora", url: "", downloads: "1M+" }
          ]
        },
        packets: [
          { name: "PacketEditTileEntity  [critical]", does: "ivorius.reccomplex.network.PacketEditTileEntityHandler.processServer  \u00b7  channel reccomplex", couldDo: "The headline primitive: a client sends `PacketEditTileEntity` (disc 5, Side.SERVER) with a BlockPos + NBT." },
          { name: "PacketWorldData  [critical]", does: "ivorius.reccomplex.network.PacketWorldDataHandler.processServer  \u00b7  channel reccomplex", couldDo: "A client sends a `worldData` NBT + source + two capture points." },
          { name: "PacketSpawnTweaks  [high]", does: "ivorius.reccomplex.network.PacketSpawnTweaksHandler.processServer  \u00b7  channel reccomplex", couldDo: "A client sends a `TObjectFloatMap<String>` of spawn-tweak values." },
          { name: "PacketOpenGui  [medium]", does: "ivorius.reccomplex.network.PacketOpenGuiHandler.processServer  \u00b7  channel reccomplex", couldDo: "A client sends a modId + guiId + data." },
        ],
        rootCause: "Handler: `ivorius.reccomplex.network.PacketEditTileEntityHandler.processServer`\n(PacketEditTileEntityHandler.java:28-44) \u2192 `SpawnCommandLogic.trigger` \u2192\n`ICommandManager.executeCommand`\n\n```\n// PacketEditTileEntityHandler.processServer \u2014 NO permission check\npublic void processServer(PacketEditTileEntity message, MessageContext ctx, WorldServer server) {\n    EntityPlayer player = ctx.getServerHandler().player;\n    World world = player.world;\n    TileEntity tileEntity = world.getTileEntity(message.getPos());\n    if (tileEntity instanceof TileEntityWithGUI) {\n        ((TileEntityWithGUI) tileEntity).readSyncedNBT(message.getData());\n        tileEntity.markDirty();\n        ...\n    }\n}\n\n// SpawnCommandLogic \u2014 the command runs at level 2\npublic boolean canUseCommand(int permLevel, String commandName) {\n    return permLevel <= 2;\n}\n// trigger() -> icommandmanager.executeCommand(this, this.commandStored);\n```",
        impact: "The headline primitive: a client sends `PacketEditTileEntity` (disc 5, Side.SERVER) with a\nBlockPos + NBT. The handler looks up the TileEntity at that arbitrary position and, if it is\na `TileEntityWithGUI`, calls `readSyncedNBT(message.getData())` with NO permission check.\n`TileEntityBlockScript` is a `TileEntityWithGUI` whose `readSyncedNBT` reads a\n`WorldScriptMulti` script from NBT; `WorldScriptMulti` holds `WorldScriptCommand` entries\neach with a `command` string. When the script block triggers (spawn/redstone),\n`WorldScriptCommand.generate` \u2192 `SpawnCommandLogic.trigger` \u2192\n`icommandmanager.executeCommand(this, command)`. `SpawnCommandLogic.canUseCommand` returns\n`permLevel <= 2`, so the client-supplied command string runs at level 2\n(setblock/give/tp/etc). A client can plant a command block script at any position and\nexecute level-2 commands.\n\n4 client-sendable packets in this mod, graded 2 critical, 1 high, 1 medium. Every one is\nlisted above with its handler and channel.",
        disclosure: [
          { date: "2026-08-15", event: "Reported privately to the mod maintainer and the RLCraft development team" },
          { date: "2026-08-15", event: "RLCraft development team acknowledged the report, confirmed credit, and committed to carrying the fixes in a new mixins mod (RLMixins2), starting with the grappling hook mod, with pull requests welcome" }
        ],
        patch: "`PacketEditTileEntityHandler.processServer` never calls\n`RecurrentComplex.checkPerms(player)` (unlike the gated handlers). Should gate on\n`player.canUseCommand(2, \"setblock\")` before calling `readSyncedNBT`, and validate the tile\nis within the sender's reach. `SpawnCommandLogic.canUseCommand` should also be tightened\nbelow level 2."
      },

      {
        ref: "MC-001-04",
        severity: "critical",
        redacted: false,
        mod: "Grappling Hook (grapplemod)",
        version: "v12.3",
        cwe: "CWE-862 Missing Authorization",
        title: "Arbitrary self-teleport and velocity from a client-supplied position",
        deployment: {
          headline: { name: "RLCraft", url: "https://www.curseforge.com/minecraft/modpacks/rlcraft", downloads: "50M+", note: "most-downloaded CurseForge modpack" },
          others: [
            { name: "RLCraft Dregora", url: "", downloads: "1M+" }
          ]
        },
        packets: [
          { name: "PlayerMovementMessage  [critical]", does: "com.yyon.grapplinghook.network.PlayerMovementMessage$Handler$runner.run  \u00b7  channel grapplemodchannel", couldDo: "A client sends an entityId + position (x,y,z) + velocity (mx,my,mz)." },
          { name: "GrappleEndMessage  [high]", does: "com.yyon.grapplinghook.network.GrappleEndMessage$Handler$runner.run  \u00b7  channel grapplemodchannel", couldDo: "A client sends an entityId and a set of arrowIds." },
          { name: "GrappleModifierMessage  [high]", does: "com.yyon.grapplinghook.network.GrappleModifierMessage$Handler$runner.run  \u00b7  channel grapplemodchannel", couldDo: "A client sends a BlockPos and a `GrappleCustomization`." },
        ],
        rootCause: "Handler: `com.yyon.grapplinghook.network.PlayerMovementMessage$Handler$runner.run`\n(PlayerMovementMessage.java:96-138)\n\n```\npublic void run() {\n    World world = this.ctx.getServerHandler().field_147369_b.field_70170_p;\n    Entity entity = world.func_73045_a(this.message.entityId);\n    if (entity == null) {\n        return;\n    }\n    if (entity instanceof EntityPlayerMP) {\n        EntityPlayerMP referencedPlayer = (EntityPlayerMP)entity;\n        if (this.ctx.getServerHandler().field_147369_b.func_146103_bH().equals(referencedPlayer.func_146103_bH())) {\n            entity.field_70165_t = this.message.x;\n            entity.field_70163_u = this.message.y;\n            entity.field_70161_v = this.message.z;\n            entity.field_70159_w = this.message.mx;\n            entity.field_70181_x = this.message.my;\n            entity.field_70179_y = this.message.mz;\n            // ... capturePosition + jump-velocity handling ...\n        }\n    }\n}\n```",
        impact: "A client sends an entityId + position (x,y,z) + velocity (mx,my,mz). The server looks up the\nentity by ID and, if it is the sender (UUID match), sets the entity's position and velocity\ndirectly. This is the grapple \"teleport to player\" primitive - the client can teleport\nitself to arbitrary coordinates and set its own velocity (free flight / teleport). The\nownership check (entity must be the sender) is present, so it cannot teleport other players,\nbut it gives the sender arbitrary self-teleport.\n\n3 client-sendable packets in this mod, graded 1 critical, 2 high. Every one is listed above\nwith its handler and channel.",
        disclosure: [
          { date: "2026-08-14", event: "Reported privately to the mod maintainer and the RLCraft development team" },
          { date: "2026-08-14", event: "RLCraft development team acknowledged the report, confirmed credit, and committed to carrying the fixes in a new mixins mod (RLMixins2), starting with the grappling hook mod, with pull requests welcome" }
        ],
        patch: "The server should validate the target position is reachable/legitimate (e.g. within a\ngrapple range or a server-side movement check) rather than trusting the client's arbitrary\ncoordinates. Currently the client can teleport itself anywhere."
      },

      {
        ref: "MC-001-05",
        severity: "high",
        redacted: false,
        mod: "NuclearCraft",
        version: "2.19a",
        cwe: "CWE-862 Missing Authorization",
        title: "EmptyTankPacket: If the tile at a client-chosen BlockPos is an `IMultiblockPart` whose",
        packets: [
          { name: "EmptyTankPacket  [high]", does: "nc.multiblock.network.ClearAllFluidsPacket$Handler.processMessage  \u00b7  channel nuclearcraft", couldDo: "If the tile at a client-chosen BlockPos is an `IMultiblockPart` whose multiblock is `IMultiblockFluid`, calls `multiblock.clearAllFluids()` - drains every fluid tank of an entire multiblock\u2026" },
          { name: "ToggleItemOutputSettingPacket  [high]", does: "nc.multiblock.network.ClearAllFluidsPacket$Handler.processMessage  \u00b7  channel nuclearcraft", couldDo: "If the tile at a client-chosen BlockPos is an `IMultiblockPart` whose multiblock is `IMultiblockFluid`, calls `multiblock.clearAllFluids()` - drains every fluid tank of an entire multiblock\u2026" },
          { name: "ToggleTankOutputSettingPacket  [high]", does: "nc.multiblock.network.ClearAllFluidsPacket$Handler.processMessage  \u00b7  channel nuclearcraft", couldDo: "If the tile at a client-chosen BlockPos is an `IMultiblockPart` whose multiblock is `IMultiblockFluid`, calls `multiblock.clearAllFluids()` - drains every fluid tank of an entire multiblock\u2026" },
          { name: "ResetItemSorptionsPacket  [high]", does: "nc.multiblock.network.ClearAllFluidsPacket$Handler.processMessage  \u00b7  channel nuclearcraft", couldDo: "If the tile at a client-chosen BlockPos is an `IMultiblockPart` whose multiblock is `IMultiblockFluid`, calls `multiblock.clearAllFluids()` - drains every fluid tank of an entire multiblock\u2026" },
          { name: "ToggleItemSorptionPacket  [high]", does: "nc.multiblock.network.ClearAllFluidsPacket$Handler.processMessage  \u00b7  channel nuclearcraft", couldDo: "If the tile at a client-chosen BlockPos is an `IMultiblockPart` whose multiblock is `IMultiblockFluid`, calls `multiblock.clearAllFluids()` - drains every fluid tank of an entire multiblock\u2026" },
          { name: "ResetTankSorptionsPacket  [high]", does: "nc.multiblock.network.ClearAllFluidsPacket$Handler.processMessage  \u00b7  channel nuclearcraft", couldDo: "If the tile at a client-chosen BlockPos is an `IMultiblockPart` whose multiblock is `IMultiblockFluid`, calls `multiblock.clearAllFluids()` - drains every fluid tank of an entire multiblock\u2026" },
          { name: "ToggleTankSorptionPacket  [high]", does: "nc.multiblock.network.ClearAllFluidsPacket$Handler.processMessage  \u00b7  channel nuclearcraft", couldDo: "If the tile at a client-chosen BlockPos is an `IMultiblockPart` whose multiblock is `IMultiblockFluid`, calls `multiblock.clearAllFluids()` - drains every fluid tank of an entire multiblock\u2026" },
          { name: "ToggleRedstoneControlPacket  [high]", does: "nc.multiblock.network.ClearAllFluidsPacket$Handler.processMessage  \u00b7  channel nuclearcraft", couldDo: "If the tile at a client-chosen BlockPos is an `IMultiblockPart` whose multiblock is `IMultiblockFluid`, calls `multiblock.clearAllFluids()` - drains every fluid tank of an entire multiblock\u2026" },
          { name: "ToggleAlternateComparatorPacket  [high]", does: "nc.multiblock.network.ClearAllFluidsPacket$Handler.processMessage  \u00b7  channel nuclearcraft", couldDo: "If the tile at a client-chosen BlockPos is an `IMultiblockPart` whose multiblock is `IMultiblockFluid`, calls `multiblock.clearAllFluids()` - drains every fluid tank of an entire multiblock\u2026" },
          { name: "ToggleInputTanksSeparatedPacket  [high]", does: "nc.multiblock.network.ClearAllFluidsPacket$Handler.processMessage  \u00b7  channel nuclearcraft", couldDo: "If the tile at a client-chosen BlockPos is an `IMultiblockPart` whose multiblock is `IMultiblockFluid`, calls `multiblock.clearAllFluids()` - drains every fluid tank of an entire multiblock\u2026" },
          { name: "ToggleVoidExcessFluidOutputPacket  [high]", does: "nc.multiblock.network.ClearAllFluidsPacket$Handler.processMessage  \u00b7  channel nuclearcraft", couldDo: "If the tile at a client-chosen BlockPos is an `IMultiblockPart` whose multiblock is `IMultiblockFluid`, calls `multiblock.clearAllFluids()` - drains every fluid tank of an entire multiblock\u2026" },
          { name: "ToggleVoidUnusableFluidInputPacket  [high]", does: "nc.multiblock.network.ClearAllFluidsPacket$Handler.processMessage  \u00b7  channel nuclearcraft", couldDo: "If the tile at a client-chosen BlockPos is an `IMultiblockPart` whose multiblock is `IMultiblockFluid`, calls `multiblock.clearAllFluids()` - drains every fluid tank of an entire multiblock\u2026" },
          { name: "OpenGuiPacket  [high]", does: "nc.multiblock.network.ClearAllFluidsPacket$Handler.processMessage  \u00b7  channel nuclearcraft", couldDo: "If the tile at a client-chosen BlockPos is an `IMultiblockPart` whose multiblock is `IMultiblockFluid`, calls `multiblock.clearAllFluids()` - drains every fluid tank of an entire multiblock\u2026" },
          { name: "OpenTileGuiPacket  [high]", does: "nc.multiblock.network.ClearAllFluidsPacket$Handler.processMessage  \u00b7  channel nuclearcraft", couldDo: "If the tile at a client-chosen BlockPos is an `IMultiblockPart` whose multiblock is `IMultiblockFluid`, calls `multiblock.clearAllFluids()` - drains every fluid tank of an entire multiblock\u2026" },
          { name: "OpenSideConfigGuiPacket  [high]", does: "nc.multiblock.network.ClearAllFluidsPacket$Handler.processMessage  \u00b7  channel nuclearcraft", couldDo: "If the tile at a client-chosen BlockPos is an `IMultiblockPart` whose multiblock is `IMultiblockFluid`, calls `multiblock.clearAllFluids()` - drains every fluid tank of an entire multiblock\u2026" },
          { name: "ClearAllFluidsPacket  [high]", does: "nc.multiblock.network.ClearAllFluidsPacket$Handler.processMessage  \u00b7  channel nuclearcraft", couldDo: "If the tile at a client-chosen BlockPos is an `IMultiblockPart` whose multiblock is `IMultiblockFluid`, calls `multiblock.clearAllFluids()` - drains every fluid tank of an entire multiblock\u2026" },
        ],
        rootCause: "Handler: `nc.multiblock.network.ClearAllFluidsPacket$Handler.processMessage` /\n`nc/multiblock/network/ClearAllFluidsPacket.java:72-81`\n\n```\nvoid processMessage(EmptyTankPacket message, MessageContext ctx) {\n    TileEntity tile = ctx.getServerHandler().field_147369_b.func_71121_q().func_175625_s(message.pos);\n    if (tile instanceof ITileFluid) {\n        ITileFluid machine = (ITileFluid)tile;\n        machine.clearTank(message.tankNo);\n        ctx.getServerHandler().field_147369_b.func_71121_q().func_175625_s(message.pos).func_70296_d();\n    }\n}\n```",
        impact: "If the tile at a client-chosen BlockPos is an `IMultiblockPart` whose multiblock is\n`IMultiblockFluid`, calls `multiblock.clearAllFluids()` - drains every fluid tank of an\nentire multiblock structure (e.g. a whole fission/salt-fission reactor). The most\ndestructive NC packet.\n\n16 client-sendable packets in this mod, graded 16 high. Every one is listed above with its\nhandler and channel.",
        disclosure: [
          { date: "2026-08-15", event: "Reported privately to the mod maintainer and the RLCraft development team" },
          { date: "2026-08-15", event: "RLCraft development team acknowledged the report, confirmed credit, and committed to carrying the fixes in a new mixins mod (RLMixins2), starting with the grappling hook mod, with pull requests welcome" }
        ],
        patch: "No distance/ownership check on the BlockPos; a client can drain any player's multiblock\nreactor."
      },

      {
        ref: "MC-001-06",
        severity: "high",
        redacted: false,
        mod: "Ice and Fire",
        version: "1.7.1",
        cwe: "CWE-862 Missing Authorization",
        title: "MessageDragonArmor: looks up the dragon by ID and calls `setArmorInSlot(index, type)` - equipping",
        packets: [
          { name: "MessageDragonArmor  [high]", does: "com.github.alexthe666.iceandfire.message.MessageDragonArmor.onServerReceived  \u00b7  channel iceandfire", couldDo: "A client sends a dragonId + armor_index + armor_type." },
          { name: "MessageDragonControl  [high]", does: "com.aofex.alexthe666.iceandfire.message.MessageDragonControl.onServerReceive  \u00b7  channel iceandfire", couldDo: "A client sends a dragonId + controlState + posX/Y/Z." },
          { name: "MessageHippogryphArmor  [high]", does: "com.aofex.666.iceandfire.message.MessageHippogryphArmor.onServerReceived  \u00b7  channel iceandfire", couldDo: "A client sends a dragonId + slot_index + armor_type." },
          { name: "MessageMultipartInteract  [high]", does: "com.aofex.666.iceandfire.message.MessageMultipartInteract.onServerReceived  \u00b7  channel iceandfire", couldDo: "A client sends a creatureID + dmg." },
          { name: "MessagePlayerHitMultipart  [high]", does: "com.aofex.666.iceandfire.message.MessagePlayerHitMultipart.onServerReceived  \u00b7  channel iceandfire", couldDo: "A client sends a creatureID." },
          { name: "MessageStoneStatue  [high]", does: "com.aofex.666.iceandfire.message.MessageStoneStatue.onServerReceived  \u00b7  channel iceandfire", couldDo: "A client sends an entityId + isStone." },
          { name: "MessageSirenSong  [low]", does: "MessageSirenSong.onServerReceived  \u00b7  channel iceandfire", couldDo: "Client-sendable (registered on both sides via llibrary `AbstractMessage.registerOnSide` \u2192 true)." },
          { name: "MessageDeathWormHitbox  [low]", does: "MessageDeathWormHitbox.onServerReceived  \u00b7  channel iceandfire", couldDo: "" },
          { name: "MessageDaytime  [low]", does: "MessageDaytime.onServerReceived  \u00b7  channel iceandfire", couldDo: "" },
          { name: "MessageGetMyrmexHive  [low]", does: "MessageGetMyrmexHive.onServerReceived  \u00b7  channel iceandfire", couldDo: "" },
          { name: "MessageSetMyrmexHiveNull  [low]", does: "MessageSetMyrmexHiveNull.onServerReceived  \u00b7  channel iceandfire", couldDo: "" },
          { name: "MessageUpdatePixieHouse  [low]", does: "MessageUpdatePixieHouse.onServerReceived  \u00b7  channel iceandfire", couldDo: "" },
          { name: "MessageUpdatePixieHouseModel  [low]", does: "MessageUpdatePixieHouseModel.onServerReceived  \u00b7  channel iceandfire", couldDo: "No server-side effect." },
          { name: "MessageUpdatePixieJar  [low]", does: "MessageUpdatePixieJar.onServerReceived  \u00b7  channel iceandfire", couldDo: "no server-side effect." },
          { name: "MessageUpdatePodium  [low]", does: "MessageUpdatePodium.onServerReceived  \u00b7  channel iceandfire", couldDo: "no server-side effect." },
        ],
        rootCause: "Handler: `com.github.alexthe666.iceandfire.message.MessageDragonArmor.onServerReceived`\n(MessageDragonArmor.java:59-65)\n\n```\npublic void onServerReceived(MinecraftServer server, MessageDragonArmor message, EntityPlayer player, MessageContext messageContext) {\n    Entity entity = player.field_70170_p.func_73045_a(message.dragonId);\n    if (entity != null && entity instanceof EntityDragonBase) {\n        EntityDragonBase dragon = (EntityDragonBase)entity;\n        dragon.setArmorInSlot(message.armor_index, message.armor_type);\n    }\n}\n```",
        impact: "A client sends a dragonId + armor_index + armor_type. The server looks up the dragon by ID\nand calls `setArmorInSlot(index, type)` - equipping arbitrary armor on ANY dragon by ID,\nwith no ownership check.\n\n15 client-sendable packets in this mod, graded 6 high, 9 low. Every one is listed above with\nits handler and channel.",
        disclosure: [
          { date: "2026-08-14", event: "Reported privately to the mod maintainer and the RLCraft development team" },
          { date: "2026-08-14", event: "RLCraft development team acknowledged the report, confirmed credit, and committed to carrying the fixes in a new mixins mod (RLMixins2), starting with the grappling hook mod, with pull requests welcome" }
        ],
        patch: "Should verify the dragon is owned by the sender (`isOwner(player)`) before equipping armor.\nCurrently any client can equip/change armor on any dragon."
      },

      {
        ref: "MC-001-07",
        severity: "high",
        redacted: false,
        mod: "Quark",
        version: "r1.6-179",
        cwe: "CWE-862 Missing Authorization",
        title: "MessageRequestEmote: broadcasts a `MessageDoEmote` to all players and, if",
        packets: [
          { name: "MessageRequestEmote  [high]", does: "vazkii.quark.base.network.message.MessageRequestEmote.handleMessage  \u00b7  channel autoreglib", couldDo: "A client sends an emoteName." },
          { name: "MessageChangeHotbar  [medium]", does: "MessageChangeHotbar.handleMessage  \u00b7  channel autoreglib", couldDo: "Client sends a bar index (1-3);" },
          { name: "MessageDeleteItem  [medium]", does: "MessageDeleteItem.handleMessage  \u00b7  channel autoreglib", couldDo: "Client sends a slot index;" },
          { name: "MessageDropoff  [medium]", does: "MessageDropoff.handleMessage  \u00b7  channel autoreglib", couldDo: "Client triggers a dropoff of the player's inventory into nearby chests." },
          { name: "MessageMatrixEnchanterOperation  [medium]", does: "MessageMatrixEnchanterOperation.handleMessage  \u00b7  channel autoreglib", couldDo: "Client sends an operation + 3 args;" },
          { name: "MessageChangeConfig  [low]", does: "vazkii.quark.base.network.message.MessageChangeConfig.handleMessage  \u00b7  channel autoreglib", couldDo: "Not actually client-sendable - registered as `Side.CLIENT` (MessageRegister.java:60), so it is server\u2192client only." },
        ],
        rootCause: "Handler: `vazkii.quark.base.network.message.MessageRequestEmote.handleMessage`\n(MessageRequestEmote.java:62-87)\n\n```\npublic IMessage handleMessage(MessageContext context) {\n    EntityPlayerMP player = context.getServerHandler().field_147369_b;\n    MinecraftServer server = player.func_184102_h();\n    if (server != null) {\n        server.func_152344_a(() -> {\n            NetworkHandler.INSTANCE.sendToAll(new MessageDoEmote(this.emoteName, player.func_70005_c_(), ContributorRewardHandler.getTier(player)));\n            if (EmoteSystem.emoteCommands) {\n                File file;\n                String filename = this.emoteName + \".mcfunction\";\n                if (filename.startsWith(\"custom:\")) {\n                    filename = filename.substring(\"custom:\".length());\n                }\n                if ((file = new File(EmoteSystem.emotesDir, filename)).exists()) {\n                    try {\n                        FunctionObject func = FunctionObject.func_193527_a(server.func_193030_aL(), IOUtils.readLines(new FileInputStream(file), StandardCharsets.UTF_8));\n                        server.func_193030_aL().func_194019_a(func, new EmoteCommandSender(server, player));\n                    } catch (IOException e) {\n                        e.printStackTrace();\n                    }\n                }\n            }\n        });\n    }\n    return null;\n}\n```",
        impact: "A client sends an emoteName. The server broadcasts a `MessageDoEmote` to all players and, if\n`EmoteSystem.emoteCommands` is enabled, reads the file `<emotesDir>/<emoteName>.mcfunction`\nand executes it as a function with the sender as the command sender. A client can trigger\narbitrary emote commands (if the emote-commands feature is on) and spam emotes to all\nplayers.\n\n6 client-sendable packets in this mod, graded 1 high, 4 medium, 1 low. Every one is listed\nabove with its handler and channel.",
        disclosure: [
          { date: "2026-08-14", event: "Reported privately to the mod maintainer and the RLCraft development team" },
          { date: "2026-08-14", event: "RLCraft development team acknowledged the report, confirmed credit, and committed to carrying the fixes in a new mixins mod (RLMixins2), starting with the grappling hook mod, with pull requests welcome" }
        ],
        patch: "Should validate the emoteName is a known emote and that the emote-commands feature is\nintended to be client-triggerable. Currently any emoteName is accepted and the corresponding\n`.mcfunction` is executed."
      },

      {
        ref: "MC-001-08",
        severity: "high",
        redacted: false,
        mod: "RebornCore",
        version: "3.19.5",
        cwe: "CWE-862 Missing Authorization",
        title: "PacketButtonID: looks up the tile at that pos and, if it is a `LogicController`, calls",
        packets: [
          { name: "PacketButtonID  [high]", does: "reborncore.common.logic.PacketButtonID.processData  \u00b7  channel rc&reborncore.&<crc5>", couldDo: "A client sends a BlockPos + ID." },
          { name: "PacketConfigSave  [high]", does: "reborncore.common.network.packet.PacketConfigSave.processData  \u00b7  channel rc&reborncore.&<crc5>", couldDo: "A client sends a BlockPos + NBT slot config." },
          { name: "PacketFluidConfigSave  [high]", does: "reborncore.common.network.packet.PacketFluidConfigSave.processData  \u00b7  channel rc&reborncore.&<crc5>", couldDo: "A client sends a BlockPos + fluid config NBT." },
          { name: "PacketFluidIOSave  [high]", does: "reborncore.common.network.packet.PacketFluidIOSave.processData  \u00b7  channel rc&reborncore.&<crc5>", couldDo: "A client sends a BlockPos + input/output booleans." },
          { name: "PacketIOSave  [high]", does: "reborncore.common.network.packet.PacketIOSave.processData  \u00b7  channel rc&reborncore.&<crc5>", couldDo: "A client sends a BlockPos + slotID + input/output/filter booleans." },
          { name: "PacketSlotSave  [high]", does: "reborncore.common.network.packet.PacketSlotSave.processData  \u00b7  channel rc&reborncore.&<crc5>", couldDo: "A client sends a BlockPos + slot config NBT." },
        ],
        rootCause: "Handler: `reborncore.common.logic.PacketButtonID.processData` (PacketButtonID.java:45-51)\n\n```\npublic void processData(PacketButtonID message, MessageContext context) {\n    World world = context.getServerHandler().field_147369_b.field_70170_p;\n    if (world.func_175625_s(this.pos) != null && world.func_175625_s(this.pos) instanceof LogicController) {\n        LogicController controller = (LogicController)world.func_175625_s(this.pos);\n        controller.actionPerformed(this.ID);\n    }\n}\n```",
        impact: "A client sends a BlockPos + ID. The server looks up the tile at that pos and, if it is a\n`LogicController`, calls `controller.actionPerformed(ID)` - triggering any logic-controller\nbutton at an arbitrary position with no distance/ownership check.\n\n6 client-sendable packets in this mod, graded 6 high. Every one is listed above with its\nhandler and channel.",
        disclosure: [
          { date: "2026-08-14", event: "Reported privately to the mod maintainer and the RLCraft development team" },
          { date: "2026-08-14", event: "RLCraft development team acknowledged the report, confirmed credit, and committed to carrying the fixes in a new mixins mod (RLMixins2), starting with the grappling hook mod, with pull requests welcome" }
        ],
        patch: "Should verify the tile is within the sender's interaction range before triggering the\nbutton. Currently any LogicController can be triggered from anywhere."
      },

      {
        ref: "MC-001-09",
        severity: "high",
        redacted: false,
        mod: "Reskillable",
        version: "1.13.0",
        cwe: "CWE-862 Missing Authorization",
        title: "MessageDodge: calls `player.knockBack(0.3f)` on the sender - a dodge impulse",
        packets: [
          { name: "MessageDodge  [high]", does: "codersafterdark.reskillable.network.MessageDodge.handleMessage  \u00b7  channel reskillable", couldDo: "A client sends an empty MessageDodge." },
          { name: "InvalidateRequirementPacket  [high]", does: "codersafterdark.reskillable.network.InvalidateRequirementPacket.handleMessag  \u00b7  channel reskillable", couldDo: "A client sends a UUID + cacheTypes." },
          { name: "MessageDataSync  [low]", does: "codersafterdark.reskillable.network.MessageDataSync.onMessage  \u00b7  channel reskillable", couldDo: "`Side.CLIENT` (server\u2192client only) - not client-sendable." },
          { name: "MessageLockedItem  [low]", does: "MessageLockedItem.onMessage  \u00b7  channel reskillable", couldDo: "`Side.CLIENT` (server\u2192client only) - not client-sendable." },
        ],
        rootCause: "Handler: `codersafterdark.reskillable.network.MessageDodge.handleMessage`\n(MessageDodge.java:35-39)\n\n```\npublic IMessage handleMessage(MessageContext context) {\n    EntityPlayerMP player = context.getServerHandler().field_147369_b;\n    player.field_71133_b.func_152344_a(() -> player.func_71020_j(0.3f));\n    return null;\n}\n```",
        impact: "A client sends an empty MessageDodge. The server calls `player.knockBack(0.3f)` on the\nsender - a dodge impulse. The client can dodge on demand regardless of the mod's dodge\ncooldown/stamina rules.\n\n4 client-sendable packets in this mod, graded 2 high, 2 low. Every one is listed above with\nits handler and channel.",
        disclosure: [
          { date: "2026-08-15", event: "Reported privately to the mod maintainer and the RLCraft development team" },
          { date: "2026-08-15", event: "RLCraft development team acknowledged the report, confirmed credit, and committed to carrying the fixes in a new mixins mod (RLMixins2), starting with the grappling hook mod, with pull requests welcome" }
        ],
        patch: "The server should enforce the dodge cooldown server-side rather than trusting the client to\nsend the packet. Currently any client can dodge at will."
      },

      {
        ref: "MC-001-10",
        severity: "high",
        redacted: false,
        mod: "Varied Commodities",
        version: "1.12.2",
        cwe: "CWE-862 Missing Authorization",
        title: "TRADE_ACCEPT: The server, if the player is in a `ContainerTradingBlock`, advances the trade",
        packets: [
          { name: "TRADE_ACCEPT  [high]", does: "noppes.vc.PacketHandlerServer.handlePacket  \u00b7  channel VC", couldDo: "A client sends a TRADE_ACCEPT packet." },
          { name: "SAVE_SIGN  [low]", does: "PacketHandlerServer.handlePacket  \u00b7  channel variedcommodities", couldDo: "Client sends a `BlockPos` + text;" },
          { name: "SAVE_BOOK  [low]", does: "PacketHandlerServer.handlePacket  \u00b7  channel variedcommodities", couldDo: "Client sends a `BlockPos` + NBT book;" },
        ],
        rootCause: "Handler: `noppes.vc.PacketHandlerServer.handlePacket` (PacketHandlerServer.java:70-90)\n\n```\nif (type == PacketServer.TRADE_ACCEPT) {\n    if (!(player.field_71070_bA instanceof ContainerTradingBlock)) {\n        return;\n    }\n    ContainerTradingBlock con = (ContainerTradingBlock)player.field_71070_bA;\n    if (!con.tile.isFull()) {\n        return;\n    }\n    ContainerTradingBlock con2 = (ContainerTradingBlock)con.tile.other(player).field_71070_bA;\n    if (con.state == 0) {\n        con.setState(2);\n        con2.setState(1);\n    } else if (con.state == 1 || con.state == 2) {\n        con.setState(3);\n        con2.setState(3);\n        for (int i = 0; i < 9; ++i) {\n            ItemStack item = con.craftMatrix.func_70301_a(i);\n            con.craftMatrix.func_70299_a(i, con2.craftMatrix.func_70301_a(i));\n            con2.craftMatrix.func_70299_a(i, item);\n        }\n    }\n}\n```",
        impact: "A client sends a TRADE_ACCEPT packet. The server, if the player is in a\n`ContainerTradingBlock`, advances the trade state and swaps the craft matrices between the\ntwo trading players - accepting a trade. A client can force-accept a trade and swap the two\nplayers' trade contents.\n\n3 client-sendable packets in this mod, graded 1 high, 2 low. Every one is listed above with\nits handler and channel.",
        disclosure: [
          { date: "2026-08-14", event: "Reported privately to the mod maintainer and the RLCraft development team" },
          { date: "2026-08-14", event: "RLCraft development team acknowledged the report, confirmed credit, and committed to carrying the fixes in a new mixins mod (RLMixins2), starting with the grappling hook mod, with pull requests welcome" }
        ],
        patch: "Should verify the trade is fully offered and both players are in the trade container before\naccepting. Currently the client can drive the trade state machine."
      },

      {
        ref: "MC-001-11",
        severity: "high",
        redacted: false,
        mod: "AutoRegLib",
        version: "1.3-32",
        cwe: "CWE-862 Missing Authorization",
        title: "MessageDropIn: Executes a `DropInHandler.executeDropIn(player, slot, stack)` on the sender's",
        packets: [
          { name: "MessageDropIn  [high]", does: "vazkii.arl.network.message.MessageDropIn.handleMessage  \u00b7  channel autoreglib", couldDo: "Executes a `DropInHandler.executeDropIn(player, slot, stack)` on the sender's server thread with a client-supplied slot index and ItemStack." },
          { name: "TileEntityMessage  [low]", does: "vazkii.arl.network.message.TileEntityMessage  \u00b7  channel autoreglib", couldDo: "Not actually client-sendable - `TileEntityMessage` is an abstract base class that is never registered itself;" },
        ],
        rootCause: "Handler: `vazkii.arl.network.message.MessageDropIn.handleMessage` (MessageDropIn.java:38-43)\n\n```\n@Override\npublic IMessage handleMessage(MessageContext context) {\n    EntityPlayerMP player = context.getServerHandler().field_147369_b;\n    player.field_71133_b.func_152344_a(() -> DropInHandler.executeDropIn((EntityPlayer)player, this.slot, this.stack));\n    return null;\n}\n```",
        impact: "Executes a `DropInHandler.executeDropIn(player, slot, stack)` on the sender's server thread\nwith a client-supplied slot index and ItemStack. Drop-in is a GUI helper that moves/places\nan item into a slot of the sender's open container. Ungated - a client can drive arbitrary\ndrop-in operations on its own open container.\n\n2 client-sendable packets in this mod, graded 1 high, 1 low. Every one is listed above with\nits handler and channel.",
        disclosure: [
          { date: "2026-08-14", event: "Reported privately to the mod maintainer and the RLCraft development team" },
          { date: "2026-08-14", event: "RLCraft development team acknowledged the report, confirmed credit, and committed to carrying the fixes in a new mixins mod (RLMixins2), starting with the grappling hook mod, with pull requests welcome" }
        ],
        patch: "Should validate the `slot` is within the sender's open container bounds and the `stack` is a\nlegitimate item the sender actually holds. No such validation exists."
      },

      {
        ref: "MC-001-12",
        severity: "high",
        redacted: false,
        mod: "ItemPhysic",
        version: "1.4.37",
        cwe: "CWE-862 Missing Authorization",
        title: "DropPacket: sets `EventHandler.Droppower = power` - a global static",
        packets: [
          { name: "DropPacket  [high]", does: "com.creativemd.itemphysic.packet.DropPacket.executeServer  \u00b7  channel creativemd", couldDo: "A client sends a `power` int." },
          { name: "PickupPacket  [high]", does: "com.creativemd.itemphysic.packet.PickupPacket.executeServer  \u00b7  channel creativemd", couldDo: "A client sends a UUID + rightClick." },
        ],
        rootCause: "Handler: `com.creativemd.itemphysic.packet.DropPacket.executeServer` (DropPacket.java:44-46)\n\n```\npublic void executeServer(EntityPlayer player) {\n    EventHandler.Droppower = this.power;\n}\n```",
        impact: "A client sends a `power` int. The server sets `EventHandler.Droppower = power` - a global\nstatic. The client controls the drop power used by the item-physics drop mechanic, affecting\nhow items are dropped/thrown.\n\n2 client-sendable packets in this mod, graded 2 high. Every one is listed above with its\nhandler and channel.",
        disclosure: [
          { date: "2026-08-15", event: "Reported privately to the mod maintainer and the RLCraft development team" },
          { date: "2026-08-15", event: "RLCraft development team acknowledged the report, confirmed credit, and committed to carrying the fixes in a new mixins mod (RLMixins2), starting with the grappling hook mod, with pull requests welcome" }
        ],
        patch: "Should validate the power is within a sane range. Currently any int is accepted and stored\nglobally."
      },

      {
        ref: "MC-001-13",
        severity: "high",
        redacted: false,
        mod: "Level Up! 2",
        version: "1.1.23",
        cwe: "CWE-862 Missing Authorization",
        title: "SkillsPacket: sets the sender's skill levels from client-supplied data and, if",
        packets: [
          { name: "SkillsPacket  [high]", does: "levelup2.network.SkillPacketHandler.handlePacket  \u00b7  channel levelupskills", couldDo: "A client sends a button + levelSpend + skill data." },
          { name: "ClassChangePacket  [low]", does: "levelup2.network.SkillPacketHandler.handleClassChange  \u00b7  channel levelupclasses", couldDo: "Client picks its own class/specialization (mining/craft/combat bonus)." },
        ],
        rootCause: "Handler: `levelup2.network.SkillPacketHandler.handlePacket`\n(SkillPacketHandler.java:118-147)\n\n```\nprivate void handlePacket(ByteBuf buf, EntityPlayer player) {\n    boolean isInit = player.field_70170_p.field_72995_K;\n    byte button = buf.readByte();\n    int levelSpend = buf.readInt();\n    String[] skills = null;\n    int[] data = null;\n    if (isInit || button == -1) {\n        data = new int[SkillRegistry.getSkillRegistry().size()];\n        skills = new String[SkillRegistry.getSkillRegistry().size()];\n        for (int i = 0; i < data.length; ++i) {\n            skills[i] = ByteBufUtils.readUTF8String(buf);\n            data[i] = buf.readInt();\n        }\n    }\n    IPlayerClass properties = SkillRegistry.getPlayer(player);\n    if (!isInit) {\n        if (data != null && button == -1) {\n            for (int i = 0; i < data.length; ++i) {\n                properties.setSkillLevel(skills[i], data[i]);\n            }\n            SkillRegistry.loadPlayer(player);\n        }\n    } else if (data != null) {\n        properties.setSpecialization(button);\n        properties.setPlayerData(skills, data);\n    }\n    if (levelSpend > 0) {\n        player.func_82242_a(-levelSpend);\n    }\n}\n```",
        impact: "A client sends a button + levelSpend + skill data. The server sets the sender's skill levels\nfrom client-supplied data and, if `levelSpend > 0`, deducts XP from the sender. The client\ncontrols its own skill levels (can set any skill level) and can spend XP.\n\n2 client-sendable packets in this mod, graded 1 high, 1 low. Every one is listed above with\nits handler and channel.",
        disclosure: [
          { date: "2026-08-15", event: "Reported privately to the mod maintainer and the RLCraft development team" },
          { date: "2026-08-15", event: "RLCraft development team acknowledged the report, confirmed credit, and committed to carrying the fixes in a new mixins mod (RLMixins2), starting with the grappling hook mod, with pull requests welcome" }
        ],
        patch: "The server should validate the skill levels against the player's actual earned XP/level\nrather than trusting the client-supplied `data` and `levelSpend`. Currently the client can\nset arbitrary skill levels."
      },

      {
        ref: "MC-001-14",
        severity: "high",
        redacted: false,
        mod: "RLCombat",
        version: "2.0.8",
        cwe: "CWE-862 Missing Authorization",
        title: "PacketMainhandAttack: looks up the entity by ID and calls",
        packets: [
          { name: "PacketMainhandAttack  [high]", does: "bettercombat.mod.network.PacketMainhandAttack$Handler.handle  \u00b7  channel bettercombatmod", couldDo: "A client sends an entityId + motion." },
          { name: "PacketOffhandAttack  [high]", does: "bettercombat.mod.network.PacketOffhandAttack$Handler.handle  \u00b7  channel bettercombatmod", couldDo: "Same as PacketMainhandAttack but for the offhand - a client sends an entityId + motion and the server attacks that entity by ID with the offhand weapon, with no reach check on the primary t\u2026" },
        ],
        rootCause: "Handler: `bettercombat.mod.network.PacketMainhandAttack$Handler.handle`\n(PacketMainhandAttack.java:81-92)\n\n```\nprivate static void handle(PacketMainhandAttack message, MessageContext ctx) {\n    EntityPlayerMP player = ctx.getServerHandler().field_147369_b;\n    Entity theEntity = player.field_70170_p.func_73045_a(message.entityId);\n    if (theEntity != null) {\n        if (player.field_71134_c.func_73081_b() == GameType.SPECTATOR) {\n            player.func_175399_e(theEntity);\n        } else {\n            Helpers.attackTargetEntityItem(player, theEntity, false, message.motionX, message.motionY, message.motionZ);\n        }\n    }\n    ((WorldServer)player.field_70170_p).func_73039_n().func_151247_a(player, new SPacketAnimation(player, 0));\n}\n```",
        impact: "A client sends an entityId + motion. The server looks up the entity by ID and calls\n`Helpers.attackTargetEntityItem(player, theEntity, false, motionX, motionY, motionZ)` -\nattacking ANY entity by ID. The primary-target attack has no reach check (the reach check at\nHelpers.java:306 only applies to the sweep AOE, not the primary target). A client can attack\nany entity from any distance.\n\n2 client-sendable packets in this mod, graded 2 high. Every one is listed above with its\nhandler and channel.",
        disclosure: [
          { date: "2026-08-15", event: "Reported privately to the mod maintainer and the RLCraft development team" },
          { date: "2026-08-15", event: "RLCraft development team acknowledged the report, confirmed credit, and committed to carrying the fixes in a new mixins mod (RLMixins2), starting with the grappling hook mod, with pull requests welcome" }
        ],
        patch: "Should verify the target is within the player's reach before attacking. Currently the\nprimary target is attacked by ID with no distance check."
      },

      {
        ref: "MC-001-15",
        severity: "high",
        redacted: false,
        mod: "SpartanWeaponry",
        version: "1.5.3",
        cwe: "CWE-862 Missing Authorization",
        title: "PacketLongReachAttack: looks up the entity by ID, checks the sender's mainhand weapon has a \"reach\"",
        packets: [
          { name: "PacketLongReachAttack  [high]", does: "com.oblivioussp.spartanweaponry.network.PacketLongReachAttack.handleServerSi  \u00b7  channel spartanweaponry", couldDo: "A client sends an entityId + velocity." },
          { name: "PacketKeyHandle  [medium]", does: "PacketKeyHandle.handle  \u00b7  channel spartanweaponry", couldDo: "Client opens the quiver GUI for the sender's own quiver (hotbar or bauble slot)." },
        ],
        rootCause: "Handler: `com.oblivioussp.spartanweaponry.network.PacketLongReachAttack.handleServerSide`\n(PacketLongReachAttack.java:60-88)\n\n```\npublic void handleServerSide(PacketLongReachAttack message, EntityPlayerMP player) {\n    if (message == null || player == null) {\n        return;\n    }\n    Entity victim = player.getEntityWorld().getEntityByID(message.entityId);\n    if (victim == null) {\n        return;\n    }\n    ItemStack weapon = player.getHeldItemMainhand();\n    if (weapon.isEmpty()) {\n        return;\n    }\n    if (weapon.getItem() instanceof IWeaponPropertyContainer) {\n        WeaponProperty reachProp = ((IWeaponPropertyContainer)weapon.getItem()).getFirstWeaponPropertyWithType(\"reach\");\n        if (reachProp != null) {\n            float reach = reachProp.getMagnitude();\n            double distanceSquared = player.getDistanceSq(victim);\n            double reachSquared = reach * reach;\n            player.getEntityData().setFloat(\"spartanweaponry_RidingVelocity\", message.velocity);\n            if (reachSquared >= distanceSquared) {\n                player.attackTargetEntityWithCurrentItem(victim);\n            }\n        }\n        player.swingArm(EnumHand.MAIN_HAND);\n        player.resetCooldown();\n    }\n}\n```",
        impact: "A client sends an entityId + velocity. The server looks up the entity by ID, checks the\nsender's mainhand weapon has a \"reach\" property, and if `reach^2 >= distanceSquared` attacks\nthe entity. The reach check uses the weapon's reach property (which can be large), so a\nclient with a long-reach weapon can attack entities at long range - but the reach is still\nvalidated against the weapon's reach value.\n\n2 client-sendable packets in this mod, graded 1 high, 1 medium. Every one is listed above\nwith its handler and channel.",
        disclosure: [
          { date: "2026-08-15", event: "Reported privately to the mod maintainer and the RLCraft development team" },
          { date: "2026-08-15", event: "RLCraft development team acknowledged the report, confirmed credit, and committed to carrying the fixes in a new mixins mod (RLMixins2), starting with the grappling hook mod, with pull requests welcome" }
        ],
        patch: "The reach check is present (good), but the velocity is stored client-supplied and the reach\nproperty itself is client-influenced via the weapon. Should validate the velocity and ensure\nthe reach value is server-authoritative."
      },

      {
        ref: "MC-001-16",
        severity: "high",
        redacted: false,
        mod: "CollisionDamage",
        version: "1.2.2",
        cwe: "CWE-862 Missing Authorization",
        title: "PacketCollisionS: If `accel > server.accelerationThreshold`, the server applies `damageValue`",
        packets: [
          { name: "PacketCollisionS  [high]", does: "collision.packets.PacketCollisionS$CollisionMessageHandler.onMessage  \u00b7  channel collisiondamage", couldDo: "A client sends an `accel` double." },
        ],
        rootCause: "Handler: `collision.packets.PacketCollisionS$CollisionMessageHandler.onMessage`\n(PacketCollisionS.java:55-70)\n\n```\npublic IMessage onMessage(PacketCollisionS message, MessageContext ctx) {\n    if (ctx.side == Side.SERVER) {\n        EntityPlayer player = CollisionDamage.proxy.getPlayer(ctx);\n        if (player == null) {\n            return null;\n        }\n        double accel = message.getAccel();\n        IThreadListener thread = CollisionDamage.proxy.getListener(ctx);\n        thread.func_152344_a(() -> {\n            if (accel > ModConfig.server.accelerationThreshold) {\n                float damageValue = (float)Math.round((accel - ModConfig.server.accelerationThreshold) * 4.0 * ModConfig.server.damageMultiplier) / 4.0f;\n                player.func_184185_a(damageValue > 4.0f ? SoundEvents.field_187655_bw : SoundEvents.field_187545_bE, 1.0f, 1.0f);\n                player.func_70097_a(ModConfig.server.damageTypeWall ? DamageSource.field_188406_j : DamageSource.field_76379_h, damageValue);\n            }\n        });\n    }\n    return null;\n}\n```",
        impact: "A client sends an `accel` double. If `accel > server.accelerationThreshold`, the server\napplies `damageValue` damage to the sender (`player.attackEntityFrom`). The sender can\nself-inflict arbitrary damage (or, by sending a low accel, avoid the damage the mod would\nnormally apply). Self-damage only, but it lets a client bypass the mod's collision-damage\nmodel and force damage on themselves.",
        disclosure: [
          { date: "2026-08-15", event: "Reported privately to the mod maintainer and the RLCraft development team" },
          { date: "2026-08-15", event: "RLCraft development team acknowledged the report, confirmed credit, and committed to carrying the fixes in a new mixins mod (RLMixins2), starting with the grappling hook mod, with pull requests welcome" }
        ],
        patch: "The server should verify the accel value is plausible (e.g. derived from actual server-side\nmotion), not trust a client-supplied double. Currently the client fully controls the damage\namount."
      },

      {
        ref: "MC-001-17",
        severity: "high",
        redacted: false,
        mod: "ElenaiDodge",
        version: "2.1",
        cwe: "CWE-862 Missing Authorization",
        title: "SDodgeMessage: posts a `DodgeEvent.ServerDodgeEvent` and, if not cancelled, calls",
        packets: [
          { name: "SDodgeMessage  [high]", does: "com.elenai.elenaidodge.network.message.SDodgeMessage$Handler.onMessage  \u00b7  channel elenaidodge", couldDo: "A client sends a `dir` string and `cooldown` int." },
        ],
        rootCause: "Handler: `com.elenai.elenaidodge.network.message.SDodgeMessage$Handler.onMessage`\n(SDodgeMessage.java:72-86)\n\n```\nvoid processMessage(SDodgeMessage message, MessageContext ctx) {\n    EntityPlayerMP player = ctx.getServerHandler().field_147369_b;\n    DodgeEvent.ServerDodgeEvent event = new DodgeEvent.ServerDodgeEvent(DodgeEvent.Direction.valueOf(message.dir), Utils.calculateForce((EntityPlayer)player), (EntityPlayer)player, message.cooldown);\n    if (!MinecraftForge.EVENT_BUS.post(event)) {\n        Utils.handleDodge(DodgeEvent.Direction.valueOf(message.dir), event, player);\n    }\n}\n```",
        impact: "A client sends a `dir` string and `cooldown` int. The server posts a\n`DodgeEvent.ServerDodgeEvent` and, if not cancelled, calls `Utils.handleDodge(dir, event,\nplayer)` - applying a dodge (movement impulse) to the sender. The client fully controls the\ndodge direction and cooldown, so it can dodge on demand regardless of the mod's\nstamina/cooldown rules.",
        disclosure: [
          { date: "2026-08-15", event: "Reported privately to the mod maintainer and the RLCraft development team" },
          { date: "2026-08-15", event: "RLCraft development team acknowledged the report, confirmed credit, and committed to carrying the fixes in a new mixins mod (RLMixins2), starting with the grappling hook mod, with pull requests welcome" }
        ],
        patch: "The server should validate the direction string against the allowed enum and enforce the\ncooldown server-side rather than trusting the client-supplied `cooldown`. Currently\n`Direction.valueOf(message.dir)` will throw on an invalid string (crash/DoS) and the\ncooldown is client-controlled."
      },

      {
        ref: "MC-001-18",
        severity: "high",
        redacted: false,
        mod: "FantasticLib",
        version: "1.12.2.047",
        cwe: "CWE-862 Missing Authorization",
        title: "ControlEventPacket: posts it on the Forge event bus with the sender as the player",
        packets: [
          { name: "ControlEventPacket  [high]", does: "com.fantasticsource.mctools.Network$ControlEventPacketHandler.onMessage  \u00b7  channel fantasticlib", couldDo: "A client sends a `ControlEvent` (name, state, lastState, identifier)." },
        ],
        rootCause: "Handler: `com.fantasticsource.mctools.Network$ControlEventPacketHandler.onMessage`\n(Network.java:375-382)\n\n```\npublic IMessage onMessage(ControlEventPacket packet, MessageContext ctx) {\n    MinecraftServer server = FMLCommonHandler.instance().getMinecraftServerInstance();\n    server.func_152344_a(() -> MinecraftForge.EVENT_BUS.post(packet.event.setPlayer(ctx.getServerHandler().field_147369_b)));\n    return null;\n}\n```",
        impact: "A client sends a `ControlEvent` (name, state, lastState, identifier). The server posts it on\nthe Forge event bus with the sender as the player. Control events drive the mod's\ncontrol-interception system - a client can inject arbitrary control events (e.g. force a\nkey/control state) that other mods listen for.",
        disclosure: [
          { date: "2026-08-15", event: "Reported privately to the mod maintainer and the RLCraft development team" },
          { date: "2026-08-15", event: "RLCraft development team acknowledged the report, confirmed credit, and committed to carrying the fixes in a new mixins mod (RLMixins2), starting with the grappling hook mod, with pull requests welcome" }
        ],
        patch: "No validation that the control event is one the sender is allowed to send, or that the\nidentifier/name is legitimate. Should whitelist allowed control events."
      },

      {
        ref: "MC-001-19",
        severity: "high",
        redacted: false,
        mod: "Fish's Undead Rising",
        version: "1.4.2",
        cwe: "CWE-862 Missing Authorization",
        title: "PacketMountSpecial: A client can fire 8 fireballs from any entity",
        packets: [
          { name: "PacketMountSpecial  [high]", does: "com.Fishmod.mod_LavaCow.message.PacketMountSpecial.onMessage  \u00b7  channel mod_lavacow", couldDo: "Looks up any entity by client-supplied entity ID (`world.func_73045_a(message.Id)`), then spawns 8 `EntitySmallFireball`s from that entity aimed along its look vector, plus plays a sound." },
        ],
        rootCause: "Handler: `com.Fishmod.mod_LavaCow.message.PacketMountSpecial.onMessage` /\n`scratch/packetaudit/decomp/fishundeadrising/com/Fishmod/mod_LavaCow/message/PacketMountSpecial.java:49-62`\n\n```\npublic IMessage onMessage(PacketMountSpecial message, MessageContext ctx) {\n    EntityPlayerMP player = ctx.getServerHandler().field_147369_b;\n    Entity entity = player.field_70170_p.func_73045_a(message.Id);\n    Vec3d lookVec = entity.func_70040_Z();\n    for (int i = 0; i < 8; ++i) {\n        EntitySmallFireball entityammo = new EntitySmallFireball(entity.field_70170_p, (EntityLivingBase)entity, lookVec.field_72450_a * (7.0 + new Random().nextGaussian() * 2.0), lookVec.field_72448_b * (-1.0 + new Random().nextGaussian() * 3.0) - 0.25, lookVec.field_72449_c * (7.0 + new Random().nextGaussian() * 2.0));\n        entityammo.field_70165_t = message.posX + lookVec.field_72450_a * 2.0;\n        entityammo.field_70163_u = message.posY + (double)(entity.field_70131_O / 2.0f) + 1.5;\n        entityammo.field_70161_v = message.posZ + lookVec.field_72449_c * 2.0;\n        entity.field_70170_p.func_72838_d((Entity)entityammo);\n    }\n    entity.field_70170_p.func_184148_a(null, message.posX, message.posY, message.posZ, FishItems.ENTITY_SALAMANDER_SHOOT, SoundCategory.PLAYERS, 1.0f, 1.0f / (new Random().nextFloat() * 0.4f + 1.2f));\n    return null;\n}\n```",
        impact: "Looks up any entity by client-supplied entity ID (`world.func_73045_a(message.Id)`), then\nspawns 8 `EntitySmallFireball`s from that entity aimed along its look vector, plus plays a\nsound. No check that the entity is the sender's mount, is tameable, or is even the sender's\nown entity. A client can fire 8 fireballs from any entity (including another player's or a\nhostile mob) at any position.",
        disclosure: [
          { date: "2026-08-15", event: "Reported privately to the mod maintainer and the RLCraft development team" },
          { date: "2026-08-15", event: "RLCraft development team acknowledged the report, confirmed credit, and committed to carrying the fixes in a new mixins mod (RLMixins2), starting with the grappling hook mod, with pull requests welcome" }
        ],
        patch: "No check that the entity is the sender's own mount - the handler should verify the target\nentity is the sender's ridden/tamed mount before spawning projectiles."
      },

      {
        ref: "MC-001-20",
        severity: "high",
        redacted: false,
        mod: "InventoryTweaks",
        version: "1.64",
        cwe: "CWE-862 Missing Authorization",
        title: "ITPacketClick: calls `container.slotClick(slot, data, action, player)` on the sender's open",
        packets: [
          { name: "ITPacketClick  [high]", does: "invtweaks.network.packets.ITPacketClick.handle  \u00b7  channel InventoryTweaks", couldDo: "A client sends a slot + data + ClickType + window." },
        ],
        rootCause: "Handler: `invtweaks.network.packets.ITPacketClick.handle` (ITPacketClick.java:58-66)\n\n```\npublic void handle(INetHandler handler) {\n    if (handler instanceof NetHandlerPlayServer) {\n        NetHandlerPlayServer serverHandler = (NetHandlerPlayServer)handler;\n        EntityPlayerMP player = serverHandler.field_147369_b;\n        if (!player.func_175149_v() && player.field_71070_bA.field_75152_c == this.window) {\n            player.field_71070_bA.func_184996_a(this.slot, this.data, this.action, player);\n        }\n    }\n}\n```",
        impact: "A client sends a slot + data + ClickType + window. The server calls\n`container.slotClick(slot, data, action, player)` on the sender's open container if the\nwindow id matches. This lets a client drive arbitrary inventory clicks on its own open\ncontainer (move/swap/drop items) - the same as normal inventory interaction but via the\nmod's packet, bypassing the vanilla click validation.",
        disclosure: [
          { date: "2026-08-15", event: "Reported privately to the mod maintainer and the RLCraft development team" },
          { date: "2026-08-15", event: "RLCraft development team acknowledged the report, confirmed credit, and committed to carrying the fixes in a new mixins mod (RLMixins2), starting with the grappling hook mod, with pull requests welcome" }
        ],
        patch: "The handler only checks the window id matches the sender's open container; it should also\nvalidate the slot is within the container bounds and the click is legitimate. Currently a\nmalformed slot/action could cause issues."
      },

      {
        ref: "MC-001-21",
        severity: "high",
        redacted: false,
        mod: "MultiMine",
        version: "1.12.2",
        cwe: "CWE-862 Missing Authorization",
        title: "PartialBlockPacket: looks up the player by username and calls",
        packets: [
          { name: "PartialBlockPacket  [high]", does: "atomicstryker.multimine.common.network.PartialBlockPacket$ScheduledCode.run  \u00b7  channel AS_MM", couldDo: "A client sends a username + x,y,z + value + regenerating." },
        ],
        rootCause: "Handler: `atomicstryker.multimine.common.network.PartialBlockPacket$ScheduledCode.run` \u2192\n`MultiMineServer.onClientSentPartialBlockPacket` (MultiMineServer.java:104-140)\n\n```\npublic void onClientSentPartialBlockPacket(EntityPlayerMP player, int x, int y, int z, float value) {\n    serverInstance = FMLCommonHandler.instance().getMinecraftServerInstance();\n    int dimension = player.field_71093_bK;\n    BlockPos pos = new BlockPos(x, y, z);\n    IBlockState iblockstate = player.field_70170_p.func_180495_p(pos);\n    Block block = iblockstate.func_177230_c();\n    if (this.isUsingBannedItem(player) || this.isBlockBanned(block, block.func_176201_c(iblockstate))) {\n        return;\n    }\n    // ... find partially-mined block, set progress ...\n    if (iterBlock.isFinished() && !block.isAir(...)) {\n        player.field_70170_p.func_175715_c(player.func_145782_y(), pos, -1);\n        int event = ForgeHooks.onBlockBreakEvent(world, gameType, player, pos);\n        if (event != -1) {\n            // ... break the block ...\n        }\n    }\n}\n```",
        impact: "A client sends a username + x,y,z + value + regenerating. The server looks up the player by\nusername and calls `onClientSentPartialBlockPacket(player, x, y, z, value)`, which advances\nthe partial-block mining progress at that position and, when finished, breaks the block\n(`world.breakBlock`). A client can mine/break blocks at arbitrary positions by sending\nprogress packets - no distance/line-of-sight check (only a banned-item/block check).",
        disclosure: [
          { date: "2026-08-15", event: "Reported privately to the mod maintainer and the RLCraft development team" },
          { date: "2026-08-15", event: "RLCraft development team acknowledged the report, confirmed credit, and committed to carrying the fixes in a new mixins mod (RLMixins2), starting with the grappling hook mod, with pull requests welcome" }
        ],
        patch: "Should verify the block is within the sender's reach and that the sender is actually mining\nit. Currently any position can be progressed to completion and broken."
      },

      {
        ref: "MC-001-22",
        severity: "high",
        redacted: false,
        mod: "PotionCore",
        version: "1.9",
        cwe: "CWE-862 Missing Authorization",
        title: "CToSMessage: type 2 (`USE_ENTITY`) calls `useEntity(player, buff)` which can",
        packets: [
          { name: "CToSMessage  [high]", does: "com.tmtravlr.potioncore.network.PacketHandlerServer.onMessage  \u00b7  channel potioncore", couldDo: "A client sends a raw byte payload with a type discriminator." },
        ],
        rootCause: "Handler: `com.tmtravlr.potioncore.network.PacketHandlerServer.onMessage`\n(PacketHandlerServer.java:62-87)\n\n```\npublic IMessage onMessage(CToSMessage packet, MessageContext context) {\n    MinecraftServer server = FMLCommonHandler.instance().getMinecraftServerInstance();\n    PacketBuffer buff = new PacketBuffer(Unpooled.wrappedBuffer(packet.getData()));\n    int type = buff.readInt();\n    switch (type) {\n        case 1: {\n            server.func_152344_a(() -> {\n                EntityPlayerMP player = server.func_184103_al().func_177451_a(new UUID(buff.readLong(), buff.readLong()));\n                if (player != null) {\n                    player.field_70143_R = 0.0f;  // zero vertical velocity (cancel fall)\n                }\n            });\n            break;\n        }\n        case 2: {\n            server.func_152344_a(() -> {\n                EntityPlayerMP player = server.func_184103_al().func_177451_a(new UUID(buff.readLong(), buff.readLong()));\n                if (player != null) {\n                    PacketHandlerServer.useEntity(player, buff);\n                }\n            });\n            break;\n        }\n    }\n    return null;\n}\n```",
        impact: "A client sends a raw byte payload with a type discriminator. Type 1 (`CLIMB_FALL`) zeroes\nthe sender's vertical velocity; type 2 (`USE_ENTITY`) calls `useEntity(player, buff)` which\ncan interact/attack any entity by ID (with a reach check). The client can trigger\npotion-climb fall-cancel and entity interactions.",
        disclosure: [
          { date: "2026-08-15", event: "Reported privately to the mod maintainer and the RLCraft development team" },
          { date: "2026-08-15", event: "RLCraft development team acknowledged the report, confirmed credit, and committed to carrying the fixes in a new mixins mod (RLMixins2), starting with the grappling hook mod, with pull requests welcome" }
        ],
        patch: "The `USE_ENTITY` path does check reach (`player.getDistanceSq(entity) <=\ngetPlayerReachDistance`), but the CLIMB_FALL path has no check - the client can cancel fall\ndamage at will. Should validate the sender is actually climbing/falling."
      },

      {
        ref: "MC-001-23",
        severity: "high",
        redacted: false,
        mod: "QualityTools",
        version: "1.0.7",
        cwe: "CWE-862 Missing Authorization",
        title: "CToSMessage: A client sends a type discriminator + BlockPos + dimension",
        packets: [
          { name: "CToSMessage  [high]", does: "com.tmtravlr.qualitytools.network.PacketHandlerServer.onMessage  \u00b7  channel qualitytools", couldDo: "A client sends a type discriminator + BlockPos + dimension." },
        ],
        rootCause: "Handler: `com.tmtravlr.qualitytools.network.PacketHandlerServer.onMessage`\n(PacketHandlerServer.java:33-52)\n\n```\npublic IMessage onMessage(CToSMessage packet, MessageContext context) {\n    PacketBuffer buff = new PacketBuffer(Unpooled.wrappedBuffer(packet.getData()));\n    MinecraftServer server = FMLCommonHandler.instance().getMinecraftServerInstance();\n    int type = buff.readInt();\n    switch (type) {\n        case 1: {\n            BlockPos pos = buff.func_179259_c();\n            int dimension = buff.readInt();\n            WorldServer world = null;\n            if (server != null) {\n                world = server.func_71218_a(dimension);\n            }\n            if (world == null || !(world.func_175625_s(pos) instanceof TileEntityReforgingStation)) break;\n            TileEntityReforgingStation tile = (TileEntityReforgingStation)world.func_175625_s(pos);\n            tile.reforgeTool();\n            break;\n        }\n    }\n    return null;\n}\n```",
        impact: "A client sends a type discriminator + BlockPos + dimension. Type 1 (REFORGE_TOOL) looks up a\n`TileEntityReforgingStation` at the given pos/dimension and calls `reforgeTool()` -\nreforging a tool at an arbitrary position with no distance/ownership check.",
        disclosure: [
          { date: "2026-08-15", event: "Reported privately to the mod maintainer and the RLCraft development team" },
          { date: "2026-08-15", event: "RLCraft development team acknowledged the report, confirmed credit, and committed to carrying the fixes in a new mixins mod (RLMixins2), starting with the grappling hook mod, with pull requests welcome" }
        ],
        patch: "Should verify the tile is within the sender's interaction range before reforging. Currently\nany reforging station can be triggered from anywhere."
      },

      {
        ref: "MC-001-24",
        severity: "high",
        redacted: false,
        mod: "RLArtifacts",
        version: "1.1.2",
        cwe: "CWE-862 Missing Authorization",
        title: "PacketBottledCloudJump: zeroes the sender's vertical velocity and spawns cloud particles",
        packets: [
          { name: "PacketBottledCloudJump  [high]", does: "artifacts.common.network.PacketBottledCloudJump$PacketHandler.onMessage  \u00b7  channel artifacts", couldDo: "A client sends an isFart boolean." },
        ],
        rootCause: "Handler: `artifacts.common.network.PacketBottledCloudJump$PacketHandler.onMessage`\n(PacketBottledCloudJump.java:45-66)\n\n```\npublic IMessage onMessage(PacketBottledCloudJump message, MessageContext ctx) {\n    EntityPlayerMP player = ctx.getServerHandler().field_147369_b;\n    player.func_71121_q().func_152344_a(() -> {\n        player.field_70143_R = 0.0f;\n        player.func_70664_aZ();\n        // ... spawn cloud particles ...\n        if (message.isFart) {\n            player.func_184185_a(ModSoundEvents.FART, 1.3f, 0.8f + player.func_70681_au().nextFloat() * 0.4f);\n        } else {\n            player.func_184185_a(SoundEvents.field_187548_af, 1.3f, 0.8f + player.func_70681_au().nextFloat() * 0.4f);\n        }\n    });\n    return null;\n}\n```",
        impact: "A client sends an isFart boolean. The server zeroes the sender's vertical velocity and\nspawns cloud particles (and plays a sound) - a \"bottled cloud jump\" that lets the sender\njump/float on demand. The client can trigger this at will.",
        disclosure: [
          { date: "2026-08-15", event: "Reported privately to the mod maintainer and the RLCraft development team" },
          { date: "2026-08-15", event: "RLCraft development team acknowledged the report, confirmed credit, and committed to carrying the fixes in a new mixins mod (RLMixins2), starting with the grappling hook mod, with pull requests welcome" }
        ],
        patch: "Should verify the sender actually has the bottled-cloud artifact equipped before granting\nthe jump. Currently any client can trigger it."
      },

      {
        ref: "MC-001-25",
        severity: "high",
        redacted: false,
        mod: "SimpleDifficulty",
        version: "0.3.9",
        cwe: "CWE-862 Missing Authorization",
        title: "MessageConfigLAN: On a LAN/integrated server, the server calls",
        packets: [
          { name: "MessageConfigLAN  [high]", does: "com.charles445.simpledifficulty.network.MessageConfigLAN$Handler.onMessage  \u00b7  channel simpledifficulty", couldDo: "A client sends an empty MessageConfigLAN." },
        ],
        rootCause: "Handler: `com.charles445.simpledifficulty.network.MessageConfigLAN$Handler.onMessage`\n(MessageConfigLAN.java:37-50)\n\n```\npublic IMessage onMessage(MessageConfigLAN message, MessageContext ctx) {\n    EntityPlayerMP sender;\n    if (ctx.side == Side.SERVER && (sender = ctx.getServerHandler().field_147369_b) != null && FMLCommonHandler.instance().getSide().isClient()) {\n        EntityPlayer receiver = SimpleDifficulty.proxy.getClientMinecraftPlayer();\n        if (receiver == null) {\n            SimpleDifficulty.logger.error(\"Client's player was null on physical client side!\");\n            return null;\n        }\n        if (sender.func_110124_au().equals(receiver.func_110124_au())) {\n            sender.func_71121_q().func_152344_a(() -> ModConfig.sendServerConfigToAllPlayers());\n        }\n    }\n    return null;\n}\n```",
        impact: "A client sends an empty MessageConfigLAN. On a LAN/integrated server, the server calls\n`ModConfig.sendServerConfigToAllPlayers()` - re-broadcasting the server config to all\nplayers. A client can force a config re-broadcast (spam).",
        disclosure: [
          { date: "2026-08-15", event: "Reported privately to the mod maintainer and the RLCraft development team" },
          { date: "2026-08-15", event: "RLCraft development team acknowledged the report, confirmed credit, and committed to carrying the fixes in a new mixins mod (RLMixins2), starting with the grappling hook mod, with pull requests welcome" }
        ],
        patch: "Should verify the sender is the LAN host before allowing a config re-broadcast. Currently\nany client can trigger it."
      },

      {
        ref: "MC-001-26",
        severity: "high",
        redacted: false,
        mod: "WolfArmorAndStorage",
        version: "3.8.1",
        cwe: "CWE-862 Missing Authorization",
        title: "WolfDropChestMessage: looks up the entity by ID and, if it is an `IArmoredWolf`, calls `dropChest()`",
        packets: [
          { name: "WolfDropChestMessage  [high]", does: "dev.satyrn.wolfarmor.common.network.packets.WolfDropChestMessage.process  \u00b7  channel wolfarmor", couldDo: "A client sends an entityId." },
        ],
        rootCause: "Handler: `dev.satyrn.wolfarmor.common.network.packets.WolfDropChestMessage.process`\n(WolfDropChestMessage.java:44-54)\n\n```\nprotected IMessage process(EntityPlayer player, Side side) {\n    World world = player.getEntityWorld();\n    Entity entity = world.getEntityByID(this.entityId);\n    if (entity instanceof IArmoredWolf) {\n        IArmoredWolf armoredWolf = (IArmoredWolf)entity;\n        armoredWolf.dropChest();\n        armoredWolf.dropInventoryContents();\n    }\n    return null;\n}\n```",
        impact: "A client sends an entityId. The server looks up the entity by ID and, if it is an\n`IArmoredWolf`, calls `dropChest()` and `dropInventoryContents()` - dropping the chest and\ninventory of ANY armored wolf by ID, with no ownership check.",
        disclosure: [
          { date: "2026-08-14", event: "Reported privately to the mod maintainer and the RLCraft development team" },
          { date: "2026-08-14", event: "RLCraft development team acknowledged the report, confirmed credit, and committed to carrying the fixes in a new mixins mod (RLMixins2), starting with the grappling hook mod, with pull requests welcome" }
        ],
        patch: "Should verify the wolf is owned by the sender before dropping its chest. Currently any\nclient can drop any wolf's chest."
      },

      {
        ref: "MC-001-27",
        severity: "medium",
        redacted: false,
        mod: "Lycanites Mobs",
        version: "2.0.8.9",
        cwe: "CWE-862 Missing Authorization",
        title: "MessagePlayerAttack: server calls `playerExt.meleeAttack(entity)` on any entity by ID",
        packets: [
          { name: "MessagePlayerAttack  [medium]", does: "MessagePlayerAttack.onMessage  \u00b7  channel lycanitesmobs", couldDo: "Client sends an entity ID;" },
          { name: "MessagePlayerControl  [medium]", does: "MessagePlayerControl.onMessage  \u00b7  channel lycanitesmobs", couldDo: "Client sends a byte of control states;" },
          { name: "MessagePlayerLeftClick  [medium]", does: "MessagePlayerLeftClick.onMessage  \u00b7  channel lycanitesmobs", couldDo: "Client triggers the left-click action of the equipment item in the sender's active hand." },
          { name: "MessageTileEntityButton  [medium]", does: "MessageTileEntityButton.onMessage  \u00b7  channel lycanitesmobs", couldDo: "Client sends a button ID + arbitrary `BlockPos`;" },
          { name: "MessageSummoningPedestalSummonSet  [medium]", does: "MessageSummoningPedestalSummonSet.onMessage  \u00b7  channel lycanitesmobs", couldDo: "Client sends a summon-set (type/subspecies/variant/behavior) + arbitrary `BlockPos`;" },
          { name: "MessageSyncRequest  [low]", does: "MessageSyncRequest.onMessage  \u00b7  channel lycanitesmobs", couldDo: "" },
          { name: "MessageGUIRequest  [low]", does: "MessageGUIRequest.onMessage  \u00b7  channel lycanitesmobs", couldDo: "" },
          { name: "MessagePetEntry  [low]", does: "MessagePetEntry.onMessage  \u00b7  channel lycanitesmobs", couldDo: "" },
          { name: "MessagePetEntryRemove  [low]", does: "MessagePetEntryRemove.onMessage  \u00b7  channel lycanitesmobs", couldDo: "" },
          { name: "MessageSummonSet  [low]", does: "MessageSummonSet.onMessage  \u00b7  channel lycanitesmobs", couldDo: "" },
          { name: "MessageSummonSetSelection  [low]", does: "MessageSummonSetSelection.onMessage  \u00b7  channel lycanitesmobs", couldDo: "" },
          { name: "MessageBeastiary  [low]", does: "MessageBeastiary.onMessage  \u00b7  channel lycanitesmobs", couldDo: "client-bound;" },
          { name: "MessageCreatureKnowledge  [low]", does: "MessageCreatureKnowledge.onMessage  \u00b7  channel lycanitesmobs", couldDo: "client-boundary." },
          { name: "MessagePlayerStats  [low]", does: "MessagePlayerStats.onMessage  \u00b7  channel lycanitesmobs", couldDo: "client-boundary." },
          { name: "MessageCreature  [low]", does: "MessageCreature.onMessage  \u00b7  channel lycanitesmobs", couldDo: "client-boundary." },
          { name: "MessageEntityPickedUp  [low]", does: "MessageEntityPickedUp.onMessage  \u00b7  channel lycanitesmobs", couldDo: "client-boundary." },
          { name: "MessageEntityPerched  [low]", does: "MessageEntityPerched.onMessage  \u00b7  channel lycanitesmobs", couldDo: "client-boundary." },
          { name: "MessageEntityVelocity  [low]", does: "MessageEntityVelocity.onMessage  \u00b7  channel lycanitesmobs", couldDo: "client-boundary." },
          { name: "MessageWorldEvent  [low]", does: "MessageWorldEvent.onMessage  \u00b7  channel lycanitesmobs", couldDo: "client-boundary." },
          { name: "MessageMobEvent  [low]", does: "MessageMobEvent.onMessage  \u00b7  channel lycanitesmobs", couldDo: "client-boundary." },
          { name: "MessageSummoningPedestalStats  [low]", does: "MessageSummoningPedestalStats.onMessage  \u00b7  channel lycanitesmobs", couldDo: "client-boundary." },
        ],
        rootCause: "Handler: `MessagePlayerAttack.onMessage`\n(`com/lycanitesmobs/core/network/MessagePlayerAttack.java:35`)\n\n```\npublic static void onMessage(MessagePlayerAttack message, MessageContext ctx, EntityPlayer player) {\n    ExtendedPlayer playerExt = ExtendedPlayer.getForPlayer(player);\n    if (message.attackEntityID != 0) {\n        playerExt.meleeAttack(player.func_130014_f_().func_73045_a(message.attackEntityID));\n    }\n}\n```",
        impact: "Client sends an entity ID; server calls `playerExt.meleeAttack(entity)` on any entity by ID.\nNo ownership/range check - a client can force a melee attack on any loaded creature\n(including another player's tame). This is the Lycanites equivalent of the\nRLCombat/SRParasites arbitrary-attack primitive.\n\n21 client-sendable packets in this mod, graded 5 medium, 16 low. Every one is listed above\nwith its handler and channel.",
        disclosure: [
          { date: "2026-08-14", event: "Reported privately to the mod maintainer and the RLCraft development team" },
          { date: "2026-08-14", event: "RLCraft development team acknowledged the report, confirmed credit, and committed to carrying the fixes in a new mixins mod (RLMixins2), starting with the grappling hook mod, with pull requests welcome" }
        ],
        patch: "No reach/ownership/range validation on the target entity. Add a distance check and verify\nthe target is a valid attackable creature."
      },

      {
        ref: "MC-001-28",
        severity: "medium",
        redacted: false,
        mod: "SRParasites",
        version: "1.9.11",
        cwe: "CWE-862 Missing Authorization",
        title: "SRPPacketMeleeRange: server attacks any entity by ID if the sender holds an `IHaveReach` weapon",
        packets: [
          { name: "SRPPacketMeleeRange  [medium]", does: "SRPPacketMeleeRange.Handler.onMessage  \u00b7  channel SRParasites", couldDo: "Client sends an entity ID;" },
          { name: "SRPPacketEntityBodyHit  [medium]", does: "SRPPacketEntityBodyHit.Handler  \u00b7  channel SRParasites", couldDo: "Client sends a target ID + part ID;" },
          { name: "SRPPacketBiomeChange  [low]", does: "SRPPacketBiomeChange.Handler.handle  \u00b7  channel SRParasites", couldDo: "client-boundary." },
          { name: "SRPPacketFog  [low]", does: "SRPPacketFog.Handler.handle  \u00b7  channel SRParasites", couldDo: "client-boundary." },
          { name: "SRPPacketMovingSound  [low]", does: "SRPPacketMovingSound.Handler.handle  \u00b7  channel SRParasites", couldDo: "client-boundary." },
          { name: "SRPPacketParticle  [low]", does: "SRPPacketParticle.Handler.handle  \u00b7  channel SRParasites", couldDo: "client-boundary." },
          { name: "SRPPacketEntityBodyDead  [low]", does: "SRPPacketEntityBodyDead.Handler.handle  \u00b7  channel SRParasites", couldDo: "client-boundary." },
        ],
        rootCause: "Handler: `SRPPacketMeleeRange.Handler.onMessage`\n(`com/dhanantry/scapeandrunparasites/network/SRPPacketMeleeRange.java:50`)\n\n```\npublic IMessage onMessage(final SRPPacketMeleeRange message, MessageContext ctx) {\n    final EntityPlayerMP thePlayer = SRPMain.proxy.getPlayerEntityFromContext(ctx);\n    thePlayer.func_184102_h().func_152344_a(new Runnable(){\n        @Override\n        public void run() {\n            Entity theEntity = thePlayer.field_70170_p.func_73045_a(message.entityId);\n            if (thePlayer.func_184607_cu() == null || theEntity == null) {\n                return;\n            }\n            if (thePlayer.func_184614_ca().func_77973_b() instanceof IHaveReach) {\n                IHaveReach theExtendedReachWeapon = (IHaveReach)thePlayer.func_184614_ca().func_77973_b();\n                double distanceSq = thePlayer.func_70068_e(theEntity);\n                double reachSq = theExtendedReachWeapon.getReach() * theExtendedReachWeapon.getReach();\n                if (reachSq >= distanceSq) {\n                    thePlayer.func_71059_n(theEntity);\n                    thePlayer.field_70170_p.func_184148_a((EntityPlayer)null, thePlayer.field_70165_t, thePlayer.field_70163_u, thePlayer.field_70161_v, SoundEvents.field_187730_dW, thePlayer.func_184176_by(), 1.0f, 1.0f);\n                    thePlayer.func_184810_cG();\n                }\n            }\n        }\n    });\n    return null;\n}\n```",
        impact: "Client sends an entity ID; server attacks any entity by ID if the sender holds an\n`IHaveReach` weapon and the target is within the weapon's reach. No ownership check - a\nclient can melee-attack any loaded entity within reach. This is an arbitrary-attack\nprimitive (cross-player griefing).\n\n7 client-sendable packets in this mod, graded 2 medium, 5 low. Every one is listed above\nwith its handler and channel.",
        disclosure: [
          { date: "2026-08-15", event: "Reported privately to the mod maintainer and the RLCraft development team" },
          { date: "2026-08-15", event: "RLCraft development team acknowledged the report, confirmed credit, and committed to carrying the fixes in a new mixins mod (RLMixins2), starting with the grappling hook mod, with pull requests welcome" }
        ],
        patch: "No check that the target is a valid attackable creature or that the sender can actually\nsee/reach it. Add a line-of-sight / ownership check."
      },

      {
        ref: "MC-001-29",
        severity: "medium",
        redacted: false,
        mod: "Quark R1.6-179",
        version: "",
        cwe: "CWE-862 Missing Authorization",
        title: "MessageRequestPassengerChest: Client requests the chest-inventory of a `EntityChestPassenger` riding",
        packets: [
          { name: "MessageRequestPassengerChest  [medium]", does: "MessageRequestPassengerChest.handleMessage  \u00b7  channel autoreglib", couldDo: "Client requests the chest-inventory of a `EntityChestPassenger` riding the sender's boat." },
          { name: "MessageRestock  [medium]", does: "MessageRestock.handleMessage  \u00b7  channel autoreglib", couldDo: "Client triggers a restock of the player's inventory from nearby chests." },
          { name: "MessageSortInventory  [medium]", does: "MessageSortInventory.handleMessage  \u00b7  channel autoreglib", couldDo: "Client sorts the player's inventory." },
        ],
        rootCause: "Handler: `MessageRequestPassengerChest.handleMessage`\n(`vazkii/quark/base/network/message/MessageRequestPassengerChest.java:27`)\n\n```\npublic IMessage handleMessage(MessageContext context) {\n    Entity riding;\n    EntityPlayerMP player = context.getServerHandler().field_147369_b;\n    if (player.func_184218_aH() && player.field_71070_bA == player.field_71069_bz && (riding = player.func_184187_bx()) instanceof EntityBoat) {\n        List passengers = riding.func_184188_bt();\n        for (Entity passenger : passengers) {\n            if (!(passenger instanceof EntityChestPassenger)) continue;\n            player.func_71007_a((IInventory)((EntityChestPassenger)passenger));\n        }\n    }\n    return null;\n}\n```",
        impact: "Client requests the chest-inventory of a `EntityChestPassenger` riding the sender's boat.\nSelf-only - opens the sender's own boat-chest. No cross-player impact.\n\n3 client-sendable packets in this mod, graded 3 medium. Every one is listed above with its\nhandler and channel.",
        disclosure: [
          { date: "2026-08-15", event: "Reported privately to the mod maintainer and the RLCraft development team" },
          { date: "2026-08-15", event: "RLCraft development team acknowledged the report, confirmed credit, and committed to carrying the fixes in a new mixins mod (RLMixins2), starting with the grappling hook mod, with pull requests welcome" }
        ],
        patch: "None material - self-only."
      },

      {
        ref: "MC-001-30",
        severity: "medium",
        redacted: false,
        mod: "CarbonConfig",
        version: "2.0.2.1",
        cwe: "CWE-862 Missing Authorization",
        title: "SyncPacket: Same as `SyncPacket` but for a batch of config entries - deserializes",
        packets: [
          { name: "SyncPacket  [medium]", does: "BulkSyncPacket  \u00b7  channel carbonconfig:networking", couldDo: "Same as `SyncPacket` but for a batch of config entries - deserializes client-supplied config entries into a named config and saves it, with no op/permission check." },
          { name: "BulkSyncPacket  [medium]", does: "BulkSyncPacket  \u00b7  channel carbonconfig:networking", couldDo: "Same as `SyncPacket` but for a batch of config entries - deserializes client-supplied config entries into a named config and saves it, with no op/permission check." },
        ],
        rootCause: "Handler: `BulkSyncPacket` \u2192 `SyncPacket.processEntry` \u2192 `cfg.saveQuietly()`\n(`BulkSyncPacket.java`; no decompiled source in project)\n\n```\n// From audit (group6.md): SyncPacket.processEntry -> cfg.saveQuietly(), SyncPacket.java:93-122\n// No permission check. Only affects entries flagged as \"synced\" for the given SyncType.\n```",
        impact: "Same as `SyncPacket` but for a batch of config entries - deserializes client-supplied config\nentries into a named config and saves it, with no op/permission check.\n\n2 client-sendable packets in this mod, graded 2 medium. Every one is listed above with its\nhandler and channel.",
        disclosure: [
          { date: "2026-08-15", event: "Reported privately to the mod maintainer and the RLCraft development team" },
          { date: "2026-08-15", event: "RLCraft development team acknowledged the report, confirmed credit, and committed to carrying the fixes in a new mixins mod (RLMixins2), starting with the grappling hook mod, with pull requests welcome" }
        ],
        patch: "No op/permission check before saving config - should require op level 4."
      },

      {
        ref: "MC-001-31",
        severity: "medium",
        redacted: false,
        mod: "firstaid",
        version: "1.6.22",
        cwe: "CWE-862 Missing Authorization",
        title: "MessageApplyHealingItem: server consumes one item from that hand and sets it as the active healer",
        packets: [
          { name: "MessageApplyHealingItem  [medium]", does: "MessageApplyHealingItem.Handler.onMessage  \u00b7  channel firstaid", couldDo: "Client picks a body part + hand;" },
          { name: "MessageClientRequest  [medium]", does: "MessageClientRequest.Handler.onMessage  \u00b7  channel firstaid", couldDo: "Client sends a `Type` byte." },
        ],
        rootCause: "Handler: `MessageApplyHealingItem.Handler.onMessage` -\n`ichttt/mods/firstaid/common/network/MessageApplyHealingItem.java:62`\n\n```\npublic static class Handler\nimplements IMessageHandler<MessageApplyHealingItem, IMessage> {\n    public IMessage onMessage(MessageApplyHealingItem message, MessageContext ctx) {\n        ctx.getServerHandler().field_147369_b.func_184102_h().func_152344_a(() -> {\n            EntityPlayerMP player = ctx.getServerHandler().field_147369_b;\n            AbstractPlayerDamageModel damageModel = (AbstractPlayerDamageModel)Objects.requireNonNull(player.getCapability(CapabilityExtendedHealthSystem.INSTANCE, null));\n            ItemStack stack = player.func_184586_b(message.hand);\n            Item item = stack.func_77973_b();\n            AbstractPartHealer healer = FirstAidRegistryImpl.INSTANCE.getPartHealer(stack);\n            if (healer == null) {\n                FirstAid.LOGGER.warn(\"Player {} has invalid item in hand {} while it should be an healing item\", (Object)player.func_70005_c_(), (Object)item.getRegistryName());\n                player.func_145747_a((ITextComponent)new TextComponentString(\"Unable to apply healing item!\"));\n                return;\n            }\n            stack.func_190918_g(1);\n            AbstractDamageablePart damageablePart = damageModel.getFromEnum(message.part);\n            damageablePart.activeHealer = healer;\n        });\n        return null;\n    }\n}\n```",
        impact: "Client picks a body part + hand; server consumes one item from that hand and sets it as the\nactive healer on the chosen part. The only gate is that the held item must be a registered\n`AbstractPartHealer` (checked via `FirstAidRegistryImpl.INSTANCE.getPartHealer(stack)`). A\nclient can apply any registered healing item it holds to any part - self-only, consumes the\nitem, no free healing. Weaponization is limited (self-heal with a legitimately-held item),\nbut the packet is unauthenticated beyond the item check.\n\n2 client-sendable packets in this mod, graded 2 medium. Every one is listed above with its\nhandler and channel.",
        disclosure: [
          { date: "2026-08-15", event: "Reported privately to the mod maintainer and the RLCraft development team" },
          { date: "2026-08-15", event: "RLCraft development team acknowledged the report, confirmed credit, and committed to carrying the fixes in a new mixins mod (RLMixins2), starting with the grappling hook mod, with pull requests welcome" }
        ],
        patch: "No check that the part is actually damaged, no cooldown/rate limit, and no server-side\nvalidation that the item should be usable on that part. A rate-limited server-side heal\nvalidation would close the \"spam heal\" angle."
      },

      {
        ref: "MC-001-32",
        severity: "medium",
        redacted: false,
        mod: "Waystones",
        version: "4.1.0",
        cwe: "CWE-862 Missing Authorization",
        title: "MessageRemoveWaystone: server removes that waystone from the sender's own waystone list",
        packets: [
          { name: "MessageRemoveWaystone  [medium]", does: "HandlerRemoveWaystone.onMessage  \u00b7  channel waystones", couldDo: "Client sends an index;" },
          { name: "MessageSortWaystone  [medium]", does: "HandlerSortWaystone.onMessage  \u00b7  channel waystones", couldDo: "Client sends two indices;" },
        ],
        rootCause: "Handler: `HandlerRemoveWaystone.onMessage`\n(`net/blay09/mods/waystones/network/handler/HandlerRemoveWaystone.java:27`)\n\n```\npublic IMessage onMessage(MessageRemoveWaystone message, MessageContext ctx) {\n    NetworkHandler.getThreadListener(ctx).func_152344_a(() -> {\n        PlayerWaystoneData waystoneData = PlayerWaystoneData.fromPlayer((EntityPlayer)ctx.getServerHandler().field_147369_b);\n        WaystoneEntry[] entries = waystoneData.getWaystones();\n        int index = message.getIndex();\n        if (index < 0 || index >= entries.length) {\n            return;\n        }\n        WaystoneManager.removePlayerWaystone((EntityPlayer)ctx.getServerHandler().field_147369_b, entries[index]);\n        WaystoneManager.sendPlayerWaystones((EntityPlayer)ctx.getServerHandler().field_147369_b);\n    });\n    return null;\n}\n```",
        impact: "Client sends an index; server removes that waystone from the sender's own waystone list.\nSelf-only - no cross-player impact. The index is bounds-checked.\n\n2 client-sendable packets in this mod, graded 2 medium. Every one is listed above with its\nhandler and channel.",
        disclosure: [
          { date: "2026-08-15", event: "Reported privately to the mod maintainer and the RLCraft development team" },
          { date: "2026-08-15", event: "RLCraft development team acknowledged the report, confirmed credit, and committed to carrying the fixes in a new mixins mod (RLMixins2), starting with the grappling hook mod, with pull requests welcome" }
        ],
        patch: "None material - self-only."
      },

      {
        ref: "MC-001-33",
        severity: "medium",
        redacted: false,
        mod: "Antique Atlas Auto Marker",
        version: "1.4.3",
        cwe: "CWE-862 Missing Authorization",
        title: "AddedStructureMarkersPacket: Takes a client-supplied `atlasID`, `dimension`, and a list of `Marker`s",
        packets: [
          { name: "AddedStructureMarkersPacket  [medium]", does: "antiqueatlasautomarker.structuremarkers.network.AddedStructureMarkersPacket.  \u00b7  channel antiqueatlas", couldDo: "Takes a client-supplied `atlasID`, `dimension`, and a list of `Marker`s (id, type, label, x, z, visibleAhead) and calls `MarkersData.loadMarker(marker)` on the server's atlas data for that \u2026" },
        ],
        rootCause: "Handler:\n`antiqueatlasautomarker.structuremarkers.network.AddedStructureMarkersPacket.process` /\n`scratch/packetaudit/decomp/antiqueatlasautomarker/antiqueatlasautomarker/structuremarkers/network/AddedStructureMarkersPacket.java:91-99`\n\n```\nprotected void process(EntityPlayer player, Side side) {\n    if (ConfigHandler.internal.doDebugLogs) {\n        AntiqueAtlasAutoMarker.LOGGER.info(\"Server received {} new structure markers for atlas #{}\", (Object)this.markersByType.size(), (Object)this.atlasID);\n    }\n    MarkersData markersData = AntiqueAtlasMod.markersData.getMarkersData(this.atlasID, player.func_130014_f_());\n    for (Marker marker : this.markersByType.values()) {\n        markersData.loadMarker(marker);\n    }\n}\n```",
        impact: "Takes a client-supplied `atlasID`, `dimension`, and a list of `Marker`s (id, type, label, x,\nz, visibleAhead) and calls `MarkersData.loadMarker(marker)` on the server's atlas data for\nthat atlasID. `loadMarker` inserts the marker into the atlas's dimension data (subject only\nto the global `markerLimit`), which is then synced to players holding that atlas. A client\ncan inject arbitrary markers (labels/positions) into any atlas, including other players'\natlases.",
        disclosure: [
          { date: "2026-08-15", event: "Reported privately to the mod maintainer and the RLCraft development team" },
          { date: "2026-08-15", event: "RLCraft development team acknowledged the report, confirmed credit, and committed to carrying the fixes in a new mixins mod (RLMixins2), starting with the grappling hook mod, with pull requests welcome" }
        ],
        patch: "No ownership check on `atlasID` - the handler should verify the sender owns (holds) the\natlas whose ID is supplied."
      },

      {
        ref: "MC-001-34",
        severity: "medium",
        redacted: false,
        mod: "FishingMadeBetter",
        version: "2.2.6",
        cwe: "CWE-862 Missing Authorization",
        title: "PacketKeybindS: Client sets its own fishing keybind (REEL_IN / REEL_OUT) while fishing",
        packets: [
          { name: "PacketKeybindS  [medium]", does: "PacketKeybindS.KeybindMessageHandler.onMessage  \u00b7  channel fishingmadebetter", couldDo: "Client sets its own fishing keybind (REEL_IN / REEL_OUT) while fishing." },
        ],
        rootCause: "Handler: `PacketKeybindS.KeybindMessageHandler.onMessage`\n(`net/theawesomegem/fishingmadebetter/common/networking/packet/PacketKeybindS.java:50`)\n\n```\npublic static class KeybindMessageHandler\nimplements IMessageHandler<PacketKeybindS, IMessage> {\n    public IMessage onMessage(PacketKeybindS message, MessageContext ctx) {\n        EntityPlayer player = Primary.proxy.getPlayer(ctx);\n        Keybind bind = message.getKeyBind();\n        if (player == null) {\n            return null;\n        }\n        IThreadListener thread = Primary.proxy.getListener(ctx);\n        thread.func_152344_a(() -> {\n            IFishingData fishingData = (IFishingData)player.getCapability(FishingCapabilityProvider.FISHING_DATA_CAP, null);\n            if (fishingData == null) {\n                return;\n            }\n            if (!fishingData.isFishing()) {\n                return;\n            }\n            fishingData.setKeybind(bind);\n        });\n        return null;\n    }\n}\n```",
        impact: "Client sets its own fishing keybind (REEL_IN / REEL_OUT) while fishing. Self-only, no\ncross-player impact. The only gate is `fishingData.isFishing()`.",
        disclosure: [
          { date: "2026-08-15", event: "Reported privately to the mod maintainer and the RLCraft development team" },
          { date: "2026-08-15", event: "RLCraft development team acknowledged the report, confirmed credit, and committed to carrying the fixes in a new mixins mod (RLMixins2), starting with the grappling hook mod, with pull requests welcome" }
        ],
        patch: "None material - self-only state change. A rate limit would be defensive only."
      },

      {
        ref: "MC-001-35",
        severity: "medium",
        redacted: false,
        mod: "InfernalMobs",
        version: "1.12.2",
        cwe: "CWE-862 Missing Authorization",
        title: "MobModsPacket: the server looks up the entity's infernal modifier and replies",
        packets: [
          { name: "MobModsPacket  [medium]", does: "MobModsPacket.ScheduledCode.run  \u00b7  channel AS_IF", couldDo: "Client sends an entity ID;" },
        ],
        rootCause: "Handler: `MobModsPacket.ScheduledCode.run`\n(`atomicstryker/infernalmobs/common/network/MobModsPacket.java:68`)\n\n```\nclass ScheduledCode\nimplements Runnable {\n    @Override\n    public void run() {\n        if (MobModsPacket.this.sentFromServer != 0) {\n            InfernalMobsCore.proxy.onMobModsPacketToClient(MobModsPacket.this.stringData, MobModsPacket.this.entID);\n        } else {\n            EntityLivingBase e;\n            MobModifier mod;\n            Entity ent;\n            EntityPlayerMP p = FMLCommonHandler.instance().getMinecraftServerInstance().func_184103_al().func_152612_a(MobModsPacket.this.stringData);\n            if (p != null && (ent = p.field_70170_p.func_73045_a(MobModsPacket.this.entID)) != null && ent instanceof EntityLivingBase && (mod = InfernalMobsCore.getMobModifiers(e = (EntityLivingBase)ent)) != null) {\n                MobModsPacket.this.stringData = mod.getLinkedModNameUntranslated();\n                InfernalMobsCore.instance().networkHelper.sendPacketToPlayer(new MobModsPacket(MobModsPacket.this.stringData, MobModsPacket.this.entID, 1), p);\n                InfernalMobsCore.instance().sendHealthPacket(e);\n            }\n        }\n    }\n}\n```",
        impact: "Client sends an entity ID; the server looks up the entity's infernal modifier and replies\nwith the modifier name + health packet. Read-only query - no state change. The only gate is\nthat the entity must be an `EntityLivingBase` with a `MobModifier`. Low real impact\n(information disclosure of an entity's infernal modifier).",
        disclosure: [
          { date: "2026-08-15", event: "Reported privately to the mod maintainer and the RLCraft development team" },
          { date: "2026-08-15", event: "RLCraft development team acknowledged the report, confirmed credit, and committed to carrying the fixes in a new mixins mod (RLMixins2), starting with the grappling hook mod, with pull requests welcome" }
        ],
        patch: "No distance/ownership check on the queried entity - a client can probe any loaded entity's\nmodifier. Add a range check."
      },

      {
        ref: "MC-001-36",
        severity: "medium",
        redacted: false,
        mod: "librarianlib",
        version: "4.22",
        cwe: "CWE-862 Missing Authorization",
        title: "PacketSyncSlotVisibility: the server applies it to the slots of the sender's open librarianlib",
        packets: [
          { name: "PacketSyncSlotVisibility  [medium]", does: "PacketSyncSlotVisibility.handle  \u00b7  channel librarianlib", couldDo: "Client sends a `boolean[]` visibility mask;" },
        ],
        rootCause: "Handler: `PacketSyncSlotVisibility.handle`\n(`com/teamwizardry/librarianlib/features/network/PacketSyncSlotVisibility.java:37`)\n\n```\n@Override\npublic void handle(@NotNull MessageContext ctx) {\n    Object object;\n    Intrinsics.checkParameterIsNotNull(ctx, \"ctx\");\n    Container container = ctx.getServerHandler().field_147369_b.field_71070_bA;\n    if (!(container instanceof ContainerImpl)) {\n        container = null;\n    }\n    if ((object = (ContainerImpl)container) != null && (object = ((ContainerImpl)((Object)object)).getContainer()) != null && (object = ((ContainerBase)object).getAllSlots()) != null) {\n        Iterable $receiver$iv = (Iterable)object;\n        int index$iv = 0;\n        for (Object item$iv : $receiver$iv) {\n            int n = index$iv++;\n            SlotBase slotBase = (SlotBase)item$iv;\n            int i = n;\n            if (i >= this.visibility.length) continue;\n            slot.setVisible(this.visibility[i]);\n        }\n    }\n}\n```",
        impact: "Client sends a `boolean[]` visibility mask; the server applies it to the slots of the\nsender's open librarianlib `ContainerImpl`. Self-only, but ungated - a client can hide/show\nany slot in its own open container. Low real impact.",
        disclosure: [
          { date: "2026-08-15", event: "Reported privately to the mod maintainer and the RLCraft development team" },
          { date: "2026-08-15", event: "RLCraft development team acknowledged the report, confirmed credit, and committed to carrying the fixes in a new mixins mod (RLMixins2), starting with the grappling hook mod, with pull requests welcome" }
        ],
        patch: "No check that the container is actually open / that the slot indices are valid (the loop\nguards `i >= visibility.length` but not the reverse). Add bounds validation."
      },

      {
        ref: "MC-001-37",
        severity: "medium",
        redacted: false,
        mod: "Mantle",
        version: "1.12-1.3.3.55",
        cwe: "CWE-862 Missing Authorization",
        title: "PacketUpdateSavedPage: server writes it as a saved-page NBT tag onto the book held in the sender's",
        packets: [
          { name: "PacketUpdateSavedPage  [medium]", does: "PacketUpdateSavedPage.handleServer  \u00b7  channel mantle:books", couldDo: "Client sends a page name;" },
        ],
        rootCause: "Handler: `PacketUpdateSavedPage.handleServer`\n(`slimeknights/mantle/network/book/PacketUpdateSavedPage.java:44`)\n\n```\n@Override\npublic IMessage handleServer(NetHandlerPlayServer netHandler) {\n    EntityPlayerMP player;\n    ItemStack is;\n    if (netHandler.field_147369_b != null && this.pageName != null && !(is = (player = netHandler.field_147369_b).func_184586_b(EnumHand.MAIN_HAND)).func_190926_b()) {\n        BookHelper.writeSavedPage(is, this.pageName);\n    }\n    return null;\n}\n```",
        impact: "Client sends a page name; server writes it as a saved-page NBT tag onto the book held in the\nsender's main hand. Self-only, requires a held book. No cross-player impact.",
        disclosure: [
          { date: "2026-08-15", event: "Reported privately to the mod maintainer and the RLCraft development team" },
          { date: "2026-08-15", event: "RLCraft development team acknowledged the report, confirmed credit, and committed to carrying the fixes in a new mixins mod (RLMixins2), starting with the grappling hook mod, with pull requests welcome" }
        ],
        patch: "None material - self-only."
      },

      {
        ref: "MC-001-38",
        severity: "medium",
        redacted: false,
        mod: "Painting Select GUI",
        version: "1.1.0.1",
        cwe: "CWE-862 Missing Authorization",
        title: "SPacketPainting: Looks up any entity by client-supplied entity ID",
        packets: [
          { name: "SPacketPainting  [medium]", does: "com.mcf.davidee.paintinggui.packet.SPacketPainting$SPaintingMessageHandler.h  \u00b7  channel Paint_Select_Gui", couldDo: "Looks up any entity by client-supplied entity ID (`player.world.func_73045_a(packet.id)`);" },
        ],
        rootCause: "Handler:\n`com.mcf.davidee.paintinggui.packet.SPacketPainting$SPaintingMessageHandler.handleServerSide`\n/\n`scratch/packetaudit/decomp/paintingselgui/com/mcf/davidee/paintinggui/packet/SPacketPainting.java:76-109`\n\n```\nprivate void handleServerSide(EntityPlayerMP player, SPacketPainting packet) {\n    if (packet.art.length == 1) {\n        EntityPainting.EnumArt enumArt = this.getEnumArt(packet.art[0]);\n        Entity e = player.field_70170_p.func_73045_a(packet.id);\n        if (e instanceof EntityPainting) {\n            this.setPaintingArt((EntityPainting)e, enumArt);\n            NetworkHandler.NETWORK.sendToDimension((IMessage)new CPacketPainting(packet.id, new String[]{enumArt.field_75702_A}), e.field_71093_bK);\n        } else {\n            player.func_145747_a((ITextComponent)new TextComponentString(\"\\u00a7Error - Could not locate painting\"));\n        }\n    } else {\n        Entity e = player.field_70170_p.func_73045_a(packet.id);\n        if (e instanceof EntityPainting) {\n            EntityPainting painting = (EntityPainting)e;\n            EntityPainting.EnumArt origArt = painting.field_70522_e;\n            ArrayList<EntityPainting.EnumArt> validArts = new ArrayList<EntityPainting.EnumArt>();\n            for (EntityPainting.EnumArt art : EntityPainting.EnumArt.values()) {\n                this.setPaintingArt(painting, art);\n                if (!painting.func_70518_d()) continue;\n                validArts.add(art);\n            }\n            EntityPainting.EnumArt[] validArtsArray = validArts.toArray(new EntityPainting.EnumArt[0]);\n            Arrays.sort(validArtsArray, PaintingSelection.ART_COMPARATOR);\n            String[] names = new String[validArtsArray.length];\n            for (int i = 0; i < validArtsArray.length; ++i) {\n                names[i] = validArtsArray[i].field_75702_A;\n            }\n            NetworkHandler.NETWORK.sendTo((IMessage)new CPacketPainting(packet.id, names), player);\n            this.setPaintingArt(painting, origArt);\n        } else {\n            player.sendMessage((ITextComponent)new TextComponentString(\"\\u00a7cError - Could not locate painting\"));\n        }\n    }\n}\n```",
        impact: "Looks up any entity by client-supplied entity ID (`player.world.func_73045_a(packet.id)`);\nif it is an `EntityPainting`, it changes the painting's art/motive (`setPaintingArt` writes\nthe \"Motive\" NBT). With `art.length==1` it sets the given art directly and broadcasts a\n`CPacketPainting` to the dimension; with multiple arts it iterates all `EnumArt` values to\nfind valid ones and sends the list back. No check that the painting belongs to the sender or\nis within reach.",
        disclosure: [
          { date: "2026-08-15", event: "Reported privately to the mod maintainer and the RLCraft development team" },
          { date: "2026-08-15", event: "RLCraft development team acknowledged the report, confirmed credit, and committed to carrying the fixes in a new mixins mod (RLMixins2), starting with the grappling hook mod, with pull requests welcome" }
        ],
        patch: "No ownership/reach check on the painting entity - the handler should verify the painting is\nthe sender's (or within reach) before changing its art."
      },

      {
        ref: "MC-001-39",
        severity: "medium",
        redacted: false,
        mod: "SpartanShields",
        version: "1.5.5",
        cwe: "CWE-862 Missing Authorization",
        title: "PacketShieldBash: server performs a shield bash on any entity by ID - knockback + 1.0 damage, no",
        packets: [
          { name: "PacketShieldBash  [medium]", does: "PacketShieldBash.handleServerSide  \u00b7  channel spartanshields", couldDo: "Client sends a hand + entity ID + attack flag;" },
        ],
        rootCause: "Handler: `PacketShieldBash.handleServerSide`\n(`com/oblivioussp/spartanshields/network/PacketShieldBash.java:72`)\n\n```\n@Override\npublic void handleServerSide(PacketShieldBash message, EntityPlayerMP player) {\n    ItemStack shield;\n    boolean attackEntity = false;\n    if (message == null || player == null) {\n        return;\n    }\n    EnumHand shieldHand = message.hand;\n    int entId = message.entityId;\n    attackEntity = message.attackEntity;\n    Entity victim = player.field_70170_p.func_73045_a(entId);\n    if (player.func_184585_cz() && !(shield = player.func_184586_b(shieldHand)).func_190926_b() && !player.func_184811_cZ().func_185141_a(shield.func_77973_b()) && shield.func_77973_b() instanceof ItemShieldBase) {\n        if (attackEntity && victim != null && victim instanceof EntityLivingBase) {\n            int knockLvl = EnchantmentHelper.func_77506_a((Enchantment)Enchantments.field_180313_o, (ItemStack)shield);\n            victim.field_70172_ad = 0;\n            ((EntityLivingBase)victim).func_70653_a((Entity)player, 1.0f + (float)knockLvl, (double)MathHelper.func_76126_a((float)(player.field_70177_z * ((float)Math.PI / 180))), (double)(-MathHelper.func_76134_b((float)(player.field_70177_z * ((float)Math.PI / 180)))));\n            victim.func_70097_a(DamageSource.func_76365_a((EntityPlayer)player), 1.0f);\n            shield.func_77972_a(5, (EntityLivingBase)player);\n            player.field_70170_p.func_184148_a((EntityPlayer)null, player.field_70165_t, player.field_70163_u, player.field_70161_v, SoundEvents.field_187767_eL, player.func_184176_by(), 1.0f, 1.0f);\n            player.func_71009_b(victim);\n        }\n    }\n}\n```",
        impact: "Client sends a hand + entity ID + attack flag; server performs a shield bash on any entity\nby ID - knockback + 1.0 damage, no ownership/range check. The only gate is that the sender\nholds a shield in the given hand and is not on cooldown. This is an arbitrary-entity\nknockback/damage primitive (cross-player griefing).",
        disclosure: [
          { date: "2026-08-15", event: "Reported privately to the mod maintainer and the RLCraft development team" },
          { date: "2026-08-15", event: "RLCraft development team acknowledged the report, confirmed credit, and committed to carrying the fixes in a new mixins mod (RLMixins2), starting with the grappling hook mod, with pull requests welcome" }
        ],
        patch: "No reach/range check on the victim entity. Add a distance check and verify the victim is\nwithin bash range."
      },

      {
        ref: "MC-001-40",
        severity: "low",
        redacted: false,
        mod: "BetterQuesting",
        version: "3.5.329",
        cwe: "CWE-862 Missing Authorization",
        title: "quest_action: claims rewards or runs `detect()` on the named quests",
        packets: [
          { name: "quest_action  [low]", does: "NetQuestAction.onServer  \u00b7  channel BQ_NET_CHAN", couldDo: "Client sends `action` (0=claim, 1=detect) plus an array of `questIDs`." },
          { name: "quest_sync  [low]", does: "NetQuestSync.onServer  \u00b7  channel BQ_NET_CHAN", couldDo: "Client requests quest config/progress sync for a set of quest IDs." },
          { name: "chapter_sync  [low]", does: "NetChapterSync.onServer  \u00b7  channel BQ_NET_CHAN", couldDo: "Client requests chapter (quest-line) config sync;" },
          { name: "party_sync  [low]", does: "NetPartySync.onServer  \u00b7  channel BQ_NET_CHAN", couldDo: "Client requests party data;" },
          { name: "name_sync  [low]", does: "NetNameSync.onServer  \u00b7  channel BQ_NET_CHAN", couldDo: "Client sends a list of UUIDs and/or player names;" },
          { name: "main_sync  [low]", does: "NetBulkSync.onServer  \u00b7  channel BQ_NET_CHAN", couldDo: "Client requests a full questing-data sync;" },
        ],
        rootCause: "Handler: `NetQuestAction.onServer` - `network/handlers/NetQuestAction.java:64-94`\n\n```\nprivate static void onServer(Tuple<NBTTagCompound, EntityPlayerMP> message) {\n    int action = !((NBTTagCompound)message.func_76341_a()).func_150297_b(\"action\", 99) ? -1 : ((NBTTagCompound)message.func_76341_a()).func_74762_e(\"action\");\n    switch (action) {\n        case 0: {\n            NetQuestAction.claimQuest(((NBTTagCompound)message.func_76341_a()).func_74759_k(\"questIDs\"), (EntityPlayerMP)message.func_76340_b());\n            break;\n        }\n        case 1: {\n            NetQuestAction.detectQuest(((NBTTagCompound)message.func_76341_a()).func_74759_k(\"questIDs\"), (EntityPlayerMP)message.func_76340_b());\n            break;\n        }\n        default: {\n            BetterQuesting.logger.log(Level.ERROR, \"Invalid quest user action '\" + action + \"'. Full payload:\\n\" + ((NBTTagCompound)message.func_76341_a()).toString());\n        }\n    }\n}\n```",
        impact: "Client sends `action` (0=claim, 1=detect) plus an array of `questIDs`. The server claims\nrewards or runs `detect()` on the named quests. `claimQuest` is gated by `canClaim(player)`\n(quest completion/eligibility), but `detectQuest` runs `detect()` on any quest ID with no\npermission check - a client can force quest detection on arbitrary quests. Self-progress\nonly, low.\n\n6 client-sendable packets in this mod, graded 6 low. Every one is listed above with its\nhandler and channel.",
        disclosure: [
          { date: "2026-08-15", event: "Reported privately to the mod maintainer and the RLCraft development team" },
          { date: "2026-08-15", event: "RLCraft development team acknowledged the report, confirmed credit, and committed to carrying the fixes in a new mixins mod (RLMixins2), starting with the grappling hook mod, with pull requests welcome" }
        ],
        patch: "`detectQuest` has no permission/eligibility gate; should verify the sender is a participant\nof the quest before running `detect`."
      },

      {
        ref: "MC-001-41",
        severity: "low",
        redacted: false,
        mod: "Dynamic Surroundings",
        version: "3.6.2.1",
        cwe: "CWE-862 Missing Authorization",
        title: "PacketEntityData: `Side.CLIENT` (server\u2192client, disc 3) - NOT client-sendable",
        packets: [
          { name: "PacketEntityData  [low]", does: "PacketEntityData.PacketHandler.onMessage  \u00b7  channel dsurround", couldDo: "`Side.CLIENT` (server\u2192client, disc 3) - NOT client-sendable." },
          { name: "PacketEnvironment  [low]", does: "PacketEnvironment.PacketHandler.onMessage  \u00b7  channel dsurround", couldDo: "`Side.CLIENT` (disc 5) - NOT client-sendable." },
          { name: "PacketServerData  [low]", does: "PacketServerData.PacketHandler.onMessage  \u00b7  channel dsurround", couldDo: "`Side.CLIENT` (disc 6) - NOT client-sendable." },
          { name: "PacketSpeechBubble  [low]", does: "PacketSpeechBubble.PacketHandler.onMessage  \u00b7  channel dsurround", couldDo: "`Side.CLIENT` (disc 2) - NOT client-sendable." },
          { name: "PacketThunder  [low]", does: "PacketThunder.PacketHandler.onMessage  \u00b7  channel dsurround", couldDo: "`Side.CLIENT` (disc 4) - NOT client-sendable." },
          { name: "PacketWeatherUpdate  [low]", does: "PacketWeatherUpdate.PacketHandler.onMessage  \u00b7  channel dsurround", couldDo: "`Side.CLIENT` (disc 1) - NOT client-sendable." },
        ],
        rootCause: "Handler: `PacketEntityData.PacketHandler.onMessage` - `network/PacketEntityData.java:59-75`\n\n```\npublic IMessage onMessage(@Nonnull PacketEntityData message, @Nullable MessageContext ctx) {\n    if (ctx != null) {\n        ModBase.proxy().getThreadListener(ctx).func_152344_a(() -> {\n            IEntityDataSettable data;\n            Entity entity;\n            World world = EnvironStateHandler.EnvironState.getWorld();\n            if (world != null && (entity = WorldUtils.locateEntity((World)world, (int)message.entityId)) != null && (data = (IEntityDataSettable)CapabilityEntityData.getCapability(entity)) != null) {\n                data.setAttacking(message.isAttacking);\n                data.setFleeing(message.isFleeing);\n            }\n        });\n    }\n    return null;\n}\n```",
        impact: "`Side.CLIENT` (server\u2192client, disc 3) - NOT client-sendable. Sets an entity's\nattacking/fleeing flags for the client's ambient-effects renderer. No server impact.\n\n6 client-sendable packets in this mod, graded 6 low. Every one is listed above with its\nhandler and channel.",
        disclosure: [
          { date: "2026-08-15", event: "Reported privately to the mod maintainer and the RLCraft development team" },
          { date: "2026-08-15", event: "RLCraft development team acknowledged the report, confirmed credit, and committed to carrying the fixes in a new mixins mod (RLMixins2), starting with the grappling hook mod, with pull requests welcome" }
        ],
        patch: "n/a (client-only)."
      },

      {
        ref: "MC-001-42",
        severity: "low",
        redacted: false,
        mod: "Grappling Hook",
        version: "v12.3",
        cwe: "CWE-862 Missing Authorization",
        title: "GrappleAttachMessage: Server\u2192client only: tells the client to attach a grapple arrow to a position",
        packets: [
          { name: "GrappleAttachMessage  [low]", does: "GrappleAttachMessage.Handler.onMessage  \u00b7  channel grapplemodchannel", couldDo: "Not actually client-sendable - registered `Side.CLIENT` (`grapplemod.java:342`)." },
          { name: "GrappleDetachMessage  [low]", does: "GrappleDetachMessage.Handler.onMessage  \u00b7  channel grapplemodchannel", couldDo: "Not actually client-sendable (Side.CLIENT, `grapplemod.java:348`)." },
          { name: "DetachSingleHookMessage  [low]", does: "DetachSingleHookMessage.Handler.onMessage  \u00b7  channel grapplemodchannel", couldDo: "" },
          { name: "GrappleAttachPosMessage  [low]", does: "GrappleAttachPosMessage.Handler  \u00b7  channel grapplemodchannel", couldDo: "" },
          { name: "SegmentMessage  [low]", does: "SegmentMessage.Handler  \u00b7  channel grapplemodchannel", couldDo: "" },
          { name: "LoggedInMessage  [low]", does: "LoggedInMessage.Handler  \u00b7  channel grapplemodchannel", couldDo: "" },
        ],
        rootCause: "Handler: `GrappleAttachMessage.Handler.onMessage` / `GrappleAttachMessage.java:117-151`\n\n```\npublic static class Handler\nimplements IMessageHandler<GrappleAttachMessage, IMessage> {\n    public IMessage onMessage(GrappleAttachMessage message, MessageContext ctx) {\n        Minecraft mainThread = Minecraft.func_71410_x();\n        mainThread.func_152344_a((Runnable)new runner(message, ctx));\n        return null;\n    }\n    public class runner implements Runnable {\n        public void run() {\n            WorldClient world = Minecraft.func_71410_x().field_71441_e;\n            Entity grapple = world.func_73045_a(this.message.id);\n            if (grapple instanceof grappleArrow) {\n                ((grappleArrow)grapple).clientAttach(this.message.x, this.message.y, this.message.z);\n                SegmentHandler segmenthandler = ((grappleArrow)grapple).segmenthandler;\n                segmenthandler.segments = this.message.segments;\n                segmenthandler.segmentbottomsides = this.message.segmentbottomsides;\n                segmenthandler.segmenttopsides = this.message.segmenttopsides;\n                Entity player = world.func_73045_a(this.message.entityid);\n                segmenthandler.forceSetPos(new vec(this.message.x, this.message.y, this.message.z), vec.positionvec(player));\n            }\n            grapplemod.proxy.createControl(this.message.controlid, this.message.id, this.message.entityid, (World)world, new vec(this.message.x, this.message.y, this.message.z), this.message.blockpos, this.message.custom);\n        }\n    }\n}\n```",
        impact: "Not actually client-sendable - registered `Side.CLIENT` (`grapplemod.java:342`).\nServer\u2192client only: tells the client to attach a grapple arrow to a position, set its\nsegment list, and create a grapple control. A client cannot forge this to affect the server.\n\n6 client-sendable packets in this mod, graded 6 low. Every one is listed above with its\nhandler and channel.",
        disclosure: [
          { date: "2026-08-15", event: "Reported privately to the mod maintainer and the RLCraft development team" },
          { date: "2026-08-15", event: "RLCraft development team acknowledged the report, confirmed credit, and committed to carrying the fixes in a new mixins mod (RLMixins2), starting with the grappling hook mod, with pull requests welcome" }
        ],
        patch: "N/A (client-bound; no server-side effect to gate)."
      },

      {
        ref: "MC-001-43",
        severity: "low",
        redacted: false,
        mod: "Antique Atlas",
        version: "4.6.3",
        cwe: "CWE-862 Missing Authorization",
        title: "RegisterTileIdPacket: the server calls `ExtTileIdMap.instance().getOrCreatePseudoBiomeID(name)`",
        packets: [
          { name: "RegisterTileIdPacket  [low]", does: "RegisterTileIdPacket.process  \u00b7  channel antiqueatlas", couldDo: "Client sends an arbitrary tile-name string;" },
          { name: "AddMarkerPacket  [low]", does: "AddMarkerPacket.process  \u00b7  channel antiqueatlas", couldDo: "Creates a marker on the sender's atlas at a client-supplied position and broadcasts a `MarkersPacket` to all players." },
          { name: "DeleteMarkerPacket  [low]", does: "DeleteMarkerPacket.process  \u00b7  channel antiqueatlas", couldDo: "Registered on both sides (bidirectional)." },
          { name: "PutBiomeTilePacket  [low]", does: "PutBiomeTilePacket.process  \u00b7  channel antiqueatlas", couldDo: "Registered on both sides." },
          { name: "GridPositionPacket  [low]", does: "n/a  \u00b7  channel n/a", couldDo: "This packet does NOT exist." },
        ],
        rootCause: "Handler: `RegisterTileIdPacket.process` - `network/server/RegisterTileIdPacket.java:46-51`\n\n```\n@Override\nprotected void process(EntityPlayer player, Side side) {\n    int biomeID = ExtTileIdMap.instance().getOrCreatePseudoBiomeID(this.name);\n    TileNameIDPacket packet = new TileNameIDPacket();\n    packet.put(this.name, biomeID);\n    PacketDispatcher.sendToAll(packet);\n}\n```",
        impact: "Client sends an arbitrary tile-name string; the server calls\n`ExtTileIdMap.instance().getOrCreatePseudoBiomeID(name)` - allocating a new pseudo-biome ID\nin the server-wide registry - then broadcasts a `TileNameIDPacket` to all players. Ungated:\nany client can pollute the server's tile-ID registry and spam every connected player with a\ntile-name packet. Low because it only grows a registry map and triggers a broadcast (no\nblock/entity mutation).\n\n5 client-sendable packets in this mod, graded 5 low. Every one is listed above with its\nhandler and channel.",
        disclosure: [
          { date: "2026-08-14", event: "Reported privately to the mod maintainer and the RLCraft development team" },
          { date: "2026-08-14", event: "RLCraft development team acknowledged the report, confirmed credit, and committed to carrying the fixes in a new mixins mod (RLMixins2), starting with the grappling hook mod, with pull requests welcome" }
        ],
        patch: "No permission, rate-limit, or name-whitelist check. Should reject unknown/arbitrary names\nand rate-limit per-player registry growth."
      },

      {
        ref: "MC-001-44",
        severity: "low",
        redacted: false,
        mod: "ScalingHealth",
        version: "1.3.42",
        cwe: "CWE-862 Missing Authorization",
        title: "MessageDataSync: client-boundary",
        packets: [
          { name: "MessageDataSync  [low]", does: "MessageDataSync.handleMessage  \u00b7  channel scalinghealth", couldDo: "client-boundary." },
          { name: "MessageDebugData  [low]", does: "MessageDebugData.handleMessage  \u00b7  channel scalinghealth", couldDo: "client-boundary." },
          { name: "MessageMarkBlight  [low]", does: "MessageMarkBlight.handleMessage  \u00b7  channel scalinghealth", couldDo: "client-boundary." },
          { name: "MessagePlaySound  [low]", does: "MessagePlaySound.handleMessage  \u00b7  channel scalinghealth", couldDo: "client-boundary." },
          { name: "MessageWorldDataSync  [low]", does: "MessageWorldDataSync.handleMessage  \u00b7  channel scalinghealth", couldDo: "client-boundary." },
        ],
        rootCause: "Handler: `MessageDataSync.handleMessage` / `MessageDataSync.java:50-71`\n\n```\n@Override\n@Nullable\n@SideOnly(value=Side.CLIENT)\npublic IMessage handleMessage(MessageContext context) {\n    ClientTicks.scheduleAction(() -> {\n        EntityPlayer player = MessageDataSync.getPlayerByName(this.playerName);\n        if (player != null) {\n            SHPlayerDataHandler.PlayerData data = SHPlayerDataHandler.get(player);\n            if (data != null) {\n                data.readFromNBT(this.tags);\n                if (Config.Player.Health.allowModify) {\n                    ModifierHandler.setMaxHealth((EntityLivingBase)player, data.getMaxHealth(), 0);\n                    if (data.getHealth() > 0.0f) {\n                        player.func_70606_j(data.getHealth());\n                    }\n                }\n            }\n            player.field_71068_ca = this.experienceLevel;\n        }\n    });\n    return null;\n}\n```",
        impact: "client-boundary.\n\n5 client-sendable packets in this mod, graded 5 low. Every one is listed above with its\nhandler and channel.",
        disclosure: [
          { date: "2026-08-15", event: "Reported privately to the mod maintainer and the RLCraft development team" },
          { date: "2026-08-15", event: "RLCraft development team acknowledged the report, confirmed credit, and committed to carrying the fixes in a new mixins mod (RLMixins2), starting with the grappling hook mod, with pull requests welcome" }
        ],
        patch: ""
      },

      {
        ref: "MC-001-45",
        severity: "low",
        redacted: false,
        mod: "iChunUtil",
        version: "7.2.2",
        cwe: "CWE-862 Missing Authorization",
        title: "PacketEntityLocation: Not actually live in this pack - the `iChun_WorldPortals` channel is only",
        packets: [
          { name: "PacketEntityLocation  [low]", does: "me.ichun.mods.ichunutil.common.module.worldportals.common.packet.PacketEntit  \u00b7  channel iChun_WorldPortals", couldDo: "Not actually live in this pack - the `iChun_WorldPortals` channel is only created if some mod calls the WorldPortals API, and no in-pack caller was found (reconcile \u00a73)." },
          { name: "PacketRequestBlockEntityData  [low]", does: "me.ichun.mods.ichunutil.common.packet.mod.PacketRequestBlockEntityData.execu  \u00b7  channel ichunutil", couldDo: "Read-only info request." },
          { name: "PacketPatronInfo  [low]", does: "PacketPatronInfo.execute  \u00b7  channel ichunutil", couldDo: "Adds/removes a `PatronInfo` (playerId / patronRewardType / showPatronReward) to the server's patron list and broadcasts `PacketPatrons` to all players." },
          { name: "PacketPatrons  [low]", does: "PacketPatrons  \u00b7  channel ichunutil", couldDo: "NOT client-sendable." },
        ],
        rootCause: "Handler:\n`me.ichun.mods.ichunutil.common.module.worldportals.common.packet.PacketEntityLocation.execute`\n(PacketEntityLocation.java:118-134)\n\n```\npublic void execute(Side side, EntityPlayer player) {\n    Entity ent = player.getEntityWorld().getEntityByID(this.id);\n    if (!(ent == null || player.getEntityWorld().isRemote && player == ent)) {\n        ent.setPositionAndRotation(this.x, this.y, this.z, this.yaw, this.pitch);\n        ent.motionX = this.mX;\n        ent.motionY = this.mY;\n        ent.motionZ = this.mZ;\n        // ... re-broadcast to players within 256 blocks ...\n    }\n}\n```",
        impact: "Not actually live in this pack - the `iChun_WorldPortals` channel is only created if some\nmod calls the WorldPortals API, and no in-pack caller was found (reconcile \u00a73). If it were\nlive, it would look up any entity by ID and call `setPositionAndRotation(x,y,z,yaw,pitch)` +\nset velocity - arbitrary teleport/velocity of ANY entity by ID, no\npermission/distance/ownership check. Latent primitive.\n\n4 client-sendable packets in this mod, graded 4 low. Every one is listed above with its\nhandler and channel.",
        disclosure: [
          { date: "2026-08-15", event: "Reported privately to the mod maintainer and the RLCraft development team" },
          { date: "2026-08-15", event: "RLCraft development team acknowledged the report, confirmed credit, and committed to carrying the fixes in a new mixins mod (RLMixins2), starting with the grappling hook mod, with pull requests welcome" }
        ],
        patch: "N/A (latent). If the channel were initialized, it should gate on op permission and validate\nthe entity is owned/within range."
      },

      {
        ref: "MC-001-46",
        severity: "low",
        redacted: false,
        mod: "EnhancedVisuals",
        version: "1.4.4",
        cwe: "CWE-862 Missing Authorization",
        title: "DamagePacket: `executeServer` is a no-op, so a client-sent DamagePacket has no server",
        packets: [
          { name: "DamagePacket  [low]", does: "team.creative.enhancedvisuals.common.packet.DamagePacket.executeClient  \u00b7  channel creativemd", couldDo: "Client-bound visual packet." },
          { name: "ExplosionPacket  [low]", does: "team.creative.enhancedvisuals.common.packet.ExplosionPacket.executeClient  \u00b7  channel creativemd", couldDo: "Client-bound visual packet." },
          { name: "PotionPacket  [low]", does: "team.creative.enhancedvisuals.common.packet.PotionPacket.executeClient  \u00b7  channel creativemd", couldDo: "Client-bound visual packet." },
        ],
        rootCause: "Handler: `team.creative.enhancedvisuals.common.packet.DamagePacket.executeClient`\n(DamagePacket.java:85-89); `executeServer` is empty (line 91-92)\n\n```\npublic void executeClient(EntityPlayer player) {\n    if (VisualHandlers.DAMAGE.isEnabled(player)) {\n        VisualHandlers.DAMAGE.playerDamaged(player, this);\n    }\n}\n\npublic void executeServer(EntityPlayer player) {\n}\n```",
        impact: "Client-bound visual packet. `executeServer` is a no-op, so a client-sent DamagePacket has no\nserver effect. `executeClient` only triggers a local screen-shake/damage visual if the\nhandler is enabled. Weapon: none - server ignores it.\n\n3 client-sendable packets in this mod, graded 3 low. Every one is listed above with its\nhandler and channel.",
        disclosure: [
          { date: "2026-08-15", event: "Reported privately to the mod maintainer and the RLCraft development team" },
          { date: "2026-08-15", event: "RLCraft development team acknowledged the report, confirmed credit, and committed to carrying the fixes in a new mixins mod (RLMixins2), starting with the grappling hook mod, with pull requests welcome" }
        ],
        patch: "None - server handler is empty."
      },

      {
        ref: "MC-001-47",
        severity: "low",
        redacted: false,
        mod: "Inspirations",
        version: "0.2.9",
        cwe: "CWE-862 Missing Authorization",
        title: "InventorySlotSyncPacket: `Side.CLIENT` (`registerPacketClient`, `InspirationsNetwork.java:43`) - NOT",
        packets: [
          { name: "InventorySlotSyncPacket  [low]", does: "InventorySlotSyncPacket.handleClientSafe  \u00b7  channel inspirations", couldDo: "`Side.CLIENT` (`registerPacketClient`, `InspirationsNetwork.java:43`) - NOT client-sendable." },
          { name: "MilkablePacket  [low]", does: "MilkablePacket.handleClientSafe  \u00b7  channel inspirations", couldDo: "`Side.CLIENT` - NOT client-sendable." },
          { name: "RenderBlockUpdatePacket  [low]", does: "RenderBlockUpdatePacket.handleClientSafe  \u00b7  channel inspirations", couldDo: "`Side.CLIENT` - NOT client-sendable." },
        ],
        rootCause: "Handler: `InventorySlotSyncPacket.handleClientSafe` -\n`common/network/InventorySlotSyncPacket.java:44-52`\n\n```\npublic void handleClientSafe(NetHandlerPlayClient netHandler) {\n    TileEntity tileEntity = Minecraft.func_71410_x().field_71439_g.func_130014_f_().func_175625_s(this.pos);\n    if (tileEntity == null || !(tileEntity instanceof TileInventory)) return;\n    TileInventory tile = (TileInventory)tileEntity;\n    tile.func_70299_a(this.slot, this.itemStack);\n    Minecraft.func_71410_x().field_71438_f.func_184376_a(null, this.pos, null, null, 0);\n}\n```",
        impact: "`Side.CLIENT` (`registerPacketClient`, `InspirationsNetwork.java:43`) - NOT client-sendable.\nSets an inventory slot on a `TileInventory` and re-renders. Client-only.\n\n3 client-sendable packets in this mod, graded 3 low. Every one is listed above with its\nhandler and channel.",
        disclosure: [
          { date: "2026-08-15", event: "Reported privately to the mod maintainer and the RLCraft development team" },
          { date: "2026-08-15", event: "RLCraft development team acknowledged the report, confirmed credit, and committed to carrying the fixes in a new mixins mod (RLMixins2), starting with the grappling hook mod, with pull requests welcome" }
        ],
        patch: "n/a."
      },

      {
        ref: "MC-001-48",
        severity: "low",
        redacted: false,
        mod: "Standard Expansion",
        version: "3.4.173",
        cwe: "CWE-862 Missing Authorization",
        title: "task_checkbox: the server marks the task complete if it is a `TaskCheckbox`",
        packets: [
          { name: "task_checkbox  [low]", does: "NetTaskCheckbox.onServer  \u00b7  channel BQ_STANDARD", couldDo: "Client sends `questID`/`taskID`;" },
          { name: "task_interact  [low]", does: "NetTaskInteract.onServer  \u00b7  channel BQ_STANDARD", couldDo: "Client sends `isMainHand`/`isHit`;" },
          { name: "choice_reward  [low]", does: "NetRewardChoice.onServer  \u00b7  channel BQ_STANDARD", couldDo: "A client picks a `selection` index for a `RewardChoice` reward;" },
        ],
        rootCause: "Handler: `NetTaskCheckbox.onServer` - `network/handlers/NetTaskCheckbox.java:61-79`\n\n```\nprivate static void onServer(Tuple<NBTTagCompound, EntityPlayerMP> message) {\n    int tId;\n    NBTTagCompound data = (NBTTagCompound)message.func_76341_a();\n    EntityPlayerMP sender = (EntityPlayerMP)message.func_76340_b();\n    int qId = !data.func_150297_b(\"questID\", 99) ? -1 : data.func_74762_e(\"questID\");\n    int n = tId = !data.func_150297_b(\"taskID\", 99) ? -1 : data.func_74762_e(\"taskID\");\n    if (qId >= 0 && tId >= 0) {\n        ITask task;\n        QuestCache qc = (QuestCache)sender.getCapability(CapabilityProviderQuestCache.CAP_QUEST_CACHE, null);\n        IQuest quest = (IQuest)((IQuestDatabase)QuestingAPI.getAPI((ApiKey)ApiReference.QUEST_DB)).getValue(qId);\n        ITask iTask = task = quest == null ? null : (ITask)quest.getTasks().getValue(tId);\n        if (task instanceof TaskCheckbox) {\n            task.setComplete(QuestingAPI.getQuestingUUID((EntityPlayer)sender));\n            if (qc != null) qc.markQuestDirty(qId);\n        }\n    }\n}\n```",
        impact: "Client sends `questID`/`taskID`; the server marks the task complete if it is a\n`TaskCheckbox`. Gated by `task instanceof TaskCheckbox` (type check only) - a client can\ncomplete any checkbox task it can name. Self-progress only, low.\n\n3 client-sendable packets in this mod, graded 3 low. Every one is listed above with its\nhandler and channel.",
        disclosure: [
          { date: "2026-08-14", event: "Reported privately to the mod maintainer and the RLCraft development team" },
          { date: "2026-08-14", event: "RLCraft development team acknowledged the report, confirmed credit, and committed to carrying the fixes in a new mixins mod (RLMixins2), starting with the grappling hook mod, with pull requests welcome" }
        ],
        patch: "No participant/eligibility check before `task.setComplete`."
      },

      {
        ref: "MC-001-49",
        severity: "low",
        redacted: false,
        mod: "Baubles",
        version: "1.5.2",
        cwe: "CWE-862 Missing Authorization",
        title: "PacketOpenBaublesInventory: `Side.SERVER` (disc 0)",
        packets: [
          { name: "PacketOpenBaublesInventory  [low]", does: "PacketOpenBaublesInventory.onMessage  \u00b7  channel baubles", couldDo: "`Side.SERVER` (disc 0)." },
          { name: "PacketOpenNormalInventory  [low]", does: "PacketOpenNormalInventory.onMessage  \u00b7  channel baubles", couldDo: "`Side.SERVER` (disc 1)." },
        ],
        rootCause: "Handler: `PacketOpenBaublesInventory.onMessage` - `PacketOpenBaublesInventory.java:31-42`\n\n```\npublic IMessage onMessage(PacketOpenBaublesInventory message, final MessageContext ctx) {\n    WorldServer mainThread = (WorldServer)ctx.getServerHandler().field_147369_b.field_70170_p;\n    mainThread.func_152344_a(new Runnable(){\n        @Override\n        public void run() {\n            ctx.getServerHandler().field_147369_b.field_71070_bA.func_75134_a((EntityPlayer)ctx.getServerHandler().field_147369_b);\n            ctx.getServerHandler().field_147369_b.openGui((Object)Baubles.instance, 0, ctx.getServerHandler().field_147369_b.field_70170_p, 0, 0, 0);\n        }\n    });\n    return null;\n}\n```",
        impact: "`Side.SERVER` (disc 0). Opens the Baubles GUI for the sender. Ungated but strictly self-only\n(opens the sender's own inventory GUI). No server state is mutated beyond opening a GUI.\n\n2 client-sendable packets in this mod, graded 2 low. Every one is listed above with its\nhandler and channel.",
        disclosure: [
          { date: "2026-08-15", event: "Reported privately to the mod maintainer and the RLCraft development team" },
          { date: "2026-08-15", event: "RLCraft development team acknowledged the report, confirmed credit, and committed to carrying the fixes in a new mixins mod (RLMixins2), starting with the grappling hook mod, with pull requests welcome" }
        ],
        patch: "None material - self-only. (No permission check, but there is nothing to protect.)"
      },

      {
        ref: "MC-001-50",
        severity: "low",
        redacted: false,
        mod: "Classy Hats",
        version: "1.6.0",
        cwe: "CWE-862 Missing Authorization",
        title: "PacketHatGuiOpen: Opens the hat GUI for the sender with a client-supplied `target` int",
        packets: [
          { name: "PacketHatGuiOpen  [low]", does: "PacketHatGuiOpen.handle  \u00b7  channel classyhats", couldDo: "Opens the hat GUI for the sender with a client-supplied `target` int." },
          { name: "PacketSyncLastSelectedSection  [low]", does: "PacketSyncLastSelectedSection.handle  \u00b7  channel classyhats", couldDo: "Sets the sender's `CapabilityHatContainer` current-hat-section to a client int." },
        ],
        rootCause: "Handler: `PacketHatGuiOpen.handle` - `network/PacketHatGuiOpen.java:36-40`\n\n```\npublic void handle(@NotNull MessageContext ctx) {\n    Intrinsics.checkParameterIsNotNull((Object)ctx, (String)\"ctx\");\n    EntityPlayerMP player = ctx.getServerHandler().field_147369_b;\n    player.openGui((Object)ClassyHats.Companion.getINSTANCE(), this.target, ctx.getServerHandler().field_147369_b.field_70170_p, 0, 0, 0);\n}\n```",
        impact: "Opens the hat GUI for the sender with a client-supplied `target` int. Self-only GUI open.\nUngated.\n\n2 client-sendable packets in this mod, graded 2 low. Every one is listed above with its\nhandler and channel.",
        disclosure: [
          { date: "2026-08-15", event: "Reported privately to the mod maintainer and the RLCraft development team" },
          { date: "2026-08-15", event: "RLCraft development team acknowledged the report, confirmed credit, and committed to carrying the fixes in a new mixins mod (RLMixins2), starting with the grappling hook mod, with pull requests welcome" }
        ],
        patch: "none significant."
      },

      {
        ref: "MC-001-51",
        severity: "low",
        redacted: false,
        mod: "IvToolkit",
        version: "1.3.3",
        cwe: "CWE-862 Missing Authorization",
        title: "PacketGuiAction: Not actually client-sendable in this pack - IvToolkit itself registers NO",
        packets: [
          { name: "PacketGuiAction  [low]", does: "ivorius.ivtoolkit.network.PacketGuiAction  \u00b7  channel none, IvToolkit registers none", couldDo: "Not actually client-sendable in this pack - IvToolkit itself registers NO network channel, and no mod in the pack registers `PacketGuiAction` on its own wrapper." },
          { name: "PacketTileEntityClientEvent  [low]", does: "ivorius.ivtoolkit.network.PacketTileEntityClientEvent  \u00b7  channel none, IvToolkit registers none", couldDo: "Not client-sendable in this pack - same as PacketGuiAction, library-only with no in-pack registration." },
        ],
        rootCause: "Handler: `ivorius.ivtoolkit.network.PacketGuiAction` - data carrier only; handler\n`PacketGuiActionHandler` dispatches to the sender's open Container\n\n```\n// NOTE: library-only. IvToolkit registers no channel; no in-pack mod registers\n// PacketGuiAction. Not client-sendable in this pack.\n```",
        impact: "Not actually client-sendable in this pack - IvToolkit itself registers NO network channel,\nand no mod in the pack registers `PacketGuiAction` on its own wrapper. If a using mod did\nregister it, the handler would dispatch to the sender's open container if it implements\n`ActionHandler` (self-container only).\n\n2 client-sendable packets in this mod, graded 2 low. Every one is listed above with its\nhandler and channel.",
        disclosure: [
          { date: "2026-08-15", event: "Reported privately to the mod maintainer and the RLCraft development team" },
          { date: "2026-08-15", event: "RLCraft development team acknowledged the report, confirmed credit, and committed to carrying the fixes in a new mixins mod (RLMixins2), starting with the grappling hook mod, with pull requests welcome" }
        ],
        patch: "N/A (not registered in-pack). Documented per reconcile \u00a72."
      },

      {
        ref: "MC-001-52",
        severity: "low",
        redacted: false,
        mod: "MmmMmmMmmMmm",
        version: "1.14",
        cwe: "CWE-862 Missing Authorization",
        title: "DamageMessage: client-boundary",
        packets: [
          { name: "DamageMessage  [low]", does: "DamageMessage.MessageHandlerClient.onMessage  \u00b7  channel TestDummy", couldDo: "client-boundary." },
          { name: "SyncEquipmentMessage  [low]", does: "SyncEquipmentMessage.MessageHandlerClient.onMessage  \u00b7  channel TestDummy", couldDo: "client-boundary." },
        ],
        rootCause: "Handler: `DamageMessage.MessageHandlerClient.onMessage` / `DamageMessage.java:56-76`\n\n```\npublic static class MessageHandlerClient\nimplements IMessageHandler<DamageMessage, IMessage> {\n    public DamageMessage onMessage(final DamageMessage message, MessageContext ctx) {\n        FMLCommonHandler.instance().getWorldThread(ctx.netHandler).func_152344_a(new Runnable(){\n            public void run() {\n                Entity entity = Minecraft.func_71410_x().field_71441_e.func_73045_a(message.entityID);\n                if (entity != null && entity instanceof EntityDummy) {\n                    EntityDummy dummy = (EntityDummy)entity;\n                    dummy.shake = message.shakeAmount;\n                    dummy.func_96094_a(String.valueOf(message.damage / 2.0f));\n                }\n                if (message.nrID > 0 && (entity = Minecraft.func_71410_x().field_71441_e.func_73045_a(message.nrID)) != null && entity instanceof EntityFloatingNumber) {\n                    ((EntityFloatingNumber)entity).reSet(message.damage);\n                }\n            }\n        });\n        return null;\n    }\n}\n```",
        impact: "client-boundary.\n\n2 client-sendable packets in this mod, graded 2 low. Every one is listed above with its\nhandler and channel.",
        disclosure: [
          { date: "2026-08-15", event: "Reported privately to the mod maintainer and the RLCraft development team" },
          { date: "2026-08-15", event: "RLCraft development team acknowledged the report, confirmed credit, and committed to carrying the fixes in a new mixins mod (RLMixins2), starting with the grappling hook mod, with pull requests welcome" }
        ],
        patch: ""
      },

      {
        ref: "MC-001-53",
        severity: "low",
        redacted: false,
        mod: "MoBends",
        version: "1.2.1",
        cwe: "CWE-862 Missing Authorization",
        title: "MessageViewRequest: Per reconcile.md \u00a710, `Core.java:42-43` registers exactly two messages:",
        packets: [
          { name: "MessageViewRequest  [low]", does: "- does NOT exist  \u00b7  channel mobends", couldDo: "This packet does not exist." },
          { name: "MessageConfigResponse  [low]", does: "MessageConfigResponse.Handler.onMessage  \u00b7  channel mobends", couldDo: "`Side.CLIENT` (server\u2192client only) - not client-sendable." },
        ],
        rootCause: "Handler: - does NOT exist\n\n```\n// No such class exists. MoBends registers only:\n//   registerMessage(MessageConfigRequest.Handler.class, MessageConfigRequest.class, 0, Side.SERVER);\n//   registerMessage(MessageConfigResponse.Handler.class, MessageConfigResponse.class, 1, Side.CLIENT);\n```",
        impact: "This packet does not exist. Per reconcile.md \u00a710, `Core.java:42-43` registers exactly two\nmessages: `MessageConfigRequest` (Side.SERVER) and `MessageConfigResponse` (Side.CLIENT).\nThere is no `MessageViewRequest` in the mod (grep returns nothing). Documented here only to\nrecord the reconcile correction.\n\n2 client-sendable packets in this mod, graded 2 low. Every one is listed above with its\nhandler and channel.",
        disclosure: [
          { date: "2026-08-15", event: "Reported privately to the mod maintainer and the RLCraft development team" },
          { date: "2026-08-15", event: "RLCraft development team acknowledged the report, confirmed credit, and committed to carrying the fixes in a new mixins mod (RLMixins2), starting with the grappling hook mod, with pull requests welcome" }
        ],
        patch: "N/A - not a real packet."
      },

      {
        ref: "MC-001-54",
        severity: "low",
        redacted: false,
        mod: "Rustic",
        version: "1.1.7",
        cwe: "CWE-862 Missing Authorization",
        title: "MessageDismountChair: `Side.SERVER` (disc 2)",
        packets: [
          { name: "MessageDismountChair  [low]", does: "MessageDismountChair.MessageHolder.onMessage  \u00b7  channel rustic", couldDo: "`Side.SERVER` (disc 2)." },
          { name: "MessageVaseMeta  [low]", does: "MessageVaseMeta.MessageHolder.onMessage  \u00b7  channel rustic", couldDo: "`Side.SERVER` (disc 1)." },
        ],
        rootCause: "Handler: `MessageDismountChair.MessageHolder.onMessage` -\n`common/network/MessageDismountChair.java:27-33`\n\n```\npublic IMessage onMessage(MessageDismountChair message, MessageContext ctx) {\n    EntityPlayerMP player = ctx.getServerHandler().field_147369_b;\n    player.func_71121_q().func_152344_a(() -> player.func_184210_p());\n    return null;\n}\n```",
        impact: "`Side.SERVER` (disc 2). Dismounts the sender from a chair. Self-only, ungated.\n\n2 client-sendable packets in this mod, graded 2 low. Every one is listed above with its\nhandler and channel.",
        disclosure: [
          { date: "2026-08-15", event: "Reported privately to the mod maintainer and the RLCraft development team" },
          { date: "2026-08-15", event: "RLCraft development team acknowledged the report, confirmed credit, and committed to carrying the fixes in a new mixins mod (RLMixins2), starting with the grappling hook mod, with pull requests welcome" }
        ],
        patch: "none significant."
      },

      {
        ref: "MC-001-55",
        severity: "low",
        redacted: false,
        mod: "Serene Seasons",
        version: "1.2.18",
        cwe: "CWE-862 Missing Authorization",
        title: "MessageSyncConfigs: `Side.CLIENT` (disc 4) - NOT client-sendable",
        packets: [
          { name: "MessageSyncConfigs  [low]", does: "MessageSyncConfigs.onMessage  \u00b7  channel sereneseasons", couldDo: "`Side.CLIENT` (disc 4) - NOT client-sendable." },
          { name: "MessageSyncSeasonCycle  [low]", does: "MessageSyncSeasonCycle.onMessage  \u00b7  channel sereneseasons", couldDo: "" },
        ],
        rootCause: "Handler: `MessageSyncConfigs.onMessage` - `network/message/MessageSyncConfigs.java:45-57`\n\n```\npublic IMessage onMessage(MessageSyncConfigs message, MessageContext ctx) {\n    if (ctx.side == Side.CLIENT) {\n        for (String key : message.nbtOptions.func_150296_c()) {\n            SyncedConfig.SyncedConfigEntry entry = SyncedConfig.optionsToSync.get(key);\n            if (entry == null) { SereneSeasons.logger.error(\"Option \" + key + \" does not exist locally!\"); }\n            entry.value = message.nbtOptions.func_74779_i(key);\n            SereneSeasons.logger.info(\"SS configuration synchronized with the server\");\n        }\n    }\n    return null;\n}\n```",
        impact: "`Side.CLIENT` (disc 4) - NOT client-sendable. Applies synced season config values on the\nclient. Client-only.\n\n2 client-sendable packets in this mod, graded 2 low. Every one is listed above with its\nhandler and channel.",
        disclosure: [
          { date: "2026-08-15", event: "Reported privately to the mod maintainer and the RLCraft development team" },
          { date: "2026-08-15", event: "RLCraft development team acknowledged the report, confirmed credit, and committed to carrying the fixes in a new mixins mod (RLMixins2), starting with the grappling hook mod, with pull requests welcome" }
        ],
        patch: "n/a."
      },

      {
        ref: "MC-001-56",
        severity: "low",
        redacted: false,
        mod: "Callable Horses",
        version: "1.1.1",
        cwe: "CWE-862 Missing Authorization",
        title: "PressKeyPacket: `Side.SERVER` (disc 0)",
        packets: [
          { name: "PressKeyPacket  [low]", does: "PressKeyPacket.onMessage  \u00b7  channel CallableHorses", couldDo: "`Side.SERVER` (disc 0)." },
        ],
        rootCause: "Handler: `PressKeyPacket.onMessage` - `network/PressKeyPacket.java:44-70`\n\n```\npublic IMessage onMessage(final PressKeyPacket message, final MessageContext ctx) {\n    WorldServer mainThread = (WorldServer)ctx.getServerHandler().field_147369_b.field_70170_p;\n    mainThread.func_152344_a(new Runnable(){\n        EntityPlayerMP player;\n        { this.player = ctx.getServerHandler().field_147369_b; }\n        @Override\n        public void run() {\n            switch (message.key) {\n                case 0: { HorseManager.callHorse((EntityPlayer)this.player); break; }\n                case 1: { HorseManager.setHorse((EntityPlayer)this.player); break; }\n                case 2: { HorseManager.showHorseStats(this.player); }\n            }\n        }\n    });\n    return null;\n}\n```",
        impact: "`Side.SERVER` (disc 0). Client sends an int `key`; the server calls `HorseManager.callHorse`\n(0), `setHorse` (1), or `showHorseStats` (2) on the sender. Self-only horse management.\nUngated but self-scoped.",
        disclosure: [
          { date: "2026-08-15", event: "Reported privately to the mod maintainer and the RLCraft development team" },
          { date: "2026-08-15", event: "RLCraft development team acknowledged the report, confirmed credit, and committed to carrying the fixes in a new mixins mod (RLMixins2), starting with the grappling hook mod, with pull requests welcome" }
        ],
        patch: "none significant (self-only)."
      },

      {
        ref: "MC-001-57",
        severity: "low",
        redacted: false,
        mod: "Carry On",
        version: "1.12.7.23",
        cwe: "CWE-862 Missing Authorization",
        title: "SyncKeybindPacket: `Side.SERVER` (disc 0)",
        packets: [
          { name: "SyncKeybindPacket  [low]", does: "SyncKeybindPacketHandler.onMessage  \u00b7  channel CarryOn", couldDo: "`Side.SERVER` (disc 0)." },
        ],
        rootCause: "Handler: `SyncKeybindPacketHandler.onMessage` -\n`network/server/SyncKeybindPacketHandler.java:24-39`\n\n```\npublic IMessage onMessage(final SyncKeybindPacket message, final MessageContext ctx) {\n    WorldServer mainThread = (WorldServer)ctx.getServerHandler().field_147369_b.field_70170_p;\n    mainThread.func_152344_a(new Runnable(){\n        EntityPlayerMP player;\n        { this.player = ctx.getServerHandler().field_147369_b; }\n        @Override\n        public void run() {\n            CarryOnKeybinds.setKeyPressed((EntityPlayer)this.player, message.pressed);\n        }\n    });\n    return null;\n}\n```",
        impact: "`Side.SERVER` (disc 0). Client sends a boolean `pressed`; the server calls\n`CarryOnKeybinds.setKeyPressed(player, pressed)` on the sender. Self-only keybind state.\nUngated.",
        disclosure: [
          { date: "2026-08-15", event: "Reported privately to the mod maintainer and the RLCraft development team" },
          { date: "2026-08-15", event: "RLCraft development team acknowledged the report, confirmed credit, and committed to carrying the fixes in a new mixins mod (RLMixins2), starting with the grappling hook mod, with pull requests welcome" }
        ],
        patch: "none significant."
      },

      {
        ref: "MC-001-58",
        severity: "low",
        redacted: false,
        mod: "CD4017BE lib",
        version: "6.5.1",
        cwe: "CWE-862 Missing Authorization",
        title: "SyncNetworkHandler.handlePlayerPacket: Deprecated generic dispatch",
        packets: [
          { name: "SyncNetworkHandler.handlePlayerPacket  [low]", does: "cd4017be.lib.BlockGuiHandler.onPlayerPacketReceived  \u00b7  channel 4017", couldDo: "Deprecated generic dispatch." },
        ],
        rootCause: "Handler: `cd4017be.lib.BlockGuiHandler.onPlayerPacketReceived` /\n`scratch/packetaudit/decomp/cd4017belib/cd4017be/lib/BlockGuiHandler.java:170-196`\n\n```\npublic void handlePlayerPacket(PacketBuffer pkt, EntityPlayerMP sender) throws Exception {\n    World world = sender.field_70170_p;\n    for (PacketBuffer buf : new PacketSplitter(pkt)) {\n        ItemStack stack;\n        Item item;\n        int slot;\n        BlockPos target = buf.func_179259_c();\n        int y = target.func_177956_o();\n        if (y >= 0) {\n            TileEntity te = Utils.getTileAt(world, target);\n            if (!(te instanceof IPlayerPacketReceiver)) continue;\n            ((IPlayerPacketReceiver)te).handlePlayerPacket(buf, sender);\n            continue;\n        }\n        if (y == -1) {\n            Entity entity = world.func_73045_a(target.func_177958_n() & 0xFFFF | target.func_177952_p() << 16);\n            if (!(entity instanceof IPlayerPacketReceiver)) continue;\n            ((IPlayerPacketReceiver)entity).handlePlayerPacket(buf, sender);\n            continue;\n        }\n        if (y != -2 || (slot = target.func_177958_n()) < 0 || slot >= sender.field_71071_by.func_70302_i_() || !((item = (stack = sender.field_71071_by.func_70301_a(slot)).func_77973_b()) instanceof IPlayerPacketReceiver.ItemPPR)) continue;\n        ((IPlayerPacketReceiver.ItemPPR)item).handlePlayerPacket(stack, slot, buf, sender);\n    }\n}\n```",
        impact: "Deprecated generic dispatch. Reads a client-chosen `BlockPos`; if `y<0` it dispatches to an\nitem in the sender's inventory slot implementing `ClientItemPacketReceiver`, else to a\n`TileEntity` at that pos implementing `ClientPacketReceiver`. No permission check, no\ndistance check, but no implementors exist inside this jar (and the class is `@Deprecated`),\nso no reachable handler in this pack.",
        disclosure: [
          { date: "2026-08-15", event: "Reported privately to the mod maintainer and the RLCraft development team" },
          { date: "2026-08-15", event: "RLCraft development team acknowledged the report, confirmed credit, and committed to carrying the fixes in a new mixins mod (RLMixins2), starting with the grappling hook mod, with pull requests welcome" }
        ],
        patch: "No permission/distance check on the client-chosen target; deprecated and unused."
      },

      {
        ref: "MC-001-59",
        severity: "low",
        redacted: false,
        mod: "llibrary",
        version: "1.7.20",
        cwe: "CWE-862 Missing Authorization",
        title: "SurvivalTabMessage: Server handler posts a `SurvivalTabClickEvent(message.label, player)`",
        packets: [
          { name: "SurvivalTabMessage  [low]", does: "SurvivalTabMessage.onServerReceived  \u00b7  channel llibrary", couldDo: "Client-sendable (registered on both sides)." },
        ],
        rootCause: "Handler: `SurvivalTabMessage.onServerReceived` (SurvivalTabMessage.java:43-45)\n\n```\n@Override\npublic void onServerReceived(MinecraftServer server, SurvivalTabMessage message, EntityPlayer player, MessageContext messageContext) {\n    MinecraftForge.EVENT_BUS.post(new SurvivalTabClickEvent(message.label, player));\n}\n```",
        impact: "Client-sendable (registered on both sides). Server handler posts a\n`SurvivalTabClickEvent(message.label, player)` on the Forge event bus. The only listener is\nclient-side (opens the inventory GUI when label == \"container.inventory\"), so the\nserver-side effect is posting an event with no server-side listener - effectively no server\nimpact. Negligible.",
        disclosure: [
          { date: "2026-08-15", event: "Reported privately to the mod maintainer and the RLCraft development team" },
          { date: "2026-08-15", event: "RLCraft development team acknowledged the report, confirmed credit, and committed to carrying the fixes in a new mixins mod (RLMixins2), starting with the grappling hook mod, with pull requests welcome" }
        ],
        patch: "None - no server-side listener consumes the event."
      },

      {
        ref: "MC-001-60",
        severity: "low",
        redacted: false,
        mod: "Locks",
        version: "3.0.0",
        cwe: "CWE-862 Missing Authorization",
        title: "CheckPinPacket: `Side.SERVER` (disc 3)",
        packets: [
          { name: "CheckPinPacket  [low]", does: "CheckPinPacket.Handler.onMessage  \u00b7  channel locks", couldDo: "`Side.SERVER` (disc 3)." },
        ],
        rootCause: "Handler: `CheckPinPacket.Handler.onMessage` -\n`common/network/toserver/CheckPinPacket.java:41-53`\n\n```\npublic IMessage onMessage(CheckPinPacket pkt, MessageContext ctx) {\n    EntityPlayerMP player = ctx.getServerHandler().field_147369_b;\n    player.func_184102_h().func_152344_a(() -> {\n        Container container = player.field_71070_bA;\n        if (container instanceof LockPickingContainer) {\n            ((LockPickingContainer)container).checkPin(pkt.pin);\n        }\n    });\n    return null;\n}\n```",
        impact: "`Side.SERVER` (disc 3). Client sends a byte `pin`; the server calls `checkPin(pin)` on the\nsender's open `LockPickingContainer`. Self-container only - the player must already have the\nlock-picking GUI open. Ungated but self-scoped.",
        disclosure: [
          { date: "2026-08-15", event: "Reported privately to the mod maintainer and the RLCraft development team" },
          { date: "2026-08-15", event: "RLCraft development team acknowledged the report, confirmed credit, and committed to carrying the fixes in a new mixins mod (RLMixins2), starting with the grappling hook mod, with pull requests welcome" }
        ],
        patch: "none significant (container is the sender's own open one)."
      },

      {
        ref: "MC-001-61",
        severity: "low",
        redacted: false,
        mod: "Lost Cities",
        version: "2.0.22",
        cwe: "CWE-862 Missing Authorization",
        title: "PacketRequestProfile: `Side.SERVER`",
        packets: [
          { name: "PacketRequestProfile  [low]", does: "PacketRequestProfile.Handler.onMessage  \u00b7  channel lostcities", couldDo: "`Side.SERVER`." },
        ],
        rootCause: "Handler: `PacketRequestProfile.Handler.onMessage` -\n`network/PacketRequestProfile.java:48-60`\n\n```\npublic IMessage onMessage(PacketRequestProfile message, MessageContext ctx) {\n    FMLCommonHandler.instance().getWorldThread(ctx.netHandler).func_152344_a(() -> this.handle(message, ctx));\n    return null;\n}\nprivate void handle(PacketRequestProfile message, MessageContext ctx) {\n    EntityPlayerMP player = ctx.getServerHandler().field_147369_b;\n    LostCityProfile profile = WorldTypeTools.getProfile((World)DimensionManager.getWorld((int)message.dimension));\n    PacketHandler.INSTANCE.sendTo((IMessage)new PacketReturnProfileToClient(message.dimension, profile.getName()), player);\n}\n```",
        impact: "`Side.SERVER`. Client sends a dimension int; the server looks up the Lost Cities profile for\nthat dimension and returns `PacketReturnProfileToClient` (profile name). Read-only info\nrequest. Low risk.",
        disclosure: [
          { date: "2026-08-15", event: "Reported privately to the mod maintainer and the RLCraft development team" },
          { date: "2026-08-15", event: "RLCraft development team acknowledged the report, confirmed credit, and committed to carrying the fixes in a new mixins mod (RLMixins2), starting with the grappling hook mod, with pull requests welcome" }
        ],
        patch: "none significant (read-only)."
      },

      {
        ref: "MC-001-62",
        severity: "low",
        redacted: false,
        mod: "Reach Fix",
        version: "1.0.8",
        cwe: "CWE-862 Missing Authorization",
        title: "CPacketHandlerSyncConfig: Reads the server's reach config and updates the client's reach modifier",
        packets: [
          { name: "CPacketHandlerSyncConfig  [low]", does: "CPacketHandlerSyncConfig.onMessage  \u00b7  channel reachfix", couldDo: "`Side.CLIENT` (registered `ReachFix.java:69`) - NOT client-sendable." },
        ],
        rootCause: "Handler: `CPacketHandlerSyncConfig.onMessage` -\n`network/CPacketHandlerSyncConfig.java:30-43`\n\n```\npublic IMessage onMessage(SPacketSyncConfig message, MessageContext ctx) {\n    FMLCommonHandler.instance().getWorldThread(ctx.netHandler).func_152344_a(() -> {\n        try {\n            ConfigUtil.readServerSettings(ReachFixConfig.SLAVE_CONFIG, message.getBuffer());\n        } catch (ReflectiveOperationException e) {\n            ReachFix.LOGGER.error(\"Failed to read server config\", (Throwable)e);\n        }\n        ReachFixUtil.updateBaseReachModifier(CPacketHandlerSyncConfig.getPlayer());\n    });\n    return null;\n}\n```",
        impact: "`Side.CLIENT` (registered `ReachFix.java:69`) - NOT client-sendable. Reads the server's\nreach config and updates the client's reach modifier. Client-only.",
        disclosure: [
          { date: "2026-08-15", event: "Reported privately to the mod maintainer and the RLCraft development team" },
          { date: "2026-08-15", event: "RLCraft development team acknowledged the report, confirmed credit, and committed to carrying the fixes in a new mixins mod (RLMixins2), starting with the grappling hook mod, with pull requests welcome" }
        ],
        patch: "n/a."
      },

      {
        ref: "MC-001-63",
        severity: "low",
        redacted: false,
        mod: "SilentLib",
        version: "3.0.14",
        cwe: "CWE-862 Missing Authorization",
        title: "MessageLeftClick: Client-sendable (`Side.SERVER`, registered in `SilentLib.preInit`)",
        packets: [
          { name: "MessageLeftClick  [low]", does: "net.silentchaos512.lib.network.internal.MessageLeftClick.handleMessage  \u00b7  channel silentlib", couldDo: "Client-sendable (`Side.SERVER`, registered in `SilentLib.preInit`)." },
        ],
        rootCause: "Handler: `net.silentchaos512.lib.network.internal.MessageLeftClick.handleMessage`\n(MessageLeftClick.java:41-57)\n\n```\n@Override\npublic IMessage handleMessage(MessageContext context) {\n    if (context.side != Side.SERVER) {\n        return null;\n    }\n    EntityPlayerMP player = context.getServerHandler().player;\n    EnumHand hand = this.mainHand ? EnumHand.MAIN_HAND : EnumHand.OFF_HAND;\n    ItemStack heldItem = player.getHeldItem(hand);\n    if (!heldItem.isEmpty() && heldItem.getItem() instanceof ILeftClickItem) {\n        ILeftClickItem item = (ILeftClickItem)heldItem.getItem();\n        if (this.type == Type.EMPTY.ordinal()) {\n            item.onItemLeftClickSL(player.world, player, hand);\n        } else {\n            item.onItemLeftClickBlockSL(player.world, player, hand);\n        }\n    }\n    return null;\n}\n```",
        impact: "Client-sendable (`Side.SERVER`, registered in `SilentLib.preInit`). On the server, it reads\nthe sender's held item; if the item implements `ILeftClickItem`, it calls\n`onItemLeftClickSL` / `onItemLeftClickBlockSL` on that item. Self-only - the effect is\nlimited to the sender's own held item. No permission check, but the item must be an\n`ILeftClickItem` and held by the sender. Weapon: a client can trigger its own held item's\nleft-click handler remotely (e.g. a tool's special action) - self-benefit only.",
        disclosure: [
          { date: "2026-08-15", event: "Reported privately to the mod maintainer and the RLCraft development team" },
          { date: "2026-08-15", event: "RLCraft development team acknowledged the report, confirmed credit, and committed to carrying the fixes in a new mixins mod (RLMixins2), starting with the grappling hook mod, with pull requests welcome" }
        ],
        patch: "None - self-only; the item must be the sender's held `ILeftClickItem`."
      },

      {
        ref: "MC-001-64",
        severity: "low",
        redacted: false,
        mod: "Wearable Backpacks",
        version: "3.2.6",
        cwe: "CWE-862 Missing Authorization",
        title: "MessageOpenBackpack: `Side.SERVER` (disc 3)",
        packets: [
          { name: "MessageOpenBackpack  [low]", does: "MessageOpenBackpack.Handler.handle  \u00b7  channel wearablebackpacks", couldDo: "`Side.SERVER` (disc 3)." },
        ],
        rootCause: "Handler: `MessageOpenBackpack.Handler.handle` - `network/MessageOpenBackpack.java:37-46`\n\n```\npublic void handle(MessageOpenBackpack message, MessageContext ctx) {\n    EntityPlayer player = Handler.getPlayer(ctx);\n    IBackpack backpack = BackpackHelper.getBackpack((Entity)player);\n    if (backpack != null && player.func_70089_S() && ModConfig.server.enableSelfInteraction) {\n        backpack.getType().onEquippedInteract(player, (EntityLivingBase)player, backpack);\n    }\n}\n```",
        impact: "`Side.SERVER` (disc 3). Opens the sender's own equipped backpack. Gated by\n`ModConfig.server.enableSelfInteraction` and the player having a backpack. Self-only, low.",
        disclosure: [
          { date: "2026-08-15", event: "Reported privately to the mod maintainer and the RLCraft development team" },
          { date: "2026-08-15", event: "RLCraft development team acknowledged the report, confirmed credit, and committed to carrying the fixes in a new mixins mod (RLMixins2), starting with the grappling hook mod, with pull requests welcome" }
        ],
        patch: "none significant."
      },

    ],
    repo: ""
  },

  {
    id: "CS-002",
    tags: [
      { name: "Anti-Cheat",       tone: "critical" },
      { name: "Anti-VPN",         tone: "high" },
      { name: "Custom Gamemodes", tone: "medium" },
      { name: "Quality of Life",  tone: "low" },
      { name: "API",              tone: "info" },
      { name: "SQL",              tone: "info" }
    ],
    caseNo: "{TODAY}-002",
    title: "CS:GO Server Plugins - Anti-Cheat, Anti-VPN, Gamemodes",
    kind: "Defensive Tooling",
    blurb: "Fourteen SourcePawn plugins and one C++ Metamod extension for the CS:GO servers I run. A server-sided anticheat with about 45 detectors, a VPN blocker that merges local CIDR ranges with reputation APIs, two gamemodes of my own, and a stack of community plugins I forked and fixed. Roughly 30,000 lines of SourcePawn plus 800 of C++.",
    status: { shipped: true },
    period: "Sep 2024 to present",
    scope: "Written for and deployed on servers I operate.",
    stack: ["SourcePawn", "SourceMod", "C++", "Metamod:Source", "SQLite", "MySQL", "REST APIs", "Discord webhooks", "CIDR", "AMBuild"],
    // the severity buckets are reused as categories here, so the filter reads as
    // "Anti-cheat / Network / Gamemodes / ..." instead of "critical / high / medium"
    filterLabel: "Area",
    tones: {
      critical: "Anti-Cheat",
      high:     "Network Defense",
      medium:   "Gamemodes",
      low:      "Movement",
      info:     "Quality of Life"
    },
    findings: [

      {
        ref: "CS-002-A",
        severity: "critical",
        title: "KevAC - server-sided anticheat, about 45 detectors",
        sub: "SourcePawn · 7,400 lines · my own work",
        meta: [["Language", "SourcePawn"], ["Size", "~7,400 lines"], ["Origin", "Mine"], repoRow("CSGO-KevAC")],
        beats: [
          { head: "Why server-side", body: `Client-side anticheat trusts the machine you are trying to catch. Server-side
only trusts what the server can observe, so you end up writing behavioral
detections against a noisy signal and tuning out false positives. That is the
same job as writing rules for a SIEM, just with a different hat on, and it is
the part of this project I would lead with in an interview.

About 45 detectors, split across movement, aim, command cadence, and cvar state.` },

          { head: "The detector I like best", body: `The cheat-cvar probe. Every entry in \`cheat_convars.ini\` is an FCVAR_CHEAT
client cvar plus the value the engine forces. A legitimate client physically
cannot change one of those while the server has sv_cheats 0, so if a client
reports a different value, its cvar protection has been patched. That makes it
a zero-false-positive signal, which is rare and worth a lot when the rest of
your detections are statistical.

The movement and aim detectors are the opposite: they need thresholds, and a
laggy-but-legit player has to survive them.` },

          { head: "False positives cost more than misses", body: `Banning one innocent regular costs more than missing one cheater, so the whole
thing is built around not doing that. Detections write to a ban queue instead of
banning live, which gives me a review step before anything lands. Admins and
whitelisted SteamIDs skip the cvar checks entirely. SourceBans++ is optional, and
when it is missing the plugin falls back to a local ban rather than erroring out
and leaving the player connected.

There is also a public native, \`KevAC_IgnoreMovement\`, so a trusted movement
plugin can flag the exact tick where it teleported someone. It suppresses only
the outcome-based movement checks for that tick. Command cadence, angles and cvar
detections stay live, because otherwise the exemption becomes the cheat.` }
        ]
      },

      {
        ref: "CS-002-B",
        severity: "critical",
        title: "KevAC Extension - C++ Metamod plugin, ListenEvents detour",
        sub: "C++ · Metamod:Source · the part SourcePawn cannot reach",
        meta: [["Language", "C++"], ["Size", "~800 lines"], ["Origin", "Mine"], repoRow("CSGO-KevAC-Extension")],
        beats: [
          { head: "What SourcePawn cannot see", body: `In Source, the client tells the server which network events it wants to listen
for. You cannot touch that list from SourcePawn at all. Injected DLLs register
extra listeners there to receive events they were never meant to see, which
makes it the cleanest catch in the whole project: it is not a threshold or a
heuristic, it is a list that should not have that entry in it.

So this half is a C++ Metamod extension that detours \`ListenEvents\` and checks
the registration against a blacklist. Everything else, detectors and actions and
bans, stays in the plugin.` },

          { head: "Build notes worth knowing", body: `Detour is done with safetyhook, which is why it needs SourceMod 1.12-dev rather
than a stable release. Built with AMBuild against hl2sdk-csgo.

It has to be compiled on Ubuntu 20.04 specifically. Building on a newer distro
links against a newer glibc than the CS:GO container ships, and the extension
then refuses to load with a symbol error that looks nothing like the actual
problem. Stripping the .so before shipping takes it from 16.9 MB to 3.2 MB.` }
        ]
      },

      {
        ref: "CS-002-C",
        severity: "high",
        title: "KevVPN - VPN and proxy blocker, CIDR plus reputation APIs",
        sub: "SourcePawn · 2,200 lines · merges three older plugins",
        meta: [["Language", "SourcePawn"], ["Size", "~2,200 lines"], ["Origin", "Mine, merged from three plugins"], repoRow("CSGO-KevVPN")],
        beats: [
          { head: "Two layers, cheapest first", body: `Ban evasion through cheap VPNs was eating most of the moderation time, so this
one is pure prevention.

Layer one is static CIDR ranges for known datacenter and hosting ASNs, fetched
over HTTP from X4BNet, firehol and ipverse and held in RAM. No network call per
connect, and it resolves most datacenter traffic before I spend any API budget.
Layer two is a reputation lookup (proxycheck.io, with ip-api.com and ipinfo as
alternates) for anything the ranges miss, and results cache in SQL so repeat
joins never re-hit the API.

It is deliberately a merge of three older plugins that each did one piece:
CIDR_Blocker ran a MySQL query on every single connect, Lrthrome needed a
separate Rust daemon, and ProxyKiller did the reputation half. Same features,
none of the overhead.` },

          { head: "Fail open or fail closed", body: `This is the decision I would want to be asked about. Fail open and evaders walk
straight through. Fail closed and you kick legitimate players on mobile data or
campus NAT.

I fail open, and specifically: if the database is unreachable, nobody gets
punished. An unreachable database means the whitelist never loaded, so punishing
then would kick the exact people who were explicitly exempted. Same for an API
that returns "denied", which means out of quota or a bad key. Treating that as
clean is wrong, but treating it as a hit is worse, so it counts as no answer.` },

          { head: "The false-positive traps", body: `Mobile carrier ranges are recorded and never acted on. A cellular address proves
nothing and blocking it hits every 5G player on the server.

Cloudflare WARP needed its own ASN entry, because its egress lives in
104.28.0.0/16, which is not in Cloudflare's published CDN list and not in the
datacenter feeds either. GeForce Now was the other one: it lives in ranges that
read as datacenter, so a provider allowlist gets the last word over every feed
that calls a company a datacenter.` }
        ]
      },

      {
        ref: "CS-002-D",
        severity: "medium",
        title: "hnsmix - ranked mix system with Elo and Discord integration",
        sub: "SourcePawn · 11,800 lines · my own work · biggest plugin here",
        meta: [["Language", "SourcePawn"], ["Size", "~11,800 lines"], ["Origin", "Mine"], repoRow("CSGO-hnsmix")],
        beats: [
          { head: "What it does", body: `Captain-based ranked matches from 1v1 up to 10v10. Captains get picked, players
get drafted, the match runs, and Elo settles afterwards. Everything persists in
SQL, and rank tags go on the scoreboard through HexTags rather than by writing
clan tags directly, so the two plugins do not fight over who owns the tag.

It is the largest thing in this project by a wide margin and it owns the round
flow while a match is live, which is why the other plugins have to check with it
before they touch \`mp_roundtime\`.` },

          { head: "Discord without spamming it", body: `A live server-status embed and a leaderboard embed, both pushed through REST in
Pawn. The status card edits one existing Discord message instead of posting a new
one, so the channel does not fill up. That means storing the message id, which
means having a way out when the message gets deleted: \`!mixstatus new\` drops the
stored id so the next send posts fresh.

Refreshes are event-driven with a 90 second safety net, and there is a change
guard so an embed that has not actually changed does not get re-sent.` }
        ]
      },

      {
        ref: "CS-002-E",
        severity: "medium",
        title: "hnsova - Hide and Seek with a One Versus All mode",
        sub: "SourcePawn · 4,200 lines · fork of ceLoFaN's hidenseek",
        meta: [["Language", "SourcePawn"], ["Size", "~4,200 lines"], ["Origin", "Fork of ceLoFaN's hidenseek"], repoRow("CSGO-hnsova")],
        beats: [
          { head: "The mode I added", body: `One Versus All: one T against everybody, and whoever lands the stab becomes the
new T where they stand. The handover is the whole feel of the mode, so it uses
\`CS_SwitchTeam\` to move the player without killing them. That leaves the old
team's model on them and nothing respawns them on the in-place path, so the model
gets refreshed by hand and every team change routes through one function.

Player collision had to go too, since a single T cannot escape a wall of bodies.
\`mp_solid_teammates 0\` stops horizontal blocking but still lets people stand on
your head, which is the part that gets abused, so the collision group does the
real work.` },

          { head: "Stats and a leaderboard", body: `Per-player stats in SQL, with a schema migration path because the earliest
tables were made before the stab columns existed. A Discord leaderboard renders
as two aligned columns, first half left and the rest right, and the whole async
query rides on a single data cell so nothing leaks if a player disconnects
mid-query.

Also the cosmetic loadout, the stab-through-teammates rule, and the OVA round
clock, all mine. The base gamemode is ceLoFaN's.` }
        ]
      },

      {
        ref: "CS-002-F",
        severity: "medium",
        title: "KevFJ - funjump practice mode with player voting",
        sub: "SourcePawn · 870 lines · fork of amuFJ by hiiamu",
        meta: [["Language", "SourcePawn"], ["Size", "~870 lines"], ["Origin", "Fork of hiiamu's amuFJ"], repoRow("CSGO-KevFJ")],
        beats: [
          { head: "Three plugins, one round clock", body: `Funjump keeps the round open for an hour so people can practice movement. The
interesting part is not the mode, it is that three plugins all want to own
\`mp_roundtime\`: this one wants an hour, hnsmix wants match rounds, hnsova pins
ten minutes for OVA.

\`mp_roundtime\` only applies from the next round, so the current round has to be
pinned on the game rules entity too. And FJ hooks \`round_start\` as Post
deliberately, because hnsmix hooks it as Pre and always runs first, so writing
from Post means FJ's value is the one that survives.` },

          { head: "Gating and menus", body: `A mix owns the round flow, so FJ and a mix cannot share a server. That gets
checked on a timer rather than on a round boundary, because a mix can start at
any moment, and it gets re-checked when a vote lands rather than only when it
started.

Players vote it on or off, and the vote needs a strict majority of everyone in
game rather than of everyone who answered, so ignoring the menu counts as a no.
The admin menu lands on exactly seven items, because an eighth pushes Exit onto
a second page.` }
        ]
      },

      {
        ref: "CS-002-G",
        severity: "medium",
        title: "antifrag - knife damage cap for Hide and Seek",
        sub: "SourcePawn · 620 lines · fork of Gold KingZ's HNS Anti Frag",
        meta: [["Language", "SourcePawn"], ["Size", "~620 lines"], ["Origin", "Fork of oqyh's HNS Anti Frag"], repoRow("CSGO-antifrag")],
        beats: [
          { head: "Doing the armour maths properly", body: `The convar is meant to be the health a player loses. CS:GO reduces knife damage
to 85% against kevlar, so asking for 50 gave you a 42 damage stab against an
armoured player.

Upstream compensated with an eighteen-branch if/else ladder: under 5 damage got
+1, under 11 got +2, and so on up to +18. Hand-tuned constants approximating a
curve. I replaced it with the actual calculation, plus a second branch for
nearly-depleted armour where the flat ratio overshoots. Now 50 means 50.` },

          { head: "Where the cap was still leaking", body: `Two more places. The engine's backstab bonus lands inside the damage pipeline, so
one \`OnTakeDamage\` hook can be overwritten downstream, and third-party perk
plugins that add knife damage run in the same pipeline. Hooking
\`OnTakeDamageAlive\` as well, which is the last editable player-damage path,
closes both.

Also fixed a cooldown that checked its timers before checking whether the hit was
even a knife, so a protected player was immune to fall damage, fire and grenades
for the entire cooldown.` }
        ]
      },

      {
        ref: "CS-002-H",
        severity: "low",
        title: "gstrafe - ground-strafe movement boost",
        sub: "SourcePawn · 290 lines · fork of zwolof's EFRAG GStrafe",
        meta: [["Language", "SourcePawn"], ["Size", "~290 lines"], ["Origin", "Fork of zwolof's plugin, diablix's idea"], repoRow("CSGO-gstrafe")],
        beats: [
          { head: "Turning a switch into a curve", body: `The original modifier was two-state: under 400 speed a duck did nothing, over
400 it trimmed you by 0.965. So speed sawtoothed around 400 forever instead of
settling anywhere.

Mine multiplies by a gain convar and clamps the result to a max-speed convar, so
a boost lands exactly on the cap instead of overshooting and getting knocked
back. Only genuinely over-cap speeds get trimmed, and never harder than 0.965
per duck so it stays gradual. Both numbers were baked in before; they are
convars now.` },

          { head: "Playing nicely with the anticheat", body: `Boosting works by teleporting the player, which looks exactly like the thing my
own anticheat is built to flag. So when this plugin moves someone, it calls
\`KevAC_IgnoreMovement\` for that tick and KevAC skips only its outcome-based
checks.

The trace filter also had to learn the difference between teammates and enemies,
so you can boost through your own team but not through someone you are trying to
get past. Funjump is the exception, because it turns off collision entirely.` }
        ]
      },

      {
        ref: "CS-002-I",
        severity: "low",
        title: "MovementTweaker - prestrafe and air acceleration tuning",
        sub: "SourcePawn · 690 lines · fork of danzayau's MovementTweaker",
        meta: [["Language", "SourcePawn"], ["Size", "~690 lines"], ["Origin", "Fork of danzayau's plugin"], repoRow("CSGO-MovementTweaker")],
        beats: [
          { head: "A ground cap that tracks technique", body: `With the engine's own ground clamp NOPed out by the movement unlocker, something
has to enforce a ceiling or prestrafe runs away. The cap here tracks the live
prestrafe modifier instead of pinning at a fixed number, so speed varies with how
well you actually prestrafe rather than sitting at 277 for everybody.

Retained momentum from surf, bhop or gstrafe is treated separately from speed you
are actively building. Only the first gets an optional decay, so setting decay to
1.0 leaves general movement completely alone.` },

          { head: "The log spam nobody could find", body: `The velocity modifier SendProp networks a 0.0 to 1.0 range, and the engine packs
snapshots straight from entity memory at end of frame. So any value above 1.0
still sitting there makes the encoder print a DataTable out-of-range warning
every single snapshot, no matter how carefully you wrote the value.

Movement has already consumed the real value by post-think, so clamping the
stored value there silences it without changing how anyone moves. Clients were
receiving a clamped 1.0 either way.` }
        ]
      },

      {
        ref: "CS-002-J",
        severity: "low",
        title: "csgo_movement_unlocker - byte-patching the ground speed cap",
        sub: "SourcePawn · 85 lines · Peace-Maker's plugin, my syntax pass",
        meta: [["Language", "SourcePawn"], ["Size", "85 lines"], ["Origin", "Peace-Maker's plugin, modernized syntax only"], repoRow("CSGO-MovementUnlocker")],
        beats: [
          { head: "What it does", body: `\`CGameMovement::WalkMove\` scales your wish velocity down whenever it exceeds
max speed. This finds that instruction sequence by byte signature, walks forward
a fixed offset, and overwrites the capping instructions with NOPs. It saves the
original bytes first and restores them on unload, so taking the plugin off does
not need a server restart.

I include it because it is the reason MovementTweaker has to enforce its own
ground cap, and because live-patching server memory by signature is a genuinely
fragile approach worth being able to talk about: any CS:GO update that touches
WalkMove breaks it until the signature is refreshed.` },

          { head: "My part is small and I will say so", body: `This one is not my work. All I did was bring it forward to modern SourcePawn so
it compiles on current SourceMod without a wall of deprecation warnings: old
\`new\` declarations to typed ones, \`Address:\` casts to \`view_as<Address>\`,
and \`#pragma newdecls required\` so it stays that way.

Peace-Maker's logic and comments are untouched. It is here for completeness, not
as a portfolio piece.` }
        ]
      },

      {
        ref: "CS-002-K",
        severity: "low",
        title: "movementhud - speed and key-press HUD",
        sub: "SourcePawn · 14 files · fork of Sikarii's MovementHUD",
        meta: [["Language", "SourcePawn"], ["Size", "14 files"], ["Origin", "Fork of Sikarii's MovementHUD"], repoRow("CSGO-movementhud")],
        beats: [
          { head: "What it is", body: `Configurable movement readouts: current speed, which keys you are holding,
jump and strafe indicators. Per-player preferences, saved through clientprefs and
exposed as a shareable settings code.

I forked it for the same reason as the rest of the movement stack: our servers
run a custom speed ceiling, so anything that displays or reasons about speed has
to agree with MovementTweaker and gstrafe about what the ceiling actually is.` },

          { head: "Why it matters to the other plugins", body: `It owns three HUD channels, at fixed vertical positions. That is the constraint
that shaped my spectator list in the other case file: HUD channels are a scarce
resource, six of them exist, and two plugins fighting for one is what a flicker
actually is.

Reading how Sikarii handled channel allocation here is what told me the right fix
for that bug was a synchronizer rather than a hard-coded channel.` }
        ]
      },

      {
        ref: "CS-002-L",
        severity: "info",
        title: "hextags - scoreboard and chat tags, with a cookie bug fixed",
        sub: "SourcePawn · 1,470 lines · fork of Hexer10's HexTags",
        meta: [["Language", "SourcePawn"], ["Size", "~1,470 lines"], ["Origin", "Fork of Mattia (Hexer10)'s HexTags"], repoRow("CSGO-hextags")],
        beats: [
          { head: "The bug worth explaining", body: `Players kept losing their chosen tag after a reconnect or a map change. The saved
selection was being stored as a KeyValues section symbol, and that symbol is not
stable when the config has duplicate selector names, which every real config does
because you get several admin-flag blocks in a row.

Fixed by storing the tag name instead, with the old cookie read once for
migration and then deleted so it can never override the new value. There was a
second half to it: cookie loading and admin authorization arrive independently,
and loading tags before both were ready overwrote the saved choice.` },

          { head: "Making it share the scoreboard", body: `hnsmix needs to put an Elo rank tag on the scoreboard, and both plugins writing
clan tags directly means whoever wrote last wins.

So I added an external prefix API: another plugin hands HexTags a prefix, it gets
stored beside the config tag rather than replacing it, and a reload keeps it
while re-applying cannot double it up. That also meant not clearing external
prefixes on \`OnClientPostAdminCheck\`, since that fires before
\`OnClientPutInServer\` and was wiping a prefix hnsmix had already set.` }
        ]
      },

      {
        ref: "CS-002-M",
        severity: "info",
        title: "speclist - spectator list, and the HUD flicker fix",
        sub: "SourcePawn · 510 lines · fork of MandoCSGO's Spectator-List",
        meta: [["Language", "SourcePawn"], ["Size", "~510 lines"], ["Origin", "Fork of MandoCSGO's Spectator-List"], repoRow("CSGO-speclist")],
        beats: [
          { head: "Two causes, one symptom", body: `Upstream is 210 lines and this is 510, almost all of it chasing one flicker.

Cause one: the old build passed channel -1 to the HUD message, which tells the
engine to pick the next free channel every send, so consecutive updates drew over
each other. Hard-coding a channel just moves the fight to whichever other plugin
wanted that slot, so the answer is a synchronizer: SourceMod hands out a stable
per-client channel and arbitrates.

Cause two: replacing a HUD message blanks its channel for a frame, so redrawing
once a second strobes once a second. Making the refresh slower made it worse, not
better. The fix is splitting rebuild from draw: build the list on an interval,
draw it every frame.` },

          { head: "Three smaller bugs on the way", body: `Player names containing \`%\` were parsed as format specifiers, because the built
string was passed directly instead of through \`"%s"\`.

Names were being cut mid-character, so a multi-byte name left a broken glyph. Now
it backs off a byte at a time to a UTF-8 boundary.

And preferences never stuck, because defaults were seeded in
\`OnClientPutInServer\` while clientprefs loads cookies off client authorization,
which can land first. Resetting in the wrong place wiped the freshly loaded
preferences and blocked every later save for that session.` }
        ]
      },

      {
        ref: "CS-002-N",
        severity: "info",
        title: "EasySpawnProtection - spawn protection, extended for OVA",
        sub: "SourcePawn · 450 lines · fork of Invex and Byte's plugin",
        meta: [["Language", "SourcePawn"], ["Size", "~450 lines"], ["Origin", "Fork of Invex and Byte's plugin, itself built on cREANy0 and Fredd's"], repoRow("CSGO-EasySpawnProtection")],
        beats: [
          { head: "One rule that needed an exception", body: `Spawn protection is simple until you add a gamemode where the role changes
mid-round. In One Versus All the T role passes to whoever lands the stab, and
that new T has to be immediately killable, otherwise stabbing someone hands them
a few seconds of invulnerability and the round stalls.

So the OVA check lives in the shared protection function rather than at the two
call sites that looked like they needed it. Guarding only \`player_spawn\` left
the round-start loop still granting protection, which is the kind of thing that
only shows up when you go looking for every caller instead of patching the path
the bug report happened to name.` }
        ]
      }

    ],
    repo: ""
  },

  {
    id: "SRV-003",
    tags: [
      { name: "Network Configuration",     tone: "critical" },
      { name: "DNS & Domains",             tone: "high" },
      { name: "Load Balancing",            tone: "medium" },
      { name: "Performance Configuration", tone: "medium" },
      { name: "Proxmox",                   tone: "low" },
      { name: "Cloudflare",                tone: "info" }
    ],
    caseNo: "{TODAY}-003",
    title: "Minecraft & CS:GO Servers - Config and Network Management",
    kind: "Infrastructure / Operations",
    blurb: "Running public game servers is a sysadmin job wearing a hoodie, and the two games are genuinely different jobs. Minecraft was one box I owned end to end: DNS, a balancer, the JVM, the restart schedule. CS:GO is two rented servers on two continents, where the interesting problems are config that fights itself and deciding what NOT to share between regions.",
    status: { shipped: true },
    period: "2024 to present",
    scope: "Servers I run and pay for. CS:GO on NFOservers (NA) and dathost (EU), plus a public modded Minecraft server on Proxmox. I also help manage an active CS2 network at [edan.gg](https://edan.gg/).",
    stack: ["Linux", "Proxmox", "Cloudflare", "Cloudflare R2", "DNS", "SRV records", "load balancing", "SourceMod", "Forge", "Temurin JDK 8", "tmux", "cron", "SQLite", "MySQL"],
    filterLabel: "Server",
    tones: {
      critical: "Minecraft",
      high:     "CS:GO"
    },
    findings: [

      {
        ref: "SRV-003-A",
        severity: "critical",
        title: "A subdomain, an SRV record, and a load balancer behind it",
        sub: "DNS · SRV · Cloudflare · 3 Proxmox proxies",
        meta: [["Server", "Minecraft"], ["Registrar", "Squarespace"], ["DNS / edge", "Cloudflare"], ["Balanced across", "3 Proxmox proxies"]],
        beats: [
          { head: "Why Minecraft needs a record type nobody else uses", body: `A game server is an IP and a port. Players want to type a name.

Minecraft will take a hostname, but only on the default port, unless you make the
client look one up. That is what a \`_minecraft._tcp\` SRV record does: it hands
the client both the target host and the port, so people connect with a bare
domain even though the server is not on 25565. Same mechanism SIP and XMPP use,
and it is the first time most people hosting a game server meet a record type
that is not A or CNAME.` },

          { head: "What the name was actually pointing at", body: `The server sat on its own subdomain rather than a bare IP, and that indirection
is what made everything after it possible. Behind the name, connections were
split across three proxies running on Proxmox, so the subdomain resolved to a
balancer rather than to the game server itself. Players hold a name, I hold the
topology, and the two change independently.

DDoS protection went through Cloudflare. Worth being precise about what that
buys, because it is the thing people most often overstate: their edge is built
for HTTP, and Minecraft is a TCP protocol on a non-web port, so this is not the
same "just proxy it" story as putting a website behind them.

The domain is registered at Squarespace and the nameservers point at Cloudflare, so
the registrar and the DNS host are deliberately separate. That split is worth having:
the registrar is the account that can transfer the domain away, and it is not the
account I log into regularly to change records.` }
        ]
      },

      {
        ref: "SRV-003-B",
        severity: "critical",
        title: "Forge, RLCraft Dregora, and the JVM underneath",
        sub: "Temurin JDK 8 · heap and GC · performance tuning",
        meta: [["Server", "Minecraft"], ["Runtime", "Temurin JDK 8"], ["Heap", "8 GB, Xms = Xmx"], ["GC", "G1, Aikar's flags"]],
        beats: [
          { head: "The config file and the runtime under it", body: `\`server.properties\` is the easy half: port, view distance, whitelist,
online-mode. \`online-mode\` is the one with a security consequence, because
turning it off stops the server verifying accounts against Mojang and lets
anyone connect as any username.

The half people miss is that a Minecraft server is a long-running JVM, so its
performance problems are JVM problems. Heap size, and more importantly garbage
collection pauses, are what a stutter usually is. Give it too much heap and the
pauses get longer, not shorter, which is the opposite of what everyone tries
first.` },

          { head: "Java 8 is a requirement, not nostalgia", body: `It ran on Temurin JDK 8. That is not me being behind: it is what Forge for that
Minecraft version actually supports, and a heavily modded pack is the least
forgiving place to go off the supported runtime.

Most of the work was tuning it for RLCraft Dregora v1.1.2b specifically. That
pack is famous for being heavy, so the performance ceiling is set by the modpack
long before it is set by the hardware, and "buy a bigger box" stops helping
earlier than you would expect.

8 GB, with \`-Xms\` and \`-Xmx\` set to the same value so the JVM never spends time
resizing the heap, and the G1 collector tuned rather than left on defaults:

\`\`\`
java -server -Xms8G -Xmx8G
  -XX:+UseG1GC -XX:+ParallelRefProcEnabled -XX:MaxGCPauseMillis=200
  -XX:+UnlockExperimentalVMOptions -XX:+DisableExplicitGC -XX:+AlwaysPreTouch
  -XX:G1NewSizePercent=30 -XX:G1MaxNewSizePercent=40 -XX:G1HeapRegionSize=8M
  -XX:G1ReservePercent=20 -XX:G1HeapWastePercent=5 -XX:G1MixedGCCountTarget=4
  -XX:InitiatingHeapOccupancyPercent=15 -XX:G1MixedGCLiveThresholdPercent=90
  -XX:G1RSetUpdatingPauseTimePercent=5 -XX:SurvivorRatio=32
  -XX:+PerfDisableSharedMem -XX:MaxTenuringThreshold=1
  -jar forge-1.12.2-14.23.5.2860.jar nogui
\`\`\`

That is Aikar's flag set, the tuning most Minecraft server operators converge on, and
the short version of what it does is make G1 collect more often in smaller slices
instead of rarely in long ones. \`AlwaysPreTouch\` commits the whole heap at startup so
the cost is paid once instead of arriving later as stutters, and \`DisableExplicitGC\`
stops a mod calling \`System.gc()\` from stalling the tick loop.

The measured part: I ran this at 14 GB before dropping it to 8. More heap sounds like
the obvious fix for a heavy pack and it is the wrong instinct, because a bigger heap
gives G1 more to walk and the pauses get longer, not shorter. Cutting the allocation
nearly in half is what actually smoothed it out.

The pack's own README suggests 6 GB with \`MaxGCPauseMillis=50\` and 32 MB regions. I
went the other way on both: a 200 ms pause target rather than 50, because asking G1
for pauses it cannot deliver only makes it miss more often, and 8 MB regions to suit
the larger heap.` }
        ]
      },

      {
        ref: "SRV-003-C",
        severity: "critical",
        title: "Getting content onto a Minecraft client",
        sub: "resource packs · SHA-1 · modpack parity",
        meta: [["Server", "Minecraft"], ["Layer", "Content delivery"], ["Loader", "Forge"]],
        beats: [
          { head: "Two mechanisms, one problem", body: `A server resource pack is a URL in \`server.properties\` plus a SHA-1 of the
archive, and the client downloads and verifies it on join. The hash is the part
worth knowing: change the pack without changing the hash and clients keep serving
a stale cached copy, which is the source of most "it works for me" reports.

Mods are harder, because a modded server cannot hand a client its mods the way it
hands over a resource pack. Client and server have to agree on the mod list ahead
of time, which is why modpacks exist and why version drift between a player's
pack and the server's is the single most common reason someone cannot connect.

Mine was Forge running RLCraft Dregora v1.1.2b, squarely in the second category:
every player needs the pack installed and matching before they can connect at
all. Same modpack family as [case {TODAY}-001](#/case/MC-001), which is not a
coincidence. Running it is how I ended up reading its code.` }
        ]
      },

      {
        ref: "SRV-003-D",
        severity: "critical",
        title: "rcon behind SSH, and why op being all-or-nothing matters",
        sub: "localhost rcon · SSH IP allowlist · vanilla op",
        meta: [["Server", "Minecraft"], ["Layer", "Hardening"], ["rcon", "localhost only"], ["Access", "SSH, IP allowlist"]],
        beats: [
          { head: "One door with real auth on it", body: `rcon should not be reachable from the internet. It is a remote console with full
server control behind one shared password, sent in cleartext on the classic
protocol. If it is exposed, it is a brute-force target, and a hit is total
compromise of that box.

I bound it to localhost and reached it over SSH, with an IP allowlist on SSH
itself so only trusted people could get that far. That gives two things for the
price of one: rcon inherits SSH's encryption and key auth instead of relying on
its own password, and the same allowlist covers the friends who needed FileZilla
for file access. The admin surface becomes one door with real auth on it, rather
than several with weak auth.` },

          { head: "The permission model is the interesting part", body: `Vanilla op is all-or-nothing. No flags, no groups, no way to grant someone the
ability to do one thing.

That coarse-grained model is exactly the soil the bug in
[case {TODAY}-001](#/case/MC-001) grew in. When the only question a mod can ask
is "is this player op", a mod that forgets to ask at all looks the same from the
outside as one that had nothing worth checking. Compare it to how SourceMod does
admin flags on the CS:GO side and the difference is stark.` }
        ]
      },

      {
        ref: "SRV-003-E",
        severity: "critical",
        title: "Keeping it up: tmux, cron, and a 3AM restart",
        sub: "headless tmux · nightly cron restart",
        meta: [["Server", "Minecraft"], ["Layer", "Operations"], ["Supervision", "tmux"], ["Restart", "3AM, cron"]],
        beats: [
          { head: "Restart before you debug", body: `It ran headless in tmux with a scheduled 3AM restart driven by cron, and the box
rebooted itself on the same schedule.

Restarting nightly is the pragmatic answer to a modded server's memory creeping
up over a day. You can chase a leak through a hundred mods you did not write, or
you can restart at the hour nobody is online. I picked the one that costs
nothing, and I would defend that: the goal is a server that is up, not a server
whose memory profile I fully understand.` },

          { head: "The weak point, said out loud", body: `tmux is the honest gap. It survives me disconnecting, but it does not restart a
crashed process the way systemd would. The cron restart covers the scheduled
case, not the 4am crash.

If I rebuilt it, that is the first thing I would change: a systemd unit with
\`Restart=on-failure\` turns "it comes back at 3AM" into "it comes back in
seconds", and the nightly restart becomes a timer instead of the only recovery
mechanism.` }
        ]
      },

      {
        ref: "SRV-003-F",
        severity: "high",
        title: "Two regions, two hosts, and what a public server exposes",
        sub: "NFOservers (NA) · dathost (EU) · ports and rcon",
        meta: [["Server", "CS:GO"], ["Layer", "Networking"], ["NA", "NFOservers"], ["EU", "dathost"]],
        beats: [
          { head: "More ports than people expect", body: `A Source server is not one port. There is the game port on UDP, the same number
on TCP for some traffic, a separate query port that answers the server browser,
an rcon port if you enable it, and SourceTV on its own port if you run it. Every
one of those is a service reachable from the internet.

The query port matters more than it looks. It answers unauthenticated requests
from anyone, which is what puts you on the public server browser, and it is also
what gets you enumerated and reflected off.` },

          { head: "The console I actually use", body: `NA runs on NFOservers, EU on dathost. rcon has its own password, but I do not
drive the servers through it day to day: both hosts give you a web console, so
the normal admin path is an authenticated dashboard rather than a raw rcon
socket.

That is worth saying plainly, because it is the real security win. When the
console you reach for every day already sits behind a proper login, rcon stops
being the thing you leave open for convenience. It is a fallback, not the front
door.` }
        ]
      },

      {
        ref: "SRV-003-G",
        severity: "high",
        title: "FastDL - a second, separate HTTP host, and what that exposes",
        sub: "sv_downloadurl · Cloudflare R2 (NA) · dathost (EU)",
        meta: [["Server", "CS:GO"], ["NA", "Cloudflare R2, synced by hand"], ["EU", "dathost, automatic"], ["Directory index", "Off"]],
        beats: [
          { head: "Why it exists", body: `If a player joins missing a map or a sound, the server can send it over the game
connection itself. That path is throttled hard enough to be unusable, so a
joining player sits on a loading screen for minutes.

FastDL is the fix: \`sv_downloadurl\` points at a plain HTTP host holding the same
files, usually bz2-compressed, and the client pulls from there at web speed. The
constraint that catches people is that the directory layout on the web host has
to mirror the game folder exactly, or the client silently falls back to the slow
path.` },

          { head: "Two regions, two answers", body: `EU serves FastDL from dathost itself, alongside the game server. NA serves it
from Cloudflare R2.

R2 is the better shape for the job. It is object storage with a CDN in front, so
downloads never touch the game server at all: a map pack landing on twenty
joining players is bandwidth Cloudflare eats instead of bandwidth competing with
tickrate on the box trying to simulate a round. R2 specifically has no egress
fee, which for a workload that is pure outbound transfer is the whole argument.` },

          { head: "It is a disclosure surface too", body: `Anything reachable under \`sv_downloadurl\` is public. It is a plain web server
whose layout has to mirror the game folder exactly, so the paths are not secret,
they are derivable. Any file that ends up in the mirrored tree is readable by
anyone who can join, and by anyone who can guess a filename without joining.

That makes "what gets synced to FastDL" an access-control decision rather than a
deployment detail.

The two regions differ here too. dathost uploads to its own FastDL host
automatically, so EU stays in sync without me. NA I sync to R2 by hand.

Manual sync is the honest weak point, and the failure mode is quiet: add a map to the
game server, forget to push it to R2, and clients silently fall back to the throttled
in-game download instead of erroring. Nothing breaks, it just gets slow, which is the
kind of bug you only notice when someone complains about load times.

R2 public buckets do not serve a directory index, so the tree is derivable but not
browsable. That matters more than it sounds: without an index an attacker has to guess
filenames, with one they get a file listing for free.` }
        ]
      },

      {
        ref: "SRV-003-H",
        severity: "high",
        title: "Config that fights itself, and the SourceMod load order",
        sub: "server.cfg · gamemode configs · cfg/sourcemod",
        meta: [["Server", "CS:GO"], ["Layer", "Configuration"], ["Extensions", "SourceMod, Metamod:Source"]],
        beats: [
          { head: "Last writer wins", body: `A Source server reads config from several places in a fixed order, and the last
writer wins. \`server.cfg\` runs at startup, the gamemode and map configs run
after it, and anything a plugin does with \`AutoExecConfig\` lands in
\`cfg/sourcemod/\` and executes later still.

That ordering is not academic. It is why my movement plugin re-applies its cvar
on \`OnConfigsExecuted\` rather than \`OnMapStart\`, and why three of my plugins
have to negotiate over who owns the round timer. Getting a value to stick means
knowing which pass runs last, and it is not the one people assume. The full story
is in [case {TODAY}-002](#/case/CS-002).

By hand, over FileZilla or straight into the box over SSH, and I will call that the
weak point before an interviewer does. There is no pipeline, no config management, no
single source of truth. Two servers means two chances to fat-finger a value and no
record of which one drifted.

The ownership split is part of why. I own the NA server outright. On EU I develop the
plugins with full root and file access on someone else's box, which is a trust
relationship rather than a deployment target I control, so the two were never going to
share one automated deploy path.

If I rebuilt it, this is the first thing I would change: the configs are text files
that belong in a repo, and pushing from git would give me both a diff and a rollback,
which is exactly what hand-editing over SFTP does not.` }
        ]
      },

      {
        ref: "SRV-003-I",
        severity: "high",
        title: "Two databases, two engines, on purpose",
        sub: "SQLite (NA) · MySQL (EU) · databases.cfg",
        meta: [["Server", "CS:GO"], ["Layer", "Data"], ["NA", "SQLite, local"], ["EU", "MySQL, NFOservers"]],
        beats: [
          { head: "Not even the same engine", body: `NA uses SQLite, local to the game server, which SourceMod ships a driver for and
wires up by default in \`databases.cfg\` as \`storage-local\`. EU points at MySQL
on NFOservers web hosting.

Same plugins, same schema expectations, two completely different backends. That
only works because everything goes through SourceMod's database layer instead of
raw driver calls, which is the sort of abstraction you do not appreciate until
you actually need it to pay off.

SQLite is right for NA precisely because nothing else needs to read it: no
network hop, no second service to keep alive, and a file you can copy. The moment
you want a web panel or cross-server reads, that stops being true, which is what
the EU side buys with MySQL.` },

          { head: "Deliberately not shared", body: `\`databases.cfg\` makes sharing one database trivial, and I chose not to.

Sharing would make ranks, Elo and bans follow a player across regions, which
sounds like a feature until you count the cost: one database becomes a single
point of failure for both regions, cross-continent queries land in the middle of
a tick, and an Elo pool mixing two populations with different ping and skill
distributions is not really one ladder.

Separate means a player is a separate identity in each region. That is the trade
I picked, and it is reversible in one config file if I ever want the other
behavior.` }
        ]
      },

      {
        ref: "SRV-003-J",
        severity: "high",
        title: "Admins, secrets, and where the backups come from",
        sub: "admins.cfg · Owner / Admin · daily host backups",
        meta: [["Server", "CS:GO"], ["Layer", "Hardening"], ["Admin model", "admins.cfg, Owner / Admin"], ["Backups", "Daily, host-provided"]],
        beats: [
          { head: "Root is a blast radius, not a rank", body: `SourceMod admins come from \`admins.cfg\`, in two groups. Owner carries root,
which in SourceMod means every flag including the ones that are effectively rcon
by another name. Admin gets a hand-picked flag set instead of root.

The split matters more than it looks. Root is not a seniority label, it is a
blast radius: a rooted account can reconfigure the anticheat, unban, and run
commands that reach the server itself, so anyone holding it is a total-compromise
path if their Steam account is stolen. Keeping everyday admins off root means the
common case cannot escalate that far. Compare it to vanilla Minecraft op, which
has no equivalent of this at all.` },

          { head: "Credentials and recovery", body: `These servers hold real credentials: an rcon password, a database user for the
plugins, a proxycheck.io API key for the VPN blocker, and Discord webhook URLs
that will happily post as me for anyone who has them. None of them live in
source. Every one is an \`FCVAR_PROTECTED\` convar with an empty default, set from
a config file that is not in the repo, which is what let me publish fourteen
plugins without auditing each one for a leaked key.

Backups come from the hosts: both NFOservers and dathost run daily backups, which
on NA sweeps up the SQLite database for free, because there it is just a file
inside the server directory. The honest caveat is that I have not had to restore
one, and an untested backup is a hope rather than a plan.` }
        ]
      }

    ],
    repo: ""
  },
  {
    id: "LAB-004",
    tags: [
      { name: "Home Lab",       tone: "low" },
      { name: "Detection Log",  tone: "low" },
      { name: "Splunk / SIEM",  tone: "medium" },
      { name: "Virtualization", tone: "info" }
    ],
    caseNo: "{TODAY}-004",
    title: "Home Security Lab - Build & Detection Log",
    kind: "Infrastructure / Blue Team",
    blurb: "A segmented lab where I attack myself and then try to catch it in the logs. Catching it is the whole point.",
    status: { shipped: true },
    period: "Aug 2025 to present",
    scope: "Two VMs on a VirtualBox internal network, no route to the host or the LAN. Nothing outside the segment was ever a target.",
    stack: ["VirtualBox", "Kali Linux", "Windows 10", "Splunk", "nmap", "Windows Event Log"],
    sections: [
      { head: "Topology", body: `Two VMs in Oracle VirtualBox: Kali as the attacker, Windows 10 as the target,
joined by a VirtualBox **internal network** rather than NAT or bridged.

That choice is the whole safety model, so it is worth being precise about it. A
bridged adapter puts the VM on my real LAN, which means a scan or an exploit
reaches the actual house. NAT gives the VM outbound internet through the host. An
internal network is neither: the two VMs can only see each other, and there is no
path to the host or the LAN at all. Nothing I do inside can leak out, and nothing
outside can wander in.

\`\`\`
# both VMs on the same isolated segment, no host or LAN reachability
VBoxManage modifyvm "kali-attacker" --nic1 intnet --intnet1 "labnet"
VBoxManage modifyvm "win10-target"  --nic1 intnet --intnet1 "labnet"
\`\`\`

The trade is that an internal network has no DHCP and no internet, so both boxes
get static addresses and anything I want installed has to go on before I cut them
off. That is a real inconvenience and I would still make the same call, because
"my lab cannot reach my family's laptops" is worth more than convenience.

\`\`\`
kali-attacker    10.10.10.5/24
win10-target     10.10.10.10/24
\`\`\`

Windows Defender is off on the target on purpose. Not because I am pretending it
does not exist, but because the point is to see what the logs record, and an
endpoint product that blocks the action before it happens means there is nothing
to find in the log. Turning it back on and re-running is a separate exercise
about what Defender catches, which is a different question.`
      },

      { head: "Detection log", body: `The loop is always the same: do something from Kali, then go to Splunk and try
to find it. What I care about is the gap between the two.

**Exercise: port scan.** An \`nmap\` SYN scan from Kali against the Windows box.

\`\`\`
nmap -sS -p- -T4 10.10.10.10
\`\`\`

**What fired:** almost nothing, and that was the lesson. A SYN scan never
completes the handshake, so Windows does not log a connection because from its
point of view no connection happened. The Security log had nothing to say. What
did show up was in the firewall log, and only because I turned dropped-packet
logging on, which is off by default.

\`\`\`
# the setting that makes a scan visible at all
netsh advfirewall set allprofiles logging droppedconnections enable
# -> %systemroot%\\system32\\LogFiles\\Firewall\\pfirewall.log
\`\`\`

**What that taught me:** the detection was not a rule, it was a log source I did
not have turned on. You cannot alert on data you never collected, and the default
Windows configuration collects a lot less than you would assume.

**Exercise: failed logons.** Repeated authentication attempts against the target,
then searching for the pattern rather than the individual event.

\`\`\`
index=win EventCode=4625
| stats count by src_ip, Account_Name, _time span=1m
| where count > 5
\`\`\`

**What fired:** event 4625 for each failure, reliably. One 4625 is noise, someone
fat-fingering a password. The signal is the rate, and writing it as a threshold
over a time window is the first time the difference between "an event" and "a
detection" actually clicked for me.

**What did not fire:** a successful logon after failures looks completely normal
in isolation. 4624 on its own says nothing. It is only interesting sitting next to
a burst of 4625 from the same source, which means the detection has to correlate
two event codes rather than match one.

**Getting logs in at all.** Splunk does not read Windows events by magic, it
needs the universal forwarder pointed at the channels you want.

\`\`\`
# inputs.conf on the Windows target
[WinEventLog://Security]
disabled = 0
index = win

[WinEventLog://System]
disabled = 0
index = win
\`\`\``
      },

      { head: "What broke", body: `Plenty, and the failures taught me more than the successes.

**I built the network wrong first.** The VMs started on NAT, because that is the
default and I wanted them to have internet. They could not see each other, I spent
an evening convinced nmap was broken, and the actual problem was that NAT gives
each VM its own private slice with no path between them. Internal networking is
the fix, and I only understood the difference between the VirtualBox modes because
I got it wrong.

**I forgot the target had no route to Splunk.** Once both boxes were isolated,
the forwarder on Windows had nothing to forward to, because Splunk was outside the
segment. Obvious in hindsight. The fix was putting the indexer inside the lab
rather than punching a hole in the isolation, which was the more tempting option
and the wrong one.

**A Pi Zero is not a Splunk host.** I briefly wondered whether the Pi already
running Pi-hole could take log ingest as well. It cannot, and finding out where
that ceiling is was useful.

**Snapshots saved me repeatedly.** Restoring a clean Windows VM after breaking it
takes seconds, and the first time I did it I realised I had been avoiding
experiments because rebuilding felt expensive. Take the snapshot first and the
whole thing gets less precious.`
      }
    ],
    repo: ""
  },

  {
    id: "DNS-005",
    tags: [
      { name: "DNS Sinkhole",  tone: "low" },
      { name: "Network-Wide",  tone: "low" },
      { name: "Pi-hole",       tone: "info" },
      { name: "Raspberry Pi",  tone: "info" }
    ],
    caseNo: "{TODAY}-005",
    title: "Network-Wide DNS Filtering - Pi-hole on Raspberry Pi",
    kind: "Infrastructure / Blue Team",
    blurb: "DNS sinkhole for the whole house. Turned into a lesson in how much a network says when nobody is listening.",
    status: { shipped: true },
    period: "Sep 2025 to present",
    scope: "My own home network.",
    stack: ["Raspberry Pi Zero 2 W", "Raspberry Pi OS", "Pi-hole", "dnsmasq", "DHCP", "IPv6", "SQLite"],
    sections: [
      { head: "Build", body: `A Raspberry Pi Zero 2 W running Raspberry Pi OS, doing two jobs at once: DNS
sinkhole and DHCP server. The second one is the part that actually matters,
and it took me a while to work out why.

Pointing your router at the Pi is the easy version, and it half works. Every
device that asks the router for DNS gets the Pi, so ads stop. But anything that
brings its own resolver just walks past it, and on my network that was most of
the interesting traffic.

Running DHCP on the Pi instead means the Pi hands out its own address as the DNS
server in the lease, so a device is told to use it before it ever asks. That is
DHCP option 6, and it is the difference between filtering the devices that
cooperate and filtering the ones that do not.

\`\`\`
# /etc/dnsmasq.d/02-pihole-dhcp.conf, written by the Pi-hole DHCP toggle
dhcp-authoritative
dhcp-range=192.168.1.50,192.168.1.250,24h
dhcp-option=option:router,192.168.1.1
dhcp-option=option:dns-server,192.168.1.10     # the Pi, handed out in every lease
\`\`\`

IPv6 was the thing I nearly missed. A device can hold a v4 lease pointing at the
Pi and still resolve over v6 through the router's advertisement, which quietly
undoes the whole setup. So the Pi advertises itself on v6 as well, and both
stacks get filtered or neither does.

\`\`\`
# same file: router advertisements so v6 clients get the Pi too
enable-ra
dhcp-option=option6:dns-server,[fd00::10]
\`\`\`

Blocklists are the default set plus additions of my own. The default lists are
tuned for ads, and a lot of what I actually wanted gone was telemetry, which
is not the same category.`
      },

      { head: "What the query log showed", body: `The interesting part of this project was never the blocking. It was reading the
query log, because a network is extremely loud when nobody is listening.

The loudest talkers were not browsers. They were a smart TV and a couple of
phones, all beaconing on a fixed interval whether or not anyone was using them,
and they kept doing it overnight with the house asleep. Once you have seen a
device phone home every few minutes at 3am you stop thinking of DNS as plumbing.

The pattern worth knowing is that volume and importance are unrelated. The
noisiest domain on the network is almost always something boring like a CDN or an
NTP pool. What matters is the shape: a device that resolves the same domain on a
metronome is beaconing, and beaconing is what command-and-control traffic looks
like too. Same signal, different intent, and DNS alone cannot tell you which one
you are looking at.

Some queries I could not attribute to anything I own, which is its own useful
result. Not every unknown is malicious, but you cannot say that until you have
looked.

\`\`\`
# the query the Pi actually answers from, if you want to read it raw
sqlite3 /etc/pihole/pihole-FTL.db \\
  "SELECT domain, COUNT(*) c FROM queries
   WHERE timestamp > strftime('%s','now','-1 day')
   GROUP BY domain ORDER BY c DESC LIMIT 20;"
\`\`\``
      },

      { head: "Why this counts as a security control", body: `Because almost everything has to resolve a name before it can do anything.

Malware that phones home, a phishing link someone clicks, an exfil script
uploading to a bucket: nearly all of it starts with a DNS lookup, and a lookup
is a chokepoint you own. Sinkholing a known-bad domain kills that step for every
device on the network at once, without an agent on any of them, which is the part
that makes it worth running on a $15 computer.

The second half is detection rather than prevention. The query log is a log
source. It tells you which host asked for what and when, so it answers the
question you actually get asked during an incident: did anything else on this
network touch that domain. That is the same reason a SOC cares about DNS logs,
just at a smaller scale.

What it does not do is inspect content. It sees the name, never the payload. So
it stops a connection from being established and gives you a record that
something tried, and nothing more than that.`
      },

      { head: "Limitations, which are the interesting part", body: `**DoH and DoT walk straight past it.** A browser doing DNS over HTTPS resolves
through port 443 to its own provider and never asks the Pi at all. Firefox
shipped this on by default in some regions and Chrome will use it opportunistically.
You can block the known DoH endpoints, and Pi-hole ships a list for exactly that,
but it is a blocklist arms race rather than a fix. A device that hardcodes an
encrypted resolver is simply out of scope.

**Hardcoded resolvers.** A device that ignores the DHCP lease and talks to
8.8.8.8 directly bypasses everything. The real fix is a firewall rule that
redirects or drops outbound port 53 to anything except the Pi, which is a router
job rather than a Pi job, and I have not done it. Naming it is more honest than
pretending DHCP closed the hole.

**Single point of failure.** One Pi Zero is the whole network's DNS. If it falls
over, nothing resolves, and "the internet is down" is my problem specifically.
The usual answer is a second instance handed out as the secondary resolver.

**Per-device opt-out.** Anyone who knows what they are doing can set their own
DNS in thirty seconds. This filters the honest majority, not a determined user.

**Maintenance.** Blocklists rot. Aggressive lists break real sites, and the
failure mode is a page that half loads with no obvious cause, so someone has to
actually maintain the allowlist or people start turning it off.`
      }
    ],
    repo: ""
  },


];

// Delete this array to hide the Field Notes section.
const FIELD_NOTES = [
  { date: "2026-08-14", note: "Working through injection classes from writeups and vendor advisories, and the thing that keeps repeating is that they are all one bug wearing different clothes: data crossing into a place that parses it as instructions. SQL injection is fixed by parameterised queries rather than escaping, because escaping is you guessing the parser's rules and binding is the parser being told which parts are data. OS command injection dies the same way, by passing an argv array instead of building a shell string, so there is no shell left to interpret a semicolon. XSS is the same idea aimed at a browser, and the reason context matters is that the escape for HTML text is not the escape for an attribute or for inline JavaScript. NoSQL injection surprised me most: no quotes to break out of, you just send an operator where the app expected a value and a login check becomes a query that matches anything. Prompt injection is the newest shape and the one with no parameterised-query equivalent yet, because there is no syntax separating the instructions from the retrieved content, and indirect versions arrive through a page or document the model was asked to read. Automated phishing is the delivery side of the same trend, kits that spin up a convincing login page and relay the session token straight through, which is why MFA that can be phished is not the finish line. My own SourcePawn work is the cheap version of the lesson: 28 escape calls on every attacker-controlled field, and secrets kept in protected convars so they never reach a repo." },
  { date: "2026-08-18", note: "Finding real authorization bugs in Minecraft mods with millions of downloads reset how I think about severity. Nobody had missed something clever. They forgot a permission check on one packet handler while gating the one right next to it, and that single omission scales to every server running the pack. Small oversight, enormous blast radius, and it sat there for years because downloads are not review. That pushed me into how much software is now written by AI assistants, and into what those tools get wrong at scale. The pattern I keep reading about is not exotic: generated code defaults to insecure-but-working, so you get string-concatenated queries, permissive CORS, missing authorization on endpoints that look internal, secrets pasted inline because that runs first try, and dependency names that were hallucinated outright, which attackers now register on purpose. It is the same CWE-862 I found in the mods, except produced at machine speed and reviewed by whoever pasted it. So I started looking at the automated side of catching it: Semgrep and CodeQL for patterns rather than strings, secret scanning in CI so a key is caught at push instead of at breach, and dependency checks that verify a package exists before it ships. The attacker economics are what stuck with me. If a flaw class is generated predictably, scanning for it is cheap and mass-scale, and defenders have to be automated too because reviewing by hand does not scale against code that was not written by hand." }
];
