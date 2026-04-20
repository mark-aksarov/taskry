import {
  withOpenModal,
  withModalManagerProvider,
} from "@/dashboard/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UpdatePositionModal } from "./UpdatePositionModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withUpdatePositionProvider } from "../UpdatePositionProvider/__stories__";

const meta = {
  title: "components/positions/UpdatePositionModal",
  component: UpdatePositionModal,
  decorators: [
    withOpenModal,
    withUpdatePositionProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],

  parameters: {
    modalId: "updatePosition",
  },
} satisfies Meta<typeof UpdatePositionModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    positionId: 1,
    positionName: "Position 1",
  },
} satisfies Story;
