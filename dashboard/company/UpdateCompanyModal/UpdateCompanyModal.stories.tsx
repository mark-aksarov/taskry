import {
  withOpenModal,
  withModalManagerProvider,
} from "@/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UpdateCompanyModal } from "../UpdateCompanyModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withUpdateCompanyProvider } from "../UpdateCompanyProvider/__stories__";

const meta = {
  title: "dashboard/companies/UpdateCompanyModal",
  component: UpdateCompanyModal,
  decorators: [
    withOpenModal,
    withUpdateCompanyProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],

  parameters: {
    modalId: "updateCompany",
  },
} satisfies Meta<typeof UpdateCompanyModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    companyId: 1,
    companyName: "Company 1",
  },
} satisfies Story;
