import {
  withOpenModal,
  withModalManagerProvider,
} from "@/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ImportTasksModal } from "./ImportTasksModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withImportTasksProvider } from "../ImportTasksProvider/__stories__";
import { withSelectedItemsProvider } from "@/dashboard/common/SelectedItemsContext/__stories__";

const meta = {
  title: "dashboard/tasks/ImportTasksModal",
  component: ImportTasksModal,
  decorators: [
    withOpenModal,
    withImportTasksProvider,
    withSelectedItemsProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],

  parameters: {
    modalId: "importTasks",
  },
} satisfies Meta<typeof ImportTasksModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
