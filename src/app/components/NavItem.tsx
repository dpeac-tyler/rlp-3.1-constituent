import { useState } from "react";
import { Link } from "react-router";
import svgPaths from "../../imports/svg-g84crqycoi";

interface NavItemProps {
  label: string;
  isActive?: boolean;
  isExpanded: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
  backgroundColor?: string;
  highlighted?: boolean;
  to?: string;
  /** Show a small indicator that this item has sub-navigation */
  hasSubNav?: boolean;
}

export function NavItem({
  label,
  isActive = false,
  isExpanded,
  icon,
  onClick,
  backgroundColor,
  highlighted = false,
  to,
  hasSubNav = false,
}: NavItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  const showIndicator = isActive || isHovered;

  // When highlighted (onboarding), use the info-lighter wash as base
  const defaultBg = highlighted ? "#E7F6F8" : (backgroundColor ?? "#ffffff");
  const bgColor = isHovered && !isActive
    ? "#F0F0F0"
    : defaultBg;

  const content = (
    <>
      {/* Active / hover indicator bar */}
      {showIndicator && (
        <div
          className="absolute left-0 top-0 h-full"
          style={{ width: 5, backgroundColor: "#015FA2" }}
        />
      )}

      {/* Icon area — always 50px wide, icon centered */}
      <div
        className="flex items-center justify-center flex-shrink-0"
        style={{ width: 50, height: 44, position: "relative" }}
      >
        {icon ?? (
          <svg
            width="24"
            height="20"
            viewBox="5 4 44 37"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d={svgPaths.p304e1300} fill="#757575" />
          </svg>
        )}
        {/* Sub-nav indicator dot — only when collapsed */}
        {hasSubNav && !isExpanded && (
          <div
            style={{
              position: "absolute",
              bottom: 6,
              right: 8,
              width: 6,
              height: 6,
              borderRadius: "50%",
              backgroundColor: isActive ? "#015FA2" : "#A9AEB1",
            }}
          />
        )}
      </div>

      {/* Label — only visible when expanded */}
      {isExpanded && (
        <span
          className="truncate text-left"
          style={{
            fontFamily: "'Public Sans', sans-serif",
            fontWeight: 600,
            fontSize: 14,
            lineHeight: "24px",
            letterSpacing: "0.16px",
            color: "#000000",
            marginLeft: 14,
          }}
        >
          {label}
        </span>
      )}
    </>
  );

  if (to) {
    return (
      <Link
        to={to}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative flex items-center w-full border-none cursor-pointer no-underline"
        style={{
          height: 44,
          padding: 0,
          backgroundColor: bgColor,
          transition: "background-color 0.15s ease",
          textDecoration: "none",
        }}
        aria-label={label}
        title={!isExpanded ? label : undefined}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex items-center w-full border-none cursor-pointer"
      style={{
        height: 44,
        padding: 0,
        backgroundColor: bgColor,
        transition: "background-color 0.15s ease",
      }}
      aria-label={label}
      title={!isExpanded ? label : undefined}
    >
      {content}
    </button>
  );
}