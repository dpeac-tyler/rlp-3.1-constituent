import { useState, useMemo, useRef, useEffect } from "react";
import { Eye, Download, ExternalLink } from "lucide-react";
import { useIsMobile } from "../hooks/useIsMobile";

/* USWDS-style Checkbox */
function UsaCheckbox({
  checked,
  indeterminate,
  onChange,
  ariaLabel,
}: {
  checked: boolean;
  indeterminate?: boolean;
  onChange: () => void;
  ariaLabel?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = !!indeterminate;
    }
  }, [indeterminate]);

  const showCheck = checked && !indeterminate;
  const showDash = !!indeterminate;
  const filled = checked || !!indeterminate;

  return (
    <label
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        width: 20,
        height: 20,
        cursor: "pointer",
      }}
    >
      <input
        ref={inputRef}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        aria-label={ariaLabel}
        style={{
          position: "absolute",
          opacity: 0,
          width: 20,
          height: 20,
          margin: 0,
          cursor: "pointer",
        }}
      />
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 20,
          height: 20,
          backgroundColor: filled ? "#005EA2" : "#FFFFFF",
          borderTopWidth: 2,
          borderTopStyle: "solid",
          borderTopColor: filled ? "#005EA2" : "#1B1B1B",
          borderRightWidth: 2,
          borderRightStyle: "solid",
          borderRightColor: filled ? "#005EA2" : "#1B1B1B",
          borderBottomWidth: 2,
          borderBottomStyle: "solid",
          borderBottomColor: filled ? "#005EA2" : "#1B1B1B",
          borderLeftWidth: 2,
          borderLeftStyle: "solid",
          borderLeftColor: filled ? "#005EA2" : "#1B1B1B",
          borderRadius: 2,
          pointerEvents: "none",
        }}
      >
        {showCheck && (
          <svg
            width="14"
            height="11"
            viewBox="0 0 14 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 5.5L5 9.5L13 1.5"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
        {showDash && (
          <svg
            width="12"
            height="2"
            viewBox="0 0 12 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="12" height="2" rx="1" fill="#FFFFFF" />
          </svg>
        )}
      </span>
    </label>
  );
}

interface PaymentRequest {
  id: string;
  licenseType: string;
  applicationName: string;
  submissionNumber: string;
  constituentName: string;
  status: string;
  lastUpdated: string;
}

type PaymentView = "approved" | "paid" | "pending" | "denied";

const MOCK_DATA: PaymentRequest[] = [
  // Approved
  {
    id: "a1",
    licenseType: "Professional License",
    applicationName: "CPA License Renewal Application",
    submissionNumber: "800031200",
    constituentName: "A. Martinez",
    status: "Approved",
    lastUpdated: "02/25/2026",
  },
  {
    id: "a2",
    licenseType: "Contractor License",
    applicationName: "General Contractor Certification",
    submissionNumber: "800031185",
    constituentName: "K. Thompson",
    status: "Approved",
    lastUpdated: "02/24/2026",
  },
  {
    id: "a3",
    licenseType: "General Business Permit",
    applicationName: "Annual Operating Permit Renewal",
    submissionNumber: "800031102",
    constituentName: "L. Chen",
    status: "Approved",
    lastUpdated: "02/22/2026",
  },
  {
    id: "a4",
    licenseType: "Food Service Permit",
    applicationName: "Food Handler Certification App",
    submissionNumber: "800031044",
    constituentName: "R. Patel",
    status: "Approved",
    lastUpdated: "02/20/2026",
  },
  {
    id: "a5",
    licenseType: "Professional License",
    applicationName: "Pharmacist License Application",
    submissionNumber: "800030998",
    constituentName: "S. Williams",
    status: "Approved",
    lastUpdated: "02/18/2026",
  },
  // Paid
  {
    id: "p1",
    licenseType: "Contractor License",
    applicationName: "Electrical Contractor Renewal",
    submissionNumber: "800030911",
    constituentName: "J. Rodriguez",
    status: "Paid",
    lastUpdated: "02/15/2026",
  },
  {
    id: "p2",
    licenseType: "General Business Permit",
    applicationName: "New Asset Registration Payment",
    submissionNumber: "800030876",
    constituentName: "M. Johnson",
    status: "Paid",
    lastUpdated: "02/12/2026",
  },
  {
    id: "p3",
    licenseType: "Professional License",
    applicationName: "Real Estate Broker License",
    submissionNumber: "800030755",
    constituentName: "T. Davis",
    status: "Paid",
    lastUpdated: "02/08/2026",
  },
  {
    id: "p4",
    licenseType: "Food Service Permit",
    applicationName: "Restaurant Inspection Permit",
    submissionNumber: "800030710",
    constituentName: "N. Garcia",
    status: "Paid",
    lastUpdated: "02/06/2026",
  },
  // Pending
  {
    id: "pe1",
    licenseType: "Contractor License",
    applicationName: "Plumbing Contractor Certification",
    submissionNumber: "800030690",
    constituentName: "B. Anderson",
    status: "Pending",
    lastUpdated: "02/05/2026",
  },
  {
    id: "pe2",
    licenseType: "General Business Permit",
    applicationName: "Retail Storefront Permit Renewal",
    submissionNumber: "800030622",
    constituentName: "E. Taylor",
    status: "Pending",
    lastUpdated: "02/02/2026",
  },
  {
    id: "pe3",
    licenseType: "Professional License",
    applicationName: "Engineering License Application",
    submissionNumber: "800030580",
    constituentName: "C. Wilson",
    status: "Pending",
    lastUpdated: "01/30/2026",
  },
  // Denied
  {
    id: "d1",
    licenseType: "Food Service Permit",
    applicationName: "Mobile Vendor Permit Application",
    submissionNumber: "800030801",
    constituentName: "D. Kim",
    status: "Denied",
    lastUpdated: "02/10/2026",
  },
  {
    id: "d2",
    licenseType: "Contractor License",
    applicationName: "HVAC Contractor License Renewal",
    submissionNumber: "800030540",
    constituentName: "F. Brown",
    status: "Denied",
    lastUpdated: "01/28/2026",
  },
];

type SortKey = keyof Omit<PaymentRequest, "id">;
type SortDir = "asc" | "desc" | null;

const COLUMNS: { key: SortKey; label: string }[] = [
  { key: "licenseType", label: "License Type" },
  { key: "applicationName", label: "Application Name" },
  { key: "submissionNumber", label: "Submission Number" },
  { key: "constituentName", label: "Constituent Name" },
  { key: "status", label: "Status" },
  { key: "lastUpdated", label: "Last Updated" },
];

const STATUS_COLOR: Record<string, string> = {
  Approved: "#2E8540",
  Paid: "#005EA2",
  Pending: "#E5A000",
  Denied: "#B50909",
};

const VIEW_OPTIONS: { key: PaymentView; label: string }[] = [
  { key: "approved", label: "Approved" },
  { key: "paid", label: "Paid" },
  { key: "pending", label: "Pending" },
  { key: "denied", label: "Denied" },
];

const VIEW_STATUS_MAP: Record<PaymentView, string> = {
  approved: "Approved",
  paid: "Paid",
  pending: "Pending",
  denied: "Denied",
};

export function PaymentRequestsTable() {
  const [activeView, setActiveView] = useState<PaymentView>("approved");
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const isMobile = useIsMobile();

  const showControls = activeView === "paid";
  const showSelect = activeView === "pending";

  const handleViewChange = (view: PaymentView) => {
    setActiveView(view);
    setSortKey(null);
    setSortDir(null);
    setCurrentPage(0);
    setSelectedIds(new Set());
  };

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

  const filteredData = useMemo(
    () => MOCK_DATA.filter((r) => r.status === VIEW_STATUS_MAP[activeView]),
    [activeView]
  );

  const sortedData = useMemo(() => {
    if (!sortKey || !sortDir) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      const cmp = aVal.localeCompare(bVal);
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [filteredData, sortKey, sortDir]);

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

  const stripeColor = "#F0F0F0";

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

  const paginationBtnBorder: React.CSSProperties = {
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

  /* Column widths adjust based on whether Controls is visible */
  const colWidths = showControls
    ? ["16%", "22%", "14%", "14%", "10%", "12%", "12%"]
    : showSelect
      ? ["5%", "17%", "24%", "13%", "15%", "12%", "14%"]
      : ["18%", "26%", "14%", "16%", "12%", "14%"];

  /* Checkbox helpers for Pending view */
  const allPageSelected =
    paginatedData.length > 0 &&
    paginatedData.every((r) => selectedIds.has(r.id));
  const somePageSelected =
    paginatedData.some((r) => selectedIds.has(r.id)) && !allPageSelected;

  const toggleAll = () => {
    const next = new Set(selectedIds);
    if (allPageSelected) {
      paginatedData.forEach((r) => next.delete(r.id));
    } else {
      paginatedData.forEach((r) => next.add(r.id));
    }
    setSelectedIds(next);
  };

  const toggleOne = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const totalColSpan = showControls ? 7 : showSelect ? 7 : 6;

  return (
    <div>
      {/* Segmented button bar — right-aligned */}
      <div
        style={{
          display: "flex",
          justifyContent: isMobile ? "flex-start" : "flex-end",
          marginBottom: 16,
        }}
      >
        <div style={{ display: "inline-flex", flexWrap: "wrap" }}>
          {VIEW_OPTIONS.map((opt, idx) => {
            const isActive = activeView === opt.key;
            const isFirst = idx === 0;
            const isLast = idx === VIEW_OPTIONS.length - 1;
            return (
              <button
                key={opt.key}
                onClick={() => handleViewChange(opt.key)}
                style={{
                  fontFamily: "'Public Sans', sans-serif",
                  fontSize: 14,
                  fontWeight: 700,
                  lineHeight: "20px",
                  padding: "8px 20px",
                  cursor: "pointer",
                  backgroundColor: isActive ? "#005EA2" : "#FFFFFF",
                  color: isActive ? "#FFFFFF" : "#005EA2",
                  borderTopWidth: 2,
                  borderTopStyle: "solid",
                  borderTopColor: "#005EA2",
                  borderBottomWidth: 2,
                  borderBottomStyle: "solid",
                  borderBottomColor: "#005EA2",
                  borderLeftWidth: isFirst ? 2 : 1,
                  borderLeftStyle: "solid",
                  borderLeftColor: "#005EA2",
                  borderRightWidth: isLast ? 2 : 1,
                  borderRightStyle: "solid",
                  borderRightColor: "#005EA2",
                  borderTopLeftRadius: isFirst ? 4 : 0,
                  borderBottomLeftRadius: isFirst ? 4 : 0,
                  borderTopRightRadius: isLast ? 4 : 0,
                  borderBottomRightRadius: isLast ? 4 : 0,
                }}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Top bar: Showing X-Y of Z  |  Show dropdown */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
          flexWrap: "wrap",
          gap: 8,
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
      <div style={{ overflowX: "hidden" }}>
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
            {colWidths.map((w, i) => (
              <col key={i} style={{ width: w }} />
            ))}
          </colgroup>
          <thead>
            <tr>
              {showSelect && (
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
                  <UsaCheckbox
                    checked={allPageSelected}
                    indeterminate={somePageSelected}
                    onChange={toggleAll}
                    ariaLabel="Select all"
                  />
                </th>
              )}
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
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
                  {col.label}
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
                    <svg
                      width="8"
                      height="6"
                      viewBox="0 0 8 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 0L8 6H0L4 0Z"
                        fill={
                          sortKey === col.key && sortDir === "asc"
                            ? "#1B1B1B"
                            : "#A9AEB1"
                        }
                      />
                    </svg>
                    <svg
                      width="8"
                      height="6"
                      viewBox="0 0 8 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 6L0 0H8L4 6Z"
                        fill={
                          sortKey === col.key && sortDir === "desc"
                            ? "#1B1B1B"
                            : "#A9AEB1"
                        }
                      />
                    </svg>
                  </span>
                </th>
              ))}
              {showControls && (
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
              )}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 && (
              <tr>
                <td
                  colSpan={totalColSpan}
                  style={{
                    padding: "24px 12px",
                    textAlign: "center",
                    color: "#71767A",
                    fontStyle: "italic",
                    ...cellBorder,
                  }}
                >
                  No records found.
                </td>
              </tr>
            )}
            {paginatedData.map((row, idx) => {
              const isStripe = idx % 2 === 1;
              const bg = isStripe ? stripeColor : "#FFFFFF";
              return (
                <tr key={row.id}>
                  {showSelect && (
                    <td
                      data-label=""
                      style={{
                        padding: "14px 12px",
                        backgroundColor: bg,
                        lineHeight: "22px",
                        ...cellBorder,
                      }}
                    >
                      <UsaCheckbox
                        checked={selectedIds.has(row.id)}
                        onChange={() => toggleOne(row.id)}
                        ariaLabel={`Select ${row.constituentName}`}
                      />
                    </td>
                  )}
                  <td
                    data-label="License Type"
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
                    {row.licenseType}
                  </td>
                  <td
                    data-label="Application Name"
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
                    {row.applicationName}
                  </td>
                  <td
                    data-label="Submission Number"
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
                    {row.submissionNumber}
                  </td>
                  <td
                    data-label="Constituent Name"
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
                    {row.constituentName}
                  </td>
                  <td
                    data-label="Status"
                    style={{
                      padding: "14px 12px",
                      backgroundColor: bg,
                      color: STATUS_COLOR[row.status] || "#1B1B1B",
                      fontStyle: "normal",
                      lineHeight: "22px",
                      wordWrap: "break-word",
                      overflowWrap: "break-word",
                      borderBottomWidth: 1,
                      borderBottomStyle: "solid",
                      borderBottomColor: "#DFE1E2",
                      borderTopWidth: 0,
                      borderTopStyle: "none",
                      borderTopColor: "#DFE1E2",
                      borderLeftWidth: 0,
                      borderLeftStyle: "none",
                      borderLeftColor: "#DFE1E2",
                      borderRightWidth: 0,
                      borderRightStyle: "none",
                      borderRightColor: "#DFE1E2",
                    }}
                  >
                    {row.status}
                  </td>
                  <td
                    data-label="Last Updated"
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
                    {row.lastUpdated}
                  </td>
                  {showControls && (
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
                        <button title="View Request" style={controlBtnStyle}>
                          <Eye size={16} color="#FFFFFF" />
                        </button>
                        <button
                          title="Download Receipt"
                          style={controlBtnStyle}
                        >
                          <Download size={16} color="#FFFFFF" />
                        </button>
                        <button title="Open Details" style={controlBtnStyle}>
                          <ExternalLink size={16} color="#FFFFFF" />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* USWDS Pagination */}
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
                      ...paginationBtnBorder,
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
                        …
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
                          ...paginationBtnBorder,
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
                      ...paginationBtnBorder,
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

      {/* Action buttons for Pending view */}
      {showSelect && (
        <div
          style={{
            display: "flex",
            gap: 12,
            marginTop: 24,
          }}
        >
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
            }}
          >
            Add to Cart
          </button>
          <button
            style={{
              fontFamily: "'Public Sans', sans-serif",
              fontSize: 16,
              fontWeight: 700,
              lineHeight: "24px",
              padding: "10px 20px",
              backgroundColor: "#E5A000",
              color: "#1B1B1B",
              borderRadius: 4,
              cursor: "pointer",
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
            }}
          >
            Deny
          </button>
        </div>
      )}
    </div>
  );
}