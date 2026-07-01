import { useNavigate } from "react-router";
import menuSvgPaths from "../../imports/svg-653nymfya0";
import logoSvgPaths from "../../imports/svg-hjn6k2buyk";
import { useIsMobile } from "../hooks/useIsMobile";

interface HeaderProps {
  isAddressVisible: boolean;
  onToggleAddress: () => void;
}

export function Header({ isAddressVisible, onToggleAddress }: HeaderProps) {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  return (
    <header
      className="w-full"
      style={{ backgroundColor: "rgba(22,47,82,0.96)", height: 56 }}
    >
      <div className="flex items-center justify-between w-full h-full">
        {/* Left side: Menu, Logo, Agency Name */}
        <div className="flex items-center h-full">
          {/* Menu - toggles address container */}
          <button
            onClick={onToggleAddress}
            className="flex items-center justify-center h-full cursor-pointer border-none"
            style={{
              paddingLeft: 15,
              paddingRight: 15,
              backgroundColor: isAddressVisible
                ? "rgba(255,255,255,0.15)"
                : "transparent",
              transition: "background-color 0.2s ease",
            }}
            aria-label={isAddressVisible ? "Collapse address panel" : "Expand address panel"}
          >
            <svg
              width="18"
              height="12"
              viewBox="0 0 18 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d={menuSvgPaths.p3d5c2d00}
                fill="white"
                fillRule="evenodd"
              />
            </svg>
          </button>

          {/* Logo — clickable, navigates to Home */}
          <div
            className="flex items-center justify-center h-full"
            style={{ paddingLeft: 20, paddingRight: 20, cursor: "pointer" }}
            onClick={() => navigate("/")}
            role="link"
            tabIndex={0}
            aria-label="Go to Home"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                navigate("/");
              }
            }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32.0006 32.0001"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path clipRule="evenodd" d={logoSvgPaths.p178e8b80} fill="white" fillRule="evenodd" />
                <path clipRule="evenodd" d={logoSvgPaths.p29d23b80} fill="white" fillRule="evenodd" />
                <path clipRule="evenodd" d={logoSvgPaths.p2330dd80} fill="white" fillRule="evenodd" />
                <path clipRule="evenodd" d={logoSvgPaths.p3df9e080} fill="white" fillRule="evenodd" />
                <path clipRule="evenodd" d={logoSvgPaths.p33e41300} fill="white" fillRule="evenodd" />
                <path clipRule="evenodd" d={logoSvgPaths.p388cb480} fill="white" fillRule="evenodd" />
                <path clipRule="evenodd" d={logoSvgPaths.p13a74500} fill="white" fillRule="evenodd" />
                <path clipRule="evenodd" d={logoSvgPaths.p2148c840} fill="white" fillRule="evenodd" />
                <path clipRule="evenodd" d={logoSvgPaths.p33a0c100} fill="white" fillRule="evenodd" />
                <path clipRule="evenodd" d={logoSvgPaths.p363b7840} fill="white" fillRule="evenodd" />
                <path clipRule="evenodd" d={logoSvgPaths.p13207f00} fill="white" fillRule="evenodd" />
                <path clipRule="evenodd" d={logoSvgPaths.p1d239800} fill="white" fillRule="evenodd" />
                <path clipRule="evenodd" d={logoSvgPaths.pc4607f0} fill="white" fillRule="evenodd" />
                <path clipRule="evenodd" d={logoSvgPaths.p8a87100} fill="white" fillRule="evenodd" />
              </g>
            </svg>
          </div>

          {/* Agency Name */}
          <div className="flex items-center h-full">
            <p
              className="text-white"
              style={{
                fontFamily: "'Public Sans', sans-serif",
                fontWeight: 500,
                fontSize: isMobile ? 14 : 20,
                lineHeight: isMobile ? "20px" : "32px",
                letterSpacing: "0.25px",
              }}
            >
              Name of Tenant
            </p>
          </div>
        </div>

        {/* Right side: nav links */}
        <div className="flex items-center h-full" style={{ gap: 0, marginRight: 20 }}>
          {[
            { label: "State Portal", to: "/" },
            { label: "Account", to: "/account" },
            { label: "Logout", to: "/" },
          ].map(({ label, to }, i) => (
            <div key={label} className="flex items-center">
              {i > 0 && (
                <span style={{ color: "rgba(255,255,255,0.5)", margin: "0 12px", fontSize: 14 }}>|</span>
              )}
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); navigate(to); }}
                style={{
                  fontFamily: "'Public Sans', sans-serif",
                  fontSize: 14,
                  fontWeight: 400,
                  color: "#FFFFFF",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
                onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
              >
                {label}
              </a>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}