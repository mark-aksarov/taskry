import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProjectList } from "./ProjectList";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectListItem } from "../ProjectListItem";
import { withProjectDetail } from "../ProjectDetail/decorators";

const meta = {
  title: "Components/projects/ProjectList",
  component: ProjectList,
  tags: ["autodocs"],
  decorators: [withProjectDetail, withThemedBackground],
} satisfies Meta<typeof ProjectList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: (
      <>
        <ProjectListItem
          id={1}
          title="Website Redesign"
          deadline={new Date("2025-06-30")}
          creator={{
            id: "user1",
            fullName: "Alice Smith",
            imageUrl: "/woman.jpg",
          }}
          customer={{ id: 1, fullName: "John Doe", imageUrl: "/man.jpg" }}
          category={{ id: 1, name: "Design" }}
          company={{ id: 1, name: "Doe Inc." }}
          status={{ id: "pending", name: "Pending" }}
          comments={4}
        />

        <ProjectListItem
          id={2}
          title="Mobile App Launch"
          deadline={new Date("2025-08-15")}
          creator={{
            id: "user2",
            fullName: "Bob Johnson",
            imageUrl: "/man.jpg",
          }}
          customer={{ id: 2, fullName: "Sarah Lee", imageUrl: "/man.jpg" }}
          category={{ id: 2, name: "Development" }}
          company={{ id: 2, name: "Lee Corp." }}
          status={{ id: "active", name: "Active" }}
          comments={5}
        />

        <ProjectListItem
          id={3}
          title="Marketing Campaign Q2"
          deadline={new Date("2025-05-31")}
          creator={{
            id: "user3",
            fullName: "Carol White",
            imageUrl: "/woman.jpg",
          }}
          customer={{ id: 3, fullName: "Mike Brown", imageUrl: "/man.jpg" }}
          category={{ id: 3, name: "Marketing" }}
          company={{ id: 3, name: "Brown LLC" }}
          status={{ id: "completed", name: "Completed" }}
          comments={3}
        />

        <ProjectListItem
          id={4}
          title="Server Migration"
          deadline={new Date("2025-07-15")}
          creator={{
            id: "user4",
            fullName: "David Green",
            imageUrl: "/man.jpg",
          }}
          customer={{ id: 4, fullName: "Emma Wilson", imageUrl: "/woman.jpg" }}
          category={{ id: 2, name: "IT" }}
          company={{ id: 4, name: "Wilson Tech" }}
          status={{ id: "pending", name: "Pending" }}
          comments={6}
        />

        <ProjectListItem
          id={5}
          title="SEO Optimization"
          deadline={new Date("2025-06-01")}
          creator={{
            id: "user5",
            fullName: "Eva Black",
            imageUrl: "/woman.jpg",
          }}
          customer={{ id: 5, fullName: "Tom Harris", imageUrl: "/man.jpg" }}
          category={{ id: 3, name: "Marketing" }}
          company={{ id: 5, name: "Harris Co." }}
          status={{ id: "active", name: "Active" }}
          comments={4}
        />

        <ProjectListItem
          id={6}
          title="Internal Dashboard"
          deadline={new Date("2025-09-01")}
          creator={{
            id: "user6",
            fullName: "Frank Moore",
            imageUrl: "/man.jpg",
          }}
          customer={{ id: 6, fullName: "Linda King", imageUrl: "/woman.jpg" }}
          category={{ id: 2, name: "Development" }}
          company={{ id: 6, name: "King Enterprises" }}
          status={{ id: "pending", name: "Pending" }}
          comments={7}
        />

        <ProjectListItem
          id={7}
          title="Customer Feedback Collection"
          deadline={new Date("2025-03-20")}
          creator={{
            id: "user7",
            fullName: "Grace Hall",
            imageUrl: "/woman.jpg",
          }}
          customer={{ id: 7, fullName: "Peter Scott", imageUrl: "/man.jpg" }}
          category={{ id: 4, name: "Research" }}
          company={{ id: 7, name: "Scott Group" }}
          status={{ id: "completed", name: "Completed" }}
          comments={4}
        />

        <ProjectListItem
          id={8}
          title="Product Photography"
          deadline={new Date("2025-07-10")}
          creator={{
            id: "user8",
            fullName: "Henry Young",
            imageUrl: "/man.jpg",
          }}
          customer={{ id: 8, fullName: "Nancy Allen", imageUrl: "/woman.jpg" }}
          category={{ id: 1, name: "Design" }}
          company={{ id: 8, name: "Allen Studio" }}
          status={{ id: "pending", name: "Pending" }}
          comments={6}
        />

        <ProjectListItem
          id={9}
          title="Cloud Security Audit"
          deadline={new Date("2025-08-05")}
          creator={{
            id: "user9",
            fullName: "Ivy Adams",
            imageUrl: "/woman.jpg",
          }}
          customer={{ id: 9, fullName: "George Baker", imageUrl: "/man.jpg" }}
          category={{ id: 2, name: "IT" }}
          company={{ id: 9, name: "Baker Tech" }}
          status={{ id: "active", name: "Active" }}
          comments={3}
        />

        <ProjectListItem
          id={10}
          title="Annual Report 2025"
          deadline={new Date("2025-05-31")}
          creator={{
            id: "user10",
            fullName: "Jack Carter",
            imageUrl: "/man.jpg",
          }}
          customer={{
            id: 10,
            fullName: "Olivia Evans",
            imageUrl: "/woman.jpg",
          }}
          category={{ id: 5, name: "Finance" }}
          company={{ id: 10, name: "Evans Ltd." }}
          status={{ id: "completed", name: "Completed" }}
          comments={8}
        />
      </>
    ),
  },
} satisfies Story;
