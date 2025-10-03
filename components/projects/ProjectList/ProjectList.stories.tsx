import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectList } from "./ProjectList";
import { Suspense } from "react";
import { mocked } from "storybook/test";
import { projectsMock } from "./projectsMock";
import { getProjects } from "@/lib/queries/project";

const meta = {
  title: "Components/projects/ProjectList",
  component: ProjectList,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Suspense>
        <Story />
      </Suspense>
    ),
  ],
  beforeEach: () => {
    mocked(getProjects).mockReturnValue(
      new Promise((res) => res(projectsMock)),
    );
  },
  parameters: {
    layout: "fullscreen",
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
