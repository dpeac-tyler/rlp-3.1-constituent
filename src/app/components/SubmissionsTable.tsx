import React, { useState, useMemo } from "react";
import { Download, ExternalLink, Eye, UserPen } from "lucide-react";

interface ChildSubmission {
  id: string;
  applicationName: string;
  submissionNumber: string;
  constituentName: string;
  status: string;
  lastUpdated: string;
}

interface Submission {
  id: string;
  licenseType: string;
  applicationName: string;
  submissionNumber: string;
  constituentName: string;
  status: string;
  lastUpdated: string;
  isPacket?: boolean;
  children?: ChildSubmission[];
}

const MOCK_DATA: Submission[] = [
  {
    id: "1",
    licenseType: "Firearms Business License",
    applicationName: "FBLA - Company",
    submissionNumber: "700024500",
    constituentName: "Boring Company 155",
    status: "Pending",
    lastUpdated: "07/08/2025",
    isPacket: true,
    children: [
      {
        id: "1-1",
        applicationName: "FBLA - Owner",
        submissionNumber: "700024501",
        constituentName: "Jerome Tinder",
        status: "Pending",
        lastUpdated: "07/08/2025",
      },
      {
        id: "1-2",
        applicationName: "FBLA - Manager",
        submissionNumber: "700024502",
        constituentName: "Shiela Benefits",
        status: "Pending",
        lastUpdated: "07/08/2025",
      },
      {
        id: "1-3",
        applicationName: "FBLA - Officer",
        submissionNumber: "700024503",
        constituentName: "Ricky Schuler",
        status: "Denied",
        lastUpdated: "07/08/2025",
      },
    ],
  },
  {
    id: "2",
    licenseType: "DNR Business",
    applicationName: "Test application for Branches",
    submissionNumber: "700024099",
    constituentName: "",
    status: "Approved",
    lastUpdated: "07/08/2025",
  },
  {
    id: "3",
    licenseType: "Type for Renewal-Workflow-Payment",
    applicationName: "Renewal for Ren. Lic App-Firas",
    submissionNumber: "700023463",
    constituentName: "",
    status: "Approved",
    lastUpdated: "07/08/2025",
  },
  {
    id: "4",
    licenseType: "Type for Renewal-Workflow-Payment",
    applicationName: "Original App for Ren. Lic. Type-Firas",
    submissionNumber: "700023455",
    constituentName: "",
    status: "Approved",
    lastUpdated: "07/08/2025",
  },
  {
    id: "5",
    licenseType: "DNR Biz Original One",
    applicationName: "Business License Application",
    submissionNumber: "700023100",
    constituentName: "J. Smith",
    status: "Pending",
    lastUpdated: "06/22/2025",
  },
];

type SortKey = keyof Omit<Submission, "id">;
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
  Active: "#417505", Approved: "#417505", Live: "#417505", Paid: "#417505", Completed: "#417505", Sent: "#417505",
  Pending: "#8F5800", Open: "#8F5800", Assigned: "#8F5800", "Approved - Awaiting Payment": "#8F5800", "Awaiting Application": "#8F5800", "Awaiting Applications": "#8F5800", Generated: "#8F5800",
  Rejected: "#CD2026", Denied: "#CD2026", Cancelled: "#CD2026", "Past Due": "#CD2026", Terminated: "#CD2026",
  Expired: "#80252A", Revoked: "#80252A", Withdrawn: "#80252A", Decommissioned: "#80252A", Retired: "#80252A",
  "In Progress": "#205493", "Rejected for Resubmission": "#205493", "In Cart": "#205493", Submitted: "#205493",
  "On Hold": "#A34900", Suspended: "#A34900", "Payment in Process": "#A34900", Inactive: "#A34900",
  "In Review": "#13669A", Draft: "#13669A", Initiated: "#13669A",
  Archived: "#5C5F66",
};

function SortIcon({ dir }: { dir: SortDir }) {
  return (
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
          fill={dir === "asc" ? "#FFFFFF" : "rgba(255,255,255,0.4)"}
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
          fill={dir === "desc" ? "#FFFFFF" : "rgba(255,255,255,0.4)"}
        />
      </svg>
    </span>
  );
}

/* View icon — eye */
function ViewIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5M12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5m0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3"
        fill="#2E7D72"
      />
    </svg>
  );
}

/* Document/history icon */
function HistoryIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7a6.97 6.97 0 0 1-4.95-2.05l-1.41 1.41A8.97 8.97 0 0 0 13 21a9 9 0 0 0 0-18m-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8z"
        fill="#2E7D72"
      />
    </svg>
  );
}

const childCellStyle: React.CSSProperties = {
  padding: "10px 12px",
  backgroundColor: "#E8F0F8",
  color: "#1B1B1B",
  lineHeight: "22px",
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
  wordWrap: "break-word",
  overflowWrap: "break-word",
  fontSize: 13,
};

export function SubmissionsTable() {
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleExpand = (id: string) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
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

  const sortedData = useMemo(() => {
    if (!sortKey || !sortDir) return MOCK_DATA;
    return [...MOCK_DATA].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      const cmp = aVal.localeCompare(bVal);
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [sortKey, sortDir]);

  const totalEntries = sortedData.length;
  const paginatedData = sortedData.slice(
    currentPage * pageSize,
    currentPage * pageSize + pageSize
  );
  const start = currentPage * pageSize + 1;
  const end = Math.min(currentPage * pageSize + pageSize, totalEntries);
  const totalPages = Math.ceil(totalEntries / pageSize);

  /** Build USWDS-style page number array: 1 … 4 [5] 6 … 10 */
  const getPageNumbers = (current: number, total: number): (number | "...")[] => {
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i);
    }
    const pages: (number | "...")[] = [];
    pages.push(0); // always show first
    if (current > 3) pages.push("...");
    const rangeStart = Math.max(1, current - 1);
    const rangeEnd = Math.min(total - 2, current + 1);
    for (let i = rangeStart; i <= rangeEnd; i++) pages.push(i);
    if (current < total - 4) pages.push("...");
    pages.push(total - 1); // always show last
    return pages;
  };

  const stripeColor = "#F0F0F0";

  return (
    <div>
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
            <col style={{ width: "16%" }} />
            <col style={{ width: "22%" }} />
            <col style={{ width: "14%" }} />
            <col style={{ width: "14%" }} />
            <col style={{ width: "9%" }} />
            <col style={{ width: "12%" }} />
            <col style={{ width: "13%" }} />
          </colgroup>
          <thead>
            <tr>
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
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 0L8 6H0L4 0Z" fill={sortKey === col.key && sortDir === "asc" ? "#1B1B1B" : "#A9AEB1"} />
                    </svg>
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 6L0 0H8L4 6Z" fill={sortKey === col.key && sortDir === "desc" ? "#1B1B1B" : "#A9AEB1"} />
                    </svg>
                  </span>
                </th>
              ))}
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
                }}
              >
                Controls
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, idx) => {
              const isStripe = idx % 2 === 1;
              const isExpanded = expandedRows.has(row.id);
              return (
                <React.Fragment key={row.id}>
                <tr>
                  {/* License Type — first cell */}
                  <td
                    data-label="License Type"
                    style={{
                      padding: "14px 12px",
                      backgroundColor: isStripe ? stripeColor : "#FFFFFF",
                      color: "#1B1B1B",
                      lineHeight: "22px",
                      borderLeftWidth: 0,
                      borderLeftStyle: "solid",
                      borderLeftColor: "transparent",
                      borderBottomWidth: 1,
                      borderBottomStyle: "solid",
                      borderBottomColor: "#DFE1E2",
                      borderTopWidth: 0,
                      borderTopStyle: "solid",
                      borderTopColor: "transparent",
                      borderRightWidth: 0,
                      borderRightStyle: "solid",
                      borderRightColor: "transparent",
                      wordWrap: "break-word",
                      overflowWrap: "break-word",
                    }}
                  >
                    {row.isPacket ? (
                      <button
                        onClick={() => toggleExpand(row.id)}
                        title={isExpanded ? "Collapse" : "Expand"}
                        style={{
                          background: "none",
                          border: "none",
                          padding: 0,
                          cursor: "pointer",
                          fontFamily: "'Public Sans', sans-serif",
                          fontSize: 14,
                          color: "#1B1B1B",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          textAlign: "left",
                        }}
                      >
                        <span style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: 18,
                          height: 18,
                          borderWidth: 1,
                          borderStyle: "solid",
                          borderColor: "#1B1B1B",
                          borderRadius: 2,
                          fontSize: 14,
                          lineHeight: 1,
                          flexShrink: 0,
                        }}>
                          {isExpanded ? "−" : "+"}
                        </span>
                        {row.licenseType}
                      </button>
                    ) : (
                      row.licenseType
                    )}
                  </td>
                  {/* Application Name */}
                  <td
                    data-label="Application Name"
                    style={{
                      padding: "14px 12px",
                      backgroundColor: isStripe ? stripeColor : "#FFFFFF",
                      color: "#1B1B1B",
                      lineHeight: "22px",
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
                      wordWrap: "break-word",
                      overflowWrap: "break-word",
                    }}
                  >
                    {row.isPacket ? (
                      <span style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                        {row.applicationName}
                        <span style={{
                          display: "inline-block",
                          fontSize: 11,
                          color: "#fff",
                          textTransform: "uppercase",
                          backgroundColor: "#5c5c5c",
                          borderRadius: 2,
                          padding: "1px 6px",
                          fontWeight: 700,
                          letterSpacing: "0.04em",
                        }}>Primary</span>
                      </span>
                    ) : row.applicationName}
                  </td>
                  {/* Submission Number */}
                  <td
                    data-label="Submission Number"
                    style={{
                      padding: "14px 12px",
                      backgroundColor: isStripe ? stripeColor : "#FFFFFF",
                      color: "#1B1B1B",
                      lineHeight: "22px",
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
                      wordWrap: "break-word",
                      overflowWrap: "break-word",
                    }}
                  >
                    {row.submissionNumber}
                  </td>
                  {/* Constituent Name */}
                  <td
                    data-label="Constituent Name"
                    style={{
                      padding: "14px 12px",
                      backgroundColor: isStripe ? stripeColor : "#FFFFFF",
                      color: "#1B1B1B",
                      lineHeight: "22px",
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
                      wordWrap: "break-word",
                      overflowWrap: "break-word",
                    }}
                  >
                    {row.constituentName}
                  </td>
                  {/* Status */}
                  <td
                    data-label="Status"
                    style={{
                      padding: "14px 12px",
                      backgroundColor: isStripe ? stripeColor : "#FFFFFF",
                      color: STATUS_COLOR[row.status] || "#1B1B1B",
                      fontStyle: "normal",
                      lineHeight: "22px",
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
                      wordWrap: "break-word",
                      overflowWrap: "break-word",
                    }}
                  >
                    {row.status}
                  </td>
                  {/* Last Updated */}
                  <td
                    data-label="Last Updated"
                    style={{
                      padding: "14px 12px",
                      backgroundColor: isStripe ? stripeColor : "#FFFFFF",
                      color: "#1B1B1B",
                      lineHeight: "22px",
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
                      wordWrap: "break-word",
                      overflowWrap: "break-word",
                    }}
                  >
                    {row.lastUpdated}
                  </td>
                  {/* Controls */}
                  <td
                    data-label="Controls"
                    style={{
                      padding: "14px 12px",
                      backgroundColor: isStripe ? stripeColor : "#FFFFFF",
                      lineHeight: "22px",
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
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <button
                        title="View Submission"
                        style={{
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
                          border: "none",
                        }}
                      >
                        <Eye size={16} color="#FFFFFF" />
                      </button>
                      {!row.isPacket && (
                        <>
                          <button
                            title="Download Certificate"
                            style={{
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
                              border: "none",
                            }}
                          >
                            <Download size={16} color="#FFFFFF" />
                          </button>
                          <button
                            title="Renew Now"
                            style={{
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
                              border: "none",
                            }}
                          >
                            <ExternalLink size={16} color="#FFFFFF" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>

                {/* Child rows for packet submissions */}
                {row.isPacket && isExpanded && row.children?.map((child) => (
                  <tr key={child.id}>
                    <td data-label="License Type" style={{ ...childCellStyle, paddingLeft: 32 }}>—</td>
                    <td data-label="Application Name" style={childCellStyle}>{child.applicationName}</td>
                    <td data-label="Submission Number" style={childCellStyle}>{child.submissionNumber}</td>
                    <td data-label="Constituent Name" style={childCellStyle}>{child.constituentName}</td>
                    <td data-label="Status" style={{ ...childCellStyle, color: STATUS_COLOR[child.status] || "#1B1B1B" }}>{child.status}</td>
                    <td data-label="Last Updated" style={childCellStyle}>{child.lastUpdated}</td>
                    <td data-label="Controls" style={childCellStyle}>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <button title="View Submission" style={{ width: 28, height: 28, minWidth: 28, backgroundColor: "#162E51", borderRadius: 4, display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: 0, border: "none" }}>
                          <Eye size={16} color="#FFFFFF" />
                        </button>
                        {child.status === "Denied" && (
                          <button title="Reassign Applicant" style={{ width: 28, height: 28, minWidth: 28, backgroundColor: "#162E51", borderRadius: 4, display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: 0, border: "none" }}>
                            <UserPen size={16} color="#FFFFFF" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* USWDS Pagination */}
      {totalPages > 1 && (() => {
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
                    textDecoration: currentPage === 0 ? "none" : "underline",
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
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="currentColor" />
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
                      aria-current={currentPage === page ? "page" : undefined}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 40,
                        height: 40,
                        fontFamily: "'Public Sans', sans-serif",
                        fontSize: 14,
                        fontWeight: currentPage === page ? 700 : 400,
                        color: currentPage === page ? "#FFFFFF" : "#005EA2",
                        backgroundColor: currentPage === page ? "#005EA2" : "transparent",
                        borderRadius: currentPage === page ? 2 : 0,
                        cursor: "pointer",
                        textDecoration: currentPage === page ? "none" : "underline",
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
                    color: currentPage >= totalPages - 1 ? "#757575" : "#005EA2",
                    backgroundColor: "transparent",
                    cursor: currentPage >= totalPages - 1 ? "default" : "pointer",
                    textDecoration: currentPage >= totalPages - 1 ? "none" : "underline",
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
                  Next
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" fill="currentColor" />
                  </svg>
                </button>
              </li>
            </ul>
          </nav>
        );
      })()}
    </div>
  );
}