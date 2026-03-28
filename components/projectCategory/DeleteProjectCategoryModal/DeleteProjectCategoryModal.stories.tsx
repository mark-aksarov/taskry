import {
  withOpenModal,
  withModalManagerProvider,
} from "@/components/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { DeleteProjectCategoryModal } from "../DeleteProjectCategoryModal";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";
import { withDeleteProjectCategoryProvider } from "../DeleteProjectCategoryProvider/__stories__";

const meta = {
  title: "components/project-categories/DeleteProjectCategoryModal",
  component: DeleteProjectCategoryModal,
  decorators: [
    withOpenModal,
    withDeleteProjectCategoryProvider,
    withSelectedItemsProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],

  parameters: {
    modalId: "deleteProjectCategory",
  },
} satisfies Meta<typeof DeleteProjectCategoryModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    projectCategoryId: 1,
    projectCategoryName: "Fake project category",
  },
} satisfies Story;
