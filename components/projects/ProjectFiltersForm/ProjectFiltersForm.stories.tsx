import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectFiltersForm } from "./ProjectFiltersForm";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProjectFiltersFormUserCheckboxGroup } from "./ProjectFiltersFormUserCheckboxGroup";
import { ProjectFiltersFormCustomerCheckboxGroup } from "./ProjectFiltersFormCustomerCheckboxGroup";
import { ProjectFiltersFormCategoryCheckboxGroup } from "./ProjectFiltersFormCategoryCheckboxGroup";
import { ProjectFiltersFormStatusCheckboxGroup } from "./ProjectFiltersFormStatusCheckboxGroup";

const meta: Meta<typeof ProjectFiltersForm> = {
  title: "Components/projects/ProjectFiltersForm",
  component: ProjectFiltersForm,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[500px]">
        <Story />
      </div>
    ),
    withThemedBackground,
  ],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof ProjectFiltersForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    projectStatusCheckboxGroup: (
      <ProjectFiltersFormStatusCheckboxGroup
        statuses={[
          {
            id: "pending",
            name: "Pending",
          },
          {
            id: "active",
            name: "Active",
          },
          {
            id: "completed",
            name: "Completed",
          },
        ]}
      />
    ),
    projectCategoryCheckboxGroup: (
      <ProjectFiltersFormCategoryCheckboxGroup
        categories={[
          {
            id: 1,
            name: "Design & UX",
          },
          {
            id: 2,
            name: "Development & Engineering",
          },
          {
            id: 3,
            name: "Marketing & Strategy",
          },
          {
            id: 4,
            name: "Data & Analytics",
          },
          {
            id: 5,
            name: "SEO Optimization",
          },
        ]}
      />
    ),
    customerCheckboxGroup: (
      <ProjectFiltersFormCustomerCheckboxGroup
        customers={[
          {
            id: 1,
            fullName: "Alice Johnson",
          },
          {
            id: 2,
            fullName: "Bob Smith",
          },
          {
            id: 3,
            fullName: "Clara Davis",
          },
          {
            id: 4,
            fullName: "David Lee",
          },
          {
            id: 5,
            fullName: "Emma Wilson",
          },
        ]}
      />
    ),
    userCheckboxGroup: (
      <ProjectFiltersFormUserCheckboxGroup
        users={[
          {
            id: "user1",
            fullName: "John Doe",
          },
          {
            id: "user2",
            fullName: "Jane Smith",
          },
          {
            id: "user3",
            fullName: "Michael Johnson",
          },
          {
            id: "user4",
            fullName: "Emily Davis",
          },
          {
            id: "user5",
            fullName: "Daniel Wilson",
          },
          {
            id: "user6",
            fullName: "Sophia Martinez",
          },
          {
            id: "user7",
            fullName: "James Brown",
          },
          {
            id: "user8",
            fullName: "Olivia Garcia",
          },
          {
            id: "user9",
            fullName: "William Miller",
          },
          {
            id: "user10",
            fullName: "Ava Taylor",
          },
        ]}
      />
    ),
  },
} satisfies Story;
