import {
  withOpenModal,
  withModalManagerProvider,
} from "@/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedClientDetail } from "@/mocks/clients";
import { mockedCompanySummaries } from "@/mocks/companies";
import { UpdateClientForm } from "../UpdateClientForm";
import { UpdateClientModal } from "./UpdateClientModal";
import { ClientFormSkeleton } from "../ClientFormSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withUpdateClientProvider } from "../UpdateClientProvider/__stories__";

const meta = {
  title: "dashboard/clients/UpdateClientModal",
  component: UpdateClientModal,
  decorators: [
    withOpenModal,
    withUpdateClientProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],

  parameters: {
    modalId: "updateClient",
  },
} satisfies Meta<typeof UpdateClientModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    updateClientFormContainer: (
      <UpdateClientForm
        {...mockedClientDetail}
        clientId={mockedClientDetail.id}
        companySelectItems={mockedCompanySummaries}
      />
    ),
  },
} satisfies Story;

export const Skeleton = {
  args: {
    updateClientFormContainer: <ClientFormSkeleton />,
  },
} satisfies Story;
