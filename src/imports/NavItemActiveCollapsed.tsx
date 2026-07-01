import svgPaths from "./svg-g84crqycoi";

export default function NavItemActiveCollapsed() {
  return (
    <div className="relative size-full" data-name="nav-item - active - collapsed">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 50 44">
        <g id="nav-item - active - collapsed">
          <rect fill="white" height="44" width="50" />
          <path d={svgPaths.p304e1300} fill="var(--fill-0, #757575)" id="home logo" />
          <rect fill="var(--fill-0, #015FA2)" height="44" id="active-indicator" width="5" />
        </g>
      </svg>
    </div>
  );
}