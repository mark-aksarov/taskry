import "../app/globals.css";

import type { Preview, ReactRenderer } from "@storybook/nextjs-vite";
import { withThemeByDataAttribute } from "@storybook/addon-themes";
import { INITIAL_VIEWPORTS } from "storybook/viewport";
import { fn, mocked, sb } from "storybook/test";
import { useParams, usePathname, useRouter } from "next/navigation";

sb.mock(import("../lib/prisma"));
sb.mock(import("../lib/queries/attachments"));
sb.mock(import("../lib/queries/project"));
sb.mock(import("../lib/queries/task"));
sb.mock(import("../lib/queries/notification"));
sb.mock(import("../lib/queries/user"));
sb.mock(import("../lib/queries/customers"));
sb.mock(import("../lib/queries/companies"));
sb.mock(import("../lib/queries/storage"));
sb.mock(import("../lib/queries/comments"));
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
    (Story) => (
      <div className="bg-white dark:bg-gray-900">
        <Story />
      </div>
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
