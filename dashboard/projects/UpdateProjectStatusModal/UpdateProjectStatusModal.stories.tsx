import {
  withOpenModal,
  withModalManagerProvider,
} from "@/dashboard/common/ModalManagerContext/__stories__";

import { mockedProjectDetail } from "@/mocks/projects";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UpdateProjectStatusModal } from "./UpdateProjectStatusModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withUpdateProjectStatusAltProvider } from "../UpdateProjectStatusAltProvider/__stories__";

const meta = {
  title: "components/projects/UpdateProjectStatusModal",
  component: UpdateProjectStatusModal,
  decorators: [
    withOpenModal,
    withUpdateProjectStatusAltProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],

  parameters: {
    modalId: "updateProjectStatus",
  },
} satisfies Meta<typeof UpdateProjectStatusModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    projectId: mockedProjectDetail.id,
    projectStatus: mockedProjectDetail.status,
  },
} satisfies Story;
