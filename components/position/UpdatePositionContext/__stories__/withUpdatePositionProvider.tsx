import { type Decorator } from "@storybook/react";
import { UpdatePositionProvider } from "../UpdatePositionContext";

export const withUpdatePositionProvider: Decorator = (Story) => {
  return (
    <UpdatePositionProvider updatePosition={() => ({ status: "success" })}>
      <Story />
    </UpdatePositionProvider>
  );
};
