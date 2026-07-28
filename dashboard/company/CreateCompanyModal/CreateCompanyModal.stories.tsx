import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CreateCompanyModal } from "./CreateCompanyModal";
import { CreateCompanyProvider } from "../CreateCompanyContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/companies/CreateCompanyModal",
  component: CreateCompanyModal,
  decorators: [
    withOpenModal,
    (Story) => (
      <CreateCompanyProvider>
        <Story />
      </CreateCompanyProvider>
    ),
    withDashboardLayoutProviders,
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
