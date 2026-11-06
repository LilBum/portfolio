import type { Project } from '../../data/projects'

const ink = '#1c2030'
const paper = '#faf8f1'
const blue = '#284ee7'
const amber = '#f4b353'
const coral = '#f49b8d'

function LendingCover() {
  return (
    <svg className="lending-illustration" viewBox="0 0 560 320" role="img" aria-label="Illustration of stacked loan forms with branching role and policy decisions">
      <defs>
        <pattern id="loan-screenprint" width="7" height="7" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1" fill="#a2b1ff" />
        </pattern>
        <pattern id="loan-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(38)">
          <path d="M0 0V6" stroke={ink} strokeWidth="2" />
        </pattern>
      </defs>
      <path d="M-10 147 182-12H-10Zm570 47-158 126h158Z" fill="url(#loan-screenprint)" />
      <g className="loan-stack">
        <g transform="translate(11 12) rotate(-15 274 151)">
          <rect x="110" y="49" width="333" height="209" fill={ink} />
          <rect x="105" y="44" width="333" height="209" fill={amber} stroke={ink} strokeWidth="2.2" />
          <rect x="110" y="49" width="323" height="199" fill="url(#loan-hatch)" />
        </g>
        <g transform="rotate(8 285 164)">
          <rect x="130" y="53" width="320" height="222" fill={ink} />
          <rect x="126" y="49" width="320" height="222" fill="#b1beff" stroke={ink} strokeWidth="2.2" />
        </g>
        <g className="loan-front" transform="rotate(-4 283 152)">
          <rect x="122" y="54" width="326" height="211" fill={ink} />
          <rect x="117" y="49" width="326" height="211" fill={paper} stroke={ink} strokeWidth="2.5" />
          <path d="M139 50v209" stroke={ink} strokeWidth="1.2" strokeDasharray="3 4" />
          {[70, 99, 128, 157, 186, 215, 244].map((y) => (
            <circle key={y} cx="128" cy={y} r="3.3" fill={blue} stroke={ink} strokeWidth="1" />
          ))}
          <text x="155" y="85" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="25" letterSpacing="-1.2" fill={ink}>Loan workflow</text>
          <path d="M156 100H421" stroke={ink} strokeWidth="2" />
          <g fill="none" stroke={ink} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M284 140v19m0 0h-66v18m66-18h66v18" />
            <path d="m214 174 4 5 4-5m124 0 4 5 4-5" />
            <path d="M218 205v16h132v-16m-66 16v13" />
          </g>
          <rect x="240" y="115" width="88" height="25" rx="13" fill={blue} stroke={ink} strokeWidth="1.8" />
          <g fontFamily="Arial, sans-serif" textAnchor="middle" fontSize="14" fontWeight="700">
            <text x="284" y="132" fill="white">Loan</text>
            <rect x="175" y="180" width="86" height="25" fill={amber} stroke={ink} strokeWidth="1.8" />
            <text x="218" y="197" fill={ink}>Role</text>
            <rect x="307" y="180" width="86" height="25" fill={coral} stroke={ink} strokeWidth="1.8" />
            <text x="350" y="197" fill={ink}>Policy</text>
          </g>
          <circle cx="284" cy="237" r="5" fill={ink} />
        </g>
      </g>
    </svg>
  )
}

function SmallPrint({ kind }: { kind: Project['art'] }) {
  return (
    <svg viewBox="0 0 128 84" aria-hidden className={`project-print print-${kind}`}>
      {kind === 'listing' && (
        <g stroke={ink} strokeWidth="2" strokeLinejoin="round" transform="rotate(-12 64 42)">
          <path d="M22 28h67l16 16-16 16H22z" fill={ink} />
          <path d="M18 24h67l16 16-16 16H18z" fill={paper} />
          <path d="M24 15h63l16 16-16 16H24z" fill={amber} />
          <circle cx="88" cy="31" r="3" fill={ink} />
          <path d="M34 25h31m-31 8h20" fill="none" />
        </g>
      )}
      {kind === 'trading' && (
        <g stroke={ink} strokeWidth="2.4" strokeLinejoin="round">
          <path d="M10 59h34V25h31v21h39" fill="none" />
          <path d="m64 46 11-11 11 11-11 11Z" fill={amber} />
          <rect x="93" y="31" width="8" height="29" fill={paper} />
          <rect x="106" y="31" width="8" height="29" fill={paper} />
          <circle cx="17" cy="59" r="5" fill={ink} />
        </g>
      )}
      {kind === 'multiplayer' && (
        <g stroke={ink} strokeWidth="2.2" strokeLinejoin="round">
          <g transform="translate(12 10)">
            <path d="m0 19 19-9 19 9-19 10Z" fill={amber} />
            <path d="m0 19 19 10v20L0 39Z" fill={paper} />
            <path d="m19 29 19-10v20l-19 10Z" fill={coral} />
          </g>
          <g transform="translate(76 19)">
            <path d="m0 19 19-9 19 9-19 10Z" fill={amber} />
            <path d="m0 19 19 10v20L0 39Z" fill={paper} />
            <path d="m19 29 19-10v20l-19 10Z" fill={coral} />
          </g>
          <path d="M49 24h25m-5-5 5 5-5 5m4 33H48m5-5-5 5 5 5" fill="none" />
        </g>
      )}
    </svg>
  )
}

export default function ProjectArt({ project }: { project: Project }) {
  if (project.art === 'lending') {
    return <div className="project-cover cover-lending"><LendingCover /></div>
  }
  if (project.art === 'homes' && project.image) {
    return (
      <div className="project-cover cover-homes">
        <span className="home-print">
          <img src={project.image.src} alt={project.image.alt} width="1440" height="900" loading="lazy" decoding="async" />
        </span>
      </div>
    )
  }
  return <SmallPrint kind={project.art} />
}
