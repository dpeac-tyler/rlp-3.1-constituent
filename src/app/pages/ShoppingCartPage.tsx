import { PageShell } from "../components/PageShell";
import { useIsMobile } from "../hooks/useIsMobile";

interface ShoppingCartPageProps {
  activeTab: "cart" | "payment-summary";
}

const CART_TAB_LABELS: Record<ShoppingCartPageProps["activeTab"], string> = {
  "cart": "Cart",
  "payment-summary": "Payment Summary",
};

export function ShoppingCartPage({ activeTab }: ShoppingCartPageProps) {
  const isMobile = useIsMobile();

  return (
    <PageShell title={`Shopping Cart - ${CART_TAB_LABELS[activeTab]}`}>
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: 4,
          padding: isMobile ? 16 : 24,
        }}
      >
        {activeTab === "cart" && <ShoppingCartContent />}
        {activeTab === "payment-summary" && <PaymentSummaryContent />}
      </div>
    </PageShell>
  );
}

function ShoppingCartContent() {
  return (
    <>
      {/* Intro text */}
      <p
        style={{
          fontFamily: "'Public Sans', sans-serif",
          fontSize: 16,
          lineHeight: "26px",
          color: "#1B1B1B",
          marginBottom: 24,
        }}
      >
        Welcome to your shopping cart. You can select the applications you want
        to pay for and submit from here.
      </p>

      {/* USWDS Informative Status Alert — Warning */}
      <div
        style={{
          backgroundColor: "#FAF3D1",
          borderLeftWidth: 4,
          borderLeftStyle: "solid",
          borderLeftColor: "#FFBE2E",
          borderTopWidth: 0,
          borderTopStyle: "solid",
          borderTopColor: "#FAF3D1",
          borderRightWidth: 0,
          borderRightStyle: "solid",
          borderRightColor: "#FAF3D1",
          borderBottomWidth: 0,
          borderBottomStyle: "solid",
          borderBottomColor: "#FAF3D1",
          padding: "16px 20px",
          marginBottom: 24,
          display: "flex",
          alignItems: "flex-start",
          gap: 12,
        }}
      >
        {/* Warning icon */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ flexShrink: 0, marginTop: 2 }}
        >
          <path
            d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"
            fill="#FFBE2E"
          />
        </svg>
        <div>
          <h3
            style={{
              fontFamily: "'Public Sans', sans-serif",
              fontWeight: 700,
              fontSize: 16,
              lineHeight: "24px",
              color: "#1B1B1B",
              margin: 0,
              marginBottom: 4,
            }}
          >
            Warning
          </h3>
          <p
            style={{
              fontFamily: "'Public Sans', sans-serif",
              fontSize: 16,
              lineHeight: "26px",
              color: "#1B1B1B",
              margin: 0,
            }}
          >
            Once a payment is selected, only those payments that share a payment
            type can be selected together. All payments that do not share the
            payment type with the first selected payment will be disabled until
            the payment process is completed, or the initial payment is
            unselected.
          </p>
        </div>
      </div>

      {/* Notes */}
      <div>
        <p
          style={{
            fontFamily: "'Public Sans', sans-serif",
            fontSize: 16,
            lineHeight: "26px",
            color: "#1B1B1B",
            marginBottom: 16,
          }}
        >
          Denying an application from this screen will return the application to
          the user who requested the payment.
        </p>
        <p
          style={{
            fontFamily: "'Public Sans', sans-serif",
            fontSize: 16,
            lineHeight: "26px",
            color: "#1B1B1B",
            margin: 0,
          }}
        >
          Items in your cart that have been disabled are still in process and
          will update as soon as that process is completed. If any items in your
          cart have been disabled for more than 72 hours, please contact your
          agency for assistance.
        </p>
      </div>
    </>
  );
}

function PaymentSummaryContent() {
  return (
    <p
      style={{
        fontFamily: "'Public Sans', sans-serif",
        fontSize: 16,
        lineHeight: "26px",
        color: "#71767A",
        fontStyle: "italic",
        textAlign: "center",
        padding: "24px 12px",
      }}
    >
      No payment summary data available.
    </p>
  );
}