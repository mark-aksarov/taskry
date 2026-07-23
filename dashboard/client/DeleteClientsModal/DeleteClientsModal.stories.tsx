import {
  withOpenModal,
  withModalManagerProvider,
} from "@/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DeleteClientsModal } from "./DeleteClientsModal";
import { withToastRegion } from "@/.storybook/withToastRegion";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withDeleteClientsProvider } from "../DeleteClientsProvider/__stories__";
import { withSelectedItemsProvider } from "@/dashboard/common/SelectedItemsContext/__stories__";

const meta = {
  title: "dashboard/clients/DeleteClientsModal",
  component: DeleteClientsModal,
  decorators: [
    withOpenModal,
    withToastRegion,
    withDeleteClientsProvider,
    withSelectedItemsProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],

  parameters: {
    modalId: "deleteClients",
  },
} satisfies Meta<typeof DeleteClientsModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    isOpen: false,
    onOpenChange: () => {},
  },
} satisfies Story;
