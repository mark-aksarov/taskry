import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UserFiltersFormStory } from "../UserFiltersForm/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { UserFiltersForm, UserFiltersFormSkeleton } from "../UserFiltersForm";
import { UserToolbarFiltersModalTrigger } from "./UserToolbarFiltersModalTrigger";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";
import { withUserFiltersProvider } from "../UserFiltersContext/__stories__";

const meta = {
  title: "components/users/UserToolbarFiltersModalTrigger",
  component: UserToolbarFiltersModalTrigger,
  decorators: [
    withUserFiltersProvider,
    withPageTransitionProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof UserToolbarFiltersModalTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    filtersFormContainer: <UserFiltersForm {...UserFiltersFormStory.args} />,
  },
} satisfies Story;

export const Skeleton = {
  args: {
    filtersFormContainer: <UserFiltersFormSkeleton />,
  },
} satisfies Story;
