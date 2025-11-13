import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ListItemInfo } from "./ListItemInfo";
import { ListItemTitle } from "./ListItemTitle";
import { ListItemText } from "./ListItemText";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Link, RACButton } from "@/components/ui";

const meta = {
  title: "Components/common/ListItemInfo",
  component: ListItemInfo,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
} satisfies Meta<typeof ListItemInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: (
      <>
        <ListItemTitle>Design landing page</ListItemTitle>
        <ListItemText>Deadline on 30 Sept 2025</ListItemText>
      </>
    ),
  },
} satisfies Story;

export const Truncate = {
  args: {
    ...Default.args,
  },
  decorators: [
    (Story) => (
      <div className="w-[100px]">
        <Story />
      </div>
    ),
  ],
} satisfies Story;

export const TruncateWithButtonAndLinkInside = {
  args: {
    children: (
      <>
        <ListItemTitle>
          <RACButton className="max-w-full truncate">
            Design landing page
          </RACButton>
        </ListItemTitle>
        <ListItemText>
          <Link href="#" className="block truncate">
            Deadline on 30 Sept 2025
          </Link>
        </ListItemText>
      </>
    ),
  },
  decorators: [
    (Story) => (
      <div className="w-[100px]">
        <Story />
      </div>
    ),
  ],
} satisfies Story;
