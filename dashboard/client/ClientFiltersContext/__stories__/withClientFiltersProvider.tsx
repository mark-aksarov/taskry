import { type Decorator } from "@storybook/nextjs-vite";
import { ClientFiltersProvider } from "../ClientFiltersContext";

export const withClientFiltersProvider: Decorator = (Story) => {
  return (
    <ClientFiltersProvider filters={{}}>
      <Story />
    </ClientFiltersProvider>
  );
};
