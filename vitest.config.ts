import path from "node:path";
import { fileURLToPath } from "node:url";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";

const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: dirname,

  test: {
    globals: true,

    server: {
      deps: {
        inline: ["next-intl"],
      },
    },

    projects: [
      {
        extends: true,

        plugins: [
          storybookTest({
            configDir: path.join(dirname, ".storybook"),
          }),
        ],

        test: {
          name: "storybook",

          browser: {
            enabled: true,
            headless: true,
            provider: "playwright",
            instances: [{ browser: "chromium" }],
          },

          setupFiles: [".storybook/vitest.setup.ts"],
        },
      },

      {
        plugins: [tsconfigPaths()],

        test: {
          name: "integration",
          environment: "node",
          setupFiles: "./vitest.setup.integration.ts",
          include: ["lib/data/**/*.test.ts"],
        },
      },

      {
        plugins: [tsconfigPaths(), react()],

        test: {
          name: "ui",
          environment: "jsdom",
          setupFiles: "./vitest.setup.ui.ts",
          include: ["**/*.test.tsx"],
        },
      },
    ],
  },
});
