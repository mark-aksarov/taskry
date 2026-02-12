import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { UserFiltersForm, UserFiltersFormSkeleton } from "../UserFiltersForm";
import { UserToolbarFiltersModalTrigger } from "./UserToolbarFiltersModalTrigger";
import { Default as UserFiltersFormStory } from "../UserFiltersForm/UserFiltersForm.stories";

const meta = {
  title: "Components/users/UserToolbarFiltersModalTrigger",
  component: UserToolbarFiltersModalTrigger,
  decorators: [withThemedBackground],
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
