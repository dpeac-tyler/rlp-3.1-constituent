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
            fontWeight: 600,
            fontSize: 12,
            letterSpacing: "0.08px",
            color: "#565C65",
            marginBottom: 4,
            textTransform: "uppercase",
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
            backgroundColor: "#F0F0F0",
            border: "1px solid #C9C9C9",
            borderRadius: 4,
            padding: "4px 28px 4px 8px",
            appearance: "auto",
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
