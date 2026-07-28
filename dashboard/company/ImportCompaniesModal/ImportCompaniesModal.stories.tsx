import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ImportCompaniesModal } from "./ImportCompaniesModal";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/companies/ImportCompaniesModal",
  component: ImportCompaniesModal,
  decorators: [withOpenModal, withDashboardLayoutProviders],

  parameters: {
    modalId: "importCompanies",
  },
} satisfies Meta<typeof ImportCompaniesModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
