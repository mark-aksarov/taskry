"use client";

import {
  ResponsiveMenuTrigger,
  ResponsiveMenuTriggerProps,
} from "../ResponsiveMenuTrigger";

export function ToolbarActionsMenuTrigger(props: ResponsiveMenuTriggerProps) {
  return <ResponsiveMenuTrigger placement="bottom left" {...props} />;
}
