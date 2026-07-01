import React, { useState } from "react";
import { Eye, Pencil, SendHorizontal, Trash2, UserPen, X } from "lucide-react";

interface ChildSubmission {
  id: string;
  applicationName: string;
  role: string;
  submissionNumber: string;
  constituentName: string;
  email: string;
  status: string;
  lastUpdated: string;
  isPacketOwner?: boolean;
}

interface Packet {
  id: string;
  packetName: string;
  packetNumber: string;
  status: string;
  lastUpdated: string;
  children: ChildSubmission[];
}

const MOCK_DATA: Packet[] = [
  {
    id: "1",
    packetName: "Firearms Business License Packet",
    packetNumber: "28491",
    status: "Draft",
    lastUpdated: "07/08/2025",
    children: [
      {
        id: "1-0",
        applicationName: "FBLA - Company",
        role: "Company Representative",
        submissionNumber: "700024500",
        constituentName: "Boring Company 155",
        email: "boring@boringcompany.com",
        status: "Pending",
        lastUpdated: "07/08/2025",
        isPacketOwner: true,
      },
      {
        id: "1-1",
        applicationName: "FBLA - Owner",
        role: "Owner",
        submissionNumber: "700024501",
        constituentName: "Jerome Tinder",
        email: "j.tinder@portlandme.net",
        status: "Submitted",
        lastUpdated: "07/08/2025",
      },
      {
        id: "1-2",
        applicationName: "FBLA - Manager",
        role: "Manager",
        submissionNumber: "700024502",
        constituentName: "Shiela Benefits",
        email: "s.benefits@gmail.com",
        status: "Awaiting Application",
        lastUpdated: "07/08/2025",
      },
      {
        id: "1-3",
        applicationName: "FBLA - Officer",
        role: "Officer",
        submissionNumber: "700024503",
        constituentName: "Ricky Schuler",
        email: "rschulerlew@yahoo.com",
        status: "Denied",
        lastUpdated: "07/08/2025",
      },
    ],
  },
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

const noBorder: React.CSSProperties = {
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

const parentThStyle: React.CSSProperties = {
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
  ...noBorder,
};

const parentCellStyle: React.CSSProperties = {
  padding: "14px 12px",
  backgroundColor: "#FFFFFF",
  color: "#1B1B1B",
  lineHeight: "22px",
  borderBottomWidth: 1,
  borderBottomStyle: "solid",
  borderBottomColor: "#DFE1E2",
  ...noBorder,
  wordWrap: "break-word",
  overflowWrap: "break-word",
};

const subHeaderStyle: React.CSSProperties = {
  backgroundColor: "#C8D9EA",
  color: "#1B1B1B",
  fontWeight: 700,
  fontSize: 12,
  padding: "8px 12px",
  textAlign: "left",
  whiteSpace: "nowrap",
  borderBottomWidth: 1,
  borderBottomStyle: "solid",
  borderBottomColor: "#A9AEB1",
  ...noBorder,
};

const childCellStyle: React.CSSProperties = {
  padding: "10px 12px",
  backgroundColor: "#E8F0F8",
  color: "#1B1B1B",
  lineHeight: "22px",
  borderBottomWidth: 1,
  borderBottomStyle: "solid",
  borderBottomColor: "#DFE1E2",
  ...noBorder,
  wordWrap: "break-word",
  overflowWrap: "break-word",
  fontSize: 13,
};

export function PacketsTable() {
  const [packets, setPackets] = useState<Packet[]>(MOCK_DATA);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [pageSize, setPageSize] = useState(10);
  const [confirmSendId, setConfirmSendId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const handleSend = (packetId: string) => {
    setPackets((prev) =>
      prev.map((p) =>
        p.id === packetId
          ? {
              ...p,
              status: "Awaiting Applications",
              children: p.children.map((c) => ({ ...c, status: "Draft" })),
            }
          : p
      )
    );
    setConfirmSendId(null);
  };

  const handleResetDemo = (packetId: string) => {
    const original = MOCK_DATA.find((p) => p.id === packetId);
    if (!original) return;
    setPackets((prev) => prev.map((p) => (p.id === packetId ? { ...original } : p)));
  };

  const toggleExpand = (id: string) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const totalEntries = packets.length;
  const end = Math.min(pageSize, totalEntries);

  return (
    <div>
      {/* Top bar */}
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
        <span style={{ fontFamily: "'Public Sans', sans-serif", fontSize: 14, color: "#1B1B1B" }}>
          Showing 1 - {end} of {totalEntries} Entries
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontFamily: "'Public Sans', sans-serif", fontSize: 14, color: "#1B1B1B" }}>Show</span>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
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
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontFamily: "'Public Sans', sans-serif",
            fontSize: 14,
            tableLayout: "fixed",
          }}
        >
          {/* 7 columns sized for the child row layout */}
          <colgroup>
            <col style={{ width: "20%" }} />
            <col style={{ width: "13%" }} />
            <col style={{ width: "14%" }} />
            <col style={{ width: "16%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "12%" }} />
            <col style={{ width: "15%" }} />
          </colgroup>

          {/* Parent header — 5 cells spanning all 7 columns */}
          <thead>
            <tr>
              <th colSpan={3} style={parentThStyle}>Packet Name</th>
              <th style={parentThStyle}>Packet Number</th>
              <th style={parentThStyle}>Status</th>
              <th style={parentThStyle}>Last Updated</th>
              <th style={parentThStyle}>Controls</th>
            </tr>
          </thead>

          <tbody>
            {packets.map((row) => {
              const isExpanded = expandedRows.has(row.id);

              return (
                <React.Fragment key={row.id}>
                  {/* Parent row */}
                  <tr>
                    <td colSpan={3} style={parentCellStyle}>
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
                          gap: 8,
                          textAlign: "left",
                        }}
                      >
                        <span
                          style={{
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
                          }}
                        >
                          {isExpanded ? "−" : "+"}
                        </span>
                        {row.packetName}
                      </button>
                    </td>
                    <td style={parentCellStyle}>{row.packetNumber}</td>
                    <td style={{ ...parentCellStyle, color: STATUS_COLOR[row.status] || "#1B1B1B" }}>
                      {row.status}
                    </td>
                    <td style={parentCellStyle}>{row.lastUpdated}</td>
                    <td style={parentCellStyle}>
                      <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "nowrap" }}>
                        <button
                          title="Edit Packet"
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
                          <Pencil size={16} color="#FFFFFF" />
                        </button>
                        {row.status === "Draft" && (
                          <button
                            title="Send Applications"
                            onClick={() => setConfirmSendId(row.id)}
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
                            <SendHorizontal size={16} color="#FFFFFF" />
                          </button>
                        )}
                        <button
                          title="Delete Packet"
                          onClick={() => setConfirmDeleteId(row.id)}
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
                          <Trash2 size={16} color="#FFFFFF" />
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Child sub-header + child rows */}
                  {isExpanded && (
                    <>
                      <tr>
                        <th style={subHeaderStyle}>Application Name</th>
                        <th style={subHeaderStyle}>Role</th>
                        <th style={subHeaderStyle}>Submission Number</th>
                        <th style={subHeaderStyle}>Constituent Name</th>
                        <th style={subHeaderStyle}>Status</th>
                        <th style={subHeaderStyle}>Last Updated</th>
                        <th style={subHeaderStyle}>Controls</th>
                      </tr>
                      {row.children.map((child) => (
                        <tr key={child.id}>
                          <td style={childCellStyle}>
                            <span style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                              {child.applicationName}
                              {child.isPacketOwner && (
                                <span
                                  style={{
                                    fontSize: 11,
                                    color: "#fff",
                                    textTransform: "uppercase",
                                    backgroundColor: "#5c5c5c",
                                    borderRadius: 2,
                                    padding: "1px 6px",
                                    fontWeight: 700,
                                    letterSpacing: "0.04em",
                                  }}
                                >
                                  Packet Owner
                                </span>
                              )}
                            </span>
                          </td>
                          <td style={childCellStyle}>{child.role}</td>
                          <td style={childCellStyle}></td>
                          <td style={childCellStyle}>{child.constituentName}</td>
                          <td style={{ ...childCellStyle, color: row.status === "Awaiting Applications" ? STATUS_COLOR[child.status] || "#1B1B1B" : "#1B1B1B" }}>
                            {row.status === "Awaiting Applications" ? child.status : ""}
                          </td>
                          <td style={childCellStyle}>{child.lastUpdated}</td>
                          <td style={childCellStyle}></td>
                        </tr>
                      ))}
                    </>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ── Reset Demo button ── */}
      {packets.some((p) => p.status === "Awaiting Applications") && (
        <div style={{ marginTop: 24 }}>
          <button
            onClick={() => {
              setPackets(MOCK_DATA.map((p) => ({ ...p, children: [...p.children] })));
            }}
            style={{
              fontFamily: "'Public Sans', sans-serif",
              fontSize: 14,
              fontWeight: 600,
              color: "#71767A",
              backgroundColor: "transparent",
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: "#71767A",
              borderRadius: 4,
              padding: "6px 14px",
              cursor: "pointer",
            }}
          >
            Reset Demo
          </button>
        </div>
      )}

      {/* ── Send Applications confirm dialog ── */}
      {confirmSendId && (() => {
        const packet = packets.find((p) => p.id === confirmSendId);
        if (!packet) return null;
        return (
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 1000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0,0,0,0.55)",
              padding: 16,
            }}
            onMouseDown={(e) => { if (e.target === e.currentTarget) setConfirmSendId(null); }}
          >
            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 4,
                width: "100%",
                maxWidth: 680,
                boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                fontFamily: "'Public Sans', sans-serif",
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "16px 20px",
                  backgroundColor: "#162E51",
                  borderRadius: "4px 4px 0 0",
                }}
              >
                <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#FFFFFF" }}>
                  Send Applications
                </h2>
                <button
                  onClick={() => setConfirmSendId(null)}
                  title="Close"
                  style={{
                    background: "transparent",
                    borderWidth: 2,
                    borderStyle: "solid",
                    borderColor: "#FFFFFF",
                    borderRadius: "50%",
                    cursor: "pointer",
                    width: 28,
                    height: 28,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#FFFFFF",
                    padding: 0,
                    flexShrink: 0,
                  }}
                >
                  <X size={14} />
                </button>
              </div>

              {/* Body */}
              <div style={{ padding: "20px 20px 0" }}>
                <p style={{ fontSize: 15, color: "#1B1B1B", marginTop: 0, marginBottom: 16, lineHeight: "24px" }}>
                  Are you sure you want to send applications for <strong>{packet.packetName}</strong>? Applications will be sent to the following participants:
                </p>
                <ul style={{ margin: "0 0 20px", padding: "0 0 0 20px", display: "flex", flexDirection: "column", gap: 6 }}>
                  {packet.children.map((child) => (
                    <li key={child.id} style={{ fontSize: 14, color: "#1B1B1B", lineHeight: "22px" }}>
                      <strong>{child.constituentName}</strong> — {child.role} &nbsp;
                      <span style={{ color: "#1B1B1B", fontSize: 14 }}>({child.email})</span>
                      {child.isPacketOwner && (
                        <span
                          style={{
                            fontSize: 11,
                            color: "#fff",
                            textTransform: "uppercase",
                            backgroundColor: "#5c5c5c",
                            borderRadius: 2,
                            padding: "1px 6px",
                            fontWeight: 700,
                            letterSpacing: "0.04em",
                            marginLeft: 8,
                          }}
                        >
                          Packet Owner
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer */}
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  padding: "16px 20px",
                  borderTopWidth: 1,
                  borderTopStyle: "solid",
                  borderTopColor: "#DFE1E2",
                }}
              >
                <button
                  onClick={() => handleSend(confirmSendId)}
                  style={{
                    fontFamily: "'Public Sans', sans-serif",
                    fontSize: 15,
                    fontWeight: 700,
                    color: "#FFFFFF",
                    backgroundColor: "#005EA2",
                    border: "none",
                    borderRadius: 4,
                    padding: "9px 18px",
                    cursor: "pointer",
                  }}
                >
                  Send Applications
                </button>
                <button
                  onClick={() => setConfirmSendId(null)}
                  style={{
                    fontFamily: "'Public Sans', sans-serif",
                    fontSize: 15,
                    fontWeight: 700,
                    color: "#FFFFFF",
                    backgroundColor: "#B50909",
                    border: "none",
                    borderRadius: 4,
                    padding: "9px 18px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        );
      })()}
      {/* ── Delete Packet confirm dialog ── */}
      {confirmDeleteId && (() => {
        const packet = packets.find((p) => p.id === confirmDeleteId);
        if (!packet) return null;
        return (
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 1000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0,0,0,0.55)",
              padding: 16,
            }}
            onMouseDown={(e) => { if (e.target === e.currentTarget) setConfirmDeleteId(null); }}
          >
            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 4,
                width: "100%",
                maxWidth: 480,
                boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                fontFamily: "'Public Sans', sans-serif",
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "16px 20px",
                  backgroundColor: "#162E51",
                  borderRadius: "4px 4px 0 0",
                }}
              >
                <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#FFFFFF" }}>
                  Delete Packet
                </h2>
                <button
                  onClick={() => setConfirmDeleteId(null)}
                  title="Close"
                  style={{
                    background: "transparent",
                    borderWidth: 2,
                    borderStyle: "solid",
                    borderColor: "#FFFFFF",
                    borderRadius: "50%",
                    cursor: "pointer",
                    width: 28,
                    height: 28,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#FFFFFF",
                    padding: 0,
                    flexShrink: 0,
                  }}
                >
                  <X size={14} />
                </button>
              </div>

              {/* Body */}
              <div style={{ padding: "20px 20px 0" }}>
                <p style={{ fontSize: 15, color: "#1B1B1B", marginTop: 0, marginBottom: 20, lineHeight: "24px" }}>
                  Are you sure you want to delete <strong>{packet.packetName}</strong>? This action cannot be undone.
                </p>
              </div>

              {/* Footer */}
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  padding: "16px 20px",
                  borderTopWidth: 1,
                  borderTopStyle: "solid",
                  borderTopColor: "#DFE1E2",
                }}
              >
                <button
                  onClick={() => {
                    setPackets((prev) => prev.filter((p) => p.id !== confirmDeleteId));
                    setExpandedRows((prev) => { const next = new Set(prev); next.delete(confirmDeleteId); return next; });
                    setConfirmDeleteId(null);
                  }}
                  style={{
                    fontFamily: "'Public Sans', sans-serif",
                    fontSize: 15,
                    fontWeight: 700,
                    color: "#FFFFFF",
                    backgroundColor: "#B50909",
                    border: "none",
                    borderRadius: 4,
                    padding: "9px 18px",
                    cursor: "pointer",
                  }}
                >
                  Delete Packet
                </button>
                <button
                  onClick={() => setConfirmDeleteId(null)}
                  style={{
                    fontFamily: "'Public Sans', sans-serif",
                    fontSize: 15,
                    fontWeight: 700,
                    color: "#FFFFFF",
                    backgroundColor: "#005EA2",
                    border: "none",
                    borderRadius: 4,
                    padding: "9px 18px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
