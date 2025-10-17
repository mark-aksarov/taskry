import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectGrid } from "./ProjectGrid";
import { projectsMock } from "@/lib/data/__mocks__/projects";
import { ViewModeProvider } from "@/components/common/ViewMode";

const meta = {
  title: "Components/projects/ProjectGrid",
  component: ProjectGrid,
  tags: ["autodocs"],
  args: {
    projects: projectsMock,
  },
  decorators: [
    (Story) => (
      <ViewModeProvider initialValue="grid">
        <Story />
      </ViewModeProvider>
    ),
  ],
} satisfies Meta<typeof ProjectGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const OnMobile: Story = {
  globals: {
    viewport: { value: "iphone6", isRotated: false },
  },
};
