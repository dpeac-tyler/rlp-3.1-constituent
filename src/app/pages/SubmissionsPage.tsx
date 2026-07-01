import { useState } from "react";
import { PageShell } from "../components/PageShell";
import { SubmissionsTable } from "../components/SubmissionsTable";
import { PaymentRequestsTable } from "../components/PaymentRequestsTable";
import { IconKeyAccordion } from "../components/IconKeyAccordion";
import { useIsMobile } from "../hooks/useIsMobile";
import { useAgency } from "../components/AgencyContext";

const agencies = [
  { value: "", label: "- Please Select -" },
  { value: "agency-1", label: "Department of Professional & Financial Regulation" },
  { value: "agency-2", label: "Bureau of Consumer Credit Protection" },
];

interface SubmissionsPageProps {
  activeTab: "my-submissions" | "payment-requests";
}

const SUBMISSIONS_TAB_LABELS: Record<SubmissionsPageProps["activeTab"], string> = {
  "my-submissions": "My Submissions",
  "payment-requests": "Payment Requests",
};

export function SubmissionsPage({ activeTab }: SubmissionsPageProps) {
  const isMobile = useIsMobile();
  const { selectedAgency, setSelectedAgency } = useAgency();

  return (
    <PageShell title={`Submissions - ${SUBMISSIONS_TAB_LABELS[activeTab]}`}>
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: 4,
          padding: isMobile ? 16 : 24,
        }}
      >
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
          Welcome to your Submissions page. You can view your personal draft,
          pending, approved, rejected, and denied submissions here. Use the
          options available in the Controls column to take further action.
          Rejected submissions may include an explanation accessed by clicking a
          View Reason link. When a submission is rejected, a new draft is created
          for you to make a resubmission.
        </p>
        <p
          style={{
            fontFamily: "'Public Sans', sans-serif",
            fontSize: 16,
            lineHeight: "26px",
            color: "#1B1B1B",
            marginBottom: 16,
          }}
        >
          You may also view the submissions that have been sent to you for
          payment by a subordinate user by selecting the Payment Request tab.
          Using the selection boxes on the left, you may choose one or more
          submission and either send them to your Shopping Cart for payment, or
          Deny them to send the payment request back to the user.
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
            htmlFor="submissions-agency-select"
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
            id="submissions-agency-select"
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
            No Submissions available.
          </p>
        ) : (
          <>
            {/* Icon Key Accordion */}
            <IconKeyAccordion />

            {/* Sub-page heading */}
            <h2
              style={{
                fontFamily: "'Public Sans', sans-serif",
                color: "#1B1B1B",
                marginBottom: 24,
              }}
            >
              {activeTab === "my-submissions" ? "My Submissions" : "Payment Requests"}
            </h2>

            {/* Placeholder content area — tabular data will go here */}
            {activeTab === "my-submissions" && <SubmissionsTable />}
            {activeTab === "payment-requests" && <PaymentRequestsTable />}
          </>
        )}
      </div>
    </PageShell>
  );
}