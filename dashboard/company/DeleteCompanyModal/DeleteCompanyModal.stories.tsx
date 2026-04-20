import {
  withOpenModal,
  withModalManagerProvider,
} from "@/dashboard/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DeleteCompanyModal } from "../DeleteCompanyModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withDeleteCompanyProvider } from "../DeleteCompanyProvider/__stories__";
import { withSelectedItemsProvider } from "@/dashboard/common/SelectedItemsContext/__stories__";

const meta = {
  title: "components/companies/DeleteCompanyModal",
  component: DeleteCompanyModal,
  decorators: [
    withOpenModal,
    withDeleteCompanyProvider,
    withSelectedItemsProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],

  parameters: {
    modalId: "deleteCompany",
  },
} satisfies Meta<typeof DeleteCompanyModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    companyId: 1,
    companyName: "Company 1",
  },
} satisfies Story;
