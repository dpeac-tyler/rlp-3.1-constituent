interface NavDividerProps {
  label: string;
}

export function NavDivider({ label }: NavDividerProps) {
  return (
    <div className="flex flex-col bg-white" style={{ padding: "0 0 0 5px" }}>
      <span
        className="truncate"
        style={{
          fontFamily: "'Public Sans', sans-serif",
          fontWeight: 400,
          fontSize: 14,
          lineHeight: "24px",
          letterSpacing: "0.16px",
          color: "#000000",
          paddingTop: 10,
          paddingBottom: 9,
        }}
      >
        {label}
      </span>
      <div
        style={{ width: "calc(100% + 5px)", height: 1, backgroundColor: "#979797", marginLeft: -5 }}
      />
    </div>
  );
}