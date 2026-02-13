import { Link } from "@/components/ui/Link";
import { ListItemInfo } from "./ListItemInfo";
import { ListItemText } from "./ListItemText";
import { Button } from "react-aria-components";
import { ListItemTitle } from "./ListItemTitle";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/common/ListItemInfo",
  component: ListItemInfo,
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
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
          <Button className="max-w-full truncate">Design landing page</Button>
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
