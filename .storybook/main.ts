import { mergeConfig } from "vite";
import type { StorybookConfig } from "@storybook/nextjs-vite";

const config: StorybookConfig = {
  stories: [
    "../ui/**/*.stories.@(ts|tsx)",
    "../auth/**/*.stories.@(ts|tsx)",
    "../common/**/*.stories.@(ts|tsx)",
    "../dashboard/**/*.stories.@(ts|tsx)",
    "../site/**/*.stories.@(ts|tsx)",
    "../app/**/*.stories.@(ts|tsx)",
  ],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
    "@storybook/addon-themes",
  ],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {},
  },
  staticDirs: ["../public"],
  features: {
    experimentalRSC: true,
  },
  viteFinal: async (config) => {
    return mergeConfig(config, {
      logLevel: "silent",
    });
  },
};
export default config;
