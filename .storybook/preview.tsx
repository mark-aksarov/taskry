import "../app/globals.css";

import en from "../messages/en";
import ru from "../messages/ru";
import { I18nProvider } from "react-aria";
import { mocked } from "storybook/internal/test";
import { NextIntlClientProvider } from "next-intl";
import type { Preview } from "@storybook/nextjs-vite";
import { MINIMAL_VIEWPORTS } from "storybook/viewport";
import { useRouter, useSearchParams } from "next/navigation";
import { withThemeByDataAttribute } from "@storybook/addon-themes";

export const globalTypes = {
  locale: {
    name: "Locale",
    description: "Internationalization locale",
    defaultValue: "en",
    toolbar: {
      icon: "globe",
      items: [
        { value: "en", right: "en", title: "English" },
        { value: "ru", right: "ru", title: "Русский" },
      ],
    },
  },
};

const preview: Preview = {
  decorators: [
    (Story, { globals }) => {
      return (
        <NextIntlClientProvider
          locale={globals.locale}
          messages={globals.locale === "en" ? en : ru}
          timeZone="UTC"
        >
          <I18nProvider locale={globals.locale}>
            <Story />
          </I18nProvider>
        </NextIntlClientProvider>
      );
    },
    withThemeByDataAttribute({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "light",
      attributeName: "data-theme",
    }),
  ],

  globalTypes,

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    options: {
      storySort: {
        order: ["UI", "components", "pages"],
      },
    },

    backgrounds: { disable: true },

    viewport: {
      //👇 Set available viewports for every story in the file
      options: MINIMAL_VIEWPORTS,
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },

  beforeEach: () => {
    mocked(useSearchParams).mockReturnValue({
      get: () => "",
      getAll: () => [],
    } as any);

    mocked(useRouter).mockReturnValue({
      push: () => {},
      refresh: () => {},
      replace: () => {},
    } as any);
  },
};

export default preview;
