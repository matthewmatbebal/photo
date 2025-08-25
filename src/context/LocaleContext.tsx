//src/context/LocaleContext.tsx

"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { Locale, DEFAULT_LOCALE } from "@/lib/locale";

interface LocaleContextType {
  locale: Locale;
}

const LocaleContext = createContext<LocaleContextType>({
  locale: DEFAULT_LOCALE,
});

interface LocaleProviderProps {
  locale: Locale;
  children: ReactNode;
}

export function LocaleProvider({ locale, children }: LocaleProviderProps) {
  return (
    <LocaleContext.Provider value={{ locale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
