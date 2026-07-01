import { createContext, useContext, useState, ReactNode } from "react";

interface AgencyContextType {
  selectedAgency: string;
  setSelectedAgency: (agency: string) => void;
}

const AgencyContext = createContext<AgencyContextType | undefined>(undefined);

export function AgencyProvider({ children }: { children: ReactNode }) {
  const [selectedAgency, setSelectedAgency] = useState("");

  return (
    <AgencyContext.Provider value={{ selectedAgency, setSelectedAgency }}>
      {children}
    </AgencyContext.Provider>
  );
}

export function useAgency() {
  const context = useContext(AgencyContext);
  if (!context) {
    throw new Error("useAgency must be used within AgencyProvider");
  }
  return context;
}
