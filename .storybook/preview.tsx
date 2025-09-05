import "../app/globals.css";

import type { Preview, ReactRenderer } from "@storybook/nextjs-vite";
import { withThemeByDataAttribute } from "@storybook/addon-themes";
import { Nunito_Sans } from "next/font/google";
import { INITIAL_VIEWPORTS } from "storybook/viewport";

const geistSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});

const preview: Preview = {
  decorators: [
    (Story) => (
      <main className={`${geistSans.className} antialiased`}>
        <Story />
      </main>
    ),

    withThemeByDataAttribute<ReactRenderer>({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "light",
      attributeName: "data-theme",
    }),
  ],

  parameters: {
    backgrounds: {
      options: {
        dark: { name: "Dark", value: "#000" },
        light: { name: "Light", value: "#fff" },
      },
    },

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    viewport: {
      //👇 Set available viewports for every story in the file
      options: INITIAL_VIEWPORTS,
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
};

export default preview;
