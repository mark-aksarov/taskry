import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectGrid } from "./ProjectGrid";
import { withBackgroundVariant } from "@/.storybook/decorators";

const meta = {
  title: "Components/projects/ProjectGrid",
  component: ProjectGrid,
  tags: ["autodocs"],
  decorators: [withBackgroundVariant()],
} satisfies Meta<typeof ProjectGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    projects: [
      {
        id: 1,
        title: "Website Revamp",
        deadline: new Date("2025-06-25"),
        creator: { id: "user1", fullName: "Liam Turner", imageUrl: "/man.jpg" },
        tasks: [
          { statusId: 1 },
          { statusId: 1 },
          { statusId: 2 },
          { statusId: 3 },
        ],
      },
      {
        id: 2,
        title: "Mobile App Release",
        deadline: new Date("2025-08-20"),
        creator: {
          id: "user2",
          fullName: "Emma Parker",
          imageUrl: "/woman.jpg",
        },
        tasks: [
          { statusId: 1 },
          { statusId: 1 },
          { statusId: 2 },
          { statusId: 3 },
        ],
      },
      {
        id: 3,
        title: "Q2 Marketing Strategy",
        deadline: new Date("2025-05-28"),
        creator: {
          id: "user3",
          fullName: "Olivia White",
          imageUrl: "/woman.jpg",
        },
        tasks: [{ statusId: 3 }, { statusId: 3 }, { statusId: 2 }],
      },
      {
        id: 4,
        title: "Server Upgrade",
        deadline: new Date("2025-07-18"),
        creator: { id: "user4", fullName: "Ethan Green", imageUrl: "/man.jpg" },
        tasks: [
          { statusId: 1 },
          { statusId: 2 },
          { statusId: 2 },
          { statusId: 3 },
        ],
      },
      {
        id: 5,
        title: "SEO Campaign",
        deadline: new Date("2025-06-05"),
        creator: { id: "user5", fullName: "Ava Black", imageUrl: "/woman.jpg" },
        tasks: [{ statusId: 1 }, { statusId: 2 }, { statusId: 2 }],
      },
      {
        id: 6,
        title: "Internal Analytics Dashboard",
        deadline: new Date("2025-09-05"),
        creator: { id: "user6", fullName: "Mason Moore", imageUrl: "/man.jpg" },
        tasks: [
          { statusId: 1 },
          { statusId: 1 },
          { statusId: 2 },
          { statusId: 3 },
        ],
      },
      {
        id: 7,
        title: "Customer Survey Analysis",
        deadline: new Date("2025-03-22"),
        creator: {
          id: "user7",
          fullName: "Isabella Hall",
          imageUrl: "/woman.jpg",
        },
        tasks: [{ statusId: 3 }, { statusId: 3 }, { statusId: 2 }],
      },
      {
        id: 8,
        title: "Product Shoot",
        deadline: new Date("2025-07-12"),
        creator: { id: "user8", fullName: "Henry Young", imageUrl: "/man.jpg" },
        tasks: [{ statusId: 1 }, { statusId: 2 }, { statusId: 2 }],
      },
      {
        id: 9,
        title: "Cloud Compliance Audit",
        deadline: new Date("2025-08-08"),
        creator: { id: "user9", fullName: "Ivy Adams", imageUrl: "/woman.jpg" },
        tasks: [{ statusId: 1 }, { statusId: 2 }],
      },
      {
        id: 10,
        title: "Annual Financial Report",
        deadline: new Date("2025-05-29"),
        creator: {
          id: "user10",
          fullName: "Jack Carter",
          imageUrl: "/man.jpg",
        },
        tasks: [{ statusId: 3 }, { statusId: 2 }, { statusId: 1 }],
      },
    ],
  },
} satisfies Story;
