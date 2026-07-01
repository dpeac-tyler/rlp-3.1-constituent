import { useState, useMemo } from "react";
import { CircleDollarSign, Eye, Printer, Banknote } from "lucide-react";
import { PageShell } from "../components/PageShell";
import { IconKeyAccordion } from "../components/IconKeyAccordion";
import { useIsMobile } from "../hooks/useIsMobile";
import { useAgency } from "../components/AgencyContext";

/* ── Types ─────────────────────────────────────────────── */

interface Invoice {
  id: string;
  invoiceNumber: string;
  licenseType: string;
  description: string;
  amount: string;
  dateIssued: string;
  dueDate: string;
  status: string;
}

/* ── Mock data ─────────────────────────────────────────── */

const MOCK_DATA: Invoice[] = [
  {
    id: "inv1",
    invoiceNumber: "INV-2025-00412",
    licenseType: "DNR Biz Original One",
    description: "App Biz OG Auth No Review No Esign",
    amount: "$250.00",
    dateIssued: "01/10/2025",
    dueDate: "02/10/2025",
    status: "Paid",
  },
  {
    id: "inv2",
    invoiceNumber: "INV-2025-00398",
    licenseType: "DNR Business",
    description: "Test application for Branches",
    amount: "$125.00",
    dateIssued: "01/15/2025",
    dueDate: "02/15/2025",
    status: "Open",
  },
  {
    id: "inv3",
    invoiceNumber: "INV-2025-00376",
    licenseType: "Type for Renewal-Workflow-Payment",
    description: "Renewal for Ren. Lic App-Firas",
    amount: "$500.00",
    dateIssued: "02/01/2025",
    dueDate: "03/01/2025",
    status: "Past Due",
  },
  {
    id: "inv4",
    invoiceNumber: "INV-2025-00501",
    licenseType: "DNR Biz Original One",
    description: "Business License Application",
    amount: "$75.00",
    dateIssued: "03/05/2025",
    dueDate: "04/05/2025",
    status: "Initiated",
  },
  {
    id: "inv5",
    invoiceNumber: "INV-2025-00488",
    licenseType: "DNR Business",
    description: "Annual Permit Renewal Form",
    amount: "$350.00",
    dateIssued: "03/12/2025",
    dueDate: "04/12/2025",
    status: "Withdrawn",
  },
  {
    id: "inv6",
    invoiceNumber: "INV-2025-00522",
    licenseType: "Type for Renewal-Workflow-Payment",
    description: "Original App for Ren. Lic. Type-Firas",
    amount: "$200.00",
    dateIssued: "04/01/2025",
    dueDate: "05/01/2025",
    status: "Open",
  },
  {
    id: "inv7",
    invoiceNumber: "INV-2025-00534",
    licenseType: "DNR Biz Original One",
    description: "New Asset Registration",
    amount: "$150.00",
    dateIssued: "04/18/2025",
    dueDate: "05/18/2025",
    status: "Paid",
  },
  {
    id: "inv8",
    invoiceNumber: "INV-2025-00567",
    licenseType: "DNR Business",
    description: "Contractor License Submission",
    amount: "$425.00",
    dateIssued: "05/02/2025",
    dueDate: "06/02/2025",
    status: "Past Due",
  },
  {
    id: "inv9",
    invoiceNumber: "INV-2025-00589",
    licenseType: "Type for Renewal-Workflow-Payment",
    description: "Environmental Compliance App",
    amount: "$300.00",
    dateIssued: "05/20/2025",
    dueDate: "06/20/2025",
    status: "Initiated",
  },
  {
    id: "inv10",
    invoiceNumber: "INV-2025-00610",
    licenseType: "DNR Biz Original One",
    description: "Temporary Operating Permit",
    amount: "$175.00",
    dateIssued: "06/01/2025",
    dueDate: "07/01/2025",
    status: "Open",
  },
  {
    id: "inv11",
    invoiceNumber: "INV-2025-00632",
    licenseType: "DNR Business",
    description: "Professional License Renewal",
    amount: "$550.00",
    dateIssued: "06/15/2025",
    dueDate: "07/15/2025",
    status: "Paid",
  },
  {
    id: "inv12",
    invoiceNumber: "INV-2025-00648",
    licenseType: "Type for Renewal-Workflow-Payment",
    description: "Specialty Endorsement Application",
    amount: "$90.00",
    dateIssued: "07/01/2025",
    dueDate: "08/01/2025",
    status: "Withdrawn",
  },
];

/* ── Agencies ──────────────────────────────────────────── */

const agencies = [
  { value: "", label: "- Please Select -" },
  { value: "agency-1", label: "Department of Professional & Financial Regulation" },
  { value: "agency-2", label: "Bureau of Consumer Credit Protection" },
];

/* ── Icon key items ────────────────────────────────────── */

const INVOICE_ICON_ITEMS = [
  { icon: <CircleDollarSign size={16} color="#FFFFFF" />, label: "Pay Invoice" },
  { icon: <Eye size={16} color="#FFFFFF" />, label: "View Invoice" },
  { icon: <Printer size={16} color="#FFFFFF" />, label: "Print Invoice/Receipt" },
  { icon: <Banknote size={16} color="#FFFFFF" />, label: "View Transactions" },
];

/* ── Invoice statuses ──────────────────────────────────── */

const INVOICE_STATUSES = ["Initiated", "Open", "Paid", "Past Due", "Withdrawn"];

/* ── Column config ─────────────────────────────────────── */

type SortKey = keyof Omit<Invoice, "id">;
type SortDir = "asc" | "desc" | null;

const COLUMNS: { key: SortKey; label: string }[] = [
  { key: "invoiceNumber", label: "Invoice Number" },
  { key: "licenseType", label: "License Type" },
  { key: "description", label: "Description" },
  { key: "amount", label: "Amount" },
  { key: "dateIssued", label: "Date Issued" },
  { key: "dueDate", label: "Due Date" },
  { key: "status", label: "Status" },
];

const COL_WIDTHS = ["13%", "16%", "18%", "9%", "11%", "11%", "9%", "13%"];

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

const parseAmountForSort = (a: string) => {
  return parseFloat(a.replace(/[^0-9.-]/g, "")) || 0;
};

/* ── Component ─────────────────────────────────────────── */

export function InvoicesPage() {
  const { selectedAgency, setSelectedAgency } = useAgency();
  const [statusFilter, setStatusFilter] = useState("Initiated");
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const isMobile = useIsMobile();

  /* ── Filtering ─────────────────────────────────────────── */

  const filteredData = useMemo(() => {
    if (!statusFilter) return MOCK_DATA;
    return MOCK_DATA.filter((row) => row.status === statusFilter);
  }, [statusFilter]);

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
    if (!sortKey || !sortDir) return filteredData;
    return [...filteredData].sort((a, b) => {
      if (sortKey === "dateIssued" || sortKey === "dueDate") {
        const cmp = parseDateForSort(a[sortKey]) - parseDateForSort(b[sortKey]);
        return sortDir === "asc" ? cmp : -cmp;
      }
      if (sortKey === "amount") {
        const cmp = parseAmountForSort(a[sortKey]) - parseAmountForSort(b[sortKey]);
        return sortDir === "asc" ? cmp : -cmp;
      }
      const cmp = a[sortKey].localeCompare(b[sortKey]);
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [sortKey, sortDir, filteredData]);

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
            fill={sortKey === key && sortDir === "desc" ? "#1B1B1B" : "#A9AEB1"}
          />
        </svg>
      </span>
    </th>
  );

  return (
    <PageShell title="Invoices">
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
          Welcome to the Invoices page.
        </p>

        {/* USWDS-style Select Agency */}
        <div className="w-full" style={{ marginBottom: 32 }}>
          <label
            htmlFor="invoices-agency-select"
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
            id="invoices-agency-select"
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
            No Invoices available.
          </p>
        ) : (
          <>
            {/* Icon Key Accordion */}
            <IconKeyAccordion
              items={INVOICE_ICON_ITEMS}
              sessionKey="icon-key-invoices-open"
            />

            {/* USWDS Slim Info Alert */}
            <div
              style={{
                display: "flex",
                alignItems: "stretch",
                backgroundColor: "#E7F6F8",
                marginBottom: 24,
              }}
            >
              <div
                style={{
                  width: 4,
                  minWidth: 4,
                  backgroundColor: "#00BDE3",
                  flexShrink: 0,
                }}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 12px",
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ flexShrink: 0 }}
                >
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
                    fill="#1B1B1B"
                  />
                </svg>
                <p
                  style={{
                    fontFamily: "'Public Sans', sans-serif",
                    fontSize: 14,
                    lineHeight: "20px",
                    color: "#1B1B1B",
                    margin: 0,
                  }}
                >
                  <strong>Transaction Fees</strong> - The invoice amounts shown
                  do not include processor or convenience fees.
                </p>
              </div>
            </div>

            {/* Invoice Status button group — right-aligned */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: 16,
              }}
            >
              <ul
                style={{
                  display: "flex",
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                }}
                role="group"
                aria-label="Invoice Status"
              >
                {INVOICE_STATUSES.map((label, idx, arr) => {
                  const isActive = statusFilter === label;
                  const isFirst = idx === 0;
                  const isLast = idx === arr.length - 1;
                  return (
                    <li key={label} style={{ margin: 0 }}>
                      <button
                        type="button"
                        onClick={() => {
                          setStatusFilter(label);
                          setCurrentPage(0);
                        }}
                        style={{
                          fontFamily: "'Public Sans', sans-serif",
                          fontSize: 14,
                          lineHeight: "20px",
                          fontWeight: 700,
                          padding: "8px 16px",
                          cursor: "pointer",
                          backgroundColor: isActive ? "#005EA2" : "#FFFFFF",
                          color: isActive ? "#FFFFFF" : "#005EA2",
                          borderTopWidth: 1,
                          borderTopStyle: "solid",
                          borderTopColor: "#005EA2",
                          borderBottomWidth: 1,
                          borderBottomStyle: "solid",
                          borderBottomColor: "#005EA2",
                          borderLeftWidth: isFirst ? 1 : 0,
                          borderLeftStyle: "solid",
                          borderLeftColor: "#005EA2",
                          borderRightWidth: 1,
                          borderRightStyle: "solid",
                          borderRightColor: "#005EA2",
                          borderTopLeftRadius: isFirst ? 4 : 0,
                          borderBottomLeftRadius: isFirst ? 4 : 0,
                          borderTopRightRadius: isLast ? 4 : 0,
                          borderBottomRightRadius: isLast ? 4 : 0,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

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
                        colSpan={8}
                        style={{
                          padding: "24px 12px",
                          textAlign: "center",
                          color: "#71767A",
                          fontStyle: "italic",
                          ...cellBorder,
                        }}
                      >
                        No invoices found.
                      </td>
                    </tr>
                  )}
                  {paginatedData.map((row, idx) => {
                    const bg = idx % 2 === 1 ? "#F0F0F0" : "#FFFFFF";
                    return (
                      <tr key={row.id}>
                        <td
                          data-label="Invoice Number"
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
                          {row.invoiceNumber}
                        </td>
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
                          data-label="Description"
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
                          {row.description}
                        </td>
                        <td
                          data-label="Amount"
                          style={{
                            padding: "14px 12px",
                            backgroundColor: bg,
                            color: "#1B1B1B",
                            lineHeight: "22px",
                            ...cellBorder,
                          }}
                        >
                          {row.amount}
                        </td>
                        <td
                          data-label="Date Issued"
                          style={{
                            padding: "14px 12px",
                            backgroundColor: bg,
                            color: "#1B1B1B",
                            lineHeight: "22px",
                            ...cellBorder,
                          }}
                        >
                          {row.dateIssued}
                        </td>
                        <td
                          data-label="Due Date"
                          style={{
                            padding: "14px 12px",
                            backgroundColor: bg,
                            color: "#1B1B1B",
                            lineHeight: "22px",
                            ...cellBorder,
                          }}
                        >
                          {row.dueDate}
                        </td>
                        {/* Status */}
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
                            ...cellBorder,
                          }}
                        >
                          {row.status}
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
                              title="Pay Invoice"
                              style={controlBtnStyle}
                            >
                              <CircleDollarSign
                                size={16}
                                color="#FFFFFF"
                              />
                            </button>
                            <button
                              title="View Invoice"
                              style={controlBtnStyle}
                            >
                              <Eye size={16} color="#FFFFFF" />
                            </button>
                            <button
                              title="Print Invoice/Receipt"
                              style={controlBtnStyle}
                            >
                              <Printer size={16} color="#FFFFFF" />
                            </button>
                            <button
                              title="View Transactions"
                              style={controlBtnStyle}
                            >
                              <Banknote size={16} color="#FFFFFF" />
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
                            color:
                              currentPage === 0 ? "#757575" : "#005EA2",
                            backgroundColor: "transparent",
                            cursor:
                              currentPage === 0 ? "default" : "pointer",
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
                              onClick={() =>
                                setCurrentPage(page as number)
                              }
                              aria-label={`Page ${(page as number) + 1}`}
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