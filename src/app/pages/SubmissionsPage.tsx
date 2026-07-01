import { PageShell } from "../components/PageShell";
import { SubmissionsTable } from "../components/SubmissionsTable";
import { PaymentRequestsTable } from "../components/PaymentRequestsTable";
import { IconKeyAccordion } from "../components/IconKeyAccordion";
import { useIsMobile } from "../hooks/useIsMobile";

interface SubmissionsPageProps {
  activeTab: "my-submissions" | "payment-requests";
}

const SUBMISSIONS_TAB_LABELS: Record<SubmissionsPageProps["activeTab"], string> = {
  "my-submissions": "My Submissions",
  "payment-requests": "Payment Requests",
};

export function SubmissionsPage({ activeTab }: SubmissionsPageProps) {
  const isMobile = useIsMobile();

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
      </div>
    </PageShell>
  );
}