import {
  withOpenModal,
  withModalManagerProvider,
} from "@/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ImportProjectCategoriesModal } from "../ImportProjectCategoriesModal";
import { withSelectedItemsProvider } from "@/dashboard/common/SelectedItemsContext/__stories__";
import { withImportProjectCategoriesProvider } from "../ImportProjectCategoriesProvider/__stories__";

const meta = {
  title: "dashboard/project-categories/ImportProjectCategoriesModal",
  component: ImportProjectCategoriesModal,
  decorators: [
    withOpenModal,
    withImportProjectCategoriesProvider,
    withSelectedItemsProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],

  parameters: {
    modalId: "deleteProjectCategory",
  },
} satisfies Meta<typeof ImportProjectCategoriesModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    projectCategoryId: 1,
    projectCategoryName: "Fake project category",
  },
} satisfies Story;
