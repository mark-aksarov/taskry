import {
  withOpenModal,
  withModalManagerProvider,
} from "@/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedClientDetail } from "@/mocks/clients";
import { UpdateClientBioModal } from "./UpdateClientBioModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withUpdateClientBioProvider } from "../UpdateClientBioProvider/__stories__";

const meta = {
  title: "dashboard/clients/UpdateClientBioModal",
  component: UpdateClientBioModal,
  decorators: [
    withOpenModal,
    withUpdateClientBioProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],

  parameters: {
    modalId: "updateClientBio",
  },
} satisfies Meta<typeof UpdateClientBioModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    clientId: mockedClientDetail.id,
    clientBio: mockedClientDetail.bio,
  },
} satisfies Story;
