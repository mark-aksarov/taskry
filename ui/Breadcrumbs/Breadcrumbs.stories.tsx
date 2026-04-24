import { Breadcrumb, Breadcrumbs } from "./Breadcrumbs";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "UI/Breadcrumbs",
  component: Breadcrumbs,
  decorators: [withThemedBackground],
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: (
      <>
        <Breadcrumb href="#">Home</Breadcrumb>
        <Breadcrumb href="#">React Aria</Breadcrumb>
        <Breadcrumb>Breadcrumbs</Breadcrumb>
      </>
    ),
  },
} satisfies Story;
