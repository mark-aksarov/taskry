import { usePathname } from "next/navigation";
import { mocked } from "storybook/internal/test";
import { DocsPagination } from "./DocsPagination";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "site/docs/DocsPagination",
  component: DocsPagination,
  decorators: [withThemedBackground],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/docs/projects");
  },
} satisfies Meta<typeof DocsPagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
