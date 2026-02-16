import { type Decorator } from "@storybook/react";
import { UpdateProjectStatusesProvider } from "../UpdateProjectStatusesContext";

export const withUpdateProjectStatusesProvider: Decorator = (Story) => {
  return (
    <UpdateProjectStatusesProvider
      updateStatus={() =>
        new Promise((res) => setTimeout(() => res({ status: "success" }), 500))
      }
    >
      <Story />
    </UpdateProjectStatusesProvider>
  );
};
