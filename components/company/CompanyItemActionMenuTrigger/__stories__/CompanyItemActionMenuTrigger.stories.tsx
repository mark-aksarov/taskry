import { Meta, StoryObj } from "@storybook/react";
import { EditCompanyForm } from "../../EditCompanyForm";
import { EditCompanyFormStory } from "../../EditCompanyForm/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CompanyItemActionMenuTrigger } from "../CompanyItemActionMenuTrigger";

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
    editCompanyForm: <EditCompanyForm {...EditCompanyFormStory.args} />,
  },
} satisfies Story;
