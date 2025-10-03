import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectGrid } from "./ProjectGrid";
import { Suspense } from "react";
import { mocked } from "storybook/test";
import { getProjects } from "@/lib/queries/project";
import { projectsMock } from "../ProjectList";

const meta = {
  title: "Components/projects/ProjectGrid",
  component: ProjectGrid,
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
} satisfies Meta<typeof ProjectGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const OnMobile: Story = {
  globals: {
    viewport: { value: "iphone6", isRotated: false },
  },
};
