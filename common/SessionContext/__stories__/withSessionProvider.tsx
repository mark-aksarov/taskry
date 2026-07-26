import { type Decorator } from "@storybook/nextjs-vite";
import { MockedSessionProvider } from "./MockedSessionProvider";

export const withSessionProvider: Decorator = (Story) => {
  return (
    <MockedSessionProvider>
      <Story />
    </MockedSessionProvider>
  );
};
