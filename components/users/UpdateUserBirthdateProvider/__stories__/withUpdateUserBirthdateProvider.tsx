import { type Decorator } from "@storybook/nextjs-vite";
import { MockedUpdateUserBirthdateProvider } from "./MockedUpdateUserBirthdateProvider";

export const withUpdateUserBirthdateProvider: Decorator = (Story) => {
  return (
    <MockedUpdateUserBirthdateProvider>
      <Story />
    </MockedUpdateUserBirthdateProvider>
  );
};
