import { type Decorator } from "@storybook/react";
import { DeletePositionProvider } from "../DeletePositionContext";

export const withDeletePositionProvider: Decorator = (Story) => {
  return (
    <DeletePositionProvider deletePosition={() => ({ status: "success" })}>
      <Story />
    </DeletePositionProvider>
  );
};
