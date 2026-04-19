import { type Decorator } from "@storybook/nextjs-vite";
import { ViewModeProvider } from "../ViewModeContext";

export const withViewModeProvider: Decorator = (Story, context) => {
  const viewMode = context.parameters?.viewMode || "list";

  return (
    <ViewModeProvider initialValue={viewMode}>
      <Story />
    </ViewModeProvider>
  );
};
