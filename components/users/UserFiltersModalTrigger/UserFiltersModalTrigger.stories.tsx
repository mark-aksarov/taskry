import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UserFiltersModalTrigger } from "./UserFiltersModalTrigger";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { UserFiltersForm, UserFiltersFormSkeleton } from "../UserFiltersForm";
import { Default as UserFiltersFormStory } from "../UserFiltersForm/UserFiltersForm.stories";

const meta = {
  title: "Components/users/UserFiltersModalTrigger",
  component: UserFiltersModalTrigger,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
} satisfies Meta<typeof UserFiltersModalTrigger>;

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
