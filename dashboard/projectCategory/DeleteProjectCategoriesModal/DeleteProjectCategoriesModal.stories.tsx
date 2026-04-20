import {
  withOpenModal,
  withModalManagerProvider,
} from "@/dashboard/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withToastRegion } from "@/.storybook/withToastRegion";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { DeleteProjectCategoriesModal } from "./DeleteProjectCategoriesModal";
import { withSelectedItemsProvider } from "@/dashboard/common/SelectedItemsContext/__stories__";
import { withDeleteProjectCategoriesProvider } from "../DeleteProjectCategoriesProvider/__stories__";

const meta = {
  title: "components/project-categories/DeleteProjectCategoriesModal",
  component: DeleteProjectCategoriesModal,
  decorators: [
    withOpenModal,
    withDeleteProjectCategoriesProvider,
    withSelectedItemsProvider,
    withToastRegion,
    withModalManagerProvider,
    withThemedBackground,
  ],

  parameters: {
    modalId: "deleteProjectCategories",
  },
} satisfies Meta<typeof DeleteProjectCategoriesModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    isOpen: false,
    onOpenChange: () => {},
  },
} satisfies Story;
