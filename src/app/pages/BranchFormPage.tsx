import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import { PageShell } from "../components/PageShell";
import { useBranches, type BranchData } from "../components/BranchContext";
import { useToast } from "../components/ToastContext";

/* ── Types ─────────────────────────────────────────────── */

type Mode = "add" | "edit" | "view";

interface BranchFormPageProps {
  mode: Mode;
}

/* ── Field definitions ─────────────────────────────────── */

interface FieldDef {
  key: keyof Omit<BranchData, "id">;
  label: string;
  required: boolean;
  type?: "text" | "select" | "phone" | "email" | "zip";
  options?: { value: string; label: string }[];
}

/* ── Select options ────────────────────────────────────── */

const US_STATES = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
  "DC",
  "AS",
  "GU",
  "MP",
  "PR",
  "VI",
];

const STATE_OPTIONS = [
  { value: "", label: "Please Select" },
  ...US_STATES.map((s) => ({ value: s, label: s })),
];

const CONTACT_TITLE_OPTIONS = [
  { value: "", label: "Please Select" },
  { value: "Sole Proprietor", label: "Sole Proprietor" },
  { value: "Owner/Operator", label: "Owner/Operator" },
  { value: "Partner", label: "Partner" },
  { value: "Corporate Officer", label: "Corporate Officer" },
  { value: "Shareholder", label: "Shareholder" },
  { value: "President", label: "President" },
  { value: "Vice President", label: "Vice President" },
  {
    value: "Point of Contact/Contact Person",
    label: "Point of Contact/Contact Person",
  },
  { value: "Authorized Agent/Signer", label: "Authorized Agent/Signer" },
  { value: "Manager", label: "Manager" },
  { value: "Branch/Site/Office Manager", label: "Branch/Site/Office Manager" },
  { value: "Treasurer", label: "Treasurer" },
  { value: "Secretary", label: "Secretary" },
];

const FIELDS: FieldDef[] = [
  { key: "branchName", label: "Branch Name / Number", required: true },
  { key: "address1", label: "Address 1", required: false },
  { key: "address2", label: "Address 2", required: false },
  { key: "city", label: "City", required: false },
  {
    key: "state",
    label: "State",
    required: false,
    type: "select",
    options: STATE_OPTIONS,
  },
  { key: "zipCode", label: "Zip Code", required: false, type: "zip" },
  { key: "phone", label: "Phone Number", required: true, type: "phone" },
  { key: "email", label: "Email Address", required: true, type: "email" },
  {
    key: "contactTitle",
    label: "Branch Contact Title / Role",
    required: true,
    type: "select",
    options: CONTACT_TITLE_OPTIONS,
  },
  {
    key: "contactFirstName",
    label: "Branch Contact First Name",
    required: true,
  },
  {
    key: "contactLastName",
    label: "Branch Contact Last Name",
    required: true,
  },
];

const EMPTY_FORM: Omit<BranchData, "id"> = {
  branchName: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  zipCode: "",
  phone: "",
  email: "",
  contactTitle: "",
  contactFirstName: "",
  contactLastName: "",
};

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

const inputBorder: React.CSSProperties = {
  borderTopWidth: 1,
  borderTopStyle: "solid",
  borderTopColor: "#565C65",
  borderRightWidth: 1,
  borderRightStyle: "solid",
  borderRightColor: "#565C65",
  borderBottomWidth: 1,
  borderBottomStyle: "solid",
  borderBottomColor: "#565C65",
  borderLeftWidth: 1,
  borderLeftStyle: "solid",
  borderLeftColor: "#565C65",
};

const errorInputBorder: React.CSSProperties = {
  borderTopWidth: 2,
  borderTopStyle: "solid",
  borderTopColor: "#D54309",
  borderRightWidth: 2,
  borderRightStyle: "solid",
  borderRightColor: "#D54309",
  borderBottomWidth: 2,
  borderBottomStyle: "solid",
  borderBottomColor: "#D54309",
  borderLeftWidth: 2,
  borderLeftStyle: "solid",
  borderLeftColor: "#D54309",
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

/* ── Component ─────────────────────────────────────────── */

/* Phone formatter: (512) 555-0101 */
function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 10);
  if (digits.length === 0) return "";
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

/* Zip formatter: 5 digits, or 5+4 with dash */
function formatZip(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 9);
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}

export function BranchFormPage({ mode }: BranchFormPageProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getBranch, addBranch, updateBranch } = useBranches();
  const { showToast } = useToast();

  const existingBranch = id ? getBranch(id) : undefined;

  const [form, setForm] = useState<Omit<BranchData, "id">>(EMPTY_FORM);
  const [errors, setErrors] = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if ((mode === "edit" || mode === "view") && existingBranch) {
      const { id: _id, ...rest } = existingBranch;
      setForm(rest);
    } else {
      setForm(EMPTY_FORM);
    }
    setErrors(new Set());
    setSubmitted(false);
  }, [mode, existingBranch?.id]);

  const handleChange = (key: keyof Omit<BranchData, "id">, value: string) => {
    const field = FIELDS.find((f) => f.key === key);
    let formatted = value;
    if (field?.type === "phone") formatted = formatPhone(value);
    else if (field?.type === "zip") formatted = formatZip(value);

    setForm((prev) => ({ ...prev, [key]: formatted }));
    if (submitted) {
      setErrors((prev) => {
        const next = new Set(prev);
        if (formatted.trim()) next.delete(key);
        else if (field?.required) next.add(key);
        return next;
      });
    }
  };

  const handleSave = () => {
    setSubmitted(true);
    const newErrors = new Set<string>();
    FIELDS.forEach((f) => {
      if (f.required && !form[f.key].trim()) newErrors.add(f.key);
    });
    if (newErrors.size > 0) {
      setErrors(newErrors);
      return;
    }
    if (mode === "add") {
      addBranch({ id: `b${Date.now()}`, ...form });
      showToast("Branch added successfully");
    } else if (mode === "edit" && existingBranch) {
      updateBranch({ id: existingBranch.id, ...form });
      showToast("Changes saved successfully");
    }
    navigate("/account/branches");
  };

  const title =
    mode === "add"
      ? "Add Branch"
      : mode === "edit"
      ? "Edit Branch"
      : "View Branch";

  /* If editing/viewing a branch that doesn't exist, show not found */
  if ((mode === "edit" || mode === "view") && !existingBranch) {
    return (
      <PageShell title="Branch Not Found">
        <p
          style={{
            fontFamily: "'Public Sans', sans-serif",
            fontSize: 16,
            color: "#1B1B1B",
            margin: 0,
          }}
        >
          The requested branch could not be found.
        </p>
        <button
          onClick={() => navigate("/account/branches")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            marginTop: 16,
            fontFamily: "'Public Sans', sans-serif",
            fontSize: 14,
            color: "#005EA2",
            backgroundColor: "transparent",
            cursor: "pointer",
            padding: 0,
            textDecoration: "underline",
            ...noBorder,
          }}
        >
          <ArrowLeft size={16} />
          Back to Branches
        </button>
      </PageShell>
    );
  }

  return (
    <PageShell title={title}>
      {/* Back link */}
      <button
        onClick={() => navigate("/account/branches")}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontFamily: "'Public Sans', sans-serif",
          fontSize: 14,
          color: "#005EA2",
          backgroundColor: "transparent",
          cursor: "pointer",
          padding: 0,
          textDecoration: "underline",
          marginBottom: 24,
          ...noBorder,
        }}
      >
        Back to Branches
      </button>

      <div style={{ backgroundColor: "#FFFFFF", borderRadius: 4, padding: 24 }}>

      {/* ── View mode: read-only ── */}
      {mode === "view" ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0 40px",
            maxWidth: 800,
          }}
        >
          {FIELDS.map((f) => (
            <div
              key={f.key}
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
                {f.label}
              </div>
              <div
                style={{
                  fontSize: 16,
                  color: "#1B1B1B",
                  lineHeight: "24px",
                  fontFamily: "'Public Sans', sans-serif",
                }}
              >
                {form[f.key] || "—"}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* ── Add / Edit: form ── */
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px 40px",
          }}
        >
          {FIELDS.map((f) => {
            const hasError = errors.has(f.key);
            return (
              <div key={f.key}>
                <label
                  style={{
                    display: "block",
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#1B1B1B",
                    fontFamily: "'Public Sans', sans-serif",
                    marginBottom: 6,
                  }}
                >
                  {f.label}
                  {f.required && (
                    <span style={{ fontStyle: "italic", fontWeight: 400, fontSize: 14, color: "#71767A", marginLeft: 6 }}>Required</span>
                  )}
                </label>
                {f.type === "select" && f.options ? (
                  <select
                    value={form[f.key]}
                    onChange={(e) => handleChange(f.key, e.target.value)}
                    style={{
                      width: "100%",
                      height: 40,
                      padding: "0 12px",
                      fontSize: 16,
                      color: "#1B1B1B",
                      backgroundColor: "#FFFFFF",
                      borderRadius: 0,
                      boxSizing: "border-box",
                      fontFamily: "'Public Sans', sans-serif",
                      outline: "none",
                      ...(hasError ? errorInputBorder : inputBorder),
                    }}
                  >
                    {f.options.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={f.type === "email" ? "email" : "text"}
                    value={form[f.key]}
                    onChange={(e) => handleChange(f.key, e.target.value)}
                    placeholder={
                      f.type === "phone"
                        ? "(___) ___-____"
                        : f.type === "zip"
                        ? "_____"
                        : undefined
                    }
                    inputMode={
                      f.type === "phone" || f.type === "zip"
                        ? "numeric"
                        : undefined
                    }
                    style={{
                      width: "100%",
                      height: 40,
                      padding: "0 12px",
                      fontSize: 16,
                      color: "#1B1B1B",
                      backgroundColor: "#FFFFFF",
                      borderRadius: 0,
                      boxSizing: "border-box",
                      fontFamily: "'Public Sans', sans-serif",
                      outline: "none",
                      ...(hasError ? errorInputBorder : inputBorder),
                    }}
                  />
                )}
                {hasError && (
                  <span
                    style={{
                      display: "block",
                      fontSize: 13,
                      color: "#D54309",
                      fontFamily: "'Public Sans', sans-serif",
                      marginTop: 4,
                    }}
                  >
                    This field is required.
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Action buttons */}
      <div
        style={{
          display: "flex",
          gap: 12,
          marginTop: 32,
        }}
      >
        {mode === "view" ? (
          <button
            onClick={() => navigate("/account/branches")}
            style={{
              fontFamily: "'Public Sans', sans-serif",
              fontSize: 16,
              fontWeight: 700,
              lineHeight: "24px",
              padding: "10px 20px",
              backgroundColor: "#005EA2",
              color: "#FFFFFF",
              borderRadius: 4,
              cursor: "pointer",
              ...noBorder,
            }}
          >
            Back to Branches
          </button>
        ) : (
          <>
            <button
              onClick={handleSave}
              style={{
                fontFamily: "'Public Sans', sans-serif",
                fontSize: 16,
                fontWeight: 700,
                lineHeight: "24px",
                padding: "10px 20px",
                backgroundColor: "#005EA2",
                color: "#FFFFFF",
                borderRadius: 4,
                cursor: "pointer",
                ...noBorder,
              }}
            >
              {mode === "add" ? "Add Branch" : "Save Changes"}
            </button>
            <button
              onClick={() => navigate("/account/branches")}
              style={{
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
              }}
            >
              Cancel
            </button>
          </>
        )}
      </div>

      </div>
    </PageShell>
  );
}