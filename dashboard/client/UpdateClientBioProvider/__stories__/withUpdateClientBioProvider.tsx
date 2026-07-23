import { type Decorator } from "@storybook/nextjs-vite";
import { MockedUpdateClientBioProvider } from "./MockedUpdateClientBioProvider";

export const withUpdateClientBioProvider: Decorator = (Story) => {
  return (
    <MockedUpdateClientBioProvider>
      <Story />
    </MockedUpdateClientBioProvider>
  );
};
