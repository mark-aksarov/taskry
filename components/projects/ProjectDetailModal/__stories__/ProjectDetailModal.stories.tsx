import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { mockedProjectDetail } from "@/mocks/projects";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectDetailModal } from "../ProjectDetailModal";
import { withProjectDetailModal } from "./withProjectDetailModal";
import { useProjectDetailModal } from "../ProjectDetailModalContext";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProjectDetail, ProjectDetailSkeleton } from "../../ProjectDetail";

const meta = {
  title: "components/projects/ProjectDetailModal",
  component: ProjectDetailModal,
  decorators: [
    (Story) => {
      const { onOpenChange } = useProjectDetailModal();

      useEffect(() => onOpenChange(true), [onOpenChange]);

      return (
        <>
          <Button label="Open modal" onClick={() => onOpenChange(true)} />
          <Story />
        </>
      );
    },
    withProjectDetailModal,
    withThemedBackground,
  ],
} satisfies Meta<typeof ProjectDetailModal>;

export default meta;
type Story = StoryObj<typeof meta>;

const project = mockedProjectDetail;

export const Default = {
  args: {
    projectId: project.id,
    projectDetailContainer: <ProjectDetail {...project} />,
  },
} satisfies Story;

export const WithSkeleton = {
  args: {
    projectId: project.id,
    projectDetailContainer: <ProjectDetailSkeleton />,
  },
} satisfies Story;

export const WithoutOptionalProjectData = {
  args: {
    projectId: project.id,
    projectDetailContainer: (
      <ProjectDetail
        id={project.id}
        title={project.title}
        status={project.status}
        deadline={project.deadline}
      />
    ),
  },
} satisfies Story;
