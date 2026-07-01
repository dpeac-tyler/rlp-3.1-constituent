import { useState } from "react";
import { PageShell } from "../components/PageShell";
import { useToast } from "../components/ToastContext";
import { useProfile } from "../components/ProfileContext";
import { useIsMobile } from "../hooks/useIsMobile";

/* ── Types ─────────────────────────────────────────────── */

interface ProfileData {
  businessName: string;
  businessStructure: string;
  dbaName: string;
  federalEin: string;
  stateTaxId: string;
  website: string;
  phone: string;
  alternatePhone: string;
  email: string;
  alternateEmail: string;
  numberOfEmployees: string;
  stateOfIncorporation: string;
  dateOfIncorporation: string;
}

type ValidationErrors = Partial<Record<keyof ProfileData, string>>;

/* ── Initial data ──────────────────────────────────────── */

const initialProfile: ProfileData = {
  businessName: "Boring Company 155",
  businessStructure: "Limited Liability Company (LLC)",
  dbaName: "Drill Business, Drill Pros 123",
  federalEin: "12-2222222",
  stateTaxId: "",
  website: "",
  phone: "(210) 000-0011",
  alternatePhone: "",
  email: "firas.issa@egov.com",
  alternateEmail: "",
  numberOfEmployees: "5,000",
  stateOfIncorporation: "",
  dateOfIncorporation: "",
};

const businessStructureOptions = [
  "Sole Proprietorship",
  "Partnership",
  "Limited Liability Company (LLC)",
  "Corporation",
  "S Corporation",
  "Non-Profit Organization",
  "Government Entity",
  "Trust",
  "Other",
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

/* ── Validation helpers ────────────────────────────────── */

const EIN_REGEX = /^\d{2}-\d{7}$/;
const PHONE_REGEX = /^\(\d{3}\)\s?\d{3}-\d{4}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_REGEX = /^https?:\/\/.+\..+/;

function validate(data: ProfileData): ValidationErrors {
  const errors: ValidationErrors = {};

  // Required fields
  if (!data.businessName.trim()) errors.businessName = "Business Name is required.";
  if (!data.businessStructure.trim()) errors.businessStructure = "Business Structure is required.";
  if (!data.phone.trim()) {
    errors.phone = "Phone is required.";
  } else if (!PHONE_REGEX.test(data.phone.trim())) {
    errors.phone = "Enter a valid phone number, e.g. (210) 000-0011.";
  }
  if (!data.email.trim()) {
    errors.email = "Email Address is required.";
  } else if (!EMAIL_REGEX.test(data.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  // Optional format checks – only validate when a value is present
  if (data.federalEin.trim() && !EIN_REGEX.test(data.federalEin.trim())) {
    errors.federalEin = "Enter a valid EIN, e.g. 12-3456789.";
  }
  if (data.alternatePhone.trim() && !PHONE_REGEX.test(data.alternatePhone.trim())) {
    errors.alternatePhone = "Enter a valid phone number, e.g. (210) 000-0011.";
  }
  if (data.alternateEmail.trim() && !EMAIL_REGEX.test(data.alternateEmail.trim())) {
    errors.alternateEmail = "Enter a valid email address.";
  }
  if (data.website.trim() && !URL_REGEX.test(data.website.trim())) {
    errors.website = "Enter a valid URL starting with http:// or https://.";
  }

  return errors;
}

/* ── Shared styles ─────────────────────────────────────── */

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

const inputErrorStyle: React.CSSProperties = {
  ...inputStyle,
  borderColor: "#B50909",
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

const selectErrorStyle: React.CSSProperties = {
  ...selectStyle,
  borderColor: "#B50909",
};

const errorMsgStyle: React.CSSProperties = {
  fontFamily: "'Public Sans', sans-serif",
  fontSize: 14,
  lineHeight: "20px",
  color: "#B50909",
  marginTop: 4,
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

const buttonCancelStyle: React.CSSProperties = {
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

/* ── ReadOnlyField ─────────────────────────────────────── */

function ReadOnlyField({ label, value }: { label: string; value: string }) {
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
        {value || "—"}
      </div>
    </div>
  );
}

/* ── Profile Page ──────────────────────────────────────── */

export function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData>(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<ProfileData>(initialProfile);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ProfileData, boolean>>>({});
  const { showToast } = useToast();
  const { setBusinessName } = useProfile();
  const isMobile = useIsMobile();

  const handleEdit = () => {
    setDraft({ ...profile });
    setErrors({});
    setTouched({});
    setIsEditing(true);
  };

  const handleSave = () => {
    const validationErrors = validate(draft);
    setErrors(validationErrors);
    // Mark all fields as touched so errors show
    const allTouched: Partial<Record<keyof ProfileData, boolean>> = {};
    (Object.keys(draft) as (keyof ProfileData)[]).forEach((k) => {
      allTouched[k] = true;
    });
    setTouched(allTouched);

    if (Object.keys(validationErrors).length > 0) return;

    setProfile({ ...draft });
    setBusinessName(draft.businessName);
    setIsEditing(false);
    showToast("Profile information has been updated successfully.");
  };

  const handleCancel = () => {
    setIsEditing(false);
    setDraft({ ...profile });
    setErrors({});
    setTouched({});
  };

  const updateDraft = (field: keyof ProfileData, value: string) => {
    setDraft((prev) => {
      const next = { ...prev, [field]: value };
      // Re-validate on change if the field has been touched
      if (touched[field]) {
        const newErrors = validate(next);
        setErrors((prevErrors) => {
          const updated = { ...prevErrors };
          if (newErrors[field]) {
            updated[field] = newErrors[field];
          } else {
            delete updated[field];
          }
          return updated;
        });
      }
      return next;
    });
  };

  const handleBlur = (field: keyof ProfileData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const newErrors = validate(draft);
    setErrors((prev) => {
      const updated = { ...prev };
      if (newErrors[field]) {
        updated[field] = newErrors[field];
      } else {
        delete updated[field];
      }
      return updated;
    });
  };

  const fieldError = (field: keyof ProfileData) =>
    touched[field] ? errors[field] : undefined;

  return (
    <PageShell title="Profile">
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
        Please keep your profile information complete and up to date. This will
        help ensure you always receive agency communication regarding your
        account, applications, and any generated licenses, permits, or
        certificates.
      </p>

      {/* White card */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: 4,
          padding: isMobile ? 16 : 24,
        }}
      >
        {!isEditing ? (
          /* ──────── Read-only view ──────── */
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: "0 32px",
              }}
            >
              <div style={{ gridColumn: "1 / -1" }}>
                <ReadOnlyField label="Business Name" value={profile.businessName} />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <ReadOnlyField label="Business Structure" value={profile.businessStructure} />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <ReadOnlyField label="DBA (Doing Business As) Name" value={profile.dbaName} />
              </div>

              <ReadOnlyField label="Federal/Employer ID Number" value={profile.federalEin} />
              <ReadOnlyField label="State Tax ID Number" value={profile.stateTaxId} />

              <div style={{ gridColumn: "1 / -1" }}>
                <ReadOnlyField label="Website" value={profile.website} />
              </div>

              <ReadOnlyField label="Phone" value={profile.phone} />
              <ReadOnlyField label="Alternate Phone" value={profile.alternatePhone} />

              <ReadOnlyField label="Email Address" value={profile.email} />
              <ReadOnlyField label="Alternate Email Address" value={profile.alternateEmail} />

              <div style={{ gridColumn: "1 / -1" }}>
                <ReadOnlyField label="Number of Employees" value={profile.numberOfEmployees} />
              </div>

              <ReadOnlyField label="State of Incorporation" value={profile.stateOfIncorporation} />
              <ReadOnlyField label="Date of Incorporation" value={profile.dateOfIncorporation} />
            </div>

            {/* Edit button */}
            <div style={{ marginTop: 24 }}>
              <button onClick={handleEdit} style={buttonPrimaryStyle}>
                Edit
              </button>
            </div>
          </>
        ) : (
          /* ──────── Edit view ──────── */
          <>
            <h2
              style={{
                fontFamily: "'Public Sans', sans-serif",
                color: "#1B1B1B",
                margin: "0 0 20px 0",
              }}
            >
              Edit Profile
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: "16px 32px",
              }}
            >
              {/* Business Name – full width */}
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle} htmlFor="prof-businessName">
                  Business Name <span className="required-label">Required</span>
                </label>
                <input
                  id="prof-businessName"
                  type="text"
                  value={draft.businessName}
                  onChange={(e) => updateDraft("businessName", e.target.value)}
                  onBlur={() => handleBlur("businessName")}
                  style={fieldError("businessName") ? inputErrorStyle : inputStyle}
                />
                {fieldError("businessName") && (
                  <div style={errorMsgStyle}>{fieldError("businessName")}</div>
                )}
              </div>

              {/* Business Structure – full width */}
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle} htmlFor="prof-businessStructure">
                  Business Structure <span className="required-label">Required</span>
                </label>
                <select
                  id="prof-businessStructure"
                  value={draft.businessStructure}
                  onChange={(e) => updateDraft("businessStructure", e.target.value)}
                  onBlur={() => handleBlur("businessStructure")}
                  style={fieldError("businessStructure") ? selectErrorStyle : selectStyle}
                >
                  <option value="">- Select -</option>
                  {businessStructureOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {fieldError("businessStructure") && (
                  <div style={errorMsgStyle}>{fieldError("businessStructure")}</div>
                )}
              </div>

              {/* DBA Name – full width */}
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle} htmlFor="prof-dbaName">
                  DBA (Doing Business As) Name
                </label>
                <input
                  id="prof-dbaName"
                  type="text"
                  value={draft.dbaName}
                  onChange={(e) => updateDraft("dbaName", e.target.value)}
                  style={inputStyle}
                />
              </div>

              {/* Federal EIN / State Tax ID */}
              <div>
                <label style={labelStyle} htmlFor="prof-federalEin">
                  Federal/Employer ID Number
                </label>
                <input
                  id="prof-federalEin"
                  type="text"
                  value={draft.federalEin}
                  onChange={(e) => updateDraft("federalEin", e.target.value)}
                  onBlur={() => handleBlur("federalEin")}
                  style={fieldError("federalEin") ? inputErrorStyle : inputStyle}
                  placeholder="XX-XXXXXXX"
                />
                {fieldError("federalEin") && (
                  <div style={errorMsgStyle}>{fieldError("federalEin")}</div>
                )}
              </div>
              <div>
                <label style={labelStyle} htmlFor="prof-stateTaxId">
                  State Tax ID Number
                </label>
                <input
                  id="prof-stateTaxId"
                  type="text"
                  value={draft.stateTaxId}
                  onChange={(e) => updateDraft("stateTaxId", e.target.value)}
                  style={inputStyle}
                />
              </div>

              {/* Website – full width */}
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle} htmlFor="prof-website">
                  Website
                </label>
                <input
                  id="prof-website"
                  type="text"
                  value={draft.website}
                  onChange={(e) => updateDraft("website", e.target.value)}
                  onBlur={() => handleBlur("website")}
                  style={fieldError("website") ? inputErrorStyle : inputStyle}
                  placeholder="https://"
                />
                {fieldError("website") && (
                  <div style={errorMsgStyle}>{fieldError("website")}</div>
                )}
              </div>

              {/* Phone / Alternate Phone */}
              <div>
                <label style={labelStyle} htmlFor="prof-phone">
                  Phone <span className="required-label">Required</span>
                </label>
                <input
                  id="prof-phone"
                  type="tel"
                  value={draft.phone}
                  onChange={(e) => updateDraft("phone", e.target.value)}
                  onBlur={() => handleBlur("phone")}
                  style={fieldError("phone") ? inputErrorStyle : inputStyle}
                  placeholder="(XXX) XXX-XXXX"
                />
                {fieldError("phone") && (
                  <div style={errorMsgStyle}>{fieldError("phone")}</div>
                )}
              </div>
              <div>
                <label style={labelStyle} htmlFor="prof-alternatePhone">
                  Alternate Phone
                </label>
                <input
                  id="prof-alternatePhone"
                  type="tel"
                  value={draft.alternatePhone}
                  onChange={(e) => updateDraft("alternatePhone", e.target.value)}
                  onBlur={() => handleBlur("alternatePhone")}
                  style={fieldError("alternatePhone") ? inputErrorStyle : inputStyle}
                  placeholder="(XXX) XXX-XXXX"
                />
                {fieldError("alternatePhone") && (
                  <div style={errorMsgStyle}>{fieldError("alternatePhone")}</div>
                )}
              </div>

              {/* Email / Alternate Email */}
              <div>
                <label style={labelStyle} htmlFor="prof-email">
                  Email Address <span className="required-label">Required</span>
                </label>
                <input
                  id="prof-email"
                  type="email"
                  value={draft.email}
                  onChange={(e) => updateDraft("email", e.target.value)}
                  onBlur={() => handleBlur("email")}
                  style={fieldError("email") ? inputErrorStyle : inputStyle}
                />
                {fieldError("email") && (
                  <div style={errorMsgStyle}>{fieldError("email")}</div>
                )}
              </div>
              <div>
                <label style={labelStyle} htmlFor="prof-alternateEmail">
                  Alternate Email Address
                </label>
                <input
                  id="prof-alternateEmail"
                  type="email"
                  value={draft.alternateEmail}
                  onChange={(e) => updateDraft("alternateEmail", e.target.value)}
                  onBlur={() => handleBlur("alternateEmail")}
                  style={fieldError("alternateEmail") ? inputErrorStyle : inputStyle}
                />
                {fieldError("alternateEmail") && (
                  <div style={errorMsgStyle}>{fieldError("alternateEmail")}</div>
                )}
              </div>

              {/* Number of Employees – full width */}
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle} htmlFor="prof-numberOfEmployees">
                  Number of Employees
                </label>
                <input
                  id="prof-numberOfEmployees"
                  type="text"
                  value={draft.numberOfEmployees}
                  onChange={(e) => updateDraft("numberOfEmployees", e.target.value)}
                  style={inputStyle}
                />
              </div>

              {/* State of Incorporation / Date of Incorporation */}
              <div>
                <label style={labelStyle} htmlFor="prof-stateOfIncorporation">
                  State of Incorporation
                </label>
                <select
                  id="prof-stateOfIncorporation"
                  value={draft.stateOfIncorporation}
                  onChange={(e) => updateDraft("stateOfIncorporation", e.target.value)}
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
              <div>
                <label style={labelStyle} htmlFor="prof-dateOfIncorporation">
                  Date of Incorporation
                </label>
                <input
                  id="prof-dateOfIncorporation"
                  type="date"
                  value={draft.dateOfIncorporation}
                  onChange={(e) => updateDraft("dateOfIncorporation", e.target.value)}
                  style={inputStyle}
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
                style={buttonPrimaryStyle}
              >
                Save
              </button>
              <button onClick={handleCancel} style={buttonCancelStyle}>
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </PageShell>
  );
}