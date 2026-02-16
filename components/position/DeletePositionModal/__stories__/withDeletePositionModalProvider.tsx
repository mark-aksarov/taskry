import { type Decorator } from "@storybook/react";
import { DeletePositionModalProvider } from "../DeletePositionModalContext";

export const withDeletePositionModalProvider: Decorator = (Story) => {
  return (
    <DeletePositionModalProvider
      deletePositions={() => ({ status: "success" })}
    >
      <Story />
    </DeletePositionModalProvider>
  );
};
