import { createContext, useContext, useState, type ReactNode } from "react";

/* ── Branch type ───────────────────────────────────────── */

export interface BranchData {
  id: string;
  branchName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  contactTitle: string;
  contactFirstName: string;
  contactLastName: string;
}

/* ── Initial mock data ─────────────────────────────────── */

const INITIAL_BRANCHES: BranchData[] = [
  {
    id: "b1",
    branchName: "Branch 001 - Downtown",
    address1: "100 Main Street",
    address2: "Suite 200",
    city: "Austin",
    state: "TX",
    zipCode: "78701",
    phone: "(512) 555-0101",
    email: "downtown@boringcompany.com",
    contactTitle: "Branch Manager",
    contactFirstName: "Jane",
    contactLastName: "Doe",
  },
  {
    id: "b2",
    branchName: "Branch 002 - Westside",
    address1: "4500 West Blvd",
    address2: "",
    city: "Austin",
    state: "TX",
    zipCode: "78745",
    phone: "(512) 555-0202",
    email: "westside@boringcompany.com",
    contactTitle: "Operations Lead",
    contactFirstName: "Mark",
    contactLastName: "Rivera",
  },
  {
    id: "b3",
    branchName: "Branch 003 - Northpark",
    address1: "780 Northpark Dr",
    address2: "Bldg C",
    city: "Round Rock",
    state: "TX",
    zipCode: "78665",
    phone: "(512) 555-0303",
    email: "northpark@boringcompany.com",
    contactTitle: "Regional Director",
    contactFirstName: "Sara",
    contactLastName: "Chen",
  },
  {
    id: "b4",
    branchName: "Branch 004 - Lakeline",
    address1: "1220 Lakeline Mall Dr",
    address2: "Unit 14",
    city: "Cedar Park",
    state: "TX",
    zipCode: "78613",
    phone: "(512) 555-0404",
    email: "lakeline@boringcompany.com",
    contactTitle: "Branch Supervisor",
    contactFirstName: "Tom",
    contactLastName: "Nguyen",
  },
  {
    id: "b5",
    branchName: "Branch 005 - South Congress",
    address1: "3300 S Congress Ave",
    address2: "",
    city: "Austin",
    state: "TX",
    zipCode: "78704",
    phone: "(512) 555-0505",
    email: "southcongress@boringcompany.com",
    contactTitle: "Assistant Manager",
    contactFirstName: "Lisa",
    contactLastName: "Patel",
  },
];

/* ── Context ───────────────────────────────────────────── */

interface BranchContextValue {
  branches: BranchData[];
  addBranch: (data: BranchData) => void;
  updateBranch: (data: BranchData) => void;
  deleteBranch: (id: string) => void;
  getBranch: (id: string) => BranchData | undefined;
}

const BranchContext = createContext<BranchContextValue | null>(null);

export function BranchProvider({ children }: { children: ReactNode }) {
  const [branches, setBranches] = useState<BranchData[]>(INITIAL_BRANCHES);

  const addBranch = (data: BranchData) =>
    setBranches((prev) => [...prev, data]);

  const updateBranch = (data: BranchData) =>
    setBranches((prev) => prev.map((b) => (b.id === data.id ? data : b)));

  const deleteBranch = (id: string) =>
    setBranches((prev) => prev.filter((b) => b.id !== id));

  const getBranch = (id: string) => branches.find((b) => b.id === id);

  return (
    <BranchContext.Provider
      value={{ branches, addBranch, updateBranch, deleteBranch, getBranch }}
    >
      {children}
    </BranchContext.Provider>
  );
}

export function useBranches() {
  const ctx = useContext(BranchContext);
  if (!ctx) throw new Error("useBranches must be used within BranchProvider");
  return ctx;
}
