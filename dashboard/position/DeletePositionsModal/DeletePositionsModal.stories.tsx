import {
  withOpenModal,
  withModalManagerProvider,
} from "@/dashboard/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DeletePositionsModal } from "./DeletePositionsModal";
import { withToastRegion } from "@/.storybook/withToastRegion";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withDeletePositionsProvider } from "../DeletePositionsProvider/__stories__";
import { withSelectedItemsProvider } from "@/dashboard/common/SelectedItemsContext/__stories__";

const meta = {
  title: "dashboard/positions/DeletePositionsModal",
  component: DeletePositionsModal,
  decorators: [
    withOpenModal,
    withDeletePositionsProvider,
    withSelectedItemsProvider,
    withToastRegion,
    withModalManagerProvider,
    withThemedBackground,
  ],

  parameters: {
    modalId: "deletePositions",
  },
} satisfies Meta<typeof DeletePositionsModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    isOpen: false,
    onOpenChange: () => {},
  },
} satisfies Story;
