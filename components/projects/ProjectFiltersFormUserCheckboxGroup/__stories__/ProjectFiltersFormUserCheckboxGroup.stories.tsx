import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withProjectFiltersProvider } from "../../ProjectFiltersContext/__stories__";
import { ProjectFiltersFormUserCheckboxGroup } from "../ProjectFiltersFormUserCheckboxGroup";

const meta = {
  title: "components/projects/ProjectFiltersFormUserCheckboxGroup",
  component: ProjectFiltersFormUserCheckboxGroup,
  decorators: [withProjectFiltersProvider, withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof ProjectFiltersFormUserCheckboxGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    users: [
      { id: "user1", fullName: "User 1" },
      { id: "user2", fullName: "User 2" },
      { id: "user3", fullName: "User 3" },
      { id: "user4", fullName: "User 4" },
      { id: "user5", fullName: "User 5" },
      { id: "user6", fullName: "User 6" },
      { id: "user7", fullName: "User 7" },
      { id: "user8", fullName: "User 8" },
      { id: "user9", fullName: "User 9" },
      { id: "user10", fullName: "User 10" },
    ],
  },
} satisfies Story;
