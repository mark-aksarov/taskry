import { ProjectGridItem } from "./ProjectGridItem";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withProjectComments } from "../ProjectCommentsClientContainer/decorators";
import { withUserDetail } from "@/components/users/UserDetailClientContainer/decorators";
import { withProjectDetailCompact } from "../ProjectDetailCompactClientContainer/decorators";

const meta = {
  title: "Components/projects/ProjectGridItem",
  component: ProjectGridItem,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[300px] max-md:w-full">
        <Story />
      </div>
    ),
    withProjectDetailCompact,
    withProjectComments,
    withUserDetail,
    withThemedBackground,
  ],
} satisfies Meta<typeof ProjectGridItem>;

export default meta;
type Story = StoryObj<typeof ProjectGridItem>;

const mockedAction = () => {
  return new Promise(() => ({
    status: "success",
    message: null,
  })) as any;
};

export const Default = {
  args: {
    id: 1,
    title: "Website Redesign",
    deadline: new Date("2025-06-30"),
    creator: {
      id: "user1",
      fullName: "Alice Smith",
      imageUrl: "/woman.jpg",
    },
    status: {
      id: "pending",
      name: "Pending",
    },
    comments: 5,
    tasks: 10,
    tasksDone: 8,
    deleteAction: mockedAction,
    updateStatusAction: mockedAction,
  },
} satisfies Story;

export const WithoutCreator = {
  args: {
    ...Default.args,
    creator: undefined,
  },
} satisfies Story;

export const WithoutCreatorImage = {
  args: {
    ...Default.args,
    creator: {
      ...Default.args.creator,
      imageUrl: undefined,
    },
  },
} satisfies Story;

export const WithActiveStatus = {
  args: {
    ...Default.args,
    status: {
      id: "active",
      name: "Active",
    },
  },
} satisfies Story;

export const WithCompletedStatus = {
  args: {
    ...Default.args,
    status: {
      id: "completed",
      name: "Completed",
    },
  },
} satisfies Story;
