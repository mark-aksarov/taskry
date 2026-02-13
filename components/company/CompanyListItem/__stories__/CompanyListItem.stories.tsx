import { Meta, StoryObj } from "@storybook/react";
import { CompanyListItem } from "../CompanyListItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CompanyItemActionMenuTrigger } from "../../CompanyItemActionMenuTrigger";
import { CompanyItemActionMenuTriggerStory } from "../../CompanyItemActionMenuTrigger/__stories__";

const meta = {
  title: "components/companies/CompanyListItem",
  component: CompanyListItem,
  decorators: [withThemedBackground],
} satisfies Meta<typeof CompanyListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    id: 1,
    name: "Company 1",
    menuTrigger: (
      <CompanyItemActionMenuTrigger
        {...CompanyItemActionMenuTriggerStory.args}
      />
    ),
  },
} satisfies Story;
