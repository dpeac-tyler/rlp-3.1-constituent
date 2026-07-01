import { useNavigate } from "react-router";
import { Eye, Pencil, SendHorizontal, Trash2, UserPen } from "lucide-react";
import { PageShell } from "../components/PageShell";
import { PacketsTable } from "../components/PacketsTable";
import { IconKeyAccordion } from "../components/IconKeyAccordion";
import { useIsMobile } from "../hooks/useIsMobile";
import { useAgency } from "../components/AgencyContext";

const agencies = [
  { value: "", label: "- Please Select -" },
  { value: "agency-1", label: "Department of Professional & Financial Regulation" },
  { value: "agency-2", label: "Bureau of Consumer Credit Protection" },
];

export function PacketsPage() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { selectedAgency, setSelectedAgency } = useAgency();

  return (
    <PageShell title="Packets">
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: 4,
          padding: isMobile ? 16 : 24,
        }}
      >
        {/* Intro */}
        <p
          style={{
            fontFamily: "'Public Sans', sans-serif",
            fontSize: 16,
            lineHeight: "26px",
            color: "#1B1B1B",
            marginBottom: 16,
          }}
        >
          Welcome to your Packets page. A packet groups multiple related license
          applications together under a single submission. You can view all of
          your active and historical packets here, expand each packet to see its
          individual applications, and use the controls to take further action on
          any member of the packet.
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

        {/* Agency Select */}
        <div className="w-full" style={{ marginBottom: 32 }}>
          <label
            htmlFor="packets-agency-select"
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
            id="packets-agency-select"
            className="w-full"
            value={selectedAgency}
            onChange={(e) => setSelectedAgency(e.target.value)}
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
            No Packets available.
          </p>
        ) : (
          <>
            <IconKeyAccordion
              items={[
                { icon: <Eye size={16} color="#FFFFFF" />, label: "View Packet" },
                { icon: <Pencil size={16} color="#FFFFFF" />, label: "Edit Packet" },
                { icon: <SendHorizontal size={16} color="#FFFFFF" />, label: "Send Applications" },
                { icon: <Trash2 size={16} color="#FFFFFF" />, label: "Delete Packet" },
                { icon: <UserPen size={16} color="#FFFFFF" />, label: "Reassign Applicant" },
              ]}
            />
            <button
              onClick={() => navigate("/packets/create")}
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
                marginBottom: 16,
              }}
            >
              Create Packet
            </button>
            <h2
              style={{
                fontFamily: "'Public Sans', sans-serif",
                color: "#1B1B1B",
                margin: "0 0 24px 0",
              }}
            >
              My Packets
            </h2>
            <PacketsTable />
          </>
        )}
      </div>
    </PageShell>
  );
}
