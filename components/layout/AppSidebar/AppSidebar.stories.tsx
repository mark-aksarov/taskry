import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AppSidebar } from "./AppSidebar";

import {
  SideSheet,
  Button,
  RACDialogTrigger,
  Dialog,
  DialogCloseButton,
} from "@/components/ui";
import { AppSidebarHeader } from "./AppSidebarHeader";
import { AppSidebarHeading } from "./AppSidebarHeading";
import { AppSidebarBody } from "./AppSidebarBody";
import { AppNavigation } from "../AppNavigation";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/layout/AppSidebar",
  component: AppSidebar,
  decorators: [withThemedBackground],
} satisfies Meta<typeof AppSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  parameters: {
    layout: "fullscreen",
  },
  args: {
    className: "h-screen",
    children: (
      <>
        <AppSidebarHeader>
          <AppSidebarHeading />
        </AppSidebarHeader>
        <AppSidebarBody>
          <AppNavigation />
        </AppSidebarBody>
      </>
    ),
  },
} satisfies Story;

export const WrapWithSheet = {
  decorators: [
    (Story) => {
      return (
        <RACDialogTrigger>
          <Button label="Open sheet" />
          <SideSheet side="left" isDismissable>
            <Dialog>
              <Story />
            </Dialog>
          </SideSheet>
        </RACDialogTrigger>
      );
    },
  ],
  args: {
    children: (
      <>
        <AppSidebarHeader>
          <div className="flex items-center justify-between">
            <AppSidebarHeading />
            <DialogCloseButton iconSize={20} />
          </div>
        </AppSidebarHeader>
        <AppSidebarBody>
          <AppNavigation />
        </AppSidebarBody>
      </>
    ),
  },
} satisfies Story;
