import React from "react";
import { type Decorator } from "@storybook/react";
import { EditProjectForm } from "../EditProjectForm/EditProjectForm";
import { Default as ProjectFormBaseStory } from "../ProjectFormBase/ProjectFormBase.stories";
import { EditProjectFormClientContainerContext } from "./EditProjectFormClientContainerContext";

export const withEditProjectForm: Decorator = (Story) => {
  return (
    <EditProjectFormClientContainerContext.Provider
      value={() => (
        <EditProjectForm {...ProjectFormBaseStory.args} projectId={1} />
      )}
    >
      <Story />
    </EditProjectFormClientContainerContext.Provider>
  );
};
