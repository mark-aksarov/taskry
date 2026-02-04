import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UserPositionSelect } from "./UserPositionSelect";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/tasks/UserPositionSelect",
  component: UserPositionSelect,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
} satisfies Meta<typeof UserPositionSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    positions: [
      { id: 1, name: "Developer" },
      { id: 2, name: "Designer" },
      { id: 3, name: "Product Manager" },
    ],
  },
} satisfies Story;
