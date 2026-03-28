import {
  withOpenModal,
  withModalManagerProvider,
} from "@/components/common/ModalManagerContext/__stories__";

import { mockedProjectDetail } from "@/mocks/projects";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectDetailModal } from "../ProjectDetailModal";
import { ProjectDetail, ProjectDetailSkeleton } from "../ProjectDetail";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/projects/ProjectDetailModal",
  component: ProjectDetailModal,
  decorators: [withOpenModal, withModalManagerProvider, withThemedBackground],
  parameters: {
    modalId: "projectDetail",
  },
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
