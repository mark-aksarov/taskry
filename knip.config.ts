import type { KnipConfig } from "knip";

const config: KnipConfig = {
  entry: ["global.ts", "lib/auth-client.ts"],
  ignore: ["markdown/**/*.mdx", "site/docs/**/*.tsx"],
};

export default config;
