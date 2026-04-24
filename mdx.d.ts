declare module "*.mdx" {
  import type { ReactNode } from "react";
  export default function MDXComponent(): ReactNode;
}
