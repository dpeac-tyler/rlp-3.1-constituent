import { createContext, useContext, useState, ReactNode } from "react";

export const agencies = [
  { value: "agency-1", label: "Department of Professional & Financial Regulation" },
  { value: "agency-2", label: "Bureau of Consumer Credit Protection" },
];

interface AgencyContextType {
  selectedAgency: string;
  setSelectedAgency: (agency: string) => void;
}

const AgencyContext = createContext<AgencyContextType | undefined>(undefined);

export function AgencyProvider({ children }: { children: ReactNode }) {
  const [selectedAgency, setSelectedAgency] = useState(agencies[0].value);

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
