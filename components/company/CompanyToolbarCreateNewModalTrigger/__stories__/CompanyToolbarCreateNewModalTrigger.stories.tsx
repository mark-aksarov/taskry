import { Meta, StoryObj } from "@storybook/react";
import { NewCompanyForm } from "../../NewCompanyForm";
import { NewCompanyFormStory } from "../../NewCompanyForm/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CompanyToolbarCreateNewModalTrigger } from "../CompanyToolbarCreateNewModalTrigger";

const meta = {
  title: "components/companies/CompanyToolbarCreateNewModalTrigger",
  component: CompanyToolbarCreateNewModalTrigger,
  decorators: [withThemedBackground],
} satisfies Meta<typeof CompanyToolbarCreateNewModalTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    guestMode: false,
    newCompanyForm: <NewCompanyForm {...NewCompanyFormStory.args} />,
  },
} satisfies Story;
