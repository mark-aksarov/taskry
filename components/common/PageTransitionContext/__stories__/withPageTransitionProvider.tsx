import { type Decorator } from "@storybook/react";
import { PageTransitionProvider } from "../PageTransitionContext";

export const withPageTransitionProvider: Decorator = (Story) => {
  return (
    <PageTransitionProvider>
      <Story />
    </PageTransitionProvider>
  );
};
