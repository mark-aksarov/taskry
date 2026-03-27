import { type Decorator } from "@storybook/react";
import { UserItemProviders } from "../UserItemProviders";

export const withUserItemProviders: Decorator = (Story) => {
  return (
    <UserItemProviders deleteUser={() => ({ status: "success" })}>
      <Story />
    </UserItemProviders>
  );
};
