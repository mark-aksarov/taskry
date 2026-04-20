import {
  withOpenModal,
  withModalManagerProvider,
} from "@/dashboard/common/ModalManagerContext/__stories__";

import { mockedProjectDetail } from "@/mocks/projects";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UpdateProjectDeadlineModal } from "./UpdateProjectDeadlineModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withUpdateProjectDeadlineProvider } from "../UpdateProjectDeadlineProvider/__stories__";

const meta = {
  title: "components/projects/UpdateProjectDeadlineModal",
  component: UpdateProjectDeadlineModal,
  decorators: [
    withOpenModal,
    withUpdateProjectDeadlineProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],

  parameters: {
    modalId: "updateProjectDeadline",
  },
} satisfies Meta<typeof UpdateProjectDeadlineModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    projectId: mockedProjectDetail.id,
    projectDeadline: mockedProjectDetail.deadline,
  },
} satisfies Story;
