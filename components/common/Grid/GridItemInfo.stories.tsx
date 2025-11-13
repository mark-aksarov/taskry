import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { GridItemInfo } from "./GridItemInfo";
import { GridItemTitle } from "./GridItemTitle";
import { GridItemText } from "./GridItemText";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Link, RACButton } from "@/components/ui";

const meta = {
  title: "Components/common/GridItemInfo",
  component: GridItemInfo,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
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
          <RACButton className="max-w-full truncate">
            Design landing page
          </RACButton>
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
