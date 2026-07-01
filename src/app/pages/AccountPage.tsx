import { useState } from "react";
import { PageShell } from "../components/PageShell";
import { Eye, EyeOff, Check, X } from "lucide-react";
import { useIsMobile } from "../hooks/useIsMobile";

export function AccountPage() {
  const isMobile = useIsMobile();
  const [email, setEmail] = useState("boring@boringcompany.com");
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [editEmail, setEditEmail] = useState(email);

  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleEmailSave = () => {
    setEmail(editEmail);
    setIsEditingEmail(false);
  };

  const handleEmailCancel = () => {
    setEditEmail(email);
    setIsEditingEmail(false);
  };

  const handlePasswordSave = () => {
    setIsEditingPassword(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handlePasswordCancel = () => {
    setIsEditingPassword(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const passwordsMatch = newPassword.length > 0 && newPassword === confirmPassword;
  const passwordFormValid = currentPassword.length > 0 && newPassword.length >= 8 && passwordsMatch;

  const inputStyle: React.CSSProperties = {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 16,
    lineHeight: "24px",
    padding: "8px 12px",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#565C65",
    borderRadius: 4,
    color: "#1B1B1B",
    backgroundColor: "#FFFFFF",
    width: "100%",
    boxSizing: "border-box",
    outline: "none",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 16,
    lineHeight: "24px",
    fontWeight: 700,
    color: "#1B1B1B",
    marginBottom: 4,
    display: "block",
  };

  const buttonPrimaryStyle: React.CSSProperties = {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 16,
    fontWeight: 700,
    lineHeight: "24px",
    padding: "10px 20px",
    backgroundColor: "#005EA2",
    color: "#FFFFFF",
    borderWidth: 0,
    borderStyle: "none",
    borderColor: "transparent",
    borderRadius: 4,
    cursor: "pointer",
  };

  const buttonSecondaryStyle: React.CSSProperties = {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 16,
    fontWeight: 700,
    lineHeight: "24px",
    padding: "10px 20px",
    backgroundColor: "#B50909",
    color: "#FFFFFF",
    borderWidth: 0,
    borderStyle: "none",
    borderColor: "transparent",
    borderRadius: 4,
    cursor: "pointer",
  };

  const buttonLinkStyle: React.CSSProperties = {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 16,
    fontWeight: 700,
    color: "#005EA2",
    backgroundColor: "transparent",
    borderWidth: 0,
    borderStyle: "none",
    borderColor: "transparent",
    cursor: "pointer",
    padding: 0,
    textDecoration: "underline",
  };

  return (
    <PageShell title="Account">

      {/* Intro text */}
      <p
        style={{
          fontFamily: "'Public Sans', sans-serif",
          fontSize: 16,
          lineHeight: "24px",
          color: "#1B1B1B",
          margin: "0 0 24px 0",
        }}
      >
        Change your Email Address or Password here.
      </p>

      <div style={{ maxWidth: 720, display: "flex", flexDirection: "column", gap: 24 }}>
        {/* Username (read-only) */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 4,
            padding: isMobile ? 16 : 24,
          }}
        >
          <h2
            style={{
              fontFamily: "'Public Sans', sans-serif",
              color: "#1B1B1B",
              margin: "0 0 16px 0",
            }}
          >
            Username
          </h2>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 16px",
              backgroundColor: "#F0F0F0",
              borderRadius: 4,
              borderLeftWidth: 4,
              borderLeftStyle: "solid",
              borderLeftColor: "#005EA2",
              borderTopWidth: 0,
              borderTopStyle: "solid",
              borderTopColor: "transparent",
              borderRightWidth: 0,
              borderRightStyle: "solid",
              borderRightColor: "transparent",
              borderBottomWidth: 0,
              borderBottomStyle: "solid",
              borderBottomColor: "transparent",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2a7.2 7.2 0 0 1-6-3.22c.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08a7.2 7.2 0 0 1-6 3.22z" fill="#71767A" />
            </svg>
            <span
              style={{
                fontFamily: "'Public Sans', sans-serif",
                fontSize: 16,
                lineHeight: "24px",
                color: "#1B1B1B",
                fontWeight: 400,
              }}
            >
              BoringCompany
            </span>
          </div>
          <p
            style={{
              fontFamily: "'Public Sans', sans-serif",
              fontSize: 16,
              lineHeight: "20px",
              color: "#1B1B1B",
              margin: "8px 0 0 0",
            }}
          >
            Your username cannot be changed. Contact support if you need assistance.
          </p>
        </div>

        {/* Email Address */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 4,
            padding: isMobile ? 16 : 24,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            <h2
              style={{
                fontFamily: "'Public Sans', sans-serif",
                color: "#1B1B1B",
                margin: 0,
              }}
            >
              Email Address
            </h2>
            {!isEditingEmail && (
              <button
                onClick={() => {
                  setEditEmail(email);
                  setIsEditingEmail(true);
                }}
                style={buttonLinkStyle}
              >
                Edit
              </button>
            )}
          </div>

          {!isEditingEmail ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" fill="#71767A" />
              </svg>
              <span
                style={{
                  fontFamily: "'Public Sans', sans-serif",
                  fontSize: 16,
                  lineHeight: "24px",
                  color: "#1B1B1B",
                }}
              >
                {email}
              </span>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={labelStyle} htmlFor="email-input">
                  New Email Address
                </label>
                <input
                  id="email-input"
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  style={inputStyle}
                  autoFocus
                />
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <button
                  onClick={handleEmailSave}
                  disabled={!editEmail || editEmail === email}
                  style={{
                    ...buttonPrimaryStyle,
                    opacity: !editEmail || editEmail === email ? 0.5 : 1,
                    cursor: !editEmail || editEmail === email ? "not-allowed" : "pointer",
                  }}
                >
                  Save
                </button>
                <button onClick={handleEmailCancel} style={buttonSecondaryStyle}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Password */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 4,
            padding: isMobile ? 16 : 24,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            <h2
              style={{
                fontFamily: "'Public Sans', sans-serif",
                color: "#1B1B1B",
                margin: 0,
              }}
            >
              Password
            </h2>
            {!isEditingPassword && (
              <button
                onClick={() => setIsEditingPassword(true)}
                style={buttonLinkStyle}
              >
                Change Password
              </button>
            )}
          </div>

          {!isEditingPassword ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" fill="#71767A" />
              </svg>
              <span
                style={{
                  fontFamily: "'Public Sans', sans-serif",
                  fontSize: 16,
                  lineHeight: "24px",
                  color: "#1B1B1B",
                  letterSpacing: 3,
                }}
              >
                ••••••••••••
              </span>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Current Password */}
              <div>
                <label style={labelStyle} htmlFor="current-password">
                  Current Password
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    id="current-password"
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    style={{ ...inputStyle, paddingRight: 44 }}
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    style={{
                      position: "absolute",
                      right: 8,
                      top: "50%",
                      transform: "translateY(-50%)",
                      backgroundColor: "transparent",
                      borderWidth: 0,
                      borderStyle: "none",
                      borderColor: "transparent",
                      cursor: "pointer",
                      padding: 4,
                      display: "flex",
                      alignItems: "center",
                    }}
                    aria-label={showCurrentPassword ? "Hide password" : "Show password"}
                  >
                    {showCurrentPassword ? (
                      <EyeOff size={20} color="#71767A" />
                    ) : (
                      <Eye size={20} color="#71767A" />
                    )}
                  </button>
                </div>
              </div>

              {/* Divider */}
              <div
                style={{
                  height: 1,
                  backgroundColor: "#DFE1E2",
                }}
              />

              {/* New Password */}
              <div>
                <label style={labelStyle} htmlFor="new-password">
                  New Password
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    id="new-password"
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    style={{ ...inputStyle, paddingRight: 44 }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    style={{
                      position: "absolute",
                      right: 8,
                      top: "50%",
                      transform: "translateY(-50%)",
                      backgroundColor: "transparent",
                      borderWidth: 0,
                      borderStyle: "none",
                      borderColor: "transparent",
                      cursor: "pointer",
                      padding: 4,
                      display: "flex",
                      alignItems: "center",
                    }}
                    aria-label={showNewPassword ? "Hide password" : "Show password"}
                  >
                    {showNewPassword ? (
                      <EyeOff size={20} color="#71767A" />
                    ) : (
                      <Eye size={20} color="#71767A" />
                    )}
                  </button>
                </div>
                {newPassword.length > 0 && newPassword.length < 8 && (
                  <p
                    style={{
                      fontFamily: "'Public Sans', sans-serif",
                      fontSize: 14,
                      lineHeight: "20px",
                      color: "#B50909",
                      margin: "4px 0 0 0",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <X size={14} color="#B50909" />
                    Password must be at least 8 characters
                  </p>
                )}
                {newPassword.length >= 8 && (
                  <p
                    style={{
                      fontFamily: "'Public Sans', sans-serif",
                      fontSize: 14,
                      lineHeight: "20px",
                      color: "#00A91C",
                      margin: "4px 0 0 0",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <Check size={14} color="#00A91C" />
                    Password length requirement met
                  </p>
                )}
              </div>

              {/* Confirm New Password */}
              <div>
                <label style={labelStyle} htmlFor="confirm-password">
                  Confirm New Password
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={{ ...inputStyle, paddingRight: 44 }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={{
                      position: "absolute",
                      right: 8,
                      top: "50%",
                      transform: "translateY(-50%)",
                      backgroundColor: "transparent",
                      borderWidth: 0,
                      borderStyle: "none",
                      borderColor: "transparent",
                      cursor: "pointer",
                      padding: 4,
                      display: "flex",
                      alignItems: "center",
                    }}
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} color="#71767A" />
                    ) : (
                      <Eye size={20} color="#71767A" />
                    )}
                  </button>
                </div>
                {confirmPassword.length > 0 && !passwordsMatch && (
                  <p
                    style={{
                      fontFamily: "'Public Sans', sans-serif",
                      fontSize: 14,
                      lineHeight: "20px",
                      color: "#B50909",
                      margin: "4px 0 0 0",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <X size={14} color="#B50909" />
                    Passwords do not match
                  </p>
                )}
                {passwordsMatch && (
                  <p
                    style={{
                      fontFamily: "'Public Sans', sans-serif",
                      fontSize: 14,
                      lineHeight: "20px",
                      color: "#00A91C",
                      margin: "4px 0 0 0",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <Check size={14} color="#00A91C" />
                    Passwords match
                  </p>
                )}
              </div>

              <div style={{ display: "flex", gap: 12 }}>
                <button
                  onClick={handlePasswordSave}
                  disabled={!passwordFormValid}
                  style={{
                    ...buttonPrimaryStyle,
                    opacity: !passwordFormValid ? 0.5 : 1,
                    cursor: !passwordFormValid ? "not-allowed" : "pointer",
                  }}
                >
                  Update Password
                </button>
                <button onClick={handlePasswordCancel} style={buttonSecondaryStyle}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageShell>
  );
}