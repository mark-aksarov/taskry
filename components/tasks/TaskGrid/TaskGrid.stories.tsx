import { TaskGrid } from "./TaskGrid";
import { TaskGridItem } from "../TaskGridItem";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/tasks/TaskGrid",
  component: TaskGrid,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
} satisfies Meta<typeof TaskGrid>;

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
      <>
        <TaskGridItem
          id={1}
          title="Design homepage"
          deadline={new Date("2025-09-28")}
          assignee={{
            id: "user1",
            imageUrl: "/man.jpg",
            fullName: "Liam Turner",
          }}
          status="pending"
          commentsCount={99}
          subtasksTotal={3}
          subtasksDone={1}
          projectStatus="active"
          canDelete={true}
          canUpdate={true}
          canUpdateStatus={true}
          deleteAction={mockedAction}
          updateStatusAction={mockedAction}
        />

        <TaskGridItem
          id={2}
          title="Implement authentication"
          deadline={new Date("2025-10-06")}
          assignee={undefined}
          status="active"
          commentsCount={10}
          subtasksTotal={4}
          subtasksDone={2}
          projectStatus="active"
          canDelete={true}
          canUpdate={true}
          canUpdateStatus={true}
          deleteAction={mockedAction}
          updateStatusAction={mockedAction}
        />

        <TaskGridItem
          id={3}
          title="Migrate database schema"
          deadline={new Date("2025-10-11")}
          assignee={{
            id: "user3",
            imageUrl: undefined,
            fullName: "Olivia White",
          }}
          status="pending"
          commentsCount={6}
          subtasksTotal={2}
          subtasksDone={2}
          projectStatus="active"
          canDelete={true}
          canUpdate={true}
          canUpdateStatus={true}
          deleteAction={mockedAction}
          updateStatusAction={mockedAction}
        />

        <TaskGridItem
          id={4}
          title="Write automated tests"
          deadline={new Date("2025-10-13")}
          assignee={{
            id: "user4",
            imageUrl: "/man.jpg",
            fullName: "Ethan Green",
          }}
          status="completed"
          commentsCount={25}
          subtasksTotal={4}
          subtasksDone={2}
          projectStatus="active"
          canDelete={true}
          canUpdate={true}
          canUpdateStatus={true}
          deleteAction={mockedAction}
          updateStatusAction={mockedAction}
        />

        <TaskGridItem
          id={5}
          title="Setup CI/CD pipeline"
          deadline={new Date("2025-10-16")}
          assignee={{
            id: "user5",
            imageUrl: "/man.jpg",
            fullName: "Mason Moore",
          }}
          status="pending"
          commentsCount={99}
          subtasksTotal={4}
          subtasksDone={3}
          projectStatus="active"
          canDelete={true}
          canUpdate={true}
          canUpdateStatus={true}
          deleteAction={mockedAction}
          updateStatusAction={mockedAction}
        />

        <TaskGridItem
          id={6}
          title="Setup staging environment"
          deadline={new Date("2025-10-19")}
          assignee={{
            id: "user6",
            imageUrl: "/man.jpg",
            fullName: "Ava Black",
          }}
          status="active"
          commentsCount={99}
          subtasksTotal={3}
          subtasksDone={3}
          projectStatus="active"
          canDelete={true}
          canUpdate={true}
          canUpdateStatus={true}
          deleteAction={mockedAction}
          updateStatusAction={mockedAction}
        />

        <TaskGridItem
          id={7}
          title="Design onboarding flow"
          deadline={new Date("2025-10-21")}
          assignee={{
            id: "user7",
            imageUrl: "/man.jpg",
            fullName: "Isabella Hall",
          }}
          status="completed"
          commentsCount={47}
          subtasksTotal={3}
          subtasksDone={3}
          projectStatus="active"
          canDelete={true}
          canUpdate={true}
          canUpdateStatus={true}
          deleteAction={mockedAction}
          updateStatusAction={mockedAction}
        />

        <TaskGridItem
          id={8}
          title="Fix checkout bug"
          deadline={new Date("2025-10-23")}
          assignee={{
            id: "user8",
            imageUrl: "/man.jpg",
            fullName: "Henry Young",
          }}
          status="pending"
          commentsCount={18}
          subtasksTotal={3}
          subtasksDone={1}
          projectStatus="active"
          canDelete={true}
          canUpdate={true}
          canUpdateStatus={true}
          deleteAction={mockedAction}
          updateStatusAction={mockedAction}
        />

        <TaskGridItem
          id={9}
          title="Optimize image loading"
          deadline={new Date("2025-10-26")}
          assignee={{ id: "user9", imageUrl: undefined, fullName: "Ivy Adams" }}
          status="pending"
          commentsCount={67}
          subtasksTotal={3}
          subtasksDone={1}
          projectStatus="active"
          canDelete={true}
          canUpdate={true}
          canUpdateStatus={true}
          deleteAction={mockedAction}
          updateStatusAction={mockedAction}
        />

        <TaskGridItem
          id={10}
          title="Refactor authentication middleware"
          deadline={new Date("2025-10-29")}
          assignee={undefined}
          status="active"
          commentsCount={87}
          subtasksTotal={3}
          subtasksDone={2}
          projectStatus="active"
          canDelete={true}
          canUpdate={true}
          canUpdateStatus={true}
          deleteAction={mockedAction}
          updateStatusAction={mockedAction}
        />
      </>
    ),
  },
} satisfies Story;
