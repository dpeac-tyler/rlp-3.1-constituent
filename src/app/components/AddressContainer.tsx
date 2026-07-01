import { useProfile } from "./ProfileContext";
import { useAgency, agencies } from "./AgencyContext";

export function AddressContainer() {
  const { businessName, mailingAddress } = useProfile();
  const { selectedAgency, setSelectedAgency } = useAgency();

  return (
    <div
      className="flex flex-col bg-white"
      style={{
        padding: "16px 16px 16px 5px",
        fontFamily: "'Public Sans', sans-serif",
        fontSize: 14,
        letterSpacing: "0.16px",
        color: "#000000",
      }}
    >
      {/* Welcome line */}
      <p
        style={{
          fontWeight: 600,
          lineHeight: "24px",
          margin: 0,
          maxWidth: "100%",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        Welcome, {businessName}
      </p>

      {/* Address */}
      <div
        className="flex flex-col"
        style={{
          fontWeight: 400,
          lineHeight: "24px",
          marginTop: 8,
        }}
      >
        <p className="truncate" style={{ margin: 0 }}>
          {mailingAddress.line1}
        </p>
        <p className="truncate" style={{ margin: 0 }}>
          {mailingAddress.city}, {mailingAddress.state} {mailingAddress.zip}
        </p>
      </div>

      {/* Switch Agency */}
      <div style={{ marginTop: 12 }}>
        <label
          htmlFor="switch-agency-select"
          style={{
            display: "block",
            fontWeight: 700,
            fontSize: 14,
            color: "#1B1B1B",
            marginBottom: 4,
          }}
        >
          Switch Agency
        </label>
        <select
          id="switch-agency-select"
          value={selectedAgency}
          onChange={(e) => setSelectedAgency(e.target.value)}
          style={{
            width: "100%",
            fontFamily: "'Public Sans', sans-serif",
            fontSize: 13,
            color: "#1B1B1B",
            backgroundColor: "#FFFFFF",
            border: "1px solid #565C65",
            borderRadius: 0,
            padding: "4px 28px 4px 8px",
            appearance: "none",
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M7 10l5 5 5-5H7z' fill='%231B1B1B'/%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 6px center",
            backgroundSize: "20px",
            cursor: "pointer",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {agencies.map((a) => (
            <option key={a.value} value={a.value}>
              {a.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
