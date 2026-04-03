import { type Decorator } from "@storybook/nextjs-vite";
import { MockedCreateUserProvider } from "./MockedCreateUserProvider";

export const withCreateUserProvider: Decorator = (Story) => {
  return (
    <MockedCreateUserProvider>
      <Story />
    </MockedCreateUserProvider>
  );
};
