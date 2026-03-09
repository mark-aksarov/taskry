import { type Decorator } from "@storybook/react";
import { CreateProjectProvider } from "../../CreateProjectContext";

export const withCreateProjectProvider: Decorator = (Story) => {
  return (
    <CreateProjectProvider createProject={() => ({ status: "success" })}>
      <Story />
    </CreateProjectProvider>
  );
};
