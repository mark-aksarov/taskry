import {
  withOpenModal,
  withModalManagerProvider,
} from "@/dashboard/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DeleteProjectsModal } from "./DeleteProjectsModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withDeleteProjectsProvider } from "../DeleteProjectsProvider/__stories__";
import { withSelectedProjectsProvider } from "../SelectedProjectsContext/__stories__";

const meta = {
  title: "dashboard/projects/DeleteProjectsModal",
  component: DeleteProjectsModal,
  decorators: [
    withOpenModal,
    withDeleteProjectsProvider,
    withSelectedProjectsProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],

  parameters: {
    modalId: "deleteProjects",
  },
} satisfies Meta<typeof DeleteProjectsModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
