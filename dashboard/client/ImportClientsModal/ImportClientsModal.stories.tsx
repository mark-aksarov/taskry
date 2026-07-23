import {
  withOpenModal,
  withModalManagerProvider,
} from "@/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ImportClientsModal } from "./ImportClientsModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withImportClientsProvider } from "../ImportClientsProvider/__stories__";
import { withSelectedItemsProvider } from "@/dashboard/common/SelectedItemsContext/__stories__";

const meta = {
  title: "dashboard/clients/ImportClientsModal",
  component: ImportClientsModal,
  decorators: [
    withOpenModal,
    withImportClientsProvider,
    withSelectedItemsProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],

  parameters: {
    modalId: "importClients",
  },
} satisfies Meta<typeof ImportClientsModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
