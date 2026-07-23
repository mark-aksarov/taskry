import {
  withOpenModal,
  withModalManagerProvider,
} from "@/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedClientDetail } from "@/mocks/clients";
import { UpdateClientEmailModal } from "./UpdateClientEmailModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withUpdateClientEmailProvider } from "../UpdateClientEmailProvider/__stories__";

const meta = {
  title: "dashboard/clients/UpdateClientEmailModal",
  component: UpdateClientEmailModal,
  decorators: [
    withOpenModal,
    withUpdateClientEmailProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],

  parameters: {
    modalId: "updateClientEmail",
  },
} satisfies Meta<typeof UpdateClientEmailModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    clientId: mockedClientDetail.id,
    clientEmail: mockedClientDetail.email,
  },
} satisfies Story;
