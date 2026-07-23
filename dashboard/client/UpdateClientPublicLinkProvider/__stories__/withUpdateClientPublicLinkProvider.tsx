import { type Decorator } from "@storybook/nextjs-vite";
import { MockedUpdateClientPublicLinkProvider } from "./MockedUpdateClientPublicLinkProvider";

export const withUpdateClientPublicLinkProvider: Decorator = (Story) => {
  return (
    <MockedUpdateClientPublicLinkProvider>
      <Story />
    </MockedUpdateClientPublicLinkProvider>
  );
};
