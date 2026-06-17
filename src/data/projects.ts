export type Accent = 'violet' | 'teal' | 'pink'

export type CodeLang = 'luau' | 'ts' | 'cs' | 'py'

export type Snippet = {
  file: string
  lang: CodeLang
  code: string
}

export type Project = {
  title: string
  category: string
  role: string
  blurb: string
  impact: string[]
  tags: string[]
  image?: string
  imageAlt?: string
  visualLabel?: string
  /** Syntax-highlighted code window shown in the card media slot (preferred over image). */
  snippet?: Snippet
  /** Label for the small mock UI button overlapping the code window. */
  uiChip?: string
  href?: string
  repo?: string
  /** Internal hash route to a long-form case study page. */
  caseStudy?: string
  /** Status line shown when there are no links (overrides the default). */
  note?: string
  /** Slug under src/content/code/* — enables the interactive source-file explorer. */
  codeSlug?: string
  accent: Accent
  year?: string
}

export const projects: Project[] = [
  {
    title: 'Pose Estimation with DeepLabCut',
    category: 'Deep learning / computer vision',
    role: 'Trained pose-estimation model for a research lab',
    blurb:
      'A DeepLabCut pose-estimation model (ResNet-50, PyTorch) trained to track a subject\'s body keypoints frame-by-frame from session video - the perception front-end for the real-time tracker.',
    impact: [
      'Labeled a 6-keypoint skeleton on ~250 k-means-sampled frames and trained a ResNet-50 pose network in DeepLabCut (PyTorch backend)',
      'Ran inference (analyze_videos) to produce per-frame keypoints and likelihoods as CSV, gated by a confidence cutoff',
      'Reduced each frame to a confidence-weighted body centroid so a few occluded joints never poison the downstream track',
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
    note: 'Research lab - details anonymized',
    codeSlug: 'pose-estimation',
    accent: 'violet',
  },
  {
    title: 'Real-Time Tracking & Robot Control',
    category: 'Computer vision / robotics',
    role: 'Real-time tracking and closed-loop robot control for a research lab',
    blurb:
      'A real-time computer-vision system that detects and tracks two moving objects on live video with Kalman filtering and occlusion handling, then autonomously steers a robot in response to their positions.',
    impact: [
      'Built an OpenCV detection pipeline (LAB/HSV color segmentation, morphology, contour centroids) on a threaded 30 FPS capture loop that never tracks a stale frame',
      'Wrote per-object constant-velocity Kalman filters with gated association and occlusion handling, so identity survives missed detections and crossings',
      'Closed the loop onto a mobile robot over a hardware interface, integrated with a Bonsai / ANY-maze pipeline; ran live where a missed detection costs research time',
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
    note: 'Research lab - details anonymized',
    codeSlug: 'behavioral-tracking',
    accent: 'pink',
  },
  {
    title: 'Algorithmic Trading System',
    category: 'Quantitative trading / automation',
    role: 'Signal engines, risk engine, execution, and backtesting',
    blurb:
      'An automated intraday options trading system: pluggable signal engines (VWAP-pullback, opening-range breakout, mean-reversion) feed a multi-layer risk engine and broker-agnostic execution, all measured with a walk-forward backtester.',
    impact: [
      'Built pluggable signal engines over intraday bars and options chains - VWAP-pullback trend entries gated by EMA, VWAP-slope, momentum, and time-of-day/chop filters',
      'Engineered a multi-layer risk engine: ATR/premium position sizing, volatility-adjusted risk, daily-loss lockouts, post-loss cooldowns, throttles, duplicate-order guards, and a kill switch',
      'Wired broker-agnostic execution (Webull/IBKR/Tradier/paper) with bracket orders, event journaling, and reconciliation; validated with a walk-forward backtester (Sharpe, drawdown, profit factor)',
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
    note: 'Personal project - walkthrough available on request',
    codeSlug: 'autonomous-trading',
    accent: 'teal',
    year: '2026',
  },
  {
    title: 'FSA Debt Consolidation Platform',
    category: 'Enterprise software',
    role: 'Full-stack engineer at TSPi',
    blurb:
      'Production Angular/AWS work for federally regulated loan systems used by Farm Service Agency staff and applicants.',
    impact: [
      'Built forms and pages used daily by 1,500+ users',
      'Contributed to a debt-consolidation system presented to senior FSA and congressional stakeholders',
      'Maintained 95-100% unit test coverage across multiple modules',
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
    title: 'Live-Game Audit & Remediation',
    category: 'Security consulting',
    role: 'Read-only technical audit, priced fix plan, and first fix pass',
    blurb:
      'A full review of a live, monetized Roblox horror experience (client name withheld) covering security, the economy, paid-feature delivery, persistence, and a large legacy layer.',
    impact: [
      'Reviewed 296 scripts and traced most live bugs to the seam between modern code and 54 disabled legacy scripts',
      'Found a token-leaking webhook, an arbitrary item-cloning remote, a repeatable currency farm, and paid features that never delivered',
      'Phased every fix with effort and price (~$5k-$10k full scope), then shipped the critical security and paid-delivery groups live',
    ],
    tags: ['Security', 'Audit', 'Static Analysis', 'Technical Writing'],
    visualLabel: '296 scripts audited',
    snippet: {
      file: 'GrantItem.server.luau',
      lang: 'luau',
      code: `-- hardened remote from the fix pass
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
    title: 'This Website',
    category: 'Web frontend',
    role: 'Design system, motion engineering, and content pipeline',
    blurb:
      'The site you are reading: a data-driven React portfolio with a token-based design system, scroll-linked SVG motion, and syntax-highlighted code-window cards.',
    impact: [
      'Built a scroll-tracking gradient trail with a spring-driven comet head - and debugged a renderer-freezing SVG blur into a layered-stroke glow',
      'Three-typeface system (Inter, Space Grotesk, JetBrains Mono) with scroll-aware nav, count-up stats, and reveal choreography',
      'All content lives in typed data files; cards, snippets, and source explorers render from them',
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
]
