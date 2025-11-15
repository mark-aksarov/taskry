import { NewTaskForm } from "./NewTaskForm";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NewTaskFormStatusSelect } from "./NewTaskFormStatusSelect";
import { NewTaskFormProjectSelect } from "./NewTaskFormProjectSelect";
import { NewTaskFormCategorySelect } from "./NewTaskFormCategorySelect";
import { NewTaskFormAssigneeSelect } from "./NewTaskFormAssigneeSelect";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/tasks/NewTaskForm",
  component: NewTaskForm,
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
} satisfies Meta<typeof NewTaskForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    taskStatusSelect: (
      <NewTaskFormStatusSelect
        statuses={[
          { id: "pending", name: "Pending" },
          { id: "active", name: "Active" },
          { id: "completed", name: "Completed" },
        ]}
      />
    ),
    taskCategorySelect: (
      <NewTaskFormCategorySelect
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
    projectSelect: (
      <NewTaskFormProjectSelect
        projects={[
          {
            id: 1,
            title: "Website Redesign",
          },
          {
            id: 2,
            title: "Mobile App Launch",
          },
          {
            id: 3,
            title: "Marketing Campaign Q2",
          },
          {
            id: 4,
            title: "Server Migration",
          },
          {
            id: 5,
            title: "SEO Optimization",
          },
          {
            id: 6,
            title: "Internal Dashboard",
          },
          {
            id: 7,
            title: "Customer Feedback Collection",
          },
          {
            id: 8,
            title: "Product Photography",
          },
          {
            id: 9,
            title: "Cloud Security Audit",
          },
          {
            id: 10,
            title: "Annual Report 2025",
          },
        ]}
      />
    ),
    assigneeSelect: (
      <NewTaskFormAssigneeSelect
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
