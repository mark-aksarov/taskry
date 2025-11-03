import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectGridItem } from "./ProjectGridItem";
import { projectsMock } from "@/lib/data/__mocks__/projects";

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

export const WithoutCreator: Story = {
  args: {
    project: {
      ...projectsMock[0],
      creator: null,
    },
  },
};

export const OnMobile: Story = {
  globals: {
    viewport: { value: "mobile2", isRotated: false },
  },
};
