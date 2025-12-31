import { TaskList } from "./TaskList";
import { TaskListItem } from "../TaskListItem";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/tasks/TaskList",
  component: TaskList,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
} satisfies Meta<typeof TaskList>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockedAction = () => {
  return new Promise(() => ({
    status: "success",
    message: null,
  })) as any;
};

export const Default = {
  args: {
    children: (
      <TaskList>
        <TaskListItem
          id={1}
          title="Design landing page"
          deadline={new Date("2025-09-30")}
          project={{ id: 1, title: "Website Redesign", status: "active" }}
          category={{ id: 1, name: "Design" }}
          status="pending"
          assignee={{ id: "user1", imageUrl: "/man.jpg", fullName: "John Doe" }}
          commentsCount={10}
          showCheckbox
          deleteAction={mockedAction}
          updateStatusAction={mockedAction}
        />

        <TaskListItem
          id={2}
          title="Implement login system"
          deadline={new Date("2025-10-05")}
          project={{ id: 2, title: "Authentication Module", status: "active" }}
          category={{ id: 2, name: "Development" }}
          status="active"
          assignee={undefined}
          commentsCount={22}
          showCheckbox
          deleteAction={mockedAction}
          updateStatusAction={mockedAction}
        />

        <TaskListItem
          id={3}
          title="Database schema migration"
          deadline={new Date("2025-10-10")}
          project={{ id: 3, title: "Core Database Upgrade", status: "active" }}
          category={{ id: 3, name: "Backend" }}
          status="completed"
          assignee={{ id: "user3", fullName: "Jane Doe" }}
          commentsCount={2}
          showCheckbox
          deleteAction={mockedAction}
          updateStatusAction={mockedAction}
        />

        <TaskListItem
          id={4}
          title="Write unit tests"
          deadline={new Date("2025-10-12")}
          project={{
            id: 4,
            title: "Quality Assurance Suite",
            status: "active",
          }}
          category={{ id: 4, name: "Testing" }}
          status="pending"
          assignee={{ id: "user4", imageUrl: "/man.jpg", fullName: "John Doe" }}
          commentsCount={12}
          showCheckbox
          deleteAction={mockedAction}
          updateStatusAction={mockedAction}
        />

        <TaskListItem
          id={5}
          title="Prepare deployment pipeline"
          deadline={new Date("2025-10-15")}
          project={{ id: 5, title: "CI/CD Automation", status: "active" }}
          category={{ id: 5, name: "DevOps" }}
          status="active"
          assignee={{ id: "user5", imageUrl: "/man.jpg", fullName: "John Doe" }}
          commentsCount={15}
          showCheckbox
          deleteAction={mockedAction}
          updateStatusAction={mockedAction}
        />

        <TaskListItem
          id={6}
          title="Set up staging environment"
          deadline={new Date("2025-10-18")}
          project={{ id: 6, title: "Infrastructure Setup", status: "active" }}
          category={{ id: 6, name: "Infrastructure" }}
          status="completed"
          assignee={{ id: "user6", imageUrl: "/man.jpg", fullName: "John Doe" }}
          commentsCount={9}
          showCheckbox
          deleteAction={mockedAction}
          updateStatusAction={mockedAction}
        />

        <TaskListItem
          id={7}
          title="Create onboarding flow"
          deadline={new Date("2025-10-20")}
          project={{
            id: 7,
            title: "User Experience Improvements",
            status: "active",
          }}
          category={{ id: 7, name: "UX" }}
          status="completed"
          assignee={{ id: "user7", imageUrl: "/man.jpg", fullName: "John Doe" }}
          commentsCount={12}
          showCheckbox
          deleteAction={mockedAction}
          updateStatusAction={mockedAction}
        />

        <TaskListItem
          id={8}
          title="Fix payment bug"
          deadline={new Date("2025-10-22")}
          project={{ id: 8, title: "E-commerce Platform", status: "active" }}
          category={{ id: 8, name: "Bugfix" }}
          status="active"
          assignee={{ id: "user8", imageUrl: "/man.jpg", fullName: "John Doe" }}
          commentsCount={10}
          showCheckbox
          deleteAction={mockedAction}
          updateStatusAction={mockedAction}
        />

        <TaskListItem
          id={9}
          title="Optimize image loading"
          deadline={new Date("2025-10-25")}
          project={{
            id: 9,
            title: "Performance Optimization",
            status: "active",
          }}
          category={{ id: 9, name: "Performance" }}
          status="pending"
          assignee={{ id: "user9", fullName: "Jane Doe" }}
          commentsCount={23}
          showCheckbox
          deleteAction={mockedAction}
          updateStatusAction={mockedAction}
        />

        <TaskListItem
          id={10}
          title="Refactor auth middleware"
          deadline={new Date("2025-10-28")}
          project={{ id: 10, title: "Backend Refactoring", status: "active" }}
          category={{ id: 3, name: "Backend" }}
          status="completed"
          assignee={undefined}
          commentsCount={13}
          showCheckbox
          deleteAction={mockedAction}
          updateStatusAction={mockedAction}
        />
      </TaskList>
    ),
  },
} satisfies Story;
