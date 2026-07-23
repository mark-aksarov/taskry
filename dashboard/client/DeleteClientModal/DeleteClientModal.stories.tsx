import {
  withOpenModal,
  withModalManagerProvider,
} from "@/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DeleteClientModal } from "./DeleteClientModal";
import { withToastRegion } from "@/.storybook/withToastRegion";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withDeleteClientProvider } from "../DeleteClientProvider/__stories__";
import { withSelectedItemsProvider } from "@/dashboard/common/SelectedItemsContext/__stories__";

const meta = {
  title: "dashboard/clients/DeleteClientModal",
  component: DeleteClientModal,
  decorators: [
    withOpenModal,
    withToastRegion,
    withDeleteClientProvider,
    withSelectedItemsProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],

  parameters: {
    modalId: "deleteClient",
  },
} satisfies Meta<typeof DeleteClientModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    clientId: 1,
    clientFullName: "Client 1",
  },
} satisfies Story;
