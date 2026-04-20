import {
  withOpenModal,
  withModalManagerProvider,
} from "@/dashboard/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { UpdateProjectCategoryModal } from "./UpdateProjectCategoryModal";
import { withUpdateProjectCategoryProvider } from "../UpdateProjectCategoryProvider/__stories__";

const meta = {
  title: "components/project-categories/UpdateProjectCategoryModal",
  component: UpdateProjectCategoryModal,
  decorators: [
    withOpenModal,
    withUpdateProjectCategoryProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],

  parameters: {
    modalId: "updateProjectCategory",
  },
} satisfies Meta<typeof UpdateProjectCategoryModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    projectCategoryId: 1,
    projectCategoryName: "Project Category 1",
  },
} satisfies Story;
