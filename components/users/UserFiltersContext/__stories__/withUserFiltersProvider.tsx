import { type Decorator } from "@storybook/react";
import { UserFiltersProvider } from "../UserFiltersContext";

export const withUserFiltersProvider: Decorator = (Story) => {
  return (
    <UserFiltersProvider filters={{}}>
      <Story />
    </UserFiltersProvider>
  );
};
