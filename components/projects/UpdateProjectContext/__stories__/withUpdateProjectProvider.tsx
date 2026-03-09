import { type Decorator } from "@storybook/react";
import { UpdateProjectProvider } from "../UpdateProjectContext";

export const withUpdateProjectProvider: Decorator = (Story) => {
  return (
    <UpdateProjectProvider updateProject={() => ({ status: "success" })}>
      <Story />
    </UpdateProjectProvider>
  );
};
