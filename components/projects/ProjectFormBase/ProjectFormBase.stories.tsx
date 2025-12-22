import { fn } from "storybook/test";
import { ProjectFormBase } from "./ProjectFormBase";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProjectFormBaseStatusSelect } from "./ProjectFormBaseStatusSelect";
import { ProjectFormBaseCategorySelect } from "./ProjectFormBaseCategorySelect";
import { ProjectFormBaseCustomerSelect } from "./ProjectFormBaseCustomerSelect";

const meta = {
  title: "components/projects/ProjectFormBase",
  component: ProjectFormBase,
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
} satisfies Meta<typeof ProjectFormBase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    projectStatusSelect: <ProjectFormBaseStatusSelect />,
    projectCategorySelect: (
      <ProjectFormBaseCategorySelect
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
    projectCustomerSelect: (
      <ProjectFormBaseCustomerSelect
        customers={[
          {
            id: 1,
            fullName: "John Doe",
          },
          {
            id: 2,
            fullName: "Jane Smith",
          },
          {
            id: 3,
            fullName: "Bob Johnson",
          },
        ]}
      />
    ),
    formAction: fn(),
    id: "new-project-form",
  },
} satisfies Story;
