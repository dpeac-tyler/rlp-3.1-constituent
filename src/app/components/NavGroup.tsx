import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

interface NavGroupProps {
  /** The NavItem element (parent) */
  navItem: React.ReactNode;
  /** The SubNavItem elements (children) */
  subNavItems?: React.ReactNode;
  /** Whether the sidebar is expanded */
  isExpanded: boolean;
  /** Whether the parent nav section is active (route matches) */
  isSectionActive: boolean;
  /** Label shown at the top of the flyout */
  flyoutLabel: string;
}

export function NavGroup({
  navItem,
  subNavItems,
  isExpanded,
  isSectionActive,
  flyoutLabel,
}: NavGroupProps) {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const flyoutRef = useRef<HTMLDivElement>(null);
  const [flyoutPos, setFlyoutPos] = useState<{ top: number; left: number } | null>(null);

  // Show flyout when collapsed, section is active (has sub-nav), and hovered
  const showFlyout = !isExpanded && isSectionActive && isHovered && !!subNavItems;

  useEffect(() => {
    if (showFlyout && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setFlyoutPos({
        top: rect.top,
        left: rect.right,
      });
    }
  }, [showFlyout]);

  // Close flyout when mouse leaves both the nav item and the flyout
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = (e: React.MouseEvent) => {
    const related = e.relatedTarget;
    if (
      related instanceof Node &&
      (flyoutRef.current?.contains(related) ||
        containerRef.current?.contains(related))
    ) {
      return;
    }
    setIsHovered(false);
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {navItem}
      {/* Expanded mode: render sub-nav inline as before */}
      {isExpanded && isSectionActive && subNavItems}

      {/* Collapsed mode: render flyout via portal */}
      {showFlyout &&
        flyoutPos &&
        createPortal(
          <div
            ref={flyoutRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              position: "fixed",
              top: flyoutPos.top,
              left: flyoutPos.left,
              zIndex: 9999,
              minWidth: 220,
              backgroundColor: "#FFFFFF",
              borderTopWidth: 1,
              borderTopStyle: "solid",
              borderTopColor: "#e0e0e0",
              borderRightWidth: 1,
              borderRightStyle: "solid",
              borderRightColor: "#e0e0e0",
              borderBottomWidth: 1,
              borderBottomStyle: "solid",
              borderBottomColor: "#e0e0e0",
              borderLeftWidth: 0,
              borderLeftStyle: "none",
              borderLeftColor: "transparent",
              borderRadius: "0 4px 4px 0",
              boxShadow: "2px 2px 8px rgba(0,0,0,0.15)",
              paddingTop: 0,
              paddingBottom: 4,
            }}
          >
            {/* Flyout header */}
            <div
              style={{
                padding: "10px 16px 6px 16px",
                fontFamily: "'Public Sans', sans-serif",
                fontWeight: 600,
                fontSize: 14,
                lineHeight: "24px",
                letterSpacing: "0.16px",
                color: "#1B1B1B",
                borderBottomWidth: 1,
                borderBottomStyle: "solid",
                borderBottomColor: "#e0e0e0",
                borderTopWidth: 0,
                borderTopStyle: "none",
                borderTopColor: "transparent",
                borderRightWidth: 0,
                borderRightStyle: "none",
                borderRightColor: "transparent",
                borderLeftWidth: 0,
                borderLeftStyle: "none",
                borderLeftColor: "transparent",
                marginBottom: 4,
              }}
            >
              {flyoutLabel}
            </div>
            {/* Sub-nav items rendered in flyout — override padding for flyout context */}
            <div className="nav-group-flyout-items">
              {subNavItems}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}