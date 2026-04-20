"use client";

import { I18nProvider as RACI18nProvider } from "react-aria";

export function I18nProvider({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) {
  return <RACI18nProvider locale={locale}>{children}</RACI18nProvider>;
}
