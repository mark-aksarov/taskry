import { type Decorator } from "@storybook/react";
import { ViewModeProvider } from "../ViewModeContext";

export const withViewModeProvider: Decorator = (Story) => {
  return (
    <ViewModeProvider initialValue="list">
      <Story />
    </ViewModeProvider>
  );
};
