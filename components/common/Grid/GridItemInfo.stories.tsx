import { Link } from "@/components/ui/Link";
import { GridItemInfo } from "./GridItemInfo";
import { GridItemText } from "./GridItemText";
import { Button } from "react-aria-components";
import { GridItemTitle } from "./GridItemTitle";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/common/GridItemInfo",
  component: GridItemInfo,
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof GridItemInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: (
      <>
        <GridItemTitle>Design landing page</GridItemTitle>
        <GridItemText>Deadline on 30 Sept 2025</GridItemText>
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
        <GridItemTitle>
          <Button className="max-w-full truncate">Design landing page</Button>
        </GridItemTitle>
        <GridItemText>
          <Link href="#" className="block truncate">
            Deadline on 30 Sept 2025
          </Link>
        </GridItemText>
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
