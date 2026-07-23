import {
  withOpenModal,
  withModalManagerProvider,
} from "@/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DeleteClientImageModal } from "./DeleteClientImageModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withClearClientImageUrlProvider } from "../ClearClientImageUrlProvider/__stories__";

const meta = {
  title: "dashboard/clients/DeleteClientImageModal",
  component: DeleteClientImageModal,
  decorators: [
    withOpenModal,
    withClearClientImageUrlProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],
  parameters: {
    modalId: "deleteClientImage",
  },
} satisfies Meta<typeof DeleteClientImageModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    clientId: 1,
    clientFullName: "Client 1",
  },
} satisfies Story;
