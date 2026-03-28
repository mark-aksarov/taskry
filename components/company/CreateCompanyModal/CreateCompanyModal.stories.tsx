import {
  withOpenModal,
  withModalManagerProvider,
} from "@/components/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CreateCompanyModal } from "./CreateCompanyModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withCreateCompanyProvider } from "../CreateCompanyProvider/__stories__";

const meta = {
  title: "components/companies/CreateCompanyModal",
  component: CreateCompanyModal,
  decorators: [
    withOpenModal,
    withCreateCompanyProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],

  parameters: {
    modalId: "createCompany",
  },
} satisfies Meta<typeof CreateCompanyModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
