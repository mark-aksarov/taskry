import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { EditCompanyForm } from "../EditCompanyForm";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withOverlayTriggerStateProvider } from "@/.storybook/withOverlayTriggerStateProvider";

const meta = {
  title: "components/companies/EditCompanyForm",
  component: EditCompanyForm,
  decorators: [withOverlayTriggerStateProvider, withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof EditCompanyForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    companyId: 1,
    nameDefaultValue: "Project Manager",
    updateCompany: () => ({ status: "success" }),
  },
} satisfies Story;
