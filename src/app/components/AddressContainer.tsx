import { useProfile } from "./ProfileContext";

export function AddressContainer() {
  const { businessName, mailingAddress } = useProfile();

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
    </div>
  );
}
