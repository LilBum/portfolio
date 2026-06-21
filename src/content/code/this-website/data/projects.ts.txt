export type Accent = 'violet' | 'teal' | 'pink';

export type CodeLang = 'luau' | 'ts' | 'cs' | 'py';

export type Snippet = {
  file: string;
  lang: CodeLang;
  code: string;
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
  href?: string;
  repo?: string;
  /** Internal hash route to a long-form case study page. */
  caseStudy?: string;
  /** Status line shown when there are no links (overrides the default). */
  note?: string;
  /** Slug under src/content/code/* - enables the interactive source-file explorer. */
  codeSlug?: string;
  accent: Accent;
  year?: string;
};

export const projects: Project[] = [
  {
    title: 'FSA Debt Consolidation Platform',
    category: 'Production software',
    role: 'Angular/AWS loan-software work',
    blurb:
      'Production loan-software work for a federally regulated application: validations, legacy flows, edge cases, tests, and the details that keep real workflows reliable.',
    impact: [
      'Built Angular forms and pages used by 1,500+ FSA staff and applicants',
      'Shipped debt-consolidation screens demoed to senior FSA staff and congressional contacts',
      'Maintained 95-100% Jest coverage on front-end modules I owned',
    ],
    tags: ['Angular', 'AWS', 'Node.js', 'Jest'],
    visualLabel: '1,500+ daily users',
    snippet: {
      file: 'loan-form.component.ts',
      lang: 'ts',
      code: `readonly loanForm = this.fb.group({
  principal: [0, Validators.min(1)],
  termMonths: [12, monthRange(6, 480)],
})

submit() {
  if (this.loanForm.invalid) return
  const dto = this.loanForm.getRawValue()
  this.api.consolidate(dto)
    .subscribe(p => this.go('/plan', p.id))
}`,
    },
    uiChip: 'Calculate plan',
    accent: 'violet',
    year: '2023-present',
  },
  {
    title: 'Real-Time Tracking & Robot Control',
    category: 'Computer vision / robotics',
    role: 'OpenCV tracking that feeds robot control',
    blurb:
      'A real-time tracking pipeline for two moving objects, designed to preserve identity through crossings, brief occlusions, and noisy detections. Tracking errors directly affect robot behavior, so reliability matters.',
    impact: [
      'Built color-mask, morphology, contour-centroid, and threaded camera-capture pipeline',
      'Used Kalman prediction with gated association to handle crossings and short occlusions',
      'Validated during lab runs with a mobile robot rather than only saved-video demos',
    ],
    tags: ['Python', 'OpenCV', 'Kalman Filters', 'Robotics', 'Bonsai'],
    visualLabel: 'Live two-object tracking',
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
  },
  {
    title: 'Pose Estimation with DeepLabCut',
    category: 'Deep learning / computer vision',
    role: 'DeepLabCut work from lab video',
    blurb:
      'A pose-estimation workflow built from lab video: hand-labeling, DeepLabCut training, confidence filtering, and centroid extraction for downstream behavioral tracking.',
    impact: [
      'Labeled about 250 sampled frames across a six-keypoint skeleton',
      'Trained a ResNet-50 DeepLabCut model and checked output confidence frame by frame',
      'Computed centroids from trusted keypoints so hidden or low-confidence body points would not corrupt tracking',
    ],
    tags: ['Python', 'DeepLabCut', 'PyTorch', 'ResNet-50', 'Pose Estimation'],
    visualLabel: '6-keypoint pose model',
    snippet: {
      file: 'pose.py',
      lang: 'py',
      code: `# trained DeepLabCut model -> per-frame keypoints -> centroid
deeplabcut.analyze_videos(cfg, [video], shuffle=1, save_as_csv=True)

pose = read_pose_csv(out_csv)            # x, y, likelihood per keypoint
good = [(x, y) for x, y, p in pose[frame] if p >= 0.6]
cx, cy = centroid(good)                  # confident keypoints only
return Detection(cx, cy)`,
    },
    uiChip: 'Track pose',
    note: 'Research lab - details kept private',
    codeSlug: 'pose-estimation',
    accent: 'violet',
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
  },
  {
    title: 'Algorithmic Trading System',
    category: 'Quantitative trading / automation',
    role: 'Options experiments with risk controls',
    blurb:
      'An intraday options research system for testing strategies before any live execution. The signal layer is intentionally smaller than the risk layer, with controls for sizing, loss limits, order duplication, and shutdown behavior.',
    impact: [
      'Tested VWAP pullbacks, opening-range breakouts, and mean-reversion ideas on intraday data',
      'Implemented daily-loss stops, cooldowns, duplicate-order checks, sizing caps, and a kill switch',
      'Built paper/live adapters, bracket orders, logs, reconciliation, and walk-forward testing workflow',
    ],
    tags: ['Python', 'Options', 'Backtesting', 'Risk Engine'],
    snippet: {
      file: 'risk.py',
      lang: 'py',
      code: `# size by risk budget, then cap by premium and hard limits
risk_per_contract = option_mid * 100 * premium_stop_pct
contracts = floor(account_equity * risk_pct / risk_per_contract)
contracts = min(contracts, max_by_premium, max_contracts)

if contracts <= 0:
    return reject("risk_budget_too_small")
if realized_pnl <= -max_daily_loss:
    return reject("daily_loss_lockout")
submit_bracket(order, contracts)`,
    },
    uiChip: 'Place order',
    note: 'Independent project - walkthrough on request',
    codeSlug: 'autonomous-trading',
    accent: 'teal',
    year: '2026',
  },
  {
    title: 'This Website',
    category: 'Web frontend',
    role: 'React site and source viewer',
    blurb:
      'A portfolio site built to make technical work visible without forcing visitors to leave for GitHub. Project data, code snippets, and source walkthroughs are built directly into the experience.',
    impact: [
      'Built scroll trail, nav behavior, count-up stats, reveal animations, and project cards',
      'Removed heavy SVG blur after profiling scroll performance and identifying sticky rendering behavior',
      'Kept project data, snippets, and source-explorer content in typed files for easier maintenance',
    ],
    tags: ['React', 'TypeScript', 'Tailwind v4', 'Framer Motion'],
    visualLabel: 'You are here',
    snippet: {
      file: 'ScrollTrail.tsx',
      lang: 'ts',
      code: `const { scrollYProgress } = useScroll()
const spring = useSpring(scrollYProgress, {
  stiffness: 500,
  damping: 90,
})

const place = (v: number) => {
  const pt = path.getPointAtLength(v * total)
  headX.set(pt.x)
  headY.set(pt.y)
}
spring.on("change", place)`,
    },
    uiChip: 'You are here',
    note: 'Live - you are browsing it',
    codeSlug: 'this-website',
    accent: 'teal',
    year: '2026',
  },
];
