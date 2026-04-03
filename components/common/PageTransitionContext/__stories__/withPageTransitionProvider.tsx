import { type Decorator } from "@storybook/nextjs-vite";
import { PageTransitionProvider } from "../PageTransitionContext";

export const withPageTransitionProvider: Decorator = (Story) => {
  return (
    <PageTransitionProvider>
      <Story />
    </PageTransitionProvider>
  );
};
