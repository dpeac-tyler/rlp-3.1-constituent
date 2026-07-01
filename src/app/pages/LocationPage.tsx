import { useState } from "react";
import { PageShell } from "../components/PageShell";
import { X } from "lucide-react";
import { useProfile } from "../components/ProfileContext";
import { useIsMobile } from "../hooks/useIsMobile";
import { useToast } from "../components/ToastContext";

interface Address {
  line1: string;
  line2: string;
  city: string;
  state: string;
  county: string;
  zip: string;
}

const initialAddresses: Record<string, Address> = {
  mailing: {
    line1: "1 Rocket Road",
    line2: "Suite 200",
    city: "Hawthorne",
    state: "California",
    county: "Los Angeles",
    zip: "90250",
  },
  physical: {
    line1: "3500 Deer Creek Road",
    line2: "",
    city: "Palo Alto",
    state: "California",
    county: "",
    zip: "94304",
  },
  billing: {
    line1: "1 Rocket Road",
    line2: "Attn: Accounts Payable",
    city: "Hawthorne",
    state: "California",
    county: "Los Angeles",
    zip: "90250",
  },
};

const tabs = [
  { key: "mailing", label: "Mailing Address" },
  { key: "physical", label: "Physical Address" },
  { key: "billing", label: "Billing Address" },
];

const stateOptions = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
  "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
  "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
  "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
  "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
  "New Hampshire", "New Jersey", "New Mexico", "New York",
  "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
  "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
  "West Virginia", "Wisconsin", "Wyoming",
];

const labelStyle: React.CSSProperties = {
  fontFamily: "'Public Sans', sans-serif",
  fontSize: 16,
  lineHeight: "24px",
  fontWeight: 700,
  color: "#1B1B1B",
  marginBottom: 4,
  display: "block",
};

const inputStyle: React.CSSProperties = {
  fontFamily: "'Public Sans', sans-serif",
  fontSize: 16,
  lineHeight: "24px",
  padding: "8px 12px",
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "#565C65",
  borderRadius: 4,
  color: "#1B1B1B",
  backgroundColor: "#FFFFFF",
  width: "100%",
  boxSizing: "border-box",
  outline: "none",
};

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  appearance: "none" as const,
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1.41 0L6 4.58 10.59 0 12 1.41l-6 6-6-6z' fill='%23565C65'/%3E%3C/svg%3E\")",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 12px center",
  paddingRight: 36,
};

const buttonPrimaryStyle: React.CSSProperties = {
  fontFamily: "'Public Sans', sans-serif",
  fontSize: 16,
  fontWeight: 700,
  lineHeight: "24px",
  padding: "10px 20px",
  backgroundColor: "#005EA2",
  color: "#FFFFFF",
  borderWidth: 0,
  borderStyle: "none",
  borderColor: "transparent",
  borderRadius: 4,
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
};

const buttonSecondaryStyle: React.CSSProperties = {
  fontFamily: "'Public Sans', sans-serif",
  fontSize: 16,
  fontWeight: 700,
  lineHeight: "24px",
  padding: "10px 20px",
  backgroundColor: "#B50909",
  color: "#FFFFFF",
  borderWidth: 0,
  borderStyle: "none",
  borderColor: "transparent",
  borderRadius: 4,
  cursor: "pointer",
};

const sectionBorder: React.CSSProperties = {
  borderTopWidth: 0,
  borderTopStyle: "solid",
  borderTopColor: "transparent",
  borderRightWidth: 0,
  borderRightStyle: "solid",
  borderRightColor: "transparent",
  borderBottomWidth: 1,
  borderBottomStyle: "solid",
  borderBottomColor: "#DFE1E2",
  borderLeftWidth: 0,
  borderLeftStyle: "solid",
  borderLeftColor: "transparent",
};

function ReadOnlyField({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div
      style={{
        padding: "16px 0",
        ...sectionBorder,
      }}
    >
      <div
        style={{
          fontSize: 14,
          fontWeight: 700,
          color: "#1B1B1B",
          fontFamily: "'Public Sans', sans-serif",
          marginBottom: 4,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 16,
          color: "#1B1B1B",
          lineHeight: "24px",
          fontFamily: "'Public Sans', sans-serif",
        }}
      >
        {value}
      </div>
    </div>
  );
}

export function LocationPage() {
  const [activeTab, setActiveTab] = useState("mailing");
  const [addresses, setAddresses] = useState(initialAddresses);
  const [editingTab, setEditingTab] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<Address | null>(null);
  const { setMailingAddress } = useProfile();
  const isMobile = useIsMobile();
  const { showToast } = useToast();

  const currentAddress = addresses[activeTab];

  const handleEdit = () => {
    setEditDraft({ ...currentAddress });
    setEditingTab(activeTab);
  };

  const handleSave = () => {
    if (editDraft && editingTab) {
      setAddresses((prev) => ({ ...prev, [editingTab]: editDraft }));
      if (editingTab === "mailing") {
        setMailingAddress({
          line1: editDraft.line1,
          city: editDraft.city,
          state: editDraft.state,
          zip: editDraft.zip,
        });
      }
      const tabLabel = tabs.find((t) => t.key === editingTab)?.label ?? "Address";
      setEditingTab(null);
      setEditDraft(null);
      showToast(`${tabLabel} has been updated successfully.`);
    }
  };

  const handleCancel = () => {
    setEditingTab(null);
    setEditDraft(null);
  };

  const updateDraft = (field: keyof Address, value: string) => {
    if (editDraft) {
      setEditDraft({ ...editDraft, [field]: value });
    }
  };

  const isEditing = editingTab === activeTab;

  return (
    <PageShell title="Location">
      {/* Intro */}
      <p
        style={{
          fontFamily: "'Public Sans', sans-serif",
          fontSize: 16,
          lineHeight: "24px",
          color: "#1B1B1B",
          margin: "0 0 24px 0",
        }}
      >
        Please provide the addresses for your business. If you have different
        physical and billing addresses, then please provide those in the tabs
        above.
      </p>

      <div>
        {/* Tab bar */}
        <div
          style={{
            display: "flex",
            borderBottomWidth: 2,
            borderBottomStyle: "solid",
            borderBottomColor: "#DFE1E2",
            borderTopWidth: 0,
            borderTopStyle: "solid",
            borderTopColor: "transparent",
            borderLeftWidth: 0,
            borderLeftStyle: "solid",
            borderLeftColor: "transparent",
            borderRightWidth: 0,
            borderRightStyle: "solid",
            borderRightColor: "transparent",
          }}
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveTab(tab.key);
                  if (editingTab && editingTab !== tab.key) {
                    setEditingTab(null);
                    setEditDraft(null);
                  }
                }}
                style={{
                  flex: 1,
                  fontFamily: "'Public Sans', sans-serif",
                  fontSize: 16,
                  fontWeight: isActive ? 700 : 400,
                  lineHeight: "24px",
                  padding: "12px 20px",
                  backgroundColor: "transparent",
                  color: isActive ? "#005EA2" : "#71767A",
                  borderTopWidth: 0,
                  borderTopStyle: "solid",
                  borderTopColor: "transparent",
                  borderLeftWidth: 0,
                  borderLeftStyle: "solid",
                  borderLeftColor: "transparent",
                  borderRightWidth: 0,
                  borderRightStyle: "solid",
                  borderRightColor: "transparent",
                  borderBottomWidth: 4,
                  borderBottomStyle: "solid",
                  borderBottomColor: isActive ? "#005EA2" : "transparent",
                  cursor: "pointer",
                  marginBottom: -2,
                  transition: "color 0.15s ease, border-bottom-color 0.15s ease",
                  textAlign: "center",
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Card */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "0 0 4px 4px",
            padding: isMobile ? 16 : 24,
            marginTop: 0,
          }}
        >
          {!isEditing ? (
            /* ---- Read-only view ---- */
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 20,
                }}
              >
                <h2
                  style={{
                    fontFamily: "'Public Sans', sans-serif",
                    color: "#1B1B1B",
                    margin: 0,
                  }}
                >
                  {tabs.find((t) => t.key === activeTab)?.label}
                </h2>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                  gap: "0 32px",
                }}
              >
                <div style={{ gridColumn: "1 / -1" }}>
                  <ReadOnlyField label="Address Line 1" value={currentAddress.line1} />
                </div>
                {currentAddress.line2 && (
                  <div style={{ gridColumn: "1 / -1" }}>
                    <ReadOnlyField label="Address Line 2" value={currentAddress.line2} />
                  </div>
                )}
                <ReadOnlyField label="City" value={currentAddress.city} />
                <ReadOnlyField label="State" value={currentAddress.state} />
                {currentAddress.county && (
                  <ReadOnlyField label="County" value={currentAddress.county} />
                )}
                <ReadOnlyField label="Zip Code" value={currentAddress.zip} />
              </div>

              <div style={{ marginTop: 24 }}>
                <button onClick={handleEdit} style={buttonPrimaryStyle}>
                  Edit
                </button>
              </div>
            </>
          ) : (
            /* ---- Edit view ---- */
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 20,
                }}
              >
                <h2
                  style={{
                    fontFamily: "'Public Sans', sans-serif",
                    color: "#1B1B1B",
                    margin: 0,
                  }}
                >
                  Edit {tabs.find((t) => t.key === activeTab)?.label}
                </h2>
                {activeTab !== "mailing" && (
                  <button
                    onClick={() => {
                      setEditDraft({ ...addresses.mailing });
                    }}
                    style={{
                      fontFamily: "'Public Sans', sans-serif",
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#005EA2",
                      backgroundColor: "transparent",
                      borderWidth: 0,
                      borderStyle: "none",
                      borderColor: "transparent",
                      cursor: "pointer",
                      padding: "6px 12px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    Copy from Mailing
                  </button>
                )}
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                  gap: "16px 32px",
                }}
              >
                {/* Address Line 1 - full width */}
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={labelStyle} htmlFor="addr-line1">
                    Address Line 1 <span className="required-label">Required</span>
                  </label>
                  <input
                    id="addr-line1"
                    type="text"
                    value={editDraft?.line1 ?? ""}
                    onChange={(e) => updateDraft("line1", e.target.value)}
                    style={inputStyle}
                  />
                </div>

                {/* Address Line 2 - full width */}
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={labelStyle} htmlFor="addr-line2">
                    Address Line 2
                  </label>
                  <input
                    id="addr-line2"
                    type="text"
                    value={editDraft?.line2 ?? ""}
                    onChange={(e) => updateDraft("line2", e.target.value)}
                    style={inputStyle}
                  />
                </div>

                {/* City */}
                <div>
                  <label style={labelStyle} htmlFor="addr-city">
                    City <span className="required-label">Required</span>
                  </label>
                  <input
                    id="addr-city"
                    type="text"
                    value={editDraft?.city ?? ""}
                    onChange={(e) => updateDraft("city", e.target.value)}
                    style={inputStyle}
                  />
                </div>

                {/* State */}
                <div>
                  <label style={labelStyle} htmlFor="addr-state">
                    State <span className="required-label">Required</span>
                  </label>
                  <select
                    id="addr-state"
                    value={editDraft?.state ?? ""}
                    onChange={(e) => updateDraft("state", e.target.value)}
                    style={selectStyle}
                  >
                    <option value="">- Select -</option>
                    {stateOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                {/* County */}
                <div>
                  <label style={labelStyle} htmlFor="addr-county">
                    County
                  </label>
                  <input
                    id="addr-county"
                    type="text"
                    value={editDraft?.county ?? ""}
                    onChange={(e) => updateDraft("county", e.target.value)}
                    style={inputStyle}
                  />
                </div>

                {/* Zip Code */}
                <div>
                  <label style={labelStyle} htmlFor="addr-zip">
                    Zip Code <span className="required-label">Required</span>
                  </label>
                  <input
                    id="addr-zip"
                    type="text"
                    value={editDraft?.zip ?? ""}
                    onChange={(e) => updateDraft("zip", e.target.value)}
                    style={inputStyle}
                    maxLength={10}
                  />
                </div>
              </div>

              {/* Actions */}
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  marginTop: 24,
                  paddingTop: 16,
                  borderTopWidth: 1,
                  borderTopStyle: "solid",
                  borderTopColor: "#DFE1E2",
                  borderBottomWidth: 0,
                  borderBottomStyle: "solid",
                  borderBottomColor: "transparent",
                  borderLeftWidth: 0,
                  borderLeftStyle: "solid",
                  borderLeftColor: "transparent",
                  borderRightWidth: 0,
                  borderRightStyle: "solid",
                  borderRightColor: "transparent",
                }}
              >
                <button
                  onClick={handleSave}
                  disabled={!editDraft?.line1 || !editDraft?.city || !editDraft?.state || !editDraft?.zip}
                  style={{
                    ...buttonPrimaryStyle,
                    opacity:
                      !editDraft?.line1 || !editDraft?.city || !editDraft?.state || !editDraft?.zip
                        ? 0.5
                        : 1,
                    cursor:
                      !editDraft?.line1 || !editDraft?.city || !editDraft?.state || !editDraft?.zip
                        ? "not-allowed"
                        : "pointer",
                  }}
                >
                  Save
                </button>
                <button onClick={handleCancel} style={buttonSecondaryStyle}>
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </PageShell>
  );
}