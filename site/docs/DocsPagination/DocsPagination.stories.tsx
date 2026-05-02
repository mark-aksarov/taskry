import { DocsPagination } from "./DocsPagination";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DocsPaginationLink } from "./DocsPaginationLink";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "site/docs/DocsPagination",
  component: DocsPagination,
  decorators: [withThemedBackground],
} satisfies Meta<typeof DocsPagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    prev: (
      <DocsPaginationLink href="#" variant="prev" description="Prev page" />
    ),
    next: (
      <DocsPaginationLink href="#" variant="next" description="Next page" />
    ),
  },
} satisfies Story;
