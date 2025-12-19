import { fn } from "storybook/test";
import { NewProjectForm } from "./NewProjectForm";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { NewProjectFormStatusSelect } from "./NewProjectFormStatusSelect";
import { NewProjectFormCategorySelect } from "./NewProjectFormCategorySelect";
import { NewProjectFormCustomerSelect } from "./NewProjectFormCustomerSelect";

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
    projectStatusSelect: <NewProjectFormStatusSelect />,
    projectCategorySelect: (
      <NewProjectFormCategorySelect
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
      <NewProjectFormCustomerSelect
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
    createProjectAction: fn(),
  },
} satisfies Story;
