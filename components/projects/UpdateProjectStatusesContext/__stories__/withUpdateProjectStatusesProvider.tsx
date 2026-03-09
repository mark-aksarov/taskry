import { type Decorator } from "@storybook/react";
import { UpdateProjectStatusesProvider } from "../UpdateProjectStatusesContext";

export const withUpdateProjectStatusesProvider: Decorator = (Story) => {
  return (
    <UpdateProjectStatusesProvider
      updateProjectStatuses={() => ({ status: "success" })}
    >
      <Story />
    </UpdateProjectStatusesProvider>
  );
};
