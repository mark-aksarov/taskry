import { type Decorator } from "@storybook/nextjs-vite";
import { MockedUpdateUserBioProvider } from "./MockedUpdateUserBioProvider";

export const withUpdateUserBioProvider: Decorator = (Story) => {
  return (
    <MockedUpdateUserBioProvider>
      <Story />
    </MockedUpdateUserBioProvider>
  );
};
