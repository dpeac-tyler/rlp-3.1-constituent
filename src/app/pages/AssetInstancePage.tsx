import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { PlayCircle, Trash2, RotateCcw, Eye, Receipt, Download } from "lucide-react";

/* ── Submissions mock data ─────────────────────────────── */

const MOCK_SUBMISSIONS = [
  {
    id: "sub1",
    licenseType: "Boiler Operating Permit",
    applicationName: "Initial Boiler Registration",
    submissionNumber: "SUB-2024-00291",
    constituentName: "Boring Company 155",
    status: "Submitted",
    lastUpdated: "05/14/2025",
  },
  {
    id: "sub2",
    licenseType: "Boiler Operating Permit",
    applicationName: "Annual Inspection Renewal",
    submissionNumber: "SUB-2024-00348",
    constituentName: "Boring Company 155",
    status: "Approved",
    lastUpdated: "03/22/2025",
  },
  {
    id: "sub3",
    licenseType: "Boiler Operating Permit",
    applicationName: "Ownership Transfer",
    submissionNumber: "SUB-2025-00102",
    constituentName: "Boring Company 155",
    status: "Draft",
    lastUpdated: "06/01/2025",
  },
];

const STATUS_COLORS: Record<string, string> = {
  Active: "#417505", Approved: "#417505", Live: "#417505", Paid: "#417505", Completed: "#417505", Sent: "#417505",
  Pending: "#8F5800", Open: "#8F5800", Assigned: "#8F5800", "Approved - Awaiting Payment": "#8F5800", "Awaiting Application": "#8F5800", "Awaiting Applications": "#8F5800", Generated: "#8F5800",
  Rejected: "#CD2026", Denied: "#CD2026", Cancelled: "#CD2026", "Past Due": "#CD2026", Terminated: "#CD2026",
  Expired: "#80252A", Revoked: "#80252A", Withdrawn: "#80252A", Decommissioned: "#80252A", Retired: "#80252A",
  "In Progress": "#205493", "Rejected for Resubmission": "#205493", "In Cart": "#205493", Submitted: "#205493",
  "On Hold": "#A34900", Suspended: "#A34900", "Payment in Process": "#A34900", Inactive: "#A34900",
  "In Review": "#13669A", Draft: "#13669A", Initiated: "#13669A",
  Archived: "#5C5F66",
};

const cellBorder: React.CSSProperties = {
  borderBottomWidth: 1, borderBottomStyle: "solid", borderBottomColor: "#DFE1E2",
  borderTopWidth: 0, borderTopStyle: "solid", borderTopColor: "transparent",
  borderLeftWidth: 0, borderLeftStyle: "solid", borderLeftColor: "transparent",
  borderRightWidth: 0, borderRightStyle: "solid", borderRightColor: "transparent",
};

const thBorder: React.CSSProperties = {
  borderBottomWidth: 1, borderBottomStyle: "solid", borderBottomColor: "#A9AEB1",
  borderTopWidth: 0, borderTopStyle: "solid", borderTopColor: "transparent",
  borderLeftWidth: 0, borderLeftStyle: "solid", borderLeftColor: "transparent",
  borderRightWidth: 0, borderRightStyle: "solid", borderRightColor: "transparent",
};

const noBorder: React.CSSProperties = {
  borderTopWidth: 0, borderTopStyle: "solid", borderTopColor: "transparent",
  borderRightWidth: 0, borderRightStyle: "solid", borderRightColor: "transparent",
  borderBottomWidth: 0, borderBottomStyle: "solid", borderBottomColor: "transparent",
  borderLeftWidth: 0, borderLeftStyle: "solid", borderLeftColor: "transparent",
};

const controlBtnStyle: React.CSSProperties = {
  width: 28, height: 28, minWidth: 28,
  backgroundColor: "#162E51",
  borderRadius: 4,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  padding: 0,
  ...noBorder,
};
import { PageShell } from "../components/PageShell";
import { IconKeyAccordion } from "../components/IconKeyAccordion";
import { useIsMobile } from "../hooks/useIsMobile";
import { useProfile } from "../components/ProfileContext";
import { MOCK_ASSET_DATA } from "./MyAssetsPage";

const MOCK_CERTIFICATIONS = [
  {
    id: "cert1",
    identifier: "123-4234-434",
    licenseType: "Boiler Operating Permit",
    licenseNumber: "BOP-2024-00871",
    applicationType: "Initial Registration",
    status: "Active",
    startDate: "01/15/2024",
    expirationDate: "01/14/2026",
  },
  {
    id: "cert2",
    identifier: "123-4234-434",
    licenseType: "Boiler Operating Permit",
    licenseNumber: "BOP-2023-00445",
    applicationType: "Annual Renewal",
    status: "Expired",
    startDate: "01/15/2023",
    expirationDate: "01/14/2024",
  },
];

const CERTIFICATIONS_ICON_ITEMS = [
  { icon: <Download size={16} color="#FFFFFF" />, label: "Download Certificate" },
  { icon: <Eye size={16} color="#FFFFFF" />, label: "View Submission" },
];

const SUBMISSIONS_ICON_ITEMS = [
  { icon: <PlayCircle size={16} color="#FFFFFF" />, label: "Continue Submission" },
  { icon: <Trash2 size={16} color="#FFFFFF" />, label: "Delete Submission" },
  { icon: <RotateCcw size={16} color="#FFFFFF" />, label: "Management Resubmission" },
  { icon: <Eye size={16} color="#FFFFFF" />, label: "View Application" },
  { icon: <Receipt size={16} color="#FFFFFF" />, label: "View Transaction" },
];

const tabs = [
  { key: "details", label: "Details" },
  { key: "submissions", label: "Submissions" },
  { key: "certifications", label: "Certifications" },
];

export function AssetInstancePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("details");

  const { businessName } = useProfile();
  const asset = MOCK_ASSET_DATA.find((a) => a.id === id);
  const pageTitle = (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
      {asset?.idValue ?? "Asset Instance"}
      <span style={{
        fontSize: 12,
        fontWeight: 700,
        fontFamily: "'Public Sans', sans-serif",
        color: "#FFFFFF",
        backgroundColor: "#565C65",
        borderRadius: 4,
        padding: "2px 8px",
        letterSpacing: "0.5px",
        textTransform: "uppercase",
        lineHeight: "20px",
      }}>
        Asset
      </span>
    </span>
  );

  const statusRight = asset?.status ? (
    <span style={{ fontFamily: "'Public Sans', sans-serif", fontSize: 16, color: "#1B1B1B" }}>
      Status: <strong style={{ color: STATUS_COLORS[asset.status] ?? "#1B1B1B" }}>{asset.status}</strong>
    </span>
  ) : null;

  return (
    <PageShell title={pageTitle} titleRight={statusRight}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 24 }}>
        <button
          onClick={() => navigate("/my-assets")}
          style={{
            fontFamily: "'Public Sans', sans-serif",
            fontSize: 14,
            color: "#005EA2",
            backgroundColor: "transparent",
            cursor: "pointer",
            padding: 0,
            textDecoration: "underline",
            borderWidth: 0,
            borderStyle: "none",
            borderColor: "transparent",
          }}
        >
          Back to My Assets
        </button>
        {asset?.idValue && (
          <span style={{ fontFamily: "'Public Sans', sans-serif", fontSize: 14, color: "#1B1B1B" }}>
            {">"} {asset.idValue}
          </span>
        )}
      </div>

      <div>
        {/* Tab bar */}
        <div
          style={{
            display: "flex",
            borderBottomWidth: 2,
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
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  flex: 1,
                  fontFamily: "'Public Sans', sans-serif",
                  fontSize: 16,
                  fontWeight: isActive ? 700 : 400,
                  lineHeight: "24px",
                  padding: "12px 20px",
                  backgroundColor: "transparent",
                  color: isActive ? "#005EA2" : "#71767A",
                  borderTopWidth: 0,
                  borderTopStyle: "solid",
                  borderTopColor: "transparent",
                  borderLeftWidth: 0,
                  borderLeftStyle: "solid",
                  borderLeftColor: "transparent",
                  borderRightWidth: 0,
                  borderRightStyle: "solid",
                  borderRightColor: "transparent",
                  borderBottomWidth: 4,
                  borderBottomStyle: "solid",
                  borderBottomColor: isActive ? "#005EA2" : "transparent",
                  cursor: "pointer",
                  marginBottom: -2,
                  transition: "color 0.15s ease, border-bottom-color 0.15s ease",
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Card */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "0 0 4px 4px",
            padding: isMobile ? 16 : 24,
          }}
        >
          {activeTab === "details" && (
            <>
              {/* Modified By / Date row */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontFamily: "'Public Sans', sans-serif",
                  fontSize: 14,
                  color: "#1B1B1B",
                  marginBottom: 32,
                }}
              >
                <span>Modified By: <strong>{businessName}</strong></span>
                <span>Modified Date: <strong>{asset?.modifiedDate ?? "—"}</strong></span>
              </div>

              {/* Attributes */}
              <h2 style={{ fontFamily: "'Public Sans', sans-serif", fontWeight: 700, fontSize: 20, color: "#1B1B1B", margin: "0 0 16px 0" }}>
                Attributes
              </h2>

              {/* Standard */}
              <h3 style={{ fontFamily: "'Public Sans', sans-serif", fontWeight: 700, fontSize: 17, color: "#1B1B1B", margin: "0 0 12px 0" }}>
                Standard
              </h3>
              {[
                { label: "Serial #", value: "123-4234-434" },
                { label: "Physical Country", value: "United States" },
                { label: "Physical Address Line 1", value: "1 Rocket Road" },
                { label: "Physical Address Line 2", value: "" },
                { label: "Physical City", value: "Hawthorne" },
                { label: "Physical State", value: "California" },
                { label: "Physical Zip Code", value: "90250" },
                { label: "Ward", value: "" },
                { label: "Physical County", value: "Los Angeles" },
                { label: "Mailing Address Indicator", value: "Owner Mailing Address" },
                { label: "Mailing Address City", value: "Hawthorne" },
                { label: "Mailing Address Country", value: "USA" },
                { label: "Mailing Address Line 1", value: "1 Rocket Road" },
                { label: "Mailing Address State", value: "CA" },
                { label: "Mailing Address Zip Code", value: "90250" },
              ].map(({ label, value }) => (
                <p key={label} style={{ fontFamily: "'Public Sans', sans-serif", fontSize: 14, color: "#565C65", margin: "0 0 8px 0" }}>
                  {label}: {value ? <strong style={{ color: "#1B1B1B" }}>{value}</strong> : null}
                </p>
              ))}

              {/* HR */}
              <hr style={{ border: "none", borderTop: "1px solid #DFE1E2", margin: "28px 0" }} />

              {/* Custom */}
              <h3 style={{ fontFamily: "'Public Sans', sans-serif", fontWeight: 700, fontSize: 17, color: "#1B1B1B", margin: "0 0 12px 0" }}>
                Custom
              </h3>
              {[
                { label: "Type", value: "Boiler (pressure)" },
                { label: "National Board #", value: "" },
                { label: "Physical Location", value: "" },
                { label: "Year", value: "2021" },
                { label: "Manufacturer", value: "" },
                { label: "Gallon Capacity", value: "" },
                { label: "Horsepower", value: "" },
                { label: "Installation Date", value: "" },
                { label: "Installation Company", value: "" },
                { label: "Installer Name", value: "" },
                { label: "Installer Phone #", value: "" },
                { label: "Installer Email", value: "" },
              ].map(({ label, value }) => (
                <p key={label} style={{ fontFamily: "'Public Sans', sans-serif", fontSize: 14, color: "#565C65", margin: "0 0 8px 0" }}>
                  {label}: {value ? <strong style={{ color: "#1B1B1B" }}>{value}</strong> : null}
                </p>
              ))}
            </>
          )}
          {activeTab === "submissions" && (
            <>
              <IconKeyAccordion
                items={SUBMISSIONS_ICON_ITEMS}
                sessionKey="asset-instance-submissions-icon-key"
              />

              {/* Table title + controls */}
              <h2 style={{ fontFamily: "'Public Sans', sans-serif", fontWeight: 700, fontSize: 18, color: "#1B1B1B", margin: "0 0 12px 0" }}>
                Submissions
              </h2>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <span style={{ fontFamily: "'Public Sans', sans-serif", fontSize: 14, color: "#1B1B1B" }}>
                  Showing 1 - {MOCK_SUBMISSIONS.length} of {MOCK_SUBMISSIONS.length} Entries
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontFamily: "'Public Sans', sans-serif", fontSize: 14, color: "#1B1B1B" }}>Show</span>
                  <select
                    defaultValue={10}
                    style={{
                      fontFamily: "'Public Sans', sans-serif",
                      fontSize: 14,
                      color: "#1B1B1B",
                      height: 32,
                      padding: "0 24px 0 8px",
                      borderWidth: 1, borderStyle: "solid", borderColor: "#565C65",
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
                <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'Public Sans', sans-serif", fontSize: 14 }}>
                  <thead>
                    <tr>
                      {["License Type", "Application Name", "Submission Number", "Constituent Name", "Status", "Last Updated", "Controls"].map((h) => (
                        <th key={h} style={{ backgroundColor: "#F0F0F0", color: "#1B1B1B", fontWeight: 700, fontSize: 13, padding: "12px 12px", textAlign: "left", whiteSpace: "nowrap", ...thBorder }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_SUBMISSIONS.map((row, idx) => {
                      const bg = idx % 2 === 1 ? "#F0F0F0" : "#FFFFFF";
                      return (
                        <tr key={row.id}>
                          <td style={{ padding: "14px 12px", backgroundColor: bg, color: "#1B1B1B", lineHeight: "22px", ...cellBorder }}>{row.licenseType}</td>
                          <td style={{ padding: "14px 12px", backgroundColor: bg, color: "#1B1B1B", lineHeight: "22px", ...cellBorder }}>{row.applicationName}</td>
                          <td style={{ padding: "14px 12px", backgroundColor: bg, color: "#1B1B1B", lineHeight: "22px", ...cellBorder }}>{row.submissionNumber}</td>
                          <td style={{ padding: "14px 12px", backgroundColor: bg, color: "#1B1B1B", lineHeight: "22px", ...cellBorder }}>{row.constituentName}</td>
                          <td style={{ padding: "14px 12px", backgroundColor: bg, lineHeight: "22px", ...cellBorder }}>
                            <span style={{ color: STATUS_COLORS[row.status] ?? "#1B1B1B", fontFamily: "'Public Sans', sans-serif", fontSize: 14 }}>{row.status}</span>
                          </td>
                          <td style={{ padding: "14px 12px", backgroundColor: bg, color: "#1B1B1B", lineHeight: "22px", ...cellBorder }}>{row.lastUpdated}</td>
                          <td style={{ padding: "10px 12px", backgroundColor: bg, whiteSpace: "nowrap", ...cellBorder }}>
                            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                              <button title="Continue Submission" style={controlBtnStyle}><PlayCircle size={14} color="#FFFFFF" /></button>
                              <button title="Delete Submission" style={controlBtnStyle}><Trash2 size={14} color="#FFFFFF" /></button>
                              <button title="Management Resubmission" style={controlBtnStyle}><RotateCcw size={14} color="#FFFFFF" /></button>
                              <button title="View Application" style={controlBtnStyle}><Eye size={14} color="#FFFFFF" /></button>
                              <button title="View Transaction" style={controlBtnStyle}><Receipt size={14} color="#FFFFFF" /></button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}
          {activeTab === "certifications" && (
            <>
              <IconKeyAccordion
                items={CERTIFICATIONS_ICON_ITEMS}
                sessionKey="asset-instance-certifications-icon-key"
              />

              {/* Table title + controls */}
              <h2 style={{ fontFamily: "'Public Sans', sans-serif", fontWeight: 700, fontSize: 18, color: "#1B1B1B", margin: "0 0 12px 0" }}>
                Certifications
              </h2>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <span style={{ fontFamily: "'Public Sans', sans-serif", fontSize: 14, color: "#1B1B1B" }}>
                  Showing 1 - {MOCK_CERTIFICATIONS.length} of {MOCK_CERTIFICATIONS.length} Entries
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontFamily: "'Public Sans', sans-serif", fontSize: 14, color: "#1B1B1B" }}>Show</span>
                  <select
                    defaultValue={10}
                    style={{
                      fontFamily: "'Public Sans', sans-serif",
                      fontSize: 14,
                      color: "#1B1B1B",
                      height: 32,
                      padding: "0 24px 0 8px",
                      borderWidth: 1, borderStyle: "solid", borderColor: "#565C65",
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
                <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'Public Sans', sans-serif", fontSize: 14 }}>
                  <thead>
                    <tr>
                      {["Identifier", "License Type", "License Number", "Application Type", "Status", "Start Date", "Expiration Date", "Controls"].map((h) => (
                        <th key={h} style={{ backgroundColor: "#F0F0F0", color: "#1B1B1B", fontWeight: 700, fontSize: 13, padding: "12px 12px", textAlign: "left", whiteSpace: "nowrap", ...thBorder }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_CERTIFICATIONS.map((row, idx) => {
                      const bg = idx % 2 === 1 ? "#F0F0F0" : "#FFFFFF";
                      return (
                        <tr key={row.id}>
                          <td style={{ padding: "14px 12px", backgroundColor: bg, color: "#1B1B1B", lineHeight: "22px", ...cellBorder }}>{row.identifier}</td>
                          <td style={{ padding: "14px 12px", backgroundColor: bg, color: "#1B1B1B", lineHeight: "22px", ...cellBorder }}>{row.licenseType}</td>
                          <td style={{ padding: "14px 12px", backgroundColor: bg, color: "#1B1B1B", lineHeight: "22px", ...cellBorder }}>{row.licenseNumber}</td>
                          <td style={{ padding: "14px 12px", backgroundColor: bg, color: "#1B1B1B", lineHeight: "22px", ...cellBorder }}>{row.applicationType}</td>
                          <td style={{ padding: "14px 12px", backgroundColor: bg, lineHeight: "22px", ...cellBorder }}>
                            <span style={{ color: STATUS_COLORS[row.status] ?? "#1B1B1B", fontFamily: "'Public Sans', sans-serif", fontSize: 14 }}>{row.status}</span>
                          </td>
                          <td style={{ padding: "14px 12px", backgroundColor: bg, color: "#1B1B1B", lineHeight: "22px", ...cellBorder }}>{row.startDate}</td>
                          <td style={{ padding: "14px 12px", backgroundColor: bg, color: "#1B1B1B", lineHeight: "22px", ...cellBorder }}>{row.expirationDate}</td>
                          <td style={{ padding: "10px 12px", backgroundColor: bg, whiteSpace: "nowrap", ...cellBorder }}>
                            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                              <button title="Download Certificate" style={controlBtnStyle}><Download size={14} color="#FFFFFF" /></button>
                              <button title="View Submission" style={controlBtnStyle}><Eye size={14} color="#FFFFFF" /></button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </PageShell>
  );
}
