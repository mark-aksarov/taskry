import { type Decorator } from "@storybook/react";
import { DeletePositionsProvider } from "../DeletePositionsContext";

export const withDeletePositionsProvider: Decorator = (Story) => {
  return (
    <DeletePositionsProvider deletePositions={() => ({ status: "success" })}>
      <Story />
    </DeletePositionsProvider>
  );
};
