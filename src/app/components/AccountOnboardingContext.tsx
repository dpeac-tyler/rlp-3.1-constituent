import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface AccountOnboardingValue {
  /** Whether the first-visit callout + sidebar highlight is active */
  showOnboarding: boolean;
  /** Dismiss the callout and highlight for the rest of the session */
  dismiss: () => void;
}

const AccountOnboardingContext = createContext<AccountOnboardingValue>({
  showOnboarding: false,
  dismiss: () => {},
});

const STORAGE_KEY = "account-onboarding-dismissed";

export function AccountOnboardingProvider({ children }: { children: ReactNode }) {
  const [showOnboarding, setShowOnboarding] = useState(
    () => !sessionStorage.getItem(STORAGE_KEY)
  );

  const dismiss = useCallback(() => {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setShowOnboarding(false);
  }, []);

  return (
    <AccountOnboardingContext.Provider value={{ showOnboarding, dismiss }}>
      {children}
    </AccountOnboardingContext.Provider>
  );
}

export function useAccountOnboarding() {
  return useContext(AccountOnboardingContext);
}
