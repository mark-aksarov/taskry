import {
  ResponsiveMenuTrigger,
  ResponsiveMenuTriggerProps,
} from "../ResponsiveMenuTrigger";

export function ToolbarMenuTrigger(props: ResponsiveMenuTriggerProps) {
  return (
    <ResponsiveMenuTrigger
      overlayClassName="md:min-w-[150px]"
      placement="bottom left"
      {...props}
    />
  );
}
