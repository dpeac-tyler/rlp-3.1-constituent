import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import svgPaths from "../../imports/svg-pv8b1hzdg1";

/* ── Types ──────────────────────────────────────────────── */

interface ToastItem {
  id: number;
  message: string;
}

interface ToastContextValue {
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue>({
  showToast: () => {},
});

export const useToast = () => useContext(ToastContext);

/* ── Longhand border helpers ───────────────────────────── */

const noBorder: React.CSSProperties = {
  borderTopWidth: 0,
  borderTopStyle: "solid",
  borderTopColor: "transparent",
  borderRightWidth: 0,
  borderRightStyle: "solid",
  borderRightColor: "transparent",
  borderBottomWidth: 0,
  borderBottomStyle: "solid",
  borderBottomColor: "transparent",
  borderLeftWidth: 0,
  borderLeftStyle: "solid",
  borderLeftColor: "transparent",
};

/* ── Single Toast ───────────────────────────────────────── */

function Toast({
  message,
  onDone,
}: {
  message: string;
  onDone: () => void;
}) {
  const [visible, setVisible] = useState(false);
  const nodeRef = useRef<HTMLDivElement>(null);

  /* Slide in after mount */
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setVisible(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  /* After slide-in completes, wait 4s then slide out */
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => {
      setVisible(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, [visible]);

  /* After slide-out transition ends, remove */
  const handleTransitionEnd = () => {
    if (!visible) {
      onDone();
    }
  };

  return (
    <div
      ref={nodeRef}
      onTransitionEnd={handleTransitionEnd}
      style={{
        position: "fixed",
        top: 30,
        left: 20,
        zIndex: 9999,
        transform: visible ? "translateX(0)" : "translateX(-110%)",
        opacity: visible ? 1 : 0,
        transition:
          "transform 0.45s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.45s ease",
        display: "flex",
        flexDirection: "row",
        alignItems: "stretch",
        width: 364,
        minHeight: 65,
        filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.15))",
      }}
    >
      {/* Green left bar */}
      <div
        style={{
          width: 8,
          flexShrink: 0,
          backgroundColor: "#00A91C",
          ...noBorder,
        }}
      />

      {/* Content area */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#ECF3EC",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          padding: "12px 16px",
          ...noBorder,
        }}
      >
        {/* Checkmark icon */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          style={{ flexShrink: 0 }}
        >
          <path
            clipRule="evenodd"
            d={svgPaths.p1a707180}
            fill="#1B1B1B"
            fillRule="evenodd"
          />
        </svg>

        {/* Message text */}
        <span
          style={{
            fontFamily: "'Public Sans', 'Public Sans', sans-serif",
            fontSize: 16,
            lineHeight: 1.5,
            color: "#1B1B1B",
          }}
        >
          {message}
        </span>
      </div>
    </div>
  );
}

/* ── Provider ───────────────────────────────────────────── */

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const idRef = useRef(0);

  const showToast = useCallback((message: string) => {
    const id = ++idRef.current;
    setToasts((prev) => [...prev, { id, message }]);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toasts.map((t) => (
        <Toast key={t.id} message={t.message} onDone={() => removeToast(t.id)} />
      ))}
    </ToastContext.Provider>
  );
}
