import en from "@/messages/en";
import ru from "@/messages/ru";
import { I18nProvider } from "react-aria";
import { LucideProvider } from "lucide-react";
import { ToastRegion } from "@/ui/Toast/Toast";
import { NextIntlClientProvider } from "next-intl";
import { type Decorator } from "@storybook/nextjs-vite";

export const withRootLayoutProviders: Decorator = (Story, { globals }) => {
  return (
    <NextIntlClientProvider
      locale={globals.locale}
      messages={globals.locale === "en" ? en : ru}
      timeZone="UTC"
    >
      <I18nProvider locale={globals.locale}>
        <LucideProvider size={16} strokeWidth={1.5} absoluteStrokeWidth>
          <Story />
          <ToastRegion />
        </LucideProvider>
      </I18nProvider>
    </NextIntlClientProvider>
  );
};
