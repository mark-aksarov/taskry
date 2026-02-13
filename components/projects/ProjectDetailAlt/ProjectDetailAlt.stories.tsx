import { ProjectDetailAlt } from "./ProjectDetailAlt";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectDetailStory } from "../ProjectDetail/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProjectDetailWithoutSomeDataStory } from "../ProjectDetail/__stories__";

const meta = {
  title: "components/projects/ProjectDetailAlt",
  component: ProjectDetailAlt,
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof ProjectDetailAlt>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  ...ProjectDetailStory,
} satisfies Story;

export const WithoutSomeData = {
  ...ProjectDetailWithoutSomeDataStory,
} satisfies Story;
