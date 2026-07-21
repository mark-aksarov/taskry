import "../globals.css";

import type { Viewport } from "next";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { SWRProvider } from "./SWRProvider";
import { LucideProvider } from "lucide-react";
import { Nunito_Sans } from "next/font/google";
import { I18nProvider } from "@/ui/I18nProvider";
import { getTranslations } from "next-intl/server";
import { RouterProvider } from "@/ui/RouterProvider";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { ScrollRestoration } from "@/common/ScrollRestoration";
import { ThemeProvider } from "@/dashboard/layout/ThemeProvider";
import { ToastRegionWrapper } from "@/dashboard/layout/ToastRegionWrapper";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  interactiveWidget: "resizes-content",
};

type RootLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: "ru" | "en" }>;
};

export async function generateMetadata({ params }: RootLayoutProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    metadataBase: new URL("https://taskry.ru"),
    title: t("title"),
    description: t("description"),
    author: t("author"),
    keywords: t("keywords"),
  };
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${nunitoSans.className} bg-(--surface-secondary) antialiased`}
      >
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <SWRProvider>
            <NextIntlClientProvider>
              <I18nProvider locale={locale}>
                <RouterProvider>
                  <LucideProvider
                    size={16}
                    strokeWidth={1.5}
                    absoluteStrokeWidth
                  >
                    <ScrollRestoration />
                    <ToastRegionWrapper />
                    {children}
                  </LucideProvider>
                </RouterProvider>
              </I18nProvider>
            </NextIntlClientProvider>
          </SWRProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
