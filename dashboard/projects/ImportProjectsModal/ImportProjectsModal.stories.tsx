import {
  withOpenModal,
  withModalManagerProvider,
} from "@/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ImportProjectsModal } from "./ImportProjectsModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withImportProjectsProvider } from "../ImportProjectsProvider/__stories__";
import { withSelectedItemsProvider } from "@/dashboard/common/SelectedItemsContext/__stories__";

const meta = {
  title: "dashboard/projects/ImportProjectsModal",
  component: ImportProjectsModal,
  decorators: [
    withOpenModal,
    withImportProjectsProvider,
    withSelectedItemsProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],

  parameters: {
    modalId: "importProjects",
  },
} satisfies Meta<typeof ImportProjectsModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
