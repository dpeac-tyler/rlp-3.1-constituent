import { motion } from "motion/react";
import heroBg from "@/assets/28c9e8735508f793aebc982b410fd632f2bdc8d0.png";
import { useIsMobile } from "../hooks/useIsMobile";

interface PageShellProps {
  title: React.ReactNode;
  children: React.ReactNode;
  heroHeight?: number;
  titleStyle?: React.CSSProperties;
  titleRight?: React.ReactNode;
}

export function PageShell({ title, children, heroHeight = 80, titleStyle, titleRight }: PageShellProps) {
  const isMobile = useIsMobile();

  return (
    <>
      {/* Hero banner with background image */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          height: heroHeight,
          backgroundColor: "#E0EDF5",
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "left center",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: `0 ${isMobile ? 16 : 35}px`,
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{
            fontFamily: "'Public Sans', sans-serif",
            color: "#1B1B1B",
            margin: 0,
            ...titleStyle,
          }}
        >
          {title}
        </motion.h1>
        {titleRight && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {titleRight}
          </motion.div>
        )}
      </div>

      {/* Content area below hero */}
      <motion.div
        className="flex-1"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: "easeOut", delay: 0.05 }}
        style={{ backgroundColor: "#FAFAFA", padding: isMobile ? 12 : 20 }}
      >
        {children}
      </motion.div>
    </>
  );
}
