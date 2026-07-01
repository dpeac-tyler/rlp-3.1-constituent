import { useState, useMemo } from "react";
import { Download, Eye } from "lucide-react";
import { PageShell } from "../components/PageShell";
import { IconKeyAccordion } from "../components/IconKeyAccordion";
import { useIsMobile } from "../hooks/useIsMobile";
import { useAgency } from "../components/AgencyContext";

/* ── Types ─────────────────────────────────────────────── */

interface Certification {
  id: string;
  licenseType: string;
  licenseNumber: string;
  applicationType: string;
  status: string;
  startDate: string;
  expirationDate: string;
}

/* ── Mock data ─────────────────────────────────────────── */

const MOCK_DATA: Certification[] = [
  {
    id: "c1",
    licenseType: "DNR Biz Original One",
    licenseNumber: "LIC-2025-00142",
    applicationType: "Original",
    status: "Active",
    startDate: "01/15/2025",
    expirationDate: "01/15/2026",
  },
  {
    id: "c2",
    licenseType: "DNR Business",
    licenseNumber: "LIC-2025-00098",
    applicationType: "Renewal",
    status: "Active",
    startDate: "03/01/2025",
    expirationDate: "03/01/2026",
  },
  {
    id: "c3",
    licenseType: "Type for Renewal-Workflow-Payment",
    licenseNumber: "LIC-2024-00876",
    applicationType: "Original",
    status: "Expired",
    startDate: "06/10/2024",
    expirationDate: "06/10/2025",
  },
  {
    id: "c4",
    licenseType: "DNR Biz Original One",
    licenseNumber: "LIC-2025-00210",
    applicationType: "Amendment",
    status: "Active",
    startDate: "02/20/2025",
    expirationDate: "02/20/2026",
  },
  {
    id: "c5",
    licenseType: "DNR Business",
    licenseNumber: "LIC-2024-00654",
    applicationType: "Original",
    status: "Suspended",
    startDate: "09/05/2024",
    expirationDate: "09/05/2025",
  },
  {
    id: "c6",
    licenseType: "Type for Renewal-Workflow-Payment",
    licenseNumber: "LIC-2025-00315",
    applicationType: "Renewal",
    status: "Active",
    startDate: "04/12/2025",
    expirationDate: "04/12/2026",
  },
  {
    id: "c7",
    licenseType: "DNR Biz Original One",
    licenseNumber: "LIC-2024-00501",
    applicationType: "Original",
    status: "Revoked",
    startDate: "11/01/2024",
    expirationDate: "11/01/2025",
  },
  {
    id: "c8",
    licenseType: "DNR Business",
    licenseNumber: "LIC-2025-00428",
    applicationType: "Renewal",
    status: "Active",
    startDate: "05/18/2025",
    expirationDate: "05/18/2026",
  },
  {
    id: "c9",
    licenseType: "DNR Biz Original One",
    licenseNumber: "LIC-2025-00533",
    applicationType: "Amendment",
    status: "Active",
    startDate: "07/01/2025",
    expirationDate: "07/01/2026",
  },
  {
    id: "c10",
    licenseType: "Type for Renewal-Workflow-Payment",
    licenseNumber: "LIC-2024-00789",
    applicationType: "Original",
    status: "Expired",
    startDate: "08/22/2024",
    expirationDate: "08/22/2025",
  },
  {
    id: "c11",
    licenseType: "DNR Business",
    licenseNumber: "LIC-2025-00601",
    applicationType: "Renewal",
    status: "Active",
    startDate: "06/30/2025",
    expirationDate: "06/30/2026",
  },
];

/* ── Agencies ──────────────────────────────────────────── */

const agencies = [
  { value: "", label: "- Please Select -" },
  { value: "agency-1", label: "Department of Professional & Financial Regulation" },
  { value: "agency-2", label: "Bureau of Consumer Credit Protection" },
];

/* ── Icon key items ────────────────────────────────────── */

const CERT_ICON_ITEMS = [
  { icon: <Eye size={16} color="#FFFFFF" />, label: "View Submission" },
  { icon: <Download size={16} color="#FFFFFF" />, label: "Download Certificate" },
];

/* ── Column config ─────────────────────────────────────── */

type SortKey = keyof Omit<Certification, "id">;
type SortDir = "asc" | "desc" | null;

const COLUMNS: { key: SortKey; label: string }[] = [
  { key: "licenseType", label: "License Type" },
  { key: "licenseNumber", label: "License Number" },
  { key: "applicationType", label: "Application Type" },
  { key: "status", label: "Status" },
  { key: "startDate", label: "Start Date" },
  { key: "expirationDate", label: "Expiration Date" },
];

const COL_WIDTHS = ["18%", "15%", "15%", "10%", "13%", "14%", "15%"];

/* ── Status colors ─────────────────────────────────────── */

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

/* ── Helpers ───────────────────────────────────────────── */

const parseDateForSort = (d: string) => {
  const [mm, dd, yyyy] = d.split("/");
  return new Date(`${yyyy}-${mm}-${dd}`).getTime();
};

/* ── Component ─────────────────────────────────────────── */

export function CertificationsPage() {
  const { selectedAgency, setSelectedAgency } = useAgency();
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
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
    if (!sortKey || !sortDir) return MOCK_DATA;
    return [...MOCK_DATA].sort((a, b) => {
      if (sortKey === "startDate" || sortKey === "expirationDate") {
        const cmp = parseDateForSort(a[sortKey]) - parseDateForSort(b[sortKey]);
        return sortDir === "asc" ? cmp : -cmp;
      }
      const cmp = a[sortKey].localeCompare(b[sortKey]);
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [sortKey, sortDir]);

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
        <svg
          width="8"
          height="6"
          viewBox="0 0 8 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 0L8 6H0L4 0Z"
            fill={sortKey === key && sortDir === "asc" ? "#1B1B1B" : "#A9AEB1"}
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
            fill={sortKey === key && sortDir === "desc" ? "#1B1B1B" : "#A9AEB1"}
          />
        </svg>
      </span>
    </th>
  );

  return (
    <PageShell title="Certifications">
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: 4,
          padding: isMobile ? 16 : 24,
        }}
      >
        {/* USWDS Error Alert */}
        <div
          style={{
            backgroundColor: "#F4E3DB",
            borderLeftWidth: 4,
            borderLeftStyle: "solid",
            borderLeftColor: "#D54309",
            borderTopWidth: 0,
            borderTopStyle: "solid",
            borderTopColor: "#F4E3DB",
            borderRightWidth: 0,
            borderRightStyle: "solid",
            borderRightColor: "#F4E3DB",
            borderBottomWidth: 0,
            borderBottomStyle: "solid",
            borderBottomColor: "#F4E3DB",
            padding: "16px 20px",
            marginBottom: 24,
            display: "flex",
            alignItems: "flex-start",
            gap: 12,
          }}
        >
          {/* Error icon */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ flexShrink: 0, marginTop: 2 }}
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
              fill="#D54309"
            />
          </svg>
          <div>
            <h3
              style={{
                fontFamily: "'Public Sans', sans-serif",
                fontWeight: 700,
                fontSize: 16,
                lineHeight: "24px",
                color: "#1B1B1B",
                margin: 0,
                marginBottom: 4,
              }}
            >
              Error
            </h3>
            <p
              style={{
                fontFamily: "'Public Sans', sans-serif",
                fontSize: 16,
                lineHeight: "26px",
                color: "#1B1B1B",
                margin: 0,
              }}
            >
              There was a problem loading your certifications. Please try again or contact your agency if the issue persists.
            </p>
          </div>
        </div>

        {/* Intro paragraphs */}
        <p
          style={{
            fontFamily: "'Public Sans', sans-serif",
            fontSize: 16,
            lineHeight: "26px",
            color: "#1B1B1B",
            marginBottom: 16,
          }}
        >
          Welcome to your Certificate/​License/​Permit list page. You can view
          licenses from here.
        </p>
        <p
          style={{
            fontFamily: "'Public Sans', sans-serif",
            fontSize: 16,
            lineHeight: "26px",
            color: "#1B1B1B",
            marginBottom: 32,
          }}
        >
          Dates and times in RLP are generated in UTC but displayed on your
          computer in your local timezone.
        </p>

        {/* USWDS-style Select */}
        <div className="w-full" style={{ marginBottom: 32 }}>
          <label
            htmlFor="certifications-agency-select"
            style={{
              display: "block",
              fontFamily: "'Public Sans', sans-serif",
              fontWeight: 700,
              fontSize: 16,
              lineHeight: "24px",
              color: "#1B1B1B",
              marginBottom: 4,
            }}
          >
            Select Agency
          </label>
          <select
            id="certifications-agency-select"
            value={selectedAgency}
            onChange={(e) => {
              setSelectedAgency(e.target.value);
              setCurrentPage(0);
            }}
            className="w-full"
            style={{
              fontFamily: "'Public Sans', sans-serif",
              fontSize: 16,
              lineHeight: "24px",
              color: "#1B1B1B",
              height: 40,
              padding: "0 32px 0 8px",
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
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M7 10l5 5 5-5H7z' fill='%231B1B1B'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 8px center",
              backgroundSize: "20px",
              cursor: "pointer",
            }}
          >
            {agencies.map((agency) => (
              <option key={agency.value} value={agency.value}>
                {agency.label}
              </option>
            ))}
          </select>
        </div>

        {/* Content: gated by agency selection */}
        {!selectedAgency ? (
          <p
            style={{
              fontFamily: "'Public Sans', sans-serif",
              fontSize: 16,
              lineHeight: "26px",
              color: "#71767A",
            }}
          >
            No Certifications available.
          </p>
        ) : (
          <>
            {/* Icon Key Accordion */}
            <IconKeyAccordion
              items={CERT_ICON_ITEMS}
              sessionKey="icon-key-certifications-open"
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
                    {COLUMNS.map((col) => renderSortableTh(col.key, col.label))}
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
                        colSpan={7}
                        style={{
                          padding: "24px 12px",
                          textAlign: "center",
                          color: "#71767A",
                          fontStyle: "italic",
                          ...cellBorder,
                        }}
                      >
                        No certifications found.
                      </td>
                    </tr>
                  )}
                  {paginatedData.map((row, idx) => {
                    const bg = idx % 2 === 1 ? "#F0F0F0" : "#FFFFFF";
                    return (
                      <tr key={row.id}>
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
                          data-label="License Number"
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
                          {row.licenseNumber}
                        </td>
                        <td
                          data-label="Application Type"
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
                          {row.applicationType}
                        </td>
                        <td
                          data-label="Status"
                          style={{
                            padding: "10px 12px",
                            backgroundColor: bg,
                            lineHeight: "22px",
                            ...cellBorder,
                          }}
                        >
                          <span style={{ color: STATUS_COLOR[row.status] ?? "#1B1B1B", fontFamily: "'Public Sans', sans-serif", fontSize: 14 }}>{row.status}</span>
                        </td>
                        <td
                          data-label="Start Date"
                          style={{
                            padding: "14px 12px",
                            backgroundColor: bg,
                            color: "#1B1B1B",
                            lineHeight: "22px",
                            ...cellBorder,
                          }}
                        >
                          {row.startDate}
                        </td>
                        <td
                          data-label="Expiration Date"
                          style={{
                            padding: "14px 12px",
                            backgroundColor: bg,
                            color: "#1B1B1B",
                            lineHeight: "22px",
                            ...cellBorder,
                          }}
                        >
                          {row.expirationDate}
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
                              title="View Submission"
                              style={controlBtnStyle}
                            >
                              <Eye size={16} color="#FFFFFF" />
                            </button>
                            <button
                              title="Download Certificate"
                              style={controlBtnStyle}
                            >
                              <Download size={16} color="#FFFFFF" />
                            </button>
                          </div>
                        </td>
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
                                  currentPage === page
                                    ? "#005EA2"
                                    : "transparent",
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
          </>
        )}
      </div>
    </PageShell>
  );
}