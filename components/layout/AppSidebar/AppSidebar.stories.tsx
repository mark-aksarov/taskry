import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AppSidebar } from "./AppSidebar";
import { SideSheet } from "@/components/ui/SideSheet";
import { Button } from "@/components/ui/Button";
import { DialogTrigger } from "react-aria-components";
import { Dialog } from "@/components/ui/Dialog";
import { DialogCloseButton } from "@/components/ui/Dialog/Dialog";
import { AppSidebarHeader } from "./AppSidebarHeader";
import { AppSidebarBody } from "./AppSidebarBody";
import { AppSidebarHeading } from "./AppSidebarHeading";
import { AppNavigation } from "../AppNavigation";

const meta = {
  title: "Components/layout/AppSidebar",
  component: AppSidebar,
  tags: ["autodocs"],
} satisfies Meta<typeof AppSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    className: "h-screen",
  },
  parameters: {
    layout: "fullscreen",
  },
  render: (args) => (
    <AppSidebar {...args}>
      <AppSidebarHeader>
        <AppSidebarHeading />
      </AppSidebarHeader>
      <AppSidebarBody>
        <AppNavigation />
      </AppSidebarBody>
    </AppSidebar>
  ),
} satisfies Story;

export const WrapWithSheet = {
  decorators: [
    (Story) => {
      return (
        <DialogTrigger>
          <Button label="Open sheet" />
          <SideSheet side="left" isDismissable>
            <Dialog>
              <Story />
            </Dialog>
          </SideSheet>
        </DialogTrigger>
      );
    },
  ],
  render: (args) => {
    return (
      <AppSidebar {...args}>
        <AppSidebarHeader>
          <div className="flex items-center justify-between">
            <AppSidebarHeading />
            <DialogCloseButton />
          </div>
        </AppSidebarHeader>
        <AppSidebarBody>
          <AppNavigation />
        </AppSidebarBody>
      </AppSidebar>
    );
  },
} satisfies Story;
