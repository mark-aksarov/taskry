import { type Decorator } from "@storybook/nextjs-vite";
import { MockedUpdateUserFullNameProvider } from "./MockedUpdateUserFullNameProvider";

export const withUpdateUserFullNameProvider: Decorator = (Story) => {
  return (
    <MockedUpdateUserFullNameProvider>
      <Story />
    </MockedUpdateUserFullNameProvider>
  );
};
