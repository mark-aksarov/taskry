import { type Decorator } from "@storybook/react";
import { UserItemProviders } from "../UserItemProviders";

export const withUserItemProviders: Decorator = (Story) => {
  return (
    <UserItemProviders
      updateUser={() => ({ status: "success" })}
      deleteUser={() => ({ status: "success" })}
    >
      <Story />
    </UserItemProviders>
  );
};
