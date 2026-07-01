import { useState, useEffect } from "react";
import { BranchProvider } from "./BranchContext";
import { ToastProvider } from "./ToastContext";
import { ProfileProvider } from "./ProfileContext";
import { AgencyProvider } from "./AgencyContext";
import { AccountOnboardingProvider, useAccountOnboarding } from "./AccountOnboardingContext";
import { Outlet, useLocation, useNavigate } from "react-router";
import { Header } from "./Header";
import { AddressContainer } from "./AddressContainer";
import { NavItem } from "./NavItem";
import { NavDivider } from "./NavDivider";
import { SubNavItem } from "./SubNavItem";
import { NavGroup } from "./NavGroup";
import { ChatBot } from "./ChatBot";
import certificateSvgPaths from "../../imports/svg-klqb4f8snr";
import { useIsMobile } from "../hooks/useIsMobile";

export function Layout() {
  return (
    <ToastProvider>
      <ProfileProvider>
        <AgencyProvider>
          <AccountOnboardingProvider>
            <LayoutContent />
          </AccountOnboardingProvider>
        </AgencyProvider>
      </ProfileProvider>
    </ToastProvider>
  );
}

function LayoutContent() {
  const [isExpanded, setIsExpanded] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { showOnboarding } = useAccountOnboarding();
  const isMobile = useIsMobile();

  // Auto-collapse sidebar on mobile, auto-expand on desktop
  useEffect(() => {
    if (isMobile) setIsExpanded(false);
    else setIsExpanded(true);
  }, [isMobile]);

  // Close sidebar overlay on navigation (mobile)
  useEffect(() => {
    if (isMobile) setIsExpanded(false);
  }, [location.pathname, isMobile]);

  const isActive = (path: string) => location.pathname === path;
  const isAffiliationsActive = location.pathname.startsWith("/affiliations");
  const isSubmissionsActive = location.pathname.startsWith("/submissions/") || location.pathname === "/submissions";
  const isCorrespondenceActive = location.pathname.startsWith("/correspondence");
  const isShoppingCartActive = location.pathname.startsWith("/shopping-cart");
  const isAssetCertsActive = location.pathname.startsWith("/asset-certifications");
  const isAccountActive = location.pathname.startsWith("/account");

  /** Whether to show the subtle sidebar highlight on account nav items */
  const highlightAccountNav = isAccountActive && showOnboarding;

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Header - full width */}
      <Header
        isAddressVisible={isExpanded}
        onToggleAddress={() => setIsExpanded((prev) => !prev)}
      />

      {/* Content area below header */}
      <div className="flex w-full flex-1" style={{ position: "relative" }}>
        {/* Mobile overlay backdrop */}
        {isMobile && isExpanded && (
          <div
            onClick={() => setIsExpanded(false)}
            style={{
              position: "fixed",
              inset: 0,
              top: 56,
              backgroundColor: "rgba(0,0,0,0.4)",
              zIndex: 40,
            }}
          />
        )}

        {/* Sidebar */}
        <div
          className="flex flex-col overflow-y-auto overflow-x-hidden"
          style={{
            width: isMobile ? 260 : isExpanded ? 260 : 50,
            flexShrink: 0,
            borderRightWidth: 1,
            borderRightStyle: "solid",
            borderRightColor: "#e0e0e0",
            transition: isMobile
              ? "transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)"
              : "width 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
            ...(isMobile
              ? {
                  position: "fixed",
                  top: 56,
                  left: 0,
                  bottom: 0,
                  zIndex: 50,
                  backgroundColor: "#FFFFFF",
                  transform: isExpanded ? "translateX(0)" : "translateX(-100%)",
                }
              : {}),
          }}
        >
          {/* Address container - only when expanded */}
          <div
            style={{
              maxHeight: isExpanded ? 200 : 0,
              opacity: isExpanded ? 1 : 0,
              overflow: "hidden",
              transition:
                "max-height 0.25s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease",
            }}
          >
            <AddressContainer />
          </div>

          {/* Divider between address and nav */}
          <div
            style={{
              borderBottomWidth: 1,
              borderBottomStyle: "solid",
              borderBottomColor: "#e0e0e0",
              opacity: isExpanded ? 1 : 0,
              transition: "opacity 0.2s ease",
            }}
          />

          {/* Navigation items */}
          <nav className="flex flex-col">
            <NavItem label="Home" isActive={isActive("/")} isExpanded={isExpanded} to="/" />
            {isAccountActive && (
              <>
                <NavDivider label="Account" />
                <NavItem
                  label="Account"
                  isActive={isActive("/account")}
                  isExpanded={isExpanded}
                  highlighted={highlightAccountNav}
                  to="/account"
                  icon={
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2a7.2 7.2 0 0 1-6-3.22c.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08a7.2 7.2 0 0 1-6 3.22z" fill="#757575" />
                    </svg>
                  }
                />
                <NavItem
                  label="Branches"
                  isActive={location.pathname.startsWith("/account/branches")}
                  isExpanded={isExpanded}
                  highlighted={highlightAccountNav}
                  to="/account/branches"
                  icon={
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" fill="#757575" />
                    </svg>
                  }
                />
                <NavItem
                  label="Contacts"
                  isActive={isActive("/account/contacts")}
                  isExpanded={isExpanded}
                  highlighted={highlightAccountNav}
                  to="/account/contacts"
                  icon={
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="#757575" />
                    </svg>
                  }
                />
                <NavItem
                  label="Location"
                  isActive={isActive("/account/location")}
                  isExpanded={isExpanded}
                  highlighted={highlightAccountNav}
                  to="/account/location"
                  icon={
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" fill="#757575" />
                    </svg>
                  }
                />
                <NavItem
                  label="Profile"
                  isActive={isActive("/account/profile")}
                  isExpanded={isExpanded}
                  highlighted={highlightAccountNav}
                  to="/account/profile"
                  icon={
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 5.9a2.1 2.1 0 1 1 0 4.2 2.1 2.1 0 0 1 0-4.2m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z" fill="#757575" />
                    </svg>
                  }
                />
              </>
            )}
            <NavDivider label="Business" />
            <NavGroup
              isExpanded={isExpanded}
              isSectionActive={isAffiliationsActive}
              flyoutLabel="Affiliations"
              navItem={
                <NavItem
                  label="Affiliations"
                  isActive={isAffiliationsActive}
                  isExpanded={isExpanded}
                  to="/affiliations"
                  hasSubNav
                  icon={
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 12.75c1.63 0 3.07.39 4.24.9 1.08.48 1.76 1.56 1.76 2.73V18H6v-1.61c0-1.18.68-2.26 1.76-2.73 1.17-.52 2.61-.91 4.24-.91M4 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m1.13 1.1c-.37-.06-.74-.1-1.13-.1-.99 0-1.93.21-2.78.58A2.01 2.01 0 0 0 0 16.43V18h4.5v-1.61c0-.83.23-1.61.63-2.29M20 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m4 3.43c0-.81-.48-1.53-1.22-1.85A6.95 6.95 0 0 0 20 14c-.39 0-.76.04-1.13.1.4.68.63 1.46.63 2.29V18H24zM12 6c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3" fill="#757575" />
                    </svg>
                  }
                />
              }
              subNavItems={
                <>
                  <SubNavItem label="Subordinate" to="/affiliations/subordinate" isActive={isActive("/affiliations/subordinate")} />
                  <SubNavItem label="Superior" to="/affiliations/superior" isActive={isActive("/affiliations/superior")} />
                  <SubNavItem label="Pending" to="/affiliations/pending" isActive={isActive("/affiliations/pending")} />
                  <SubNavItem label="Renewals" to="/affiliations/renewals" isActive={isActive("/affiliations/renewals")} />
                  <SubNavItem label="History" to="/affiliations/history" isActive={isActive("/affiliations/history")} />
                </>
              }
            />
            <NavItem
              label="Certifications"
              isActive={isActive("/certifications")}
              isExpanded={isExpanded}
              to="/certifications"
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d={certificateSvgPaths.p29871700} fill="#757575" />
                </svg>
              }
            />
            <NavItem
              label="Complaints"
              isActive={isActive("/complaints")}
              isExpanded={isExpanded}
              to="/complaints"
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 8H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h1v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h3l5 4V4zm9.5 4c0 1.71-.96 3.26-2.5 4V8c1.53.75 2.5 2.3 2.5 4" fill="#757575" />
                </svg>
              }
            />
            <NavGroup
              isExpanded={isExpanded}
              isSectionActive={isCorrespondenceActive}
              flyoutLabel="Correspondence"
              navItem={
                <NavItem
                  label="Correspondence"
                  isActive={isCorrespondenceActive}
                  isExpanded={isExpanded}
                  to="/correspondence"
                  hasSubNav
                  icon={
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 4-8 5-8-5V6l8 5 8-5z" fill="#757575" />
                    </svg>
                  }
                />
              }
              subNavItems={
                <>
                  <SubNavItem label="Emails" to="/correspondence/emails" isActive={isActive("/correspondence/emails")} />
                  <SubNavItem label="Letters" to="/correspondence/letters" isActive={isActive("/correspondence/letters")} />
                </>
              }
            />
            <NavItem
              label="Documents"
              isActive={isActive("/documents")}
              isExpanded={isExpanded}
              to="/documents"
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11zM8 15.01l1.41 1.41L11 14.84V19h2v-4.16l1.59 1.59L16 15.01 12.01 11z" fill="#757575" />
                </svg>
              }
            />
            <NavItem
              label="Invoices"
              isActive={isActive("/invoices")}
              isExpanded={isExpanded}
              to="/invoices"
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.5 3.5 18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2v14H3v3c0 1.66 1.34 3 3 3h12c1.66 0 3-1.34 3-3V2zM19 19c0 .55-.45 1-1 1s-1-.45-1-1v-3H8V5h11z" fill="#757575" />
                  <path d="M9 7h6v2H9zm7 0h2v2h-2zm-7 3h6v2H9zm7 0h2v2h-2z" fill="#757575" />
                </svg>
              }
            />
            <NavItem
              label="Packets"
              isActive={isActive("/packets")}
              isExpanded={isExpanded}
              to="/packets"
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6h-2.18c.07-.31.18-.61.18-.97A3.03 3.03 0 0 0 15 2c-1.02 0-1.87.54-2.37 1.32L12 4.6l-.63-1.28C10.87 2.54 10.02 2 9 2a3.03 3.03 0 0 0-3 3.03c0 .36.11.66.18.97H4C2.9 6 2 6.9 2 8v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2M15 4c.55 0 1 .45 1 1.03 0 .55-.45.97-1 .97h-2.5zM9 4c.55 0 1 .45 1.03 1.03C10.03 5.58 9.58 6 9 6H6.5zm11 16H4v-2h16zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20z" fill="#757575" />
                </svg>
              }
            />
            <NavGroup
              isExpanded={isExpanded}
              isSectionActive={isShoppingCartActive}
              flyoutLabel="Cart"
              navItem={
                <NavItem
                  label="Shopping Cart (0)"
                  isActive={isShoppingCartActive}
                  isExpanded={isExpanded}
                  to="/shopping-cart"
                  hasSubNav
                  icon={
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2 2 2 0 0 0 2-2 2 2 0 0 0-2-2M1 2v2h2l3.6 7.59-1.36 2.45c-.15.28-.24.61-.24.96a2 2 0 0 0 2 2h12v-2H7.42a.25.25 0 0 1-.25-.25q0-.075.03-.12L8.1 13h7.45c.75 0 1.41-.42 1.75-1.03l3.58-6.47c.07-.16.12-.33.12-.5a1 1 0 0 0-1-1H5.21l-.94-2M7 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2 2 2 0 0 0 2-2 2 2 0 0 0-2-2" fill="#757575" />
                    </svg>
                  }
                />
              }
              subNavItems={
                <>
                  <SubNavItem label="Cart" to="/shopping-cart/cart" isActive={isActive("/shopping-cart/cart")} />
                  <SubNavItem label="Payment Summary" to="/shopping-cart/payment-summary" isActive={isActive("/shopping-cart/payment-summary")} />
                </>
              }
            />
            <NavGroup
              isExpanded={isExpanded}
              isSectionActive={isSubmissionsActive}
              flyoutLabel="Submissions"
              navItem={
                <NavItem
                  label="Submissions"
                  isActive={isSubmissionsActive}
                  isExpanded={isExpanded}
                  to="/submissions"
                  hasSubNav
                  icon={
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17 9H7V7h10m0 6H7v-2h10m-3 6H7v-2h7M12 3a1 1 0 0 1 1 1 1 1 0 0 1-1 1 1 1 0 0 1-1-1 1 1 0 0 1 1-1m7 0h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2" fill="#757575" />
                    </svg>
                  }
                />
              }
              subNavItems={
                <>
                  <SubNavItem label="My Submissions" to="/submissions/my-submissions" isActive={isActive("/submissions/my-submissions")} />
                  <SubNavItem label="Payment Requests (0)" to="/submissions/payment-requests" isActive={isActive("/submissions/payment-requests")} />
                </>
              }
            />
            <NavDivider label="Asset License" />
            <NavGroup
              isExpanded={isExpanded}
              isSectionActive={isAssetCertsActive}
              flyoutLabel="Certifications"
              navItem={
                <NavItem
                  label="Certifications"
                  isActive={isAssetCertsActive}
                  isExpanded={isExpanded}
                  to="/asset-certifications"
                  backgroundColor="#E9F2F6"
                  hasSubNav
                  icon={
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d={certificateSvgPaths.p29871700} fill="#005EA2" />
                    </svg>
                  }
                />
              }
              subNavItems={
                <>
                  <SubNavItem label="My Certifications" to="/asset-certifications/my-certifications" isActive={isActive("/asset-certifications/my-certifications")} backgroundColor="#E9F2F6" activeBackgroundColor="#FFFFFF" />
                  <SubNavItem label="Sponsored Certifications" to="/asset-certifications/sponsored-certifications" isActive={isActive("/asset-certifications/sponsored-certifications")} backgroundColor="#E9F2F6" activeBackgroundColor="#FFFFFF" />
                </>
              }
            />
            <NavItem
              label="My Assets"
              isActive={isActive("/my-assets")}
              isExpanded={isExpanded}
              to="/my-assets"
              backgroundColor="#E9F2F6"
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8a1 1 0 0 1-1-1V8a2 2 0 0 1 2-2h3.17A3 3 0 0 1 6 5a3 3 0 0 1 3-3c1 0 1.88.5 2.43 1.24v-.01L12 4l.57-.77v.01C13.12 2.5 14 2 15 2a3 3 0 0 1 3 3 3 3 0 0 1-.17 1H21a2 2 0 0 1 2 2v3a1 1 0 0 1-1 1M4 20h7v-8H4zm16 0v-8h-7v8zM9 4a1 1 0 0 0-1 1 1 1 0 0 0 1 1 1 1 0 0 0 1-1 1 1 0 0 0-1-1m6 0a1 1 0 0 0-1 1 1 1 0 0 0 1 1 1 1 0 0 0 1-1 1 1 0 0 0-1-1M3 8v2h8V8zm10 0v2h8V8z" fill="#005EA2" />
                </svg>
              }
            />
            <NavItem
              label="Submissions"
              isActive={isActive("/asset-submissions")}
              isExpanded={isExpanded}
              to="/asset-submissions"
              backgroundColor="#E9F2F6"
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 9H7V7h10m0 6H7v-2h10m-3 6H7v-2h7M12 3a1 1 0 0 1 1 1 1 1 0 0 1-1 1 1 1 0 0 1-1-1 1 1 0 0 1 1-1m7 0h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2" fill="#005EA2" />
                </svg>
              }
            />
            <NavItem
              label="Renewals"
              isActive={isActive("/renewals")}
              isExpanded={isExpanded}
              to="/renewals"
              backgroundColor="#E9F2F6"
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 18a6 6 0 0 1-6-6c0-1 .25-1.97.7-2.8L5.24 7.74A7.93 7.93 0 0 0 4 12a8 8 0 0 0 8 8v3l4-4-4-4m0-11V1L8 5l4 4V6a6 6 0 0 1 6 6c0 1-.25 1.97-.7 2.8l1.46 1.46A7.93 7.93 0 0 0 20 12a8 8 0 0 0-8-8" fill="#005EA2" />
                </svg>
              }
            />
          </nav>
        </div>

        {/* Main content area - fills remaining space */}
        <div
          className="flex-1 flex flex-col"
          style={{ minHeight: 1000, minWidth: 0 }}
        >
          <BranchProvider>
            <Outlet />
          </BranchProvider>
        </div>
      </div>

      {/* Footer */}
      <footer
        style={{
          height: 100,
          backgroundColor: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "0 24px",
          borderTopWidth: 1,
          borderTopStyle: "solid",
          borderTopColor: "#e0e0e0",
          borderRightWidth: 0,
          borderRightStyle: "none",
          borderRightColor: "transparent",
          borderBottomWidth: 0,
          borderBottomStyle: "none",
          borderBottomColor: "transparent",
          borderLeftWidth: 0,
          borderLeftStyle: "none",
          borderLeftColor: "transparent",
        }}
      >
        <div style={{ textAlign: "right" }}>
          <p
            style={{
              fontFamily: "'Public Sans', sans-serif",
              color: "#1B1B1B",
              margin: 0,
            }}
          >
            Agency Information
          </p>
          <a
            href="mailto:agency@agencyname.com"
            style={{
              fontFamily: "'Public Sans', sans-serif",
              color: "#005EA2",
              margin: 0,
            }}
          >
            agency@agencyname.com
          </a>
        </div>
      </footer>

      {/* Chatbot */}
      <ChatBot />
    </div>
  );
}