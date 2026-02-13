import { Meta, StoryObj } from "@storybook/react";
import { NewCompanyForm } from "../../NewCompanyForm";
import { NewCompanyFormStory } from "../../NewCompanyForm/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CompanyToolbarCreateNewButton } from "../CompanyToolbarCreateNewButton";

const meta = {
  title: "components/companies/CompanyToolbarCreateNewButton",
  component: CompanyToolbarCreateNewButton,
  decorators: [withThemedBackground],
} satisfies Meta<typeof CompanyToolbarCreateNewButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    guestMode: false,
    newCompanyForm: <NewCompanyForm {...NewCompanyFormStory.args} />,
  },
} satisfies Story;
