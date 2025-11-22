import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PersonHeader } from "./PersonHeader";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/common/PersonHeader",
  component: PersonHeader,
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof PersonHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    title: "John Doe",
    imageUrl: "/man.jpg",
    subtitle: "Developer",
  },
} satisfies Story;

export const WithoutImageUrl = {
  args: {
    ...Default.args,
    imageUrl: undefined,
  },
} satisfies Story;
