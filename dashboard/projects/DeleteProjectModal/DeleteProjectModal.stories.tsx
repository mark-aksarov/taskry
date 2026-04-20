import {
  withOpenModal,
  withModalManagerProvider,
} from "@/dashboard/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DeleteProjectModal } from "./DeleteProjectModal";
import { withToastRegion } from "@/.storybook/withToastRegion";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withDeleteProjectProvider } from "../DeleteProjectProvider/__stories__";
import { withSelectedProjectsProvider } from "../SelectedProjectsContext/__stories__";

const meta = {
  title: "components/projects/DeleteProjectModal",
  component: DeleteProjectModal,
  decorators: [
    withOpenModal,
    withToastRegion,
    withDeleteProjectProvider,
    withSelectedProjectsProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],

  parameters: {
    modalId: "deleteProject",
  },
} satisfies Meta<typeof DeleteProjectModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    projectId: 1,
    projectTitle: "Project 1",
  },
} satisfies Story;
