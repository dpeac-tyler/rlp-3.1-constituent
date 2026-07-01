import { useBranches, type BranchData } from "../components/BranchContext";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { PageShell } from "../components/PageShell";
import { IconKeyAccordion } from "../components/IconKeyAccordion";

/* ── Icon key items for Branches ───────────────────────── */

const BRANCH_ICON_ITEMS = [
  {
    icon: <Eye size={16} color="#FFFFFF" />,
    label: "View Branch",
  },
  {
    icon: <Pencil size={16} color="#FFFFFF" />,
    label: "Edit Branch",
  },
  {
    icon: <Trash2 size={16} color="#FFFFFF" />,
    label: "Delete Branch",
  },
];

/* ── Column config ─────────────────────────────────────── */

type SortKey = "branchName" | "address1" | "address2" | "city" | "state";
type SortDir = "asc" | "desc" | null;

const COLUMNS: { key: SortKey; label: string }[] = [
  { key: "branchName", label: "Branch Name / Number" },
  { key: "address1", label: "Address 1" },
  { key: "address2", label: "Address 2" },
  { key: "city", label: "City" },
  { key: "state", label: "State" },
];

const COL_WIDTHS = ["24%", "22%", "16%", "14%", "10%", "14%"];

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

/* ── Component ─────────────────────────────────────────── */

export function BranchesPage() {
  const navigate = useNavigate();
  const { branches } = useBranches();
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

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
    if (!sortKey || !sortDir) return branches;
    return [...branches].sort((a, b) => {
      const cmp = a[sortKey].localeCompare(b[sortKey]);
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [sortKey, sortDir, branches]);

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

  const handleAddBranch = () => {
    navigate("/account/branches/add");
  };

  const handleViewBranch = (branch: BranchData) => {
    navigate(`/account/branches/${branch.id}/view`);
  };

  const handleEditBranch = (branch: BranchData) => {
    navigate(`/account/branches/${branch.id}/edit`);
  };

  return (
    <PageShell title="Branches">
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
        Welcome to your Business Branches list page. You can view, edit or
        delete branches on this page as needed.
      </p>

      {/* Icon Key */}
      <IconKeyAccordion
        items={BRANCH_ICON_ITEMS}
        sessionKey="icon-key-branches-open"
      />

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
                  No branches found.
                </td>
              </tr>
            )}
            {paginatedData.map((row, idx) => {
              const bg = idx % 2 === 1 ? "#F0F0F0" : "#FFFFFF";
              return (
                <tr key={row.id}>
                  <td
                    data-label="Branch Name / Number"
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
                    {row.branchName}
                  </td>
                  <td
                    data-label="Address 1"
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
                    {row.address1}
                  </td>
                  <td
                    data-label="Address 2"
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
                    {row.address2 || "—"}
                  </td>
                  <td
                    data-label="City"
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
                    {row.city}
                  </td>
                  <td
                    data-label="State"
                    style={{
                      padding: "14px 12px",
                      backgroundColor: bg,
                      color: "#1B1B1B",
                      lineHeight: "22px",
                      ...cellBorder,
                    }}
                  >
                    {row.state}
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
                        title="View Branch"
                        style={controlBtnStyle}
                        onClick={() => handleViewBranch(row)}
                      >
                        <Eye size={16} color="#FFFFFF" />
                      </button>
                      <button
                        title="Edit Branch"
                        style={controlBtnStyle}
                        onClick={() => handleEditBranch(row)}
                      >
                        <Pencil size={16} color="#FFFFFF" />
                      </button>
                      <button title="Delete Branch" style={controlBtnStyle}>
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

      {/* Add Branch button */}
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
            ...noBorder,
          }}
          onClick={handleAddBranch}
        >
          Add Branch
        </button>
      </div>
    </PageShell>
  );
}