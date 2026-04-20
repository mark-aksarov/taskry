import {
  withOpenModal,
  withModalManagerProvider,
} from "@/dashboard/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedProjectDetail as mockedProject } from "@/mocks/projects";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { UpdateProjectDescriptionModal } from "./UpdateProjectDescriptionModal";
import { withUpdateProjectDescriptionProvider } from "../UpdateProjectDescriptionProvider/__stories__";

const meta = {
  title: "components/projects/UpdateProjectDescriptionModal",
  component: UpdateProjectDescriptionModal,
  decorators: [
    withOpenModal,
    withUpdateProjectDescriptionProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],
  parameters: {
    modalId: "updateProjectDescription",
  },
} satisfies Meta<typeof UpdateProjectDescriptionModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    projectId: mockedProject.id,
    description: mockedProject.description,
  },
} satisfies Story;
