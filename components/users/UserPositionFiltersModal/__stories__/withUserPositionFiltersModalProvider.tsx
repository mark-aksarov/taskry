import { type Decorator } from "@storybook/react";
import { UserPositionFiltersModalProvider } from "../UserPositionFiltersModalContext";

export const withUserPositionFiltersModalProvider: Decorator = (Story) => {
  return (
    <UserPositionFiltersModalProvider>
      <Story />
    </UserPositionFiltersModalProvider>
  );
};
