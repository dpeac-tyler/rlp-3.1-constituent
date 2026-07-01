import { useState, useEffect } from "react";
import { Download, ExternalLink, Eye, Minus, Plus, UserPen } from "lucide-react";
import { useIsMobile } from "../hooks/useIsMobile";

const SESSION_KEY = "icon-key-accordion-open";

interface IconItem {
  icon: React.ReactNode;
  label: string;
}

const DEFAULT_ITEMS: IconItem[] = [
  {
    icon: <Download size={16} color="#FFFFFF" />,
    label: "Download Certificate",
  },
  {
    icon: <ExternalLink size={16} color="#FFFFFF" />,
    label: "Renew Now",
  },
  {
    icon: <Eye size={16} color="#FFFFFF" />,
    label: "View Submission",
  },
  {
    icon: <UserPen size={16} color="#FFFFFF" />,
    label: "Reassign Applicant",
  },
];

interface IconKeyAccordionProps {
  items?: IconItem[];
  sessionKey?: string;
  defaultOpen?: boolean;
}

export function IconKeyAccordion({ items, sessionKey, defaultOpen = true }: IconKeyAccordionProps) {
  const storageKey = sessionKey || SESSION_KEY;
  const iconItems = items || DEFAULT_ITEMS;
  const isMobile = useIsMobile();

  const [isOpen, setIsOpen] = useState(() => {
    const stored = sessionStorage.getItem(storageKey);
    return stored === null ? defaultOpen : stored === "true";
  });

  useEffect(() => {
    sessionStorage.setItem(storageKey, String(isOpen));
  }, [isOpen, storageKey]);

  return (
    <div style={{ width: "100%", marginTop: 30, marginBottom: 30 }}>
      {/* Accordion Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#F0F0F0",
          borderTopWidth: 0,
          borderTopStyle: "none",
          borderTopColor: "transparent",
          borderRightWidth: 0,
          borderRightStyle: "none",
          borderRightColor: "transparent",
          borderBottomWidth: isOpen ? 1 : 0,
          borderBottomStyle: isOpen ? "solid" : "none",
          borderBottomColor: isOpen ? "#A9AEB1" : "transparent",
          borderLeftWidth: 0,
          borderLeftStyle: "none",
          borderLeftColor: "transparent",
          padding: "12px 16px",
          cursor: "pointer",
          fontFamily: "'Public Sans', sans-serif",
          fontWeight: 700,
          fontSize: 16,
          lineHeight: "24px",
          color: "#1B1B1B",
          textAlign: "left",
        }}
      >
        Icon Key
        {isOpen ? (
          <Minus size={20} color="#1B1B1B" />
        ) : (
          <Plus size={20} color="#1B1B1B" />
        )}
      </button>

      {/* Accordion Content */}
      {isOpen && (
        <div
          style={{
            backgroundColor: "#FFFFFF",
            borderTopWidth: 0,
            borderTopStyle: "none",
            borderTopColor: "transparent",
            borderRightWidth: 5,
            borderRightStyle: "solid",
            borderRightColor: "#F0F0F0",
            borderBottomWidth: 5,
            borderBottomStyle: "solid",
            borderBottomColor: "#F0F0F0",
            borderLeftWidth: 5,
            borderLeftStyle: "solid",
            borderLeftColor: "#F0F0F0",
            padding: "20px 16px",
          }}
        >
          <p
            style={{
              fontFamily: "'Public Sans', sans-serif",
              fontWeight: 700,
              fontSize: 14,
              lineHeight: "20px",
              color: "#1B1B1B",
              margin: "0 0 16px 0",
            }}
          >
            Options and Control Types
          </p>

          {/* 4-column icon grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
              gap: "12px 16px",
            }}
          >
            {iconItems.map((item) => (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    minWidth: 28,
                    backgroundColor: "#162E51",
                    borderRadius: 4,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </div>
                <span
                  style={{
                    fontFamily: "'Public Sans', sans-serif",
                    fontSize: 14,
                    lineHeight: "20px",
                    color: "#1B1B1B",
                  }}
                >
                  - {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}