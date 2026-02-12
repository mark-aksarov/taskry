import { NewCompanyForm } from "./NewCompanyForm";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withOverlayTriggerStateProvider } from "@/.storybook/withOverlayTriggerStateProvider";

const meta = {
  title: "components/companies/NewCompanyForm",
  component: NewCompanyForm,
  decorators: [withOverlayTriggerStateProvider, withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof NewCompanyForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    createCompany: () => ({ status: "success" }),
  },
} satisfies Story;
