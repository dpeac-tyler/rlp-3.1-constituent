import { useNavigate } from "react-router";
import { Eye, Pencil, SendHorizontal, Trash2, UserPen } from "lucide-react";
import { PageShell } from "../components/PageShell";
import { PacketsTable } from "../components/PacketsTable";
import { IconKeyAccordion } from "../components/IconKeyAccordion";
import { useIsMobile } from "../hooks/useIsMobile";

export function PacketsPage() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

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
      </div>
    </PageShell>
  );
}
