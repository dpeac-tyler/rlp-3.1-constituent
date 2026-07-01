import { useState } from "react";
import { Link } from "react-router";

interface SubNavItemProps {
  label: string;
  to: string;
  isActive?: boolean;
  backgroundColor?: string;
  activeBackgroundColor?: string;
}

export function SubNavItem({ label, to, isActive = false, backgroundColor = "#FFFFFF", activeBackgroundColor }: SubNavItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  const showIndicator = isActive || isHovered;

  // Compute hover background — slightly darker than the base
  const hoverBg = backgroundColor === "#FFFFFF" ? "#F0F0F0" : "#D9E8EF";

  // When active with a distinct activeBackgroundColor, use a gradient:
  // base color up to the right edge of the orange bar (54 + 5 = 59px), then white after
  const activeBgWithSplit =
    isActive && activeBackgroundColor
      ? `linear-gradient(to right, ${backgroundColor} 59px, ${activeBackgroundColor} 59px)`
      : undefined;

  return (
    <Link
      to={to}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex items-center w-full no-underline"
      style={{
        height: 36,
        padding: "0 8px 0 64px",
        ...(activeBgWithSplit
          ? { background: activeBgWithSplit }
          : { backgroundColor: isHovered && !isActive ? hoverBg : backgroundColor }),
        transition: "background-color 0.15s ease",
        textDecoration: "none",
      }}
      aria-label={label}
    >
      {/* Active / hover indicator bar — orange */}
      {showIndicator && (
        <div
          className="absolute top-0 h-full"
          style={{ width: 5, left: 54, backgroundColor: "#F3B685" }}
        />
      )}

      <span
        className="truncate"
        style={{
          fontFamily: "'Public Sans', sans-serif",
          fontWeight: 600,
          fontSize: 14,
          lineHeight: "24px",
          letterSpacing: "0.16px",
          color: "rgba(0,0,0,0.87)",
        }}
      >
        {label}
      </span>
    </Link>
  );
}