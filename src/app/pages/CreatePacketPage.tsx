import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { ChevronRight, X, Trash2 } from "lucide-react";
import { PageShell } from "../components/PageShell";
import { useIsMobile } from "../hooks/useIsMobile";
import { useToast } from "../components/ToastContext";
import { IconKeyAccordion } from "../components/IconKeyAccordion";

interface PacketType {
  id: string;
  name: string;
  agency: string;
  roles: string[];
}

interface Constituent {
  id: string;
  licenseNumber: string;
  constituentName: string;
  username: string;
  email: string;
  address: string;
  type: "Individual" | "Business";
}

interface AssignedParticipant {
  id: number;
  role: string;
  constituentName: string;
  email: string;
  address: string;
}

const CURRENT_USER = {
  name: "Boring Company 155",
  email: "boring@boringcompany.com",
  licenseNumber: "FBL-2023-0099",
  address: "1200 Industrial Way, Portland, ME 04101",
};

const PACKET_TYPES: PacketType[] = [
  {
    id: "fbla",
    name: "Firearms Business License Packet",
    agency: "Department of Professional & Financial Regulation",
    roles: ["Company Representative", "Owner", "Manager", "Officer"],
  },
  {
    id: "csl",
    name: "Cosmetology Salon License Packet",
    agency: "Department of Professional & Financial Regulation",
    roles: ["Salon Owner", "Salon Manager", "Cosmetologist", "Instructor"],
  },
  {
    id: "fhp",
    name: "Food Handler Permit Packet",
    agency: "Bureau of Consumer Credit Protection",
    roles: ["Business Owner", "Food Safety Manager"],
  },
];

const MOCK_CONSTITUENTS: Constituent[] = [
  { id: "1", licenseNumber: "FBL-2024-0041", constituentName: "Jerome Tinder", username: "jtinder_me", email: "j.tinder@portlandme.net", address: "145 Commerce St, Portland, ME 04101", type: "Individual" },
  { id: "2", licenseNumber: "FBL-2022-0178", constituentName: "Marcus Delray", username: "mdelray84", email: "marcusdelray@outlook.com", address: "88 Oak Ave, Bangor, ME 04401", type: "Individual" },
  { id: "3", licenseNumber: "COS-2023-0052", constituentName: "Shiela Benefits LLC", username: "shielabiz", email: "s.benefits@gmail.com", address: "22 Harbor View Rd, Augusta, ME 04330", type: "Business" },
  { id: "4", licenseNumber: "FBL-2025-0009", constituentName: "Ricky Schuler", username: "rschulerlew", email: "rschulerlew@yahoo.com", address: "310 Pine St, Lewiston, ME 04240", type: "Individual" },
  { id: "5", licenseNumber: "FHP-2021-0203", constituentName: "Torres Food Group", username: "torresfoodgrp", email: "angela.torres@biddefordlaw.com", address: "77 Elm St, Biddeford, ME 04005", type: "Business" },
  { id: "6", licenseNumber: "FBL-2023-0115", constituentName: "Derek Fontaine", username: "dfontaine501", email: "dfontaine@sacoriver.org", address: "501 River Rd, Saco, ME 04072", type: "Individual" },
  { id: "7", licenseNumber: "COS-2024-0087", constituentName: "Huang Salon & Spa", username: "phuang_salon", email: "p.huang@brunswicksalon.com", address: "14 Main St, Brunswick, ME 04011", type: "Business" },
  { id: "8", licenseNumber: "FHP-2022-0344", constituentName: "Tomas Reyes", username: "treyes_wv", email: "tomreyes@watervilleme.gov", address: "203 Maple Ave, Waterville, ME 04901", type: "Individual" },
];

const inputStyle: React.CSSProperties = {
  width: "100%",
  fontFamily: "'Public Sans', sans-serif",
  fontSize: 16,
  color: "#1B1B1B",
  padding: "8px 12px",
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "#565C65",
  borderRadius: 4,
  backgroundColor: "#FFFFFF",
  boxSizing: "border-box",
  outline: "none",
};

const thStyle: React.CSSProperties = {
  backgroundColor: "#F0F0F0",
  color: "#1B1B1B",
  fontWeight: 700,
  fontSize: 13,
  padding: "10px 12px",
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
  fontFamily: "'Public Sans', sans-serif",
};

const tdStyle: React.CSSProperties = {
  padding: "12px 12px",
  color: "#1B1B1B",
  fontSize: 14,
  lineHeight: "20px",
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
  fontFamily: "'Public Sans', sans-serif",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "'Public Sans', sans-serif",
  fontWeight: 700,
  fontSize: 15,
  color: "#1B1B1B",
  marginBottom: 4,
};

const requiredStyle: React.CSSProperties = {
  fontStyle: "italic",
  fontWeight: 400,
  fontSize: 13,
  color: "#71767A",
  marginLeft: 6,
};

export function CreatePacketPage() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [inputValue, setInputValue] = useState("");
  const [selectedPacket, setSelectedPacket] = useState<PacketType | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const [showModal, setShowModal] = useState(false);
  const [modalRole, setModalRole] = useState("");
  const [searchCategory, setSearchCategory] = useState<"name" | "email" | "address">("name");
  const [searchParticipantName, setSearchParticipantName] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [searchAddress, setSearchAddress] = useState("");
  const [searchResults, setSearchResults] = useState<Constituent[] | null>(null);
  const [selectedResult, setSelectedResult] = useState<string>("");
  const [participants, setParticipants] = useState<AssignedParticipant[]>([]);

  const filtered = PACKET_TYPES.filter(
    (p) =>
      p.name.toLowerCase().includes(inputValue.toLowerCase()) ||
      p.agency.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleSelect = (packet: PacketType) => {
    setSelectedPacket(packet);
    setInputValue(packet.name);
    setIsOpen(false);
    setParticipants([]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setSelectedPacket(null);
    setParticipants([]);
    setIsOpen(true);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const openModal = () => {
    setModalRole("");
    setSearchCategory("name");
    setSearchParticipantName("");
    setSearchEmail("");
    setSearchAddress("");
    setSearchResults(null);
    setSelectedResult("");
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const resetSearch = () => {
    setSearchParticipantName("");
    setSearchEmail("");
    setSearchAddress("");
    setSearchResults(null);
    setSelectedResult("");
  };

  const handleSearch = () => {
    let results: Constituent[];
    if (searchCategory === "name") {
      const q = searchParticipantName.toLowerCase().trim();
      results = q
        ? MOCK_CONSTITUENTS.filter((c) => c.constituentName.toLowerCase().includes(q))
        : [...MOCK_CONSTITUENTS];
    } else if (searchCategory === "email") {
      const q = searchEmail.toLowerCase().trim();
      results = q ? MOCK_CONSTITUENTS.filter((c) => c.email.toLowerCase().includes(q)) : [...MOCK_CONSTITUENTS];
    } else {
      const q = searchAddress.toLowerCase().trim();
      results = q ? MOCK_CONSTITUENTS.filter((c) => c.address.toLowerCase().includes(q)) : [...MOCK_CONSTITUENTS];
    }
    setSearchResults(results);
    setSelectedResult("");
  };

  const handleAddSelected = () => {
    if (!selectedResult || !modalRole) return;
    const found = MOCK_CONSTITUENTS.find((c) => c.id === selectedResult);
    if (!found) return;
    setParticipants((prev) => [
      ...prev,
      { id: Date.now(), role: modalRole, constituentName: found.constituentName, email: found.email, address: found.address },
    ]);
    showToast(`${found.constituentName} has been added as ${modalRole}.`);
    closeModal();
  };

  const handleRemoveParticipant = (id: number) => {
    setParticipants((prev) => prev.filter((p) => p.id !== id));
  };

  const nonPrimaryRoles = selectedPacket ? selectedPacket.roles.slice(1) : [];

  const sectionHeading: React.CSSProperties = {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 19,
    fontWeight: 700,
    color: "#1B1B1B",
    borderBottomWidth: 2,
    borderBottomStyle: "solid",
    borderBottomColor: "#DFE1E2",
    paddingBottom: 8,
    marginBottom: 24,
    marginTop: 0,
  };

  return (
    <PageShell title="Packets">
      <div style={{ padding: isMobile ? "0 0 24px" : "0 0 32px" }}>

        {/* Breadcrumbs */}
        <nav aria-label="breadcrumb" style={{ marginBottom: 20 }}>
          <ol
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              listStyle: "none",
              margin: 0,
              padding: 0,
              fontFamily: "'Public Sans', sans-serif",
              fontSize: 14,
            }}
          >
            <li>
              <Link to="/packets" style={{ color: "#005EA2", textDecoration: "underline" }}>
                Packets
              </Link>
            </li>
            <li style={{ display: "flex", alignItems: "center", color: "#71767A" }}>
              <ChevronRight size={14} />
            </li>
            <li style={{ color: "#1B1B1B", fontWeight: 600 }}>Create Packet</li>
          </ol>
        </nav>

        {/* Page content card */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 4,
            padding: isMobile ? 16 : 24,
          }}
        >
          <h1
            style={{
              fontFamily: "'Public Sans', sans-serif",
              fontSize: 24,
              fontWeight: 700,
              color: "#1B1B1B",
              marginBottom: 16,
            }}
          >
            Create Packet
          </h1>

          <p
            style={{
              fontFamily: "'Public Sans', sans-serif",
              fontSize: 16,
              lineHeight: "26px",
              color: "#1B1B1B",
              marginBottom: 32,
            }}
          >
            To create a new packet, begin by selecting a packet name below. Packet
            types are defined by the issuing agency and determine which roles must
            be filled by each participant. Once you select a packet, search for and
            assign a constituent to each required role.
          </p>

          {/* Packet Name Typeahead */}
          <div ref={containerRef} style={{ position: "relative", width: "100%", marginBottom: selectedPacket ? 32 : 0 }}>
            <label
              htmlFor="packet-name-input"
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
              Packet Name{" "}
              <span style={{ fontStyle: "italic", fontWeight: 400, fontSize: 14, color: "#71767A", marginLeft: 6 }}>
                Required
              </span>
            </label>
            <p
              style={{
                fontFamily: "'Public Sans', sans-serif",
                fontSize: 14,
                color: "#71767A",
                marginBottom: 6,
                marginTop: 0,
              }}
            >
              Begin typing to search available packet types
            </p>

            <div style={{ position: "relative" }}>
              <input
                id="packet-name-input"
                type="text"
                autoComplete="off"
                value={inputValue}
                onChange={handleInputChange}
                onFocus={() => setIsOpen(true)}
                placeholder="Search packet types..."
                style={{
                  ...inputStyle,
                  padding: "0 36px 0 10px",
                  fontSize: 16,
                  height: 40,
                }}
              />
              <svg
                style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
                width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14" fill="#71767A" />
              </svg>
            </div>

            {isOpen && filtered.length > 0 && (
              <ul
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  right: 0,
                  zIndex: 100,
                  backgroundColor: "#FFFFFF",
                  borderTopWidth: 0,
                  borderRightWidth: 1,
                  borderRightStyle: "solid",
                  borderRightColor: "#565C65",
                  borderBottomWidth: 1,
                  borderBottomStyle: "solid",
                  borderBottomColor: "#565C65",
                  borderLeftWidth: 1,
                  borderLeftStyle: "solid",
                  borderLeftColor: "#565C65",
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  maxHeight: 260,
                  overflowY: "auto",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.08)",
                }}
              >
                {filtered.map((packet) => (
                  <li
                    key={packet.id}
                    onMouseDown={() => handleSelect(packet)}
                    style={{
                      padding: "12px 14px",
                      cursor: "pointer",
                      borderBottomWidth: 1,
                      borderBottomStyle: "solid",
                      borderBottomColor: "#DFE1E2",
                      fontFamily: "'Public Sans', sans-serif",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#E8F0F8")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FFFFFF")}
                  >
                    <div style={{ fontSize: 15, fontWeight: 600, color: "#1B1B1B" }}>
                      {packet.name}
                    </div>
                    <div style={{ fontSize: 13, color: "#71767A", marginTop: 2 }}>
                      {packet.agency} &nbsp;·&nbsp; {packet.roles.length} Roles
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {isOpen && filtered.length === 0 && inputValue.length > 0 && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  right: 0,
                  zIndex: 100,
                  backgroundColor: "#FFFFFF",
                  borderRightWidth: 1,
                  borderRightStyle: "solid",
                  borderRightColor: "#565C65",
                  borderBottomWidth: 1,
                  borderBottomStyle: "solid",
                  borderBottomColor: "#565C65",
                  borderLeftWidth: 1,
                  borderLeftStyle: "solid",
                  borderLeftColor: "#565C65",
                  padding: "14px",
                  fontFamily: "'Public Sans', sans-serif",
                  fontSize: 14,
                  color: "#71767A",
                }}
              >
                No packet types found.
              </div>
            )}
          </div>

          {/* ── NEW: Add Participants ── */}
          {selectedPacket && (
            <div style={{ marginBottom: 40 }}>
              <h2 style={sectionHeading}>Add Participants</h2>

              <IconKeyAccordion
                sessionKey="packet-create-icon-key"
                defaultOpen={false}
                items={[
                  { icon: <Trash2 size={16} color="#FFFFFF" />, label: "Remove Participant" },
                ]}
              />

              <div style={{ overflowX: "auto", marginBottom: 16 }}>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontFamily: "'Public Sans', sans-serif",
                    fontSize: 14,
                    tableLayout: "fixed",
                  }}
                >
                  <colgroup>
                    <col style={{ width: "18%" }} />
                    <col style={{ width: "20%" }} />
                    <col style={{ width: "24%" }} />
                    <col style={{ width: "28%" }} />
                    <col style={{ width: "10%" }} />
                  </colgroup>
                  <thead>
                    <tr>
                      <th style={thStyle}>Role</th>
                      <th style={thStyle}>Participant Name</th>
                      <th style={thStyle}>Email Address</th>
                      <th style={thStyle}>Address</th>
                      <th style={thStyle}>Controls</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Primary row — always shown, pre-filled, no remove button */}
                    <tr style={{ backgroundColor: "#FFFFFF" }}>
                      <td style={tdStyle}>
                        <span style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                          {selectedPacket.roles[0]}
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
                        </span>
                      </td>
                      <td style={tdStyle}>{CURRENT_USER.name}</td>
                      <td style={{ ...tdStyle, fontSize: 13 }}>{CURRENT_USER.email}</td>
                      <td style={{ ...tdStyle, fontSize: 13, color: "#3D4551" }}>{CURRENT_USER.address}</td>
                      <td style={tdStyle}>—</td>
                    </tr>

                    {/* Added participants */}
                    {participants.map((p, idx) => (
                        <tr key={p.id} style={{ backgroundColor: idx % 2 === 0 ? "#F0F0F0" : "#FFFFFF" }}>
                          <td style={tdStyle}>{p.role}</td>
                          <td style={tdStyle}>{p.constituentName}</td>
                          <td style={{ ...tdStyle, fontSize: 13 }}>{p.email}</td>
                          <td style={{ ...tdStyle, fontSize: 13, color: "#3D4551" }}>{p.address}</td>
                          <td style={tdStyle}>
                            <button
                              onClick={() => handleRemoveParticipant(p.id)}
                              title="Remove participant"
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
                              <Trash2 size={14} color="#FFFFFF" />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <button
                    onClick={openModal}
                    style={{
                      fontFamily: "'Public Sans', sans-serif",
                      fontSize: 15,
                      fontWeight: 700,
                      color: "#1b1b1b",
                      backgroundColor: "#fa9441",
                      border: "none",
                      borderRadius: 4,
                      padding: "9px 18px",
                      cursor: "pointer",
                    }}
                  >
                    Add Participant
                  </button>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: 12,
                    paddingTop: 16,
                    borderTopWidth: 1,
                    borderTopStyle: "solid",
                    borderTopColor: "#DFE1E2",
                  }}
                >
                  <button
                    onClick={() => {
                      showToast("Draft saved successfully.");
                      navigate("/packets");
                    }}
                    style={{
                      fontFamily: "'Public Sans', sans-serif",
                      fontSize: 16,
                      fontWeight: 700,
                      color: "#FFFFFF",
                      backgroundColor: "#005EA2",
                      border: "none",
                      borderRadius: 4,
                      padding: "10px 20px",
                      cursor: "pointer",
                    }}
                  >
                    Save Draft
                  </button>
                  <button
                    onClick={() => navigate("/packets")}
                    style={{
                      fontFamily: "'Public Sans', sans-serif",
                      fontSize: 16,
                      fontWeight: 700,
                      color: "#FFFFFF",
                      backgroundColor: "#B50909",
                      border: "none",
                      borderRadius: 4,
                      padding: "10px 20px",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* ── Add Participant Modal ── */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.55)",
            padding: "16px",
          }}
          onMouseDown={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 4,
              width: "100%",
              maxWidth: 1000,
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
            }}
          >
            {/* Modal header */}
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
              <h2
                style={{
                  fontFamily: "'Public Sans', sans-serif",
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#FFFFFF",
                  margin: 0,
                }}
              >
                Add Participant
              </h2>
              <button
                onClick={closeModal}
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
                <X size={20} />
              </button>
            </div>

            {/* Modal body */}
            <div style={{ padding: "20px 20px 0" }}>

              {/* Role dropdown */}
              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>
                  Role <span style={requiredStyle}>Required</span>
                </label>
                <select
                  value={modalRole}
                  onChange={(e) => setModalRole(e.target.value)}
                  style={{
                    ...inputStyle,
                    height: 40,
                    padding: "0 32px 0 10px",
                    appearance: "none",
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M7 10l5 5 5-5H7z' fill='%231B1B1B'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 8px center",
                    backgroundSize: "16px",
                  }}
                >
                  <option value="">Please Select</option>
                  {nonPrimaryRoles.map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>

              {/* Divider */}
              <div style={{ borderTopWidth: 1, borderTopStyle: "solid", borderTopColor: "#DFE1E2", marginBottom: 20 }} />

              {/* Search by — radio group */}
              <div style={{ marginBottom: 16 }}>
                <span style={labelStyle}>Search By</span>
                <div style={{ display: "flex", gap: 24, marginTop: 8, flexWrap: "wrap" }}>
                  {[
                    { value: "name", label: "Participant Name" },
                    { value: "email", label: "Email Address" },
                    { value: "address", label: "Physical Address" },
                  ].map(({ value, label }) => (
                    <label
                      key={value}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        cursor: "pointer",
                        fontFamily: "'Public Sans', sans-serif",
                        fontSize: 15,
                        color: "#1B1B1B",
                      }}
                    >
                      <input
                        type="radio"
                        name="searchCategory"
                        value={value}
                        checked={searchCategory === value}
                        onChange={() => {
                          setSearchCategory(value as "name" | "email" | "address");
                          resetSearch();
                        }}
                        style={{ accentColor: "#005EA2", width: 16, height: 16, cursor: "pointer" }}
                      />
                      {label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Dynamic search inputs */}
              {searchCategory === "name" && (
                <div style={{ marginBottom: 16 }}>
                  <label htmlFor="modal-participant-name" style={labelStyle}>Participant Name</label>
                  <input
                    id="modal-participant-name"
                    type="text"
                    value={searchParticipantName}
                    onChange={(e) => setSearchParticipantName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    style={inputStyle}
                  />
                </div>
              )}

              {searchCategory === "email" && (
                <div style={{ marginBottom: 16 }}>
                  <label htmlFor="modal-email" style={labelStyle}>Email Address</label>
                  <input
                    id="modal-email"
                    type="text"
                    value={searchEmail}
                    onChange={(e) => setSearchEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    style={inputStyle}
                  />
                </div>
              )}


              {searchCategory === "address" && (
                <div style={{ marginBottom: 16 }}>
                  <label htmlFor="modal-address" style={labelStyle}>Physical Address</label>
                  <input
                    id="modal-address"
                    type="text"
                    value={searchAddress}
                    onChange={(e) => setSearchAddress(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    placeholder="Street, city, or zip"
                    style={inputStyle}
                  />
                </div>
              )}

              {/* Search / Clear buttons */}
              <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                <button
                  onClick={handleSearch}
                  style={{
                    fontFamily: "'Public Sans', sans-serif",
                    fontSize: 15,
                    fontWeight: 700,
                    color: "#FFFFFF",
                    backgroundColor: "#005EA2",
                    border: "none",
                    borderRadius: 4,
                    padding: "8px 18px",
                    cursor: "pointer",
                  }}
                >
                  Search
                </button>
                <button
                  onClick={resetSearch}
                  style={{
                    fontFamily: "'Public Sans', sans-serif",
                    fontSize: 15,
                    fontWeight: 400,
                    color: "#005EA2",
                    backgroundColor: "transparent",
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderColor: "#005EA2",
                    borderRadius: 4,
                    padding: "8px 18px",
                    cursor: "pointer",
                  }}
                >
                  Clear
                </button>
              </div>

              {/* Search results */}
              {searchResults !== null && (
                <div style={{ marginBottom: 20 }}>
                  {searchResults.length === 0 ? (
                    <p
                      style={{
                        fontFamily: "'Public Sans', sans-serif",
                        fontSize: 14,
                        color: "#71767A",
                        fontStyle: "italic",
                        margin: 0,
                        paddingBottom: 4,
                      }}
                    >
                      No results found. Try a different search term.
                    </p>
                  ) : (
                    <div style={{ overflowX: "auto" }}>
                      <table
                        style={{
                          width: "100%",
                          borderCollapse: "collapse",
                          fontFamily: "'Public Sans', sans-serif",
                          fontSize: 13,
                          tableLayout: "fixed",
                        }}
                      >
                        <colgroup>
                          <col style={{ width: "5%" }} />
                          <col style={{ width: "13%" }} />
                          <col style={{ width: "18%" }} />
                          <col style={{ width: "14%" }} />
                          <col style={{ width: "22%" }} />
                          <col style={{ width: "28%" }} />
                        </colgroup>
                        <thead>
                          <tr>
                            <th style={{ ...thStyle, fontSize: 12 }}>Select</th>
                            <th style={{ ...thStyle, fontSize: 12 }}>Individual/Business</th>
                            <th style={{ ...thStyle, fontSize: 12 }}>Participant Name</th>
                            <th style={{ ...thStyle, fontSize: 12 }}>Username</th>
                            <th style={{ ...thStyle, fontSize: 12 }}>Email Address</th>
                            <th style={{ ...thStyle, fontSize: 12 }}>Address</th>
                          </tr>
                        </thead>
                        <tbody>
                          {searchResults.map((c, idx) => (
                            <tr
                              key={c.id}
                              style={{
                                backgroundColor: selectedResult === c.id ? "#E8F0F8" : idx % 2 === 0 ? "#FFFFFF" : "#F8F8F8",
                                cursor: "pointer",
                              }}
                              onClick={() => setSelectedResult(c.id)}
                            >
                              <td style={{ ...tdStyle, fontSize: 13, textAlign: "center" }}>
                                <input
                                  type="radio"
                                  name="searchResult"
                                  value={c.id}
                                  checked={selectedResult === c.id}
                                  onChange={() => setSelectedResult(c.id)}
                                  style={{ accentColor: "#005EA2", width: 15, height: 15, cursor: "pointer" }}
                                />
                              </td>
                              <td style={{ ...tdStyle, fontSize: 12 }}>{c.type}</td>
                              <td style={{ ...tdStyle, fontSize: 12 }}>{c.constituentName}</td>
                              <td style={{ ...tdStyle, fontSize: 12 }}>{c.username}</td>
                              <td style={{ ...tdStyle, fontSize: 12 }}>{c.email}</td>
                              <td style={{ ...tdStyle, fontSize: 12, color: "#3D4551" }}>{c.address}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal footer */}
            <div
              style={{
                display: "flex",
                gap: 8,
                padding: "16px 20px",
                borderTopWidth: 1,
                borderTopStyle: "solid",
                borderTopColor: "#DFE1E2",
                position: "sticky",
                bottom: 0,
                backgroundColor: "#FFFFFF",
              }}
            >
              <button
                onClick={handleAddSelected}
                disabled={!selectedResult || !modalRole}
                style={{
                  fontFamily: "'Public Sans', sans-serif",
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#FFFFFF",
                  backgroundColor: "#005EA2",
                  border: "none",
                  borderRadius: 4,
                  padding: "9px 18px",
                  cursor: selectedResult && modalRole ? "pointer" : "not-allowed",
                  opacity: selectedResult && modalRole ? 1 : 0.45,
                }}
              >
                Add Selected
              </button>
              <button
                onClick={closeModal}
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
      )}
    </PageShell>
  );
}
