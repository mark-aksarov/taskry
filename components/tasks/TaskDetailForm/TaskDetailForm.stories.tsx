import { TaskDetailForm } from "./TaskDetailForm";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { TaskDetailFormStatusSelect } from "./TaskDetailFormStatusSelect";
import { TaskDetailFormProjectSelect } from "./TaskDetailFormProjectSelect";
import { TaskDetailFormAssigneeSelect } from "./TaskDetailFormAssigneeSelect";

const meta = {
  title: "Components/tasks/TaskDetailForm",
  component: TaskDetailForm,
  decorators: [
    (Story) => (
      <div className="w-[500px] max-w-full">
        <Story />
      </div>
    ),
    withThemedBackground,
  ],
  parameters: {
    backgroundVariant: "alt",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TaskDetailForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    taskStatusSelect: <TaskDetailFormStatusSelect />,
    projectSelect: (
      <TaskDetailFormProjectSelect
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
      <TaskDetailFormAssigneeSelect
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
