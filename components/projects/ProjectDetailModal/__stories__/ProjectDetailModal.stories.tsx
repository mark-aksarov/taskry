import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { DialogTrigger } from "react-aria-components";
import { mockedProjectDetail } from "@/mocks/projects";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectDetailModal } from "../ProjectDetailModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProjectDetail, ProjectDetailSkeleton } from "../../ProjectDetail";

const meta = {
  title: "components/projects/ProjectDetailModal",
  component: ProjectDetailModal,
  decorators: [
    (Story) => {
      const [isOpen, setIsOpen] = useState(true);

      return (
        <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
          <Button label="Project detail" />
          <Story />
        </DialogTrigger>
      );
    },
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
