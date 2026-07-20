import {
  withOpenModal,
  withModalManagerProvider,
} from "@/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ImportCompaniesModal } from "./ImportCompaniesModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withImportCompaniesProvider } from "../ImportCompaniesProvider/__stories__";
import { withSelectedItemsProvider } from "@/dashboard/common/SelectedItemsContext/__stories__";

const meta = {
  title: "dashboard/companies/ImportCompaniesModal",
  component: ImportCompaniesModal,
  decorators: [
    withOpenModal,
    withImportCompaniesProvider,
    withSelectedItemsProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],

  parameters: {
    modalId: "importCompanies",
  },
} satisfies Meta<typeof ImportCompaniesModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
