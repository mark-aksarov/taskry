import { type Decorator } from "@storybook/nextjs-vite";
import { MockedCreateCompanyProvider } from "./MockedCreateCompanyProvider";

export const withCreateCompanyProvider: Decorator = (Story) => {
  return (
    <MockedCreateCompanyProvider>
      <Story />
    </MockedCreateCompanyProvider>
  );
};
