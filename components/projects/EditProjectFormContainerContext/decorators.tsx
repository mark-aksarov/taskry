import React from "react";
import { type Decorator } from "@storybook/react";
import { EditProjectForm } from "../EditProjectForm/EditProjectForm";
import { EditProjectFormContainerProvider } from "./EditProjectFormContainerContext";
import { Default as ProjectFormBaseStory } from "../ProjectFormBase/ProjectFormBase.stories";

export const withEditProjectForm: Decorator = (Story) => {
  return (
    <EditProjectFormContainerProvider
      value={() => (
        <EditProjectForm {...ProjectFormBaseStory.args} projectId={1} />
      )}
    >
      <Story />
    </EditProjectFormContainerProvider>
  );
};
