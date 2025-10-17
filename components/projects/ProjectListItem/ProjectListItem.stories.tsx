import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectListItem } from "./ProjectListItem";
import { projectsMock } from "@/lib/data/__mocks__/projects";

const meta = {
  title: "Components/projects/ProjectListItem",
  component: ProjectListItem,
  tags: ["autodocs"],
  args: {
    project: projectsMock[0],
  },
} satisfies Meta<typeof ProjectListItem>;

export default meta;
type Story = StoryObj<typeof ProjectListItem>;

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
