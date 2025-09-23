import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AppHeader } from "./AppHeader";
import { AppSidebarSheetProvider } from "../AppSidebar";

const meta = {
  title: "Components/layout/AppHeader",
  component: AppHeader,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    title: "Dashboard",
  },
  decorators: [
    (Story) => (
      <>
        <AppSidebarSheetProvider>
          <Story />
        </AppSidebarSheetProvider>
      </>
    ),
  ],
} satisfies Meta<typeof AppHeader>;

export default meta;
type Story = StoryObj<typeof AppHeader>;

export const Desktop = {} satisfies Story;

export const Mobile = {
  globals: {
    viewport: { value: "iphone6", isRotated: false },
  },
} satisfies Story;
