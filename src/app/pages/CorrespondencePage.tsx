import { useState, useMemo } from "react";
import { PageShell } from "../components/PageShell";
import { useIsMobile } from "../hooks/useIsMobile";
import { useAgency } from "../components/AgencyContext";

/* ── Types ─────────────────────────────────────────────── */

interface CorrespondenceItem {
  id: string;
  subject: string;
  from: string;
  to: string;
  date: string;
  status: string;
}

/* ── Mock data (placeholder) ───────────────────────────── */

const MOCK_EMAILS: CorrespondenceItem[] = [
  {
    id: "e1",
    subject: "Application Status Update",
    from: "agency@example.gov",
    to: "user@example.com",
    date: "04/15/2026",
    status: "Read",
  },
  {
    id: "e2",
    subject: "Document Request",
    from: "licensing@example.gov",
    to: "user@example.com",
    date: "04/10/2026",
    status: "Unread",
  },
];

const MOCK_LETTERS: CorrespondenceItem[] = [
  {
    id: "l1",
    subject: "Official Notice - License Renewal",
    from: "Department of Licensing",
    to: "Business Owner",
    date: "04/01/2026",
    status: "Read",
  },
];

/* ── Agencies ──────────────────────────────────────────── */

const agencies = [
  { value: "", label: "- Please Select -" },
  { value: "agency-1", label: "Department of Professional & Financial Regulation" },
  { value: "agency-2", label: "Bureau of Consumer Credit Protection" },
];

/* ── Column config ─────────────────────────────────────── */

type SortKey = keyof Omit<CorrespondenceItem, "id">;
type SortDir = "asc" | "desc" | null;

const COLUMNS: { key: SortKey; label: string }[] = [
  { key: "subject", label: "Subject" },
  { key: "from", label: "From" },
  { key: "to", label: "To" },
  { key: "date", label: "Date" },
  { key: "status", label: "Status" },
];

const COL_WIDTHS = ["30%", "25%", "20%", "15%", "10%"];

/* ── Status colors ─────────────────────────────────────── */

const STATUS_COLOR: Record<string, string> = {
  Read: "#71767A",
  Unread: "#005EA2",
};

/* ── Reusable border objects (longhand only) ───────────── */

const cellBorder: React.CSSProperties = {
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
};

const thBorder: React.CSSProperties = {
  borderBottomWidth: 1,
  borderBottomStyle: "solid",
  borderBottomColor: "#A9AEB1",
  borderTopWidth: 0,
  borderTopStyle: "none",
  borderTopColor: "#A9AEB1",
  borderLeftWidth: 0,
  borderLeftStyle: "none",
  borderLeftColor: "#A9AEB1",
  borderRightWidth: 0,
  borderRightStyle: "none",
  borderRightColor: "#A9AEB1",
};

const noBorder: React.CSSProperties = {
  borderTopWidth: 0,
  borderTopStyle: "none",
  borderTopColor: "#DFE1E2",
  borderRightWidth: 0,
  borderRightStyle: "none",
  borderRightColor: "#DFE1E2",
  borderBottomWidth: 0,
  borderBottomStyle: "none",
  borderBottomColor: "#DFE1E2",
  borderLeftWidth: 0,
  borderLeftStyle: "none",
  borderLeftColor: "#DFE1E2",
};

/* ── USWDS select style (longhand borders) ─────────────── */

const uswdsSelectStyle: React.CSSProperties = {
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
  appearance: "none" as const,
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M7 10l5 5 5-5H7z' fill='%231B1B1B'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 8px center",
  backgroundSize: "20px",
  cursor: "pointer",
};

/* ── Helpers ───────────────────────────────────────────── */

const parseDateForSort = (d: string) => {
  const [mm, dd, yyyy] = d.split("/");
  return new Date(`${yyyy}-${mm}-${dd}`).getTime();
};

/* ── Component ─────────────────────────────────────────── */

interface CorrespondencePageProps {
  activeTab: "emails" | "letters";
}

export function CorrespondencePage({ activeTab }: CorrespondencePageProps) {
  const { selectedAgency, setSelectedAgency } = useAgency();
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const isMobile = useIsMobile();

  const data = activeTab === "emails" ? MOCK_EMAILS : MOCK_LETTERS;

  /* ── Sorting ───────────────────────────────────────────── */

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
    if (!sortKey || !sortDir) return data;
    return [...data].sort((a, b) => {
      if (sortKey === "date") {
        const cmp = parseDateForSort(a[sortKey]) - parseDateForSort(b[sortKey]);
        return sortDir === "asc" ? cmp : -cmp;
      }
      const cmp = a[sortKey].localeCompare(b[sortKey]);
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [sortKey, sortDir, data]);

  /* ── Pagination ────────────────────────────────────────── */

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

  /* ── Render sortable th helper ─────────────────────────── */

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
            fill={
              sortKey === key && sortDir === "desc" ? "#1B1B1B" : "#A9AEB1"
            }
          />
        </svg>
      </span>
    </th>
  );

  /* ── Label style helper ──────────────────────────────── */

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "'Public Sans', sans-serif",
    fontWeight: 700,
    fontSize: 16,
    lineHeight: "24px",
    color: "#1B1B1B",
    marginBottom: 4,
  };

  const tabLabel = activeTab === "emails" ? "Emails" : "Letters";

  return (
    <PageShell title={`Correspondence - ${tabLabel}`}>
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
            lineHeight: "26px",
            color: "#1B1B1B",
            marginBottom: 32,
          }}
        >
          View all correspondence related to your applications and licenses.
        </p>

        {/* USWDS-style Select Agency */}
        <div className="w-full" style={{ marginBottom: 32 }}>
          <label htmlFor="correspondence-agency-select" style={labelStyle}>
            Select Agency
          </label>
          <select
            id="correspondence-agency-select"
            value={selectedAgency}
            onChange={(e) => {
              setSelectedAgency(e.target.value);
              setCurrentPage(0);
            }}
            className="w-full"
            style={uswdsSelectStyle}
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
            No correspondence available.
          </p>
        ) : (
          <>
            {/* Sub-page heading */}
            <h2
              style={{
                fontFamily: "'Public Sans', sans-serif",
                color: "#1B1B1B",
                marginBottom: 24,
              }}
            >
              {tabLabel}
            </h2>

            {/* Top bar: Showing X-Y of Z | Show dropdown */}
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

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
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
                    appearance: "none" as const,
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
                    {COLUMNS.map((col) =>
                      renderSortableTh(col.key, col.label)
                    )}
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        style={{
                          padding: "24px 12px",
                          textAlign: "center",
                          color: "#71767A",
                          fontStyle: "italic",
                          ...cellBorder,
                        }}
                      >
                        No {tabLabel.toLowerCase()} found.
                      </td>
                    </tr>
                  )}
                  {paginatedData.map((row, idx) => {
                    const bg = idx % 2 === 1 ? "#F0F0F0" : "#FFFFFF";
                    return (
                      <tr key={row.id}>
                        <td
                          data-label="Subject"
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
                          {row.subject}
                        </td>
                        <td
                          data-label="From"
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
                          {row.from}
                        </td>
                        <td
                          data-label="To"
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
                          {row.to}
                        </td>
                        <td
                          data-label="Date"
                          style={{
                            padding: "14px 12px",
                            backgroundColor: bg,
                            color: "#1B1B1B",
                            lineHeight: "22px",
                            ...cellBorder,
                          }}
                        >
                          {row.date}
                        </td>
                        <td
                          data-label="Status"
                          style={{
                            padding: "14px 12px",
                            backgroundColor: bg,
                            color: STATUS_COLOR[row.status] || "#1B1B1B",
                            fontStyle: "normal",
                            lineHeight: "22px",
                            ...cellBorder,
                          }}
                        >
                          {row.status}
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
                            color:
                              currentPage === 0
                                ? "#757575"
                                : "#005EA2",
                            backgroundColor: "transparent",
                            cursor:
                              currentPage === 0
                                ? "default"
                                : "pointer",
                            textDecoration:
                              currentPage === 0
                                ? "none"
                                : "underline",
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
                              onClick={() =>
                                setCurrentPage(page as number)
                              }
                              aria-label={`Page ${
                                (page as number) + 1
                              }`}
                              aria-current={
                                currentPage === page
                                  ? "page"
                                  : undefined
                              }
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: 40,
                                height: 40,
                                fontFamily: "'Public Sans', sans-serif",
                                fontSize: 14,
                                fontWeight:
                                  currentPage === page ? 700 : 400,
                                color:
                                  currentPage === page
                                    ? "#FFFFFF"
                                    : "#005EA2",
                                backgroundColor:
                                  currentPage === page
                                    ? "#005EA2"
                                    : "transparent",
                                borderRadius:
                                  currentPage === page ? 2 : 0,
                                cursor: "pointer",
                                textDecoration:
                                  currentPage === page
                                    ? "none"
                                    : "underline",
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
