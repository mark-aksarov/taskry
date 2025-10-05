import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectList } from "./ProjectList";
import { projectsMock } from "./projectsMock";

const meta = {
  title: "Components/projects/ProjectList",
  component: ProjectList,
  tags: ["autodocs"],
  args: {
    projects: projectsMock,
  },
} satisfies Meta<typeof ProjectList>;

export default meta;
type Story = StoryObj<typeof ProjectList>;

export const Default: Story = {};

export const OnMobile: Story = {
  globals: {
    viewport: { value: "iphone6", isRotated: false },
  },
};
