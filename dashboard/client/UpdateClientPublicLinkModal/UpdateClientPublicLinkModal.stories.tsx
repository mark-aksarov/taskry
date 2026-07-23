import {
  withOpenModal,
  withModalManagerProvider,
} from "@/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedClientDetail } from "@/mocks/clients";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { UpdateClientPublicLinkModal } from "./UpdateClientPublicLinkModal";
import { withUpdateClientPublicLinkProvider } from "../UpdateClientPublicLinkProvider/__stories__";

const meta = {
  title: "dashboard/clients/UpdateClientPublicLinkModal",
  component: UpdateClientPublicLinkModal,
  decorators: [
    withOpenModal,
    withUpdateClientPublicLinkProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],

  parameters: {
    modalId: "updateClientPublicLink",
  },
} satisfies Meta<typeof UpdateClientPublicLinkModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    clientId: mockedClientDetail.id,
    clientPublicLink: mockedClientDetail.publicLink,
  },
} satisfies Story;
