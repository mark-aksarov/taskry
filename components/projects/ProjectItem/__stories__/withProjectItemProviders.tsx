import { type Decorator } from "@storybook/react";
import { ProjectStatus } from "@/generated/prisma/enums";
import { ProjectItemProviders } from "../ProjectItemProviders";

export const withProjectItemProviders: Decorator = (Story) => {
  return (
    <ProjectItemProviders
      projectId={1}
      projectStatus={ProjectStatus.active}
      updateProject={() => ({ status: "success" })}
      deleteProject={() => ({ status: "success" })}
      updateProjectStatus={() => ({ status: "success" })}
    >
      <Story />
    </ProjectItemProviders>
  );
};
