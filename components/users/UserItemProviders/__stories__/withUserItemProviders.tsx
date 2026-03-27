import { type Decorator } from "@storybook/react";
import { MockedUserItemProviders } from "./MockedUserItemProviders";

export const withUserItemProviders: Decorator = (Story) => {
  return (
    <MockedUserItemProviders>
      <Story />
    </MockedUserItemProviders>
  );
};
