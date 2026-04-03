import { type Decorator } from "@storybook/nextjs-vite";
import { ViewModeProvider } from "../ViewModeContext";

export const withViewModeProvider: Decorator = (Story) => {
  return (
    <ViewModeProvider initialValue="list">
      <Story />
    </ViewModeProvider>
  );
};
