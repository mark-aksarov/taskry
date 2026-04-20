import { type Decorator } from "@storybook/nextjs-vite";
import { MockedDeleteCompanyProvider } from "./MockedDeleteCompanyProvider";

export const withDeleteCompanyProvider: Decorator = (Story) => {
  return (
    <MockedDeleteCompanyProvider>
      <Story />
    </MockedDeleteCompanyProvider>
  );
};
