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
  /** Internal hash route to a long-form case study page. */
  caseStudy?: string;
  /** Status line shown when there are no links (overrides the default). */
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
      'Built an AWS, Angular, and Node.js calculator that reduced a mostly manual workflow by approximately 40%',
      'Maintained 95-100% Jest coverage on owned front-end modules while modernizing legacy Java and Struts flows',
    ],
    tags: ['Angular', 'AWS', 'Node.js', 'Spring Boot', 'Jest'],
    visualLabel: 'Regulated production delivery',
    note: 'Federal client work - details kept private, including the code',
    accent: 'violet',
    year: '2023-present',
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
    note: 'Private production system - walkthrough on request',
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
    note: 'Research lab - details kept private',
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
    note: 'Independent paper research - profitability is not claimed',
    codeSlug: 'aegis-trader',
    accent: 'teal',
    year: '2026',
    status: 'Paper Research',
  },
  {
    title: 'Live-Game Audit & Remediation',
    category: 'Security consulting',
    role: 'Roblox audit, estimate, and fix pass',
    blurb:
      'A read-only security and systems audit of a live Roblox game, followed by targeted remediation for issues affecting secrets, purchases, rewards, and exploit resistance.',
    impact: [
      'Audited 296 scripts and identified leaked secrets, unsafe remotes, repeatable rewards, and broken purchase flows',
      'Delivered a phase-by-phase cleanup estimate instead of one vague project quote',
      'Shipped initial security and purchase fixes into the live game',
    ],
    tags: ['Security', 'Audit', 'Static Analysis', 'Technical Writing'],
    visualLabel: '296-script audit',
    snippet: {
      file: 'GrantItem.server.luau',
      lang: 'luau',
      code: `-- fixed grant remote from the first pass
local function onGrant(player, itemId)
  if not Catalog.Owns(player, itemId) then
    return Audit.Flag(player, itemId)
  end
  if RateLimit.Allow(player, 3) then
    Inventory.Grant(player, itemId)
  end
end
Remotes.GrantItem.OnServerEvent
  :Connect(onGrant)`,
    },
    uiChip: 'Claim item',
    caseStudy: '#/case-study/roblox-audit',
    accent: 'pink',
    year: '2026',
    status: 'Security Consulting',
  },
];
