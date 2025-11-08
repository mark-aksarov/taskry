import "../app/globals.css";

import type { Preview } from "@storybook/nextjs-vite";
import { withThemeByDataAttribute } from "@storybook/addon-themes";
import { MINIMAL_VIEWPORTS } from "storybook/viewport";
import { mocked, sb } from "storybook/test";
import { useParams, usePathname, useRouter } from "next/navigation";

sb.mock(import("../lib/prisma"));
sb.mock(import("next/navigation"));

const preview: Preview = {
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/");
    mocked(useParams).mockReturnValue({});
    mocked(useRouter).mockReturnValue({
      push: () => {},
      back: () => {},
      forward: () => {},
      refresh: () => {},
      replace: () => {},
      prefetch: () => {},
    });
  },

  decorators: [
    withThemeByDataAttribute({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "light",
      attributeName: "data-theme",
    }),
  ],

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    backgrounds: { disable: true },

    initialGlobals: {
      backgrounds: {
        value: "light/dark",
      },
    },

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
};

export default preview;
