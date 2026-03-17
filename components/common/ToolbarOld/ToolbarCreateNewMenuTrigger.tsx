import { ToolbarMenuTrigger } from "./ToolbarMenuTrigger";
import { ResponsiveMenuTriggerProps } from "../ResponsiveMenuTrigger";

export function ToolbarCreateNewMenuTrigger(props: ResponsiveMenuTriggerProps) {
  return <ToolbarMenuTrigger placement="bottom right" {...props} />;
}
