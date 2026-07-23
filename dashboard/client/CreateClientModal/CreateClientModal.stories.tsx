import {
  withOpenModal,
  withModalManagerProvider,
} from "@/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedCompanySummaries } from "@/mocks/companies";
import { CreateClientModal } from "./CreateClientModal";
import { CreateClientForm } from "../CreateClientForm";
import { ClientFormSkeleton } from "../ClientFormSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withCreateClientProvider } from "../CreateClientProvider/__stories__";

const meta = {
  title: "dashboard/clients/CreateClientModal",
  component: CreateClientModal,
  decorators: [
    withOpenModal,
    withCreateClientProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],

  parameters: {
    modalId: "createClient",
  },
} satisfies Meta<typeof CreateClientModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    createClientFormContainer: (
      <CreateClientForm companySelectItems={mockedCompanySummaries} />
    ),
  },
} satisfies Story;

export const Skeleton = {
  args: {
    createClientFormContainer: <ClientFormSkeleton />,
  },
} satisfies Story;
