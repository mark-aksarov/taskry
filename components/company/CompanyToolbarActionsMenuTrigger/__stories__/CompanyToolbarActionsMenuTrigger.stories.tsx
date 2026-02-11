import { Meta, StoryObj } from "@storybook/react";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CompanyToolbarActionsMenuTrigger } from "../CompanyToolbarActionsMenuTrigger";

const meta = {
  title: "components/companies/CompanyToolbarActionsMenuTrigger",
  component: CompanyToolbarActionsMenuTrigger,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
} satisfies Meta<typeof CompanyToolbarActionsMenuTrigger>;

export default meta;
type Story = StoryObj<typeof CompanyToolbarActionsMenuTrigger>;

export const Default = {
  args: {
    guestMode: false,
  },
} satisfies Story;
