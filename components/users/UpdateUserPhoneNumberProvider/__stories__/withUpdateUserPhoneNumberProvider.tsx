import { type Decorator } from "@storybook/nextjs-vite";
import { MockedUpdateUserPhoneNumberProvider } from "./MockedUpdateUserPhoneNumberProvider";

export const withUpdateUserPhoneNumberProvider: Decorator = (Story) => {
  return (
    <MockedUpdateUserPhoneNumberProvider>
      <Story />
    </MockedUpdateUserPhoneNumberProvider>
  );
};
