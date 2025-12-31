import { fn } from "storybook/test";
import { TaskFormBase } from "./TaskFormBase";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { OverlayTriggerStateContext } from "react-aria-components";
import { TaskFormBaseStatusSelect } from "./TaskFormBaseStatusSelect";
import { TaskFormBaseProjectSelect } from "./TaskFormBaseProjectSelect";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { TaskFormBaseCategorySelect } from "./TaskFormBaseCategorySelect";
import { TaskFormBaseAssigneeSelect } from "./TaskFormBaseAssigneeSelect";

const meta = {
  title: "components/tasks/TaskFormBase",
  component: TaskFormBase,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <OverlayTriggerStateContext.Provider value={{ close: fn() } as any}>
        <div className="w-[500px] max-w-full">
          <Story />
        </div>
      </OverlayTriggerStateContext.Provider>
    ),

    withThemedBackground,
  ],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof TaskFormBase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    id: "new-task-form",
    formAction: fn(),
    taskStatusSelect: <TaskFormBaseStatusSelect />,
    taskCategorySelect: (
      <TaskFormBaseCategorySelect
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
      <TaskFormBaseProjectSelect
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
      <TaskFormBaseAssigneeSelect
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
