import { ProjectList } from "./ProjectList";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { projectsMock } from "@/lib/data/__mocks__/projects";
import { ViewModeProvider } from "@/components/common/ViewMode";

const meta = {
  title: "Components/projects/ProjectList",
  component: ProjectList,
  tags: ["autodocs"],
  args: {
    projects: projectsMock,
  },
  decorators: [
    (Story) => (
      <ViewModeProvider>
        <Story />
      </ViewModeProvider>
    ),
  ],
} satisfies Meta<typeof ProjectList>;

export default meta;
type Story = StoryObj<typeof ProjectList>;

export const Default: Story = {};

export const OnMobile: Story = {
  globals: {
    viewport: { value: "mobile2", isRotated: false },
  },
};
