import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CreateOrganizationPage } from "./CreateOrganizationPage";
import { withAuthDecorator } from "@/.storybook/withAuthDecorator";

const meta = {
  title: "pages/CreateOrganizationPage",
  component: CreateOrganizationPage,
  parameters: { layout: "fullscreen" },
  decorators: [withAuthDecorator],
} satisfies Meta<typeof CreateOrganizationPage>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
