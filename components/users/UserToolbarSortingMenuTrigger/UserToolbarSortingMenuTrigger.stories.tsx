import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { UserToolbarSortingMenuTrigger } from "./UserToolbarSortingMenuTrigger";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";

const meta = {
  title: "components/users/UserToolbarSortingMenuTrigger",
  component: UserToolbarSortingMenuTrigger,
  decorators: [withPageTransitionProvider, withThemedBackground],
} satisfies Meta<typeof UserToolbarSortingMenuTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    selectedSortField: "fullName",
  },
} satisfies Story;
