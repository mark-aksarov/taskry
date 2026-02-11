import { Meta, StoryObj } from "@storybook/react";
import { NewCompanyForm } from "../../NewCompanyForm";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CompanyToolbarCreateNewButton } from "../CompanyToolbarCreateNewButton";
import { Default as NewCompanyFormStory } from "../../NewCompanyForm/NewCompanyForm.stories";

const meta = {
  title: "components/companies/CompanyToolbarCreateNewButton",
  component: CompanyToolbarCreateNewButton,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
} satisfies Meta<typeof CompanyToolbarCreateNewButton>;

export default meta;
type Story = StoryObj<typeof CompanyToolbarCreateNewButton>;

export const Default = {
  args: {
    guestMode: false,
    newCompanyForm: <NewCompanyForm {...NewCompanyFormStory.args} />,
  },
} satisfies Story;
