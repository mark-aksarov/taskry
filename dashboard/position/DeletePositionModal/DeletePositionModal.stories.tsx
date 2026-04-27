import {
  withOpenModal,
  withModalManagerProvider,
} from "@/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DeletePositionModal } from "./DeletePositionModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withDeletePositionProvider } from "../DeletePositionProvider/__stories__";
import { withSelectedItemsProvider } from "@/dashboard/common/SelectedItemsContext/__stories__";

const meta = {
  title: "dashboard/positions/DeletePositionModal",
  component: DeletePositionModal,
  decorators: [
    withOpenModal,
    withDeletePositionProvider,
    withSelectedItemsProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],

  parameters: {
    modalId: "deletePosition",
  },
} satisfies Meta<typeof DeletePositionModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    positionId: 1,
    positionName: "Fake position",
  },
} satisfies Story;
