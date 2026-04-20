import {
  withOpenModal,
  withModalManagerProvider,
} from "@/dashboard/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CreatePositionModal } from "./CreatePositionModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withCreatePositionProvider } from "../CreatePositionProvider/__stories__";

const meta = {
  title: "dashboard/positions/CreatePositionModal",
  component: CreatePositionModal,
  decorators: [
    withOpenModal,
    withCreatePositionProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],

  parameters: {
    modalId: "createPosition",
  },
} satisfies Meta<typeof CreatePositionModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
