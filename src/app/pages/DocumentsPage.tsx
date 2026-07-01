import { useState, useMemo, useRef } from "react";
import { Eye, Trash2, Upload, X } from "lucide-react";
import { PageShell } from "../components/PageShell";
import { IconKeyAccordion } from "../components/IconKeyAccordion";
import { useToast } from "../components/ToastContext";
import { useIsMobile } from "../hooks/useIsMobile";

/* ── Types ─────────────────────────────────────────────── */

interface DocumentItem {
  id: string;
  name: string;
  category: string;
  description: string;
  uploadedDate: string;
  fileName: string;
  fileSize: string;
}

/* ── Mock data ─────────────────────────────────────────── */

const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: "d1",
    name: "Driver's License (Front)",
    category: "Identification",
    description: "Front of state-issued driver's license used for identity verification purposes. This document must be current and not expired. Please ensure the image is clear, well-lit, and all text is legible including the license number, date of birth, and expiration date.",
    uploadedDate: "01/15/2026",
    fileName: "dl_front.jpg",
    fileSize: "1.2 MB",
  },
  {
    id: "d2",
    name: "Driver's License (Back)",
    category: "Identification",
    description: "Back of state-issued driver's license",
    uploadedDate: "01/15/2026",
    fileName: "dl_back.jpg",
    fileSize: "980 KB",
  },
  {
    id: "d3",
    name: "Business License",
    category: "Licenses & Permits",
    description: "Current business license for BoringCompany issued by the state regulatory authority. This license authorizes the company to conduct operations within the designated jurisdiction and must be renewed annually before the expiration date listed on the document.",
    uploadedDate: "02/03/2026",
    fileName: "business_license_2026.pdf",
    fileSize: "245 KB",
  },
  {
    id: "d4",
    name: "Certificate of Insurance",
    category: "Insurance",
    description: "General liability insurance certificate providing coverage for property damage, bodily injury, and related claims. This certificate is required for all active contracts and must be maintained with minimum coverage amounts as specified in the contractual agreement terms.",
    uploadedDate: "02/10/2026",
    fileName: "insurance_cert.pdf",
    fileSize: "312 KB",
  },
  {
    id: "d5",
    name: "W-9 Form",
    category: "Tax Documents",
    description: "Completed W-9 for tax identification",
    uploadedDate: "12/20/2025",
    fileName: "w9_boringcompany.pdf",
    fileSize: "89 KB",
  },
  {
    id: "d6",
    name: "Proof of Address",
    category: "Identification",
    description: "Utility bill showing current business address",
    uploadedDate: "01/28/2026",
    fileName: "utility_bill_jan2026.pdf",
    fileSize: "156 KB",
  },
  {
    id: "d7",
    name: "Vehicle Registration",
    category: "Licenses & Permits",
    description: "Company vehicle registration document",
    uploadedDate: "11/05/2025",
    fileName: "vehicle_reg.pdf",
    fileSize: "201 KB",
  },
  {
    id: "d8",
    name: "Safety Inspection Report",
    category: "Compliance",
    description: "Annual workplace safety inspection results conducted by the Occupational Safety and Health Administration (OSHA). The report covers fire safety, electrical systems, ventilation, hazardous material storage, emergency exits, and employee safety training compliance for all company facilities.",
    uploadedDate: "02/18/2026",
    fileName: "safety_report_2026.pdf",
    fileSize: "478 KB",
  },
];

const CATEGORIES = [
  "Please Select",
  "Identification",
  "Licenses & Permits",
  "Insurance",
  "Tax Documents",
  "Compliance",
  "Other",
];

/* ── Icon key items ────────────────────────────────────── */

const DOC_ICON_ITEMS = [
  { icon: <Eye size={16} color="#FFFFFF" />, label: "View Document" },
  { icon: <Trash2 size={16} color="#FFFFFF" />, label: "Delete Document" },
];

/* ── Column config ─────────────────────────────────────── */

type SortKey = "name" | "category" | "uploadedDate";
type SortDir = "asc" | "desc" | null;

const SORTABLE_COLUMNS: { key: SortKey; label: string }[] = [
  { key: "name", label: "Document Name" },
  { key: "category", label: "Category" },
  { key: "uploadedDate", label: "Uploaded Date" },
];

const DESC_LIMIT = 100;

const COL_WIDTHS = ["22%", "13%", "27%", "13%", "14%", "11%"];

/* ── Reusable border objects (longhand only) ───────────── */

const cellBorder: React.CSSProperties = {
  borderBottomWidth: 1,
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
};

const thBorder: React.CSSProperties = {
  borderBottomWidth: 1,
  borderBottomStyle: "solid",
  borderBottomColor: "#A9AEB1",
  borderTopWidth: 0,
  borderTopStyle: "solid",
  borderTopColor: "transparent",
  borderLeftWidth: 0,
  borderLeftStyle: "solid",
  borderLeftColor: "transparent",
  borderRightWidth: 0,
  borderRightStyle: "solid",
  borderRightColor: "transparent",
};

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

const controlBtnStyle: React.CSSProperties = {
  width: 28,
  height: 28,
  minWidth: 28,
  backgroundColor: "#162E51",
  borderRadius: 4,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  padding: 0,
  ...noBorder,
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

/* ── Helpers ───────────────────────────────────────────── */

const parseDateForSort = (d: string) => {
  const [mm, dd, yyyy] = d.split("/");
  return new Date(`${yyyy}-${mm}-${dd}`).getTime();
};

const formatDateToday = () => {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
};

/* ── View Document Modal ───────────────────────────────── */

function ViewDocumentModal({
  doc,
  onClose,
}: {
  doc: DocumentItem;
  onClose: () => void;
}) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 8000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: 4,
          width: 560,
          maxWidth: "90vw",
          ...noBorder,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px 24px",
            backgroundColor: "#122E51",
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
            borderBottomWidth: 1,
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
          <h2
            style={{
              fontFamily: "'Public Sans', sans-serif",
              fontSize: 20,
              color: "#FFFFFF",
              margin: 0,
            }}
          >
            Document Details
          </h2>
          <button
            onClick={onClose}
            style={{
              cursor: "pointer",
              backgroundColor: "transparent",
              padding: 4,
              display: "inline-flex",
              ...noBorder,
            }}
          >
            <X size={20} color="#FFFFFF" />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "24px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "140px 1fr",
              gap: "12px 16px",
              fontFamily: "'Public Sans', sans-serif",
              fontSize: 14,
              color: "#1B1B1B",
            }}
          >
            <span style={{ fontWeight: 700 }}>Document Name</span>
            <span>{doc.name}</span>

            <span style={{ fontWeight: 700 }}>Category</span>
            <span>{doc.category}</span>

            <span style={{ fontWeight: 700 }}>Description</span>
            <span>{doc.description}</span>

            <span style={{ fontWeight: 700 }}>File Name</span>
            <span style={{ color: "#005EA2", textDecoration: "underline" }}>
              {doc.fileName}
            </span>

            <span style={{ fontWeight: 700 }}>File Size</span>
            <span>{doc.fileSize}</span>

            <span style={{ fontWeight: 700 }}>Uploaded Date</span>
            <span>{doc.uploadedDate}</span>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "16px 24px",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <button
            onClick={onClose}
            style={{
              fontFamily: "'Public Sans', sans-serif",
              fontSize: 16,
              fontWeight: 700,
              padding: "10px 20px",
              backgroundColor: "#005EA2",
              color: "#FFFFFF",
              borderRadius: 4,
              cursor: "pointer",
              ...noBorder,
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Delete Confirm Modal ──────────────────────────────── */

function DeleteConfirmModal({
  doc,
  onConfirm,
  onCancel,
}: {
  doc: DocumentItem;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 8000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onCancel}
    >
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: 4,
          width: 480,
          maxWidth: "90vw",
          ...noBorder,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px 24px",
            backgroundColor: "#122E51",
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
            borderBottomWidth: 1,
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
          <h2
            style={{
              fontFamily: "'Public Sans', sans-serif",
              fontSize: 20,
              color: "#FFFFFF",
              margin: 0,
            }}
          >
            Delete Document
          </h2>
          <button
            onClick={onCancel}
            style={{
              cursor: "pointer",
              backgroundColor: "transparent",
              padding: 4,
              display: "inline-flex",
              ...noBorder,
            }}
          >
            <X size={20} color="#FFFFFF" />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "24px" }}>
          <p
            style={{
              fontFamily: "'Public Sans', sans-serif",
              fontSize: 16,
              color: "#1B1B1B",
              margin: 0,
              lineHeight: "24px",
            }}
          >
            Are you sure you want to delete{" "}
            <strong>{doc.name}</strong>? This action cannot be undone.
          </p>
        </div>

        {/* Footer — primary action (Delete) on left */}
        <div
          style={{
            padding: "16px 24px",
            display: "flex",
            gap: 12,
            alignItems: "center",
          }}
        >
          <button
            onClick={onConfirm}
            style={{
              fontFamily: "'Public Sans', sans-serif",
              fontSize: 16,
              fontWeight: 700,
              padding: "10px 20px",
              backgroundColor: "#005EA2",
              color: "#FFFFFF",
              borderRadius: 4,
              cursor: "pointer",
              ...noBorder,
            }}
          >
            Delete Document
          </button>
          <button
            onClick={onCancel}
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
        </div>
      </div>
    </div>
  );
}

/* ── Upload Document Modal ─────────────────────────────── */

function UploadDocumentModal({
  onUpload,
  onCancel,
}: {
  onUpload: (doc: Omit<DocumentItem, "id">) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Please Select");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    const newErrors: Record<string, boolean> = {};
    if (!name.trim()) newErrors.name = true;
    if (category === "Please Select") newErrors.category = true;
    if (!selectedFile) newErrors.file = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onUpload({
      name: name.trim(),
      category,
      description: description.trim(),
      uploadedDate: formatDateToday(),
      fileName: selectedFile!.name,
      fileSize:
        selectedFile!.size > 1024 * 1024
          ? `${(selectedFile!.size / (1024 * 1024)).toFixed(1)} MB`
          : `${Math.round(selectedFile!.size / 1024)} KB`,
    });
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 14,
    fontWeight: 700,
    color: "#1B1B1B",
    display: "block",
    marginBottom: 4,
  };

  const inputStyle: React.CSSProperties = {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 16,
    color: "#1B1B1B",
    width: "100%",
    height: 40,
    padding: "0 12px",
    backgroundColor: "#FFFFFF",
    borderRadius: 0,
    boxSizing: "border-box",
    ...inputBorder,
  };

  const selectStyle: React.CSSProperties = {
    ...inputStyle,
    appearance: "none",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M7 10l5 5 5-5H7z' fill='%231B1B1B'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 8px center",
    backgroundSize: "16px",
    cursor: "pointer",
    padding: "0 32px 0 12px",
  };

  const errorBorder: React.CSSProperties = {
    borderTopColor: "#B50909",
    borderRightColor: "#B50909",
    borderBottomColor: "#B50909",
    borderLeftColor: "#B50909",
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 8000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onCancel}
    >
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: 4,
          width: 600,
          maxWidth: "90vw",
          maxHeight: "90vh",
          overflowY: "auto",
          ...noBorder,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px 24px",
            backgroundColor: "#122E51",
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
            borderBottomWidth: 1,
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
          <h2
            style={{
              fontFamily: "'Public Sans', sans-serif",
              fontSize: 20,
              color: "#FFFFFF",
              margin: 0,
            }}
          >
            Upload Document
          </h2>
          <button
            onClick={onCancel}
            style={{
              cursor: "pointer",
              backgroundColor: "transparent",
              padding: 4,
              display: "inline-flex",
              ...noBorder,
            }}
          >
            <X size={20} color="#FFFFFF" />
          </button>
        </div>

        {/* Form body */}
        <div
          style={{
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          {/* Document Name */}
          <div>
            <label style={labelStyle}>
              Document Name <span className="required-label">Required</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((p) => ({ ...p, name: false }));
              }}
              placeholder="e.g., Driver's License (Front)"
              style={{
                ...inputStyle,
                ...(errors.name ? errorBorder : {}),
              }}
            />
            {errors.name && (
              <span
                style={{
                  fontFamily: "'Public Sans', sans-serif",
                  fontSize: 12,
                  color: "#B50909",
                  marginTop: 4,
                  display: "block",
                }}
              >
                Document name is required
              </span>
            )}
          </div>

          {/* Category */}
          <div>
            <label style={labelStyle}>
              Category <span className="required-label">Required</span>
            </label>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                if (errors.category)
                  setErrors((p) => ({ ...p, category: false }));
              }}
              style={{
                ...selectStyle,
                ...(errors.category ? errorBorder : {}),
                color:
                  category === "Please Select" ? "#71767A" : "#1B1B1B",
              }}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {errors.category && (
              <span
                style={{
                  fontFamily: "'Public Sans', sans-serif",
                  fontSize: 12,
                  color: "#B50909",
                  marginTop: 4,
                  display: "block",
                }}
              >
                Please select a category
              </span>
            )}
          </div>

          {/* Description */}
          <div>
            <label style={labelStyle}>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of the document"
              rows={3}
              style={{
                ...inputStyle,
                height: "auto",
                padding: "8px 12px",
                resize: "vertical",
              }}
            />
          </div>

          {/* File Upload */}
          <div>
            <label style={labelStyle}>
              File <span className="required-label">Required</span>
            </label>
            <p
              style={{
                fontFamily: "'Public Sans', sans-serif",
                fontSize: 12,
                color: "#71767A",
                margin: "0 0 8px 0",
              }}
            >
              Accepted formats: PDF, JPG, PNG, TIFF. Max file size: 10 MB.
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.tiff,.tif"
              style={{ display: "none" }}
              onChange={(e) => {
                const f = e.target.files?.[0] || null;
                setSelectedFile(f);
                if (errors.file) setErrors((p) => ({ ...p, file: false }));
              }}
            />
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                style={{
                  fontFamily: "'Public Sans', sans-serif",
                  fontSize: 14,
                  fontWeight: 700,
                  padding: "8px 16px",
                  backgroundColor: "#FFFFFF",
                  color: "#005EA2",
                  borderRadius: 4,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  ...inputBorder,
                  ...(errors.file ? errorBorder : {}),
                }}
              >
                <Upload size={16} />
                Choose File
              </button>
              <span
                style={{
                  fontFamily: "'Public Sans', sans-serif",
                  fontSize: 14,
                  color: selectedFile ? "#1B1B1B" : "#71767A",
                }}
              >
                {selectedFile ? selectedFile.name : "No file selected"}
              </span>
            </div>
            {errors.file && (
              <span
                style={{
                  fontFamily: "'Public Sans', sans-serif",
                  fontSize: 12,
                  color: "#B50909",
                  marginTop: 4,
                  display: "block",
                }}
              >
                Please select a file to upload
              </span>
            )}
          </div>
        </div>

        {/* Footer — primary action (Upload) on left */}
        <div
          style={{
            padding: "16px 24px",
            display: "flex",
            gap: 12,
            alignItems: "center",
          }}
        >
          <button
            onClick={handleSubmit}
            style={{
              fontFamily: "'Public Sans', sans-serif",
              fontSize: 16,
              fontWeight: 700,
              padding: "10px 20px",
              backgroundColor: "#005EA2",
              color: "#FFFFFF",
              borderRadius: 4,
              cursor: "pointer",
              ...noBorder,
            }}
          >
            Upload Document
          </button>
          <button
            onClick={onCancel}
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
        </div>
      </div>
    </div>
  );
}

/* ── Main Documents Page ───────────────────────────────── */

export function DocumentsPage() {
  const { showToast } = useToast();
  const [documents, setDocuments] = useState<DocumentItem[]>(INITIAL_DOCUMENTS);
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [viewingDoc, setViewingDoc] = useState<DocumentItem | null>(null);
  const [deletingDoc, setDeletingDoc] = useState<DocumentItem | null>(null);
  const [expandedDescs, setExpandedDescs] = useState<Set<string>>(new Set());
  const isMobile = useIsMobile();

  /* ── Sorting ──────────────────────────────────────────── */

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      if (sortDir === "asc") setSortDir("desc");
      else if (sortDir === "desc") {
        setSortKey(null);
        setSortDir(null);
      }
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
    setCurrentPage(0);
  };

  const sortedData = useMemo(() => {
    if (!sortKey || !sortDir) return documents;
    return [...documents].sort((a, b) => {
      if (sortKey === "uploadedDate") {
        const cmp = parseDateForSort(a.uploadedDate) - parseDateForSort(b.uploadedDate);
        return sortDir === "asc" ? cmp : -cmp;
      }
      const cmp = a[sortKey].localeCompare(b[sortKey]);
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [sortKey, sortDir, documents]);

  /* ── Pagination ───────────────────────────────────────── */

  const totalEntries = sortedData.length;
  const paginatedData = sortedData.slice(
    currentPage * pageSize,
    currentPage * pageSize + pageSize
  );
  const start = totalEntries === 0 ? 0 : currentPage * pageSize + 1;
  const end = Math.min(currentPage * pageSize + pageSize, totalEntries);
  const totalPages = Math.ceil(totalEntries / pageSize);

  const getPageNumbers = (
    current: number,
    total: number
  ): (number | "...")[] => {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i);
    const pages: (number | "...")[] = [];
    pages.push(0);
    if (current > 3) pages.push("...");
    const rangeStart = Math.max(1, current - 1);
    const rangeEnd = Math.min(total - 2, current + 1);
    for (let i = rangeStart; i <= rangeEnd; i++) pages.push(i);
    if (current < total - 4) pages.push("...");
    pages.push(total - 1);
    return pages;
  };

  /* ── Handlers ─────────────────────────────────────────── */

  const handleUpload = (doc: Omit<DocumentItem, "id">) => {
    const newDoc: DocumentItem = { id: `d${Date.now()}`, ...doc };
    setDocuments((prev) => [newDoc, ...prev]);
    setShowUploadModal(false);
    showToast("Document uploaded successfully");
  };

  const handleDelete = () => {
    if (!deletingDoc) return;
    setDocuments((prev) => prev.filter((d) => d.id !== deletingDoc.id));
    setDeletingDoc(null);
    showToast("Document deleted successfully");
  };

  /* ── Render sortable th helper ────────────────────────── */

  const renderSortableTh = (key: SortKey, label: string) => (
    <th
      key={key}
      onClick={() => handleSort(key)}
      style={{
        backgroundColor: "#F0F0F0",
        color: "#1B1B1B",
        fontWeight: 700,
        fontSize: 13,
        lineHeight: "20px",
        padding: "12px 12px",
        textAlign: "left",
        cursor: "pointer",
        userSelect: "none",
        whiteSpace: "nowrap",
        ...thBorder,
      }}
    >
      {label}
      <span
        style={{
          display: "inline-flex",
          flexDirection: "column",
          marginLeft: 4,
          verticalAlign: "middle",
          lineHeight: 0,
          gap: 1,
        }}
      >
        <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 0L8 6H0L4 0Z" fill={sortKey === key && sortDir === "asc" ? "#1B1B1B" : "#A9AEB1"} />
        </svg>
        <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 6L0 0H8L4 6Z" fill={sortKey === key && sortDir === "desc" ? "#1B1B1B" : "#A9AEB1"} />
        </svg>
      </span>
    </th>
  );

  return (
    <PageShell title="Documents">
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: 4,
          padding: isMobile ? 16 : 24,
        }}
      >
      {/* Intro paragraph */}
      <p
        style={{
          fontFamily: "'Public Sans', sans-serif",
          fontSize: 16,
          lineHeight: "24px",
          color: "#1B1B1B",
          margin: "0 0 0 0",
        }}
      >
        Welcome to your Document Repository. Upload, view, and manage important
        documents such as identification, licenses, insurance certificates, and
        other required files. Accepted file formats include PDF, JPG, PNG, and
        TIFF.
      </p>

      {/* Icon Key */}
      <IconKeyAccordion
        items={DOC_ICON_ITEMS}
        sessionKey="icon-key-documents-open"
      />

      {/* Top bar: Showing X-Y of Z  |  Show dropdown */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <span
          style={{
            fontFamily: "'Public Sans', sans-serif",
            fontSize: 14,
            color: "#1B1B1B",
          }}
        >
          Showing {start} - {end} of {totalEntries} Entries
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              fontFamily: "'Public Sans', sans-serif",
              fontSize: 14,
              color: "#1B1B1B",
            }}
          >
            Show
          </span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(0);
            }}
            style={{
              fontFamily: "'Public Sans', sans-serif",
              fontSize: 14,
              color: "#1B1B1B",
              height: 32,
              padding: "0 24px 0 8px",
              ...inputBorder,
              borderTopColor: "#565C65",
              borderRightColor: "#565C65",
              borderBottomColor: "#565C65",
              borderLeftColor: "#565C65",
              borderRadius: 0,
              backgroundColor: "#FFFFFF",
              appearance: "none",
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M7 10l5 5 5-5H7z' fill='%231B1B1B'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 4px center",
              backgroundSize: "16px",
              cursor: "pointer",
            }}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table
          className="usa-table-stacked"
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontFamily: "'Public Sans', sans-serif",
            fontSize: 14,
            tableLayout: "fixed",
          }}
        >
          <colgroup>
            {COL_WIDTHS.map((w, i) => (
              <col key={i} style={{ width: w }} />
            ))}
          </colgroup>
          <thead>
            <tr>
              {/* Document Name — sortable */}
              {renderSortableTh("name", "Document Name")}
              {/* Category — sortable */}
              {renderSortableTh("category", "Category")}
              {/* Description — not sortable */}
              <th
                style={{
                  backgroundColor: "#F0F0F0",
                  color: "#1B1B1B",
                  fontWeight: 700,
                  fontSize: 13,
                  lineHeight: "20px",
                  padding: "12px 12px",
                  textAlign: "left",
                  whiteSpace: "nowrap",
                  ...thBorder,
                }}
              >
                Description
              </th>
              {/* Uploaded Date — sortable */}
              {renderSortableTh("uploadedDate", "Uploaded Date")}
              {/* File Name column (not sortable) */}
              <th
                style={{
                  backgroundColor: "#F0F0F0",
                  color: "#1B1B1B",
                  fontWeight: 700,
                  fontSize: 13,
                  lineHeight: "20px",
                  padding: "12px 12px",
                  textAlign: "left",
                  whiteSpace: "nowrap",
                  ...thBorder,
                }}
              >
                File Name
              </th>
              {/* Controls header */}
              <th
                style={{
                  backgroundColor: "#F0F0F0",
                  color: "#1B1B1B",
                  fontWeight: 700,
                  fontSize: 13,
                  lineHeight: "20px",
                  padding: "12px 12px",
                  textAlign: "left",
                  whiteSpace: "nowrap",
                  ...thBorder,
                }}
              >
                Controls
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  style={{
                    padding: "24px 12px",
                    textAlign: "center",
                    color: "#71767A",
                    fontStyle: "italic",
                    ...cellBorder,
                  }}
                >
                  No documents found.
                </td>
              </tr>
            )}
            {paginatedData.map((row, idx) => {
              const bg = idx % 2 === 1 ? "#F0F0F0" : "#FFFFFF";
              const isExpanded = expandedDescs.has(row.id);
              const needsTruncation = row.description.length > DESC_LIMIT;
              return (
                <tr key={row.id}>
                  <td
                    data-label="Document Name"
                    style={{
                      padding: "14px 12px",
                      backgroundColor: bg,
                      color: "#1B1B1B",
                      lineHeight: "22px",
                      wordWrap: "break-word",
                      overflowWrap: "break-word",
                      ...cellBorder,
                    }}
                  >
                    {row.name}
                  </td>
                  <td
                    data-label="Category"
                    style={{
                      padding: "14px 12px",
                      backgroundColor: bg,
                      color: "#1B1B1B",
                      lineHeight: "22px",
                      wordWrap: "break-word",
                      overflowWrap: "break-word",
                      ...cellBorder,
                    }}
                  >
                    {row.category}
                  </td>
                  {/* Description cell */}
                  <td
                    data-label="Description"
                    style={{
                      padding: "14px 12px",
                      backgroundColor: bg,
                      color: "#1B1B1B",
                      lineHeight: "22px",
                      wordWrap: "break-word",
                      overflowWrap: "break-word",
                      verticalAlign: "top",
                      ...cellBorder,
                    }}
                  >
                    {needsTruncation && !isExpanded ? (
                      <span>
                        {row.description.slice(0, DESC_LIMIT)}
                        <button
                          onClick={() =>
                            setExpandedDescs((prev) => {
                              const next = new Set(prev);
                              next.add(row.id);
                              return next;
                            })
                          }
                          style={{
                            fontFamily: "'Public Sans', sans-serif",
                            fontSize: 14,
                            color: "#005EA2",
                            backgroundColor: "transparent",
                            cursor: "pointer",
                            padding: 0,
                            textDecoration: "underline",
                            ...noBorder,
                          }}
                          aria-label="Show full description"
                        >
                          ...
                        </button>
                      </span>
                    ) : (
                      <span>{row.description}</span>
                    )}
                  </td>
                  <td
                    data-label="Uploaded Date"
                    style={{
                      padding: "14px 12px",
                      backgroundColor: bg,
                      color: "#1B1B1B",
                      lineHeight: "22px",
                      ...cellBorder,
                    }}
                  >
                    {row.uploadedDate}
                  </td>
                  <td
                    data-label="File Name"
                    style={{
                      padding: "14px 12px",
                      backgroundColor: bg,
                      color: "#005EA2",
                      lineHeight: "22px",
                      textDecoration: "underline",
                      wordWrap: "break-word",
                      overflowWrap: "break-word",
                      ...cellBorder,
                    }}
                  >
                    {row.fileName}
                  </td>
                  {/* Controls */}
                  <td
                    data-label="Controls"
                    style={{
                      padding: "14px 12px",
                      backgroundColor: bg,
                      lineHeight: "22px",
                      ...cellBorder,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: 8,
                        alignItems: "center",
                      }}
                    >
                      <button
                        title="View Document"
                        style={controlBtnStyle}
                        onClick={() => setViewingDoc(row)}
                      >
                        <Eye size={16} color="#FFFFFF" />
                      </button>
                      <button
                        title="Delete Document"
                        style={controlBtnStyle}
                        onClick={() => setDeletingDoc(row)}
                      >
                        <Trash2 size={16} color="#FFFFFF" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 &&
        (() => {
          const pages = getPageNumbers(currentPage, totalPages);
          return (
            <nav
              aria-label="Pagination"
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 24,
              }}
            >
              <ul
                style={{
                  display: "flex",
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  alignItems: "stretch",
                }}
              >
                {/* Previous */}
                <li>
                  <button
                    disabled={currentPage === 0}
                    onClick={() => setCurrentPage((p) => p - 1)}
                    aria-label="Previous page"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                      height: 40,
                      padding: "0 12px",
                      fontFamily: "'Public Sans', sans-serif",
                      fontSize: 14,
                      color: currentPage === 0 ? "#757575" : "#005EA2",
                      backgroundColor: "transparent",
                      cursor: currentPage === 0 ? "default" : "pointer",
                      textDecoration:
                        currentPage === 0 ? "none" : "underline",
                      ...noBorder,
                    }}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"
                        fill="currentColor"
                      />
                    </svg>
                    Previous
                  </button>
                </li>

                {/* Page numbers */}
                {pages.map((page, idx) =>
                  page === "..." ? (
                    <li key={`ellipsis-${idx}`}>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: 40,
                          height: 40,
                          fontFamily: "'Public Sans', sans-serif",
                          fontSize: 14,
                          color: "#1B1B1B",
                        }}
                      >
                        ...
                      </span>
                    </li>
                  ) : (
                    <li key={page}>
                      <button
                        onClick={() => setCurrentPage(page as number)}
                        aria-label={`Page ${(page as number) + 1}`}
                        aria-current={
                          currentPage === page ? "page" : undefined
                        }
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: 40,
                          height: 40,
                          fontFamily: "'Public Sans', sans-serif",
                          fontSize: 14,
                          fontWeight: currentPage === page ? 700 : 400,
                          color:
                            currentPage === page ? "#FFFFFF" : "#005EA2",
                          backgroundColor:
                            currentPage === page ? "#005EA2" : "transparent",
                          borderRadius: currentPage === page ? 2 : 0,
                          cursor: "pointer",
                          textDecoration:
                            currentPage === page ? "none" : "underline",
                          ...noBorder,
                        }}
                      >
                        {(page as number) + 1}
                      </button>
                    </li>
                  )
                )}

                {/* Next */}
                <li>
                  <button
                    disabled={currentPage >= totalPages - 1}
                    onClick={() => setCurrentPage((p) => p + 1)}
                    aria-label="Next page"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                      height: 40,
                      padding: "0 12px",
                      fontFamily: "'Public Sans', sans-serif",
                      fontSize: 14,
                      color:
                        currentPage >= totalPages - 1
                          ? "#757575"
                          : "#005EA2",
                      backgroundColor: "transparent",
                      cursor:
                        currentPage >= totalPages - 1
                          ? "default"
                          : "pointer",
                      textDecoration:
                        currentPage >= totalPages - 1
                          ? "none"
                          : "underline",
                      ...noBorder,
                    }}
                  >
                    Next
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </li>
              </ul>
            </nav>
          );
        })()}

      {/* Upload Document button */}
      <div style={{ marginTop: 24 }}>
        <button
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
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            ...noBorder,
          }}
          onClick={() => setShowUploadModal(true)}
        >
          <Upload size={18} />
          Upload Document
        </button>
      </div>

      {/* Modals */}
      {showUploadModal && (
        <UploadDocumentModal
          onUpload={handleUpload}
          onCancel={() => setShowUploadModal(false)}
        />
      )}
      {viewingDoc && (
        <ViewDocumentModal
          doc={viewingDoc}
          onClose={() => setViewingDoc(null)}
        />
      )}
      {deletingDoc && (
        <DeleteConfirmModal
          doc={deletingDoc}
          onConfirm={handleDelete}
          onCancel={() => setDeletingDoc(null)}
        />
      )}
      </div>
    </PageShell>
  );
}