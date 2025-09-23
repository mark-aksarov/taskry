"use client";

import {
  CalendarCheck2,
  Contact,
  FolderClosed,
  LayoutDashboard,
  LogOut,
  Mail,
  Settings,
  Sun,
  Users,
} from "lucide-react";
import { toggleButtonStyles } from "../ui/ToggleButtonGroup";
import { Badge } from "../ui/Badge";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";
import { Button, Link } from "react-aria-components";
import { Divider } from "@/components/ui/Divider";
import { LangMenuTriggerWithBottomSheet } from "./LangMenuTrigger";

interface AppNavigationProps {
  className?: string;
  buttonClassName?: string;
}

export const navLinkStyle = tv({
  extend: toggleButtonStyles,
  base: "w-full gap-4 px-4 py-3 text-sm font-semibold",
});

export const AppNavigation = ({ className }: AppNavigationProps) => {
  return (
    <div className="flex flex-col gap-2.5">
      <nav className={twMerge("flex flex-col gap-2.5", className)}>
        <Link
          href="#"
          className={(renderProps) =>
            navLinkStyle({
              ...renderProps,
              variant: "primary",
              isSelected: true,
            })
          }
        >
          <LayoutDashboard size={18} strokeWidth={1.5} absoluteStrokeWidth />
          Dashboard
        </Link>

        <Link
          href="#"
          className={(renderProps) =>
            navLinkStyle({
              ...renderProps,
              variant: "primary",
              isSelected: false,
            })
          }
        >
          <FolderClosed size={18} strokeWidth={1.5} absoluteStrokeWidth />
          Projects
        </Link>

        <Link
          href="#"
          className={(renderProps) =>
            navLinkStyle({
              ...renderProps,
              variant: "primary",
              isSelected: false,
            })
          }
        >
          <CalendarCheck2 size={18} strokeWidth={1.5} absoluteStrokeWidth />
          Tasks
        </Link>

        <Link
          href="#"
          className={(renderProps) =>
            navLinkStyle({
              ...renderProps,
              variant: "primary",
              isSelected: false,
            })
          }
        >
          <Users size={18} strokeWidth={1.5} absoluteStrokeWidth />
          Team
        </Link>

        <Link
          href="#"
          className={(renderProps) =>
            navLinkStyle({
              ...renderProps,
              variant: "primary",
              isSelected: false,
            })
          }
        >
          <Contact size={18} strokeWidth={1.5} absoluteStrokeWidth />
          Customers
        </Link>

        <Link
          href="#"
          className={(renderProps) =>
            navLinkStyle({
              ...renderProps,
              variant: "primary",
              isSelected: false,
            })
          }
        >
          <Mail size={18} strokeWidth={1.5} absoluteStrokeWidth />
          Inbox
          <Badge className="ml-auto rounded-xl px-1.5! py-0.5!">28</Badge>
        </Link>

        <Link
          href="#"
          className={(renderProps) =>
            navLinkStyle({
              ...renderProps,
              variant: "primary",
              isSelected: false,
            })
          }
        >
          <Settings size={18} strokeWidth={1.5} absoluteStrokeWidth />
          Settings
        </Link>
      </nav>

      <Divider />

      <div className="flex flex-col gap-2.5 md:hidden">
        <LangMenuTriggerWithBottomSheet />

        <Button className={navLinkStyle}>
          <Sun size={18} strokeWidth={1.5} absoluteStrokeWidth />
          Light
        </Button>

        <Divider />
      </div>

      <Link href="#" className={navLinkStyle}>
        <LogOut size={18} strokeWidth={1.5} absoluteStrokeWidth />
        Logout
      </Link>
    </div>
  );
};
