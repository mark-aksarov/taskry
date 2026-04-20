import { useState } from "react";
import { mocked } from "storybook/test";
import { AppSidebar } from "./AppSidebar";
import { usePathname } from "next/navigation";
import { Button } from "@/ui/Button";
import { AppNavigation } from "../AppNavigation";
import { AppSidebarBody } from "./AppSidebarBody";
import { DialogTrigger } from "react-aria-components";
import { SideSheet } from "@/ui/SideSheet";
import { AppSidebarHeader } from "./AppSidebarHeader";
import { AppSidebarHeading } from "./AppSidebarHeading";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Dialog, DialogCloseButton } from "@/ui/Dialog";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/layout/AppSidebar",
  component: AppSidebar,
  decorators: [withThemedBackground],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/");
  },
} satisfies Meta<typeof AppSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  parameters: {
    layout: "fullscreen",
  },
  args: {
    className: "h-dvh",
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
      const [isOpen, setIsOpen] = useState(true);

      return (
        <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
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
