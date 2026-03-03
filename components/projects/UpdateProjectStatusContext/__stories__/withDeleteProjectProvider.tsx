import { type Decorator } from "@storybook/react";
import { UpdateProjectStatusProvider } from "../UpdateProjectStatusContext";

export const withDeleteProjectProvider: Decorator = (Story) => {
  return (
    <UpdateProjectStatusProvider
      updateProjectStatus={() => ({ status: "success" })}
    >
      <Story />
    </UpdateProjectStatusProvider>
  );
};
