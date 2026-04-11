import { type Decorator } from "@storybook/nextjs-vite";
import { MockedUpdateUserPublicLinkProvider } from "./MockedUpdateUserPublicLinkProvider";

export const withUpdateUserPublicLinkProvider: Decorator = (Story) => {
  return (
    <MockedUpdateUserPublicLinkProvider>
      <Story />
    </MockedUpdateUserPublicLinkProvider>
  );
};
