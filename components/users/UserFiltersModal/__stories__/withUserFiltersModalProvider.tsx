import { type Decorator } from "@storybook/react";
import { UserFiltersModalProvider } from "../UserFiltersModalContext";

export const withUserFiltersModalProvider: Decorator = (Story) => {
  return (
    <UserFiltersModalProvider>
      <Story />
    </UserFiltersModalProvider>
  );
};
