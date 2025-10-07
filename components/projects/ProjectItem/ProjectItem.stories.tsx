import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectItem } from "./ProjectItem";
import { projectsMock } from "../ProjectList";

const meta = {
  title: "Components/projects/ProjectItem",
  component: ProjectItem,
  tags: ["autodocs"],
  args: {
    project: projectsMock[0],
  },
} satisfies Meta<typeof ProjectItem>;

export default meta;
type Story = StoryObj<typeof ProjectItem>;

export const Default: Story = {};

export const WithoutCreator: Story = {
  args: {
    project: {
      ...projectsMock[0],
      creator: null,
    },
  },
};

export const WithCheckbox: Story = {
  args: {
    showCheckbox: true,
  },
};

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
