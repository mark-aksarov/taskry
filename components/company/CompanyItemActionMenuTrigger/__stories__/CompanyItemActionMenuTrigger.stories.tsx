import { Meta, StoryObj } from "@storybook/react";
import { CompanyItemActionMenuTrigger } from "../CompanyItemActionMenuTrigger";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/companies/CompanyItemActionMenuTrigger",
  component: CompanyItemActionMenuTrigger,
  decorators: [withThemedBackground],
} satisfies Meta<typeof CompanyItemActionMenuTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    guestMode: false,
    companyId: 1,
    companyName: "Company 1",
  },
} satisfies Story;
