import { type Decorator } from "@storybook/nextjs-vite";
import { UserFiltersProvider } from "../UserFiltersContext";

export const withUserFiltersProvider: Decorator = (Story) => {
  return (
    <UserFiltersProvider filters={{}}>
      <Story />
    </UserFiltersProvider>
  );
};
