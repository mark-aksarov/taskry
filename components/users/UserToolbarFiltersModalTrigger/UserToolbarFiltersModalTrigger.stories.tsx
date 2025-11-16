import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UserToolbarFiltersModalTrigger } from "./UserToolbarFiltersModalTrigger";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { UserFiltersForm, UserFiltersFormSkeleton } from "../UserFiltersForm";
import { Default as UserFiltersFormStory } from "../UserFiltersForm/UserFiltersForm.stories";

const meta = {
  title: "Components/users/UserToolbarFiltersModalTrigger",
  component: UserToolbarFiltersModalTrigger,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
} satisfies Meta<typeof UserToolbarFiltersModalTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    filtersForm: <UserFiltersForm {...UserFiltersFormStory.args} />,
  },
} satisfies Story;

export const Skeleton = {
  args: {
    filtersForm: <UserFiltersFormSkeleton />,
  },
} satisfies Story;
