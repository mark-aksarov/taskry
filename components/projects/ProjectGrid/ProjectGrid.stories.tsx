import { ProjectGrid } from "./ProjectGrid";
import { ProjectGridItem } from "../ProjectGridItem";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/projects/ProjectGrid",
  component: ProjectGrid,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
} satisfies Meta<typeof ProjectGrid>;

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
        <ProjectGridItem
          id={1}
          title="Website Revamp"
          deadline={new Date("2025-06-25")}
          creator={{
            id: "user1",
            fullName: "Liam Turner",
            imageUrl: "/man.jpg",
          }}
          status="pending"
          tasksTotal={4}
          tasksCompleted={1}
          commentsCount={12}
          deleteAction={mockedAction}
          updateStatusAction={mockedAction}
        />
        <ProjectGridItem
          id={2}
          title="Mobile App Release"
          deadline={new Date("2025-08-20")}
          creator={{
            id: "user2",
            fullName: "Emma Parker",
            imageUrl: "/woman.jpg",
          }}
          status="active"
          tasksTotal={4}
          tasksCompleted={1}
          commentsCount={9}
          deleteAction={mockedAction}
          updateStatusAction={mockedAction}
        />
        <ProjectGridItem
          id={3}
          title="Q2 Marketing Strategy"
          deadline={new Date("2025-05-28")}
          creator={{
            id: "user3",
            fullName: "Olivia White",
            imageUrl: "/woman.jpg",
          }}
          status="completed"
          tasksTotal={3}
          tasksCompleted={2}
          commentsCount={7}
          deleteAction={mockedAction}
          updateStatusAction={mockedAction}
        />
        <ProjectGridItem
          id={4}
          title="Server Upgrade"
          deadline={new Date("2025-07-18")}
          creator={{
            id: "user4",
            fullName: "Ethan Green",
            imageUrl: "/man.jpg",
          }}
          status="pending"
          tasksTotal={4}
          tasksCompleted={1}
          commentsCount={5}
          deleteAction={mockedAction}
          updateStatusAction={mockedAction}
        />
        <ProjectGridItem
          id={5}
          title="SEO Campaign"
          deadline={new Date("2025-06-05")}
          creator={{
            id: "user5",
            fullName: "Ava Black",
            imageUrl: "/woman.jpg",
          }}
          status="active"
          tasksTotal={3}
          tasksCompleted={0}
          commentsCount={6}
          deleteAction={mockedAction}
          updateStatusAction={mockedAction}
        />
        <ProjectGridItem
          id={6}
          title="Internal Analytics Dashboard"
          deadline={new Date("2025-09-05")}
          creator={{
            id: "user6",
            fullName: "Mason Moore",
            imageUrl: "/man.jpg",
          }}
          status="pending"
          tasksTotal={4}
          tasksCompleted={1}
          commentsCount={11}
          deleteAction={mockedAction}
          updateStatusAction={mockedAction}
        />
        <ProjectGridItem
          id={7}
          title="Customer Survey Analysis"
          deadline={new Date("2025-03-22")}
          creator={{
            id: "user7",
            fullName: "Isabella Hall",
            imageUrl: "/woman.jpg",
          }}
          status="completed"
          tasksTotal={3}
          tasksCompleted={2}
          commentsCount={4}
          deleteAction={mockedAction}
          updateStatusAction={mockedAction}
        />
        <ProjectGridItem
          id={8}
          title="Product Shoot"
          deadline={new Date("2025-07-12")}
          creator={{
            id: "user8",
            fullName: "Henry Young",
            imageUrl: "/man.jpg",
          }}
          status="active"
          tasksTotal={3}
          tasksCompleted={0}
          commentsCount={8}
          deleteAction={mockedAction}
          updateStatusAction={mockedAction}
        />
        <ProjectGridItem
          id={9}
          title="Cloud Compliance Audit"
          deadline={new Date("2025-08-08")}
          creator={{
            id: "user9",
            fullName: "Ivy Adams",
            imageUrl: "/woman.jpg",
          }}
          status="pending"
          tasksTotal={2}
          tasksCompleted={0}
          commentsCount={3}
          deleteAction={mockedAction}
          updateStatusAction={mockedAction}
        />
        <ProjectGridItem
          id={10}
          title="Annual Financial Report"
          deadline={new Date("2025-05-29")}
          creator={{
            id: "user10",
            fullName: "Jack Carter",
            imageUrl: "/man.jpg",
          }}
          status="completed"
          tasksTotal={3}
          tasksCompleted={1}
          commentsCount={10}
          deleteAction={mockedAction}
          updateStatusAction={mockedAction}
        />
      </>
    ),
  },
} satisfies Story;
