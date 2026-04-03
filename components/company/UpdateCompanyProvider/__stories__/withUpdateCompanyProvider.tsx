import { type Decorator } from "@storybook/nextjs-vite";
import { MockedUpdateCompanyProvider } from "./MockedUpdateCompanyProvider";

export const withUpdateCompanyProvider: Decorator = (Story) => {
  return (
    <MockedUpdateCompanyProvider>
      <Story />
    </MockedUpdateCompanyProvider>
  );
};
