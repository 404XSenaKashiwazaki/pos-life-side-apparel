"use client";

import { createContext, useContext } from "react";

interface SiteContextType {
  name?: string | null;
  filename?: string | null;
  fileProofUrl?: string | null;
  [key: string]: any;
}

const SiteContext = createContext<SiteContextType | null>(null);

export function useSite() {
  return useContext(SiteContext);
}

export function SiteProvider({
  children,
  site,
}: {
  children: React.ReactNode;
  site: SiteContextType;
}) {
  return <SiteContext.Provider value={site}>{children}</SiteContext.Provider>;
}
