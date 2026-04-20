import {
  withOpenModal,
  withModalManagerProvider,
} from "@/dashboard/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UpdateProjectTitleModal } from "./UpdateProjectTitleModal";
import { mockedProjectDetail as mockedProject } from "@/mocks/projects";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withUpdateProjectTitleProvider } from "../UpdateProjectTitleProvider/__stories__";

const meta = {
  title: "dashboard/projects/UpdateProjectTitleModal",
  component: UpdateProjectTitleModal,
  decorators: [
    withOpenModal,
    withUpdateProjectTitleProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],
  parameters: {
    modalId: "updateProjectTitle",
  },
} satisfies Meta<typeof UpdateProjectTitleModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    projectId: mockedProject.id,
    title: mockedProject.title,
  },
} satisfies Story;
