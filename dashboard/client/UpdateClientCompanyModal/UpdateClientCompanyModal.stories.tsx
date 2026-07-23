import {
  UpdateClientCompanyForm,
  UpdateClientCompanyFormSkeleton,
} from "../UpdateClientCompanyForm";

import {
  withOpenModal,
  withModalManagerProvider,
} from "@/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedClientDetail } from "@/mocks/clients";
import { mockedCompanySummaries } from "@/mocks/companies";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { UpdateClientCompanyModal } from "./UpdateClientCompanyModal";
import { withUpdateClientCompanyProvider } from "../UpdateClientCompanyProvider/__stories__";

const meta = {
  title: "dashboard/clients/UpdateClientCompanyModal",
  component: UpdateClientCompanyModal,
  decorators: [
    withOpenModal,
    withUpdateClientCompanyProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],

  parameters: {
    modalId: "updateClientCompany",
  },
} satisfies Meta<typeof UpdateClientCompanyModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    updateClientCompanyFormContainer: (
      <UpdateClientCompanyForm
        clientId={mockedClientDetail.id}
        companyId={mockedClientDetail.company.id}
        companySelectItems={mockedCompanySummaries}
      />
    ),
  },
} satisfies Story;

export const Skeleton = {
  args: {
    updateClientCompanyFormContainer: <UpdateClientCompanyFormSkeleton />,
  },
} satisfies Story;
