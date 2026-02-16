import { type Decorator } from "@storybook/react";
import { EntityPaginationProvider } from "../EntityPaginationContext";

export const withEntityPaginationProvider: Decorator = (Story) => {
  return (
    <EntityPaginationProvider>
      <Story />
    </EntityPaginationProvider>
  );
};
