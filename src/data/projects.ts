export type Accent = 'violet' | 'teal' | 'pink';

export type CodeLang = 'luau' | 'ts' | 'cs' | 'py';

export type Snippet = {
  file: string;
  lang: CodeLang;
  code: string;
};

export type ArchitectureNode = {
  label: string;
  detail: string;
};

export type ArchitectureVisual = {
  eyebrow: string;
  badge?: string;
  entry: ArchitectureNode;
  core: ArchitectureNode;
  services: ArchitectureNode[];
  footer?: string;
};

export type Project = {
  title: string;
  category: string;
  role: string;
  blurb: string;
  impact: string[];
  tags: string[];
  image?: string;
  imageAlt?: string;
  visualLabel?: string;
  /** Syntax-highlighted code window shown in the card media slot (preferred over image). */
  snippet?: Snippet;
  /** Label for the small mock UI button overlapping the code window. */
  uiChip?: string;
  /** Sanitized system diagram shown in the card media slot. */
  architecture?: ArchitectureVisual;
  href?: string;
  hrefLabel?: string;
  repo?: string;
  /** Overrides the default "Code" label on the repo link. */
  repoLabel?: string;
  /** Internal hash route to a long-form case study page. */
  caseStudy?: string;
  /** Access caveat, rendered as small print beneath the card's links. */
  note?: string;
  /** Slug under src/content/code/* - enables the interactive source-file explorer. */
  codeSlug?: string;
  accent: Accent;
  year?: string;
  /** Renders full-width as the lead card above the grid. */
  featured?: boolean;
  /** Recruiter-facing context for how the work was used. */
  status: string;
};

// Order is intentional: the strongest production evidence leads, followed by
// differentiated research and consulting work. Overlapping projects are folded
// into one narrative so the main grid stays focused.
export const projects: Project[] = [
  {
    title: 'FSA Debt Consolidation Platform',
    category: 'Production software',
    role: 'Angular/AWS loan-software work',
    blurb:
      'A focused case study in changing mature, regulated software: Angular debt-consolidation workflows integrated with legacy services, complex validation rules, role-dependent states, and controlled releases.',
    impact: [
      'Shipped debt-consolidation screens demoed to senior FSA staff and congressional contacts',
      'Built an AWS, Angular, and Node.js calculator that cut a manual workflow by 40%',
      'Modernized a 10+ year-old Java/Struts application into Angular and Spring Boot/Hibernate, preserving 10,000+ existing unit tests at 98% Jest coverage on owned modules',
    ],
    tags: ['Angular', 'AWS', 'Node.js', 'Spring Boot', 'Jest'],
    visualLabel: 'Regulated production delivery',
    note: 'Federal client work; the code is government property and stays private.',
    accent: 'violet',
    year: '2023-2026',
    featured: true,
    status: 'Production',
  },
  {
    title: 'Listing Studio',
    category: 'Full-stack product',
    role: 'Next.js commerce workspace and content pipeline',
    blurb:
      'A private, owner-only workspace that runs a digital-products business end to end: listing creation and validation, Etsy and YouTube integrations, a bounded daily content pipeline, and the product factory that builds what the shop sells.',
    impact: [
      'Built the auth layer from scratch: owner bootstrap, opaque hashed DB-backed sessions, and single-use recovery with full session revocation',
      'Integrated Etsy and YouTube OAuth with PKCE, AES-GCM-encrypted refresh tokens under versioned keys, and deliberately minimal scopes - no deletes, no transaction writes',
      'Runs SQLite locally and Neon Postgres plus private Vercel Blob in production behind one persistence boundary, with tests and production smoke checks per surface',
    ],
    tags: ['Next.js', 'React', 'TypeScript', 'PostgreSQL', 'OAuth'],
    architecture: {
      eyebrow: 'Sanitized production architecture',
      badge: 'Private system',
      entry: { label: 'Owner browser', detail: 'HTTPS · opaque session' },
      core: { label: 'Next.js workspace', detail: 'Auth · workflows · bounded jobs' },
      services: [
        { label: 'External APIs', detail: 'Etsy · YouTube OAuth' },
        { label: 'Private data', detail: 'Postgres · Blob storage' },
      ],
      footer: 'Encrypted tokens · least-privilege scopes',
    },
    snippet: {
      file: 'session.ts',
      lang: 'ts',
      code: `// opaque sessions: the browser holds a random token,
// the database only ever sees its hash
const token = randomBytes(32).toString("base64url")

await db.run(
  \`INSERT INTO sessions (token_hash, owner_id, expires_at)
   VALUES (?, ?, ?)\`,
  [sha256(token), ownerId, expiresAt.toISOString()],
)

cookieStore.set(SESSION_COOKIE, token, {
  httpOnly: true, sameSite: "lax", expires: expiresAt,
})`,
    },
    note: 'Runs a live business, so the instance stays private. Happy to walk through it.',
    codeSlug: 'listing-studio',
    accent: 'pink',
    year: '2026',
    status: 'Private Production',
  },
  {
    title: 'A&D Home Care & Aging with Grace AFH',
    category: 'Production client website',
    role: 'End-to-end design, development, owner-managed automation, local SEO, and Cloudflare deployment',
    blurb:
      'The live marketing, contact, and room-availability site for two operating, licensed Washington adult family homes. I turned the owners\' requirements and photography into a production presence for families comparing care in Lynnwood and Everett.',
    impact: [
      'Took the project from business requirements and raw owner photos through responsive design, implementation, custom-domain launch, and git-driven Cloudflare Worker deployment',
      'Built three pre-rendered routes with unique search and social metadata, LocalBusiness/FAQ/Breadcrumb structured data, a sitemap, robots rules, and cache headers',
      'Built an owner-managed room-availability workflow with Google Forms, Sheets, and Apps Script behind a validated Cloudflare Worker API, adding automatic expiration, edge caching, and fail-safe fallbacks without requiring code access or redeployment',
    ],
    tags: ['React', 'TypeScript', 'Google Apps Script', 'Google Sheets', 'Cloudflare Workers', 'Technical SEO'],
    image: '/ad-home-care-production.png',
    imageAlt:
      'Live A&D Home Care and Aging with Grace AFH website shown on its production domain',
    href: 'https://kingsgateafh.org',
    hrefLabel: 'Live site',
    repo: 'https://github.com/LilBum/afh-website',
    accent: 'teal',
    year: '2026',
    status: 'Live Client',
  },
  {
    title: 'Computer Vision & Robotics Research',
    category: 'Computer vision / robotics',
    role: 'Pose estimation, real-time tracking, and robot control',
    blurb:
      'A lab research pipeline that turns video into reliable motion signals for robot-driven behavioral experiments: a six-keypoint DeepLabCut model plus real-time two-object tracking designed to preserve identity through crossings, brief occlusions, and noisy detections.',
    impact: [
      'Labeled about 250 sampled frames and trained a ResNet-50 DeepLabCut model, filtering low-confidence keypoints before centroid extraction',
      'Built a threaded OpenCV pipeline using color masks, morphology, contour centroids, Kalman prediction, and gated association',
      'Validated the system during lab runs with a mobile robot, where tracking output fed downstream robot behavior',
    ],
    tags: ['Python', 'OpenCV', 'DeepLabCut', 'PyTorch', 'Robotics'],
    snippet: {
      file: 'tracker.py',
      lang: 'py',
      code: `# per-object Kalman predict, then gate + update or coast through occlusion
target.predict(dt); robot.predict(dt)

occluded = near(target.pos, robot.pos) and n_detections < 2
if not occluded:
    if gate(target, target_det): target.update(target_det)
    if gate(robot,  robot_det):  robot.update(robot_det)

steer_robot(target.pos, robot.pos)`,
    },
    uiChip: 'Begin trial',
    note: 'Lab research; raw data and full pipeline stay with the lab.',
    codeSlug: 'behavioral-tracking',
    accent: 'pink',
    status: 'Research Lab',
  },
  {
    title: 'AegisTrader Options Research System',
    category: 'Quant systems / risk engineering',
    role: 'IBKR paper bot, backtesting, and fail-closed risk controls',
    blurb:
      'A paper-only Interactive Brokers options research system that evolved from a broker-agnostic backtesting platform into a deliberately narrow, risk-first executor: SPY five-minute signals, at most one defined-risk XSP vertical, and reproducible proof artifacts instead of claimed returns.',
    impact: [
      'Evolved pluggable VWAP-pullback, opening-range, and mean-reversion research with walk-forward metrics into a focused SPY-to-XSP paper strategy',
      'Built fail-closed controls for trade, daily and weekly losses, drawdown, PDT limits, cash reserves, cooldowns, position caps, and emergency shutdown',
      'Integrated native IBKR combo orders and a proof harness that records exact-build checks, live API probes, SQLite state, and restart-survival evidence',
    ],
    tags: ['Python', 'IBKR API', 'Backtesting', 'Risk Engineering', 'SQLite'],
    snippet: {
      file: 'risk.py',
      lang: 'py',
      code: `# every entry gate appends a reason; any reason blocks the trade
if not connected:  reasons.append("BROKER_DISCONNECTED")
if not reconciled: reasons.append("BROKER_NOT_RECONCILED")
if latched:        reasons.append("RISK_LATCHED")
if account_age > MAX_ACCOUNT_AGE_SECONDS:
    reasons.append("STALE_ACCOUNT_SNAPSHOT")
if entries_today >= limits.max_entries_per_day:
    reasons.append("DAILY_ENTRY_LIMIT")

return RiskDecision(not reasons, tuple(reasons), checked_at)`,
    },
    uiChip: 'Proof run',
    repo: 'https://github.com/LilBum/Trading-Bot',
    repoLabel: 'Predecessor code',
    note: 'Paper trading only. The IBKR rebuild is private; its predecessor is public.',
    codeSlug: 'aegis-trader',
    accent: 'teal',
    year: '2026',
    status: 'Paper Research',
  },
  {
    title: 'Live Multiplayer Systems & Security',
    category: 'Systems engineering',
    role: 'Persistence, transaction integrity, anti-exploit, and a paid security audit',
    blurb:
      'Server-authoritative systems for live multiplayer games, where every client is hostile by default and a single duplication bug devalues the whole economy. Built on Roblox and Luau, but the problems are the ordinary distributed-systems ones: crash-safe locking, exactly-once writes, and transactions that survive a disconnect mid-commit.',
    impact: [
      'Built lease-based session locking over a distributed key-value store: a lock orphaned by a crashed server self-frees in about three minutes, a live session never goes stale, and a wrongful steal during an outage self-heals on the next write',
      'Made offline income credit exactly once per load under re-entrancy and clock skew, and defined prestige as the difference of a curve across lifetimes so splitting one claim into many can never mint extra value',
      'Hardened peer-to-peer trading against currency duplication, arbitrary item-ID injection, and mid-trade disconnects, re-validating both sides at commit rather than trusting the offer',
      'Replaced per-object physics with flat arrays and a spatial hash, holding 10,000 active entities at 0.78 ms of simulation per tick, roughly 30x the intended load',
    ],
    tags: ['Distributed Locking', 'Transaction Integrity', 'Anti-Exploit', 'Luau', 'Security Audit'],
    visualLabel: 'Adversarial live systems',
    snippet: {
      file: 'EconomyService.luau',
      lang: 'luau',
      code: `-- one atomic read-modify-write owns the lock and the balance,
-- so a crashed server cannot strand a profile forever
store:UpdateAsync(key, function(stored)
  local rec = if type(stored) == "table"
    then stored else defaultProfile()

  if liveForeignLock(rec.lock, sessionId) then
    blockedByLock = true
    return nil            -- abort: another server still owns it
  end

  rec.lock = { session = sessionId, at = os.time() }
  return rec
end)`,
    },
    uiChip: 'Claim reward',
    caseStudy: '#/case-study/roblox-audit',
    codeSlug: 'live-systems',
    accent: 'pink',
    year: '2026',
    note: 'Client game stays anonymized; the systems code is my own.',
    status: 'Live Systems',
  },
];
