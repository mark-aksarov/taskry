import {
  withOpenModal,
  withModalManagerProvider,
} from "@/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CreateProjectCategoryModal } from "../CreateProjectCategoryModal";
import { withCreateProjectCategoryProvider } from "../CreateProjectCategoryProvider/__stories__";

const meta = {
  title: "dashboard/project-categories/CreateProjectCategoryModal",
  component: CreateProjectCategoryModal,
  decorators: [
    withOpenModal,
    withCreateProjectCategoryProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],

  parameters: {
    modalId: "createProjectCategory",
  },
} satisfies Meta<typeof CreateProjectCategoryModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
