import { type Decorator } from "@storybook/nextjs-vite";
import { MockedUpdateClientPhoneNumberProvider } from "./MockedUpdateClientPhoneNumberProvider";

export const withUpdateClientPhoneNumberProvider: Decorator = (Story) => {
  return (
    <MockedUpdateClientPhoneNumberProvider>
      <Story />
    </MockedUpdateClientPhoneNumberProvider>
  );
};
