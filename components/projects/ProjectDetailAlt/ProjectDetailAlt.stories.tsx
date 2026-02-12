import { ProjectDetailAlt } from "./ProjectDetailAlt";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Default as ProjectDetailStory } from "../ProjectDetail/ProjectDetail.stories";
import { WithoutSomeData as WithoutSomeDataStory } from "../ProjectDetail/ProjectDetail.stories";

const meta = {
  title: "components/projects/ProjectDetailAlt",
  component: ProjectDetailAlt,
  decorators: [
    (Story) => (
      <div className="max-w-[500px]">
        <Story />
      </div>
    ),
    withThemedBackground,
  ],
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
  ...WithoutSomeDataStory,
} satisfies Story;
