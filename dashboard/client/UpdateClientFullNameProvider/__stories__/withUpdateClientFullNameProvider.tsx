import { type Decorator } from "@storybook/nextjs-vite";
import { MockedUpdateClientFullNameProvider } from "./MockedUpdateClientFullNameProvider";

export const withUpdateClientFullNameProvider: Decorator = (Story) => {
  return (
    <MockedUpdateClientFullNameProvider>
      <Story />
    </MockedUpdateClientFullNameProvider>
  );
};
