import { type Decorator } from "@storybook/react";
import { UpdateProjectStatusProvider } from "..";

export const withUpdateProjectStatusProvider: Decorator = (Story) => {
  return (
    <UpdateProjectStatusProvider
      updateStatus={() =>
        new Promise((res) => setTimeout(() => res({ status: "success" }), 500))
      }
    >
      <Story />
    </UpdateProjectStatusProvider>
  );
};
