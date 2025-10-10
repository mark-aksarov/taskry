import { UserGrid } from "./UserGrid";
import { usersMock } from "../../../lib/data/__mocks__/users";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ViewModeProvider } from "@/components/common/ViewMode";

const meta = {
  title: "Components/users/UserGrid",
  component: UserGrid,
  tags: ["autodocs"],
  args: {
    users: usersMock,
  },
  decorators: [
    (Story) => (
      <ViewModeProvider initialValue="grid">
        <Story />
      </ViewModeProvider>
    ),
  ],
} satisfies Meta<typeof UserGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const OnMobile: Story = {
  globals: {
    viewport: { value: "iphone6", isRotated: false },
  },
};
