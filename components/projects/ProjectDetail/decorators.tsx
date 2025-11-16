import React from "react";
import { ProjectDetail } from "./ProjectDetail";
import { type Decorator } from "@storybook/react";
import { Default as ProjectDetailStory } from "./ProjectDetail.stories";
import { ProjectDetailContainerProvider } from "./ProjectDetailContainerContext";
import { ProjectDetailSkeleton } from "./ProjectDetailSkeleton";

export const withProjectDetail: Decorator = (Story) => {
  return (
    <ProjectDetailContainerProvider
      ProjectDetailContainer={() => (
        <ProjectDetail {...ProjectDetailStory.args} />
      )}
    >
      <Story />
    </ProjectDetailContainerProvider>
  );
};

export const withProjectDetailSkeleton: Decorator = (Story) => {
  return (
    <ProjectDetailContainerProvider
      ProjectDetailContainer={() => <ProjectDetailSkeleton />}
    >
      <Story />
    </ProjectDetailContainerProvider>
  );
};
