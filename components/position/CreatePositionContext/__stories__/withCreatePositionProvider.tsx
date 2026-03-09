import { type Decorator } from "@storybook/react";
import { CreatePositionProvider } from "../../CreatePositionContext";

export const withCreatePositionProvider: Decorator = (Story) => {
  return (
    <CreatePositionProvider createPosition={() => ({ status: "success" })}>
      <Story />
    </CreatePositionProvider>
  );
};
