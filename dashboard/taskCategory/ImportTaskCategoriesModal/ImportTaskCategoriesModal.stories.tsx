import {
  withOpenModal,
  withModalManagerProvider,
} from "@/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ImportTaskCategoriesModal } from "./ImportTaskCategoriesModal";
import { withSelectedItemsProvider } from "@/dashboard/common/SelectedItemsContext/__stories__";
import { withImportTaskCategoriesProvider } from "../ImportTaskCategoriesProvider/__stories__";

const meta = {
  title: "dashboard/project-categories/ImportTaskCategoriesModal",
  component: ImportTaskCategoriesModal,
  decorators: [
    withOpenModal,
    withImportTaskCategoriesProvider,
    withSelectedItemsProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],

  parameters: {
    modalId: "importTaskCategories",
  },
} satisfies Meta<typeof ImportTaskCategoriesModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
