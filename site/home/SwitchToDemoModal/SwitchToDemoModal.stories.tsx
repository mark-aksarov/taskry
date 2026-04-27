import {
  withOpenModal,
  withModalManagerProvider,
} from "@/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SwitchToDemoModal } from "../SwitchToDemoModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "site/home/SwitchToDemoModal",
  component: SwitchToDemoModal,
  decorators: [withOpenModal, withModalManagerProvider, withThemedBackground],
  parameters: {
    modalId: "switch-to-demo-modal",
  },
} satisfies Meta<typeof SwitchToDemoModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    signOut: async () => ({ status: "success" }),
  },
} satisfies Story;
