import {
  withOpenModal,
  withModalManagerProvider,
} from "@/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ImportCustomersModal } from "./ImportCustomersModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withImportCustomersProvider } from "../ImportCustomersProvider/__stories__";
import { withSelectedItemsProvider } from "@/dashboard/common/SelectedItemsContext/__stories__";

const meta = {
  title: "dashboard/projects/ImportCustomersModal",
  component: ImportCustomersModal,
  decorators: [
    withOpenModal,
    withImportCustomersProvider,
    withSelectedItemsProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],

  parameters: {
    modalId: "importCustomers",
  },
} satisfies Meta<typeof ImportCustomersModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
