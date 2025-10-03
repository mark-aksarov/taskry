import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectGridItem } from "./ProjectGridItem";
import { projectsMock } from "../ProjectList";

const meta = {
  title: "Components/projects/ProjectGridItem",
  component: ProjectGridItem,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[250px]">
        <Story />
      </div>
    ),
  ],
  args: {
    project: projectsMock[0],
  },
} satisfies Meta<typeof ProjectGridItem>;

export default meta;
type Story = StoryObj<typeof ProjectGridItem>;

export const Default: Story = {};

export const Skeleton: Story = {
  args: {
    project: undefined,
  },
};

export const OnMobile: Story = {
  globals: {
    viewport: { value: "iphone6", isRotated: false },
  },
};
