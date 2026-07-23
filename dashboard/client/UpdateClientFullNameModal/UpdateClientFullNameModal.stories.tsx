import {
  withOpenModal,
  withModalManagerProvider,
} from "@/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedClientDetail } from "@/mocks/clients";
import { UpdateClientFullNameModal } from "./UpdateClientFullNameModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withUpdateClientFullNameProvider } from "../UpdateClientFullNameProvider/__stories__";

const meta = {
  title: "dashboard/clients/UpdateClientFullNameModal",
  component: UpdateClientFullNameModal,
  decorators: [
    withOpenModal,
    withUpdateClientFullNameProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],

  parameters: {
    modalId: "updateClientFullName",
  },
} satisfies Meta<typeof UpdateClientFullNameModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    clientId: mockedClientDetail.id,
    clientFullName: mockedClientDetail.fullName,
  },
} satisfies Story;
