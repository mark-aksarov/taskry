import { NewProjectForm } from "./NewProjectForm";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectStatusSelect } from "./ProjectStatusSelect";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProjectCategorySelect } from "./ProjectCategorySelect";

const meta = {
  title: "components/projects/NewProjectForm",
  component: NewProjectForm,
  tags: ["autodocs"],
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
} satisfies Meta<typeof NewProjectForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    projectStatusSelect: (
      <ProjectStatusSelect
        statuses={[
          { id: "pending", name: "Pending" },
          { id: "active", name: "Active" },
          { id: "completed", name: "Completed" },
        ]}
      />
    ),
    projectCategorySelect: (
      <ProjectCategorySelect
        categories={[
          {
            id: 1,
            name: "UI Design",
          },
          {
            id: 2,
            name: "Wireframing",
          },
          {
            id: 3,
            name: "Frontend Development",
          },
          {
            id: 4,
            name: "Backend Development",
          },
          {
            id: 5,
            name: "Testing & QA",
          },
        ]}
      />
    ),
  },
} satisfies Story;
