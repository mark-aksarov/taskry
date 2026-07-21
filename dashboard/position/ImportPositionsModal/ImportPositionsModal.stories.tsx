import {
  withOpenModal,
  withModalManagerProvider,
} from "@/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ImportPositionsModal } from "./ImportPositionsModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withImportPositionsProvider } from "../ImportPositionsProvider/__stories__";
import { withSelectedItemsProvider } from "@/dashboard/common/SelectedItemsContext/__stories__";

const meta = {
  title: "dashboard/projects/ImportPositionsModal",
  component: ImportPositionsModal,
  decorators: [
    withOpenModal,
    withImportPositionsProvider,
    withSelectedItemsProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],

  parameters: {
    modalId: "importPositions",
  },
} satisfies Meta<typeof ImportPositionsModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
