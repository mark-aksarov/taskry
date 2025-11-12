import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProjectList } from "./ProjectList";
import { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "Components/projects/ProjectList",
  component: ProjectList,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
} satisfies Meta<typeof ProjectList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    projects: [
      {
        id: 1,
        title: "Website Redesign",
        deadline: new Date("2025-06-30"),
        creator: {
          id: "user1",
          fullName: "Alice Smith",
          imageUrl: "/woman.jpg",
        },
        status: {
          nameEn: "Active",
        },
        category: { id: 1, name: "Design" },
        customer: {
          id: 1,
          fullName: "John Doe",
          company: { name: "Doe Inc." },
        },
        tasks: [
          { statusId: 1 },
          { statusId: 2 },
          { statusId: 2 },
          { statusId: 3 },
        ],
      },
      {
        id: 2,
        title: "Mobile App Launch",
        deadline: new Date("2025-08-15"),
        creator: { id: "user2", fullName: "Bob Johnson", imageUrl: "/man.jpg" },
        status: {
          nameEn: "Pending",
        },
        category: { id: 2, name: "Development" },
        customer: {
          id: 2,
          fullName: "Sarah Lee",
          company: { name: "Lee Corp." },
        },
        tasks: [
          { statusId: 1 },
          { statusId: 1 },
          { statusId: 2 },
          { statusId: 3 },
          { statusId: 2 },
        ],
      },
      {
        id: 3,
        title: "Marketing Campaign Q2",
        deadline: new Date("2025-05-31"),
        creator: {
          id: "user3",
          fullName: "Carol White",
          imageUrl: "/woman.jpg",
        },
        status: {
          nameEn: "Completed",
        },
        category: { id: 3, name: "Marketing" },
        customer: {
          id: 3,
          fullName: "Mike Brown",
          company: { name: "Brown LLC" },
        },
        tasks: [{ statusId: 3 }, { statusId: 3 }, { statusId: 2 }],
      },
      {
        id: 4,
        title: "Server Migration",
        deadline: new Date("2025-07-15"),
        creator: { id: "user4", fullName: "David Green", imageUrl: "/man.jpg" },
        status: {
          nameEn: "Active",
        },
        category: { id: 2, name: "IT" },
        customer: {
          id: 4,
          fullName: "Emma Wilson",
          company: { name: "Wilson Tech" },
        },
        tasks: [
          { statusId: 1 },
          { statusId: 2 },
          { statusId: 2 },
          { statusId: 3 },
          { statusId: 1 },
          { statusId: 2 },
        ],
      },
      {
        id: 5,
        title: "SEO Optimization",
        deadline: new Date("2025-06-01"),
        creator: { id: "user5", fullName: "Eva Black", imageUrl: "/woman.jpg" },
        status: {
          nameEn: "Pending",
        },
        category: { id: 3, name: "Marketing" },
        customer: {
          id: 5,
          fullName: "Tom Harris",
          company: { name: "Harris Co." },
        },
        tasks: [
          { statusId: 1 },
          { statusId: 2 },
          { statusId: 2 },
          { statusId: 2 },
        ],
      },
      {
        id: 6,
        title: "Internal Dashboard",
        deadline: new Date("2025-09-01"),
        creator: { id: "user6", fullName: "Frank Moore", imageUrl: "/man.jpg" },
        status: {
          nameEn: "Active",
        },
        category: { id: 2, name: "Development" },
        customer: {
          id: 6,
          fullName: "Linda King",
          company: { name: "King Enterprises" },
        },
        tasks: [
          { statusId: 1 },
          { statusId: 1 },
          { statusId: 2 },
          { statusId: 3 },
          { statusId: 2 },
          { statusId: 2 },
          { statusId: 1 },
        ],
      },
      {
        id: 7,
        title: "Customer Feedback Collection",
        deadline: new Date("2025-03-20"),
        creator: {
          id: "user7",
          fullName: "Grace Hall",
          imageUrl: "/woman.jpg",
        },
        status: {
          nameEn: "Completed",
        },
        category: { id: 4, name: "Research" },
        customer: {
          id: 7,
          fullName: "Peter Scott",
          company: { name: "Scott Group" },
        },
        tasks: [
          { statusId: 3 },
          { statusId: 3 },
          { statusId: 2 },
          { statusId: 2 },
        ],
      },
      {
        id: 8,
        title: "Product Photography",
        deadline: new Date("2025-07-10"),
        creator: { id: "user8", fullName: "Henry Young", imageUrl: "/man.jpg" },
        status: {
          nameEn: "Active",
        },
        category: { id: 1, name: "Design" },
        customer: {
          id: 8,
          fullName: "Nancy Allen",
          company: { name: "Allen Studio" },
        },
        tasks: [
          { statusId: 1 },
          { statusId: 2 },
          { statusId: 2 },
          { statusId: 3 },
          { statusId: 3 },
          { statusId: 2 },
        ],
      },
      {
        id: 9,
        title: "Cloud Security Audit",
        deadline: new Date("2025-08-05"),
        creator: { id: "user9", fullName: "Ivy Adams", imageUrl: "/woman.jpg" },
        status: {
          nameEn: "Pending",
        },
        category: { id: 2, name: "IT" },
        customer: {
          id: 9,
          fullName: "George Baker",
          company: { name: "Baker Tech" },
        },
        tasks: [{ statusId: 1 }, { statusId: 2 }, { statusId: 2 }],
      },
      {
        id: 10,
        title: "Annual Report 2025",
        deadline: new Date("2025-05-31"),
        creator: {
          id: "user10",
          fullName: "Jack Carter",
          imageUrl: "/man.jpg",
        },
        status: {
          nameEn: "Completed",
        },
        category: { id: 5, name: "Finance" },
        customer: {
          id: 10,
          fullName: "Olivia Evans",
          company: { name: "Evans Ltd." },
        },
        tasks: [
          { statusId: 3 },
          { statusId: 3 },
          { statusId: 2 },
          { statusId: 2 },
          { statusId: 3 },
          { statusId: 2 },
          { statusId: 1 },
          { statusId: 2 },
        ],
      },
    ],
  },
} satisfies Story;
