import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DeleteCompaniesModal } from "./DeleteCompaniesModal";
import { withToastRegion } from "@/.storybook/withToastRegion";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withDeleteCompaniesProvider } from "../DeleteCompaniesProvider/__stories__";
import { withSelectedItemsProvider } from "@/dashboard/common/SelectedItemsContext/__stories__";
import {
  withModalManagerProvider,
  withOpenModal,
} from "@/common/ModalManagerContext/__stories__";

const meta = {
  title: "dashboard/companies/DeleteCompaniesModal",
  component: DeleteCompaniesModal,
  decorators: [
    withOpenModal,
    withToastRegion,
    withSelectedItemsProvider,
    withDeleteCompaniesProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],

  parameters: {
    modalId: "deleteCompanies",
  },
} satisfies Meta<typeof DeleteCompaniesModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    isOpen: false,
    onOpenChange: () => {},
  },
} satisfies Story;
