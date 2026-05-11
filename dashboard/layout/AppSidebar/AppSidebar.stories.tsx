import { Logo } from "../Logo";
import { useState } from "react";
import { Button } from "@/ui/Button";
import { mocked } from "storybook/test";
import { AppSidebar } from "./AppSidebar";
import { SideSheet } from "@/ui/SideSheet";
import { usePathname } from "next/navigation";
import { AppNavigation } from "../AppNavigation";
import { AppSidebarBody } from "./AppSidebarBody";
import { DialogTrigger } from "react-aria-components";
import { AppSidebarHeader } from "./AppSidebarHeader";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Dialog, DialogCloseButton } from "@/ui/Dialog";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withCurrentUserProvider } from "@/dashboard/common/CurrentUserContext/__stories__";

const meta = {
  title: "dashboard/layout/AppSidebar",
  component: AppSidebar,
  decorators: [withCurrentUserProvider, withThemedBackground],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/dashboard");
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
          <Logo />
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
          <Button label="Open sheet" variant="accent" />
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
            <Logo />
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
