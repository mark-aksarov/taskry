import React from "react";
import { ProjectDetail } from "../ProjectDetail";
import { type Decorator } from "@storybook/react";
import { ProjectDetailSkeleton } from "../ProjectDetail";
import { Default as ProjectDetailStory } from "../ProjectDetail/ProjectDetail.stories";
import { ProjectDetailClientContainerContext } from "./ProjectDetailClientContainerContext";

export const withProjectDetail: Decorator = (Story) => {
  return (
    <ProjectDetailClientContainerContext.Provider
      value={() => <ProjectDetail {...ProjectDetailStory.args} />}
    >
      <Story />
    </ProjectDetailClientContainerContext.Provider>
  );
};

export const withProjectDetailSkeleton: Decorator = (Story) => {
  return (
    <ProjectDetailClientContainerContext.Provider
      value={() => <ProjectDetailSkeleton />}
    >
      <Story />
    </ProjectDetailClientContainerContext.Provider>
  );
};
