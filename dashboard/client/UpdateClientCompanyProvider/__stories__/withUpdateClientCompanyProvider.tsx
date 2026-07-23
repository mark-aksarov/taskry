import { type Decorator } from "@storybook/nextjs-vite";
import { MockedUpdateClientCompanyProvider } from "./MockedUpdateClientCompanyProvider";

export const withUpdateClientCompanyProvider: Decorator = (Story) => {
  return (
    <MockedUpdateClientCompanyProvider>
      <Story />
    </MockedUpdateClientCompanyProvider>
  );
};
