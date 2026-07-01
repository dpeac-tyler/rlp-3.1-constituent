import { createContext, useContext, useState, type ReactNode } from "react";

interface MailingAddress {
  line1: string;
  city: string;
  state: string;
  zip: string;
}

interface ProfileContextValue {
  businessName: string;
  setBusinessName: (name: string) => void;
  mailingAddress: MailingAddress;
  setMailingAddress: (addr: MailingAddress) => void;
}

const ProfileContext = createContext<ProfileContextValue | null>(null);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [businessName, setBusinessName] = useState("Boring Company 155");
  const [mailingAddress, setMailingAddress] = useState<MailingAddress>({
    line1: "1 Rocket Road",
    city: "Hawthorne",
    state: "California",
    zip: "90250",
  });

  return (
    <ProfileContext.Provider
      value={{ businessName, setBusinessName, mailingAddress, setMailingAddress }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfile must be used within ProfileProvider");
  return ctx;
}
