import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DeleteClientImageModal } from "./DeleteClientImageModal";
import { ClearClientImageUrlProvider } from "../ClearClientImageUrlContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/clients/DeleteClientImageModal",
  component: DeleteClientImageModal,
  decorators: [
    withOpenModal,
    (Story) => (
      <ClearClientImageUrlProvider>
        <Story />
      </ClearClientImageUrlProvider>
    ),
    withDashboardLayoutProviders,
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
