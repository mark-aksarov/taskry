import { ProjectDetailFull } from "./ProjectDetailFull";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { DetailCommentInput } from "@/components/common/DetailCommentInput";
import { MockedCommentsContainer } from "@/components/comments/MockedCommentsContainer";

const meta = {
  title: "Components/projects/ProjectDetailFull",
  component: ProjectDetailFull,
  tags: ["autodocs"],
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
} satisfies Meta<typeof ProjectDetailFull>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    description:
      "A complete redesign of the client’s website with improved UX, SEO, and performance.",
    attachments: [
      {
        id: 1,
        fileUrl: "/placeholder.jpg",
        fileName: "placeholder.jpg",
      },
      {
        id: 2,
        fileUrl: "/placeholder.jpg",
        fileName: "placeholder.jpg",
      },
    ],
    comments: (
      <div className="flex flex-col gap-4">
        <DetailCommentInput />
        <MockedCommentsContainer />
      </div>
    ),
  },
} satisfies Story;
